/**
 * SchemesList Component
 * Filterable, searchable, sortable catalogue of all State & Central government schemes
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Building2, 
  ArrowUpDown, 
  RotateCcw, 
  Layers, 
  SlidersHorizontal,
  X,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SchemeCard from './SchemeCard';
import SchemeDetailModal from './SchemeDetailModal';

const API_BASE = 'http://localhost:5000/api';

export function SchemesList({ initialSearch = '', onAskAi, onNavigateCentres }) {
  const { lang, t } = useLanguage();
  const { token, user } = useAuth();

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & State
  const [selectedLevel, setSelectedLevel] = useState('ALL'); // ALL, TAMIL_NADU, CENTRAL
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [sortBy, setSortBy] = useState('default'); // default, benefit_desc, eligibility
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Sync initial search if passed from Hero or navbar
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Fetch schemes from API
  useEffect(() => {
    async function fetchSchemes() {
      setLoading(true);
      try {
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const params = new URLSearchParams();
        if (selectedLevel !== 'ALL') params.append('level', selectedLevel);
        if (selectedCategory !== 'ALL') params.append('category', selectedCategory);
        if (selectedGender !== 'ALL') params.append('gender', selectedGender);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        if (sortBy !== 'default') params.append('sort', sortBy);

        const res = await fetch(`${API_BASE}/schemes?${params.toString()}`, { headers });
        const data = await res.json();

        if (data.success) {
          setSchemes(data.schemes || []);
        } else {
          setError(data.message || 'Failed to load schemes');
        }
      } catch (err) {
        console.error('Error fetching schemes:', err);
        setError('Could not connect to the API server. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchSchemes();
  }, [selectedLevel, selectedCategory, selectedGender, searchQuery, sortBy, token, user]);

  const categories = [
    { id: 'ALL', name: lang === 'ta' ? 'அனைத்து பிரிவுகள்' : 'All Categories', icon: '🌟' },
    { id: 'Education', name: lang === 'ta' ? 'கல்வி & உதவித்தொகை' : 'Education & Scholarships', icon: '🎓' },
    { id: 'Women Welfare', name: lang === 'ta' ? 'மகளிர் நலம்' : 'Women Welfare', icon: '👩' },
    { id: 'Farmer Schemes', name: lang === 'ta' ? 'விவசாயிகள் நலம்' : 'Farmer Welfare', icon: '🌾' },
    { id: 'Health', name: lang === 'ta' ? 'மருத்துவம் & காப்பீடு' : 'Health & Insurance', icon: '🏥' },
    { id: 'Housing', name: lang === 'ta' ? 'வீட்டு வசதி' : 'Housing & Shelter', icon: '🏡' },
    { id: 'MSME', name: lang === 'ta' ? 'சிறு தொழில் & கடனுதவி' : 'MSME & Business Loans', icon: '💼' },
    { id: 'Social Welfare', name: lang === 'ta' ? 'சமூக நலம் & ஓய்வூதியம்' : 'Social Welfare & Pensions', icon: '🤝' },
    { id: 'Employment', name: lang === 'ta' ? 'வேலைவாய்ப்பு & பயிற்சி' : 'Employment & Skill Training', icon: '🛠️' }
  ];

  const resetFilters = () => {
    setSelectedLevel('ALL');
    setSelectedCategory('ALL');
    setSelectedGender('ALL');
    setSearchQuery('');
    setSortBy('default');
  };

  const hasActiveFilters = selectedLevel !== 'ALL' || selectedCategory !== 'ALL' || selectedGender !== 'ALL' || searchQuery.trim() !== '' || sortBy !== 'default';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Title & Government Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <Building2 className="w-4 h-4" />
            <span>{lang === 'ta' ? 'அரசு நலத்திட்டங்கள் பட்டியல்' : 'Official Schemes Catalogue'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'ta' ? 'அனைத்து அரசு நலத்திட்டங்கள்' : 'Explore Government Schemes'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === 'ta' 
              ? 'தமிழ்நாடு மாநில அரசு மற்றும் இந்திய மத்திய அரசின் அதிகாரப்பூர்வ திட்டங்கள்' 
              : 'Browse authenticated welfare schemes from Tamil Nadu State and Central Government'}
          </p>
        </div>

        {/* Level Tabs: All vs TN vs Central */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl shadow-inner border border-slate-300/60 self-start md:self-auto">
          <button
            onClick={() => setSelectedLevel('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLevel === 'ALL'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'ta' ? 'அனைத்தும்' : 'All Schemes'}
          </button>

          <button
            onClick={() => setSelectedLevel('TAMIL_NADU')}
            className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLevel === 'TAMIL_NADU'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-emerald-800'
            }`}
          >
            <span>🏛️</span>
            <span>{lang === 'ta' ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu'}</span>
          </button>

          <button
            onClick={() => setSelectedLevel('CENTRAL')}
            className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLevel === 'CENTRAL'
                ? 'bg-blue-800 text-white shadow-sm'
                : 'text-slate-700 hover:text-blue-800'
            }`}
          >
            <span>🇮🇳</span>
            <span>{lang === 'ta' ? 'மத்திய அரசு' : 'Central Govt'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Sort Dropdown */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Main Search Input */}
          <div className="relative w-full flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ta' ? 'திட்டத்தின் பெயர், துறை, அல்லது முக்கிய வார்த்தை தேடுக...' : 'Search by scheme name, department, or keyword...'}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selection */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline whitespace-nowrap">
              {t('schemes.sortBy')}:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 py-2.5 px-3 rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="default">{lang === 'ta' ? 'இயல்புநிலை' : 'Default'}</option>
              <option value="benefit_desc">{lang === 'ta' ? 'அதிக பலன் தொகை (₹)' : 'Highest Benefit Amount (₹)'}</option>
              {user && <option value="eligibility">{lang === 'ta' ? 'என் தகுதி பொருத்தம் %' : 'My Eligibility Match %'}</option>}
            </select>
          </div>

        </div>

        {/* Category Filter Pills (Scrollable horizontal chips) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicators & Reset */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-700">
                {lang === 'ta' ? `காட்டப்படும் திட்டங்கள்:` : `Showing:`} <strong className="text-emerald-800">{schemes.length}</strong>
              </span>
            </div>

            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1 text-xs font-bold text-red-600 hover:text-red-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'வடிகட்டிகளை மீட்டமை' : 'Reset Filters'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center space-y-3">
          <p className="text-sm font-bold text-red-700">{error}</p>
          <button 
            onClick={resetFilters} 
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              {t('schemes.noSchemesFound')}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ta' ? 'தேடல் சொற்களை மாற்றவும் அல்லது வடிகட்டிகளை மீட்டமைக்கவும்.' : 'Try adjusting your search keywords or clearing active filters.'}
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-xs"
          >
            {lang === 'ta' ? 'அனைத்து திட்டங்களையும் காட்டு' : 'Show All Schemes'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onSelect={(s) => setSelectedScheme(s)}
              onOpenCentres={onNavigateCentres}
            />
          ))}
        </div>
      )}

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
          onAskAi={onAskAi}
          onNavigateCentres={onNavigateCentres}
        />
      )}

    </section>
  );
}

export default SchemesList;
