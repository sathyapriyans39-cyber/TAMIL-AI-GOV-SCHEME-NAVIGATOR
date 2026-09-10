/**
 * Admin Dashboard API Routes
 */

import express from 'express';
import { SCHEMES } from '../data/schemes.js';
import { USERS } from './authRoutes.js';
import { broadcastNewScheme } from '../services/notificationService.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Mock query analytics tracker
const searchAnalytics = [
  { query: "Pudhumai Penn scheme eligibility", count: 142, category: "Education" },
  { query: "Kalaignar Magalir Urimai Thittam", count: 218, category: "Women Welfare" },
  { query: "PM-KISAN ₹6000 status & documents", count: 95, category: "Farmer Schemes" },
  { query: "Free Bus Travel for Women", count: 87, category: "Women Welfare" },
  { query: "Post-Matric Scholarship college", count: 110, category: "Scholarships" },
  { query: "NEEDS scheme MSME loan subsidy", count: 64, category: "Entrepreneurship" }
];

// GET Admin Metrics & Analytics
router.get('/metrics', requireAdmin, (req, res) => {
  const tnSchemesCount = SCHEMES.filter(s => s.governmentLevel === 'TAMIL_NADU').length;
  const centralSchemesCount = SCHEMES.filter(s => s.governmentLevel === 'CENTRAL').length;
  
  const categoryDistribution = SCHEMES.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      totalSchemes: SCHEMES.length,
      tnSchemesCount,
      centralSchemesCount,
      totalRegisteredUsers: USERS.length,
      categoryDistribution,
      popularSearches: searchAnalytics,
      lastSyncTime: new Date().toISOString()
    }
  });
});

// POST Create New Scheme (with Auto-Matching broadcast to users!)
router.post('/schemes', requireAdmin, (req, res) => {
  try {
    const schemeData = req.body;

    if (!schemeData.schemeName || !schemeData.tamilName || !schemeData.governmentLevel) {
      return res.status(400).json({ success: false, message: 'Scheme name, Tamil name, and Government level are required' });
    }

    const newScheme = {
      id: schemeData.id || `custom-${Date.now()}`,
      schemeName: schemeData.schemeName,
      tamilName: schemeData.tamilName,
      governmentLevel: schemeData.governmentLevel, // TAMIL_NADU or CENTRAL
      department: schemeData.department || "Government Department",
      tamilDepartment: schemeData.tamilDepartment || "அரசுத் துறை",
      category: schemeData.category || "Social Welfare",
      tamilCategory: schemeData.tamilCategory || "சமூக நலம்",
      description: schemeData.description || "",
      tamilDescription: schemeData.tamilDescription || "",
      benefits: schemeData.benefits || "",
      tamilBenefits: schemeData.tamilBenefits || "",
      benefitAmount: parseFloat(schemeData.benefitAmount) || 0,
      eligibilityCriteria: schemeData.eligibilityCriteria || { minAge: 18, maxAge: 65, gender: "ALL", state: schemeData.governmentLevel === 'TAMIL_NADU' ? "Tamil Nadu" : "ALL_INDIA" },
      documentsRequired: schemeData.documentsRequired || [
        { id: "doc-aadhaar", name: "Aadhaar Card", tamilName: "ஆதார் அட்டை", required: true, source: "UIDAI", description: "Identity" },
        { id: "doc-ration", name: "Smart Ration Card", tamilName: "குடும்ப அட்டை", required: true, source: "Civil Supplies", description: "Residence" }
      ],
      applicationProcess: schemeData.applicationProcess || ["Apply online via official portal or visit nearest e-Seva centre."],
      tamilApplicationProcess: schemeData.tamilApplicationProcess || ["அதிகாரப்பூர்வ இணையதளம் அல்லது இ-சேவை மையம் மூலம் விண்ணப்பிக்கவும்."],
      applicationWebsite: schemeData.applicationWebsite || "https://www.tn.gov.in",
      helpline: schemeData.helpline || "1100",
      status: "ACTIVE",
      districtAvailability: schemeData.districtAvailability || "All Districts",
      applicationCentre: schemeData.applicationCentre || "e-Seva Centre / Taluk Office",
      lastUpdated: new Date().toISOString().split('T')[0],
      sourceUrl: schemeData.sourceUrl || "https://www.tn.gov.in"
    };

    SCHEMES.unshift(newScheme);

    // Broadcast new scheme and auto-match with user profiles!
    const generatedNotifs = broadcastNewScheme(newScheme, USERS);

    res.status(201).json({
      success: true,
      message: 'Scheme successfully published and notifications dispatched to matched citizen profiles!',
      scheme: newScheme,
      notificationsDispatched: generatedNotifs.length
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create scheme: ' + err.message });
  }
});

// PUT Update Scheme
router.put('/schemes/:id', requireAdmin, (req, res) => {
  const idx = SCHEMES.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Scheme not found' });
  }

  SCHEMES[idx] = {
    ...SCHEMES[idx],
    ...req.body,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  res.json({
    success: true,
    message: 'Scheme updated successfully',
    scheme: SCHEMES[idx]
  });
});

// DELETE Deactivate Scheme
router.delete('/schemes/:id', requireAdmin, (req, res) => {
  const idx = SCHEMES.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Scheme not found' });
  }

  const deleted = SCHEMES.splice(idx, 1)[0];
  res.json({
    success: true,
    message: `Scheme "${deleted.schemeName}" successfully deactivated.`
  });
});

export default router;
