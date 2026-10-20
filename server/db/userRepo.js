/**
 * User Repository (MySQL persistence with users_store.json fallback)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './connection.js';
import { DEFAULT_USERS } from '../data/seedUsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/users_store.json');

function loadLocalUsers() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Error reading users_store.json:', e.message);
  }
  return [...DEFAULT_USERS];
}

function saveLocalUsers(users) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (e) {
    console.warn('Error writing users_store.json:', e.message);
  }
}

function formatUserRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    mobile: row.mobile,
    passwordHash: row.password_hash,
    role: row.role,
    preferredLanguage: row.preferred_language,
    profile: typeof row.profile === 'string' ? JSON.parse(row.profile) : (row.profile || {}),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function findUserByEmail(email) {
  try {
    const rows = await query('SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1', [email]);
    if (rows.length > 0) {
      return formatUserRow(rows[0]);
    }
  } catch (err) {
    // MySQL offline fallback
  }
  const localList = loadLocalUsers();
  return localList.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function findUserById(id) {
  try {
    const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length > 0) {
      return formatUserRow(rows[0]);
    }
  } catch (err) {
    // MySQL offline fallback
  }
  const localList = loadLocalUsers();
  return localList.find(u => u.id === id) || null;
}

export async function createUser(userData) {
  try {
    const sql = `
      INSERT INTO users (id, name, email, mobile, password_hash, role, preferred_language, profile)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userData.id,
      userData.name,
      userData.email,
      userData.mobile || null,
      userData.passwordHash,
      userData.role || 'CITIZEN',
      userData.preferredLanguage || 'ta',
      JSON.stringify(userData.profile || {})
    ];
    await query(sql, params);
  } catch (err) {
    console.warn('MySQL createUser fallback:', err.message);
  }

  // Ensure local JSON store is updated
  const localList = loadLocalUsers();
  const existingIdx = localList.findIndex(u => u.id === userData.id || u.email.toLowerCase() === userData.email.toLowerCase());
  if (existingIdx !== -1) {
    localList[existingIdx] = userData;
  } else {
    localList.push(userData);
  }
  saveLocalUsers(localList);

  return userData;
}

export async function updateUserProfile(id, profile, name = null) {
  try {
    if (name) {
      await query('UPDATE users SET profile = ?, name = ? WHERE id = ?', [JSON.stringify(profile), name, id]);
    } else {
      await query('UPDATE users SET profile = ? WHERE id = ?', [JSON.stringify(profile), id]);
    }
  } catch (err) {
    console.warn('MySQL updateUserProfile fallback:', err.message);
  }

  const localList = loadLocalUsers();
  const u = localList.find(x => x.id === id);
  if (u) {
    u.profile = profile;
    if (name) u.name = name;
    u.updatedAt = new Date().toISOString();
    saveLocalUsers(localList);
    return u;
  }

  return findUserById(id);
}

export async function getAllUsers() {
  try {
    const rows = await query('SELECT id, name, email, mobile, role, preferred_language, profile, created_at FROM users ORDER BY created_at DESC');
    if (rows.length > 0) return rows.map(formatUserRow);
  } catch (err) {
    // Fallback to local store
  }
  return loadLocalUsers();
}
