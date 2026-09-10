/**
 * SchemeDetailModal Component
 * Comprehensive details, eligibility breakdown, document checklist, and step-by-step guide
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Bookmark, 
  ExternalLink, 
  MapPin, 
  Phone, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  Share2, 
  Printer, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Volume2,
  Square
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { speechSynthesizer } from '../utils/voiceSpeechEngine';

export function SchemeDetailModal({ scheme, onClose, onAskAi, onNavigateCentres }) {
  const { lang, t } = useLanguage();
  const { isSchemeSaved, toggleSaveScheme } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      speechSynthesizer.stop();
    };
  }, []);

  if (!scheme) return null;

  const isSaved = isSchemeSaved(scheme.id);
  const isTN = scheme.governmentLevel === 'TAMIL_NADU';
  const match = scheme.eligibilityMatch;

  const formatAmount = (num) => {
    if (!num) return null;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lang === 'ta' ? scheme.tamilName : scheme.schemeName,
        text: lang === 'ta' ? scheme.tamilDescription : scheme.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      speechSynthesizer.stop();
      setIsSpeaking(false);
      return;
    }

    const title = lang === 'ta' ? scheme.tamilName : scheme.schemeName;
    const desc = lang === 'ta' ? scheme.tamilDescription : scheme.description;
    const benefits = lang === 'ta' ? (scheme.tamilBenefits || scheme.benefits) : scheme.benefits;
    const textToSpeak = `${title}. ${desc}. ${benefits ? (lang === 'ta' ? `பயன்கள்: ${benefits}` : `Benefits: ${benefits}`) : ''}`;

    speechSynthesizer.speak({
      text: textToSpeak,
      lang,
      rate: 0.95,
      pitch: 1.0,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content Window */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        
        {/* Header Ribbon */}
        <div className={`w-full py-2.5 px-6 flex items-center justify-between text-xs font-semibold ${
          isTN 
            ? 'bg-emerald-800 text-emerald-100 border-b border-emerald-700' 
            : 'bg-blue-900 text-blue-100 border-b border-blue-800'
        }`}>
          <div className="flex items-center space-x-2">
            <span>{isTN ? '🏛️ தமிழ்நாடு அரசு நலத்திட்டம்' : '🇮🇳 Government of India Central Scheme'}</span>
            <span>•</span>
            <span>{scheme.department || scheme.tamilDepartment}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[11px] font-bold">
              {scheme.status || 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Top Bar with Title & Close */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {lang === 'ta' ? scheme.tamilCategory || scheme.category : scheme.category}
                </span>
                {scheme.lastUpdated && (
                  <span className="text-xs text-slate-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {lang === 'ta' ? 'புதுப்பிக்கப்பட்டது:' : 'Updated:'} {scheme.lastUpdated}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {lang === 'ta' ? scheme.tamilName : scheme.schemeName}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {lang === 'ta' ? scheme.schemeName : scheme.tamilName}
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {/* Voice Listen Button */}
              <button
                onClick={handleToggleVoice}
                className={`p-2.5 rounded-xl border flex items-center space-x-1.5 text-xs font-bold transition-all ${
                  isSpeaking 
                    ? 'bg-red-50 border-red-300 text-red-600 shadow-xs' 
                    : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                }`}
                title={isSpeaking ? 'Stop voice playback' : 'Listen with high-clarity voice narration'}
              >
                {isSpeaking ? (
                  <>
                    <Square className="w-4 h-4 fill-red-600" />
                    <span className="hidden sm:inline">{lang === 'ta' ? 'நிறுத்து' : 'Stop'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                    <span className="hidden sm:inline">{lang === 'ta' ? 'குரலில் கேள்' : 'Listen'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleSaveScheme(scheme.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSaved 
                    ? 'bg-amber-50 border-amber-300 text-amber-600' 
                    : 'border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50'
                }`}
                title={isSaved ? 'Saved to bookmarks' : 'Save scheme'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Benefits Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{lang === 'ta' ? 'திட்டத்தின் முக்கிய பயன்கள்' : 'Scheme Key Benefits'}</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800">
                {lang === 'ta' ? scheme.tamilBenefits || scheme.benefits : scheme.benefits || scheme.tamilBenefits}
              </p>
            </div>

            {scheme.benefitAmount > 0 && (
              <div className="shrink-0 bg-white px-4 py-2.5 rounded-xl border border-emerald-200 shadow-xs text-center sm:text-right">
                <div className="text-[11px] text-slate-500 font-medium">{t('schemes.benefit')}</div>
                <div className="text-xl font-black text-emerald-800">
                  {formatAmount(scheme.benefitAmount)}
                </div>
              </div>
            )}
          </div>

          {/* Personalized Eligibility Match Breakdown (if evaluated) */}
          {match && (
            <div className={`p-4 rounded-2xl border ${
              match.matchPercentage >= 80 
                ? 'bg-emerald-50/50 border-emerald-200' 
                : match.matchPercentage >= 50 
                ? 'bg-amber-50/50 border-amber-200' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                  <span>🎯</span>
                  <span>{t('schemes.eligibilityMatch')}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  match.matchPercentage >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {match.matchPercentage}% {lang === 'ta' ? 'பொருத்தம்' : 'Match'}
                </span>
              </div>

              {match.reasons && match.reasons.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-semibold text-emerald-800">
                    {lang === 'ta' ? '✓ நீங்கள் தகுதி பெறும் காரணங்கள்:' : '✓ Why you qualify:'}
                  </p>
                  <ul className="text-xs text-slate-700 space-y-0.5 pl-4 list-disc">
                    {match.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {match.unmet && match.unmet.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-semibold text-amber-800">
                    {lang === 'ta' ? '⚠ கூடுதல் தேவைகள் / சரிபார்க்க வேண்டியவை:' : '⚠ Pending checks / requirements:'}
                  </p>
                  <ul className="text-xs text-slate-700 space-y-0.5 pl-4 list-disc">
                    {match.unmet.map((u, i) => (
                      <li key={i}>{u}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Scheme Overview */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ta' ? 'திட்டத்தின் விளக்கம்' : 'Scheme Description & Overview'}</span>
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              {lang === 'ta' ? scheme.tamilDescription || scheme.description : scheme.description}
            </p>
          </div>

          {/* Eligibility Criteria Grid */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ta' ? 'தகுதி வரம்புகள்' : 'Eligibility Criteria'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {scheme.eligibilityCriteria?.gender && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 block">{lang === 'ta' ? 'பாலினம்' : 'Gender'}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {scheme.eligibilityCriteria.gender === 'ALL' ? (lang === 'ta' ? 'அனைவரும்' : 'All') : scheme.eligibilityCriteria.gender}
                  </span>
                </div>
              )}

              {(scheme.eligibilityCriteria?.minAge || scheme.eligibilityCriteria?.maxAge) && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 block">{lang === 'ta' ? 'வயது வரம்பு' : 'Age Criteria'}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {scheme.eligibilityCriteria.minAge || 0} - {scheme.eligibilityCriteria.maxAge || 100} {lang === 'ta' ? 'வயது' : 'years'}
                  </span>
                </div>
              )}

              {scheme.eligibilityCriteria?.maxAnnualIncome && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 block">{lang === 'ta' ? 'அதிகபட்ச ஆண்டு வருமானம்' : 'Max Annual Income'}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {formatAmount(scheme.eligibilityCriteria.maxAnnualIncome)}
                  </span>
                </div>
              )}

              {scheme.eligibilityCriteria?.community && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 block">{lang === 'ta' ? 'சமூகப் பிரிவு' : 'Community'}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {Array.isArray(scheme.eligibilityCriteria.community) 
                      ? scheme.eligibilityCriteria.community.join(', ') 
                      : scheme.eligibilityCriteria.community}
                  </span>
                </div>
              )}

              {scheme.districtAvailability && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 block">{lang === 'ta' ? 'மாவட்ட வரம்பு' : 'District Range'}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {scheme.districtAvailability}
                  </span>
                </div>
              )}

              {scheme.applicationCentre && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 block">{lang === 'ta' ? 'விண்ணப்பிக்கும் இடம்' : 'Application Point'}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {scheme.applicationCentre}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Required Documents List */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ta' ? 'தேவையான ஆவணங்களின் பட்டியல்' : 'Required Documents Checklist'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scheme.documentsRequired?.map((doc, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start space-x-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {lang === 'ta' ? doc.tamilName || doc.name : doc.name}
                    </p>
                    {doc.source && (
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                        📍 {lang === 'ta' ? 'வழங்கும் இடம்:' : 'Source:'} {doc.source}
                      </p>
                    )}
                    {doc.description && (
                      <p className="text-[10px] text-slate-500 mt-0.5">{doc.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Application Roadmap */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-1.5">
              <ArrowRight className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'ta' ? 'விண்ணப்பிக்கும் வழிமுறைகள்' : 'How to Apply (Step-by-Step)'}</span>
            </h4>

            <div className="space-y-2.5">
              {(lang === 'ta' && scheme.tamilApplicationProcess 
                ? scheme.tamilApplicationProcess 
                : scheme.applicationProcess || []
              ).map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Helpline & Official Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold text-slate-800">
                {lang === 'ta' ? 'அரசு உதவி எண்:' : 'Official Helpline:'}
              </span>
              <span className="font-bold text-emerald-800">{scheme.helpline || '1100'}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium flex items-center space-x-1"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{copied ? (lang === 'ta' ? 'நகலெடுக்கப்பட்டது!' : 'Link Copied!') : (lang === 'ta' ? 'பகிர்' : 'Share')}</span>
              </button>

              <button 
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'ta' ? 'அச்சிடுக' : 'Print'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          
          {/* Ask AI about this scheme */}
          <button
            onClick={() => {
              onClose();
              onAskAi(`Tell me full eligibility and application steps for ${scheme.schemeName} (${scheme.tamilName})`);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ta' ? 'AI-யிடம் இத்திட்டம் பற்றி கேள்' : 'Ask AI About This Scheme'}</span>
          </button>

          <div className="flex items-center space-x-2">
            {/* Locate Centre */}
            <button
              onClick={() => {
                onClose();
                onNavigateCentres();
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{lang === 'ta' ? 'இ-சேவை மையம் தேடுக' : 'Find e-Seva Centre'}</span>
            </button>

            {/* Official Portal External Link */}
            {scheme.applicationWebsite && (
              <a
                href={scheme.applicationWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold flex items-center space-x-1.5 transition-all shadow-md"
              >
                <span>{lang === 'ta' ? 'அதிகாரப்பூர்வ தளம்' : 'Official Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default SchemeDetailModal;
