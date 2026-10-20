/**
 * e-Sevai Service Centres Routes
 * Search centres by district, taluk, town, or PIN code.
 * Backed by MySQL database with fallback.
 */

import express from 'express';
import { getAllCentres, getCentreById, getAllDistricts } from '../db/centreRepo.js';

const router = express.Router();

// GET /api/centres - Search centres from MySQL
router.get('/', async (req, res) => {
  try {
    const { district, search } = req.query;
    const centres = await getAllCentres(district, search);

    res.json({
      success: true,
      total: centres.length,
      centres
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch centres: ' + err.message });
  }
});

// GET /api/centres/districts - List all 38 districts
router.get('/districts', (req, res) => {
  res.json({
    success: true,
    districts: getAllDistricts()
  });
});

// GET /api/centres/:id - Get single centre from MySQL
router.get('/:id', async (req, res) => {
  try {
    const centre = await getCentreById(req.params.id);
    if (!centre) {
      return res.status(404).json({ success: false, message: 'Centre not found' });
    }

    res.json({
      success: true,
      centre: {
        ...centre,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch centre: ' + err.message });
  }
});

export default router;
