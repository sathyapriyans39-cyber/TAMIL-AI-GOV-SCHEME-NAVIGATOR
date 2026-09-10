/**
 * Application & e-Seva Service Centre Routes
 */

import express from 'express';
import { SERVICE_CENTRES, DISTRICTS } from '../data/centres.js';

const router = express.Router();

// Calculate distance in KM using Haversine formula
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// GET all service centres
router.get('/', (req, res) => {
  const { district, type, search } = req.query;
  let results = [...SERVICE_CENTRES];

  if (district && district !== 'ALL') {
    results = results.filter(c => c.district.toLowerCase() === district.toLowerCase());
  }

  if (type && type !== 'ALL') {
    results = results.filter(c => c.type.toLowerCase().includes(type.toLowerCase()));
  }

  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.tamilName.includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.tamilAddress.includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.taluk.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: results.length,
    centres: results
  });
});

// GET list of 38 Tamil Nadu districts
router.get('/districts', (req, res) => {
  res.json({
    success: true,
    districts: DISTRICTS
  });
});

// GET nearby centres by GPS coordinates
router.get('/nearby', (req, res) => {
  const { lat, lng, limit = 5 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ success: false, message: 'Latitude and Longitude are required for nearby search' });
  }

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  const withDistances = SERVICE_CENTRES.map(centre => {
    const dist = calculateDistanceKm(userLat, userLng, centre.lat, centre.lng);
    const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${centre.lat},${centre.lng}&travelmode=driving`;
    return {
      ...centre,
      distanceKm: dist,
      directionsUrl: googleDirectionsUrl
    };
  }).sort((a, b) => a.distanceKm - b.distanceKm);

  const nearest = withDistances.slice(0, parseInt(limit));

  res.json({
    success: true,
    userLocation: { lat: userLat, lng: userLng },
    nearestCentres: nearest
  });
});

// GET single centre
router.get('/:id', (req, res) => {
  const centre = SERVICE_CENTRES.find(c => c.id === req.params.id);
  if (!centre) {
    return res.status(404).json({ success: false, message: 'Service Centre not found' });
  }
  res.json({ success: true, centre });
});

export default router;
