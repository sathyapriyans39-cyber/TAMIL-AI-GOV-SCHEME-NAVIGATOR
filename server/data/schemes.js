/**
 * Comprehensive Government Scheme Database
 * Covers Tamil Nadu State Government (TAMIL_NADU) and Central Government of India (CENTRAL)
 * Contains full eligibility criteria, required documents checklists, and official portals.
 */

export const SCHEMES = [
  // ==========================================
  // TAMIL NADU STATE GOVERNMENT SCHEMES
  // ==========================================
  {
    id: "tn-pudhumai-penn",
    schemeName: "Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn Scheme)",
    tamilName: "மூவலூர் ராமாமிர்தம் அம்மையார் உயர் கல்வி உறுதித் திட்டம் (புதுமைப் பெண் திட்டம்)",
    governmentLevel: "TAMIL_NADU",
    department: "Social Welfare and Women Empowerment Department",
    tamilDepartment: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை",
    category: "Education",
    tamilCategory: "கல்வி",
    description: "Financial assistance of ₹1,000 per month directly deposited into the bank accounts of female students pursuing undergraduate degrees, diplomas, ITI, or professional courses who studied in Tamil Nadu Government schools from Classes 6 to 12.",
    tamilDescription: "6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளிகளில் பயின்று உயர்கல்வி (பட்டப்படிப்பு, பட்டயப்படிப்பு, ஐ.டி.ஐ, தொழில்முறை படிப்பு) பயிலும் மாணவிகளுக்கு மாதம் தோறும் ₹1,000 வங்கி கணக்கில் நேரடியாக செலுத்தப்படுகிறது.",
    benefits: "₹1,000 per month (₹12,000 per year) till completion of the undergraduate degree/diploma.",
    tamilBenefits: "பட்டப்படிப்பு / டிப்ளமோ முடியும் வரை மாதம் ₹1,000 (ஆண்டுக்கு ₹12,000) நிதியுதவி.",
    benefitAmount: 12000,
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 26,
      gender: "FEMALE",
      state: "Tamil Nadu",
      studentOnly: true,
      educationLevels: ["Undergraduate", "Diploma", "ITI", "Professional Degree", "Higher Education"],
      govtSchoolStudiedRequired: true, // Classes 6th to 12th in TN govt schools
      maxAnnualIncome: null // No income limit for this scheme
    },
    documentsRequired: [
      {
        id: "doc-aadhaar",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI Portal / e-Seva Centre",
        description: "Aadhaar linked with student active mobile number"
      },
      {
        id: "doc-school-tc",
        name: "Govt School 6th to 12th Study Certificate / EMIS Number",
        tamilName: "6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளியில் படித்ததற்கான சான்றிதழ் / EMIS எண்",
        required: true,
        source: "Headmaster of respective School / TN EMIS Portal",
        description: "Verification of continuous study from 6th to 12th standard in Tamil Nadu Govt schools"
      },
      {
        id: "doc-college-id",
        name: "College Bonafide Certificate & Admission Slip",
        tamilName: "கல்லூரி போனாஃபைட் சான்றிதழ் & சேர்க்கை ரசீது",
        required: true,
        source: "College / Polytechnic / University Principal",
        description: "Proof of current year enrollment in Higher Education Institution"
      },
      {
        id: "doc-bank-passbook",
        name: "Student Bank Account Passbook Copy (DBT enabled)",
        tamilName: "மாணவி பெயரிலான வங்கி கணக்குப் புத்தகம் நகல் (DBT வசதியுடன்)",
        required: true,
        source: "Bank Branch / Post Office Payment Bank",
        description: "Student's single bank account linked with Aadhaar for DBT transfer"
      },
      {
        id: "doc-10th-12th-marksheet",
        name: "10th & 12th Standard Marksheet",
        tamilName: "10 மற்றும் 12-ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்",
        required: true,
        source: "Directorate of Govt Examinations (DGE TN)",
        description: "Standard academic mark sheets"
      }
    ],
    applicationProcess: [
      "Obtain EMIS student ID and Bonafide certificate from your college.",
      "College authorities or student can register on the Pudhumai Penn portal (pudhumaipenn.tn.gov.in).",
      "Upload 6-12th school study proof, Aadhaar, and Bank Passbook.",
      "Verification is conducted by District Social Welfare Officer (DSWO).",
      "Amount ₹1,000 is directly credited via DBT to the bank account every month."
    ],
    tamilApplicationProcess: [
      "உங்கள் கல்லூரியிலிருந்து EMIS மாணவர் எண் மற்றும் போனாஃபைட் சான்றிதழைப் பெறவும்.",
      "கல்லூரி வழியாக அல்லது அதிகாரப்பூர்வ வலைத்தளத்தில் (pudhumaipenn.tn.gov.in) பதிவு செய்யவும்.",
      "6-12 அரசு பள்ளி கல்வி சான்று, ஆதார் மற்றும் வங்கி புத்தகத்தை பதிவேற்றவும்.",
      "மாவட்ட சமூக நல அலுவலர் மூலம் சரிபார்க்கப்படும்.",
      "மாதாந்திர உதவித்தொகை ₹1,000 நேரடியாக உங்கள் வங்கி கணக்கிற்கு அனுப்பப்படும்."
    ],
    applicationWebsite: "https://www.pudhumaipenn.tn.gov.in",
    helpline: "044-25619222 / 14417",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "College Helpdesk / e-Seva Centre / District Social Welfare Office",
    lastUpdated: "2026-06-15",
    sourceUrl: "https://www.tn.gov.in/scheme/data_view/68541"
  },
  {
    id: "tn-tamil-puthalvan",
    schemeName: "Tamil Puthalvan Scheme for Male Students",
    tamilName: "தமிழ்ப் புதல்வன் திட்டம் (மாணவர்களுக்கான உயர்கல்வி உதவி)",
    governmentLevel: "TAMIL_NADU",
    department: "Social Welfare and Women Empowerment / Higher Education Department",
    tamilDepartment: "சமூக நலம் மற்றும் உயர்கல்வித் துறை",
    category: "Education",
    tamilCategory: "கல்வி",
    description: "Financial assistance of ₹1,000 per month for male students from Tamil Nadu Government schools (Classes 6 to 12) pursuing higher education in colleges, polytechnics, and universities.",
    tamilDescription: "அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை படித்து கல்லூரி, பாலிடெக்னிக், ஐடிஐ மற்றும் தொழிற்கல்வி பயிலும் மாணவர்களுக்கு மாதம் ₹1,000 உதவித்தொகை வழங்கப்படுகிறது.",
    benefits: "₹1,000 per month (₹12,000 per year) till completion of the higher education course.",
    tamilBenefits: "படிப்பு முடியும் வரை மாதம் ₹1,000 (ஆண்டுக்கு ₹12,000) நிதியுதவி.",
    benefitAmount: 12000,
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 26,
      gender: "MALE",
      state: "Tamil Nadu",
      studentOnly: true,
      educationLevels: ["Undergraduate", "Diploma", "ITI", "Professional Degree", "Higher Education"],
      govtSchoolStudiedRequired: true,
      maxAnnualIncome: null
    },
    documentsRequired: [
      {
        id: "doc-aadhaar",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI Portal / e-Seva Centre",
        description: "Aadhaar number of the male student"
      },
      {
        id: "doc-school-proof",
        name: "6th to 12th Govt School Study Verification (EMIS)",
        tamilName: "6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளியில் படித்ததற்கான சான்று (EMIS)",
        required: true,
        source: "TN School Education Department",
        description: "EMIS registration proof of studying in TN Govt school"
      },
      {
        id: "doc-college-bonafide",
        name: "College Bonafide Certificate",
        tamilName: "கல்லூரி சேர்க்கை போனாஃபைட் சான்றிதழ்",
        required: true,
        source: "College Administration",
        description: "Current active college enrollment proof"
      },
      {
        id: "doc-bank-dbt",
        name: "Bank Passbook with Aadhaar Seeding",
        tamilName: "வங்கி கணக்கு புத்தகம் (ஆதார் இணைக்கப்பட்டது)",
        required: true,
        source: "Bank Branch",
        description: "Active savings bank account"
      }
    ],
    applicationProcess: [
      "Eligible boys studying in degree/diploma/ITI submit EMIS number and details at their college nodal office.",
      "The institution validates and submits to the Tamil Puthalvan portal.",
      "DBT payment of ₹1,000 is processed directly each month."
    ],
    tamilApplicationProcess: [
      "உயர்கல்வி பயிலும் மாணவர்கள் தங்கள் கல்லூரி நோடல் அதிகாரியிடம் EMIS எண்ணை சமர்ப்பிக்க வேண்டும்.",
      "கல்லூரி நிர்வாகம் சரிபார்த்து தமிழ்ப் புதல்வன் இணையதளத்தில் பதிவேற்றும்.",
      "ஒவ்வொரு மாதமும் ₹1,000 மாணவரின் வங்கிக் கணக்கில் வரவு வைக்கப்படும்."
    ],
    applicationWebsite: "https://tamilputhalvan.tn.gov.in",
    helpline: "1800-425-1088",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "College Admin Office / District Social Welfare Office",
    lastUpdated: "2026-07-10",
    sourceUrl: "https://www.tn.gov.in"
  },
  {
    id: "tn-kalaignar-magalir-urimai",
    schemeName: "Kalaignar Magalir Urimai Thittam (Women Basic Income Scheme)",
    tamilName: "கலைஞர் மகளிர் உரிமைத் திட்டம்",
    governmentLevel: "TAMIL_NADU",
    department: "Revenue and Disaster Management / Special Programme Implementation",
    tamilDepartment: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    category: "Women Welfare",
    tamilCategory: "மகளிர் நலம்",
    description: "Monthly basic income grant of ₹1,000 provided to eligible female heads of families across Tamil Nadu to recognize unpaid domestic labor and improve livelihood security.",
    tamilDescription: "குடும்பத் தலைவிகளின் உழைப்பை அங்கீகரிக்கும் வகையில், தகுதி வாய்ந்த குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 உரிமைத்தொகை வழங்கப்படும் திட்டம்.",
    benefits: "₹1,000 monthly cash grant directly credited to the bank account (₹12,000 per year).",
    tamilBenefits: "மாதம் ₹1,000 (வருடத்திற்கு ₹12,000) நேரடியாக வங்கி கணக்கில் செலுத்தப்படுகிறது.",
    benefitAmount: 12000,
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 85,
      gender: "FEMALE",
      state: "Tamil Nadu",
      studentOnly: false,
      maxAnnualIncome: 250000, // Annual family income under 2.5 Lakhs
      landOwnershipMaxAcres: 5, // Wetland < 2.5 acres or Dry land < 5 acres
      annualElectricityUnitsMax: 3600 // Electricity usage < 3600 units/year
    },
    documentsRequired: [
      {
        id: "doc-smart-ration",
        name: "Smart Family Ration Card",
        tamilName: "ஸ்மார்ட் குடும்ப அட்டை (ரேஷன் கார்டு)",
        required: true,
        source: "TN Civil Supplies Portal (tnpds.gov.in) / Taluk Supply Office",
        description: "Must be listed as woman head of family"
      },
      {
        id: "doc-aadhaar-woman",
        name: "Aadhaar Card of the Woman Applicant",
        tamilName: "விண்ணப்பதாரரின் ஆதார் அட்டை",
        required: true,
        source: "UIDAI / e-Seva Centre",
        description: "Linked with biometric or mobile OTP"
      },
      {
        id: "doc-bank-passbook-woman",
        name: "Aadhaar Linked Bank Account Passbook",
        tamilName: "ஆதார் இணைக்கப்பட்ட வங்கி பாஸ்புக்",
        required: true,
        source: "Bank Branch",
        description: "Single account in applicant's name"
      },
      {
        id: "doc-eb-bill",
        name: "Electricity Consumer Connection Number / EB Bill",
        tamilName: "மின் இணைப்பு நுகர்வோர் எண் / ரசீது",
        required: true,
        source: "TANGEDCO",
        description: "To verify annual domestic power consumption"
      }
    ],
    applicationProcess: [
      "Special camps organized at local ration shops / ward offices across Tamil Nadu.",
      "Fill application token and present Smart Ration Card, Aadhaar, and Bank Passbook.",
      "Biometric validation and field verification done by Revenue Staff / Village Administrative Officer (VAO).",
      "SMS notification sent on approval, with ₹1,000 deposited on the 15th of every month."
    ],
    tamilApplicationProcess: [
      "ரேஷன் கடை அல்லது வார்டு பகுதிகளில் நடைபெறும் சிறப்பு முகாம்களில் டோக்கனுடன் அணுகவும்.",
      "ஸ்மார்ட் ரேஷன் கார்டு, ஆதார் மற்றும் வங்கி பாஸ்புக் சமர்ப்பிக்கவும்.",
      "பயோமெட்ரிக் சரிபார்ப்பு மற்றும் வருவாய்த் துறை கள ஆய்வு நடைபெறும்.",
      "ஒப்புதல் பெற்ற பின் ஒவ்வொரு மாதமும் 15-ஆம் தேதி ₹1,000 வங்கிக் கணக்கில் வரவு வைக்கப்படும்."
    ],
    applicationWebsite: "https://kmut.tn.gov.in",
    helpline: "044-25619222 / 1100",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "Local Fair Price Shop (Ration Shop) Camps / Taluk Office / e-Seva Centre",
    lastUpdated: "2026-06-20",
    sourceUrl: "https://kmut.tn.gov.in"
  },
  {
    id: "tn-cmchis-health-insurance",
    schemeName: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
    tamilName: "முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் (CMCHIS)",
    governmentLevel: "TAMIL_NADU",
    department: "Health and Family Welfare Department",
    tamilDepartment: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    category: "Health",
    tamilCategory: "மருத்துவம் & சுகாதாரம்",
    description: "Cashless health insurance coverage up to ₹5,00,000 per family per year for 1,090 surgical procedures and treatments across impaneled government and private hospitals.",
    tamilDescription: "குடும்பத்திற்கு ஆண்டுக்கு ₹5,00,000 வரை கட்டணமில்லா பணமில்லா உயர் மருத்துவ சிகிச்சைகள் மற்றும் அறுவை சிகிச்சைகள் வழங்கும் முழு மருத்துவ காப்பீட்டு திட்டம்.",
    benefits: "Up to ₹5,00,000 cashless medical coverage per year for hospitalizations and specialized surgeries.",
    tamilBenefits: "ஆண்டுக்கு ₹5,00,000 வரை கட்டணமில்லா அறுவை சிகிச்சை மற்றும் மருத்துவ சிகிச்சை காப்பீடு.",
    benefitAmount: 500000,
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      gender: "ALL",
      state: "Tamil Nadu",
      maxAnnualIncome: 120000 // Annual family income <= 1.2 Lakhs (or Smart Card holders)
    },
    documentsRequired: [
      {
        id: "doc-smart-card",
        name: "Smart Ration Card (Family Card)",
        tamilName: "ஸ்மார்ட் குடும்ப அட்டை",
        required: true,
        source: "Civil Supplies & Consumer Protection Dept",
        description: "Original Smart Card"
      },
      {
        id: "doc-income-cert",
        name: "Income Certificate from VAO / Tahsildar (< ₹1,20,000)",
        tamilName: "வருமானச் சான்றிதழ் (ஆண்டு வருமானம் ₹1,20,000-க்குள்)",
        required: true,
        source: "e-Seva Centre / Revenue Department (TNeGA)",
        description: "Income certificate issued within 6 months"
      },
      {
        id: "doc-family-aadhaar",
        name: "Aadhaar Cards of All Family Members",
        tamilName: "குடும்ப உறுப்பினர்கள் அனைவரின் ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Aadhaar photocopies of all beneficiaries"
      }
    ],
    applicationProcess: [
      "Visit District Collectorate CMCHIS Kiosk or Government Medical College Hospital with Smart Ration Card, Aadhaar, and Income Certificate.",
      "Family photo and biometric fingerprint enrollment conducted on spot.",
      "Smart CMCHIS plastic card issued immediately.",
      "Present card at any impaneled hospital for instant cashless admission."
    ],
    tamilApplicationProcess: [
      "மாவட்ட ஆட்சியர் அலுவலக CMCHIS மையம் அல்லது அரசு மருத்துவக் கல்லூரி மருத்துவமனைக்கு ரேஷன் கார்டு, வருமான சான்று மற்றும் ஆதாருடன் செல்லவும்.",
      "குடும்ப உறுப்பினர்களின் புகைப்படம் மற்றும் பயோமெட்ரிக் பதிவு செய்யப்படும்.",
      "உடனடியாக CMCHIS ஸ்மார்ட் கார்டு வழங்கப்படும்.",
      "அங்கீகரிக்கப்பட்ட தனியார் அல்லது அரசு மருத்துவமனைகளில் காப்பீட்டு கார்டை காட்டி சிகிச்சை பெறலாம்."
    ],
    applicationWebsite: "https://www.cmchistn.com",
    helpline: "1800-425-3993 (24x7 Toll Free)",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "District Collector Office CMCHIS Counter / Govt Headquarter Hospitals",
    lastUpdated: "2026-05-18",
    sourceUrl: "https://www.cmchistn.com"
  },
  {
    id: "tn-naan-mudhalvan",
    schemeName: "Naan Mudhalvan Skill Development & Career Guidance Scheme",
    tamilName: "நான் முதல்வன் திட்டம் (இளைஞர் திறன் மேம்பாட்டு திட்டம்)",
    governmentLevel: "TAMIL_NADU",
    department: "Tamil Nadu Skill Development Corporation (TNSDC)",
    tamilDepartment: "தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம்",
    category: "Skill Development",
    tamilCategory: "திறன் மேம்பாடு & வேலைவாய்ப்பு",
    description: "Flagship skill development program providing industry-aligned tech skills, AI/Coding certifications, spoken English, UPSC/TNPSC civil service competitive exam stipends (₹7,500/mo), and campus placement drives for college students and graduates in Tamil Nadu.",
    tamilDescription: "கல்லூரி மாணவர்கள் மற்றும் பட்டதாரிகளுக்கு நவீன தொழில் நுட்ப திறன்கள், AI, கோடிங், போட்டித் தேர்வு பயிற்சிகள் மற்றும் மாதம் ₹7,500 ஊக்கத்தொகையுடன் வேலைவாய்ப்பு வழிகாட்டுதல் வழங்கும் திட்டம்.",
    benefits: "Free industry certifications, career mentorship, job placement assistance, plus ₹7,500/month stipend for civil service aspirants clearing prelims.",
    tamilBenefits: "இலவச தொழில்நுட்ப பயிற்சி, முன்னணி நிறுவனங்களில் வேலைவாய்ப்பு, TNPSC/UPSC முதன்மை தேர்வு எழுதுவோருக்கு மாதம் ₹7,500 ஊக்கத்தொகை.",
    benefitAmount: 7500,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 32,
      gender: "ALL",
      state: "Tamil Nadu",
      educationLevels: ["Undergraduate", "Postgraduate", "Diploma", "Engineering", "Arts & Science", "Graduate"]
    },
    documentsRequired: [
      {
        id: "doc-college-id",
        name: "College Student ID / Degree Certificate",
        tamilName: "கல்லூரி அடையாள அட்டை / பட்டப் படிப்பு சான்றிதழ்",
        required: true,
        source: "Educational Institution",
        description: "Student ID card or provisional certificate"
      },
      {
        id: "doc-aadhaar",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Identification"
      },
      {
        id: "doc-resume",
        name: "Updated Resume & Academic Marksheets",
        tamilName: "சுயவிவர குறிப்பு (Resume) & மதிப்பெண் சான்றிதழ்",
        required: true,
        source: "Applicant",
        description: "For skill mapping and placement matching"
      }
    ],
    applicationProcess: [
      "Register online at naanmudhalvan.tn.gov.in using Aadhaar and college enrollment number.",
      "Select desired skill domain (Data Science, Cloud, Robotics, Logistics, Banking, or Competitive Exam Prep).",
      "Attend blended interactive virtual and in-campus masterclasses.",
      "Participate in Naan Mudhalvan mega placement job fairs."
    ],
    tamilApplicationProcess: [
      "naanmudhalvan.tn.gov.in போர்ட்டலில் உங்கள் விவரங்களுடன் பதிவு செய்யவும்.",
      "விருப்பமான திறன் பாடப்பிரிவை (Artificial Intelligence, Data Science, Banking போன்றவை) தேர்ந்தெடுக்கவும்.",
      "கல்லூரி அல்லது ஆன்லைன் பயிற்சிகளில் பங்கேற்று சான்றிதழ் பெறவும்.",
      "நான் முதல்வன் நடத்தும் வேலைவாய்ப்பு முகாம்களில் நேர்காணலில் பங்கேற்கவும்."
    ],
    applicationWebsite: "https://www.naanmudhalvan.tn.gov.in",
    helpline: "044-22501006",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "College Placement Cell / District Employment & Career Guidance Centre",
    lastUpdated: "2026-06-30",
    sourceUrl: "https://www.naanmudhalvan.tn.gov.in"
  },
  {
    id: "tn-free-bus-travel-women",
    schemeName: "Vidiyal Payanam - Free Bus Travel Scheme for Women",
    tamilName: "விடியல் பயணம் - மகளிருக்கான கட்டணமில்லா சாதாரண கட்டண நகரப் பேருந்து பயணம்",
    governmentLevel: "TAMIL_NADU",
    department: "Transport Department, Government of Tamil Nadu",
    tamilDepartment: "போக்குவரத்துத் துறை, தமிழ்நாடு அரசு",
    category: "Women Welfare",
    tamilCategory: "மகளிர் நலம் & போக்குவரத்து",
    description: "Free travel for all women, trans persons, and persons with disabilities in ordinary state-operated town buses (pink buses) across Tamil Nadu.",
    tamilDescription: "தமிழ்நாடு முழுவதும் உள்ள அனைத்து அரசு சாதாரண கட்டண நகரப் பேருந்துகளில் (பிங்க் நிற பேருந்துகள்) பெண்கள், திருநங்கைகள் மற்றும் மாற்றுத்திறனாளிகள் கட்டணமின்றி இலவசமாக பயணிக்கலாம்.",
    benefits: "100% free daily commute on all ordinary fare city/town government buses.",
    tamilBenefits: "நகர அரசு பேருந்துகளில் 100% கட்டணமில்லா இலவச பேருந்து பயணம் (மாதம் ₹1,000 முதல் ₹1,500 வரை சேமிப்பு).",
    benefitAmount: 1500,
    eligibilityCriteria: {
      minAge: 5,
      maxAge: 100,
      gender: "FEMALE", // Also applicable to Transgender and Differently Abled
      state: "Tamil Nadu",
      studentOnly: false
    },
    documentsRequired: [
      {
        id: "doc-none-general",
        name: "No Document Required for General Female Passengers (Just Board)",
        tamilName: "பெண்களுக்கு ஆவணங்கள் தேவையில்லை - பயணச் சீட்டு இலவசமாக வழங்கப்படும்",
        required: false,
        source: "Conductor on Bus",
        description: "Zero fare pink ticket is issued directly by bus conductor"
      },
      {
        id: "doc-disability-card",
        name: "Disability Identity Card (for Differently Abled Passengers)",
        tamilName: "மாற்றுத்திறனாளி அடையாள அட்டை (மாற்றுத்திறனாளிகளுக்கு மட்டும்)",
        required: false,
        source: "District Differently Abled Welfare Office",
        description: "Only if claiming companion pass"
      }
    ],
    applicationProcess: [
      "Board any Tamil Nadu State Transport Corporation (TNSTC/MTC) Ordinary Fare Town Bus (identifiable with Pink color / Board).",
      "The bus conductor issues a zero-fare ticket upon request without any application fee."
    ],
    tamilApplicationProcess: [
      "பிங்க் நிற பலகை கொண்ட சாதாரண கட்டண அரசு நகரப் பேருந்துகளில் ஏறி நடத்துநரிடம் பூஜ்ஜிய கட்டண பயணச்சீட்டை பெற்றுக் கொள்ளலாம்.",
      "முன் பதிவு எதுவும் தேவையில்லை."
    ],
    applicationWebsite: "https://transport.tn.gov.in",
    helpline: "1800-599-1500",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "Direct access on all TNSTC / MTC Town Buses",
    lastUpdated: "2026-05-01",
    sourceUrl: "https://transport.tn.gov.in"
  },
  {
    id: "tn-uzhavar-pathukappu",
    schemeName: "Chief Minister's Uzhavar Pathukappu Thittam (Farmers Social Security)",
    tamilName: "முதலமைச்சரின் உழவர் பாதுகாப்புத் திட்டம்",
    governmentLevel: "TAMIL_NADU",
    department: "Revenue and Disaster Management Department",
    tamilDepartment: "வருவாய்த் துறை",
    category: "Farmer Schemes",
    tamilCategory: "விவசாயிகள் நலம்",
    description: "Comprehensive social security scheme offering pension (₹1,000/mo), accident compensation (₹1,00,000), marriage assistance (up to ₹20,000), education assistance for farmer children, and natural death funeral assistance.",
    tamilDescription: "விவசாயிகள் மற்றும் விவசாயத் தொழிலாளர்களுக்கு முதியோர் ஓய்வூதியம் (மாதம் ₹1,000), விபத்து நிவாரணம் (₹1,00,000), திருமணம் மற்றும் கல்வி உதவித்தொகை வழங்கும் பாதுகாப்பு திட்டம்.",
    benefits: "₹1,000/month pension for elderly farmers; ₹1,00,000 accidental death relief; educational grants up to ₹50,000 for children.",
    tamilBenefits: "முதியோர் விவசாயிகளுக்கு மாதம் ₹1,000 ஓய்வூதியம், விபத்து மரண நிவாரணம் ₹1,00,000, விவசாய குழந்தைகளின் கல்விக்கு உதவித்தொகை.",
    benefitAmount: 100000,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: "ALL",
      state: "Tamil Nadu",
      farmerOnly: true,
      landOwnershipMaxAcres: 5 // Small/Marginal farmers or landless agricultural laborers
    },
    documentsRequired: [
      {
        id: "doc-smart-card",
        name: "Smart Ration Card",
        tamilName: "ஸ்மார்ட் குடும்ப அட்டை",
        required: true,
        source: "Civil Supplies",
        description: "Ration card proof"
      },
      {
        id: "doc-patta-chitta",
        name: "Land Patta / Chitta or Agricultural Laborer Certificate from VAO",
        tamilName: "பட்டா / சிட்டா நகல் அல்லது கிராம நிர்வாக அலுவலர் (VAO) விவசாய தொழிலாளர் சான்று",
        required: true,
        source: "Any TN e-Seva Centre / Anyror e-Services portal (eservices.tn.gov.in)",
        description: "Proof of land holding or agricultural tenancy"
      },
      {
        id: "doc-aadhaar",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Identity verification"
      },
      {
        id: "doc-bank-passbook",
        name: "Bank Account Passbook",
        tamilName: "வங்கி பாஸ்புக் நகல்",
        required: true,
        source: "Bank",
        description: "For direct benefit transfers"
      }
    ],
    applicationProcess: [
      "Submit application to the Special Tahsildar (Uzhavar Pathukappu Thittam) in the local Taluk office or through e-Seva Centre.",
      "VAO conducts field verification of land status or agriculture occupation.",
      "Uzhavar Pathukappu Scheme Membership Card is issued with assigned registration number."
    ],
    tamilApplicationProcess: [
      "வட்டாட்சியர் அலுவலக உழவர் பாதுகாப்பு பிரிவு அல்லது இ-சேவை மையத்தில் விண்ணப்பத்தை சமர்ப்பிக்கவும்.",
      "கிராம நிர்வாக அலுவலர் (VAO) கள ஆய்வு செய்வார்.",
      "உழவர் பாதுகாப்பு திட்ட உறுப்பினர் அட்டை வழங்கப்படும்."
    ],
    applicationWebsite: "https://revenue.tn.gov.in",
    helpline: "044-28592230",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "Taluk Office - Special Tahsildar (UPT) / e-Seva Centre",
    lastUpdated: "2026-04-12",
    sourceUrl: "https://revenue.tn.gov.in"
  },
  {
    id: "tn-post-matric-scholarship",
    schemeName: "Post-Matric Scholarship for SC/ST/SCC/MBC/BC Students",
    tamilName: "பிற்படுத்தப்பட்டோர், மிகவும் பிற்படுத்தப்பட்டோர் மற்றும் ஆதிதிராவிடர் போஸ்ட்-மெட்ரிக் கல்வி உதவித்தொகை",
    governmentLevel: "TAMIL_NADU",
    department: "Adi Dravidar and Tribal Welfare / BC, MBC and Minorities Welfare Department",
    tamilDepartment: "ஆதிதிராவிடர் & பிற்படுத்தப்பட்டோர் நலம்",
    category: "Scholarships",
    tamilCategory: "கல்வி உதவித்தொகை",
    description: "100% compulsory tuition fee waiver, exam fees reimbursement, and monthly maintenance allowance for SC, ST, SCC, MBC, DNC, and BC students studying in polytechnics, colleges, medical, engineering, and PG institutions.",
    tamilDescription: "கல்லூரி, பாலிடெக்னிக், மருத்துவம் மற்றும் பொறியியல் பயிலும் SC/ST/SCC/MBC/BC மாணவர்களுக்கு முழு கல்விக் கட்டண தள்ளுபடி மற்றும் மாதாந்திர பராமரிப்பு உதவித்தொகை வழங்கும் திட்டம்.",
    benefits: "Full tuition fee reimbursement + Maintenance allowance ₹4,000 to ₹15,000 per year.",
    tamilBenefits: "முழு கல்விக் கட்டண விலக்கு + ஆண்டுக்கு ₹4,000 முதல் ₹15,000 வரை பராமரிப்பு உதவித்தொகை.",
    benefitAmount: 65000,
    eligibilityCriteria: {
      minAge: 16,
      maxAge: 35,
      gender: "ALL",
      state: "Tamil Nadu",
      studentOnly: true,
      communityList: ["SC", "ST", "SCC", "MBC", "BC", "DNC", "Minority"],
      maxAnnualIncome: 250000 // SC/ST: ₹2.5 Lakhs, BC/MBC: ₹2.5 Lakhs
    },
    documentsRequired: [
      {
        id: "doc-community-cert",
        name: "Permanent Community Certificate (Digitally Signed with QR code)",
        tamilName: "சாதிச் சான்றிதழ் (e-Seva எண் மற்றும் QR குறியீட்டுடன்)",
        required: true,
        source: "TNeGA e-Seva Centre / Revenue Dept",
        description: "Official community certificate from Zonal Deputy Tahsildar"
      },
      {
        id: "doc-income-cert",
        name: "Annual Income Certificate (Current Financial Year)",
        tamilName: "வருமானச் சான்றிதழ் (நடப்பு ஆண்டு)",
        required: true,
        source: "e-Seva Centre",
        description: "Income certificate stating family income below ₹2.5 Lakhs"
      },
      {
        id: "doc-attendance-bonafide",
        name: "College Fee Structure & Attendance Bonafide",
        tamilName: "கல்லூரி கட்டண விவரம் மற்றும் சேர்க்கை சான்றிதழ்",
        required: true,
        source: "College Financial Section",
        description: "Tuition fee break-up slip"
      },
      {
        id: "doc-aadhaar-student",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Student identity proof"
      },
      {
        id: "doc-bank-account",
        name: "Bank Passbook Copy",
        tamilName: "வங்கி கணக்கு புத்தகம்",
        required: true,
        source: "Nationalized Bank Branch",
        description: "Active savings bank account"
      }
    ],
    applicationProcess: [
      "Submit digital applications through the Tamil Nadu Post-Matric Scholarship portal via your college scholarship nodal officer.",
      "Upload verified digital Community, Income, Aadhaar, and Marks certificates.",
      "College verifies and forwards to District Welfare Officer (DWO).",
      "Funds credited directly to student bank and institution fee account."
    ],
    tamilApplicationProcess: [
      "கல்லூரி உதவித்தொகை அலுவலகம் மூலம் தமிழ்நாடு போஸ்ட் மெட்ரிக் போர்ட்டலில் விண்ணப்பிக்கவும்.",
      "சாதி சான்று, வருமான சான்று, ஆதார் மற்றும் கல்லூரி கட்டண ரசீதை பதிவேற்றவும்.",
      "மாவட்ட ஆதிதிராவிடர் / பிற்படுத்தப்பட்டோர் நல அலுவலரால் நிதி விடுவிக்கப்படும்."
    ],
    applicationWebsite: "https://tnescholarship.tn.gov.in",
    helpline: "044-28594950",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "College Scholarship Section / District Adi Dravidar & Tribal Welfare Office",
    lastUpdated: "2026-06-01",
    sourceUrl: "https://tnescholarship.tn.gov.in"
  },
  {
    id: "tn-first-graduate-concession",
    schemeName: "Tamil Nadu First Graduate Tuition Fee Concession",
    tamilName: "தமிழ்நாடு முதல் தலைமுறை பட்டதாரி கல்விக் கட்டண சலுகை",
    governmentLevel: "TAMIL_NADU",
    department: "Higher Education & Directorate of Technical Education (DOTE)",
    tamilDepartment: "உயர்கல்வித் துறை",
    category: "Scholarships",
    tamilCategory: "கல்வி உதவித்தொகை",
    description: "Tuition fee waiver up to ₹25,000 - ₹50,000 per year for students who are the first person in their entire family (parents and siblings) to join a professional degree course (Engineering, Medical, Agriculture, Law).",
    tamilDescription: "குடும்பத்தில் முதல் பட்டதாரியாக தொழில்முறை படிப்புகளில் (பொறியியல், மருத்துவம், விவசாயம், சட்டம்) சேரும் மாணவ, மாணவிகளுக்கு முழு கல்விக் கட்டண சலுகை வழங்கும் திட்டம்.",
    benefits: "Full tuition fee waiver throughout the four/five-year professional degree program (Approx ₹20,000 - ₹50,000/yr).",
    tamilBenefits: "படிப்பு முடியும் வரை ஆண்டுக்கு ₹20,000 முதல் ₹50,000 வரை கல்விக் கட்டண தள்ளுபடி.",
    benefitAmount: 40000,
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 25,
      gender: "ALL",
      state: "Tamil Nadu",
      studentOnly: true,
      firstGraduateInFamily: true,
      educationLevels: ["Engineering", "Medical", "Law", "Agriculture", "Professional Degree"]
    },
    documentsRequired: [
      {
        id: "doc-first-grad-cert",
        name: "First Graduate Certificate issued by Tahsildar (TNeGA)",
        tamilName: "முதல் பட்டதாரி சான்றிதழ் (வட்டாட்சியரால் வழங்கப்பட்டது)",
        required: true,
        source: "e-Seva Centre (eSevai / TNeGA)",
        description: "Certificate certifying no graduate in family with joint declaration"
      },
      {
        id: "doc-joint-declaration",
        name: "Joint Declaration signed by Parents and Candidate",
        tamilName: "பெற்றோர் மற்றும் மாணவர் கையொப்பமிட்ட கூட்டு உறுதிமொழிப் படிவம்",
        required: true,
        source: "Download from TNeGA / TNEA portal",
        description: "Self-declaration of family education background"
      },
      {
        id: "doc-family-ration-card",
        name: "Smart Family Ration Card",
        tamilName: "குடும்ப அட்டை நகல்",
        required: true,
        source: "Civil Supplies Dept",
        description: "To verify all family members"
      },
      {
        id: "doc-allotment-order",
        name: "Single Window Counselling Allotment Order (TNEA / TN Medical)",
        tamilName: "கலந்தாய்வு ஒதுக்கீட்டு ஆணை (Allotment Order)",
        required: true,
        source: "TNEA / Selection Committee",
        description: "Proof of admission through government quota counselling"
      }
    ],
    applicationProcess: [
      "Apply for First Graduate Certificate at local e-Seva centre with Smart Ration Card, Parents' TC/Education proof, and Family Tree.",
      "Submit the First Graduate Certificate during TNEA / TN Medical counselling registration.",
      "The fee waiver is automatically applied to your college fee invoice."
    ],
    tamilApplicationProcess: [
      "இ-சேவை மையம் மூலம் குடும்ப அட்டை, பெற்றோரின் பள்ளி சான்றிதழ்களுடன் முதல் பட்டதாரி சான்றிதழுக்கு விண்ணப்பிக்கவும்.",
      "பொறியியல் / மருத்துவ கலந்தாய்வில் (Counselling) சான்றிதழை சமர்ப்பிக்கவும்.",
      "கல்லூரி கட்டணத்தில் இருந்து நேரடியாக கட்டணம் கழிக்கப்படும்."
    ],
    applicationWebsite: "https://www.tneaonline.org",
    helpline: "044-22351014",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "Any TN e-Seva Centre / TNEA Admission Facilitation Centre (TFC)",
    lastUpdated: "2026-05-12",
    sourceUrl: "https://www.tndte.gov.in"
  },
  {
    id: "tn-differently-abled-maintenance",
    schemeName: "Monthly Maintenance Allowance for Persons with Severe Disabilities",
    tamilName: "கடுமையாக பாதிக்கப்பட்ட மாற்றுத்திறனாளிகளுக்கான மாதாந்திர பராமரிப்பு உதவித்தொகை",
    governmentLevel: "TAMIL_NADU",
    department: "Welfare of Differently Abled Persons Department",
    tamilDepartment: "மாற்றுத்திறனாளிகள் நலத்துறை",
    category: "Disability Welfare",
    tamilCategory: "மாற்றுத்திறனாளிகள் நலம்",
    description: "Financial assistance of ₹2,000 per month for persons with intellectual disabilities, cerebral palsy, autism, muscular dystrophy, and severe loco-motor disabilities (above 40%-75%).",
    tamilDescription: "மனவளர்ச்சி குன்றியோர், மூளை முடக்குவாதம், தசைச்சிதைவு மற்றும் 40% க்கும் மேல் பாதிக்கப்பட்ட மாற்றுத்திறனாளிகளுக்கு மாதம் ₹2,000 பராமரிப்பு உதவித்தொகை வழங்கும் திட்டம்.",
    benefits: "₹2,000 per month directly credited to the beneficiary's bank account.",
    tamilBenefits: "மாதம் ₹2,000 உதவித்தொகை நேரடியாக வங்கி கணக்கில் செலுத்தப்படுகிறது.",
    benefitAmount: 24000,
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      gender: "ALL",
      state: "Tamil Nadu",
      disabilityStatus: "YES",
      minDisabilityPercentage: 40
    },
    documentsRequired: [
      {
        id: "doc-udid-card",
        name: "UDID (Unique Disability ID) Card / National Disability Identity Card",
        tamilName: "தேசிய மாற்றுத்திறனாளி அடையாள அட்டை (UDID கார்டு)",
        required: true,
        source: "District Differently Abled Welfare Office (DDAWO) / swavlambancard.gov.in",
        description: "Official certificate with disability percentage"
      },
      {
        id: "doc-medical-board-cert",
        name: "Medical Board Disability Assessment Certificate",
        tamilName: "மருத்துவக் குழு வழங்கிய ஊனமுற்றோர் மருத்துவச் சான்றிதழ்",
        required: true,
        source: "Govt Headquarter Hospital Medical Board",
        description: "Signed by Ortho/Neuro/Psychiatrist specialist"
      },
      {
        id: "doc-aadhaar-pwd",
        name: "Aadhaar Card of Person with Disability & Guardian",
        tamilName: "மாற்றுத்திறனாளி மற்றும் பாதுகாவலரின் ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Identity verification"
      },
      {
        id: "doc-bank-account-pwd",
        name: "Bank Passbook Copy (Joint account with guardian if minor/intellectual)",
        tamilName: "வங்கி பாஸ்புக் நகல்",
        required: true,
        source: "Bank Branch",
        description: "DBT enabled account"
      }
    ],
    applicationProcess: [
      "Submit application to District Differently Abled Welfare Officer (DDAWO) located at the District Collectorate.",
      "Attend medical board verification at the Government District Hospital.",
      "Sanction order issued and monthly allowance ₹2,000 is credited via ECS."
    ],
    tamilApplicationProcess: [
      "மாவட்ட ஆட்சியர் அலுவலகத்தில் உள்ள மாற்றுத்திறனாளிகள் நல அலுவலரிடம் (DDAWO) விண்ணப்பிக்கவும்.",
      "மாவட்ட அரசு தலைமை மருத்துவமனை மருத்துவக் குழு சரிபார்க்கும்.",
      "மாதம் ₹2,000 வங்கி கணக்கில் நேரடியாக வரவு வைக்கப்படும்."
    ],
    applicationWebsite: "https://www.scd.tn.gov.in",
    helpline: "1800-425-0111",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "District Differently Abled Welfare Office (Collectorate campus)",
    lastUpdated: "2026-06-11",
    sourceUrl: "https://www.scd.tn.gov.in"
  },
  {
    id: "tn-anbalayam-widow-pension",
    schemeName: "Destitute Widow Pension Scheme (DWPS - Tamil Nadu)",
    tamilName: "ஆதரவற்ற விதவைகள் மாதாந்திர ஓய்வூதியத் திட்டம்",
    governmentLevel: "TAMIL_NADU",
    department: "Social Security Schemes (Revenue Department)",
    tamilDepartment: "சமூக பாதுகாப்பு திட்டங்கள் (வருவாய்த் துறை)",
    category: "Social Welfare",
    tamilCategory: "சமூக நலம் & ஓய்வூதியம்",
    description: "Monthly pension of ₹1,200 along with free rice and subsidized clothing during Pongal and Deepavali festivals for destitute widows without adequate family support.",
    tamilDescription: "ஆதரவற்ற மற்றும் வருமானம் இல்லாத விதவைப் பெண்களுக்கு மாதம் ₹1,200 ஓய்வூதியம், இலவச அரிசி மற்றும் வேட்டி சேலை வழங்கும் திட்டம்.",
    benefits: "₹1,200 per month pension + Free 20 kg rice per month + Festive saree allowances.",
    tamilBenefits: "மாதம் ₹1,200 ஓய்வூதியம் + மாதம் 20 கிலோ இலவச அரிசி + பொங்கல், தீபாவளி இலவச சேலை.",
    benefitAmount: 14400,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 100,
      gender: "FEMALE",
      state: "Tamil Nadu",
      maritalStatus: "WIDOW",
      maxAnnualIncome: 100000,
      hasAdultSonSupport: false
    },
    documentsRequired: [
      {
        id: "doc-husband-death-cert",
        name: "Husband's Death Certificate",
        tamilName: "கணவரின் இறப்புச் சான்றிதழ்",
        required: true,
        source: "Municipality / Corporation / Town Panchayat Registrar of Births and Deaths",
        description: "Official death certificate"
      },
      {
        id: "doc-destitute-widow-cert",
        name: "Destitute Widow Certificate issued by Revenue Divisional Officer (RDO)",
        tamilName: "ஆதரவற்ற விதவை சான்றிதழ் (வருவாய் கோட்டாட்சியர் / RDO)",
        required: true,
        source: "e-Seva Centre / RDO Office",
        description: "Certificate proving destitute status"
      },
      {
        id: "doc-smart-card",
        name: "Smart Ration Card",
        tamilName: "ஸ்மார்ட் குடும்ப அட்டை",
        required: true,
        source: "Civil Supplies",
        description: "Proof of residence and family units"
      },
      {
        id: "doc-bank-passbook",
        name: "Single Bank Account Passbook",
        tamilName: "வங்கி பாஸ்புக் நகல்",
        required: true,
        source: "Post Office / Bank Branch",
        description: "For monthly pension credit"
      }
    ],
    applicationProcess: [
      "Apply through local e-Seva Centre or directly to the Special Tahsildar (Social Security Schemes).",
      "Field enquiry by Village Administrative Officer (VAO) and Revenue Inspector (RI).",
      "Pension approval order issued by Special Tahsildar (SSS) within 30 days."
    ],
    tamilApplicationProcess: [
      "இ-சேவை மையம் அல்லது வட்டாட்சியர் அலுவலக சமூக பாதுகாப்பு திட்ட பிரிவில் விண்ணப்பிக்கவும்.",
      "கிராம நிர்வாக அலுவலர் (VAO) மற்றும் வருவாய் ஆய்வாளர் (RI) விசாரணை மேற்கொள்வர்.",
      "ஒப்புதலுக்குப் பின் மாதம் ₹1,200 உங்கள் வங்கிக் கணக்கில் வரவு வைக்கப்படும்."
    ],
    applicationWebsite: "https://www.tnesevai.tn.gov.in",
    helpline: "1100 / 044-25619222",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "Taluk Office (Social Security Scheme wing) / Any TN e-Seva Centre",
    lastUpdated: "2026-05-24",
    sourceUrl: "https://revenue.tn.gov.in"
  },
  {
    id: "tn-needs-entrepreneur",
    schemeName: "New Entrepreneur-cum-Enterprise Development Scheme (NEEDS)",
    tamilName: "புதிய தொழில்முனைவோர் மற்றும் தொழில் நிறுவன மேம்பாட்டுத் திட்டம் (NEEDS)",
    governmentLevel: "TAMIL_NADU",
    department: "Micro, Small and Medium Enterprises (MSME) Department",
    tamilDepartment: "குறு, சிறு மற்றும் நடுத்தரத் தொழில் நிறுவனங்கள் துறை",
    category: "Entrepreneurship",
    tamilCategory: "தொழில்முனைவோர் & MSME",
    description: "Capital subsidy of 25% (up to ₹75,00,000) and 3% interest subvention for educated first-generation youth to set up manufacturing or service enterprises in Tamil Nadu.",
    tamilDescription: "புதிய படித்த முதல் தலைமுறை தொழில்முனைவோர் உற்பத்தி அல்லது சேவை தொழில்களைத் தொடங்க 25% வரை (அதிகபட்சம் ₹75 லட்சம்) மானியம் மற்றும் 3% வட்டி குறைப்பு வழங்கும் திட்டம்.",
    benefits: "25% Government Subsidy on project cost (Up to ₹75 Lakhs) + 3% interest rebate on bank loans.",
    tamilBenefits: "தொழில் திட்ட மதிப்பீட்டில் 25% அரசு மானியம் (அதிகபட்சம் ₹75,00,000 வரை) + 3% வட்டி மானியம்.",
    benefitAmount: 7500000,
    eligibilityCriteria: {
      minAge: 21,
      maxAge: 45, // 45 for SC/ST/BC/MBC/Women/Differently Abled; 35 for General
      gender: "ALL",
      state: "Tamil Nadu",
      educationLevels: ["Degree", "Diploma", "ITI", "Graduation", "Post Graduation"],
      entrepreneurOnly: true
    },
    documentsRequired: [
      {
        id: "doc-project-report",
        name: "Detailed Project Report (DPR) with Machinery Quotations",
        tamilName: "தொழில் திட்ட அறிக்கை (DPR) மற்றும் இயந்திர விலைப்புள்ளி",
        required: true,
        source: "Chartered Accountant / Certified Project Consultant",
        description: "Technical and financial viability report"
      },
      {
        id: "doc-degree-cert",
        name: "Degree / Diploma Certificate and Marksheets",
        tamilName: "பட்டப்படிப்பு / டிப்ளமோ சான்றிதழ்",
        required: true,
        source: "University / DOTE",
        description: "Educational qualification proof"
      },
      {
        id: "doc-community-cert",
        name: "Community Certificate",
        tamilName: "சாதிச் சான்றிதழ்",
        required: true,
        source: "e-Seva Centre",
        description: "For category based age and subsidy concessions"
      },
      {
        id: "doc-nativity-cert",
        name: "Nativity / Residence Certificate in Tamil Nadu",
        tamilName: "இருப்பிடச் சான்றிதழ் / தமிழ்நாட்டில் வசிப்பதற்கான சான்று",
        required: true,
        source: "e-Seva Centre / Tahsildar",
        description: "Proof of Tamil Nadu residency"
      },
      {
        id: "doc-land-lease",
        name: "Land / Building Ownership Document or Rental Agreement for Factory",
        tamilName: "தொழிற்சாலை நிலம் / வாடகை ஒப்பந்த ஆவணம்",
        required: true,
        source: "Sub-Registrar Office",
        description: "Premises document with minimum 5-year lease"
      }
    ],
    applicationProcess: [
      "Register and submit online application at msmeonline.tn.gov.in/needs.",
      "Upload Detailed Project Report (DPR), education certificate, and quotations.",
      "Attend interview before the District Level Task Force Committee (DLTFC) headed by District Collector.",
      "Undergo mandatory Entrepreneurship Development Training (EDP) at EDI, Chennai or regional centres.",
      "Bank sanction and 25% subsidy released to escrow account."
    ],
    tamilApplicationProcess: [
      "msmeonline.tn.gov.in/needs இணையதளத்தில் திட்ட அறிக்கையுடன் விண்ணப்பிக்கவும்.",
      "மாவட்ட ஆட்சியர் தலைமையிலான தேர்வுக் குழுவின் நேர்காணலில் பங்கேற்கவும்.",
      "தொழில்முனைவோர் பயிற்சி (EDP Training) பெறவும்.",
      "வங்கி கடன் ஒப்புதல் பெற்று 25% அரசு மானியம் விடுவிக்கப்படும்."
    ],
    applicationWebsite: "https://msmeonline.tn.gov.in/needs",
    helpline: "044-22500045 / 044-22501002",
    status: "ACTIVE",
    districtAvailability: "All 38 Districts of Tamil Nadu",
    applicationCentre: "District Industries Centre (DIC) in respective District Headquarters",
    lastUpdated: "2026-06-05",
    sourceUrl: "https://msmeonline.tn.gov.in"
  },

  // ==========================================
  // CENTRAL GOVERNMENT OF INDIA SCHEMES
  // ==========================================
  {
    id: "central-pm-kisan",
    schemeName: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    tamilName: "பிரதமர் கிசான் சம்மான் நிதி (PM-KISAN விவசாயி உதவி)",
    governmentLevel: "CENTRAL",
    department: "Ministry of Agriculture and Farmers Welfare, Government of India",
    tamilDepartment: "விவசாயம் மற்றும் விவசாயிகள் நல அமைச்சகம், இந்திய அரசு",
    category: "Farmer Schemes",
    tamilCategory: "விவசாயிகள் நலம்",
    description: "Central sector income support scheme providing ₹6,000 per year in three equal 4-monthly installments of ₹2,000 directly into the bank accounts of all landholding farmer families across India.",
    tamilDescription: "விவசாயிகளுக்கு ஆண்டுதோறும் ₹6,000 உதவித்தொகையை 4 மாதங்களுக்கு ஒருமுறை ₹2,000 வீதம் 3 தவணைகளில் நேரடியாக வங்கி கணக்கில் வழங்கும் மத்திய அரசு திட்டம்.",
    benefits: "₹6,000 per year deposited in 3 equal installments of ₹2,000 each (April-July, August-November, December-March).",
    tamilBenefits: "ஆண்டுக்கு ₹6,000 (தலா ₹2,000 வீதம் 3 தவணைகளில்) நேரடி பணப்பரிமாற்றம்.",
    benefitAmount: 6000,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 90,
      gender: "ALL",
      state: "ALL_INDIA",
      farmerOnly: true,
      landOwnershipRequired: true,
      institutionalLandHolderExclusion: true
    },
    documentsRequired: [
      {
        id: "doc-aadhaar",
        name: "Aadhaar Card (Mandatory biometric e-KYC linked)",
        tamilName: "ஆதார் அட்டை (e-KYC சரிபார்ப்புடன்)",
        required: true,
        source: "UIDAI / CSC Centre",
        description: "Biometric e-KYC must be completed on pmkisan.gov.in"
      },
      {
        id: "doc-land-patta",
        name: "Land Ownership Record (Patta / Chitta / Land Registration)",
        tamilName: "நில உரிமை ஆவணம் (பட்டா / சிட்டா / வருவாய் ஆவணம்)",
        required: true,
        source: "State Revenue Department (Tamil Nadu e-Services / AnyROR)",
        description: "Landholding registered in applicant's name"
      },
      {
        id: "doc-bank-dbt",
        name: "Aadhaar NPCI Mapped Active Bank Account",
        tamilName: "ஆதார் NPCI உடன் இணைக்கப்பட்ட சேமிப்பு வங்கி கணக்கு",
        required: true,
        source: "Bank / Post Office Payment Bank (IPPB)",
        description: "Account must be seeded with NPCI for DBT credit"
      }
    ],
    applicationProcess: [
      "Register online at pmkisan.gov.in under 'New Farmer Registration' or visit nearby Common Service Centre (CSC).",
      "Enter Aadhaar number, State, District, Sub-District, Block, and Village.",
      "Input Land Survey number, Khata/Patta number, and upload landholding proof.",
      "Complete Aadhaar OTP or Biometric e-KYC authentication.",
      "District Nodal Agricultural Officer validates and approves the claim."
    ],
    tamilApplicationProcess: [
      "pmkisan.gov.in வலைத்தளத்தில் புதிய விவசாயி பதிவில் ஆதார் எண்ணை உள்ளிடவும் அல்லது பொது சேவை மையம் (CSC) செல்லவும்.",
      "மாவட்டம், வட்டம், கிராமம் மற்றும் நில சர்வே எண், பட்டா விவரங்களை உள்ளிடவும்.",
      "ஆதார் OTP அல்லது பயோமெட்ரிக் e-KYC சரிபார்ப்பை முடிக்கவும்.",
      "வேளாண்மைத் துறை சரிபார்த்த பிறகு தவணை தொகை வங்கி கணக்கில் வரவு வைக்கப்படும்."
    ],
    applicationWebsite: "https://pmkisan.gov.in",
    helpline: "155261 / 011-24300606 (Toll Free: 1800-115-526)",
    status: "ACTIVE",
    districtAvailability: "All Districts across India (including Tamil Nadu)",
    applicationCentre: "Common Service Centre (CSC) / e-Seva Centre / Block Agriculture Office",
    lastUpdated: "2026-07-01",
    sourceUrl: "https://pmkisan.gov.in"
  },
  {
    id: "central-pm-awas-yojana-gramin",
    schemeName: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G Housing for All)",
    tamilName: "பிரதமர் ஊரக வீட்டு வசதி திட்டம் (PMAY-G கிராமப்புற வீடு திட்டம்)",
    governmentLevel: "CENTRAL",
    department: "Ministry of Rural Development, Government of India",
    tamilDepartment: "ஊரக வளர்ச்சி அமைச்சகம், இந்திய அரசு",
    category: "Housing",
    tamilCategory: "வீட்டு வசதி",
    description: "Financial grant of ₹1,20,000 to ₹1,30,000 (supplemented with state grants up to ₹2.7 Lakhs in TN) for houseless families and those living in kutcha/dilapidated houses in rural areas to construct pucca houses with hygienic toilet.",
    tamilDescription: "கிராமப்புறங்களில் வீடற்ற அல்லது குடிசை வீடுகளில் வசிக்கும் ஏழை எளிய மக்களுக்கு கான்கிரீட் வீடு கட்ட ₹1.20 லட்சம் முதல் ₹2.70 லட்சம் வரை நிதியுதவி வழங்கும் திட்டம்.",
    benefits: "₹1,20,000 direct housing grant + ₹12,000 Swachh Bharat toilet grant + 90 days MGNREGA labor wages (~₹25,000).",
    tamilBenefits: "வீடு கட்ட ₹1,20,000 முதல் ₹2,70,000 மானியம் + கழிப்பறை கட்ட ₹12,000 + 90 நாட்கள் 100 நாள் வேலை திட்ட கூலி.",
    benefitAmount: 157000,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 90,
      gender: "ALL",
      state: "ALL_INDIA",
      housingStatus: "HOMELESS_OR_KUTCHA",
      bplStatus: true,
      maxAnnualIncome: 180000
    },
    documentsRequired: [
      {
        id: "doc-aadhaar-family",
        name: "Aadhaar Card of all family members",
        tamilName: "அனைத்து குடும்ப உறுப்பினர்களின் ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Biometric Aadhaar numbers"
      },
      {
        id: "doc-secc-proof",
        name: "SECC / BPL Survey Inclusion Proof / Ration Card",
        tamilName: "SECC கணக்கெடுப்பு எண் / ரேஷன் அட்டை",
        required: true,
        source: "Village Panchayat / Block Development Office (BDO)",
        description: "Proof of houseless status in Gram Sabha priority list"
      },
      {
        id: "doc-land-ownership",
        name: "House Site Patta (Natham Patta / Registered House Plot)",
        tamilName: "வீட்டு மனை பட்டா (நத்தம் பட்டா)",
        required: true,
        source: "Tahsildar / e-Seva Centre",
        description: "Clear title of house plot"
      },
      {
        id: "doc-mgnrega-jobcard",
        name: "MGNREGA 100-Days Work Job Card",
        tamilName: "100 நாள் வேலை திட்ட அட்டை (மகாத்மா காந்தி வேலை அட்டை)",
        required: true,
        source: "Gram Panchayat",
        description: "To link 90-days construction unskilled labor wages"
      },
      {
        id: "doc-bank-passbook",
        name: "Bank Account Passbook (Geo-tagged installment releases)",
        tamilName: "வங்கி கணக்கு புத்தகம்",
        required: true,
        source: "Bank Branch",
        description: "Active bank account"
      }
    ],
    applicationProcess: [
      "Beneficiary selection is done based on SECC 2011 housing deprivation criteria approved by Gram Sabha.",
      "Geo-tagged photos of existing kutcha house are uploaded via AwaasApp by Panchayat Secretary.",
      "Sanction order is generated by Block Development Officer (BDO).",
      "Fund is released in 4 stages directly into bank account upon geo-tag verification of basement, lintel, roof, and completion."
    ],
    tamilApplicationProcess: [
      "கிராம சபை மூலம் தகுதியான பயனாளிகள் தேர்வு செய்யப்படுவர்.",
      "பஞ்சாயத்து செயலாளர் AwaasApp மூலம் தற்போதுள்ள வீட்டின் புகைப்படத்தை பதிவேற்றுவார்.",
      "வட்டார வளர்ச்சி அலுவலர் (BDO) ஒப்புதல் அளிப்பார்.",
      "அடித்தளம், மேற்கூரை, வர்ணம் பூசுதல் ஆகிய நிலைகளில் 4 தவணைகளாக பணம் வங்கி கணக்கில் வரவு வைக்கப்படும்."
    ],
    applicationWebsite: "https://pmayg.nic.in",
    helpline: "1800-11-6446",
    status: "ACTIVE",
    districtAvailability: "All Rural Blocks in Tamil Nadu and India",
    applicationCentre: "Village Panchayat Office / Block Development Office (BDO)",
    lastUpdated: "2026-06-18",
    sourceUrl: "https://pmayg.nic.in"
  },
  {
    id: "central-pm-mudra-yojana",
    schemeName: "Pradhan Mantri MUDRA Yojana (PMMY Business Loan)",
    tamilName: "பிரதமர் முத்ரா யோஜனா (சிறு தொழில் கடன் திட்டம்)",
    governmentLevel: "CENTRAL",
    department: "Department of Financial Services, Ministry of Finance",
    tamilDepartment: "நிதி அமைச்சகம், இந்திய அரசு",
    category: "MSME",
    tamilCategory: "MSME & தொழில் கடன்",
    description: "Collateral-free micro loans up to ₹20,00,000 for non-corporate, non-farm small/micro enterprises across three categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5,00,000), and Tarun (₹5,00,000 to ₹20,00,000).",
    tamilDescription: "சொத்துப் பிணையம் ஏதுமின்றி சிறு, குறு வியாபாரிகள் மற்றும் தொழில் முனைவோருக்கு ₹50,000 முதல் ₹20 லட்சம் வரை முத்ரா கடன் வழங்கும் திட்டம்.",
    benefits: "Collateral-free business loan from ₹50,000 up to ₹20,00,000 with low interest rates and repayment up to 5 years.",
    tamilBenefits: "பிணையம் இல்லாமல் ₹50,000 முதல் ₹20,00,000 வரை குறைந்த வட்டியில் எளிதான தொழில் கடன்.",
    benefitAmount: 2000000,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      gender: "ALL",
      state: "ALL_INDIA",
      entrepreneurOnly: true,
      nonDefaulter: true
    },
    documentsRequired: [
      {
        id: "doc-aadhaar-pan",
        name: "Aadhaar Card and PAN Card",
        tamilName: "ஆதார் அட்டை மற்றும் பான் கார்டு",
        required: true,
        source: "UIDAI & Income Tax Department",
        description: "Primary KYC proofs"
      },
      {
        id: "doc-udyam-cert",
        name: "Udyam MSME Registration Certificate",
        tamilName: "உத்யம் எம்.எஸ்.எம்.இ பதிவு சான்றிதழ் (Udyam Registration)",
        required: true,
        source: "udyamregistration.gov.in (Free Govt portal)",
        description: "Official micro enterprise proof"
      },
      {
        id: "doc-business-address",
        name: "Proof of Business Address (Trade License / Rent Agreement / GST)",
        tamilName: "வணிக முகவரி சான்று (வணிக உரிமம் / வாடகை ஒப்பந்தம் / ஜிஎஸ்டி)",
        required: true,
        source: "Local Body / Commercial Taxes",
        description: "Operating shop or factory address proof"
      },
      {
        id: "doc-bank-statements",
        name: "Last 6 Months Bank Account Statement",
        tamilName: "கடந்த 6 மாத வங்கி கணக்கு அறிக்கை (Statement)",
        required: true,
        source: "Bank Branch / Net Banking",
        description: "Turnover and transaction history"
      },
      {
        id: "doc-quotation",
        name: "Quotation for Machinery / Raw Material to be purchased",
        tamilName: "வாங்கவிருக்கும் இயந்திரம் / சரக்குகளின் விலைப்புள்ளி",
        required: false,
        source: "Supplier / Vendor",
        description: "Required for Kishore & Tarun categories"
      }
    ],
    applicationProcess: [
      "Apply online through JanSamarth portal (jansamarth.in) or directly visit any Commercial Bank, RRB, or MFI.",
      "Fill MUDRA application form selecting Shishu, Kishore, or Tarun.",
      "Submit KYC, Udyam registration, and quotation.",
      "Bank conducts appraisal and sanctions loan without requiring collateral."
    ],
    tamilApplicationProcess: [
      "jansamarth.in போர்ட்டல் அல்லது அருகில் உள்ள எந்த ஒரு அரசு/தனியார் வங்கி கிளைக்கு செல்லவும்.",
      "முத்ரா விண்ணப்பப் படிவத்தை பூர்த்தி செய்து ஆவணங்களை சமர்ப்பிக்கவும்.",
      "வங்கி அதிகாரி சரிபார்த்து பிணையம் இன்றி கடன் ஒப்புதல் அளிப்பார்."
    ],
    applicationWebsite: "https://www.mudra.org.in",
    helpline: "1800-180-1111 / 1800-11-0001 (Tamil Nadu Toll Free: 1800-425-2400)",
    status: "ACTIVE",
    districtAvailability: "All Districts of Tamil Nadu and India",
    applicationCentre: "Any Public / Private Sector Bank / Regional Rural Bank / JanSamarth Portal",
    lastUpdated: "2026-06-25",
    sourceUrl: "https://www.mudra.org.in"
  },
  {
    id: "central-pm-vishwakarma",
    schemeName: "PM Vishwakarma Scheme (Support for Traditional Artisans)",
    tamilName: "பிரதமர் விஸ்வகர்மா திட்டம் (பாரம்பரிய கைவினைஞர்கள் உதவி)",
    governmentLevel: "CENTRAL",
    department: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    tamilDepartment: "குறு, சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம், இந்திய அரசு",
    category: "Skill Development",
    tamilCategory: "கைவினைஞர் & திறன் மேம்பாடு",
    description: "End-to-end support for traditional artisans and craftspersons across 18 trades (carpenters, blacksmiths, potters, sculptors, cobblers, tailors, etc.) including free skill training with ₹500/day stipend, ₹15,000 toolkit grant, and collateral-free loan up to ₹3,00,000 at 5% interest.",
    tamilDescription: "18 வகையான பாரம்பரிய கைவினைஞர்களுக்கு (தச்சர், கொல்லர், குயவர், சிற்பி, தையல்காரர் போன்றவை) ₹15,000 கருவி மானியம், நாள் ஒன்றுக்கு ₹500 உதவித்தொகையுடன் இலவச பயிற்சி மற்றும் ₹3,00,000 வரை 5% வட்டியில் கடன் வழங்கும் திட்டம்.",
    benefits: "₹15,000 free toolkit e-voucher + ₹500/day training stipend + Collateral-free loan of ₹1,00,000 (Tranche 1) & ₹2,00,000 (Tranche 2) at 5% interest.",
    tamilBenefits: "₹15,000 இலவச உபகரண வவுச்சர் + பயிற்சி காலத்தில் நாள் ஒன்றுக்கு ₹500 + ₹3,00,000 வரை 5% வட்டியில் தொழில் கடன்.",
    benefitAmount: 315000,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: "ALL",
      state: "ALL_INDIA",
      traditionalArtisanTrade: true // 18 traditional trades
    },
    documentsRequired: [
      {
        id: "doc-aadhaar-artisan",
        name: "Aadhaar Card (Biometric authenticated)",
        tamilName: "ஆதார் அட்டை (பயோமெட்ரிக் கைரேகை பதிவுடன்)",
        required: true,
        source: "UIDAI / CSC Centre",
        description: "Mandatory biometric verification"
      },
      {
        id: "doc-ration-card",
        name: "Ration Card",
        tamilName: "குடும்ப அட்டை",
        required: true,
        source: "Civil Supplies Dept",
        description: "Family validation (one beneficiary per family)"
      },
      {
        id: "doc-bank-dbt",
        name: "Active Bank Account linked with Mobile & Aadhaar",
        tamilName: "வங்கி கணக்கு புத்தகம் நகல்",
        required: true,
        source: "Bank Branch",
        description: "For toolkit incentive and training stipend"
      },
      {
        id: "doc-skill-trade",
        name: "Trade Declaration / Proof of working in one of 18 traditional trades",
        tamilName: "18 வகையான பாரம்பரிய தொழிலில் ஒன்றில் பணிபுரிவதற்கான சுய அறிவிப்பு",
        required: true,
        source: "Gram Panchayat / Urban Local Body",
        description: "Self-declaration verified by Panchayat Secretary or Executive Officer"
      }
    ],
    applicationProcess: [
      "Visit nearest Common Service Centre (CSC) with Aadhaar and Ration Card.",
      "CSC operator performs biometric authentication on pmvishwakarma.gov.in portal.",
      "Tier-1 verification by Gram Panchayat Pradhan or Urban ULB Executive Officer.",
      "Tier-2 verification by District Implementation Committee headed by General Manager DIC.",
      "Receive PM Vishwakarma Digital ID Card and commence 5-day basic skill training with ₹500 daily stipend."
    ],
    tamilApplicationProcess: [
      "அருகிலுள்ள பொது சேவை மையத்திற்கு (CSC) சென்று பயோமெட்ரிக் பதிவு செய்யவும்.",
      "கிராம ஊராட்சி அல்லது பேரூராட்சி அலுவலர் சரிபார்ப்பார்.",
      "மாவட்ட தொழில் மையம் (DIC) இறுதி ஒப்புதல் அளிக்கும்.",
      "விஸ்வகர்மா அடையாள அட்டை, ₹15,000 உபகரண மானியம் மற்றும் 5% வட்டியில் கடன் உதவி வழங்கப்படும்."
    ],
    applicationWebsite: "https://pmvishwakarma.gov.in",
    helpline: "1800-267-7777 / 011-23061500",
    status: "ACTIVE",
    districtAvailability: "All Districts in Tamil Nadu & India",
    applicationCentre: "Common Service Centre (CSC) / District Industries Centre (DIC)",
    lastUpdated: "2026-07-05",
    sourceUrl: "https://pmvishwakarma.gov.in"
  },
  {
    id: "central-ayushman-bharat-pmjay",
    schemeName: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    tamilName: "ஆயுஷ்மான் பாரத் - பிரதமர் மக்கள் ஆரோக்கிய திட்டம் (AB-PMJAY)",
    governmentLevel: "CENTRAL",
    department: "National Health Authority (NHA), Ministry of Health and Family Welfare",
    tamilDepartment: "சுகாதாரம் மற்றும் குடும்ப நல அமைச்சகம், இந்திய அரசு",
    category: "Health",
    tamilCategory: "மருத்துவம் & சுகாதாரம்",
    description: "National flagship health insurance offering cashless cover of ₹5,00,000 per family per year for secondary and tertiary healthcare hospitalizations across 27,000+ impaneled hospitals across India (co-branded with CMCHIS in Tamil Nadu).",
    tamilDescription: "இந்தியா முழுவதும் உள்ள 27,000 க்கும் மேற்பட்ட அங்கீகரிக்கப்பட்ட மருத்துவமனைகளில் ₹5,00,000 வரை கட்டணமில்லா பணமில்லா உயர் மருத்துவ சிகிச்சைகள் வழங்கும் தேசிய காப்பீட்டு திட்டம்.",
    benefits: "₹5,00,000 cashless health insurance cover per family per year across India.",
    tamilBenefits: "ஆண்டுக்கு ₹5,00,000 வரை இந்தியா முழுவதும் இலவச பணமில்லா மருத்துவ சிகிச்சை.",
    benefitAmount: 500000,
    eligibilityCriteria: {
      minAge: 0,
      maxAge: 100,
      gender: "ALL",
      state: "ALL_INDIA",
      maxAnnualIncome: 250000,
      bplOrSeccListed: true
    },
    documentsRequired: [
      {
        id: "doc-aadhaar-pmjay",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "For e-KYC and Ayushman Card generation"
      },
      {
        id: "doc-ration-card",
        name: "Ration Card (Smart Card)",
        tamilName: "ஸ்மார்ட் குடும்ப அட்டை",
        required: true,
        source: "Civil Supplies",
        description: "Family proof"
      }
    ],
    applicationProcess: [
      "Check eligibility online on beneficiary.nha.gov.in using mobile number or Ration card number.",
      "Visit Ayushman Mitra kiosk at any Government Hospital or impaneled Private Hospital or e-Seva / CSC centre.",
      "Perform instant biometric or Aadhaar OTP verification.",
      "Download PVC Ayushman Card on spot."
    ],
    tamilApplicationProcess: [
      "beneficiary.nha.gov.in வலைத்தளத்தில் தகுதியை சோதிக்கவும்.",
      "அரசு மருத்துவமனை அல்லது இ-சேவை மையத்தில் உள்ள ஆயுஷ்மான் மித்ரா கவுண்டருக்கு செல்லவும்.",
      "ஆதார் சரிபார்ப்பு செய்து உடனடி ஆயுஷ்மான் கார்டை பதிவிறக்கம் செய்து கொள்ளலாம்."
    ],
    applicationWebsite: "https://beneficiary.nha.gov.in",
    helpline: "14555 / 1800-111-565",
    status: "ACTIVE",
    districtAvailability: "All Districts in India and Tamil Nadu",
    applicationCentre: "Ayushman Kiosk at Govt Medical Hospitals / CSC / e-Seva Centre",
    lastUpdated: "2026-06-20",
    sourceUrl: "https://nha.gov.in"
  },
  {
    id: "central-pm-suraksha-bima",
    schemeName: "Pradhan Mantri Suraksha Bima Yojana (PMSBY Accident Insurance)",
    tamilName: "பிரதமர் சுரக்ஷா பீமா யோஜனா (விபத்து காப்பீட்டுத் திட்டம்)",
    governmentLevel: "CENTRAL",
    department: "Department of Financial Services, Ministry of Finance",
    tamilDepartment: "நிதி அமைச்சகம், இந்திய அரசு",
    category: "Social Welfare",
    tamilCategory: "சமூக நலம் & காப்பீடு",
    description: "Accidental death and disability insurance cover of ₹2,00,000 for a nominal premium of just ₹20 per year auto-debited from bank savings account.",
    tamilDescription: "ஆண்டுக்கு வெறும் ₹20 பிரீமியம் தொகையில் ₹2,00,000 விபத்து மரண மற்றும் நிரந்தர ஊன காப்பீடு வழங்கும் மிகக் குறைந்த கட்டண திட்டம்.",
    benefits: "₹2,00,000 for accidental death or full disability; ₹1,00,000 for partial disability.",
    tamilBenefits: "விபத்து மரணம் அல்லது முழு ஊனத்திற்கு ₹2,00,000; பகுதி ஊனத்திற்கு ₹1,00,000 இழப்பீடு.",
    benefitAmount: 200000,
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      gender: "ALL",
      state: "ALL_INDIA",
      hasBankAccount: true
    },
    documentsRequired: [
      {
        id: "doc-aadhaar-pmsby",
        name: "Aadhaar Card",
        tamilName: "ஆதார் அட்டை",
        required: true,
        source: "UIDAI",
        description: "Primary KYC"
      },
      {
        id: "doc-bank-account",
        name: "Bank Savings Account Passbook with Auto-Debit Consent Form",
        tamilName: "வங்கி கணக்கு புத்தகம் மற்றும் தானியங்கி பிடித்த ஒப்புதல் படிவம்",
        required: true,
        source: "Bank Branch / Net Banking / Mobile Banking App",
        description: "Consent to auto-debit ₹20 annually"
      }
    ],
    applicationProcess: [
      "Log into Internet Banking or Mobile Banking app and select Social Security Schemes -> PMSBY.",
      "Or visit your bank branch and submit simple one-page PMSBY consent form.",
      "₹20 premium is debited every year in May/June automatically."
    ],
    tamilApplicationProcess: [
      "உங்கள் மொபைல் பேங்கிங் அல்லது வங்கி கிளைக்கு சென்று PMSBY ஒப்புதல் படிவத்தை வழங்கவும்.",
      "ஆண்டுதோறும் மே/ஜூன் மாதத்தில் உங்கள் வங்கி கணக்கிலிருந்து ₹20 மட்டும் தானாக கழிக்கப்பட்டு காப்பீடு புதுப்பிக்கப்படும்."
    ],
    applicationWebsite: "https://www.jansuraksha.gov.in",
    helpline: "1800-180-1111 / 1800-110-001",
    status: "ACTIVE",
    districtAvailability: "All Banks across India and Tamil Nadu",
    applicationCentre: "Any Commercial Bank / Regional Rural Bank / Post Office Bank",
    lastUpdated: "2026-05-15",
    sourceUrl: "https://www.jansuraksha.gov.in"
  },
  {
    id: "central-national-scholarship-nsp",
    schemeName: "Central Sector Scheme of Scholarship for College and University Students",
    tamilName: "மத்திய அரசு கல்லூரி மற்றும் பல்கலைக்கழக மாணவர்களுக்கான கல்வி உதவித்தொகை (NSP)",
    governmentLevel: "CENTRAL",
    department: "Department of Higher Education, Ministry of Education",
    tamilDepartment: "உயர்கல்வித் துறை, கல்வி அமைச்சகம், இந்திய அரசு",
    category: "Scholarships",
    tamilCategory: "கல்வி உதவித்தொகை",
    description: "Merit-cum-means scholarship of ₹12,000 per year at Graduation level (for 3 years) and ₹20,000 per year at Post-Graduation level for students above 80th percentile in Class 12 board exams.",
    tamilDescription: "12-ஆம் வகுப்பு பொதுத்தேர்வில் 80 சதவீதத்திற்கு மேல் மதிப்பெண் பெற்று இளங்கலை / முதுகலை பயிலும் மாணவர்களுக்கு ஆண்டுக்கு ₹12,000 முதல் ₹20,000 வரை வழங்கும் மத்திய அரசு கல்வி உதவித்தொகை.",
    benefits: "₹12,000 per annum for Undergraduate courses (3 years) + ₹20,000 per annum for Post-Graduate courses.",
    tamilBenefits: "இளங்கலை பட்டப்படிப்பிற்கு ஆண்டுக்கு ₹12,000 + முதுகலை பட்டப்படிப்பிற்கு ஆண்டுக்கு ₹20,000 உதவித்தொகை.",
    benefitAmount: 20000,
    eligibilityCriteria: {
      minAge: 17,
      maxAge: 25,
      gender: "ALL",
      state: "ALL_INDIA",
      studentOnly: true,
      min12thPercentage: 80,
      maxAnnualIncome: 450000 // Family income under 4.5 Lakhs
    },
    documentsRequired: [
      {
        id: "doc-12th-marksheet",
        name: "12th Standard Board Marksheet (Top 20th percentile)",
        tamilName: "12-ஆம் வகுப்பு பொதுத்தேர்வு மதிப்பெண் சான்றிதழ்",
        required: true,
        source: "State Board (DGE TN) / CBSE",
        description: "Official mark statement"
      },
      {
        id: "doc-income-cert",
        name: "Income Certificate (< ₹4.5 Lakhs)",
        tamilName: "வருமானச் சான்றிதழ் (ஆண்டு வருமானம் ₹4.5 லட்சத்திற்குள்)",
        required: true,
        source: "e-Seva Centre / Tahsildar",
        description: "Issued by competent revenue authority"
      },
      {
        id: "doc-bonafide-college",
        name: "College Enrollment Bonafide & Fee Receipt",
        tamilName: "கல்லூரி சேர்க்கை போனாஃபைட் மற்றும் கட்டண ரசீது",
        required: true,
        source: "College Registrar / Principal",
        description: "Current regular course enrollment"
      },
      {
        id: "doc-aadhaar-dbt",
        name: "Aadhaar Linked Bank Passbook",
        tamilName: "ஆதார் இணைக்கப்பட்ட வங்கி பாஸ்புக்",
        required: true,
        source: "Bank Branch",
        description: "Student's personal DBT account"
      }
    ],
    applicationProcess: [
      "Register on National Scholarship Portal (scholarships.gov.in) with OTR (One Time Registration) via Aadhaar Face RD / OTP.",
      "Fill scholarship application form and upload documents.",
      "Institute Nodal Officer (INO) and State Nodal Officer (SNO) verify credentials.",
      "Scholarship amount credited directly through PFMS DBT."
    ],
    tamilApplicationProcess: [
      "scholarships.gov.in போர்ட்டலில் OTR (One Time Registration) பதிவு செய்யவும்.",
      "விண்ணப்பத்தை பூர்த்தி செய்து மதிப்பெண் சான்றிதழ் மற்றும் வருமான சான்றிதழை பதிவேற்றவும்.",
      "கல்லூரி மற்றும் மாநில அதிகாரிகள் சரிபார்த்த பின் PFMS மூலம் வங்கி கணக்கில் பணம் செலுத்தப்படும்."
    ],
    applicationWebsite: "https://scholarships.gov.in",
    helpline: "0120-6619540",
    status: "ACTIVE",
    districtAvailability: "All Colleges across India",
    applicationCentre: "College Scholarship Cell / National Scholarship Portal (Online)",
    lastUpdated: "2026-06-30",
    sourceUrl: "https://scholarships.gov.in"
  }
];

