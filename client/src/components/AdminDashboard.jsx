/**
 * AdminDashboard Component
 * Government Welfare Administrator Portal for scheme publishing, analytics, and auto-dispatch
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  Users, 
  TrendingUp, 
  BellRing, 
  CheckCircle2, 
  Send, 
  Layers, 
  IndianRupee,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

export function AdminDashboard({ onOpenAuth }) {
  const { lang, t } = useLanguage();
  const { user, token, isAdmin, loginDemo } = useAuth();

  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState(null);

  // New Scheme Form
  const [newScheme, setNewScheme] = useState({
    schemeName: '',
    tamilName: '',
    governmentLevel: 'TAMIL_NADU',
    department: 'Social Welfare & Women Empowerment Department',
    tamilDepartment: 'சமூக நலம் & மகளிர் உரிமைத் துறை',
    category: 'Women Welfare',
    tamilCategory: 'மகளிர் நலம்',
    description: '',
    tamilDescription: '',
    benefits: '',
    tamilBenefits: '',
    benefitAmount: 12000,
    applicationWebsite: 'https://www.tn.gov.in',
    helpline: '1100'
  });

  const fetchMetrics = async () => {
    if (!token || !isAdmin) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/metrics`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMetrics(data.data);
      }
    } catch (err) {
      console.error('Error fetching admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [token, isAdmin]);

  const handlePublishSubmit = async (e) => {
    e.preventDefault();
    if (!newScheme.schemeName || !newScheme.tamilName) {
      alert('Scheme name in both English and Tamil is required');
      return;
    }

    setPublishing(true);
    setPublishResult(null);

    try {
      const res = await fetch(`${API_BASE}/admin/schemes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newScheme)
      });
      const data = await res.json();
      if (data.success) {
        setPublishResult(data);
        fetchMetrics();
        // Reset form
        setNewScheme({
          schemeName: '',
          tamilName: '',
          governmentLevel: 'TAMIL_NADU',
          department: 'Social Welfare & Women Empowerment Department',
          tamilDepartment: 'சமூக நலம் & மகளிர் உரிமைத் துறை',
          category: 'Women Welfare',
          tamilCategory: 'மகளிர் நலம்',
          description: '',
          tamilDescription: '',
          benefits: '',
          tamilBenefits: '',
          benefitAmount: 12000,
          applicationWebsite: 'https://www.tn.gov.in',
          helpline: '1100'
        });
      }
    } catch (err) {
      console.error('Publishing error:', err);
    } finally {
      setPublishing(false);
    }
  };

  if (!isAdmin) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16 text-center animate-fadeIn">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mx-auto text-2xl">
            🔒
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {lang === 'ta' ? 'அரசு நிர்வாகி அங்கீகாரம் தேவை' : 'Government Administrator Access Required'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {lang === 'ta'
              ? 'புதிய திட்டங்களை வெளியிட மற்றும் புள்ளிவிவரங்களை கண்காணிக்க அரசு நிர்வாகி கணக்கில் உள்நுழையவும்.'
              : 'Please log in with an authorized TN Govt Welfare Administrator account to manage schemes.'}
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => loginDemo('ADMIN')}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>🏛️</span>
              <span>{lang === 'ta' ? 'நிர்வாகி மாதிரி கணக்கில் உள்நுழை' : '1-Click Demo Admin Login'}</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
            <LayoutDashboard className="w-4 h-4" />
            <span>{t('admin.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {lang === 'ta' ? 'அரசு நலத்திட்டங்கள் நிர்வாக தளம்' : 'Govt Scheme Management & Analytics'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {lang === 'ta' ? 'திட்டங்கள் வெளியீடு, குடிமக்கள் பொருத்தம் மற்றும் தேடல் போக்குகள்' : 'Real-time telemetry, search queries tracker, and auto-matching notification broadcast engine'}
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 text-xs text-purple-200">
          <span>Logged in as: <strong>{user?.name}</strong></span>
        </div>
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('admin.totalSchemes')}</span>
            <div className="text-2xl font-black text-slate-900">{metrics.totalSchemes}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Active in DB</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('admin.tnSchemes')}</span>
            <div className="text-2xl font-black text-emerald-800">{metrics.tnSchemesCount}</div>
            <span className="text-[11px] text-slate-500 font-semibold">State Government</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('admin.centralSchemes')}</span>
            <div className="text-2xl font-black text-blue-800">{metrics.centralSchemesCount}</div>
            <span className="text-[11px] text-slate-500 font-semibold">Central Schemes</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">{t('admin.usersCount')}</span>
            <div className="text-2xl font-black text-purple-800">{metrics.totalRegisteredUsers}</div>
            <span className="text-[11px] text-purple-600 font-semibold">Matched Profiles</span>
          </div>
        </div>
      )}

      {/* Popular Citizen Queries Tracker */}
      {metrics?.popularSearches && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <span>{lang === 'ta' ? 'அதிகம் தேடப்படும் அரசு திட்ட வினவல்கள்' : 'Top Citizen Search Trends & Intent Analysis'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">Live Analytics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {metrics.popularSearches.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{item.query}</p>
                  <span className="text-[10px] text-slate-500 font-medium">{item.category}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-extrabold">
                  {item.count} searches
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form: Add New Scheme with Automated Profile Broadcasting */}
      <form onSubmit={handlePublishSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-purple-700" />
              <span>{t('admin.addNewScheme')}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ta'
                ? 'புதிய திட்டத்தை வெளியிடும்போது, தகுதியுள்ள பதிவுசெய்த குடிமக்களுக்கு தானாகவே அறிவிப்பு அனுப்பப்படும்.'
                : 'Publishing a scheme automatically matches it against registered citizen profiles and dispatches real-time alerts.'}
            </p>
          </div>

          {publishResult && (
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{publishResult.notificationsDispatched} notifications dispatched!</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Scheme Name English */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('admin.schemeName')}</label>
            <input
              type="text"
              required
              value={newScheme.schemeName}
              onChange={(e) => setNewScheme(prev => ({ ...prev, schemeName: e.target.value }))}
              placeholder="e.g. Chief Minister Rural Housing Scheme"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Scheme Name Tamil */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('admin.tamilName')}</label>
            <input
              type="text"
              required
              value={newScheme.tamilName}
              onChange={(e) => setNewScheme(prev => ({ ...prev, tamilName: e.target.value }))}
              placeholder="உதாரணம்: முதலமைச்சரின் ஊரக வீட்டு வசதி திட்டம்"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Government Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('admin.governmentLevel')}</label>
            <select
              value={newScheme.governmentLevel}
              onChange={(e) => setNewScheme(prev => ({ ...prev, governmentLevel: e.target.value }))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-purple-500 focus:outline-none cursor-pointer"
            >
              <option value="TAMIL_NADU">🏛️ Tamil Nadu State Government</option>
              <option value="CENTRAL">🇮🇳 Government of India (Central)</option>
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('admin.department')}</label>
            <input
              type="text"
              value={newScheme.department}
              onChange={(e) => setNewScheme(prev => ({ ...prev, department: e.target.value }))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('admin.category')}</label>
            <select
              value={newScheme.category}
              onChange={(e) => setNewScheme(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-purple-500 focus:outline-none cursor-pointer"
            >
              <option value="Education">Education</option>
              <option value="Scholarships">Scholarships</option>
              <option value="Women Welfare">Women Welfare</option>
              <option value="Farmer Schemes">Farmer Schemes</option>
              <option value="Health">Health</option>
              <option value="Housing">Housing</option>
              <option value="MSME">MSME / Business</option>
              <option value="Social Welfare">Social Welfare</option>
            </select>
          </div>

          {/* Benefit Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('admin.benefitAmount')}</label>
            <input
              type="number"
              value={newScheme.benefitAmount}
              onChange={(e) => setNewScheme(prev => ({ ...prev, benefitAmount: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-purple-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Benefits Description English & Tamil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Key Benefits (English)</label>
            <textarea
              rows="2"
              value={newScheme.benefits}
              onChange={(e) => setNewScheme(prev => ({ ...prev, benefits: e.target.value }))}
              placeholder="e.g. ₹1,000 monthly bank credit directly to beneficiary account"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">முக்கிய பயன்கள் (தமிழ்)</label>
            <textarea
              rows="2"
              value={newScheme.tamilBenefits}
              onChange={(e) => setNewScheme(prev => ({ ...prev, tamilBenefits: e.target.value }))}
              placeholder="உதாரணம்: பயனாளியின் வங்கிக் கணக்கில் நேரடியாக மாதம் ₹1,000"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={publishing}
            className="px-8 py-3.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-xl font-extrabold text-sm shadow-md flex items-center space-x-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{publishing ? 'Publishing & Broadcasting...' : t('admin.publishScheme')}</span>
          </button>
        </div>

      </form>

    </section>
  );
}

export default AdminDashboard;
