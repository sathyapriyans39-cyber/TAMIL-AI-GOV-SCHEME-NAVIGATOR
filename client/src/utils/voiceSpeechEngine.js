/**
 * Voice Speech Engine
 * Professional, clear, natural speech synthesis & recognition engine.
 * Features dual-mode architecture:
 * 1. Web Speech API (when authentic native Tamil / Indian English voices are present in OS/browser)
 * 2. High-Definition Neural Audio Stream (via /api/ai/tts/stream for 100% reliable, crystal-clear voice)
 * 3. MediaRecorder Microphone Fallback for STT (posting to /api/ai/stt when WebSpeech is unavailable)
 */

const API_BASE = 'http://localhost:5000/api';

// Voice cache
let cachedVoices = [];

function loadVoices() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  }
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

/**
 * Normalizes markdown/text into natural, fluent spoken words
 */
export function cleanTextForSpeech(text, lang = 'ta') {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove Markdown headers, bold, italics, blockquotes, code fences, links
  cleaned = cleaned
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#+\s+/gm, '')
    .replace(/[*_~`#]/g, '')
    .replace(/^>\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '');

  // 2. Remove emojis and special formatting characters
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

  if (lang === 'ta' || lang.startsWith('ta')) {
    // 3. Tamil Currency & Number Normalization
    cleaned = cleaned
      .replace(/₹\s*5[,.]?00[,.]?000|₹\s*5\s*Lakh/gi, 'ஐந்து லட்சம் ரூபாய்')
      .replace(/₹\s*1[,.]?00[,.]?000|₹\s*1\s*Lakh/gi, 'ஒரு லட்சம் ரூபாய்')
      .replace(/₹\s*50[,.]?000/g, 'ஐம்பதாயிரம் ரூபாய்')
      .replace(/₹\s*25[,.]?000/g, 'இருபத்தைந்தாயிரம் ரூபாய்')
      .replace(/₹\s*12[,.]?000/g, 'பன்னிரண்டாயிரம் ரூபாய்')
      .replace(/₹\s*10[,.]?000/g, 'பத்தாயிரம் ரூபாய்')
      .replace(/₹\s*6[,.]?000/g, 'ஆறாயிரம் ரூபாய்')
      .replace(/₹\s*5[,.]?000/g, 'ஐந்தாயிரம் ரூபாய்')
      .replace(/₹\s*2[,.]?000/g, 'இரண்டாயிரம் ரூபாய்')
      .replace(/₹\s*1[,.]?000/g, 'ஆயிரம் ரூபாய்')
      .replace(/₹\s*500/g, 'ஐந்நூறு ரூபாய்')
      .replace(/₹\s*(\d+)/g, '$1 ரூபாய்');

    // 4. Tamil Acronyms to Natural Spoken Tamil
    cleaned = cleaned
      .replace(/\bPM-KISAN\b/gi, 'பி.எம். கிசான் திட்டம்')
      .replace(/\bCMCHIS\b/gi, 'முதலமைச்சரின் விரிவான மருத்துவ காப்பீட்டுத் திட்டம்')
      .replace(/\bTNeGA\b/gi, 'தமிழ்நாடு மின்னாளுமை முகமை')
      .replace(/\be-Seva\b/gi, 'இ-சேவை')
      .replace(/\bCSC\b/gi, 'பொது சேவை மையம்')
      .replace(/\bSC\/ST\b/gi, 'பட்டியலின மற்றும் பழங்குடியினர்')
      .replace(/\bBC\/MBC\b/gi, 'பிற்படுத்தப்பட்ட மற்றும் மிகவும் பிற்படுத்தப்பட்டோர்')
      .replace(/\bBPL\b/gi, 'வறுமைக் கோட்டிற்கு கீழ் உள்ள குடும்பங்கள்')
      .replace(/\bUIDAI\b/gi, 'ஆதார் ஆணையம்')
      .replace(/\bVAO\b/gi, 'கிராம நிர்வாக அலுவலர்')
      .replace(/\bTC\b/gi, 'பள்ளி மாற்றுச் சான்றிதழ்')
      .replace(/\bUG\b/gi, 'இளங்கலை பட்டப்படிப்பு')
      .replace(/\bPG\b/gi, 'முதுகலை பட்டப்படிப்பு')
      .replace(/\bPwD\b/gi, 'மாற்றுத்திறனாளிகள்')
      .replace(/\bOBC\b/gi, 'இதர பிற்படுத்தப்பட்டோர்');
  } else {
    // English Currency Normalization
    cleaned = cleaned
      .replace(/₹\s*5[,.]?00[,.]?000|₹\s*5\s*Lakh/gi, '5 lakh rupees')
      .replace(/₹\s*1[,.]?00[,.]?000|₹\s*1\s*Lakh/gi, '1 lakh rupees')
      .replace(/₹\s*12[,.]?000/g, '12 thousand rupees')
      .replace(/₹\s*10[,.]?000/g, '10 thousand rupees')
      .replace(/₹\s*6[,.]?000/g, '6 thousand rupees')
      .replace(/₹\s*5[,.]?000/g, '5 thousand rupees')
      .replace(/₹\s*2[,.]?000/g, '2 thousand rupees')
      .replace(/₹\s*1[,.]?000/g, '1 thousand rupees')
      .replace(/₹\s*(\d+)/g, '$1 rupees');

    // English Acronyms
    cleaned = cleaned
      .replace(/\bPM-KISAN\b/gi, 'P M Kisan Scheme')
      .replace(/\bCMCHIS\b/gi, 'Chief Minister Comprehensive Health Insurance Scheme')
      .replace(/\be-Seva\b/gi, 'e-Seva')
      .replace(/\bVAO\b/gi, 'Village Administrative Officer')
      .replace(/\bTC\b/gi, 'Transfer Certificate')
      .replace(/\bPwD\b/gi, 'Person with Disability');
  }

  // 5. Clean up bullet points, dashes, and extra whitespaces
  cleaned = cleaned
    .replace(/^[-*•]\s+/gm, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/(\n\s*){2,}/g, '. ')
    .replace(/\n/g, ', ')
    .trim();

  return cleaned;
}

/**
 * Checks if the browser has an authentic native Tamil voice installed
 */
export function hasNativeTamilVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  loadVoices();
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices() || [];
  return voices.some(v => 
    v.lang.startsWith('ta') || 
    v.lang.includes('ta-IN') || 
    v.lang.includes('ta-LK') || 
    v.name.toLowerCase().includes('tamil') ||
    v.name.toLowerCase().includes('valluvar') ||
    v.name.toLowerCase().includes('pallavi')
  );
}

/**
 * Selects optimal browser voice if available
 */
export function selectOptimalVoice(lang = 'ta') {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  loadVoices();
  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices() || [];
  if (!voices || voices.length === 0) return null;

  if (lang === 'ta' || lang.startsWith('ta')) {
    const tamilVoices = voices.filter(v => 
      v.lang.startsWith('ta') || 
      v.lang.includes('ta-IN') || 
      v.lang.includes('ta-LK') || 
      v.name.toLowerCase().includes('tamil') ||
      v.name.toLowerCase().includes('valluvar') ||
      v.name.toLowerCase().includes('pallavi')
    );

    if (tamilVoices.length > 0) {
      const naturalTamil = tamilVoices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Natural') || 
        v.name.includes('Neural') || 
        v.name.includes('Online')
      );
      return naturalTamil || tamilVoices[0];
    }
    return null;
  }

  // Indian English or High-Quality English
  const indianEnglishVoices = voices.filter(v => 
    v.lang.includes('en-IN') || 
    v.name.toLowerCase().includes('india')
  );

  if (indianEnglishVoices.length > 0) {
    const naturalEnIn = indianEnglishVoices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Natural') || 
      v.name.includes('Neerja') || 
      v.name.includes('Prabhat')
    );
    return naturalEnIn || indianEnglishVoices[0];
  }

  const highQualityEn = voices.find(v => 
    v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
  );

  return highQualityEn || voices.find(v => v.lang.startsWith('en')) || voices[0];
}

/**
 * Splits text into natural sentence chunks under maxChunkLen (max 140 chars)
 */
export function chunkTextIntoSentences(text, maxChunkLen = 140) {
  if (!text) return [];

  const rawSegments = text.match(/[^.!?\n]+[.!?\n]+/g) || [text];
  const chunks = [];
  let current = '';

  for (const s of rawSegments) {
    const trimmed = s.trim();
    if (!trimmed) continue;

    if ((current + ' ' + trimmed).length > maxChunkLen && current.length > 0) {
      chunks.push(current.trim());
      current = trimmed;
    } else {
      current = current ? `${current} ${trimmed}` : trimmed;
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  const finalChunks = [];
  for (const c of chunks) {
    if (c.length <= maxChunkLen) {
      finalChunks.push(c);
    } else {
      const words = c.split(' ');
      let sub = '';
      for (const w of words) {
        if ((sub + ' ' + w).length > maxChunkLen && sub.length > 0) {
          finalChunks.push(sub.trim());
          sub = w;
        } else {
          sub = sub ? `${sub} ${w}` : w;
        }
      }
      if (sub.trim()) finalChunks.push(sub.trim());
    }
  }

  return finalChunks.length > 0 ? finalChunks : [text];
}

/**
 * Dual-Mode Natural Speech Synthesizer (TTS)
 * Supports gapless audio streaming & native speech synthesis for both English and Tamil.
 */
export class HybridSpeechSynthesizer {
  constructor() {
    this.speaking = false;
    this.paused = false;
    this.mode = 'stream'; // 'native' or 'stream'
    this.currentUtterance = null;
    this.currentAudio = null;
    this.nextAudio = null;
    this.queue = [];
    this.currentChunkIndex = 0;
    this.rate = 0.95;
    this.pitch = 1.0;
    this.lang = 'ta';
    this.onStart = null;
    this.onEnd = null;
    this.onProgress = null;
    this.onError = null;
    this.nativeTimer = null;
  }

  speak({ text, lang = 'ta', rate = 0.95, pitch = 1.0, onStart, onEnd, onProgress, onError }) {
    this.stop();

    if (!text || !text.trim()) return;

    this.lang = lang;
    this.rate = rate;
    this.pitch = pitch;
    this.onStart = onStart;
    this.onEnd = onEnd;
    this.onProgress = onProgress;
    this.onError = onError;

    const cleanedText = cleanTextForSpeech(text, lang);
    const chunks = chunkTextIntoSentences(cleanedText, 140);

    if (chunks.length === 0) return;

    this.queue = chunks;
    this.currentChunkIndex = 0;
    this.speaking = true;
    this.paused = false;

    // Use Sarvam AI TTS audio stream
    this.mode = 'stream';
    if (this.onStart) this.onStart();
    this._playStreamChunk();
  }

  async _playStreamChunk() {
    if (!this.speaking || this.currentChunkIndex >= this.queue.length) {
      this.stop();
      if (this.onEnd) this.onEnd();
      return;
    }

    const chunkText = this.queue[this.currentChunkIndex];

    if (this.onProgress) {
      this.onProgress({
        chunkIndex: this.currentChunkIndex,
        totalChunks: this.queue.length,
        text: chunkText
      });
    }

    try {
      const response = await fetch(`${API_BASE}/voice/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: chunkText,
          language: this.lang
        })
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        const errorMsg = errorJson.message || `Sarvam AI TTS Error (${response.status})`;
        throw new Error(errorMsg);
      }

      const audioBlob = await response.blob();
      const objectUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(objectUrl);
      audio.playbackRate = this.rate;
      this.currentAudio = audio;

      audio.onended = () => {
        URL.revokeObjectURL(objectUrl);
        if (!this.speaking) return;
        this.currentChunkIndex++;
        this._playStreamChunk();
      };

      audio.onerror = (e) => {
        URL.revokeObjectURL(objectUrl);
        console.warn('Audio segment playback notice:', e);
        if (!this.speaking) return;
        this.currentChunkIndex++;
        this._playStreamChunk();
      };

      await audio.play().catch((playErr) => {
        console.warn('Audio play request notice:', playErr.message);
        if (!this.speaking) return;
        this.currentChunkIndex++;
        this._playStreamChunk();
      });
    } catch (err) {
      console.error('Sarvam TTS error:', err.message);
      if (this.onError) this.onError(err.message);
      this.stop();
    }
  }

  _speakNativeChunk() {
    if (!this.speaking || this.currentChunkIndex >= this.queue.length) {
      this.stop();
      if (this.onEnd) this.onEnd();
      return;
    }

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      this.mode = 'stream';
      this._playStreamChunk();
      return;
    }

    // Cancel existing synthesis to prevent queue deadlock in Chrome
    window.speechSynthesis.cancel();

    const chunkText = this.queue[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunkText);

    utterance.lang = this.lang === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    const voice = selectOptimalVoice(this.lang);
    if (voice) {
      utterance.voice = voice;
    }

    if (this.onProgress) {
      this.onProgress({
        chunkIndex: this.currentChunkIndex,
        totalChunks: this.queue.length,
        text: chunkText
      });
    }

    const clearNativeTimer = () => {
      if (this.nativeTimer) {
        clearTimeout(this.nativeTimer);
        this.nativeTimer = null;
      }
    };

    utterance.onend = () => {
      clearNativeTimer();
      if (!this.speaking) return;
      this.currentChunkIndex++;
      this._speakNativeChunk();
    };

    utterance.onerror = (e) => {
      clearNativeTimer();
      console.warn('Native utterance error, falling back to stream mode:', e);
      this.mode = 'stream';
      this._playStreamChunk();
    };

    // 10-second safety watchdog per chunk in case Chrome SpeechSynthesis hangs
    clearNativeTimer();
    this.nativeTimer = setTimeout(() => {
      console.warn('Native Speech Watchdog triggered: Chrome utterance stalled. Switching to stream mode.');
      if (this.speaking) {
        this.mode = 'stream';
        this._playStreamChunk();
      }
    }, 10000);

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  setRate(newRate) {
    this.rate = newRate;
    if (this.currentAudio) {
      this.currentAudio.playbackRate = newRate;
    }
  }

  pause() {
    if (!this.speaking || this.paused) return;

    this.paused = true;
    if (this.mode === 'stream' && this.currentAudio) {
      this.currentAudio.pause();
    } else if (this.mode === 'native' && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.pause();
    }
  }

  resume() {
    if (!this.speaking || !this.paused) return;

    this.paused = false;
    if (this.mode === 'stream' && this.currentAudio) {
      this.currentAudio.play().catch(() => {});
    } else if (this.mode === 'native' && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.resume();
    }
  }

  stop() {
    this.speaking = false;
    this.paused = false;
    this.queue = [];
    this.currentChunkIndex = 0;

    if (this.nativeTimer) {
      clearTimeout(this.nativeTimer);
      this.nativeTimer = null;
    }

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = '';
        this.currentAudio = null;
      } catch (e) {
        // ignore
      }
    }

    if (this.nextAudio) {
      try {
        this.nextAudio.src = '';
        this.nextAudio = null;
      } catch (e) {
        // ignore
      }
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
  }
}

