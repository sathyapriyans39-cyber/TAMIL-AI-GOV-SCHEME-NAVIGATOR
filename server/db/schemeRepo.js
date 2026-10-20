/**
 * Scheme Repository (MySQL persistence with in-memory fallback)
 */

import { query, getPool } from './connection.js';
import { SCHEMES as FALLBACK_SCHEMES } from '../data/schemes.js';

function formatSchemeRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    schemeName: row.scheme_name,
    tamilName: row.tamil_name,
    governmentLevel: row.government_level,
    department: row.department,
    tamilDepartment: row.tamil_department,
    category: row.category,
    tamilCategory: row.tamil_category,
    description: row.description,
    tamilDescription: row.tamil_description,
    benefits: row.benefits,
    tamilBenefits: row.tamil_benefits,
    benefitAmount: parseFloat(row.benefit_amount) || 0,
    eligibilityCriteria: typeof row.eligibility_criteria === 'string' ? JSON.parse(row.eligibility_criteria) : (row.eligibility_criteria || {}),
    documentsRequired: typeof row.documents_required === 'string' ? JSON.parse(row.documents_required) : (row.documents_required || []),
    applicationProcess: typeof row.application_process === 'string' ? JSON.parse(row.application_process) : (row.application_process || []),
    tamilApplicationProcess: typeof row.tamil_application_process === 'string' ? JSON.parse(row.tamil_application_process) : (row.tamil_application_process || []),
    applicationWebsite: row.application_website,
    applicationCentre: row.application_centre,
    helpline: row.helpline,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getAllSchemes(filters = {}) {
  try {
    const { level, category, search } = filters;
    let sql = 'SELECT * FROM schemes WHERE 1=1';
    const params = [];

    if (level && level !== 'ALL') {
      sql += ' AND government_level = ?';
      params.push(level);
    }

    if (category && category !== 'ALL') {
      sql += ' AND LOWER(category) = LOWER(?)';
      params.push(category);
    }

    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      sql += ` AND (
        LOWER(scheme_name) LIKE ? OR
        tamil_name LIKE ? OR
        LOWER(description) LIKE ? OR
        tamil_description LIKE ? OR
        LOWER(department) LIKE ? OR
        tamil_department LIKE ?
      )`;
      params.push(q, q, q, q, q, q);
    }

    sql += ' ORDER BY benefit_amount DESC, scheme_name ASC';

    const rows = await query(sql, params);
    return rows.map(formatSchemeRow);
  } catch (err) {
    console.warn('MySQL getAllSchemes fallback to static data:', err.message);
    return FALLBACK_SCHEMES;
  }
}

export async function getSchemeById(id) {
  try {
    const rows = await query('SELECT * FROM schemes WHERE id = ? LIMIT 1', [id]);
    if (rows.length > 0) {
      return formatSchemeRow(rows[0]);
    }
  } catch (err) {
    console.warn('MySQL getSchemeById fallback:', err.message);
  }
  return FALLBACK_SCHEMES.find(s => s.id === id) || null;
}

export async function createScheme(data) {
  const newId = data.id || `scheme-${Date.now()}`;
  const sql = `
    INSERT INTO schemes (
      id, scheme_name, tamil_name, government_level, department, tamil_department,
      category, tamil_category, description, tamil_description, benefits, tamil_benefits,
      benefit_amount, eligibility_criteria, documents_required, application_process,
      tamil_application_process, application_website, application_centre, helpline, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    newId,
    data.schemeName,
    data.tamilName,
    data.governmentLevel || 'TAMIL_NADU',
    data.department || '',
    data.tamilDepartment || '',
    data.category || 'General',
    data.tamilCategory || 'பொது',
    data.description || '',
    data.tamilDescription || '',
    data.benefits || '',
    data.tamilBenefits || '',
    parseFloat(data.benefitAmount) || 0,
    JSON.stringify(data.eligibilityCriteria || {}),
    JSON.stringify(data.documentsRequired || []),
    JSON.stringify(data.applicationProcess || []),
    JSON.stringify(data.tamilApplicationProcess || []),
    data.applicationWebsite || 'https://www.tn.gov.in',
    data.applicationCentre || 'e-Sevai Centre',
    data.helpline || '1100',
    'ACTIVE'
  ];

  await query(sql, params);
  return getSchemeById(newId);
}

export async function updateScheme(id, data) {
  const existing = await getSchemeById(id);
  if (!existing) return null;

  const sql = `
    UPDATE schemes SET
      scheme_name = COALESCE(?, scheme_name),
      tamil_name = COALESCE(?, tamil_name),
      government_level = COALESCE(?, government_level),
      department = COALESCE(?, department),
      tamil_department = COALESCE(?, tamil_department),
      category = COALESCE(?, category),
      tamil_category = COALESCE(?, tamil_category),
      description = COALESCE(?, description),
      tamil_description = COALESCE(?, tamil_description),
      benefits = COALESCE(?, benefits),
      tamil_benefits = COALESCE(?, tamil_benefits),
      benefit_amount = COALESCE(?, benefit_amount),
      eligibility_criteria = COALESCE(?, eligibility_criteria),
      documents_required = COALESCE(?, documents_required),
      application_website = COALESCE(?, application_website),
      helpline = COALESCE(?, helpline)
    WHERE id = ?
  `;

  const params = [
    data.schemeName || null,
    data.tamilName || null,
    data.governmentLevel || null,
    data.department || null,
    data.tamilDepartment || null,
    data.category || null,
    data.tamilCategory || null,
    data.description || null,
    data.tamilDescription || null,
    data.benefits || null,
    data.tamilBenefits || null,
    data.benefitAmount !== undefined ? parseFloat(data.benefitAmount) : null,
    data.eligibilityCriteria ? JSON.stringify(data.eligibilityCriteria) : null,
    data.documentsRequired ? JSON.stringify(data.documentsRequired) : null,
    data.applicationWebsite || null,
    data.helpline || null,
    id
  ];

  await query(sql, params);
  return getSchemeById(id);
}

export async function deleteScheme(id) {
  const res = await query('DELETE FROM schemes WHERE id = ?', [id]);
  return res.affectedRows > 0;
}
