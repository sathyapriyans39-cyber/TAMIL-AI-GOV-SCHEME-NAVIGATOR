/**
 * AuthModal Component
 * Login & Register modal with 1-Click Demo profiles for instant evaluation
 */

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export function AuthModal({ isOpen, initialMode = 'login', onClose }) {
  const { lang, t } = useLanguage();
  const { login, register, loginDemo, loading } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register({
          name,
          email,
          password,
          mobile,
          preferredLanguage: lang
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleDemoClick = async (role) => {
    setError(null);
    try {
      await loginDemo(role);
      onClose();
    } catch (err) {
      setError(err.message || 'Demo login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl shadow-sm">
            🏛️
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {mode === 'login' 
              ? (lang === 'ta' ? 'அரசு திட்டங்கள் தளத்தில் உள்நுழை' : 'Login to Tamil Scheme Navigator')
              : (lang === 'ta' ? 'புதிய பயனர் பதிவு' : 'Create Citizen Account')
            }
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'ta' 
              ? 'உங்கள் தகுதிகளை எளிதாக அறிந்து திட்டங்களை சேமிக்கலாம்' 
              : 'Discover personalized scheme matches and manage bookmarked welfare applications'}
          </p>
        </div>

        {/* 1-Click Demo Profiles Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 space-y-2">
          <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{lang === 'ta' ? '1-கிளிக் மாதிரி கணக்கில் நுழைய:' : 'Instant 1-Click Demo Access:'}</span>
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoClick('CITIZEN')}
              disabled={loading}
              className="px-3 py-2 bg-white hover:bg-emerald-700 hover:text-white text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-2xs text-left group"
            >
              <div className="text-[11px] font-bold">👩 {lang === 'ta' ? 'மாணவி (கவிதா)' : 'Citizen Student'}</div>
              <div className="text-[10px] text-slate-500 group-hover:text-emerald-100">Kavitha Selvam</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoClick('ADMIN')}
              disabled={loading}
              className="px-3 py-2 bg-white hover:bg-purple-700 hover:text-white text-purple-900 border border-purple-300 rounded-xl text-xs font-bold transition-all shadow-2xs text-left group"
            >
              <div className="text-[11px] font-bold">🏛️ {lang === 'ta' ? 'அரசு நிர்வாகி' : 'Govt Admin'}</div>
              <div className="text-[10px] text-slate-500 group-hover:text-purple-100">Dr. S. Kabilan</div>
            </button>
          </div>
        </div>

        {/* Tab switcher: Login / Register */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t('nav.login')}
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {t('nav.register')}
          </button>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.fullName')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kavitha Selvam"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Processing...' : (mode === 'login' ? t('nav.login') : t('nav.register'))}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}

export default AuthModal;
