/**
 * Tamil AI Government Scheme Navigator - Internationalization (i18n) Engine
 * Provides clean, comprehensive switching between Tamil (ta) and English (en).
 */

const translations = {
  ta: {
    // Top Bar
    top_gov_title: "தமிழ்நாடு அரசு | அதிகாரப்பூர்வ அரசு நலத்திட்ட போர்டல்",
    top_helpline: "உதவி எண்: 1100",
    top_portal_link: "tnesevai.tn.gov.in ↗",

    // Brand & Header
    brand_title: "Tamil AI Scheme Navigator",
    brand_subtitle: "தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி",
    nav_schemes: "திட்டங்கள்",
    nav_eligibility: "தகுதி சரிபார்ப்பு",
    nav_assistant: "AI வழிகாட்டி",
    nav_centres: "இ-சேவை மையங்கள்",
    lang_toggle_btn: "English",
    lang_btn_title: "ஆங்கிலத்திற்கு மாற்ற / Switch to English",
    nav_login: "🔑 உள்நுழை",
    nav_logout: "வெளியேறு",
    nav_admin: "⚙️ நிர்வாக பலகை",

    // Hero Section
    hero_title: "அரசு நலத்திட்டங்களை எளிதாக கண்டறியுங்கள்",
    hero_subtitle: "தமிழ்நாடு மற்றும் மத்திய அரசின் கல்வி, மகளிர் நலம், விவசாயம், மருத்துவம் மற்றும் தொழில் நலத்திட்டங்களை எளிய தமிழில் தெரிந்துகொள்ளுங்கள்.",
    hero_search_placeholder: "திட்டத்தின் பெயர் அல்லது முக்கிய சொல்லை உள்ளிடவும்... (எ.கா: மகளிர் உரிமை, கல்வி, PM-KISAN)",
    btn_search: "தேடு",

    // Category Pills
    cat_all: "அனைத்தும்",
    cat_women: "👩 மகளிர் நலம்",
    cat_education: "🎓 கல்வி & உதவித்தொகை",
    cat_farmer: "🌾 விவசாயம்",
    cat_health: "🏥 மருத்துவம்",
    cat_msme: "💼 தொழில் கடன்",
    cat_housing: "🏠 வீட்டுவசதி",

    // Level Buttons
    level_all: "அனைத்து திட்டங்கள்",
    level_tn: "🏛️ தமிழ்நாடு அரசு",
    level_central: "🇮🇳 மத்திய அரசு",

    // Scheme Directory Section
    schemes_section_tag: "SCHEME CATALOGUE",
    schemes_section_title: "அரசு நலத்திட்டங்கள் பட்டியல்",
    schemes_section_desc: "அனைத்து தகுதி வரம்புகள், நிதிப் பயன்கள் மற்றும் தேவையான ஆவணங்களுடன் கூடிய சரிபார்க்கப்பட்ட தகவல்கள்.",
    opt_all_categories: "அனைத்து பிரிவுகள்",
    opt_women_welfare: "மகளிர் நலம்",
    opt_education: "கல்வி & உதவித்தொகை",
    opt_farmer_schemes: "விவசாயிகள் நலம்",
    opt_health: "மருத்துவம் & சுகாதாரம்",
    opt_msme: "சுயதொழில் & MSME",
    opt_housing: "வீட்டுவசதி",
    opt_social_welfare: "சமூக நலம்",
    sort_default: "வரிசைப்படுத்து: பரிந்துரைக்கப்பட்டது",
    sort_benefit_desc: "அதிகபட்ச நிதி பயன்",
    sort_benefit_asc: "குறைந்தபட்ச நிதி பயன்",
    schemes_loading: "திட்டங்கள் கணக்கிடப்படுகிறது...",
    schemes_count: "{n} திட்டங்கள் காட்டப்படுகின்றன",
    schemes_not_found: "திட்டங்கள் எதுவும் பொருந்தவில்லை",
    schemes_not_found_desc: "வேறு முக்கிய சொற்களை அல்லது வகையைத் தேர்ந்தெடுத்து முயற்சிக்கவும்.",
    btn_reset_filters: "வடிப்பான்களை மீட்டமைக்கவும்",
    btn_view_details: "விவரம் & விண்ணப்பிக்கும் வழி ↗",

    // Eligibility Checker Section
    eligibility_section_tag: "SMART ELIGIBILITY ENGINE",
    eligibility_section_title: "உங்கள் தகுதியை சரிபார்க்கவும்",
    eligibility_section_desc: "உங்கள் வயது, பாலினம், வருமானம் மற்றும் சமூகப் பிரிவை உள்ளிட்டு தகுதியான திட்டங்களை உடனடியாக கண்டறியுங்கள்.",
    label_age: "வயது",
    label_gender: "பாலினம்",
    opt_female: "பெண்",
    opt_male: "ஆண்",
    opt_transgender: "மூன்றாம் பாலினம்",
    label_district: "மாவட்டம்",
    opt_select_district: "-- தேர்ந்தெடுக்கவும் --",
    label_occupation: "தொழில் நிலை",
    opt_farmer: "விவசாயி",
    opt_student: "மாணவர்",
    opt_unemployed: "வேலையில்லாதவர்",
    opt_self_employed: "சுயதொழில் / சிறு வணிகம்",
    opt_private_employee: "தனியார் துறை பணியாளர்",
    opt_govt_employee: "அரசு பணியாளர்",
    opt_daily_wage: "தினக்கூலி / தொழிலாளி",
    opt_homemaker: "இல்லத்தரசி",
    label_is_student: "தற்போது பள்ளி / கல்லூரி மாணவரா?",
    opt_yes: "ஆம்",
    opt_no: "இல்லை",
    label_govt_school: "அரசுப் பள்ளியில் (6 முதல் 12 வரை) படித்தவரா?",
    label_income: "ஆண்டு குடும்ப வருமானம் (₹)",
    help_income: "வருமான வரம்பை ஒப்பிட்டு தகுதியை சரிபார்க்க உதவும்.",
    label_community: "சமூகப் பிரிவு",
    btn_check_eligibility: "என் தகுதியைச் சரிபார்க்க",
    eligibility_matching: "உங்கள் விவரங்கள் அரசு விதிகளுடன் ஒப்பிடப்படுகின்றன...",
    eligibility_no_match: "உங்கள் தற்போதைய விவரங்களுக்கு திட்டங்கள் எதுவும் பொருந்தவில்லை",
    eligibility_no_match_desc: "வேறு விவரங்களை உள்ளிட்டு சோதிக்கவும் அல்லது பொதுவான திட்டங்களை தேடவும்.",
    eligibility_notice_title: "முக்கிய அறிவிப்பு",
    eligibility_notice_desc: "இந்த தகுதி முடிவு ஆரம்பநிலை கணிப்பாகும். இறுதி தகுதி மற்றும் பயன்கள் சம்பந்தப்பட்ட அரசுத் துறையின் சரிபார்ப்பிற்கு பிறகே வழங்கப்படும்.",
    eligibility_found_heading: "நீங்கள் தகுதி பெறக்கூடிய {n} சிறந்த திட்டங்கள்:",
    match_percentage: "{p}% பொருத்தம்",
    why_eligible: "தகுதி பொருந்திய காரணங்கள்",

    // AI Chatbot Section
    chatbot_section_tag: "AI SCHEME ASSISTANT",
    chatbot_section_title: "அரசு திட்டங்கள் AI வழிகாட்டி",
    chatbot_section_desc: "அரசு திட்டங்கள், தேவையான ஆவணங்கள் மற்றும் விண்ணப்பிக்கும் வழிமுறைகள் குறித்த உங்கள் சந்தேகங்களுக்கு உடனடி விடை பெறுங்கள்.",
    chat_assistant_name: "Tamil AI Assistant",
    chat_assistant_subtitle: "தமிழ்நாடு மற்றும் மத்திய அரசு திட்ட வழிகாட்டி",
    chat_verified_badge: "🟢 சரிபார்க்கப்பட்ட அரசு தரவுகள்",
    chat_welcome_title: "வணக்கம்! நான் தமிழ்நாடு அரசு திட்டங்கள் AI வழிகாட்டி.",
    chat_welcome_desc: "மகளிர் நலம், கல்வி உதவித்தொகை, விவசாயிகள் நலன், தொழில் கடன், மற்றும் மருத்துவக் காப்பீடு பற்றிய அரசு திட்டங்கள் குறித்த உங்கள் சந்தேகங்களை என்னிடம் கேட்கலாம் அல்லது 🎙️ குரல் மூலம் பேசலாம்.",
    chat_welcome_hint: "கீழே உள்ள விரைவு வினாக்களில் ஒன்றைத் தேர்ந்தெடுக்கலாம் அல்லது உங்கள் கேள்வியை தட்டச்சு செய்யலாம் / பேசலாம்.",
    chat_prompt_women: "👩 பெண்களுக்கான திட்டங்கள்",
    chat_prompt_education: "🎓 கல்வி உதவித்தொகை",
    chat_prompt_farmers: "🌾 விவசாயிகள் திட்டம்",
    chat_prompt_health: "🏥 மருத்துவக் காப்பீடு",
    chat_prompt_business: "💼 தொழில் கடன்",
    chat_input_placeholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும்... அல்லது 🎙️ பேசி கேட்கவும்",
    btn_chat_send: "அனுப்பு",
    voice_recording_btn_title: "குரல் மூலம் கேள்வி கேட்க அழுத்தவும் (Sarvam AI)",
    voice_recording_listening: "🎙️ பேசவும்... (நிறுத்த கிளிக் செய்யவும்)",
    voice_processing: "⏳ குரல் உரையாக மாற்றப்படுகிறது (Sarvam AI)...",
    voice_auto_label_on: "🔊 குரல்: ஆன்",
    voice_auto_label_off: "🔈 குரல்: ஆஃப்",
    btn_listen_tts: "🔊 கேளுங்கள்",
    btn_stop_tts: "⏹️ நிறுத்து",
    chat_typing_status: "⏳ அரசு திட்டத் தகவல்களை ஆராய்கிறது...",

    // e-Sevai Centres Section
    centres_section_tag: "SERVICE CENTRES",
    centres_section_title: "அருகிலுள்ள இ-சேவை மையங்கள்",
    centres_section_desc: "அரசு சான்றிதழ்கள் பெறவும், திட்டங்களுக்கு விண்ணப்பிக்கவும் உங்கள் மாவட்டத்திலுள்ள அங்கீகரிக்கப்பட்ட இ-சேவை மையங்களை கண்டறியுங்கள்.",
    opt_all_districts: "அனைத்து மாவட்டங்கள்",
    centre_search_placeholder: "வட்டம் அல்லது ஊர் பெயர்... (Taluk / Town / PIN)",
    btn_find_centres: "கண்டறி",
    centres_loading: "இ-சேவை மையங்கள் ஏற்றப்படுகின்றன...",
    centres_not_found: "மையங்கள் எதுவும் கிடைக்கவில்லை",
    centres_not_found_desc: "வேறு மாவட்டம் அல்லது நகரை தேடவும்.",
    btn_google_maps: "🧭 Google Maps வழிகாட்டி ↗",
    btn_view_on_map: "🗺️ வரைபடத்தில் பார்க்க",
    btn_locate_near_me: "📍 அருகிலுள்ள மையங்கள்",
    btn_reset_map: "🔄 முழு தமிழ்நாடு",
    map_banner_title: "தமிழ்நாடு இ-சேவை ஊடாடும் வரைபடம்",
    map_legend_text: "அங்கீகரிக்கப்பட்ட இ-சேவை மையங்கள் | பின்களை கிளிக் செய்து விவரங்கள் & வழிகாட்டியை பெறலாம்",

    // Scheme Modal
    modal_title: "🏛️ அரசு திட்ட விவரம்",
    modal_dept: "துறை:",
    modal_benefits: "திட்ட பயன்:",
    modal_desc: "திட்ட விளக்கம்",
    modal_eligibility: "தகுதி வரம்புகள்",
    modal_documents: "தேவையான ஆவணங்கள்",
    modal_docs_hint: "சான்றிதழ்களை உங்கள் அருகிலுள்ள இ-சேவை மையம் அல்லது tnesevai.tn.gov.in மூலம் பெறலாம்.",
    modal_office: "விண்ணப்பிக்கும் இடம் & உதவி எண்",
    modal_helpline: "உதவி எண்:",
    modal_disclaimer_title: "முக்கிய குறிப்பு:",
    modal_disclaimer_desc: "அரசு வழிகாட்டுதலின்படி இறுதி தகுதி துறை அதிகாரிகளால் மட்டுமே தீர்மானிக்கப்படும். அதிகாரப்பூர்வ தளத்தில் உறுதிப்படுத்தவும்.",
    modal_close: "மூடுக",
    modal_apply: "அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்க ↗",

    // Notifications Modal
    notif_title: "🔔 சமீபத்திய அறிவிப்புகள்",
    notif_empty: "அறிவிப்புகள் எதுவும் இல்லை",
    notif_close: "சரி",

    // Footer
    footer_desc: "தமிழ்நாட்டு மக்கள் அரசு நலத்திட்டங்களை எளிதாக அறிந்துகொள்ளவும், தகுதியை சோதிக்கவும், தேவையான ஆவணங்களுடன் விண்ணப்பிக்கவும் உருவாக்கப்பட்ட எளிய வழிகாட்டி தளம்.",
    footer_col_portals: "அதிகாரப்பூர்வ போர்ட்டல்கள்",
    footer_link_tn: "🏛️ தமிழ்நாடு அரசு அதிகாரப்பூர்வ தளம் (tn.gov.in)",
    footer_link_esevai: "🏢 தமிழ்நாடு இ-சேவை போர்டல் (tnesevai.tn.gov.in)",
    footer_link_india: "🇮🇳 இந்திய அரசு தேசிய போர்டல் (india.gov.in)",
    footer_col_features: "முக்கிய அம்சங்கள்",
    footer_feat_schemes: "திட்டங்கள் தேடல்",
    footer_feat_eligibility: "தகுதி சரிபார்ப்பு",
    footer_feat_chatbot: "AI உதவியாளர்",
    footer_feat_centres: "இ-சேவை மையங்கள்",
    footer_col_support: "உதவி & தொடர்பு",
    footer_helpline_text: "அரசு பொது உதவி எண்: 1100",
    footer_cmcell_text: "முதலமைச்சரின் தனிப்பிரிவு: cmcell.tn.gov.in",
    footer_login_link: "🔑 நிர்வாகி / பயனர் உள்நுழைவு",
    footer_copyright: "© 2026 Tamil AI Government Scheme Navigator. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    footer_disclaimer: "அறிவிப்பு: இந்த தளம் சரிபார்க்கப்பட்ட பொது அரசு தகவல்களை வழங்குகிறது. இறுதி தகுதி சம்பந்தப்பட்ட அரசுத் துறையினரால் மட்டுமே தீர்மானிக்கப்படும்."
  },

  en: {
    // Top Bar
    top_gov_title: "Government of Tamil Nadu | Official Welfare Scheme Portal",
    top_helpline: "Helpline: 1100",
    top_portal_link: "tnesevai.tn.gov.in ↗",

    // Brand & Header
    brand_title: "Tamil AI Scheme Navigator",
    brand_subtitle: "AI Government Schemes Navigator",
    nav_schemes: "Schemes",
    nav_eligibility: "Eligibility Checker",
    nav_assistant: "AI Assistant",
    nav_centres: "e-Sevai Centres",
    lang_toggle_btn: "தமிழ்",
    lang_btn_title: "தமிழுக்கு மாற்ற / Switch to Tamil",
    nav_login: "🔑 Login",
    nav_logout: "Logout",
    nav_admin: "⚙️ Admin Dashboard",

    // Hero Section
    hero_title: "Discover Government Welfare Schemes Easily",
    hero_subtitle: "Explore verified Tamil Nadu State and Central Government schemes for education, women welfare, agriculture, health, and business loans in simple language.",
    hero_search_placeholder: "Enter scheme name or keywords... (e.g., Kalaignar Magalir Urimai, Scholarship, PM-KISAN)",
    btn_search: "Search",

    // Category Pills
    cat_all: "All Schemes",
    cat_women: "👩 Women Welfare",
    cat_education: "🎓 Education",
    cat_farmer: "🌾 Agriculture",
    cat_health: "🏥 Health & Medical",
    cat_msme: "💼 Business & Loans",
    cat_housing: "🏠 Housing",

    // Level Buttons
    level_all: "All Schemes",
    level_tn: "🏛️ Tamil Nadu State",
    level_central: "🇮🇳 Central Govt",

    // Scheme Directory Section
    schemes_section_tag: "SCHEME CATALOGUE",
    schemes_section_title: "Government Schemes Directory",
    schemes_section_desc: "Verified information covering all eligibility rules, financial grants, and required application documents.",
    opt_all_categories: "All Categories",
    opt_women_welfare: "Women Welfare",
    opt_education: "Education & Scholarships",
    opt_farmer_schemes: "Farmer Welfare",
    opt_health: "Health & Medical",
    opt_msme: "Business & MSME",
    opt_housing: "Housing",
    opt_social_welfare: "Social Welfare",
    sort_default: "Sort: Recommended",
    sort_benefit_desc: "Highest Financial Benefit",
    sort_benefit_asc: "Lowest Financial Benefit",
    schemes_loading: "Loading verified schemes...",
    schemes_count: "Showing {n} Government Schemes",
    schemes_not_found: "No Matching Schemes Found",
    schemes_not_found_desc: "Please try adjusting your search keywords or resetting category filters.",
    btn_reset_filters: "Reset All Filters",
    btn_view_details: "View Details & Apply ↗",

    // Eligibility Checker Section
    eligibility_section_tag: "SMART ELIGIBILITY ENGINE",
    eligibility_section_title: "Check Your Scheme Eligibility",
    eligibility_section_desc: "Enter your age, gender, annual income, and community to instantly find schemes matching your profile.",
    label_age: "Age",
    label_gender: "Gender",
    opt_female: "Female",
    opt_male: "Male",
    opt_transgender: "Transgender",
    label_district: "District",
    opt_select_district: "-- Select District --",
    label_occupation: "Occupation Status",
    opt_farmer: "Farmer / Agriculture",
    opt_student: "Student",
    opt_unemployed: "Unemployed",
    opt_self_employed: "Self-Employed / Small Business",
    opt_private_employee: "Private Sector Employee",
    opt_govt_employee: "Government Employee",
    opt_daily_wage: "Daily Wage Worker",
    opt_homemaker: "Homemaker",
    label_is_student: "Currently a School / College Student?",
    opt_yes: "Yes",
    opt_no: "No",
    label_govt_school: "Studied in Govt School (6th to 12th)?",
    label_income: "Annual Family Income (₹)",
    help_income: "Used to determine income limit eligibility.",
    label_community: "Community Category",
    btn_check_eligibility: "Check My Eligibility",
    eligibility_matching: "Matching your profile with government scheme rules...",
    eligibility_no_match: "No Matching Schemes Found for Profile",
    eligibility_no_match_desc: "Try adjusting your details or browse the full scheme catalogue.",
    eligibility_notice_title: "Preliminary Result Notice",
    eligibility_notice_desc: "This eligibility result is an automated calculation. Final eligibility and benefits are verified and approved by the respective government department.",
    eligibility_found_heading: "Found {n} Suitable Schemes for You:",
    match_percentage: "{p}% Match",
    why_eligible: "Why You Are Eligible",

    // AI Chatbot Section
    chatbot_section_tag: "AI SCHEME ASSISTANT",
    chatbot_section_title: "AI Government Scheme Assistant",
    chatbot_section_desc: "Get instant answers to your questions regarding scheme guidelines, required certificates, and application steps.",
    chat_assistant_name: "Tamil AI Assistant",
    chat_assistant_subtitle: "Tamil Nadu & Central Welfare Schemes Guide",
    chat_verified_badge: "🟢 Verified Public Data",
    chat_welcome_title: "Hello! I am your AI Government Scheme Navigator.",
    chat_welcome_desc: "Ask me anything about women welfare, scholarships, farmer schemes, business loans, or healthcare support. You can type or 🎙️ speak using voice input.",
    chat_welcome_hint: "Click one of the suggested prompts below or type/speak your question.",
    chat_prompt_women: "👩 Women Welfare Schemes",
    chat_prompt_education: "🎓 Higher Education Scholarships",
    chat_prompt_farmers: "🌾 PM-KISAN & Farmer Subsidies",
    chat_prompt_health: "🏥 CMCHIS Health Insurance",
    chat_prompt_business: "💼 MSME Business Loans",
    chat_input_placeholder: "Type your question in Tamil or English... or click 🎙️ to speak",
    btn_chat_send: "Send",
    voice_recording_btn_title: "Click to ask question with Voice (Sarvam AI)",
    voice_recording_listening: "🎙️ Listening... (Click to finish)",
    voice_processing: "⏳ Transcribing speech (Sarvam AI)...",
    voice_auto_label_on: "🔊 Voice: ON",
    voice_auto_label_off: "🔈 Voice: OFF",
    btn_listen_tts: "🔊 Listen",
    btn_stop_tts: "⏹️ Stop",
    chat_typing_status: "⏳ Finding verified government scheme details...",

    // e-Sevai Centres Section
    centres_section_tag: "SERVICE CENTRES",
    centres_section_title: "Nearby e-Sevai Service Centres",
    centres_section_desc: "Locate authorized e-Sevai centres in your district to apply for schemes and government certificates.",
    opt_all_districts: "All Districts",
    centre_search_placeholder: "Taluk, Town name, or PIN code...",
    btn_find_centres: "Search",
    centres_loading: "Loading e-Sevai centres...",
    centres_not_found: "No e-Sevai Centres Found",
    centres_not_found_desc: "Please select another district or enter a different town.",
    btn_google_maps: "🧭 Directions (Google Maps) ↗",
    btn_view_on_map: "🗺️ View on Map",
    btn_locate_near_me: "📍 Locate Near Me",
    btn_reset_map: "🔄 Whole State View",
    map_banner_title: "Tamil Nadu e-Sevai Interactive Map",
    map_legend_text: "Authorized e-Sevai Centres | Click pins for address, hours & live directions",

    // Scheme Modal
    modal_title: "🏛️ Scheme Details",
    modal_dept: "Department:",
    modal_benefits: "Scheme Benefits:",
    modal_desc: "Scheme Description",
    modal_eligibility: "Eligibility Conditions",
    modal_documents: "Required Documents",
    modal_docs_hint: "Certificates can be availed at your nearest e-Sevai centre or via tnesevai.tn.gov.in.",
    modal_office: "Application Office & Helpline",
    modal_helpline: "Helpline:",
    modal_disclaimer_title: "Verification Notice:",
    modal_disclaimer_desc: "Final eligibility and benefit disbursement are subject to verification by the respective government department.",
    modal_close: "Close",
    modal_apply: "Apply on Official Portal ↗",

    // Notifications Modal
    notif_title: "🔔 Recent Notifications",
    notif_empty: "No new notifications",
    notif_close: "Close",

    // Footer
    footer_desc: "A public welfare navigator built to help citizens easily discover, check eligibility, and apply for government schemes.",
    footer_col_portals: "Official Portals",
    footer_link_tn: "🏛️ Government of Tamil Nadu (tn.gov.in)",
    footer_link_esevai: "🏢 TN e-Sevai Portal (tnesevai.tn.gov.in)",
    footer_link_india: "🇮🇳 National Portal of India (india.gov.in)",
    footer_col_features: "Key Features",
    footer_feat_schemes: "Schemes Directory",
    footer_feat_eligibility: "Eligibility Checker",
    footer_feat_chatbot: "AI Assistant",
    footer_feat_centres: "e-Sevai Locator",
    footer_col_support: "Support & Helpline",
    footer_helpline_text: "General Public Helpline: 1100",
    footer_cmcell_text: "Chief Minister Special Cell: cmcell.tn.gov.in",
    footer_login_link: "🔑 Admin / Citizen Login",
    footer_copyright: "© 2026 Tamil AI Government Scheme Navigator. All rights reserved.",
    footer_disclaimer: "Disclaimer: This educational application provides verified public government data. Final eligibility is determined by relevant departments."
  }
};

