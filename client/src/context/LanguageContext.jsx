/**
 * Language Context for Tamil & English switching
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('tamil_scheme_lang') || 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('tamil_scheme_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ta' ? 'en' : 'ta');
  };

  // Safe helper to get nested translation strings without throwing React child errors
  const t = (path) => {
    if (!path || typeof path !== 'string') return '';
    const keys = path.split('.');

    // 1. Check in current language dictionary
    let val = translations[lang];
    for (const k of keys) {
      if (val && typeof val === 'object' && val[k] !== undefined) {
        val = val[k];
      } else {
        val = undefined;
        break;
      }
    }
    if (typeof val === 'string') return val;

    // 2. Fallback to English dictionary
    let fb = translations['en'];
    for (const k of keys) {
      if (fb && typeof fb === 'object' && fb[k] !== undefined) {
        fb = fb[k];
      } else {
        fb = undefined;
        break;
      }
    }
    if (typeof fb === 'string') return fb;

    // Return key identifier if not found
    return path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
