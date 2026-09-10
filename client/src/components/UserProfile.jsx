/**
 * UserProfile Component
 * Citizen Profile Management, Automatic Match Bio, and Saved Schemes Progress Tracker
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bookmark, 
  CheckCircle2, 
  Save, 
  Building2, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SchemeCard from './SchemeCard';
import SchemeDetailModal from './SchemeDetailModal';

const API_BASE = 'http://localhost:5000/api';

const DISTRICTS_LIST = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
  "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
  "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi",
  "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai",
  "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

export function UserProfile({ initialSubTab = 'profile', onOpenAuth, onAskAi, onNavigateCentres }) {
  const { lang, t } = useLanguage();
  const { user, token, updateProfile, isAuthenticated } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState(initialSubTab); // 'profile' | 'saved'
  const [savedSchemesList, setSavedSchemesList] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Form profile state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    age: user?.profile?.age || 20,
    gender: user?.profile?.gender || 'FEMALE',
    state: user?.profile?.state || 'Tamil Nadu',
    district: user?.profile?.district || 'Madurai',
    taluk: user?.profile?.taluk || 'Madurai North',
    village: user?.profile?.village || 'Tallakulam',
    annualIncome: user?.profile?.annualIncome || 180000,
    occupation: user?.profile?.occupation || 'Student',
    isStudent: user?.profile?.isStudent !== undefined ? user?.profile?.isStudent : true,
    educationLevel: user?.profile?.educationLevel || 'Undergraduate',
    course: user?.profile?.course || 'B.Sc Computer Science',
    studiedGovtSchool6to12: user?.profile?.studiedGovtSchool6to12 !== undefined ? user?.profile?.studiedGovtSchool6to12 : true,
    isFirstGraduate: user?.profile?.isFirstGraduate !== undefined ? user?.profile?.isFirstGraduate : true,
    community: user?.profile?.community || 'MBC',
    hasDisability: user?.profile?.hasDisability || false,
    bplStatus: user?.profile?.bplStatus || true,
    maritalStatus: user?.profile?.maritalStatus || 'SINGLE',
    hasBankAccount: user?.profile?.hasBankAccount !== undefined ? user?.profile?.hasBankAccount : true,
    hasAadhaar: user?.profile?.hasAadhaar !== undefined ? user?.profile?.hasAadhaar : true
  });

  useEffect(() => {
    if (user?.profile) {
      setProfileForm(prev => ({
        ...prev,
        ...user.profile,
        name: user.name || prev.name
      }));
    }
  }, [user]);

  // Fetch saved schemes full data
  useEffect(() => {
    async function fetchSavedSchemes() {
      if (!user?.savedSchemes || user.savedSchemes.length === 0) {
        setSavedSchemesList([]);
        return;
      }

      setLoadingSaved(true);
      try {
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${API_BASE}/schemes`, { headers });
        const data = await res.json();
        if (data.success && data.schemes) {
          const filtered = data.schemes.filter(s => user.savedSchemes.includes(s.id));
          setSavedSchemesList(filtered);
        }
      } catch (err) {
        console.error('Error fetching saved schemes:', err);
      } finally {
        setLoadingSaved(false);
      }
    }

    fetchSavedSchemes();
  }, [user?.savedSchemes, token]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    const res = await updateProfile(profileForm);
    setSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  const handleChange = (field, value) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  if (!isAuthenticated) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16 text-center animate-fadeIn">
        <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl">
            👤
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {lang === 'ta' ? 'சுயவிவரத்தை அணுக உள்நுழையவும்' : 'Login to Access Citizen Profile & Bookmarks'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {lang === 'ta'
              ? 'உங்கள் சுயவிவர விவரங்களைச் சேமித்து 100% துல்லியமான அரசு திட்ட தகுதிகளை உடனுக்குடன் பெறுங்கள்.'
              : 'Save your profile bio for automatic instant eligibility matching across all welfare schemes.'}
          </p>
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md"
            >
              {t('nav.login')}
            </button>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
            >
              {t('nav.register')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Top Banner with User Card & Sub-tabs */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-2xl shadow-lg border border-emerald-500/40">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black">{user.name}</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{user.email} • {profileForm.district}, Tamil Nadu</p>
            </div>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('profile')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'profile'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t('profile.title')}</span>
            </button>

            <button
              onClick={() => setActiveSubTab('saved')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'saved'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{t('nav.savedSchemes')} ({user.savedSchemes?.length || 0})</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: PROFILE EDIT FORM */}
      {activeSubTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-8 animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">{t('profile.title')}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{t('profile.subtitle')}</p>
            </div>

            {saveSuccess && (
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t('profile.profileSavedSuccess')}</span>
              </div>
            )}
          </div>

          {/* Section 1: Basic & Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
              <span>📍</span>
              <span>{t('profile.personalTab')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.fullName')}</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.age')}</label>
                <input
                  type="number"
                  value={profileForm.age}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.gender')}</label>
                <select
                  value={profileForm.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="FEMALE">{t('profile.female')}</option>
                  <option value="MALE">{t('profile.male')}</option>
                  <option value="TRANSGENDER">{t('profile.transgender')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.district')}</label>
                <select
                  value={profileForm.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  {DISTRICTS_LIST.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Financial & Employment */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
              <span>💰</span>
              <span>{t('profile.economicTab')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.annualIncome')}</label>
                <input
                  type="number"
                  step="10000"
                  value={profileForm.annualIncome}
                  onChange={(e) => handleChange('annualIncome', parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.occupation')}</label>
                <select
                  value={profileForm.occupation}
                  onChange={(e) => {
                    const occ = e.target.value;
                    handleChange('occupation', occ);
                    if (occ === 'Student') handleChange('isStudent', true);
                  }}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Daily Wage / Unorganized">Daily Wage Worker</option>
                  <option value="Self-Employed / Business">Self-Employed / MSME</option>
                  <option value="Private Employee">Private Employee</option>
                  <option value="Government Employee">Government Employee</option>
                  <option value="Homemaker">Homemaker</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.bplStatus')}</label>
                <div className="flex space-x-4 pt-2">
                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prof_bpl"
                      checked={profileForm.bplStatus === true}
                      onChange={() => handleChange('bplStatus', true)}
                      className="text-emerald-700"
                    />
                    <span>{lang === 'ta' ? 'ஆம் (Yes)' : 'Yes'}</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prof_bpl"
                      checked={profileForm.bplStatus === false}
                      onChange={() => handleChange('bplStatus', false)}
                      className="text-emerald-700"
                    />
                    <span>{lang === 'ta' ? 'இல்லை (No)' : 'No'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Social & Education */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1.5">
              <span>🎓</span>
              <span>{t('profile.educationTab')} & {t('profile.socialTab')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.community')}</label>
                <select
                  value={profileForm.community}
                  onChange={(e) => handleChange('community', e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="MBC">MBC / DNC</option>
                  <option value="BC">BC (Backward Class)</option>
                  <option value="BCM">BCM (Muslim)</option>
                  <option value="OC">OC / General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.educationLevel')}</label>
                <select
                  value={profileForm.educationLevel}
                  onChange={(e) => handleChange('educationLevel', e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="School">School Student</option>
                  <option value="Undergraduate">UG Degree / Diploma</option>
                  <option value="Postgraduate">PG Degree / Ph.D</option>
                  <option value="Completed">Completed Studies</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.studiedGovtSchool')}</label>
                <div className="flex space-x-3 pt-2">
                  <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prof_govtschool"
                      checked={profileForm.studiedGovtSchool6to12 === true}
                      onChange={() => handleChange('studiedGovtSchool6to12', true)}
                      className="text-emerald-700"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prof_govtschool"
                      checked={profileForm.studiedGovtSchool6to12 === false}
                      onChange={() => handleChange('studiedGovtSchool6to12', false)}
                      className="text-emerald-700"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('profile.firstGraduate')}</label>
                <div className="flex space-x-3 pt-2">
                  <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prof_fg"
                      checked={profileForm.isFirstGraduate === true}
                      onChange={() => handleChange('isFirstGraduate', true)}
                      className="text-emerald-700"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="prof_fg"
                      checked={profileForm.isFirstGraduate === false}
                      onChange={() => handleChange('isFirstGraduate', false)}
                      className="text-emerald-700"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl font-extrabold text-sm shadow-md flex items-center space-x-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? (lang === 'ta' ? 'சேமிக்கிறது...' : 'Saving...') : t('profile.saveProfile')}</span>
            </button>
          </div>

        </form>
      )}

      {/* VIEW 2: SAVED SCHEMES PROGRESS TRACKER */}
      {activeSubTab === 'saved' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('nav.savedSchemes')} ({savedSchemesList.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'ta' ? 'நீங்கள் புக்மார்க் செய்த அரசு திட்டங்கள் மற்றும் ஆவண தயார்நிலை' : 'Track application progress and arranged documents for bookmarked schemes'}
              </p>
            </div>
          </div>

          {loadingSaved ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : savedSchemesList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                {lang === 'ta' ? 'சேமிக்கப்பட்ட திட்டங்கள் எதுவும் இல்லை.' : 'You have not saved any schemes yet.'}
              </p>
              <p className="text-xs text-slate-500">
                {lang === 'ta' ? 'திட்டங்கள் பக்கத்தில் புக்மார்க் செய்து எளிதாக கண்காணிக்கவும்.' : 'Click the bookmark icon on any scheme card to save it here for quick access.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSchemesList.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  onSelect={(s) => setSelectedScheme(s)}
                  onOpenCentres={onNavigateCentres}
                />
              ))}
            </div>
          )}
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

export default UserProfile;
