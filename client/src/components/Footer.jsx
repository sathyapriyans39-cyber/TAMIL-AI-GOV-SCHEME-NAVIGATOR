/**
 * Footer Component
 * Official Government Emblem homage, State & National Helplines, and Portal links
 */

import React from 'react';
import { 
  Building2, 
  Phone, 
  Globe, 
  ShieldCheck, 
  ExternalLink, 
  Heart, 
  FileText, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer({ onNavigate }) {
  const { lang, toggleLanguage, t } = useLanguage();

  const helplines = [
    { name: lang === 'ta' ? 'அரசு பொது உதவி எண்' : 'CM Helpline (TN)', number: '1100', icon: '🏛️' },
    { name: lang === 'ta' ? 'மகளிர் உதவி எண்' : 'Women Helpline', number: '181', icon: '👩' },
    { name: lang === 'ta' ? 'மருத்துவ ஆலோசனை' : 'Health Helpline', number: '104', icon: '🏥' },
    { name: lang === 'ta' ? 'குழந்தைகள் உதவி எண்' : 'Childline', number: '1098', icon: '👶' },
    { name: lang === 'ta' ? 'விவசாயிகள் உதவி மையம்' : 'Kisan Call Centre', number: '1800-180-1551', icon: '🌾' }
  ];

  const officialLinks = [
    { name: 'Tamil Nadu Government Portal (tn.gov.in)', url: 'https://www.tn.gov.in' },
    { name: 'TNeGA e-Seva Portal (tnesevai.tn.gov.in)', url: 'https://www.tnesevai.tn.gov.in' },
    { name: 'National Portal of India (india.gov.in)', url: 'https://www.india.gov.in' },
    { name: 'myScheme Central Portal (myscheme.gov.in)', url: 'https://www.myscheme.gov.in' },
    { name: 'Direct Benefit Transfer (dbtbharat.gov.in)', url: 'https://www.dbtbharat.gov.in' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Helplines Grid */}
        <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
            <Phone className="w-4 h-4" />
            <span>{lang === 'ta' ? 'முக்கிய அரசு அவசர & உதவி எண்கள்' : 'Emergency & Citizen Support Helplines'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {helplines.map((h, idx) => (
              <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60">
                <span className="text-sm block">{h.icon}</span>
                <span className="text-[11px] text-slate-400 block mt-1 truncate">{h.name}</span>
                <span className="text-sm font-extrabold text-amber-400">{h.number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xl">
                🏛️
              </div>
              <span className="font-extrabold text-lg text-white">
                {lang === 'ta' ? 'தமிழ் AI அரசு வழிகாட்டி' : 'Tamil AI Navigator'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'ta'
                ? 'தமிழ்நாடு மாநில அரசு மற்றும் மத்திய அரசின் அனைத்து நலத்திட்டங்களையும் சாமானிய மக்களும் எளிதாக அறிந்து பயன்பெற உதவும் AI தளம்.'
                : 'Citizen welfare portal empowering citizens with transparent scheme eligibility, required document checklists, and local e-Seva centre mapping.'}
            </p>

            <button
              onClick={toggleLanguage}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-slate-700"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாறவும்'}</span>
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'தள இணைப்புகள்' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('schemes')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.schemes')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ask-ai')} className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <span>{t('nav.askAi')}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-900 text-emerald-300 rounded font-bold">AI</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('eligibility')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.checkEligibility')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('centres')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.nearbyCentres')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('docs-guide')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.docsGuide')}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Government Portals */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'அதிகாரப்பூர்வ அரசு இணையதளங்கள்' : 'Official Government Portals'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {officialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-emerald-400 transition-colors py-1 truncate"
                >
                  <ExternalLink className="w-3 h-3 shrink-0 text-slate-500" />
                  <span className="truncate">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer & Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 text-center space-y-2">
          <p className="text-[11px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
            {t('schemes.disclaimer')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-2">
            <span>© {new Date().getFullYear()} Tamil AI Government Scheme Navigator</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">
              {lang === 'ta' ? 'தமிழ்நாடு & இந்திய நலத்திட்டங்கள் AI தளம்' : 'Govt of Tamil Nadu & India Citizen Portal'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
