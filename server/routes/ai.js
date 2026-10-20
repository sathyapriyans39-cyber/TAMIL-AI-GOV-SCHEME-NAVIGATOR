/**
 * AI Assistant Chatbot Route
 * Answers questions about government schemes in Tamil and English.
 */

import express from 'express';
import { processAiQuery } from '../services/ai.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { USERS } from './auth.js';
import { findUserById } from '../db/userRepo.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message, query, preferredLanguage } = req.body;
    const userQuery = message || query;

    if (!userQuery || !userQuery.trim()) {
      return res.status(400).json({ success: false, message: 'Question or message text is required.' });
    }

    let userProfile = null;
    if (req.user) {
      let user = await findUserById(req.user.id);
      if (!user) user = USERS.find(u => u.id === req.user.id);
      if (user) userProfile = user.profile;
    }

    const aiResult = await processAiQuery(userQuery, userProfile, preferredLanguage);

    res.json({
      success: true,
      reply: aiResult.reply,
      language: aiResult.language,
      scheme: aiResult.scheme,
      source: aiResult.source
    });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({
      success: false,
      message: 'AI assistant error: ' + err.message
    });
  }
});

export default router;
