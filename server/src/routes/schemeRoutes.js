/**
 * Schemes API Routes
 */

import express from 'express';
import { SCHEMES, CATEGORIES } from '../data/schemes.js';
import { evaluateEligibility, matchUserSchemes } from '../services/eligibilityEngine.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { USERS } from './authRoutes.js';

const router = express.Router();

// GET all schemes with filtering and search
router.get('/', authenticateToken, (req, res) => {
  const {
    level, // TAMIL_NADU, CENTRAL, ALL
    category,
    search,
    gender,
    maxIncome,
    occupation,
    district,
    sort
  } = req.query;

  let results = [...SCHEMES];

  // Filter by Government Level (State vs Central)
  if (level && level !== 'ALL') {
    results = results.filter(s => s.governmentLevel === level);
  }

  // Filter by Category
  if (category && category !== 'ALL') {
    results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }

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

  // Search keyword (Tamil or English)
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(s =>
      s.schemeName.toLowerCase().includes(q) ||
      s.tamilName.includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tamilDescription.includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.tamilDepartment.includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tamilCategory.includes(q)
    );
  }

  // If user is logged in, attach personalized eligibility match
  let currentUserProfile = null;
  if (req.user) {
    const user = USERS.find(u => u.id === req.user.id);
    if (user && user.profile) {
      currentUserProfile = user.profile;
    }
  }

  const enriched = results.map(scheme => {
    const evalResult = currentUserProfile ? evaluateEligibility(currentUserProfile, scheme) : null;
    return {
      ...scheme,
      eligibilityMatch: evalResult
    };
  });

  // Sorting
  if (sort === 'benefit_desc') {
    enriched.sort((a, b) => (b.benefitAmount || 0) - (a.benefitAmount || 0));
  } else if (sort === 'eligibility' && currentUserProfile) {
    enriched.sort((a, b) => (b.eligibilityMatch?.matchPercentage || 0) - (a.eligibilityMatch?.matchPercentage || 0));
  }

  res.json({
    success: true,
    total: enriched.length,
    schemes: enriched
  });
});

// GET categories list
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    categories: CATEGORIES
  });
});

// POST match user profile against all schemes
router.post('/match-profile', (req, res) => {
  const userProfile = req.body;
  const matched = matchUserSchemes(userProfile, SCHEMES);
  
  const potentiallyEligible = matched.filter(s => s.eligibilityMatch.isPotentiallyEligible);
  const others = matched.filter(s => !s.eligibilityMatch.isPotentiallyEligible);

  res.json({
    success: true,
    totalMatched: potentiallyEligible.length,
    potentiallyEligible,
    otherSchemes: others,
    allSchemes: matched
  });
});

// GET single scheme by ID
router.get('/:id', authenticateToken, (req, res) => {
  const scheme = SCHEMES.find(s => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ success: false, message: 'Scheme not found' });
  }

  let eligibilityMatch = null;
  if (req.user) {
    const user = USERS.find(u => u.id === req.user.id);
    if (user && user.profile) {
      eligibilityMatch = evaluateEligibility(user.profile, scheme);
    }
  }

  res.json({
    success: true,
    scheme: {
      ...scheme,
      eligibilityMatch
    }
  });
});

export default router;
