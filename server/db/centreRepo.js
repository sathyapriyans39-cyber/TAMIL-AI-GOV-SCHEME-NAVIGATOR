/**
 * Centres Repository (MySQL persistence for e-Sevai centres)
 */

import { query } from './connection.js';
import { SERVICE_CENTRES, DISTRICTS } from '../data/centres.js';

function formatCentreRow(row) {
  if (!row) return null;
  const lat = parseFloat(row.lat);
  const lng = parseFloat(row.lng);
  return {
    id: row.id,
    name: row.name,
    tamilName: row.tamil_name,
    type: row.type,
    district: row.district,
    taluk: row.taluk,
    address: row.address,
    tamilAddress: row.tamil_address,
    pincode: row.pincode,
    phone: row.phone,
    email: row.email,
    operatingHours: row.operating_hours,
    lat,
    lng,
    servicesProvided: typeof row.services_provided === 'string' ? JSON.parse(row.services_provided) : (row.services_provided || []),
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    createdAt: row.created_at
  };
}

export async function getAllCentres(district, search) {
  try {
    let sql = 'SELECT * FROM centres WHERE 1=1';
    const params = [];

    if (district && district !== 'ALL') {
      sql += ' AND LOWER(district) = LOWER(?)';
      params.push(district);
    }

    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      sql += ` AND (
        LOWER(name) LIKE ? OR
        tamil_name LIKE ? OR
        LOWER(address) LIKE ? OR
        tamil_address LIKE ? OR
        LOWER(taluk) LIKE ? OR
        pincode LIKE ?
      )`;
      params.push(q, q, q, q, q, q);
    }

    sql += ' ORDER BY district ASC, name ASC';

    const rows = await query(sql, params);
    return rows.map(formatCentreRow);
  } catch (err) {
    console.warn('MySQL getAllCentres fallback:', err.message);
    let results = [...SERVICE_CENTRES];
    if (district && district !== 'ALL') {
      results = results.filter(c => c.district.toLowerCase() === district.toLowerCase());
    }
    return results.map(c => ({
      ...c,
      directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`
    }));
  }
}

export async function getCentreById(id) {
  try {
    const rows = await query('SELECT * FROM centres WHERE id = ? LIMIT 1', [id]);
    if (rows.length > 0) return formatCentreRow(rows[0]);
  } catch (err) {}
  return SERVICE_CENTRES.find(c => c.id === id) || null;
}

export function getAllDistricts() {
  return DISTRICTS;
}
