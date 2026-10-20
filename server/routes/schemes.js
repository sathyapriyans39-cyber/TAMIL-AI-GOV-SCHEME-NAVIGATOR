/**
 * Schemes Route Handler
 * Provides scheme filtering, search, category listing, profile matching, and application tracking.
 * Backed by MySQL database with fallback.
 */

import express from 'express';
import { CATEGORIES } from '../data/schemes.js';
import { getAllSchemes, getSchemeById } from '../db/schemeRepo.js';
import { createApplication, getUserApplications } from '../db/applicationRepo.js';
import { evaluateEligibility } from '../services/eligibilityEngine.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/schemes - Search and filter schemes from MySQL
router.get('/', async (req, res) => {
  try {
    const { search, category, level, gender, maxIncome } = req.query;

    let results = await getAllSchemes({ search, category, level });

    // Filter by Gender
    if (gender && gender !== 'ALL') {
      results = results.filter(s => {
        const g = s.eligibilityCriteria?.gender;
        return !g || g === 'ALL' || g === gender;
      });
    }

    // Filter by Max Income
    if (maxIncome) {
      const inc = parseFloat(maxIncome);
      results = results.filter(s => {
        const limit = s.eligibilityCriteria?.maxAnnualIncome;
        return !limit || limit >= inc;
      });
    }

    res.json({
      success: true,
      total: results.length,
      schemes: results
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch schemes: ' + err.message });
  }
});

// GET /api/schemes/categories - List available categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    categories: CATEGORIES
  });
});

// POST /api/schemes/match-profile - Compare user profile with schemes from MySQL
router.post('/match-profile', async (req, res) => {
  try {
    const userProfile = req.body;
    
    if (!userProfile) {
      return res.status(400).json({ success: false, message: 'User profile details required' });
    }

    const allSchemes = await getAllSchemes();

    const matches = allSchemes.map(scheme => {
      const evalResult = evaluateEligibility(userProfile, scheme);
      return {
        ...scheme,
        eligibilityMatch: evalResult
      };
    });

    const eligibleSchemes = matches
      .filter(s => s.eligibilityMatch && s.eligibilityMatch.isPotentiallyEligible)
      .sort((a, b) => b.eligibilityMatch.matchPercentage - a.eligibilityMatch.matchPercentage);

    const otherSchemes = matches
      .filter(s => !s.eligibilityMatch || !s.eligibilityMatch.isPotentiallyEligible);

    res.json({
      success: true,
      totalEligible: eligibleSchemes.length,
      eligibleSchemes,
      otherSchemes
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Profile matching error: ' + err.message });
  }
});

// POST /api/schemes/apply - Submit citizen application for a scheme
router.post('/apply', requireAuth, async (req, res) => {
  try {
    const { schemeId, applicantName, applicantPhone, applicantDistrict, notes } = req.body;

    if (!schemeId) {
      return res.status(400).json({ success: false, message: 'Scheme ID is required' });
    }

    const application = await createApplication({
      userId: req.user.id,
      schemeId,
      applicantName: applicantName || req.user.name || 'Citizen',
      applicantPhone: applicantPhone || '',
      applicantDistrict: applicantDistrict || '',
      status: 'SUBMITTED',
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Application submission failed: ' + err.message });
  }
});

// GET /api/schemes/applications/my - View current user's submitted applications
router.get('/applications/my', requireAuth, async (req, res) => {
  try {
    const apps = await getUserApplications(req.user.id);
    res.json({
      success: true,
      applications: apps
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve applications: ' + err.message });
  }
});

// GET /api/schemes/:id - Get single scheme details from MySQL
router.get('/:id', async (req, res) => {
  try {
    const scheme = await getSchemeById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }

    res.json({
      success: true,
      scheme
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving scheme: ' + err.message });
  }
});

export default router;
