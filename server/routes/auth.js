/**
 * Authentication & User Profile Routes
 * Handles Citizen and Admin registration, login, and profile storage in users_store.json.
 */

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JWT_SECRET, requireAuth } from '../middleware/authMiddleware.js';
import { DEFAULT_USERS } from '../data/seedUsers.js';
import { findUserByEmail, findUserById, createUser, updateUserProfile, getAllUsers } from '../db/userRepo.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/users_store.json');

export let USERS = [];

// Load users from users_store.json or create defaults
function loadUsers() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      USERS = JSON.parse(data);
    } else {
      USERS = [...DEFAULT_USERS];
      saveUsers();
    }
  } catch (err) {
    console.warn('Error reading users data, using defaults:', err.message);
    USERS = [...DEFAULT_USERS];
  }
}

function saveUsers() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(USERS, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving users to disk:', err.message);
  }
}

// Initial load
loadUsers();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile, district, occupation } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const emailClean = email.toLowerCase().trim();

    // Check MySQL first, fallback to memory
    let existing = await findUserByEmail(emailClean);
    if (!existing) {
      existing = USERS.find(u => u.email.toLowerCase() === emailClean);
    }

    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr-${uuidv4().substring(0, 8)}`,
      name: name.trim(),
      email: emailClean,
      mobile: mobile || '',
      passwordHash,
      role: 'CITIZEN',
      preferredLanguage: 'ta',
      profile: {
        name: name.trim(),
        age: 22,
        gender: 'FEMALE',
        state: 'Tamil Nadu',
        district: district || 'Chennai',
        annualIncome: 200000,
        occupation: occupation || 'Student',
        isStudent: occupation === 'Student',
        community: 'BC'
      },
      savedSchemes: [],
      createdAt: new Date().toISOString()
    };

    // Save to MySQL
    try {
      await createUser(newUser);
    } catch (dbErr) {
      console.warn('MySQL createUser notice:', dbErr.message);
    }

    // Also keep local array and JSON synced
    USERS.push(newUser);
    saveUsers();

    const token = generateToken(newUser);
    const { passwordHash: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed: ' + err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const emailClean = email.toLowerCase().trim();

    // Lookup user in MySQL, fallback to in-memory store
    let user = await findUserByEmail(emailClean);
    if (!user) {
      user = USERS.find(u => u.email.toLowerCase() === emailClean);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const { passwordHash: _, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed: ' + err.message });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req, res) => {
  try {
    let user = await findUserById(req.user.id);
    if (!user) {
      user = USERS.find(u => u.id === req.user.id);
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { passwordHash: _, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', requireAuth, async (req, res) => {
  try {
    let user = await findUserById(req.user.id);
    if (!user) {
      user = USERS.find(u => u.id === req.user.id);
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updatedProfile = {
      ...(user.profile || {}),
      ...req.body
    };

    const updatedName = req.body.name || user.name;

    // Update in MySQL
    let updatedUser = await updateUserProfile(req.user.id, updatedProfile, updatedName);

    // Keep memory and JSON file synced
    const localUser = USERS.find(u => u.id === req.user.id);
    if (localUser) {
      localUser.profile = updatedProfile;
      if (req.body.name) localUser.name = req.body.name;
      saveUsers();
    }

    const finalUser = updatedUser || localUser || user;
    const { passwordHash: _, ...safeUser } = finalUser;

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Profile update failed: ' + err.message });
  }
});

export default router;
