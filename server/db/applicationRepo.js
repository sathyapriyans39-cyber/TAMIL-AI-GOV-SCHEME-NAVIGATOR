/**
 * Application Repository (Citizen scheme application submissions and tracking)
 * Backed by MySQL with fallback memory store.
 */

import { query } from './connection.js';
import { SCHEMES } from '../data/schemes.js';

let inMemoryApplications = [];

function formatAppRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    schemeId: row.scheme_id,
    schemeName: row.scheme_name,
    tamilName: row.tamil_name,
    applicantName: row.applicant_name,
    applicantPhone: row.applicant_phone,
    applicantDistrict: row.applicant_district,
    status: row.status,
    notes: row.notes,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at
  };
}

export async function createApplication(data) {
  const newId = data.id || `app-${Date.now()}`;
  const scheme = SCHEMES.find(s => s.id === data.schemeId);
  const appObj = {
    id: newId,
    userId: data.userId,
    schemeId: data.schemeId,
    schemeName: scheme ? scheme.schemeName : data.schemeName || 'Government Scheme',
    tamilName: scheme ? scheme.tamilName : data.tamilName || 'அரசு நலத்திட்டம்',
    applicantName: data.applicantName,
    applicantPhone: data.applicantPhone || '',
    applicantDistrict: data.applicantDistrict || '',
    status: data.status || 'SUBMITTED',
    notes: data.notes || '',
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    const sql = `
      INSERT INTO applications (
        id, user_id, scheme_id, applicant_name, applicant_phone, applicant_district, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      newId,
      data.userId,
      data.schemeId,
      data.applicantName,
      data.applicantPhone || null,
      data.applicantDistrict || null,
      data.status || 'SUBMITTED',
      data.notes || null
    ];
    await query(sql, params);
  } catch (err) {
    console.warn('MySQL createApplication fallback:', err.message);
  }

  inMemoryApplications.unshift(appObj);
  return appObj;
}

export async function getApplicationById(id) {
  try {
    const sql = `
      SELECT a.*, s.scheme_name, s.tamil_name
      FROM applications a
      LEFT JOIN schemes s ON a.scheme_id = s.id
      WHERE a.id = ?
    `;
    const rows = await query(sql, [id]);
    if (rows.length > 0) return formatAppRow(rows[0]);
  } catch (err) {
    console.warn('MySQL getApplicationById fallback:', err.message);
  }
  return inMemoryApplications.find(a => a.id === id) || null;
}

export async function getUserApplications(userId) {
  try {
    const sql = `
      SELECT a.*, s.scheme_name, s.tamil_name
      FROM applications a
      LEFT JOIN schemes s ON a.scheme_id = s.id
      WHERE a.user_id = ?
      ORDER BY a.submitted_at DESC
    `;
    const rows = await query(sql, [userId]);
    return rows.map(formatAppRow);
  } catch (err) {
    console.warn('MySQL getUserApplications fallback:', err.message);
    return inMemoryApplications.filter(a => a.userId === userId);
  }
}

export async function getAllApplications() {
  try {
    const sql = `
      SELECT a.*, s.scheme_name, s.tamil_name, u.email as user_email
      FROM applications a
      LEFT JOIN schemes s ON a.scheme_id = s.id
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.submitted_at DESC
    `;
    const rows = await query(sql);
    return rows.map(formatAppRow);
  } catch (err) {
    console.warn('MySQL getAllApplications fallback:', err.message);
    return inMemoryApplications;
  }
}

export async function updateApplicationStatus(id, status, notes = null) {
  try {
    await query('UPDATE applications SET status = ?, notes = COALESCE(?, notes) WHERE id = ?', [status, notes, id]);
  } catch (err) {
    console.warn('MySQL updateApplicationStatus fallback:', err.message);
  }

  const app = inMemoryApplications.find(a => a.id === id);
  if (app) {
    app.status = status;
    if (notes) app.notes = notes;
    app.updatedAt = new Date().toISOString();
    return app;
  }
  return getApplicationById(id);
}
