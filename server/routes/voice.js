/**
 * Sarvam AI Voice Routes (STT and TTS)
 * Supports Tamil (ta-IN) and Indian English (en-IN) speech recognition and synthesis.
 * Uses Sarvam AI Saaras model for STT and Bulbul model for TTS.
 */

import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// GET /api/voice/status - Check voice service readiness
router.get('/status', (req, res) => {
  const sarvamKey = process.env.SARVAM_API_KEY;
  const isConfigured = Boolean(sarvamKey && sarvamKey.startsWith('sk_') && !sarvamKey.includes('your_'));
  res.json({
    success: true,
    available: isConfigured,
    provider: 'Sarvam AI',
    models: {
      stt: 'saaras:v3',
      tts: 'bulbul:v3'
    },
    languages: ['ta', 'en']
  });
});

// POST /api/voice/stt - Speech to Text (Transcribe Audio)
router.post('/stt', upload.single('audio'), async (req, res) => {
  try {
    const sarvamKey = process.env.SARVAM_API_KEY;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: 'Audio file is required for speech recognition.'
      });
    }

    if (!sarvamKey || sarvamKey.includes('your_')) {
      return res.status(503).json({
        success: false,
        message: 'Sarvam AI API key is not configured on the server. Please enter text manually.'
      });
    }

    // Determine target Indian language code
    const requestedLang = (req.body.language || '').toLowerCase();
    const languageCode = requestedLang === 'en' ? 'en-IN' : 'ta-IN';

    // Prepare multipart payload using form-data for reliability
    const form = new FormData();
    const fileName = req.file.originalname || (req.file.mimetype?.includes('webm') ? 'speech.webm' : 'speech.wav');
    const mimeType = req.file.mimetype || 'audio/wav';

    form.append('file', req.file.buffer, {
      filename: fileName,
      contentType: mimeType
    });
    form.append('model', 'saaras:v3');
    form.append('language_code', languageCode);
    form.append('mode', 'transcribe');

    const response = await axios.post('https://api.sarvam.ai/speech-to-text', form, {
      headers: {
        ...form.getHeaders(),
        'api-subscription-key': sarvamKey
      },
      timeout: 20000
    });

    const transcript = response.data?.transcript || '';

    res.json({
      success: true,
      text: transcript,
      language: languageCode,
      requestId: response.data?.request_id || null
    });
  } catch (err) {
    const errorDetails = err.response?.data?.error?.message || err.response?.data?.message || err.message;
    console.error('Sarvam STT Error:', errorDetails);
    res.status(err.response?.status || 500).json({
      success: false,
      message: 'Speech recognition failed: ' + errorDetails,
      error: errorDetails
    });
  }
});

// POST /api/voice/tts - Text to Speech (Synthesize Speech)
router.post('/tts', async (req, res) => {
  try {
    const { text, language = 'ta' } = req.body;
    const sarvamKey = process.env.SARVAM_API_KEY;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Text is required for speech synthesis.'
      });
    }

    if (!sarvamKey || sarvamKey.includes('your_')) {
      return res.status(503).json({
        success: false,
        message: 'Sarvam AI API key is not configured on the server.'
      });
    }

    // Clean formatting, markdown, emojis, asterisks, URLs and disclaimers for natural voice output
    const cleanText = text
      .replace(/[*#_~`>\[\]\(\)]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[🏛️💰📋📝🌐📞⚠️💡🎉✅🎯👤⚙️🔑🤖👋]/g, '')
      .replace(/⚠️.*$/s, '') // omit disclaimers from speech
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 500); // optimal length for quick audio synthesis

    if (!cleanText) {
      return res.status(400).json({
        success: false,
        message: 'No readable text available for speech synthesis.'
      });
    }

    const targetLang = (language === 'en') ? 'en-IN' : 'ta-IN';
    const speaker = targetLang === 'en-IN' ? 'aditya' : 'shubh';

    const response = await axios.post(
      'https://api.sarvam.ai/text-to-speech',
      {
        text: cleanText,
        target_language_code: targetLang,
        speaker: speaker,
        pace: 1.0,
        speech_sample_rate: 22050
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': sarvamKey
        },
        timeout: 15000
      }
    );

    const audioBase64 = response.data?.audios?.[0] || '';

    if (!audioBase64) {
      throw new Error('No audio data returned by Sarvam TTS.');
    }

    res.json({
      success: true,
      audio: audioBase64,
      format: 'audio/wav',
      language: targetLang,
      speaker: speaker
    });
  } catch (err) {
    const errorDetails = err.response?.data?.error?.message || err.response?.data?.message || err.message;
    console.error('Sarvam TTS Error:', errorDetails);
    res.status(err.response?.status || 500).json({
      success: false,
      message: 'Text-to-speech failed: ' + errorDetails,
      error: errorDetails
    });
  }
});

export default router;