export const speechSynthesizer = new HybridSpeechSynthesizer();

/**
 * Unified Voice Speech Recognizer (STT)
 * Manages Web Speech API recognition with microphone fallback (MediaRecorder + /api/ai/stt)
 */
export class VoiceSpeechRecognizer {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.onStart = null;
    this.onInterim = null;
    this.onFinal = null;
    this.onError = null;
    this.onEnd = null;
  }

  start({ lang = 'ta', onStart, onInterim, onFinal, onError, onEnd }) {
    this.stop();

    this.onStart = onStart;
    this.onInterim = onInterim;
    this.onFinal = onFinal;
    this.onError = onError;
    this.onEnd = onEnd;

    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (SpeechRecognition) {
      this._startWebSpeech(SpeechRecognition, lang);
    } else {
      this._startMediaRecorderFallback(lang);
    }
  }

  _startWebSpeech(SpeechRecognition, lang) {
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        this.isListening = true;
        if (this.onStart) this.onStart();
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim && this.onInterim) {
          this.onInterim(interim);
        }

        if (final && this.onFinal) {
          this.isListening = false;
          this.onFinal(final);
        }
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition notice:', e.error);
        this.isListening = false;
        
        let friendlyErr = 'Voice recognition error';
        if (e.error === 'not-allowed') {
          friendlyErr = 'Microphone permission denied. Please allow microphone access in browser settings.';
        } else if (e.error === 'no-speech') {
          friendlyErr = 'No speech detected. Please speak clearly into your microphone.';
        } else if (e.error === 'network') {
          friendlyErr = 'Network error during speech recognition.';
        }

        if (this.onError) this.onError(friendlyErr, e.error);
        if (this.onEnd) this.onEnd();
      };

      recognition.onend = () => {
        this.isListening = false;
        if (this.onEnd) this.onEnd();
      };

      this.recognition = recognition;
      recognition.start();
    } catch (err) {
      console.warn('WebSpeech start error, attempting recorder fallback:', err);
      this._startMediaRecorderFallback(lang);
    }
  }

  async _startMediaRecorderFallback(lang) {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (this.onError) this.onError('Microphone input is not supported in this browser environment.');
      if (this.onEnd) this.onEnd();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        this.isListening = true;
        if (this.onStart) this.onStart();
      };

      mediaRecorder.onstop = async () => {
        this.isListening = false;
        stream.getTracks().forEach(track => track.stop());

        if (this.audioChunks.length === 0) {
          if (this.onEnd) this.onEnd();
          return;
        }

        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'speech.webm');
        formData.append('language', lang);

        try {
          const res = await fetch(`${API_BASE}/ai/stt`, {
            method: 'POST',
            body: formData
          });
          const data = await res.json();

          if (data.success && data.text) {
            if (this.onFinal) this.onFinal(data.text);
          } else {
            if (this.onError) this.onError('Could not transcribe audio');
          }
        } catch (err) {
          console.error('STT API upload error:', err);
          if (this.onError) this.onError('Audio STT server connection failed');
        } finally {
          if (this.onEnd) this.onEnd();
        }
      };

      this.mediaRecorder = mediaRecorder;
      mediaRecorder.start();

      // Automatically stop recording after 8 seconds of speech
      setTimeout(() => {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop();
        }
      }, 8000);

    } catch (err) {
      console.error('Microphone stream error:', err);
      this.isListening = false;
      if (this.onError) this.onError('Microphone access denied or unreadable.');
      if (this.onEnd) this.onEnd();
    }
  }

  stop() {
    this.isListening = false;

    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (e) {
        // ignore
      }
      this.recognition = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (e) {
        // ignore
      }
      this.mediaRecorder = null;
    }
  }
}

export const speechRecognizer = new VoiceSpeechRecognizer();
