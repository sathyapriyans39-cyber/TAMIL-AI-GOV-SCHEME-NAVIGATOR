/**
 * Bilingual Translation Dictionary (Tamil & English)
 */

export const translations = {
  en: {
    // Brand & App Info
    appName: "Tamil AI Government Scheme Navigator",
    appTamilName: "தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி",
    tagline: "Discover the Government Schemes You May Be Eligible For with AI.",
    taglineTamil: "உங்களுக்கு கிடைக்கக்கூடிய அரசு திட்டங்களை AI மூலம் எளிதாக கண்டறியுங்கள்.",
    emblemTitle: "Government Schemes Portal | தமிழ்நாடு அரசு & மத்திய அரசு",

    // Navigation
    nav: {
      home: "Home",
      schemes: "Find Schemes",
      askAi: "Ask AI Assistant",
      checkEligibility: "Eligibility Matcher",
      nearbyCentres: "e-Seva & Centres",
      docsGuide: "Documents Guide",
      savedSchemes: "Saved Schemes",
      myProfile: "My Profile",
      admin: "Admin Portal",
      login: "Login",
      register: "Register",
      logout: "Logout",
      notifications: "Notifications",
      searchPlaceholder: "Ask anything about government schemes in English, Tamil, or Tanglish..."
    },

    // Hero Section
    hero: {
      titlePrimary: "Discover Government Welfare Schemes",
      titleSecondary: "Powered by AI & Automatic Eligibility",
      subtitle: "Instant access to all Tamil Nadu State Government and Government of India Central schemes. Check eligibility, get step-by-step required documents, and find nearby e-Seva centres.",
      searchPlaceholder: "e.g., 'Scholarships for college students', 'விவசாயிகளுக்கான அரசு திட்டங்கள்', 'Women business loans'...",
      searchButton: "Search Schemes",
      voiceSearch: "Voice Search",
      sampleQueriesTitle: "Try asking:",
      samples: [
        "What schemes am I eligible for?",
        "பெண்களுக்கு தமிழ்நாடு அரசின் திட்டங்கள் என்ன?",
        "Scholarships for engineering college students",
        "PM-KISAN ₹6000 required documents",
        "Free bus travel pass for women in TN"
      ]
    },

    // Quick Action Cards
    quickActions: {
      findSchemes: "Browse Schemes",
      findSchemesDesc: "Filter by State & Central welfare schemes",
      askAi: "AI Scheme Assistant",
      askAiDesc: "Chat or speak in Tamil / English with AI",
      voiceSearch: "Voice Search",
      voiceSearchDesc: "Speak your questions in Tamil or English",
      nearbyCentres: "Find Nearby Centres",
      nearbyCentresDesc: "Locate e-Seva centres & Taluk offices on map",
      myProfile: "My Profile",
      myProfileDesc: "Update bio for 100% automated matching",
      notifications: "Scheme Alerts",
      notificationsDesc: "Real-time updates on matching schemes"
    },

    // Scheme Filters & Tabs
    schemes: {
      allLevels: "All Schemes",
      tamilNaduLevel: "🏛️ Tamil Nadu Government",
      centralLevel: "🇮🇳 Central Government (India)",
      allCategories: "All Categories",
      searchSchemes: "Search schemes by title, keyword, or department...",
      filterBy: "Filter By",
      filterGender: "Gender",
      filterIncome: "Max Annual Income",
      filterCategory: "Category",
      sortBy: "Sort By",
      sortDefault: "Default",
      sortBenefit: "Highest Benefit (₹)",
      sortEligibility: "Highest Eligibility Match",
      noSchemesFound: "No schemes found matching your search filters.",
      viewDetails: "View Scheme Details",
      requiredDocs: "Required Documents",
      howToApply: "How to Apply",
      findCentre: "Find Centre",
      saveScheme: "Save",
      saved: "Saved",
      benefit: "Benefit Amount",
      department: "Department",
      lastUpdated: "Last Updated",
      officialPortal: "Official Portal",
      helpline: "Helpline",
      eligibilityMatch: "Eligibility Match",
      potentiallyEligible: "Potentially Eligible",
      disclaimer: "Based on your profile details, you may be eligible. Final eligibility is determined by the concerned government department."
    },

    // Eligibility Checker Wizard
    eligibility: {
      title: "Automatic Scheme Eligibility Matcher",
      subtitle: "Our AI engine analyzes your exact age, occupation, education, income, and community to match official government rules.",
      step1: "Personal & Location",
      step2: "Income & Occupation",
      step3: "Education & Social Category",
      step4: "Matched Results",
      calculateButton: "Calculate My Eligible Schemes",
      recalculateButton: "Update & Re-evaluate",
      matchScore: "Estimated Match Score",
      matchedCount: "Schemes You May Be Eligible For",
      otherCount: "Other Schemes to Explore",
      reasonsTitle: "Why you qualify:",
      unmetTitle: "Missing requirements:"
    },

    // AI Chat Interface
    chat: {
      title: "Tamil AI Government Scheme Assistant",
      subtitle: "Ask in Tamil (தமிழ்), English, or Tanglish. Powered by official RAG scheme knowledge.",
      welcomeMessage: "Vanakkam! I am your AI Government Scheme Assistant. Ask me about Tamil Nadu State and Central Government schemes, eligibility criteria, benefits, step-by-step application procedures, and required documents.",
      inputPlaceholder: "Type your question in Tamil, English, or Tanglish...",
      listening: "Listening to your voice... Speak now in Tamil or English",
      speakButton: "Speak",
      sendButton: "Send",
      clearChat: "Clear Chat",
      voicePlayback: "Voice Output",
      playVoice: "Listen Answer",
      pauseVoice: "Pause",
      stopVoice: "Stop",
      requiredDocsChecklist: "Required Documents Checklist",
      officialSource: "Official Source",
      stepsToApply: "Application Steps"
    },

    // Centres Locator & Maps
    centres: {
      title: "Find Nearby e-Seva & Government Application Centres",
      subtitle: "Discover official TNeGA e-Seva centres, Taluk offices, and CSC centres across all 38 districts of Tamil Nadu.",
      selectDistrict: "Select District",
      allDistricts: "All Tamil Nadu Districts",
      searchCentres: "Search centres by name, taluk, or address...",
      useMyGps: "Use My GPS Location",
      getDirections: "Get Directions on Google Maps",
      operatingHours: "Operating Hours",
      contactPhone: "Helpline / Phone",
      servicesProvided: "Key Services Provided",
      distanceKm: "km away"
    },

    // Documents Guide
    docs: {
      title: "Required Documents & Certificate Acquisition Guide",
      subtitle: "Step-by-step instructions on how to obtain certificates from TNeGA e-Seva, Revenue Department, and UIDAI.",
      incomeCert: "Income Certificate (வருமானச் சான்றிதழ்)",
      communityCert: "Community Certificate (சாதிச் சான்றிதழ்)",
      firstGradCert: "First Graduate Certificate (முதல் பட்டதாரி சான்றிதழ்)",
      nativityCert: "Nativity Certificate (இருப்பிடச் சான்றிதழ்)",
      smartRation: "Smart Family Ration Card (குடும்ப அட்டை)",
      pattaChitta: "Land Patta / Chitta (பட்டா / சிட்டா)",
      udidCard: "Unique Disability ID Card (UDID கார்டு)"
    },

    // User Profile Form
    profile: {
      title: "Citizen Profile & Eligibility Bio",
      subtitle: "Keep your details updated so the AI can automatically discover every new and existing scheme for which you qualify.",
      personalTab: "1. Personal & Location",
      economicTab: "2. Income & Occupation",
      socialTab: "3. Social & Category",
      educationTab: "4. Education & Student",
      familyTab: "5. Family & Housing",
      fullName: "Full Name",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      transgender: "Transgender",
      dateOfBirth: "Date of Birth",
      state: "State",
      district: "District",
      taluk: "Taluk / Sub-District",
      village: "Village / Town / City",
      annualIncome: "Family Annual Income (₹)",
      occupation: "Primary Occupation",
      employmentStatus: "Employment Status",
      bplStatus: "BPL (Below Poverty Line) Cardholder",
      isStudent: "Currently Enrolled Student",
      educationLevel: "Education Level",
      course: "Current Course / Degree",
      studiedGovtSchool: "Studied in TN Govt School from Class 6 to 12",
      firstGraduate: "First Graduate in the entire family",
      community: "Community / Caste Category",
      hasDisability: "Person with Disability (PwD)",
      disabilityPercentage: "Disability Percentage (%)",
      maritalStatus: "Marital Status",
      isFarmer: "Farmer / Landholder",
      landAcres: "Agricultural Land Owned (in Acres)",
      isEntrepreneur: "Business Owner / Aspiring Entrepreneur",
      housingStatus: "Housing Status",
      hasBankAccount: "Active Bank Account (Aadhaar Seeded)",
      hasAadhaar: "Aadhaar Card Available",
      saveProfile: "Save Profile & Refresh Eligibility",
      profileSavedSuccess: "Profile saved successfully! Your eligibility has been updated."
    },

    // Admin Dashboard
    admin: {
      title: "Government Scheme Administrator Portal",
      subtitle: "Manage schemes, review citizen match analytics, publish announcements, and broadcast notifications.",
      totalSchemes: "Total Active Schemes",
      tnSchemes: "Tamil Nadu State Schemes",
      centralSchemes: "Central Government Schemes",
      usersCount: "Registered Citizens",
      addNewScheme: "Add New Government Scheme",
      manageSchemes: "Manage Existing Schemes",
      broadcastAlert: "Broadcast Announcement",
      schemeName: "Scheme Name (English)",
      tamilName: "Scheme Name (தமிழ்)",
      governmentLevel: "Government Level",
      department: "Department Name",
      category: "Scheme Category",
      benefitAmount: "Approximate Benefit Amount (₹)",
      publishScheme: "Publish Scheme & Auto-Notify Citizens"
    }
  },

  // ==========================================
  // TAMIL TRANSLATIONS
  // ==========================================
  ta: {
    // Brand & App Info
    appName: "தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி",
    appTamilName: "Tamil AI Government Scheme Navigator",
    tagline: "உங்களுக்கு கிடைக்கக்கூடிய அரசு திட்டங்களை AI மூலம் எளிதாக கண்டறியுங்கள்.",
    taglineTamil: "Discover the Government Schemes You May Be Eligible For with AI.",
    emblemTitle: "அரசு நலத்திட்டங்கள் வழிகாட்டி | தமிழ்நாடு அரசு & இந்திய அரசு",

    // Navigation
    nav: {
      home: "முகப்பு",
      schemes: "அரசு திட்டங்கள்",
      askAi: "AI உதவி மையம்",
      checkEligibility: "தகுதி கண்டறிதல்",
      nearbyCentres: "இ-சேவை & மையங்கள்",
      docsGuide: "ஆவணங்கள் வழிகாட்டி",
      savedSchemes: "சேமிக்கப்பட்டவை",
      myProfile: "என் சுயவிவரம்",
      admin: "நிர்வாகி தளம்",
      login: "உள்நுழை",
      register: "பதிவு செய்",
      logout: "வெளியேறு",
      notifications: "அறிவிப்புகள்",
      searchPlaceholder: "அரசு திட்டங்கள் பற்றி தமிழ், ஆங்கிலம் அல்லது தங்க்லீஷில் கேளுங்கள்..."
    },

    // Hero Section
    hero: {
      titlePrimary: "அனைத்து அரசு நலத்திட்டங்களையும்",
      titleSecondary: "AI மூலம் உடனடியாக கண்டறியுங்கள்",
      subtitle: "தமிழ்நாடு அரசு மற்றும் மத்திய அரசின் அனைத்து நலத்திட்டங்கள், தகுதி விதிகள், தேவையான ஆவணங்கள் மற்றும் அருகிலுள்ள இ-சேவை மையங்களை எளிதாக அறிந்துகொள்ளுங்கள்.",
      searchPlaceholder: "எ.கா: 'கல்லூரி மாணவிகளுக்கான புதுமைப் பெண் திட்டம்', 'விவசாயிகள் உதவித்தொகை', 'மகளிர் உரிமைத் தொகை'...",
      searchButton: "திட்டங்களை தேடுக",
      voiceSearch: "குரல் வழி தேடல்",
      sampleQueriesTitle: "இவற்றை கேட்டுப் பாருங்கள்:",
      samples: [
        "எனக்கு என்ன அரசு திட்டங்கள் கிடைக்கும்?",
        "பெண்களுக்கான தமிழ்நாடு அரசின் திட்டங்கள் என்ன?",
        "கல்லூரி மாணவர்களுக்கான கல்வி உதவித்தொகை",
        "PM-KISAN ₹6000 பெற தேவையான ஆவணங்கள்",
        "மகளிருக்கான இலவச பேருந்து பயணம்"
      ]
    },

    // Quick Action Cards
    quickActions: {
      findSchemes: "திட்டங்களை தேடுக",
      findSchemesDesc: "மாநில மற்றும் மத்திய அரசு திட்டங்கள்",
      askAi: "AI திட்ட உதவியாளர்",
      askAiDesc: "தமிழில் பேசி அல்லது தட்டச்சு செய்து கேட்கலாம்",
      voiceSearch: "குரல் வழி தேடல்",
      voiceSearchDesc: "கேள்விகளை தமிழில் பேசிக் கேட்கலாம்",
      nearbyCentres: "அருகிலுள்ள மையங்கள்",
      nearbyCentresDesc: "இ-சேவை மையம் & வட்டாட்சியர் அலுவலகம்",
      myProfile: "என் சுயவிவரம்",
      myProfileDesc: "100% துல்லியமான தகுதி பொருத்தத்திற்கு",
      notifications: "திட்ட அறிவிப்புகள்",
      notificationsDesc: "புதிய திட்டங்களின் உடனடி தகவல்கள்"
    },

    // Scheme Filters & Tabs
    schemes: {
      allLevels: "அனைத்து திட்டங்கள்",
      tamilNaduLevel: "🏛️ தமிழ்நாடு அரசு திட்டங்கள்",
      centralLevel: "🇮🇳 மத்திய அரசு திட்டங்கள் (இந்தியா)",
      allCategories: "அனைத்து பிரிவுகள்",
      searchSchemes: "திட்டத்தின் பெயர், துறை அல்லது விபரங்களை தேடுக...",
      filterBy: "வடிகட்டுதல்",
      filterGender: "பாலினம்",
      filterIncome: "அதிகபட்ச ஆண்டு வருமானம்",
      filterCategory: "திட்டப் பிரிவு",
      sortBy: "வரிசைப்படுத்துதல்",
      sortDefault: "இயல்பு நிலை",
      sortBenefit: "அதிகபட்ச நிதியுதவி (₹)",
      sortEligibility: "அதிக தகுதி வாய்ப்பு",
      noSchemesFound: "உங்கள் தேடலுக்கு ஏற்ற திட்டங்கள் எதுவும் கிடைக்கவில்லை.",
      viewDetails: "முழு விவரங்களை பார்க்க",
      requiredDocs: "தேவையான ஆவணங்கள்",
      howToApply: "விண்ணப்பிக்கும் முறை",
      findCentre: "மையத்தை காண்க",
      saveScheme: "சேமி",
      saved: "சேமிக்கப்பட்டது",
      benefit: "நிதியுதவி / பயன்கள்",
      department: "துறை",
      lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது",
      officialPortal: "அதிகாரப்பூர்வ தளம்",
      helpline: "உதவி எண்",
      eligibilityMatch: "தகுதி பொருத்தம்",
      potentiallyEligible: "சாத்தியமான தகுதி வாய்ப்பு",
      disclaimer: "நீங்கள் வழங்கிய விவரங்களின் அடிப்படையில் தகுதி பெற வாய்ப்புள்ளது. இறுதி தகுதியை சம்பந்தப்பட்ட அரசு துறை மட்டுமே முடிவு செய்யும்."
    },

    // Eligibility Checker Wizard
    eligibility: {
      title: "தானியங்கி திட்ட தகுதி கண்டறிதல்",
      subtitle: "உங்கள் வயது, வருமானம், கல்வி, தொழில் மற்றும் சமூகப் பிரிவின் அடிப்படையில் அரசு விதிகளுடன் AI பொருத்துகிறது.",
      step1: "தனிநபர் & இருப்பிடம்",
      step2: "வருமானம் & தொழில்",
      step3: "கல்வி & சமூகப் பிரிவு",
      step4: "பொருந்திய திட்டங்கள்",
      calculateButton: "எனக்கான தகுதியை கணக்கிடு",
      recalculateButton: "மீண்டும் சரிபார்க்கவும்",
      matchScore: "மதிப்பிடப்பட்ட தகுதி சதவீதம்",
      matchedCount: "நீங்கள் தகுதி பெறக்கூடிய திட்டங்கள்",
      otherCount: "பிற திட்டங்கள்",
      reasonsTitle: "நீங்கள் தகுதி பெறுவதற்கான காரணங்கள்:",
      unmetTitle: "பூர்த்தி செய்ய வேண்டிய நிபந்தனைகள்:"
    },

    // AI Chat Interface
    chat: {
      title: "தமிழ் AI அரசு திட்ட உதவியாளர்",
      subtitle: "தமிழ், ஆங்கிலம் அல்லது தங்க்லீஷில் கேளுங்கள். அதிகாரப்பூர்வ அரசு தரவுகளுடன் பதிலளிக்கும்.",
      welcomeMessage: "வணக்கம்! நான் உங்கள் தமிழ் அரசு திட்ட AI உதவியாளர். தமிழ்நாடு அரசு மற்றும் மத்திய அரசின் அனைத்து திட்டங்கள், தகுதிகள், தேவையான ஆவணங்கள் மற்றும் விண்ணப்பிக்கும் முறைகள் பற்றி என்னிடம் கேட்கலாம்.",
      inputPlaceholder: "உங்கள் கேள்வியை தமிழில் அல்லது ஆங்கிலத்தில் தட்டச்சு செய்யவும்...",
      listening: "உங்கள் குரலை கேட்கிறது... இப்போது தமிழில் பேசுங்கள்",
      speakButton: "பேசுங்கள்",
      sendButton: "அனுப்பு",
      clearChat: "அழி",
      voicePlayback: "குரல் வழி பதில்",
      playVoice: "பதிலை கேளுங்கள்",
      pauseVoice: "நிறுத்து",
      stopVoice: "முழுமையாக நிறுத்து",
      requiredDocsChecklist: "தேவையான ஆவணங்கள் பட்டியல்",
      officialSource: "அதிகாரப்பூர்வ மூலம்",
      stepsToApply: "விண்ணப்பிக்கும் வழிமுறைகள்"
    },

    // Centres Locator & Maps
    centres: {
      title: "அருகிலுள்ள இ-சேவை & விண்ணப்ப மையங்கள்",
      subtitle: "தமிழ்நாட்டின் 38 மாவட்டங்களில் உள்ள இ-சேவை மையங்கள், வட்டாட்சியர் அலுவலகங்கள் மற்றும் CSC மையங்கள்.",
      selectDistrict: "மாவட்டத்தை தேர்ந்தெடுக்கவும்",
      allDistricts: "அனைத்து மாவட்டங்கள்",
      searchCentres: "மையத்தின் பெயர், வட்டம் அல்லது முகவரியை தேடுக...",
      useMyGps: "என் இருப்பிடத்தை பயன்படுத்து",
      getDirections: "கூகுள் மேப் வழித்தடம் காண்க",
      operatingHours: "செயல்படும் நேரம்",
      contactPhone: "தொலைபேசி எண்",
      servicesProvided: "வழங்கப்படும் சேவைகள்",
      distanceKm: "கி.மீ தூரத்தில்"
    },

    // Documents Guide
    docs: {
      title: "தேவையான அரசு சான்றிதழ்கள் பெறும் வழிகாட்டி",
      subtitle: "இ-சேவை மையம், வருவாய்த் துறை மூலம் தேவையான சான்றிதழ்களை பெறுவதற்கான எளிய வழிமுறைகள்.",
      incomeCert: "வருமானச் சான்றிதழ் (Income Certificate)",
      communityCert: "சாதிச் சான்றிதழ் (Community Certificate)",
      firstGradCert: "முதல் பட்டதாரி சான்றிதழ் (First Graduate Certificate)",
      nativityCert: "இருப்பிடச் சான்றிதழ் (Nativity Certificate)",
      smartRation: "ஸ்மார்ட் குடும்ப அட்டை (Ration Card)",
      pattaChitta: "நில பட்டா / சிட்டா (Patta / Chitta)",
      udidCard: "தேசிய மாற்றுத்திறனாளி அடையாள அட்டை (UDID Card)"
    },

    // User Profile Form
    profile: {
      title: "குடிமக்கள் சுயவிவரம் & தகுதி விவரங்கள்",
      subtitle: "உங்கள் விவரங்களை புதுப்பித்து வைத்தால், உங்களுக்கான புதிய திட்டங்களை AI உடனுக்குடன் தெரிவிக்கும்.",
      personalTab: "1. தனிநபர் & இருப்பிடம்",
      economicTab: "2. வருமானம் & தொழில்",
      socialTab: "3. சமூகப் பிரிவு",
      educationTab: "4. கல்வி & மாணவர் நிலை",
      familyTab: "5. குடும்பம் & வீட்டு வசதி",
      fullName: "முழு பெயர்",
      age: "வயது",
      gender: "பாலினம்",
      male: "ஆண்",
      female: "பெண்",
      transgender: "திருநங்கை",
      dateOfBirth: "பிறந்த தேதி",
      state: "மாநிலம்",
      district: "மாவட்டம்",
      taluk: "வட்டம் (Taluk)",
      village: "கிராமம் / நகரம்",
      annualIncome: "குடும்ப ஆண்டு வருமானம் (₹)",
      occupation: "முக்கிய தொழில்",
      employmentStatus: "வேலைவாய்ப்பு நிலை",
      bplStatus: "வறுமைக் கோட்டிற்கு கீழ் உள்ளவரா (BPL)",
      isStudent: "தற்போது படித்து வரும் மாணவரா",
      educationLevel: "கல்வி நிலை",
      course: "படிக்கும் படிப்பு / பட்டப்படிப்பு",
      studiedGovtSchool: "6 முதல் 12-ஆம் வகுப்பு வரை அரசுப் பள்ளியில் படித்தவரா",
      firstGraduate: "குடும்பத்தில் முதல் பட்டதாரியா",
      community: "சமூகப் பிரிவு (Community)",
      hasDisability: "மாற்றுத்திறனாளியா",
      disabilityPercentage: "பாதிப்பு சதவீதம் (%)",
      maritalStatus: "திருமண நிலை",
      isFarmer: "விவசாயியா / நில உரிமையாளரா",
      landAcres: "விவசாய நில அளவு (ஏக்கரில்)",
      isEntrepreneur: "தொழில்முனைவோர் / சிறு தொழில் உரிமையாளரா",
      housingStatus: "வீட்டு வசதி நிலை",
      hasBankAccount: "சேமிப்பு வங்கி கணக்கு உள்ளதா",
      hasAadhaar: "ஆதார் அட்டை உள்ளதா",
      saveProfile: "சுயவிவரத்தை சேமித்து தகுதியை புதுப்பி",
      profileSavedSuccess: "சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது! உங்கள் தகுதி நிலைகள் புதுப்பிக்கப்பட்டுள்ளன."
    },

    // Admin Dashboard
    admin: {
      title: "அரசு திட்டங்கள் நிர்வாக தளம்",
      subtitle: "புதிய திட்டங்களை சேர்த்தல், தகுதிகளை அமைத்தல் மற்றும் பயனாளர்களுக்கு அறிவிப்புகளை அனுப்புதல்.",
      totalSchemes: "மொத்த திட்டங்கள்",
      tnSchemes: "தமிழ்நாடு அரசு திட்டங்கள்",
      centralSchemes: "மத்திய அரசு திட்டங்கள்",
      usersCount: "பதிவு செய்த குடிமக்கள்",
      addNewScheme: "புதிய அரசு திட்டத்தை சேர்க்க",
      manageSchemes: "திட்டங்களை நிர்வகிக்க",
      broadcastAlert: "அறிவிப்பை ஒளிபரப்ப",
      schemeName: "திட்டத்தின் பெயர் (ஆங்கிலம்)",
      tamilName: "திட்டத்தின் பெயர் (தமிழ்)",
      governmentLevel: "அரசு நிலை",
      department: "துறை பெயர்",
      category: "திட்ட பிரிவு",
      benefitAmount: "தோராய நிதியுதவி (₹)",
      publishScheme: "திட்டத்தை வெளியிட்டு பயனாளர்களுக்கு அறிவி"
    }
  }
};
