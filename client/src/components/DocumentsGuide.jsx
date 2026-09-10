/**
 * DocumentsGuide Component
 * Step-by-step guidance on obtaining essential government certificates with checklists and portal links
 */

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Search, 
  Download, 
  CheckSquare, 
  Square,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CERTIFICATES_DATA = [
  {
    id: 'income-cert',
    title: 'Income Certificate',
    tamilTitle: 'வருமானச் சான்றிதழ்',
    dept: 'Revenue and Disaster Management Department',
    tamilDept: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
    authority: 'Zonal Deputy Tahsildar / Tahsildar',
    tamilAuthority: 'மண்டல துணை வட்டாட்சியர் / வட்டாட்சியர்',
    deliveryTime: '3 to 7 Working Days',
    fee: '₹60 (e-Seva Centre) / ₹0 (Self Service)',
    validity: '1 Year from date of issuance',
    portalUrl: 'https://www.tnesevai.tn.gov.in',
    description: 'Essential certificate determining family annual income for scholarships, fee concessions, and poverty alleviation welfare schemes.',
    tamilDescription: 'கல்வி உதவித்தொகை, கட்டணச் சலுகை மற்றும் அரசின் நலத்திட்டங்களை பெற குடும்பத்தின் ஆண்டு வருமானத்தை உறுதி செய்யும் சான்றிதழ்.',
    requiredProofs: [
      { id: 'inc-1', name: 'Smart Ration Card / Family Card', tamilName: 'குடும்ப அட்டை (Smart Card)', essential: true },
      { id: 'inc-2', name: 'Aadhaar Card of Applicant & Head of Family', tamilName: 'விண்ணப்பதாரர் மற்றும் குடும்பத் தலைவர் ஆதார் அட்டை', essential: true },
      { id: 'inc-3', name: 'Salary Certificate / Payslip (or VAO Income Certificate)', tamilName: 'மாத சம்பள ரசீது அல்லது VAO வருமான உறுதி கடிதம்', essential: true },
      { id: 'inc-4', name: 'Income Tax Return (ITR) if applicable', tamilName: 'வருமான வரி கணக்கு தாக்கல் (பொருந்துமாயின்)', essential: false },
      { id: 'inc-5', name: 'Passport Size Photograph', tamilName: 'பாஸ்போர்ட் அளவு புகைப்படம்', essential: true }
    ],
    steps: [
      'Login to TNeGA Citizen Portal (tnesevai.tn.gov.in) or visit nearest authorized e-Seva Centre.',
      'Enter CAN (Citizen Access Number) or register a new CAN using Aadhaar and mobile number OTP.',
      'Select Revenue Department -> Income Certificate (REV-101).',
      'Upload scanned Smart Card, Aadhaar, and Salary/VAO verification proof.',
      'Pay application fee of ₹60 and collect application acknowledgment receipt with TN Reference Number.',
      'Village Administrative Officer (VAO) and Revenue Inspector (RI) will verify, followed by Tahsildar digital signature approval.'
    ],
    tamilSteps: [
      'TNeGA இணையதளம் (tnesevai.tn.gov.in) அல்லது அருகிலுள்ள இ-சேவை மையத்தை அணுகவும்.',
      'CAN (Citizen Access Number) பதிவு செய்யவும் அல்லது ஏற்கனவே உள்ள CAN எண்ணை உள்ளிடவும்.',
      'வருவாய்த் துறை -> வருமானச் சான்றிதழ் (REV-101) என்பதைத் தேர்ந்தெடுக்கவும்.',
      'குடும்ப அட்டை, ஆதார் மற்றும் VAO அறிக்கை ஆவணங்களை பதிவேற்றவும்.',
      'விண்ணப்பக் கட்டணம் செலுத்தி ஒப்புதல் ரசீதை (Acknowledgement Slip) பெற்றுக்கொள்ளவும்.',
      'கிராம நிர்வாக அலுவலர் (VAO) மற்றும் வருவாய் ஆய்வாளர் கள ஆய்வுக்குப் பின் வட்டாட்சியரால் டிஜிட்டல் கையொப்பமிட்ட சான்றிதழ் வழங்கப்படும்.'
    ]
  },
  {
    id: 'community-cert',
    title: 'Community Certificate (SC / ST / BC / MBC / DNC)',
    tamilTitle: 'சாதிச் சான்றிதழ் (Community Certificate)',
    dept: 'Revenue Department / Backward Classes & Adi Dravidar Welfare',
    tamilDept: 'வருவாய்த் துறை / பிற்படுத்தப்பட்டோர் & ஆதிதிராவிடர் நலத்துறை',
    authority: 'Tahsildar (SC/BC/MBC) / Sub-Collector/RDO (ST)',
    tamilAuthority: 'வட்டாட்சியர் (SC/BC/MBC) / கோட்டாட்சியர் RDO (ST)',
    deliveryTime: '7 to 15 Working Days',
    fee: '₹60 at e-Seva Centre',
    validity: 'Lifetime (Permanent Validity)',
    portalUrl: 'https://www.tnesevai.tn.gov.in',
    description: 'Permanent official certificate certifying caste category for education reservations, government jobs, and community-specific welfare grants.',
    tamilDescription: 'கல்வி இடஒதுக்கீடு, அரசு வேலைவாய்ப்பு மற்றும் சாதி அடிப்படையிலான திட்டங்களை பெற நிரந்தர சான்றாக விளங்குகிறது.',
    requiredProofs: [
      { id: 'com-1', name: 'Smart Ration Card', tamilName: 'குடும்ப அட்டை (Smart Card)', essential: true },
      { id: 'com-2', name: 'Applicant Aadhaar Card', tamilName: 'விண்ணப்பதாரர் ஆதார் அட்டை', essential: true },
      { id: 'com-3', name: "Father / Mother / Sibling's Community Certificate", tamilName: 'பெற்றோர் அல்லது உடன்பிறந்தோர் சாதிச் சான்றிதழ்', essential: true },
      { id: 'com-4', name: 'School Transfer Certificate (TC) mentioning caste', tamilName: 'சாதி குறிப்பிடப்பட்ட பள்ளி மாற்றுச் சான்றிதழ் (TC)', essential: true },
      { id: 'com-5', name: 'Passport Size Photo', tamilName: 'பாஸ்போர்ட் புகைப்படம்', essential: true }
    ],
    steps: [
      'Visit e-Seva centre or use TNeGA Citizen Login.',
      'Select Revenue Department -> Community Certificate (REV-102).',
      'Provide parent community certificate number for instant digital pedigree verification.',
      'Upload school TC and Smart card scans.',
      'Submit application and track status via SMS.'
    ],
    tamilSteps: [
      'இ-சேவை மையம் அல்லது TNeGA இணையதளம் வழியே விண்ணப்பிக்கவும்.',
      'வருவாய்த் துறை -> சாதிச் சான்றிதழ் (REV-102) என்பதைத் தேர்வு செய்யவும்.',
      'பெற்றோரின் சாதி சான்றிதழ் எண் மற்றும் ஆவணங்களை உள்ளிடவும்.',
      'பள்ளி மாற்றுச் சான்றிதழ் (TC) மற்றும் குடும்ப அட்டையை இணைக்கவும்.',
      'விண்ணப்பித்த பின் SMS மூலம் நிலையை அறிந்து சான்றிதழை பதிவிறக்கலாம்.'
    ]
  },
  {
    id: 'first-graduate',
    title: 'First Graduate Certificate',
    tamilTitle: 'முதல் பட்டதாரி சான்றிதழ்',
    dept: 'Higher Education Department & Revenue Dept',
    tamilDept: 'உயர் கல்வித் துறை & வருவாய்த் துறை',
    authority: 'Tahsildar (Revenue Department)',
    tamilAuthority: 'வட்டாட்சியர் (TNeGA e-Seva)',
    deliveryTime: '7 to 10 Working Days',
    fee: '₹60 at e-Seva',
    validity: 'Single-use for undergraduate admission fee concession',
    portalUrl: 'https://www.tnesevai.tn.gov.in',
    description: 'Enables complete tuition fee waiver in Engineering (TNEA), Medical, Agriculture, and Arts colleges for candidates where no family member has graduated.',
    tamilDescription: 'குடும்பத்தில் எவரும் பட்டப்படிப்பு படிக்காத நிலையில், கல்லூரியில் கல்விக் கட்டண முழு விலக்கு பெற உதவும் சான்றிதழ்.',
    requiredProofs: [
      { id: 'fg-1', name: 'Joint Declaration signed by Parents & Candidate', tamilName: 'பெற்றோர் & மாணவர் கையொப்பமிட்ட கூட்டு உறுதிமொழி', essential: true },
      { id: 'fg-2', name: 'Smart Ration Card', tamilName: 'குடும்ப அட்டை (Smart Card)', essential: true },
      { id: 'fg-3', name: 'Applicant 10th & 12th Marksheets and TC', tamilName: '10 மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ் & TC', essential: true },
      { id: 'fg-4', name: "Parents' & Siblings' School TC / Education Certificates", tamilName: 'பெற்றோர் மற்றும் உடன்பிறந்தோரின் பள்ளி மாற்றுச் சான்றிதழ் (TC)', essential: true },
      { id: 'fg-5', name: 'Aadhaar Card of Applicant & Family', tamilName: 'குடும்ப உறுப்பினர்களின் ஆதார் அட்டைகள்', essential: true }
    ],
    steps: [
      'Download and print Joint Declaration format from TNeGA portal.',
      'Fill and sign declaration by candidate, parents, and siblings.',
      'Apply at e-Seva centre with all family members educational TC copies.',
      'VAO and RI will confirm none in the family holds a degree.',
      'Download digitally signed First Graduate Certificate for college single-window counseling.'
    ],
    tamilSteps: [
      'கூட்டு உறுதிமொழி படிவத்தை (Joint Declaration) பூர்த்தி செய்து குடும்பத்தினர் கையொப்பமிடவும்.',
      'மாணவர், பெற்றோர் மற்றும் உடன்பிறந்தோரின் பள்ளி மாற்றுச் சான்றிதழ்களுடன் இ-சேவை மையத்தை அணுகவும்.',
      'VAO மற்றும் RI கள ஆய்வில் குடும்பத்தில் பட்டதாரி இல்லை என்பதை உறுதி செய்வர்.',
      'வட்டாட்சியர் ஒப்புதலுக்குப் பின் கல்லூரி கலந்தாய்வுக்கு பயன்படுத்த சான்றிதழ் வழங்கப்படும்.'
    ]
  },
  {
    id: 'nativity-cert',
    title: 'Nativity / Residence Certificate',
    tamilTitle: 'இருப்பிடச் சான்றிதழ் / குடியுரிமைச் சான்றிதழ்',
    dept: 'Revenue Department',
    tamilDept: 'வருவாய்த் துறை',
    authority: 'Tahsildar',
    tamilAuthority: 'வட்டாட்சியர்',
    deliveryTime: '5 to 7 Working Days',
    fee: '₹60',
    validity: 'Valid across Tamil Nadu state',
    portalUrl: 'https://www.tnesevai.tn.gov.in',
    description: 'Proves applicant is a continuous resident of Tamil Nadu, crucial for state-level college quota, Pudhumai Penn, and government exams.',
    tamilDescription: 'தமிழ்நாட்டில் தொடர்ந்து வசித்து வருவதற்கான சான்று. தமிழ்நாடு அரசு திட்டங்கள் மற்றும் கல்வி சேர்க்கைக்கு இன்றியமையாதது.',
    requiredProofs: [
      { id: 'nat-1', name: 'Smart Ration Card', tamilName: 'குடும்ப அட்டை', essential: true },
      { id: 'nat-2', name: 'Aadhaar Card or Voter ID', tamilName: 'ஆதார் அட்டை அல்லது வாக்காளர் அட்டை', essential: true },
      { id: 'nat-3', name: 'Birth Certificate / School Study Certificate (5+ years)', tamilName: 'பிறப்பு சான்றிதழ் அல்லது 5 ஆண்டுகள் பள்ளி பயின்ற சான்று', essential: true },
      { id: 'nat-4', name: 'EB Bill or Property Tax Receipt', tamilName: 'மின் கட்டண ரசீது அல்லது சொத்து வரி ரசீது', essential: false }
    ],
    steps: [
      'Apply through e-Seva centre under Revenue Services -> Nativity Certificate (REV-103).',
      'Upload residence and continuous study proof.',
      'Download digitally approved certificate.'
    ],
    tamilSteps: [
      'இ-சேவை மையம் மூலம் இருப்பிடச் சான்றிதழுக்கு விண்ணப்பிக்கவும்.',
      'குடியிருப்பு மற்றும் பள்ளி பயின்ற ஆவணங்களை இணைக்கவும்.',
      'அங்கீகரிக்கப்பட்ட சான்றிதழை பதிவிறக்கம் செய்யலாம்.'
    ]
  }
];