export const CATEGORIES = [
  { id: "Education", name: "Education", tamilName: "கல்வி", icon: "GraduationCap" },
  { id: "Scholarships", name: "Scholarships", tamilName: "கல்வி உதவித்தொகை", icon: "Award" },
  { id: "Women Welfare", name: "Women Welfare", tamilName: "மகளிர் நலம்", icon: "HeartHandshake" },
  { id: "Farmer Schemes", name: "Farmer Schemes", tamilName: "விவசாயிகள் நலம்", icon: "Sprout" },
  { id: "Health", name: "Health & Medical", tamilName: "மருத்துவம் & சுகாதாரம்", icon: "Activity" },
  { id: "Skill Development", name: "Skill & Employment", tamilName: "திறன் & வேலைவாய்ப்பு", icon: "Briefcase" },
  { id: "Housing", name: "Housing", tamilName: "வீட்டு வசதி", icon: "Home" },
  { id: "MSME", name: "MSME & Business", tamilName: "தொழில் & MSME", icon: "Building2" },
  { id: "Social Welfare", name: "Social Welfare", tamilName: "சமூக நலம் & ஓய்வூதியம்", icon: "Users" },
  { id: "Disability Welfare", name: "Disability Welfare", tamilName: "மாற்றுத்திறனாளிகள் நலம்", icon: "Accessibility" },
  { id: "Entrepreneurship", name: "Entrepreneurship", tamilName: "தொழில்முனைவோர்", icon: "TrendingUp" }
];
