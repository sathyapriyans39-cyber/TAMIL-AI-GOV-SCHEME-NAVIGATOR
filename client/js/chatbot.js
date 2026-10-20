/**
 * AI Assistant Chatbot Module with Sarvam AI Voice Input & Output
 * Supports Tamil (ta) and Indian English (en) Speech-to-Text & Text-to-Speech
 * Integrates browser speech fallback and auto error clearing.
 */

let mediaRecorder = null;
let audioChunks = [];
let recordingTimeout = null;
let isRecording = false;
let currentPlayingAudio = null;
let currentPlayingBtn = null;
let isAutoVoiceEnabled = localStorage.getItem('chat_auto_voice') === 'true';

/**
 * Initialize Chatbot with Welcome Message & Quick Prompts
 */
function initChatbot() {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  const lang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  const isTamil = lang === 'ta';

  // Render welcome message
  chatMessages.innerHTML = `
    <div class="chat-msg chat-msg-ai" id="welcome-msg" data-raw-text="${isTamil
      ? 'வணக்கம்! நான் தமிழ்நாடு அரசு திட்டங்கள் AI வழிகாட்டி. மகளிர் நலம், கல்வி உதவித்தொகை, விவசாயிகள் நலன், தொழில் கடன், மற்றும் மருத்துவக் காப்பீடு பற்றிய அரசு திட்டங்கள் குறித்த உங்கள் சந்தேகங்களை என்னிடம் கேட்கலாம்.'
      : 'Hello! I am your AI Government Scheme Navigator. You can ask me questions about women welfare, scholarships, farmer schemes, business loans, or healthcare support.'}">
      <div class="chat-msg-header">
        <span>🤖 <strong>${window.i18n ? window.i18n.t('chat_welcome_title') : (isTamil ? 'வணக்கம்! நான் தமிழ்நாடு அரசு திட்டங்கள் AI வழிகாட்டி.' : 'Hello! I am your AI Government Scheme Navigator.')}</strong></span>
        <button class="btn-msg-listen" onclick="speakMessage(this, 'welcome-msg')" title="குரல் மூலம் கேட்க / Listen">
          🔊 ${window.i18n ? window.i18n.t('btn_listen_tts') : (isTamil ? 'கேளுங்கள்' : 'Listen')}
        </button>
      </div>
      <div class="chat-msg-body">
        ${window.i18n ? window.i18n.t('chat_welcome_desc') : (isTamil
          ? 'மகளிர் நலம், கல்வி உதவித்தொகை, விவசாயிகள் நலன், தொழில் கடன், மற்றும் மருத்துவக் காப்பீடு பற்றிய அரசு திட்டங்கள் குறித்த உங்கள் சந்தேகங்களை என்னிடம் கேட்கலாம்.'
          : 'You can ask me questions about women welfare, scholarships, farmer schemes, business loans, or healthcare support.')}
        <br><br>
        <span style="font-size: 0.8rem; color: var(--text-muted);">
          💡 ${window.i18n ? window.i18n.t('chat_welcome_hint') : (isTamil ? 'கீழே உள்ள விரைவு வினாக்களில் ஒன்றைத் தேர்ந்தெடுக்கலாம் அல்லது தட்டச்சு செய்யலாம் / பேசலாம்.' : 'Click a quick question below or type / speak your question.')}
        </span>
      </div>
    </div>
  `;

  // Render quick prompts
  renderQuickPrompts();
  updateAutoVoiceButtonUI();
}

/**
 * Render Quick Prompts based on active language
 */