export function DocumentsGuide() {
  const { lang, t } = useLanguage();

  const [selectedDocId, setSelectedDocId] = useState('income-cert');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  const filteredDocs = CERTIFICATES_DATA.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tamilTitle.includes(searchQuery) ||
    doc.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoc = CERTIFICATES_DATA.find(d => d.id === selectedDocId) || CERTIFICATES_DATA[0];

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const readyCount = currentDoc.requiredProofs.filter(p => checkedItems[p.id]).length;
  const totalCount = currentDoc.requiredProofs.length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <FileText className="w-4 h-4" />
            <span>{lang === 'ta' ? 'அரசு ஆவணங்கள் மற்றும் சான்றிதழ் வழிகாட்டி' : 'Essential Documents Guide'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === 'ta' ? 'அரசு சான்றிதழ்கள் பெறுவது எப்படி?' : 'How to Obtain Key Government Certificates'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {lang === 'ta'
              ? 'வருமானம், சாதி, முதல் பட்டதாரி, மற்றும் இருப்பிடச் சான்றிதழ்கள் பெற தேவையான ஆவணங்களின் சரிபார்ப்பு பட்டியல் மற்றும் விண்ணப்ப வழிமுறைகள்'
              : 'Detailed procedures, issuing authorities, fees, and interactive document checklist for TNeGA e-Seva certificates'}
          </p>
        </div>

        {/* e-Seva Portal Direct CTA */}
        <a
          href="https://www.tnesevai.tn.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold shadow-md transition-all self-start md:self-auto shrink-0"
        >
          <span>{lang === 'ta' ? 'TNeGA இ-சேவை தளம்' : 'TNeGA e-Seva Portal'}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Main Layout: Left Sidebar selector + Right Detailed Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Certificate Selector Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ta' ? 'சான்றிதழ் தேடுக...' : 'Search certificates...'}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500 shadow-2xs"
            />
          </div>

          <div className="space-y-2">
            {filteredDocs.map((doc) => {
              const isSelected = doc.id === currentDoc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md transform scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="overflow-hidden">
                    <h3 className="text-xs sm:text-sm font-bold truncate">
                      {lang === 'ta' ? doc.tamilTitle : doc.title}
                    </h3>
                    <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>
                      {lang === 'ta' ? doc.title : doc.tamilTitle}
                    </p>
                    <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      ⏱️ {doc.deliveryTime}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Document Guide & Interactive Checklist */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Certificate Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <span>🏛️ {lang === 'ta' ? currentDoc.tamilDept : currentDoc.dept}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {lang === 'ta' ? currentDoc.tamilTitle : currentDoc.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {lang === 'ta' ? currentDoc.title : currentDoc.tamilTitle}
                </p>
              </div>

              <a
                href={currentDoc.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 transition-all shrink-0 self-start"
              >
                <span>{lang === 'ta' ? 'இணையத்தில் விண்ணப்பிக்க' : 'Apply Online'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {lang === 'ta' ? currentDoc.tamilDescription : currentDoc.description}
            </p>

            {/* Key Information Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">{lang === 'ta' ? 'வழங்கும் அதிகாரி' : 'Issuing Authority'}</span>
                <span className="text-xs font-bold text-slate-800">{lang === 'ta' ? currentDoc.tamilAuthority : currentDoc.authority}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">{lang === 'ta' ? 'வழங்கும் காலம்' : 'Delivery Time'}</span>
                <span className="text-xs font-bold text-slate-800">{currentDoc.deliveryTime}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">{lang === 'ta' ? 'கட்டணம்' : 'Fee'}</span>
                <span className="text-xs font-bold text-slate-800">{currentDoc.fee}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">{lang === 'ta' ? 'செல்லுபடி காலம்' : 'Validity'}</span>
                <span className="text-xs font-bold text-slate-800">{currentDoc.validity}</span>
              </div>
            </div>

            {/* Interactive Proofs Checklist */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{lang === 'ta' ? 'இணைக்க வேண்டிய ஆவணங்களின் பட்டியல்' : 'Required Proof Documents Checklist'}</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {lang === 'ta' ? 'உங்களிடம் உள்ள ஆவணங்களை டிக் செய்து தயார் நிலையை அறியவும்' : 'Check off items as you arrange them'}
                  </p>
                </div>

                <div className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-extrabold">
                  {readyCount} / {totalCount} {lang === 'ta' ? 'தயாராக உள்ளது' : 'Ready'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(readyCount / totalCount) * 100}%` }}
                />
              </div>

              <div className="space-y-2.5">
                {currentDoc.requiredProofs.map((proof) => {
                  const isChecked = !!checkedItems[proof.id];
                  return (
                    <div
                      key={proof.id}
                      onClick={() => toggleCheck(proof.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked 
                          ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs' 
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${
                          isChecked ? 'bg-emerald-700 text-white' : 'border-2 border-slate-300 text-transparent'
                        }`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>

                        <div>
                          <p className={`text-xs font-bold ${isChecked ? 'text-emerald-950' : 'text-slate-800'}`}>
                            {lang === 'ta' ? proof.tamilName : proof.name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {lang === 'ta' ? proof.name : proof.tamilName}
                          </p>
                        </div>
                      </div>

                      {proof.essential && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-50 text-red-700 border border-red-200">
                          {lang === 'ta' ? 'கட்டாயம்' : 'Mandatory'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Steps */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5">
                <span>📝</span>
                <span>{lang === 'ta' ? 'விண்ணப்பிக்கும் படிநிலைகள்' : 'Step-by-Step Application Procedure'}</span>
              </h3>

              <div className="space-y-2.5">
                {(lang === 'ta' ? currentDoc.tamilSteps : currentDoc.steps).map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DocumentsGuide;
