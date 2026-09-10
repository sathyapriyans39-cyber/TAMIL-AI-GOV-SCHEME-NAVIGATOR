/**
 * Hero Section with Voice Search, Dynamic Prompt Chips, and Quick Navigation Cards
 */

import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  MapPin, 
  UserCheck, 
  Bell, 
  CheckCircle2, 
  Award,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { speechRecognizer } from '../utils/voiceSpeechEngine';

export default function HeroSection({ onSearch, onSelectPrompt, onNavigate, onStartVoice }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleVoiceClick = () => {
    if (isListening) {
      speechRecognizer.stop();
      setIsListening(false);
      return;
    }

    setMicError('');

    speechRecognizer.start({
      lang,
      onStart: () => {
        setIsListening(true);
        setMicError('');
      },
      onInterim: (text) => {
        setQuery(text);
      },
      onFinal: (text) => {
        setQuery(text);
        setIsListening(false);
        onSearch(text);
      },
      onError: (friendly) => {
        setMicError(friendly);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const samplePrompts = [
    { text: lang === 'ta' ? 'எனக்கு என்ன அரசு திட்டங்கள் கிடைக்கும்?' : 'What schemes am I eligible for?', icon: '🎯' },
    { text: lang === 'ta' ? 'பெண்களுக்கான தமிழ்நாடு அரசின் திட்டங்கள் என்ன?' : 'Tamil Nadu Government schemes for women', icon: '👩' },
    { text: lang === 'ta' ? 'கல்லூரி மாணவர்களுக்கான கல்வி உதவித்தொகை' : 'Scholarships for college & university students', icon: '🎓' },
    { text: lang === 'ta' ? 'விவசாயிகளுக்கான PM-KISAN உதவித்தொகை & ஆவணங்கள்' : 'PM-KISAN ₹6,000 farmer scheme documents', icon: '🌾' },
    { text: lang === 'ta' ? 'சிறு தொழில் தொடங்க முத்ரா கடன் திட்டம்' : 'MUDRA collateral-free business loan', icon: '💼' }
  ];

  const quickCards = [
    {
      id: 'schemes',
      title: t('quickActions.findSchemes'),
      desc: t('quickActions.findSchemesDesc'),
      icon: Search,
      color: 'from-emerald-600 to-emerald-800',
      badge: '30+ Schemes'
    },
    {
      id: 'ask-ai',
      title: t('quickActions.askAi'),
      desc: t('quickActions.askAiDesc'),
      icon: Bot,
      color: 'from-teal-600 to-cyan-800',
      badge: 'RAG AI + Voice'
    },
    {
      id: 'eligibility',
      title: t('quickActions.voiceSearch'),
      desc: t('quickActions.voiceSearchDesc'),
      icon: Mic,
      color: 'from-amber-600 to-orange-700',
      badge: 'Whisper / Tamil'
    },
    {
      id: 'centres',
      title: t('quickActions.nearbyCentres'),
      desc: t('quickActions.nearbyCentresDesc'),
      icon: MapPin,
      color: 'from-blue-600 to-indigo-800',
      badge: '38 Districts'
    },
    {
      id: 'profile',
      title: t('quickActions.myProfile'),
      desc: t('quickActions.myProfileDesc'),
      icon: UserCheck,
      color: 'from-purple-600 to-violet-800',
      badge: 'Auto-Match'
    },
    {
      id: 'docs-guide',
      title: t('nav.docsGuide'),
      desc: lang === 'ta' ? 'வருமான, சாதி, முதல் பட்டதாரி சான்று வழிகாட்டி' : 'Income, Community, 1st Graduate certs guide',
      icon: BookOpen,
      color: 'from-rose-600 to-pink-800',
      badge: 'e-Seva Guide'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Instant Language Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 animate-fadeIn">
          <span className="inline-flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'ta' ? 'தமிழ்நாடு அரசு & மத்திய அரசு திட்டங்கள்' : 'Tamil Nadu & Central Govt Schemes'}</span>
          </span>

          <span className="inline-flex items-center space-x-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <span>🗣️ {lang === 'ta' ? 'தமிழ் + English வாய்ஸ் வசதி' : 'Tamil & English Voice AI'}</span>
          </span>

          <button
            onClick={toggleLanguage}
            className="inline-flex items-center space-x-1.5 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-3 py-1 rounded-full text-xs font-extrabold backdrop-blur-md transition-all shadow-xs"
            title="Switch Language"
          >
            <span>🌐</span>
            <span>{lang === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாறவும்'}</span>
          </button>
        </div>

        {/* Hero Title & Bilingual Tagline */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {lang === 'ta' ? (
              <>
                <span className="text-white">உங்களுக்கு கிடைக்கக்கூடிய </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  அரசு நலத்திட்டங்களை
                </span>
                <br />
                <span className="text-slate-200">AI மூலம் எளிதாக கண்டறியுங்கள்</span>
              </>
            ) : (
              <>
                <span className="text-white">Discover Government </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  Welfare Schemes
                </span>
                <br />
                <span className="text-slate-200">with Instant AI & Automatic Eligibility</span>
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Large AI Search Bar with Voice Input */}
        <div className="max-w-3xl mx-auto mb-8">
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl shadow-emerald-950/60 border-2 border-emerald-400/40 focus-within:border-emerald-400 transition-all"
          >
            <div className="pl-3 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-emerald-700" />
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'ta' ? 'அரசு திட்டங்கள் பற்றி எதையும் கேளுங்கள்...' : 'Ask anything about Government Schemes in English, Tamil, or Tanglish...'}
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none px-2 py-2"
            />

            {/* Mic / Voice Search Button */}
            <button
              type="button"
              onClick={handleVoiceClick}
              className={`p-2.5 rounded-xl transition-all mr-2 flex items-center justify-center ${
                isListening 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:scale-105'
              }`}
              title={isListening ? 'Listening...' : 'Voice Search (தமிழ் / English)'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center space-x-1.5 shrink-0"
            >
              <span>{lang === 'ta' ? 'தேடுக' : 'Search'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Voice Listening Banner with Soundwaves */}
          {isListening && (
            <div className="mt-3.5 p-3 rounded-2xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between animate-slide-up shadow-lg">
              <div className="flex items-center space-x-2.5 text-xs text-emerald-300 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>{lang === 'ta' ? 'குரலை கேட்கிறது... இப்போது பேசவும்' : 'Listening... Speak in English or Tamil'}</span>
              </div>

              <div className="flex items-center space-x-1">
                <span className="w-1 bg-emerald-400 rounded-full animate-wave-1 h-3" />
                <span className="w-1 bg-teal-300 rounded-full animate-wave-2 h-4" />
                <span className="w-1 bg-emerald-500 rounded-full animate-wave-3 h-5" />
                <span className="w-1 bg-amber-400 rounded-full animate-wave-4 h-3" />
                <span className="w-1 bg-emerald-400 rounded-full animate-wave-5 h-4" />
              </div>
            </div>
          )}

          {/* Mic Error Banner */}
          {micError && (
            <div className="mt-2 px-4 py-2 rounded-xl bg-red-900/70 border border-red-500/50 text-red-300 text-xs font-medium flex items-center justify-between animate-fadeIn">
              <span>🎤 {micError}</span>
              <button onClick={() => setMicError('')} className="ml-2 text-red-400 hover:text-red-200 font-bold">✕</button>
            </div>
          )}

          {/* Interactive Suggestion Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">
              {lang === 'ta' ? 'முயன்று பார்க்க:' : 'Try asking:'}
            </span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => { setQuery(prompt.text); onSelectPrompt(prompt.text); }}
                className="inline-flex items-center space-x-1.5 text-xs bg-slate-800/80 hover:bg-emerald-800/50 text-slate-200 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-500 transition-all"
              >
                <span>{prompt.icon}</span>
                <span className="truncate max-w-[200px] sm:max-w-none">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6 Quick Navigation Access Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="group relative bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-emerald-400/60 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-700/80 text-emerald-300 border border-slate-600">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'ta' ? 'திறக்க' : 'Open'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