function renderQuickPrompts() {
  const bar = document.querySelector('.quick-prompts-bar');
  if (!bar) return;

  const lang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  const isTamil = lang === 'ta';

  const prompts = isTamil ? [
    { label: '👩 பெண்களுக்கான திட்டங்கள்', text: 'பெண்களுக்கான தமிழ்நாடு அரசு திட்டங்கள் மற்றும் மகளிர் உரிமை தொகை விவரம் என்ன?' },
    { label: '🎓 கல்வி உதவித்தொகை', text: 'கல்லூரி மாணவ மாணவிகளுக்கான புதுமைப் பெண் மற்றும் கல்வி உதவித்தொகை விவரம்' },
    { label: '🌾 விவசாயிகள் திட்டம்', text: 'விவசாயிகளுக்கான PM-KISAN மற்றும் உழவர் நல திட்டங்கள் என்ன?' },
    { label: '🏥 மருத்துவக் காப்பீடு', text: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு அட்டை பெறுவது எப்படி?' },
    { label: '💼 தொழில் கடன்', text: 'சுயதொழில் தொடங்க தமிழ்நாடு அரசு வழங்கும் கடன் மற்றும் மானியங்கள் என்ன?' }
  ] : [
    { label: '👩 Women Welfare', text: 'What are the Tamil Nadu welfare schemes for women and Kalaignar Magalir Urimai details?' },
    { label: '🎓 Scholarships', text: 'What are the higher education scholarships and Pudhumai Penn schemes for students?' },
    { label: '🌾 Farmer Schemes', text: 'Tell me about PM-KISAN and Tamil Nadu farmer welfare assistance schemes.' },
    { label: '🏥 Health Insurance', text: 'How to apply for Chief Minister Comprehensive Health Insurance Scheme (CMCHIS)?' },
    { label: '💼 Business Loans', text: 'What government subsidies and loans are available for starting a business?' }
  ];

  bar.innerHTML = prompts.map(p => `
    <button onclick="sendQuickPrompt('${p.text.replace(/'/g, "\\'")}')" class="prompt-chip">
      ${p.label}
    </button>
  `).join('');
}

/**
 * Send Message Handler
 */
async function sendChatMessage(customQuery) {
  const input = document.getElementById('chatInput');
  const query = (customQuery !== undefined ? customQuery : (input ? input.value : '')).trim();
  if (!query) return;

  if (input) input.value = '';
  appendUserMessage(query);

  const chatMessages = document.getElementById('chatMessages');
  const typingId = `typing-${Date.now()}`;
  const typingBubble = document.createElement('div');
  typingBubble.id = typingId;
  typingBubble.className = 'chat-msg chat-msg-ai';
  typingBubble.innerHTML = `<em>${window.i18n ? window.i18n.t('chat_typing_status') : '⏳ அரசு திட்டத் தகவல்களை ஆராய்கிறது... / Finding scheme details...'}</em>`;
  chatMessages.appendChild(typingBubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');

  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, preferredLanguage: currentLang })
    });

    const data = await res.json();
    const typingElem = document.getElementById(typingId);
    if (typingElem) typingElem.remove();

    if (data.success && data.reply) {
      const msgId = appendAiMessage(data.reply);
      // Auto voice readout if enabled
      if (isAutoVoiceEnabled && msgId) {
        const btn = document.querySelector(`#${msgId} .btn-msg-listen`);
        if (btn) speakMessage(btn, msgId);
      }
    } else {
      appendAiMessage(
        currentLang === 'ta'
          ? 'மன்னிக்கவும், தற்போது பதிலளிக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது அருகிலுள்ள இ-சேவை மையத்தை அணுகவும்.'
          : 'Sorry, I could not generate a response right now. Please try again or visit your nearest e-Sevai centre.'
      );
    }
  } catch (err) {
    const typingElem = document.getElementById(typingId);
    if (typingElem) typingElem.remove();

    appendAiMessage(
      currentLang === 'ta'
        ? 'தகவல் தொடர்பில் பிழை ஏற்பட்டது. இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.'
        : 'Network connection error. Please check your internet and try again.'
    );
  }
}

/**
 * Append User Message
 */
function appendUserMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  const msg = document.createElement('div');
  msg.className = 'chat-msg chat-msg-user';
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Append AI Message with Listen (TTS) button
 */
function appendAiMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return null;

  const msgId = `msg-${Date.now()}`;
  const msg = document.createElement('div');
  msg.className = 'chat-msg chat-msg-ai';
  msg.id = msgId;
  msg.setAttribute('data-raw-text', text);

  // Format simple markdown (bold, italic, line breaks)
  let formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  const listenLabel = window.i18n ? window.i18n.t('btn_listen_tts') : (currentLang === 'ta' ? 'கேளுங்கள்' : 'Listen');

  msg.innerHTML = `
    <div class="chat-msg-header">
      <span class="ai-badge-tag">🤖 Tamil AI</span>
      <button class="btn-msg-listen" onclick="speakMessage(this, '${msgId}')" title="குரல் மூலம் கேட்க / Listen (Sarvam AI)">
        🔊 ${listenLabel}
      </button>
    </div>
    <div class="chat-msg-content">${formatted}</div>
  `;

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msgId;
}

/**
 * Quick Prompt Click
 */
function sendQuickPrompt(promptText) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = promptText;
  }
  sendChatMessage(promptText);
}

/* ==========================================================================
   SARVAM AI VOICE INPUT (Speech to Text)
   ========================================================================== */

/**
 * Toggle Voice Recording (Start / Stop)
 */
