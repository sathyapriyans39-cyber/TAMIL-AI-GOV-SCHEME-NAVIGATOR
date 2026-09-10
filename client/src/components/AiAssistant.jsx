/**
 * AiAssistant Component
 * Bilingual RAG Scheme Assistant with Natural High-Clarity Voice STT & TTS,
 * VoiceVisualizer, speed controls, scheme citations, and document checklists.
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  FileText, 
  ExternalLink, 
  RotateCcw, 
  Info,
  CheckCircle2,
  Building2,
  HelpCircle,
  Square,
  Play,
  Pause,
  SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { speechSynthesizer, speechRecognizer } from '../utils/voiceSpeechEngine';
import VoiceVisualizer from './VoiceVisualizer';

const API_BASE = 'http://localhost:5000/api';

export function AiAssistant({ initialPrompt = '', onSelectScheme }) {
  const { lang, t } = useLanguage();
  const { token, user } = useAuth();

  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: lang === 'ta' 
        ? 'வணக்கம்! நான் உங்கள் தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி. தமிழ்நாடு மற்றும் மத்திய அரசு திட்டங்கள், தகுதி வரம்புகள், தேவையான சான்றிதழ்கள், மற்றும் விண்ணப்பிக்கும் முறைகள் பற்றி என்னிடம் கேளுங்கள்.'
        : 'Vanakkam! I am your Tamil AI Government Scheme Assistant. Ask me anything about Tamil Nadu and Central Government welfare schemes, eligibility rules, required certificates, and application procedures.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      schemes: []
    }
  ]);

  const [inputText, setInputText] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micError, setMicError] = useState('');
  
  // Voice Synthesis State
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.95);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, speechProgress]);

  // If initialPrompt changes from an external button click
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setInputText(initialPrompt);
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      speechSynthesizer.stop();
      speechRecognizer.stop();
    };
  }, []);

  const handleSendMessage = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputText;
    if (!text || !text.trim() || loading) return;

    // Stop active speech playback if any
    speechSynthesizer.stop();
    setSpeakingMsgId(null);

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setInterimTranscript('');
    setLoading(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: text.trim(),
          preferredLanguage: lang,
          profileOverride: user?.profile || null
        })
      });

      const data = await res.json();

      if (data.success && data.data) {
        const botMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.data.response || data.data.answer || (lang === 'ta' ? 'தகவல் பெறப்பட்டது.' : 'Information retrieved.'),
          schemes: data.data.matchedSchemes || data.data.relevantSchemes || [],
          documents: data.data.requiredDocs || data.data.documentsRequired || [],
          citations: data.data.citations || (data.data.officialSource ? [data.data.officialSource] : []),
          steps: data.data.steps || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (err) {
      console.error('AI error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: lang === 'ta' 
            ? 'மன்னிக்கவும், சேவையகத்துடன் இணைக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.' 
            : 'Sorry, I encountered an error connecting to the knowledge server. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Unified Voice Input (STT) with Web Speech API + MediaRecorder fallback
  const toggleVoiceInput = () => {
    if (isListening) {
      speechRecognizer.stop();
      setIsListening(false);
      setInterimTranscript('');
      return;
    }

    // Stop speech synthesizer if speaking
    speechSynthesizer.stop();
    setSpeakingMsgId(null);
    setMicError('');

    speechRecognizer.start({
      lang,
      onStart: () => {
        setIsListening(true);
        setInterimTranscript('');
        setMicError('');
      },
      onInterim: (text) => {
        setInterimTranscript(text);
      },
      onFinal: (text) => {
        setInputText(text);
        setInterimTranscript('');
        handleSendMessage(text);
      },
      onError: (friendly, code) => {
        console.warn('STT error:', code || friendly);
        setMicError(friendly);
        setInterimTranscript('');
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  // Natural High-Clarity Speech Synthesizer Trigger
  const handleToggleSpeech = (msgId, text) => {
    if (speakingMsgId === msgId) {
      speechSynthesizer.stop();
      setSpeakingMsgId(null);
      setIsPaused(false);
      setSpeechProgress(null);
      return;
    }

    speechSynthesizer.speak({
      text,
      lang,
      rate: speechRate,
      pitch: 1.0,
      onStart: () => {
        setSpeakingMsgId(msgId);
        setIsPaused(false);
      },
      onEnd: () => {
        setSpeakingMsgId(null);
        setIsPaused(false);
        setSpeechProgress(null);
      },
      onProgress: (prog) => {
        setSpeechProgress(prog);
      }
    });
  };

  const handlePauseSpeech = () => {
    speechSynthesizer.pause();
    setIsPaused(true);
  };

  const handleResumeSpeech = () => {
    speechSynthesizer.resume();
    setIsPaused(false);
  };

  const handleStopSpeech = () => {
    speechSynthesizer.stop();
    setSpeakingMsgId(null);
    setIsPaused(false);
    setSpeechProgress(null);
  };

  const handleRateChange = (newRate) => {
    setSpeechRate(newRate);
    speechSynthesizer.setRate(newRate);
  };

  const sampleQuestions = [
    { 
      text: lang === 'ta' ? 'என் சுயவிவரத்தின்படி எனக்கு என்ன அரசு திட்டங்கள் கிடைக்கும்?' : 'What schemes am I eligible for based on my profile?', 
      icon: '✨',
      highlight: true
    },
    { text: lang === 'ta' ? 'கல்லூரி மாணவிகளுக்கான புதுமைப் பெண் திட்டம் தகுதிகள் என்ன?' : 'Eligibility for Pudhumai Penn ₹1000 scheme?', icon: '🎓' },
    { text: lang === 'ta' ? 'விவசாயிகளுக்கு PM-KISAN ₹6000 பெற தேவையான ஆவணங்கள்?' : 'Required documents for PM-KISAN scheme?', icon: '🌾' },
    { text: lang === 'ta' ? 'கலைஞர் மகளிர் உரிமைத் திட்டத்திற்கு யார் தகுதியானவர்கள்?' : 'Who is eligible for Kalaignar Magalir Urimai Thittam?', icon: '👩' },
    { text: lang === 'ta' ? 'சிறு தொழில் தொடங்க முத்ரா கடன் எப்படி வாங்குவது?' : 'How to apply for MUDRA business loan?', icon: '💼' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {lang === 'ta' ? 'தமிழ் AI அரசு திட்டங்கள் வழிகாட்டி' : 'Tamil AI Government Scheme Assistant'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-400/30">
                  🎙️ HD Voice + RAG
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'ta' 
                  ? 'தமிழ் அல்லது ஆங்கிலத்தில் குரலில் பேசி கேளுங்கள். தெளிவான குரல் வாசிப்புடன் கூடிய அரசு வழிகாட்டி.' 
                  : 'Ask via voice or text in English, Tamil, or Tanglish. Experience crystal-clear natural speech narration.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 self-start sm:self-auto border border-slate-700 transition-colors"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('chat.clearChat')}</span>
          </button>
        </div>

        {/* Active Logged-in Profile Indicator Strip */}
        {user && user.profile && (
          <div className="mt-4 pt-3 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                <strong>{lang === 'ta' ? 'சுயவிவரம் இணைக்கப்பட்டுள்ளது' : 'Active Profile'}:</strong> {user.name} ({user.profile.gender === 'FEMALE' ? 'Female' : 'Male'}, {user.profile.age} yrs, {user.profile.district}, {user.profile.occupation})
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-400/30">
              ✨ 100% Tailored AI Matching
            </span>
          </div>
        )}
      </div>

      {/* Floating Active Voice Visualizer & Controls */}
      <VoiceVisualizer
        isListening={isListening}
        isSpeaking={speakingMsgId !== null}
        isPaused={isPaused}
        transcript={interimTranscript}
        speakingText={speechProgress?.text || ''}
        progress={speechProgress}
        speechRate={speechRate}
        onRateChange={handleRateChange}
        onPause={handlePauseSpeech}
        onResume={handleResumeSpeech}
        onStop={handleStopSpeech}
      />

      {/* Mic Permission / Error Banner */}
      {micError && (
        <div className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center justify-between animate-fadeIn">
          <span>🎤 {micError}</span>
          <button onClick={() => setMicError('')} className="ml-2 text-red-400 hover:text-red-600 font-bold text-sm">✕</button>
        </div>
      )}

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md flex flex-col h-[650px] overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            const isSpeakingThis = speakingMsgId === msg.id;

            return (
              <div 
                key={msg.id}
                className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  isBot 
                    ? 'bg-gradient-to-tr from-emerald-800 to-teal-700 text-white' 
                    : 'bg-slate-900 text-white'
                }`}>
                  {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${isBot ? 'items-start' : 'items-end'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                    isBot 
                      ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none' 
                      : 'bg-emerald-700 text-white font-medium rounded-tr-none'
                  }`}>
                    {/* Message Text */}
                    <div className="whitespace-pre-line">
                      {msg.text}
                    </div>

                    {/* Bot Voice Playback & Timestamp footer */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{msg.timestamp}</span>

                      {isBot && (
                        <button
                          onClick={() => handleToggleSpeech(msg.id, msg.text)}
                          className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                            isSpeakingThis 
                              ? 'bg-red-50 text-red-600 border border-red-200 shadow-xs' 
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                          }`}
                          title={isSpeakingThis ? 'Stop voice playback' : 'Listen with High-Clarity Voice Narration'}
                        >
                          {isSpeakingThis ? (
                            <>
                              <Square className="w-3.5 h-3.5 fill-red-600" />
                              <span>{lang === 'ta' ? 'நிறுத்து' : 'Stop Audio'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{lang === 'ta' ? 'குரலில் கேள்' : 'Listen Answer'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Embedded Related Scheme Cards (if returned by AI) */}
                  {isBot && msg.schemes && msg.schemes.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>{lang === 'ta' ? 'தொடர்புடைய அரசு திட்டங்கள்:' : 'Relevant Government Schemes:'}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.schemes.map((s, idx) => (
                          <div
                            key={idx}
                            onClick={() => onSelectScheme && onSelectScheme(s)}
                            className="p-3 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-between group"
                          >
                            <div className="overflow-hidden pr-2">
                              <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate">
                                {lang === 'ta' ? s.tamilName || s.schemeName : s.schemeName}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate">
                                {s.department || s.tamilDepartment}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 shrink-0">
                              →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Required Documents checklist preview (if present) */}
                  {isBot && msg.documents && msg.documents.length > 0 && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-amber-900 flex items-center space-x-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t('chat.requiredDocsChecklist')}</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-700 text-[11px]">
                        {msg.documents.map((doc, idx) => (
                          <li key={idx}>
                            {typeof doc === 'string' ? doc : (lang === 'ta' ? doc.tamilName || doc.name : doc.name)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-xs flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                <span className="pl-1">{lang === 'ta' ? 'அரசாணை ஆவணங்களை ஆய்வு செய்கிறது...' : 'Searching official scheme records...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Strip */}
        <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
            {lang === 'ta' ? 'பரிந்துரைகள்:' : 'Quick Questions:'}
          </span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.text)}
              className="inline-flex items-center space-x-1 text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 px-3 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-all shadow-2xs font-medium"
            >
              <span>{q.icon}</span>
              <span className="truncate max-w-[220px]">{q.text}</span>
            </button>
          ))}
        </div>

        {/* Input Bar with Voice & Send */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
            className="flex items-center space-x-2"
          >
            {/* Mic / Voice STT Trigger */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-2xl transition-all flex items-center justify-center shrink-0 ${
                isListening 
                  ? 'bg-red-600 text-white animate-pulse shadow-md' 
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice Input (தமிழ் / English)'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Main Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening 
                ? (lang === 'ta' ? 'பேசவும்... குரலை பதிவு செய்கிறது...' : 'Listening... Speak your query now...') 
                : t('chat.inputPlaceholder')
              }
              className="flex-1 py-3 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md transition-all shrink-0 flex items-center justify-center"
              title="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default AiAssistant;
