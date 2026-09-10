/**
 * SchemeCard Component
 * Displays scheme highlights, benefit amount, eligibility match score, and quick actions
 */

import React from 'react';
import { 
  Building2, 
  Bookmark, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  IndianRupee,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export function SchemeCard({ scheme, onSelect, onOpenCentres }) {
  const { lang, t } = useLanguage();
  const { isSchemeSaved, toggleSaveScheme, isAuthenticated } = useAuth();

  const isSaved = isSchemeSaved(scheme.id);
  const isTN = scheme.governmentLevel === 'TAMIL_NADU';
  const match = scheme.eligibilityMatch;

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleSaveScheme(scheme.id);
  };

  // Format currency
  const formatAmount = (num) => {
    if (!num) return null;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div 
      onClick={() => onSelect(scheme)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer card-hover"
    >
      {/* Top Color Accent Strip */}
      <div className={`h-1.5 w-full ${isTN ? 'bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-500'}`} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase ${
              isTN 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              <span>{isTN ? '🏛️ TN' : '🇮🇳 Central'}</span>
              <span>{isTN ? (lang === 'ta' ? 'தமிழ்நாடு' : 'Govt of TN') : (lang === 'ta' ? 'மத்திய அரசு' : 'Govt of India')}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {lang === 'ta' ? scheme.tamilCategory || scheme.category : scheme.category}
            </span>
          </div>

          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-xl transition-all ${
              isSaved 
                ? 'bg-amber-50 text-amber-600 shadow-xs' 
                : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove Bookmark' : 'Save Scheme'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
          {lang === 'ta' ? scheme.tamilName || scheme.schemeName : scheme.schemeName}
        </h3>

        {/* Secondary Title */}
        <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
          {lang === 'ta' ? scheme.schemeName : scheme.tamilName}
        </p>

        {/* Department */}
        <p className="text-xs text-slate-500 mt-2 flex items-center space-x-1">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{lang === 'ta' ? scheme.tamilDepartment || scheme.department : scheme.department}</span>
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {lang === 'ta' ? scheme.tamilDescription || scheme.description : scheme.description}
        </p>

        {/* Key Benefit Highlight Box */}
        {scheme.benefitAmount > 0 ? (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="text-[11px] text-emerald-800 font-medium">
              {lang === 'ta' ? 'பயன் தொகை' : 'Benefit Amount'}
            </div>
            <div className="text-sm font-extrabold text-emerald-900 flex items-center">
              <span>{formatAmount(scheme.benefitAmount)}</span>
              {scheme.category === 'Scholarships' && <span className="text-[10px] text-emerald-700 font-normal ml-1">/ year</span>}
              {scheme.id.includes('magalir') && <span className="text-[10px] text-emerald-700 font-normal ml-1">/ month</span>}
            </div>
          </div>
        ) : scheme.benefits ? (
          <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium line-clamp-1">
            ✨ {lang === 'ta' ? scheme.tamilBenefits || scheme.benefits : scheme.benefits}
          </div>
        ) : null}

        {/* Dynamic Eligibility Match Bar (If available) */}
        {match && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('schemes.eligibilityMatch')}</span>
              </span>
              <span className={`font-bold ${
                match.matchPercentage >= 80 ? 'text-emerald-700' : match.matchPercentage >= 50 ? 'text-amber-600' : 'text-slate-500'
              }`}>
                {match.matchPercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  match.matchPercentage >= 80 ? 'bg-emerald-600' : match.matchPercentage >= 50 ? 'bg-amber-500' : 'bg-slate-400'
                }`}
                style={{ width: `${match.matchPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Details & Action */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1 text-slate-500">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>{scheme.documentsRequired?.length || 0} {lang === 'ta' ? 'ஆவணங்கள்' : 'Docs'}</span>
        </div>

        <span className="font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center space-x-1">
          <span>{t('schemes.viewDetails')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
}

export default SchemeCard;
