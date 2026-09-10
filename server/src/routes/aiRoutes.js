/**
 * AI Assistant, Voice STT, and TTS Routes
 */

import express from 'express';
import multer from 'multer';
import { processAiSchemeQuery } from '../services/ragAiService.js';
import { transcribeAudio, synthesizeSpeech } from '../services/voiceService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { USERS } from './authRoutes.js';
import { SCHEMES } from '../data/schemes.js';

const router = express.Router();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB max audio

// POST AI Chat Query (RAG powered)
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { query, preferredLanguage, profileOverride } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: 'Query text is required' });
    }

    let userProfile = profileOverride || null;
    if (!userProfile && req.user) {
      const user = USERS.find(u => u.id === req.user.id);
      if (user) userProfile = user.profile;
    }

    const aiResult = await processAiSchemeQuery(query, userProfile, preferredLanguage);

    res.json({
      success: true,
      data: aiResult
    });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process AI query: ' + err.message });
  }
});

// POST Voice Input (Whisper STT)
router.post('/stt', upload.single('audio'), async (req, res) => {
  try {
    const language = req.body.language || 'ta';
    const audioBuffer = req.file ? req.file.buffer : null;
    const mimeType = req.file ? req.file.mimetype : 'audio/webm';

    const transcription = await transcribeAudio(audioBuffer, mimeType, language);

    res.json({
      success: true,
      text: transcription.text,
      provider: transcription.provider
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'STT Transcription failed: ' + err.message });
  }
});

// GET /api/ai/tts/stream - Stream synthesized audio directly
router.get('/tts/stream', async (req, res) => {
  try {
    const text = req.query.text;
    const language = req.query.language || req.query.lang || 'ta';

    if (!text || !text.trim()) {
      return res.status(400).send('Text parameter is required for TTS streaming');
    }

    const ttsResult = await synthesizeSpeech(text, language);

    if (ttsResult.audioBuffer) {
      res.set({
        'Content-Type': ttsResult.contentType || 'audio/mpeg',
        'Content-Length': ttsResult.audioBuffer.length,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=86400',
        'X-TTS-Provider': encodeURIComponent(ttsResult.provider || 'Neural TTS')
      });
      return res.send(ttsResult.audioBuffer);
    }

    res.status(500).send('Could not generate audio stream');
  } catch (err) {
    console.error('TTS Stream Error:', err);
    res.status(500).send('TTS synthesis error: ' + err.message);
  }
});

// POST Voice Output (TTS)
router.post('/tts', async (req, res) => {
  try {
    const { text, language = 'ta' } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required for TTS' });
    }

    const ttsResult = await synthesizeSpeech(text, language);

    if (ttsResult.audioBuffer) {
      res.set({
        'Content-Type': ttsResult.contentType || 'audio/mpeg',
        'Content-Length': ttsResult.audioBuffer.length,
        'Cache-Control': 'public, max-age=86400'
      });
      return res.send(ttsResult.audioBuffer);
    }

    res.json({
      success: true,
      useClientSpeech: true,
      text: ttsResult.text,
      language: ttsResult.language
    });
  } catch (err) {
    console.error('TTS Post Error:', err);
    res.status(500).json({ success: false, message: 'TTS synthesis error: ' + err.message });
  }
});

// POST Scheme Required Documents Guide & Advisor
router.post('/document-advisor', (req, res) => {
  const { schemeId, language = 'ta' } = req.body;
  const scheme = SCHEMES.find(s => s.id === schemeId);

  if (!scheme) {
    return res.status(404).json({ success: false, message: 'Scheme not found' });
  }

  const isTamil = language === 'ta';
  const generalCertGuide = [
    {
      certificate: isTamil ? "வருமானச் சான்றிதழ் (Income Certificate)" : "Income Certificate",
      portal: "https://www.tnesevai.tn.gov.in",
      issuingAuthority: isTamil ? "வருவாய்த் துறை (வட்டாட்சியர் / மண்டல துணை வட்டாட்சியர்)" : "Revenue Department (Zonal Deputy Tahsildar)",
      deliveryTime: "3 - 7 Working Days",
      requiredProofs: isTamil ? ["ரேஷன் கார்டு", "மாத ஊதிய ரசீது / VAO கடிதம்", "ஆதார் அட்டை"] : ["Smart Ration Card", "Salary Slip / VAO letter", "Aadhaar Card"]
    },
    {
      certificate: isTamil ? "சாதிச் சான்றிதழ் (Community Certificate)" : "Community Certificate (SC/ST/BC/MBC)",
      portal: "https://www.tnesevai.tn.gov.in",
      issuingAuthority: isTamil ? "வருவாய்த் துறை / வட்டாட்சியர்" : "Tahsildar / Revenue Department",
      deliveryTime: "7 - 15 Working Days",
      requiredProofs: isTamil ? ["பெற்றோர் / உடன்பிறந்தோர் சாதி சான்று", "பள்ளி மாற்றுச் சான்றிதழ் (TC)", "ரேஷன் கார்டு"] : ["Parents' Community Certificate", "School TC", "Smart Card"]
    },
    {
      certificate: isTamil ? "முதல் பட்டதாரி சான்றிதழ் (First Graduate Certificate)" : "First Graduate Certificate",
      portal: "https://www.tnesevai.tn.gov.in",
      issuingAuthority: isTamil ? "வட்டாட்சியர் (TNeGA e-Seva)" : "Tahsildar (Revenue Department)",
      deliveryTime: "7 - 10 Working Days",
      requiredProofs: isTamil ? ["குடும்பத்தில் வேறு யாரும் பட்டம் பெறவில்லை என்பதற்கான கூட்டு உறுதிமொழி", "பெற்றோரின் கல்வி சான்று", "ரேஷன் அட்டை"] : ["Joint declaration by parents & candidate", "Parents' TC / education proof", "Family Ration Card"]
    }
  ];

  res.json({
    success: true,
    schemeId: scheme.id,
    schemeName: isTamil ? scheme.tamilName : scheme.schemeName,
    documentsRequired: scheme.documentsRequired,
    generalCertGuide,
    eSevaPortal: "https://www.tnesevai.tn.gov.in",
    helpline: "1100 / 044-25619222"
  });
});

export default router;
