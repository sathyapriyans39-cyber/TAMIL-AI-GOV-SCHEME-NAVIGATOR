/**
 * Tamil AI Government Scheme Navigator - Server Entry Point
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import centreRoutes from './routes/centreRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/centres', centreRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

// Serve built frontend assets if available
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    application: 'Tamil AI Government Scheme Navigator',
    tamilTitle: 'தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Fallback for Single Page App (SPA) routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) next();
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏛️  Tamil AI Government Scheme Navigator API Server`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