/**
 * Get current active language code ('ta' or 'en')
 */
function getCurrentLanguage() {
  return localStorage.getItem('app_lang') || 'ta';
}

/**
 * Get translated text for a specific key
 */
function t(key, params = {}) {
  const lang = getCurrentLanguage();
  let text = (translations[lang] && translations[lang][key]) || (translations['ta'] && translations['ta'][key]) || key;
  Object.keys(params).forEach(p => {
    text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
  });
  return text;
}

/**
 * Apply language to all elements in the DOM with data-i18n attributes
 */
function applyTranslations(targetLang) {
  const lang = targetLang || getCurrentLanguage();
  document.documentElement.lang = lang;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // HTML content (for elements containing icons/formatting)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (key) {
      el.innerHTML = t(key);
    }
  });

  // Placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });

  // Title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });

  // Value attributes (e.g. submit buttons)
  document.querySelectorAll('[data-i18n-value]').forEach(el => {
    const key = el.getAttribute('data-i18n-value');
    if (key) {
      el.value = t(key);
    }
  });

  // Update Language Switcher Button Label
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.textContent = lang === 'ta' ? 'English' : 'தமிழ்';
    langBtn.title = t('lang_btn_title');
  }

  // Update Page Title
  document.title = lang === 'ta'
    ? 'Tamil AI Government Scheme Navigator | தமிழ் அரசு திட்டங்கள் AI வழிகாட்டி'
    : 'Tamil AI Government Scheme Navigator | Official Citizen Welfare Schemes Portal';
}

// Global exposure
window.i18n = {
  translations,
  getCurrentLanguage,
  t,
  applyTranslations
};
