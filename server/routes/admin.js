/**
 * Admin Dashboard Routes
 * Scheme CRUD and Portal Metrics (Restricted to ADMIN role).
 * Backed by MySQL database with fallback.
 */

import express from 'express';
import { SCHEMES } from '../data/schemes.js';
import { USERS } from './auth.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { broadcastNewScheme } from '../services/notificationService.js';
import { getAllSchemes, createScheme, updateScheme, deleteScheme } from '../db/schemeRepo.js';
import { getAllUsers } from '../db/userRepo.js';
import { getAllApplications, updateApplicationStatus } from '../db/applicationRepo.js';

const router = express.Router();

// GET /api/admin/metrics - Summary statistics from MySQL
router.get('/metrics', requireAdmin, async (req, res) => {
  try {
    const schemes = await getAllSchemes();
    const users = await getAllUsers();

    const tnCount = schemes.filter(s => s.governmentLevel === 'TAMIL_NADU').length;
    const centralCount = schemes.filter(s => s.governmentLevel === 'CENTRAL').length;

    res.json({
      success: true,
      data: {
        totalSchemes: schemes.length,
        tnCount,
        centralCount,
        totalUsers: users.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to calculate metrics: ' + err.message });
  }
});

// POST /api/admin/schemes - Add new scheme to MySQL
router.post('/schemes', requireAdmin, async (req, res) => {
  try {
    const {
      schemeName,
      tamilName,
      governmentLevel,
      department,
      tamilDepartment,
      category,
      tamilCategory,
      description,
      tamilDescription,
      benefits,
      tamilBenefits,
      benefitAmount,
      minAge,
      maxAge,
      gender,
      maxAnnualIncome,
      documents,
      applicationWebsite,
      helpline
    } = req.body;

    // Validate inputs
    if (!schemeName || !tamilName || !category || !governmentLevel) {
      return res.status(400).json({
        success: false,
        message: 'Scheme name, Tamil name, category, and government level are required.'
      });
    }

    // Parse documents if provided as comma-separated or array
    let docsList = [];
    if (Array.isArray(documents)) {
      docsList = documents;
    } else if (typeof documents === 'string' && documents.trim()) {
      docsList = documents.split(',').map((d, i) => ({
        id: `doc-custom-${i + 1}`,
        name: d.trim(),
        tamilName: d.trim(),
        required: true,
        source: 'e-Sevai / Revenue Dept',
        description: 'Verification'
      }));
    } else {
      docsList = [
        { id: "doc-aadhaar", name: "Aadhaar Card", tamilName: "ஆதார் அட்டை", required: true, source: "UIDAI", description: "Identity" },
        { id: "doc-ration", name: "Ration Card", tamilName: "குடும்ப அட்டை", required: true, source: "Civil Supplies", description: "Residence" }
      ];
    }

    const newScheme = {
      id: req.body.id || `scheme-${Date.now()}`,
      schemeName: schemeName.trim(),
      tamilName: tamilName.trim(),
      governmentLevel: governmentLevel === 'CENTRAL' ? 'CENTRAL' : 'TAMIL_NADU',
      department: department || 'Department of Social Welfare',
      tamilDepartment: tamilDepartment || 'சமூக நலத்துறை',
      category: category || 'Social Welfare',
      tamilCategory: tamilCategory || 'சமூக நலம்',
      description: description || 'Government benefit scheme.',
      tamilDescription: tamilDescription || 'அரசு நலத்திட்டம்.',
      benefits: benefits || 'Direct welfare benefit.',
      tamilBenefits: tamilBenefits || 'நேரடி நலத்திட்ட பயன்.',
      benefitAmount: parseFloat(benefitAmount) || 0,
      eligibilityCriteria: {
        minAge: parseInt(minAge) || 18,
        maxAge: parseInt(maxAge) || 65,
        gender: gender || 'ALL',
        maxAnnualIncome: maxAnnualIncome ? parseFloat(maxAnnualIncome) : null,
        state: governmentLevel === 'CENTRAL' ? 'ALL_INDIA' : 'Tamil Nadu'
      },
      documentsRequired: docsList,
      applicationProcess: [
        'Visit official portal or nearest e-Sevai centre.',
        'Submit required verification documents.',
        'Obtain acknowledgement receipt.'
      ],
      tamilApplicationProcess: [
        'அதிகாரப்பூர்வ இணையதளம் அல்லது அருகிலுள்ள இ-சேவை மையத்தை அணுகவும்.',
        'தேவையான ஆவணங்களை சமர்ப்பிக்கவும்.',
        'விண்ணப்ப ரசீதைப் பெற்றுக்கொள்ளவும்.'
      ],
      applicationWebsite: applicationWebsite || 'https://www.tn.gov.in',
      helpline: helpline || '1100',
      applicationCentre: 'e-Sevai Centre / Taluk Office',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    // Save in MySQL
    let persisted = null;
    try {
      persisted = await createScheme(newScheme);
    } catch (dbErr) {
      console.warn('MySQL createScheme error:', dbErr.message);
    }

    // Keep memory cache synced
    SCHEMES.unshift(persisted || newScheme);

    // Broadcast in-app notification
    try {
      const allUsers = await getAllUsers();
      broadcastNewScheme(persisted || newScheme, allUsers);
    } catch (e) {
      console.warn('Notification broadcast warning:', e.message);
    }

    res.status(201).json({
      success: true,
      message: 'Scheme added successfully!',
      scheme: persisted || newScheme
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add scheme: ' + err.message });
  }
});

// PUT /api/admin/schemes/:id - Edit scheme in MySQL
router.put('/schemes/:id', requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    let updated = null;

    try {
      updated = await updateScheme(id, req.body);
    } catch (dbErr) {
      console.warn('MySQL updateScheme error:', dbErr.message);
    }

    // Sync in-memory array
    const idx = SCHEMES.findIndex(s => s.id === id);
    if (idx !== -1) {
      SCHEMES[idx] = {
        ...SCHEMES[idx],
        ...req.body,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    }

    if (!updated && idx === -1) {
      return res.status(404).json({ success: false, message: 'Scheme not found.' });
    }

    res.json({
      success: true,
      message: 'Scheme updated successfully!',
      scheme: updated || SCHEMES[idx]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update scheme: ' + err.message });
  }
});

// DELETE /api/admin/schemes/:id - Delete scheme from MySQL
router.delete('/schemes/:id', requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    let deletedSuccess = false;

    try {
      deletedSuccess = await deleteScheme(id);
    } catch (dbErr) {
      console.warn('MySQL deleteScheme error:', dbErr.message);
    }

    const idx = SCHEMES.findIndex(s => s.id === id);
    let deletedName = id;
    if (idx !== -1) {
      deletedName = SCHEMES.splice(idx, 1)[0].schemeName;
      deletedSuccess = true;
    }

    if (!deletedSuccess && idx === -1) {
      return res.status(404).json({ success: false, message: 'Scheme not found.' });
    }

    res.json({
      success: true,
      message: `Scheme "${deletedName}" deleted successfully.`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete scheme: ' + err.message });
  }
});

// GET /api/admin/applications - List all citizen scheme applications
router.get('/applications', requireAdmin, async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.json({
      success: true,
      applications
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve applications: ' + err.message });
  }
});

// PUT /api/admin/applications/:id/status - Update application status (APPROVED, REJECTED, etc.)
router.put('/applications/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status, notes } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updated = await updateApplicationStatus(req.params.id, status, notes);
    res.json({
      success: true,
      message: 'Application status updated successfully!',
      application: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update application status: ' + err.message });
  }
});

export default router;