async function toggleVoiceRecording() {
  if (isRecording) {
    stopVoiceRecording();
  } else {
    await startVoiceRecording();
  }
}

/**
 * Start Voice Recording using Microphone
 */
async function startVoiceRecording() {
  const micBtn = document.getElementById('btnVoiceInput');
  const chatInput = document.getElementById('chatInput');
  const statusElem = document.getElementById('voiceInputStatus');
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');

  clearVoiceInputError();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // MediaDevices not supported, try Web Speech API fallback
    startWebSpeechRecognitionFallback();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Determine supported mime type
    let mimeType = 'audio/webm;codecs=opus';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      if (MediaRecorder.isTypeSupported('audio/webm')) mimeType = 'audio/webm';
      else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
      else mimeType = ''; // Let browser pick default
    }

    mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      // Turn off microphone tracks immediately to release hardware
      stream.getTracks().forEach(track => track.stop());

      if (audioChunks.length === 0) {
        clearVoiceInputState();
        return;
      }

      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
      await sendAudioToSarvamSTT(audioBlob);
    };

    mediaRecorder.start(250);
    isRecording = true;

    // Update UI to Recording state
    if (micBtn) {
      micBtn.classList.add('recording');
      micBtn.innerHTML = '🔴';
      micBtn.title = currentLang === 'ta' ? 'பதிவை நிறுத்த கிளிக் செய்யவும்' : 'Click to stop recording';
    }

    if (statusElem) {
      statusElem.style.display = 'flex';
      statusElem.innerHTML = `<span class="pulse-dot"></span> <span>${window.i18n ? window.i18n.t('voice_recording_listening') : (currentLang === 'ta' ? '🎙️ பேசவும்... (நிறுத்த கிளிக் செய்யவும்)' : '🎙️ Listening... (Click to finish)')}</span>`;
    }

    if (chatInput) {
      chatInput.placeholder = currentLang === 'ta' ? '🎙️ இப்போது பேசுங்கள்...' : '🎙️ Speak now...';
    }

    // Auto-stop after 15 seconds of speaking to avoid runaway recordings
    recordingTimeout = setTimeout(() => {
      if (isRecording) {
        stopVoiceRecording();
      }
    }, 15000);

  } catch (err) {
    console.warn('Microphone access denied or error:', err);
    clearVoiceInputState();

    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      showToast(
        currentLang === 'ta'
          ? 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டுள்ளது. உலாவி அமைப்பில் அனுமதியை சரிபார்க்கவும்.'
          : 'Microphone permission was denied. Please allow microphone in browser.',
        'error'
      );
    } else {
      // Try browser Web Speech API as fallback
      startWebSpeechRecognitionFallback();
    }
  }
}

/**
 * Stop Voice Recording
 */
function stopVoiceRecording() {
  if (recordingTimeout) {
    clearTimeout(recordingTimeout);
    recordingTimeout = null;
  }

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    try {
      mediaRecorder.stop();
    } catch (e) {
      // Ignore
    }
  }

  isRecording = false;

  // Show processing status
  const statusElem = document.getElementById('voiceInputStatus');
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  if (statusElem) {
    statusElem.style.display = 'flex';
    statusElem.innerHTML = `<span class="spinner-small"></span> <span>${window.i18n ? window.i18n.t('voice_processing') : (currentLang === 'ta' ? '⏳ குரல் உரையாக மாற்றப்படுகிறது (Sarvam AI)...' : '⏳ Converting voice to text (Sarvam AI)...')}</span>`;
  }
}

/**
 * Send Recorded Audio to Sarvam STT Endpoint (/api/voice/stt)
 */
