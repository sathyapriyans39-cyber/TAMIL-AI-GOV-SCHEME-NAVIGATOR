/**
 * EligibilityMatcher Component
 * Interactive eligibility wizard with instant AI-driven qualification matching & benefit calculation
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Award, 
  UserCheck, 
  Building2, 
  Coins,
  ChevronRight,
  BookOpen,
  Check
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

export function EligibilityMatcher({ onSelectScheme, onAskAi, onNavigateCentres }) {
  const { lang, t } = useLanguage();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Form Profile State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.profile?.age || 20,
    gender: user?.profile?.gender || 'FEMALE',
    district: user?.profile?.district || 'Madurai',
    annualIncome: user?.profile?.annualIncome || 180000,
    occupation: user?.profile?.occupation || 'Student',
    isStudent: user?.profile?.isStudent !== undefined ? user?.profile?.isStudent : true,
    educationLevel: user?.profile?.educationLevel || 'Undergraduate',
    govtSchoolStudied: user?.profile?.studiedGovtSchool6to12 !== undefined ? user?.profile?.studiedGovtSchool6to12 : true,
    isFirstGraduate: user?.profile?.isFirstGraduate !== undefined ? user?.profile?.isFirstGraduate : true,
    community: user?.profile?.community || 'MBC',
    hasDisability: user?.profile?.hasDisability || false,
    bplStatus: user?.profile?.bplStatus || true,
    maritalStatus: user?.profile?.maritalStatus || 'SINGLE',
    isFarmer: false,
    hasLand: false,
    landAcres: 0
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreFillDemo = (type) => {
    if (type === 'student') {
      setFormData({
        name: 'Kavitha S.',
        age: 20,
        gender: 'FEMALE',
        district: 'Madurai',
        annualIncome: 180000,
        occupation: 'Student',
        isStudent: true,
        educationLevel: 'Undergraduate',
        govtSchoolStudied: true,
        isFirstGraduate: true,
        community: 'MBC',
        hasDisability: false,
        bplStatus: true,
        maritalStatus: 'SINGLE',
        isFarmer: false,
        hasLand: false,
        landAcres: 0
      });
    } else if (type === 'farmer') {
      setFormData({
        name: 'Murugan K.',
        age: 48,
        gender: 'MALE',
        district: 'Thanjavur',
        annualIncome: 120000,
        occupation: 'Farmer',
        isStudent: false,
        educationLevel: 'School',
        govtSchoolStudied: false,
        isFirstGraduate: false,
        community: 'BC',
        hasDisability: false,
        bplStatus: true,
        maritalStatus: 'MARRIED',
        isFarmer: true,
        hasLand: true,
        landAcres: 2.5
      });
    } else if (type === 'woman_head') {
      setFormData({
        name: 'Lakshmi V.',
        age: 36,
        gender: 'FEMALE',
        district: 'Salem',
        annualIncome: 150000,
        occupation: 'Homemaker / Self-employed',
        isStudent: false,
        educationLevel: 'High School',
        govtSchoolStudied: true,
        isFirstGraduate: false,
        community: 'BC',
        hasDisability: false,
        bplStatus: true,
        maritalStatus: 'MARRIED',
        isFarmer: false,
        hasLand: false,
        landAcres: 0
      });
    }
  };

  const calculateEligibility = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/schemes/match-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setResults(data);
        setStep(4); // Results step

        // Fire festive celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total potential annual benefit ₹
  const totalBenefitAmount = results?.potentiallyEligible?.reduce((sum, s) => {
    return sum + (s.benefitAmount || 0);
  }, 0) || 0;

  const formatAmount = (num) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'ta' ? 'அதிநவீன தகுதி மதிப்பீட்டு இயந்திரம்' : 'Intelligent Eligibility Matching Engine'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {lang === 'ta' ? 'உங்களுக்கான அரசு திட்டங்களை கண்டறியுங்கள்' : 'Automatic Government Scheme Matcher'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              {lang === 'ta'
                ? 'உங்கள் வயது, கல்வி, பாலினம், குடும்ப வருமானம் மற்றும் சமூகப் பிரிவை அடிப்படையாகக் கொண்டு, நீங்கள் 100% பெறக்கூடிய அனைத்து நலத்திட்டங்களையும் உடனே அறியலாம்.'
                : 'Input your details to calculate instant eligibility match scores across all official Tamil Nadu and Central schemes.'}
            </p>
          </div>

          {/* Quick Demo Pre-fill Chips */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-emerald-500/30 shrink-0 space-y-2">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
              {lang === 'ta' ? 'மாதிரி சுயவிவரத்தை நிரப்புக:' : 'Try Sample Profiles:'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePreFillDemo('student')}
                className="px-2.5 py-1 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-all"
              >
                👩 {lang === 'ta' ? 'மாணவி (கவிதா)' : 'College Girl'}
              </button>
              <button
                onClick={() => handlePreFillDemo('farmer')}
                className="px-2.5 py-1 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-all"
              >
                🌾 {lang === 'ta' ? 'விவசாயி (முருகன்)' : 'Farmer'}
              </button>
              <button
                onClick={() => handlePreFillDemo('woman_head')}
                className="px-2.5 py-1 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-all"
              >
                🏠 {lang === 'ta' ? 'குடும்பத் தலைவி' : 'Homemaker'}
              </button>
            </div>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-8 pt-6 border-t border-emerald-800/80">
          {[
            { num: 1, label: lang === 'ta' ? '1. அடிப்படை விவரம்' : '1. Personal & Location' },
            { num: 2, label: lang === 'ta' ? '2. வருமானம் & தொழில்' : '2. Income & Occupation' },
            { num: 3, label: lang === 'ta' ? '3. கல்வி & சமூகம்' : '3. Education & Category' },
            { num: 4, label: lang === 'ta' ? '4. முடிவுகள்' : '4. Matched Schemes' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => s.num < step || results ? setStep(s.num) : null}
              className={`text-left p-2 rounded-xl transition-all ${
                step === s.num 
                  ? 'bg-white text-emerald-950 font-bold shadow-md' 
                  : step > s.num 
                  ? 'bg-emerald-800/60 text-emerald-200 font-semibold' 
                  : 'bg-emerald-950/40 text-emerald-400/60 opacity-60'
              }`}
            >
              <div className="text-[10px] sm:text-xs truncate">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Wizard Form Cards */}
      {step < 4 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
          
          {/* STEP 1: Personal & Location */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'ta' ? 'படி 1: தனிப்பட்ட விவரங்கள் & மாவட்டம்' : 'Step 1: Personal & Location Details'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ta' ? 'உங்கள் வயது, பாலினம் மற்றும் வசிப்பிட மாவட்டம் தேர்ந்தெடுக்கவும்' : 'Specify your age, gender, and home district in Tamil Nadu'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                {/* Age Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'வயது (Age)' : 'Your Age'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'பாலினம் (Gender)' : 'Gender'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="FEMALE">{lang === 'ta' ? 'பெண் (Female)' : 'Female'}</option>
                    <option value="MALE">{lang === 'ta' ? 'ஆண் (Male)' : 'Male'}</option>
                    <option value="TRANSGENDER">{lang === 'ta' ? 'திருநங்கை / மூன்றாம் பாலினம்' : 'Transgender'}</option>
                  </select>
                </div>

                {/* District Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'மாவட்டம் (District in TN)' : 'District in Tamil Nadu'}
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    {DISTRICTS_LIST.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                {/* Marital Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'திருமண நிலை (Marital Status)' : 'Marital Status'}
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => handleChange('maritalStatus', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="SINGLE">{lang === 'ta' ? 'திருமணம் ஆகாதவர் (Unmarried)' : 'Unmarried / Single'}</option>
                    <option value="MARRIED">{lang === 'ta' ? 'திருமணமானவர் (Married)' : 'Married'}</option>
                    <option value="WIDOWED">{lang === 'ta' ? 'கைம்பெண் / விதவை (Widowed)' : 'Widowed / Destitute'}</option>
                    <option value="DIVORCED">{lang === 'ta' ? 'விவாகரத்து பெற்றவர்' : 'Divorced / Deserted'}</option>
                  </select>
                </div>

              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center space-x-2"
                >
                  <span>{lang === 'ta' ? 'அடுத்த படி' : 'Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Income & Occupation */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'ta' ? 'படி 2: வருமானம் & தொழில் விவரங்கள்' : 'Step 2: Income & Occupation'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ta' ? 'குடும்ப ஆண்டு வருமானம் மற்றும் தொழில் நிலை' : 'Financial details determine eligibility for income-capped welfare schemes'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                {/* Annual Income */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'குடும்ப ஆண்டு வருமானம் (₹)' : 'Family Annual Income (₹)'}
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formData.annualIncome}
                    onChange={(e) => handleChange('annualIncome', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {formatAmount(formData.annualIncome)} {lang === 'ta' ? '/ ஆண்டு' : '/ year'}
                  </span>
                </div>

                {/* Primary Occupation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'தொழில் (Primary Occupation)' : 'Primary Occupation'}
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => {
                      const occ = e.target.value;
                      handleChange('occupation', occ);
                      if (occ === 'Student') handleChange('isStudent', true);
                      if (occ === 'Farmer') handleChange('isFarmer', true);
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Student">{lang === 'ta' ? 'மாணவர் / மாணவி (Student)' : 'Student'}</option>
                    <option value="Farmer">{lang === 'ta' ? 'விவசாயி (Farmer)' : 'Farmer'}</option>
                    <option value="Daily Wage / Unorganized">{lang === 'ta' ? 'தினக்கூலி / அமைப்புசாரா தொழிலாளி' : 'Daily Wage Worker'}</option>
                    <option value="Self-Employed / Business">{lang === 'ta' ? 'சுயதொழில் / வியாபாரம் (MSME)' : 'Self-Employed / MSME'}</option>
                    <option value="Private Employee">{lang === 'ta' ? 'தனியார் துறை பணியாளர்' : 'Private Employee'}</option>
                    <option value="Government Employee">{lang === 'ta' ? 'அரசு ஊழியர்' : 'Government Employee'}</option>
                    <option value="Homemaker">{lang === 'ta' ? 'குடும்பத் தலைவி (Homemaker)' : 'Homemaker'}</option>
                    <option value="Unemployed">{lang === 'ta' ? 'வேலையில்லாதவர்' : 'Unemployed'}</option>
                  </select>
                </div>

                {/* BPL Card Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'வறுமைக் கோட்டிற்கு கீழ் (BPL / PHH Card)' : 'BPL / Priority Ration Card'}
                  </label>
                  <div className="flex space-x-3 pt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="bplStatus"
                        checked={formData.bplStatus === true}
                        onChange={() => handleChange('bplStatus', true)}
                        className="text-emerald-700 focus:ring-emerald-500"
                      />
                      <span>{lang === 'ta' ? 'ஆம் (Yes)' : 'Yes'}</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="bplStatus"
                        checked={formData.bplStatus === false}
                        onChange={() => handleChange('bplStatus', false)}
                        className="text-emerald-700 focus:ring-emerald-500"
                      />
                      <span>{lang === 'ta' ? 'இல்லை (No)' : 'No'}</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Farmer Agricultural Land Details (if Farmer selected) */}
              {(formData.occupation === 'Farmer' || formData.isFarmer) && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-900 mb-1">
                      {lang === 'ta' ? 'விவசாய நிலம் உள்ளதா?' : 'Do you own cultivable land?'}
                    </label>
                    <div className="flex space-x-3 pt-1">
                      <label className="flex items-center space-x-2 text-xs font-semibold text-emerald-950">
                        <input
                          type="checkbox"
                          checked={formData.hasLand}
                          onChange={(e) => handleChange('hasLand', e.target.checked)}
                          className="rounded text-emerald-700"
                        />
                        <span>{lang === 'ta' ? 'ஆம், சொந்த நிலம் உள்ளது' : 'Yes, Landowner'}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-900 mb-1">
                      {lang === 'ta' ? 'நிலத்தின் அளவு (Acres)' : 'Land Area (Acres)'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.landAcres}
                      onChange={(e) => handleChange('landAcres', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm"
                >
                  {lang === 'ta' ? 'முந்தைய படி' : 'Back'}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md flex items-center space-x-2"
                >
                  <span>{lang === 'ta' ? 'அடுத்த படி' : 'Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Education & Social Category */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'ta' ? 'படி 3: கல்வி & சமூகப் பிரிவு' : 'Step 3: Education & Community Criteria'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ta' ? 'அரசு பள்ளி பயின்ற விபரம், முதல் பட்டதாரி, மற்றும் சாதிப் பிரிவு' : 'Scholarships, Moovalur Ramamirtham, & post-matric grants criteria'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                {/* Community / Caste */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'சமூகப் பிரிவு (Community)' : 'Community / Social Category'}
                  </label>
                  <select
                    value={formData.community}
                    onChange={(e) => handleChange('community', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="SC">{lang === 'ta' ? 'SC (பட்டியலினத்தவர்)' : 'SC (Scheduled Caste)'}</option>
                    <option value="ST">{lang === 'ta' ? 'ST (பழங்குடியினர்)' : 'ST (Scheduled Tribe)'}</option>
                    <option value="MBC">{lang === 'ta' ? 'MBC / DNC (மிகவும் பிற்படுத்தப்பட்டோர்)' : 'MBC / DNC'}</option>
                    <option value="BC">{lang === 'ta' ? 'BC (பிற்படுத்தப்பட்டோர்)' : 'BC (Backward Class)'}</option>
                    <option value="BCM">{lang === 'ta' ? 'BCM (பிற்படுத்தப்பட்ட முஸ்லிம்)' : 'BCM (Muslim)'}</option>
                    <option value="OC">{lang === 'ta' ? 'OC / General' : 'OC / General'}</option>
                  </select>
                </div>

                {/* Studied in TN Govt School (Class 6 to 12) - Key for Pudhumai Penn / Tamil Pudhalvan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? '6 முதல் 12 வரை அரசுப் பள்ளியில் பயின்றவரா?' : 'Studied in TN Govt School (6th - 12th)?'}
                  </label>
                  <div className="flex space-x-3 pt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="govtSchoolStudied"
                        checked={formData.govtSchoolStudied === true}
                        onChange={() => handleChange('govtSchoolStudied', true)}
                        className="text-emerald-700"
                      />
                      <span>{lang === 'ta' ? 'ஆம் (Yes)' : 'Yes'}</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="govtSchoolStudied"
                        checked={formData.govtSchoolStudied === false}
                        onChange={() => handleChange('govtSchoolStudied', false)}
                        className="text-emerald-700"
                      />
                      <span>{lang === 'ta' ? 'இல்லை (No)' : 'No'}</span>
                    </label>
                  </div>
                </div>

                {/* First Graduate in Family */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'குடும்பத்தின் முதல் பட்டதாரியா?' : 'First Graduate in Family?'}
                  </label>
                  <div className="flex space-x-3 pt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="isFirstGraduate"
                        checked={formData.isFirstGraduate === true}
                        onChange={() => handleChange('isFirstGraduate', true)}
                        className="text-emerald-700"
                      />
                      <span>{lang === 'ta' ? 'ஆம் (Yes)' : 'Yes'}</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="isFirstGraduate"
                        checked={formData.isFirstGraduate === false}
                        onChange={() => handleChange('isFirstGraduate', false)}
                        className="text-emerald-700"
                      />
                      <span>{lang === 'ta' ? 'இல்லை (No)' : 'No'}</span>
                    </label>
                  </div>
                </div>

                {/* Person with Disability (PwD) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'மாற்றுத்திறனாளியா? (PwD)' : 'Person with Disability (PwD)?'}
                  </label>
                  <div className="flex space-x-3 pt-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="hasDisability"
                        checked={formData.hasDisability === true}
                        onChange={() => handleChange('hasDisability', true)}
                        className="text-emerald-700"
                      />
                      <span>{lang === 'ta' ? 'ஆம் (Yes)' : 'Yes'}</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="hasDisability"
                        checked={formData.hasDisability === false}
                        onChange={() => handleChange('hasDisability', false)}
                        className="text-emerald-700"
                      />
                      <span>{lang === 'ta' ? 'இல்லை (No)' : 'No'}</span>
                    </label>
                  </div>
                </div>

                {/* Education Level */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {lang === 'ta' ? 'கல்வி நிலை (Education Level)' : 'Education Level'}
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => handleChange('educationLevel', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="School">{lang === 'ta' ? 'பள்ளி மாணவர் (School)' : 'School Student'}</option>
                    <option value="Undergraduate">{lang === 'ta' ? 'கல்லூரி இளங்கலை (UG Degree / Diploma)' : 'UG Degree / Diploma'}</option>
                    <option value="Postgraduate">{lang === 'ta' ? 'முதுகலை (PG Degree / Ph.D)' : 'PG Degree / Ph.D'}</option>
                    <option value="Completed">{lang === 'ta' ? 'படிப்பு முடித்தவர்' : 'Completed Studies'}</option>
                  </select>
                </div>

              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm"
                >
                  {lang === 'ta' ? 'முந்தைய படி' : 'Back'}
                </button>
                <button
                  onClick={calculateEligibility}
                  disabled={loading}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white rounded-xl font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-900/20 flex items-center space-x-2 transition-all transform hover:scale-102"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  <span>{loading ? (lang === 'ta' ? 'கணக்கிடுகிறது...' : 'Calculating...') : (lang === 'ta' ? 'என் தகுதியை கணக்கிடு' : 'Calculate Eligible Schemes')}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* STEP 4: RESULTS VIEW */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Results Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🎉</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {lang === 'ta' ? 'வாழ்த்துகள்! நீங்கள் தகுதி பெறும் திட்டங்கள் கண்டறியப்பட்டன' : 'Congratulations! We found your eligible schemes'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  {lang === 'ta' 
                    ? `உங்கள் சுயவிவரத்தின்படி ${results.potentiallyEligible?.length || 0} முக்கிய திட்டங்களுக்கு நீங்கள் தகுதி பெறுகிறீர்கள்.`
                    : `Based on your submitted criteria, you qualify for ${results.potentiallyEligible?.length || 0} government welfare schemes.`}
                </p>
              </div>

              {/* Potential Annual Benefit Box */}
              {totalBenefitAmount > 0 && (
                <div className="bg-emerald-800/80 border border-emerald-400/40 p-4 rounded-2xl text-center md:text-right shrink-0 shadow-lg backdrop-blur-sm">
                  <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
                    {lang === 'ta' ? 'மதிப்பிடப்பட்ட மொத்த பயன்' : 'Est. Potential Benefit Value'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {formatAmount(totalBenefitAmount)}
                  </span>
                  <span className="text-[10px] text-emerald-300 block font-medium mt-0.5">
                    {lang === 'ta' ? '*திட்டத்தின் நிபந்தனைகளுக்கு உட்பட்டது' : '*Subject to department approval'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-emerald-800/60">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'சுயவிவரத்தை மாற்றுக' : 'Modify Criteria'}</span>
              </button>
            </div>
          </div>

          {/* 100% Highly Eligible Schemes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h4 className="text-lg sm:text-xl font-black text-slate-900">
                  🎯 {lang === 'ta' ? 'முழு தகுதி உடையவை (Highly Eligible)' : 'Top Matched Schemes for You'} ({results.potentiallyEligible?.length || 0})
                </h4>
              </div>
            </div>

            {results.potentiallyEligible?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.potentiallyEligible.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onSelect={(s) => setSelectedScheme(s)}
                    onOpenCentres={onNavigateCentres}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
                {lang === 'ta' ? 'நேரடி தகுதி திட்டங்கள் எதுவும் பொருந்தவில்லை. கீழே உள்ள பிற திட்டங்களை ஆராயுங்கள்.' : 'No schemes with 100% direct match found. Check other potential schemes below.'}
              </div>
            )}
          </div>

          {/* Partial Match or Other Schemes */}
          {results.otherSchemes?.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h4 className="text-lg font-extrabold text-slate-800">
                ⚡ {lang === 'ta' ? 'கூடுதல் தகுதி தேவைப்படக்கூடிய பிற திட்டங்கள்' : 'Other Schemes to Explore'} ({results.otherSchemes.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.otherSchemes.slice(0, 6).map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onSelect={(s) => setSelectedScheme(s)}
                    onOpenCentres={onNavigateCentres}
                  />
                ))}
              </div>
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

export default EligibilityMatcher;
