/**
 * Tamil AI Government Scheme Navigator - Main App Component
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Bot, 
  ArrowRight, 
  Building2, 
  FileText, 
  Award, 
  ShieldCheck,
  Users,
  Coins,
  ChevronRight
} from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SchemesList from './components/SchemesList';
import AiAssistant from './components/AiAssistant';
import EligibilityMatcher from './components/EligibilityMatcher';
import NearbyCentres from './components/NearbyCentres';
import DocumentsGuide from './components/DocumentsGuide';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import NotificationDrawer from './components/NotificationDrawer';
import Toast from './components/Toast';
import Footer from './components/Footer';

function MainLayout() {
  const { lang, t } = useLanguage();

  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    setActiveTab('schemes');
  };

  const handleSelectPrompt = (promptText) => {
    setAiPrompt(promptText);
    setActiveTab('ask-ai');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAskAiAboutScheme = (prompt) => {
    setAiPrompt(prompt);
    setActiveTab('ask-ai');
  };

  const categoryHighlights = [
    {
      id: 'Women Welfare',
      name: lang === 'ta' ? 'மகளிர் நலம்' : 'Women Welfare',
      desc: lang === 'ta' ? 'கலைஞர் மகளிர் உரிமைத் திட்டம், இலவச பேருந்து பயணம்' : '₹1,000 Monthly Grant, Free Bus Pass, Marriage Aid',
      icon: '👩',
      bgGradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
      borderColor: 'border-pink-200 hover:border-pink-500',
      textColor: 'text-pink-900',
      badgeColor: 'bg-pink-100 text-pink-800'
    },
    {
      id: 'Education',
      name: lang === 'ta' ? 'கல்வி & உதவித்தொகை' : 'Higher Education',
      desc: lang === 'ta' ? 'புதுமைப் பெண், தமிழ்ப் புதல்வன், முதல் பட்டதாரி சலுகை' : 'Pudhumai Penn ₹1,000/mo, First Graduate Tuition Waiver',
      icon: '🎓',
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderColor: 'border-emerald-200 hover:border-emerald-500',
      textColor: 'text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'Farmer Schemes',
      name: lang === 'ta' ? 'விவசாயிகள் நலம்' : 'Farmer Welfare',
      desc: lang === 'ta' ? 'PM-KISAN ₹6,000, உழவர் பாதுகாப்பு திட்டம், பயிர் காப்பீடு' : 'PM-KISAN ₹6,000/yr, Crop Insurance, Subsidies',
      icon: '🌾',
      bgGradient: 'from-amber-500/10 via-yellow-500/5 to-transparent',
      borderColor: 'border-amber-200 hover:border-amber-500',
      textColor: 'text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'Health',
      name: lang === 'ta' ? 'மருத்துவம் & காப்பீடு' : 'Health & Insurance',
      desc: lang === 'ta' ? 'முதலமைச்சரின் விரிவான மருத்துவ காப்பீட்டுத் திட்டம் (CMCHIS)' : 'CMCHIS ₹5 Lakh Free Cashless Hospital Treatment',
      icon: '🏥',
      bgGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
      borderColor: 'border-blue-200 hover:border-blue-500',
      textColor: 'text-blue-900',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'MSME',
      name: lang === 'ta' ? 'சிறு தொழில் & கடன்' : 'MSME & Business Loans',
      desc: lang === 'ta' ? 'NEEDS திட்டம், முத்ரா கடன், பி.எம். விஸ்வகர்மா' : 'MUDRA Collateral-free Loans, NEEDS 25% Subsidy',
      icon: '💼',
      bgGradient: 'from-purple-500/10 via-violet-500/5 to-transparent',
      borderColor: 'border-purple-200 hover:border-purple-500',
      textColor: 'text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'Housing',
      name: lang === 'ta' ? 'வீட்டு வசதி' : 'Housing & Shelter',
      desc: lang === 'ta' ? 'கலைஞர் கனவு இல்லம் திட்டம், PMAY ஊரக & நகர்ப்புற வீடு' : 'Kalaignar Kanavu Illam, PMAY Concrete Home Grants',
      icon: '🏡',
      bgGradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
      borderColor: 'border-orange-200 hover:border-orange-500',
      textColor: 'text-orange-900',
      badgeColor: 'bg-orange-100 text-orange-800'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
        onOpenSearch={() => setActiveTab('schemes')}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12 pb-16">
            
            {/* 1. Hero Section with Voice search & quick cards */}
            <HeroSection
              onSearch={handleHeroSearch}
              onSelectPrompt={handleSelectPrompt}
              onNavigate={(tabId) => setActiveTab(tabId)}
              onStartVoice={() => setActiveTab('ask-ai')}
            />

            {/* 2. Key Statistics Trust Strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                
                <div className="flex items-center space-x-3.5 pt-3 md:pt-0">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shrink-0 font-bold shadow-xs">
                    🏛️
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">30+</div>
                    <div className="text-xs text-slate-500 font-semibold">
                      {lang === 'ta' ? 'அரசு நலத்திட்டங்கள்' : 'State & Central Schemes'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 pt-3 md:pt-0 pl-0 md:pl-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl shrink-0 font-bold shadow-xs">
                    📍
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">38</div>
                    <div className="text-xs text-slate-500 font-semibold">
                      {lang === 'ta' ? 'மாவட்டங்கள் இ-சேவை' : 'Tamil Nadu Districts'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 pt-3 md:pt-0 pl-0 md:pl-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0 font-bold shadow-xs">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                    <div className="text-xs text-slate-500 font-semibold">
                      {lang === 'ta' ? 'துல்லிய தகுதி பொருத்தம்' : 'Instant AI Matching'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 pt-3 md:pt-0 pl-0 md:pl-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-xl shrink-0 font-bold shadow-xs">
                    🗣️
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">தமிழ் / EN</div>
                    <div className="text-xs text-slate-500 font-semibold">
                      {lang === 'ta' ? 'இருமொழி வாய்ஸ் AI' : 'Bilingual Voice AI'}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. Featured Categories Showcase */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'முக்கிய நலத்திட்டப் பிரிவுகள்' : 'Key Welfare Sectors'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {lang === 'ta' ? 'பிரிவு வாரியாக அரசு திட்டங்கள்' : 'Explore by Welfare Categories'}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="inline-flex items-center space-x-1 text-xs font-extrabold text-emerald-700 hover:text-emerald-900"
                >
                  <span>{lang === 'ta' ? 'அனைத்து திட்டங்களையும் காண்க' : 'View All 30+ Schemes'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryHighlights.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSearchQuery(cat.id);
                      setActiveTab('schemes');
                    }}
                    className={`group p-5 rounded-3xl bg-white bg-gradient-to-br ${cat.bgGradient} border ${cat.borderColor} shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl p-2 rounded-2xl bg-white shadow-2xs group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cat.badgeColor}`}>
                          Explore
                        </span>
                      </div>
                      <h3 className={`text-base font-bold ${cat.textColor} group-hover:text-slate-900`}>
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-700">
                      <span>{lang === 'ta' ? 'திட்டங்களை பார்க்க' : 'Browse Schemes'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Interactive Eligibility Matcher CTA Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-emerald-500/30">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-3 max-w-2xl">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'ta' ? '1-நிமிட இலவச தகுதி சோதனை' : '1-Minute Instant Eligibility Check'}</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                      {lang === 'ta' 
                        ? 'உங்களுக்கு அரசு வழங்கும் பயன்களை உடனே கணக்கிடுங்கள்' 
                        : 'Discover Every Government Benefit You Qualify For'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {lang === 'ta'
                        ? 'உங்கள் வயது, குடும்ப வருமானம், கல்வி நிலை மற்றும் சமூகப் பிரிவை பூர்த்தி செய்து உங்களுக்குரிய முழு நலத்திட்டங்களின் பட்டியலை உடனடி அறிக்கையாகப் பெறுங்கள்.'
                        : 'Answer a few simple questions to get your personalized qualification score, missing certificate checklist, and direct online application links.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('eligibility')}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center space-x-2 shrink-0 self-start lg:self-auto transform hover:scale-105"
                  >
                    <span>{lang === 'ta' ? 'இப்போதே தகுதி காண்க' : 'Check My Eligibility Now'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Complete Scheme Catalogue Grid */}
            <div className="pt-4">
              <SchemesList
                initialSearch=""
                onAskAi={handleAskAiAboutScheme}
                onNavigateCentres={() => setActiveTab('centres')}
              />
            </div>

          </div>
        )}

        {activeTab === 'schemes' && (
          <SchemesList
            initialSearch={searchQuery}
            onAskAi={handleAskAiAboutScheme}
            onNavigateCentres={() => setActiveTab('centres')}
          />
        )}

        {activeTab === 'ask-ai' && (
          <AiAssistant
            initialPrompt={aiPrompt}
            onSelectScheme={(scheme) => {
              setSearchQuery(scheme.schemeName);
              setActiveTab('schemes');
            }}
          />
        )}

        {activeTab === 'eligibility' && (
          <EligibilityMatcher
            onAskAi={handleAskAiAboutScheme}
            onNavigateCentres={() => setActiveTab('centres')}
          />
        )}

        {activeTab === 'centres' && (
          <NearbyCentres />
        )}

        {activeTab === 'docs-guide' && (
          <DocumentsGuide />
        )}

        {(activeTab === 'profile' || activeTab === 'saved') && (
          <UserProfile
            initialSubTab={activeTab === 'saved' ? 'saved' : 'profile'}
            onOpenAuth={handleOpenAuth}
            onAskAi={handleAskAiAboutScheme}
            onNavigateCentres={() => setActiveTab('centres')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            onOpenAuth={handleOpenAuth}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tabId) => setActiveTab(tabId)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Global Notification Drawer */}
      <NotificationDrawer
        onSelectScheme={(s) => {
          setSearchQuery(s.schemeName);
          setActiveTab('schemes');
        }}
      />

      {/* Toast Feedback */}
      <Toast />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <NotificationProvider>
          <MainLayout />
        </NotificationProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