async function sendAudioToSarvamSTT(audioBlob) {
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  const chatInput = document.getElementById('chatInput');

  try {
    const formData = new FormData();
    const fileExt = audioBlob.type.includes('mp4') ? 'm4a' : 'webm';
    formData.append('audio', audioBlob, `recording.${fileExt}`);
    formData.append('language', currentLang);

    const res = await fetch('/api/voice/stt', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    clearVoiceInputState();

    if (data.success && data.text && data.text.trim()) {
      const recognizedText = data.text.trim();
      if (chatInput) {
        chatInput.value = recognizedText;
      }
      showToast(
        currentLang === 'ta' ? '✨ குரல் கண்டறியப்பட்டது!' : '✨ Voice captured!',
        'success'
      );
      // Automatically send the transcribed text to AI
      sendChatMessage(recognizedText);
    } else {
      // If Sarvam didn't detect speech, inform user gently without error state
      showToast(
        currentLang === 'ta'
          ? 'குரல் தெளிவாக கேட்கவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது தட்டச்சு செய்யவும்.'
          : 'Could not capture clear speech. Please try again or type.',
        'info'
      );
    }
  } catch (err) {
    console.error('Sarvam STT failed:', err);
    clearVoiceInputState();
    showToast(
      currentLang === 'ta'
        ? 'குரல் பதிவில் பிழை ஏற்பட்டது. தயவுசெய்து தட்டச்சு செய்து கேட்கவும்.'
        : 'Voice recognition failed. Please type your question.',
      'error'
    );
  }
}

/**
 * Fallback Web Speech Recognition for browsers
 */
function startWebSpeechRecognitionFallback() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  const chatInput = document.getElementById('chatInput');

  if (!SpeechRecognition) {
    showToast(
      currentLang === 'ta'
        ? 'உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.'
        : 'Voice input is not supported by your browser. Please type.',
      'info'
    );
    clearVoiceInputState();
    return;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'ta' ? 'ta-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const micBtn = document.getElementById('btnVoiceInput');
    const statusElem = document.getElementById('voiceInputStatus');

    if (micBtn) {
      micBtn.classList.add('recording');
      micBtn.innerHTML = '🔴';
    }
    if (statusElem) {
      statusElem.style.display = 'flex';
      statusElem.innerHTML = `<span class="pulse-dot"></span> <span>🎙️ Listening (Browser Speech)...</span>`;
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      clearVoiceInputState();
      if (transcript && transcript.trim()) {
        if (chatInput) chatInput.value = transcript.trim();
        sendChatMessage(transcript.trim());
      }
    };

    recognition.onerror = (e) => {
      console.warn('Browser Speech Recognition error:', e.error);
      clearVoiceInputState();
    };

    recognition.onend = () => {
      clearVoiceInputState();
    };

    recognition.start();
  } catch (err) {
    clearVoiceInputState();
  }
}

/**
 * Clear Voice Input State & Errors
 */
function clearVoiceInputState() {
  isRecording = false;
  if (recordingTimeout) {
    clearTimeout(recordingTimeout);
    recordingTimeout = null;
  }

  const micBtn = document.getElementById('btnVoiceInput');
  if (micBtn) {
    micBtn.classList.remove('recording');
    micBtn.innerHTML = '🎙️';
    const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'ta';
    micBtn.title = window.i18n ? window.i18n.t('voice_recording_btn_title') : (lang === 'ta' ? 'குரல் மூலம் பேச அழுத்தவும் (Sarvam AI)' : 'Click to speak (Sarvam AI)');
  }

  const statusElem = document.getElementById('voiceInputStatus');
  if (statusElem) {
    statusElem.style.display = 'none';
    statusElem.innerHTML = '';
  }

  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.placeholder = window.i18n ? window.i18n.t('chat_input_placeholder') : 'உங்கள் கேள்வியை தட்டச்சு செய்யவும்... அல்லது 🎙️ பேசி கேட்கவும்';
  }
}

function clearVoiceInputError() {
  const statusElem = document.getElementById('voiceInputStatus');
  if (statusElem) {
    statusElem.style.display = 'none';
    statusElem.innerHTML = '';
  }
}

/* ==========================================================================
   SARVAM AI VOICE OUTPUT (Text to Speech)
   ========================================================================== */

/**
 * Speak Message Content using Sarvam AI TTS with browser fallback
 */
async function speakMessage(btn, msgId) {
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');

  // If already playing this message, clicking it stops the playback
  if (currentPlayingBtn === btn && currentPlayingAudio) {
    stopCurrentAudio();
    return;
  }

  // Stop any other currently playing audio
  stopCurrentAudio();

  const msgElem = document.getElementById(msgId);
  const text = msgElem ? (msgElem.getAttribute('data-raw-text') || msgElem.innerText) : '';
  if (!text || !text.trim()) return;

  currentPlayingBtn = btn;
  btn.classList.add('playing');
  btn.innerHTML = `<span class="spinner-small"></span> <span>...</span>`;

  try {
    const res = await fetch('/api/voice/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language: currentLang })
    });

    const data = await res.json();

    if (data.success && data.audio) {
      // Play audio from base64
      const audioFormat = data.format || 'audio/wav';
      const audioSrc = `data:${audioFormat};base64,${data.audio}`;
      currentPlayingAudio = new Audio(audioSrc);

      btn.innerHTML = `<span class="sound-wave-anim"><span></span><span></span><span></span></span> ⏹️ ${window.i18n ? window.i18n.t('btn_stop_tts') : (currentLang === 'ta' ? 'நிறுத்து' : 'Stop')}`;

      currentPlayingAudio.onended = () => {
        resetTtsButton(btn);
      };

      currentPlayingAudio.onerror = (e) => {
        console.warn('Audio element error:', e);
        fallbackBrowserTTS(text, currentLang, btn);
      };

      await currentPlayingAudio.play();
    } else {
      throw new Error(data.message || 'TTS generation failed');
    }
  } catch (err) {
    console.warn('Sarvam TTS failed, using browser speech synthesis fallback:', err.message);
    fallbackBrowserTTS(text, currentLang, btn);
  }
}

