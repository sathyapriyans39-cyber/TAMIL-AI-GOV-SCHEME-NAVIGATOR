/**
 * Navbar Component with Government Emblem, Bilingual Toggle, and Nav Links
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Bell, 
  User, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Bookmark, 
  Bot, 
  MapPin, 
  FileText, 
  CheckCircle2,
  Sparkles,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export default function Navbar({ activeTab, setActiveTab, onOpenAuth, onOpenSearch }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadCount, setIsOpen: setNotifOpen } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'schemes', label: t('nav.schemes'), icon: Search },
    { id: 'ask-ai', label: t('nav.askAi'), icon: Bot, highlight: true },
    { id: 'eligibility', label: t('nav.checkEligibility'), icon: CheckCircle2 },
    { id: 'centres', label: t('nav.nearbyCentres'), icon: MapPin },
    { id: 'docs-guide', label: t('nav.docsGuide'), icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Govt of TN & India Official Tricolor Header Strip */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-1 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 font-medium text-emerald-400">
            <span>🏛️</span>
            <span>{lang === 'ta' ? 'தமிழ்நாடு அரசு & இந்திய மத்திய அரசு' : 'Govt of Tamil Nadu & Govt of India'}</span>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">
            {lang === 'ta' ? 'அதிகாரப்பூர்வ நலத்திட்டங்கள் வழிகாட்டி' : 'Official Citizen Welfare Scheme Portal'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-amber-400 font-medium hidden sm:inline">
            {lang === 'ta' ? 'உதவி எண்: 1100' : 'Helpline: 1100'}
          </span>
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-0.5 rounded-full text-xs font-medium transition-all border border-slate-700 hover:border-emerald-500"
            title="Change Language / மொழியை மாற்றுக"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ta' ? 'English' : 'தமிழ்'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🏛️</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                  {lang === 'ta' ? 'தமிழ் AI' : 'Tamil AI'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold tracking-wider uppercase border border-emerald-300">
                  {lang === 'ta' ? 'அரசு திட்டம்' : 'Navigator'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-[240px] sm:max-w-none truncate">
                {lang === 'ta' ? 'அரசு திட்டங்கள் AI வழிகாட்டி' : 'Government Scheme Navigator'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : item.highlight
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-700 hover:to-teal-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : item.highlight ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Switcher, Notifications, Auth/Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Prominent Language Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => { if (lang !== 'en') toggleLanguage(); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  lang === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => { if (lang !== 'ta') toggleLanguage(); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                  lang === 'ta'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="தமிழுக்கு மாற்றுக"
              >
                தமிழ்
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 pl-2 rounded-lg hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="hidden md:block text-left pr-1">
                    <p className="text-xs font-semibold text-slate-800 leading-none truncate max-w-[110px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-medium leading-tight">
                      {isAdmin ? 'Admin' : 'Citizen'}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-up">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => { setActiveTab('profile'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{t('nav.myProfile')}</span>
                    </button>

                    <button
                      onClick={() => { setActiveTab('saved'); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center space-x-2"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>{t('nav.savedSchemes')} ({user.savedSchemes?.length || 0})</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => { setActiveTab('admin'); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-purple-700 hover:bg-purple-50 flex items-center space-x-2 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-purple-600" />
                        <span>{t('nav.admin')}</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          {isAuthenticated && (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <button
                onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700"
              >
                <User className="w-5 h-5 text-slate-500" />
                <span>{t('nav.myProfile')}</span>
              </button>
              <button
                onClick={() => { setActiveTab('saved'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-700"
              >
                <Bookmark className="w-5 h-5 text-slate-500" />
                <span>{t('nav.savedSchemes')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
