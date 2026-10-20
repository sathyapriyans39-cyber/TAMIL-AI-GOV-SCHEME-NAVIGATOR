/**
 * Tamil AI Government Scheme Navigator - Server Entry Point
 * Clean Node.js + Express backend serving APIs and static client files.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import schemeRoutes from './routes/schemes.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import centreRoutes from './routes/centres.js';
import notificationRoutes from './routes/notifications.js';
import aiRoutes from './routes/ai.js';
import voiceRoutes from './routes/voice.js';
import { initDatabase, testConnection } from './db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables (from server/.env or root .env)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Status & Diagnostics endpoint
app.get('/api/db/status', async (req, res) => {
  try {
    const status = await testConnection();
    res.json(status);
  } catch (err) {
    res.status(500).json({ success: false, connected: false, error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const dbStatus = await testConnection();
  res.json({
    status: 'OK',
    application: 'Tamil AI Government Scheme Navigator',
    tamilTitle: 'தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி',
    version: '1.0.0',
    database: {
      connected: dbStatus.connected,
      type: 'MySQL (utf8mb4)',
      name: dbStatus.database,
      tables: dbStatus.tables || null
    },
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/schemes', schemeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/centres', centreRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/voice', voiceRoutes);

// Serve frontend static files from client folder
const clientPath = path.resolve(__dirname, '../client');
app.use(express.static(clientPath));

// Fallback to index.html for frontend navigation
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientPath, 'index.html'), (err) => {
    if (err) next();
  });
});

// Initialize database and start Express server
async function startServer() {
  try {
    await initDatabase();
  } catch (err) {
    console.warn('⚠️  MySQL auto-init notice:', err.message);
  }

  app.listen(PORT, () => {
    console.log('====================================================');
    console.log('🏛️  Tamil AI Government Scheme Navigator');
    console.log(`🌐 Server running at: http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🗄️  Database Status: http://localhost:${PORT}/api/db/status`);
    console.log('====================================================');
  });
}

startServer();

export default app;