/**
 * Stop currently playing audio
 */
function stopCurrentAudio() {
  if (currentPlayingAudio) {
    try {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
    } catch (e) {
      // Ignore
    }
    currentPlayingAudio = null;
  }

  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  if (currentPlayingBtn) {
    resetTtsButton(currentPlayingBtn);
  }
}

/**
 * Reset TTS Button to idle state
 */
function resetTtsButton(btn) {
  if (!btn) return;
  btn.classList.remove('playing');
  const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : (localStorage.getItem('app_lang') || 'ta');
  const label = window.i18n ? window.i18n.t('btn_listen_tts') : (currentLang === 'ta' ? 'கேளுங்கள்' : 'Listen');
  btn.innerHTML = `🔊 ${label}`;
  if (currentPlayingBtn === btn) {
    currentPlayingBtn = null;
    currentPlayingAudio = null;
  }
}

/**
 * Fallback to Browser SpeechSynthesis (Web Speech API)
 */
function fallbackBrowserTTS(text, lang, btn) {
  if (!('speechSynthesis' in window)) {
    resetTtsButton(btn);
    showToast(lang === 'ta' ? 'குரல் ஒலிக்க முடியவில்லை.' : 'Speech synthesis not supported.', 'info');
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean markdown before speaking
    const cleanText = text
      .replace(/[*#_~`>\[\]\(\)]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/⚠️.*$/s, '')
      .substring(0, 300);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'en' ? 'en-IN' : 'ta-IN';
    utterance.rate = 1.0;

    btn.innerHTML = `<span class="sound-wave-anim"><span></span><span></span><span></span></span> ⏹️ ${window.i18n ? window.i18n.t('btn_stop_tts') : (lang === 'ta' ? 'நிறுத்து' : 'Stop')}`;

    utterance.onend = () => {
      resetTtsButton(btn);
    };

    utterance.onerror = () => {
      resetTtsButton(btn);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    resetTtsButton(btn);
  }
}

/**
 * Toggle Auto Voice Output Mode (Read all AI replies automatically)
 */
function toggleAutoVoice() {
  isAutoVoiceEnabled = !isAutoVoiceEnabled;
  localStorage.setItem('chat_auto_voice', isAutoVoiceEnabled ? 'true' : 'false');
  updateAutoVoiceButtonUI();

  const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'ta';
  showToast(
    isAutoVoiceEnabled
      ? (lang === 'ta' ? '🔊 தானியங்கி குரல் பதில் இயக்கப்பட்டது (Sarvam AI)' : '🔊 Auto-voice readout enabled (Sarvam AI)')
      : (lang === 'ta' ? '🔈 தானியங்கி குரல் பதில் முடக்கப்பட்டது' : '🔈 Auto-voice readout disabled'),
    'info'
  );
}

/**
 * Update Auto Voice Button UI
 */
function updateAutoVoiceButtonUI() {
  const toggleBtn = document.getElementById('voiceAutoToggle');
  if (!toggleBtn) return;

  const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'ta';
  if (isAutoVoiceEnabled) {
    toggleBtn.classList.add('active');
    toggleBtn.innerHTML = `🔊 ${window.i18n ? window.i18n.t('voice_auto_label_on') : (lang === 'ta' ? 'குரல்: ஆன்' : 'Voice: ON')}`;
    toggleBtn.title = lang === 'ta' ? 'தானியங்கி குரல் பதிலை அணைக்க' : 'Turn off automatic voice';
  } else {
    toggleBtn.classList.remove('active');
    toggleBtn.innerHTML = `🔈 ${window.i18n ? window.i18n.t('voice_auto_label_off') : (lang === 'ta' ? 'குரல்: ஆஃப்' : 'Voice: OFF')}`;
    toggleBtn.title = lang === 'ta' ? 'தானியங்கி குரல் பதிலை இயக்க' : 'Turn on automatic voice';
  }
}
