/**
 * Authentication & Profile Routes with Persistent Disk Storage
 */

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JWT_SECRET, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/users_store.json');

// Default initial users
const DEFAULT_USERS = [
  {
    id: "usr-admin-01",
    name: "Dr. S. Kabilan (TN Welfare Admin)",
    email: "admin@tamilnadugov.in",
    mobile: "9876543210",
    passwordHash: bcrypt.hashSync("admin123", 10),
    preferredLanguage: "ta",
    role: "ADMIN",
    profile: {
      name: "Dr. S. Kabilan",
      age: 42,
      gender: "MALE",
      state: "Tamil Nadu",
      district: "Chennai",
      taluk: "Mylapore",
      village: "RA Puram",
      annualIncome: 650000,
      occupation: "Government Employee",
      isStudent: false,
      community: "BC",
      hasDisability: false
    },
    savedSchemes: ["tn-cmchis-health-insurance", "tn-needs-entrepreneur"],
    createdAt: new Date().toISOString()
  },
  {
    id: "usr-citizen-01",
    name: "Kavitha Selvam",
    email: "kavitha@example.com",
    mobile: "9443322110",
    passwordHash: bcrypt.hashSync("user123", 10),
    preferredLanguage: "ta",
    role: "CITIZEN",
    profile: {
      name: "Kavitha Selvam",
      age: 20,
      gender: "FEMALE",
      dateOfBirth: "2006-04-15",
      state: "Tamil Nadu",
      district: "Madurai",
      taluk: "Madurai North",
      village: "Tallakulam",
      annualIncome: 180000,
      occupation: "Student",
      employmentStatus: "Unemployed",
      bplStatus: true,
      isStudent: true,
      currentEducation: "UG",
      collegeCourse: "B.Sc Computer Science",
      studiedInGovtSchool6to12: true,
      isFirstGraduateInFamily: true,
      community: "MBC",
      caste: "Vanniyar",
      religion: "Hindu",
      hasDisability: false,
      maritalStatus: "Unmarried",
      hasLandholding: false
    },
    savedSchemes: ["tn-pudhumai-penn-scheme", "tn-first-graduate-tuition", "tn-post-matric-scholarship"],
    createdAt: new Date().toISOString()
  }
];

// Load persisted users from JSON file or initialize with defaults
export let USERS = [];

function loadUsersFromDisk() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      USERS = JSON.parse(raw);
    } else {
      USERS = [...DEFAULT_USERS];
      saveUsersToDisk();
    }
  } catch (err) {
    console.warn('Error reading users from disk, using defaults:', err.message);
    USERS = [...DEFAULT_USERS];
  }
}

function saveUsersToDisk() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(USERS, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving users to disk:', err.message);
  }
}

// Initial load
loadUsersFromDisk();

// Helper to generate JWT Token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      profile: user.profile
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// REGISTER NEW USER
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password, preferredLanguage, profile } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const existingUser = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: `usr-${uuidv4()}`,
      name,
      email: email.toLowerCase(),
      mobile: mobile || "",
      passwordHash,
      preferredLanguage: preferredLanguage || "ta",
      role: "CITIZEN",
      profile: profile || {
        name,
        age: 22,
        gender: "FEMALE",
        state: "Tamil Nadu",
        district: "Chennai",
        annualIncome: 200000,
        occupation: "Student",
        isStudent: true,
        studiedInGovtSchool6to12: true,
        isFirstGraduateInFamily: false,
        community: "BC",
        hasDisability: false
      },
      savedSchemes: [],
      createdAt: new Date().toISOString()
    };

    USERS.push(newUser);
    saveUsersToDisk();

    const token = generateToken(newUser);
    const { passwordHash: _, ...safeUser } = newUser;

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to Tamil AI Government Navigator.',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration: ' + err.message });
  }
});

// LOGIN EXISTING USER
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
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
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login: ' + err.message });
  }
});

// GET CURRENT USER PROFILE
router.get('/me', requireAuth, (req, res) => {
  const user = USERS.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  const { passwordHash: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// UPDATE PROFILE (Stores persistently)
router.put('/profile', requireAuth, (req, res) => {
  try {
    const user = USERS.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const updatedProfile = {
      ...user.profile,
      ...req.body
    };

    user.profile = updatedProfile;
    if (req.body.name) user.name = req.body.name;
    if (req.body.preferredLanguage) user.preferredLanguage = req.body.preferredLanguage;

    saveUsersToDisk();

    const { passwordHash: _, ...safeUser } = user;
    const newToken = generateToken(user);

    res.json({
      success: true,
      message: 'Profile updated and saved successfully!',
      token: newToken,
      user: safeUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// TOGGLE BOOKMARK / SAVED SCHEME
router.post('/saved-schemes/toggle', requireAuth, (req, res) => {
  const { schemeId } = req.body;
  if (!schemeId) {
    return res.status(400).json({ success: false, message: 'schemeId is required' });
  }

  const user = USERS.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (!Array.isArray(user.savedSchemes)) {
    user.savedSchemes = [];
  }

  const idx = user.savedSchemes.indexOf(schemeId);
  let saved = false;
  if (idx > -1) {
    user.savedSchemes.splice(idx, 1);
    saved = false;
  } else {
    user.savedSchemes.push(schemeId);
    saved = true;
  }

  saveUsersToDisk();

  res.json({
    success: true,
    saved,
    savedSchemes: user.savedSchemes
  });
});

export default router;
