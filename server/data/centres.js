/**
 * Database of Tamil Nadu e-Seva Centres (இ-சேவை மையங்கள்), Taluk Offices, and CSCs
 * Covers key districts with coordinates, addresses, phone numbers, and operational hours.
 */

export const SERVICE_CENTRES = [
  // CHENNAI
  {
    id: "centre-chn-01",
    name: "TNeGA e-Seva Centre - Ripon Building (Chennai Corporation)",
    tamilName: "இ-சேவை மையம் - ரிப்பன் மாளிகை (சென்னை மாநகராட்சி)",
    type: "e-Seva Centre",
    district: "Chennai",
    taluk: "Fort-Tondiarpet",
    address: "Ripon Building Ground Floor, Sydenhams Road, Periyamet, Chennai - 600003",
    tamilAddress: "ரிப்பன் மாளிகை தரைத்தளம், பெரியமேடு, சென்னை - 600003",
    pincode: "600003",
    phone: "044-25619222",
    email: "chennai-eseva@tnega.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 13.0827,
    lng: 80.2707,
    servicesProvided: ["All TN Govt Certificates", "Pudhumai Penn Registration", "Kalaignar Magalir Urimai Helpdesk", "Ration Card Changes", "Patta/Chitta", "Revenue Services"]
  },
  {
    id: "centre-chn-02",
    name: "Taluk Office e-Seva Centre - Mylapore",
    tamilName: "வட்டாட்சியர் அலுவலக இ-சேவை மையம் - மயிலாப்பூர்",
    type: "Taluk Office",
    district: "Chennai",
    taluk: "Mylapore",
    address: "Mylapore Taluk Office, Greenways Road, Raja Annamalaipuram, Chennai - 600028",
    tamilAddress: "மயிலாப்பூர் வட்டாட்சியர் அலுவலகம், கிரீன்வேஸ் சாலை, சென்னை - 600028",
    pincode: "600028",
    phone: "044-24937788",
    email: "tah.mylapore@tn.gov.in",
    operatingHours: "Monday - Friday: 10:00 AM - 5:00 PM",
    lat: 13.0289,
    lng: 80.2582,
    servicesProvided: ["Income Certificate", "Community Certificate", "First Graduate Certificate", "Destitute Widow Pension", "Old Age Pension"]
  },
  {
    id: "centre-chn-03",
    name: "District Industries Centre (DIC) - Guindy",
    tamilName: "மாவட்ட தொழில் மையம் (DIC) - கிண்டி",
    type: "District Industries Centre",
    district: "Chennai",
    taluk: "Guindy",
    address: "Thiru Vi Ka Industrial Estate, Guindy, Chennai - 600032",
    tamilAddress: "திரு வி க தொழிற்பேட்டை, கிண்டி, சென்னை - 600032",
    pincode: "600032",
    phone: "044-22501002",
    email: "dicchennai@tn.gov.in",
    operatingHours: "Monday - Friday: 9:30 AM - 6:00 PM",
    lat: 13.0067,
    lng: 80.2023,
    servicesProvided: ["NEEDS Scheme Application", "MUDRA Loan Facilitation", "Udyam MSME Registration", "PMEGP Subsidies"]
  },

  // COIMBATORE
  {
    id: "centre-cbe-01",
    name: "District Collectorate e-Seva Centre - Coimbatore",
    tamilName: "மாவட்ட ஆட்சியர் அலுவலக இ-சேவை மையம் - கோயம்புத்தூர்",
    type: "Collectorate / e-Seva",
    district: "Coimbatore",
    taluk: "Coimbatore South",
    address: "District Collector Office Campus, State Bank Road, Gopalapuram, Coimbatore - 641018",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலக வளாகம், ஸ்டேட் பேங்க் ரோடு, கோயம்புத்தூர் - 641018",
    pincode: "641018",
    phone: "0422-2301114",
    email: "collr-cbe@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 11.0016,
    lng: 76.9665,
    servicesProvided: ["CMCHIS Card Enrollment", "Differently Abled Welfare Cards", "Revenue Certificates", "Farmer Welfare Registrations"]
  },
  {
    id: "centre-cbe-02",
    name: "PACCS e-Seva Centre - Gandhipuram",
    tamilName: "தொடக்க வேளாண் கூட்டுறவு வங்கி இ-சேவை மையம் - காந்திபுரம்",
    type: "e-Seva Centre",
    district: "Coimbatore",
    taluk: "Coimbatore North",
    address: "7th Street, Cross Cut Road, Gandhipuram, Coimbatore - 641012",
    tamilAddress: "7-வது தெரு, கிராஸ் கட் ரோடு, காந்திபுரம், கோயம்புத்தூர் - 641012",
    pincode: "641012",
    phone: "0422-2495671",
    email: "eseva.gandhipuram@tnega.in",
    operatingHours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    lat: 11.0168,
    lng: 76.9682,
    servicesProvided: ["All Online Govt Certificates", "TNPDS Smart Card corrections", "PM-KISAN e-KYC", "Electricity Bill"]
  },

  // MADURAI
  {
    id: "centre-mdu-01",
    name: "Madurai District Collectorate e-Seva & CMCHIS Centre",
    tamilName: "மதுரை மாவட்ட ஆட்சியர் அலுவலக இ-சேவை & CMCHIS மையம்",
    type: "Collectorate / CMCHIS Centre",
    district: "Madurai",
    taluk: "Madurai North",
    address: "District Collectorate, Shenoy Nagar, Madurai - 625020",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலகம், செனாய் நகர், மதுரை - 625020",
    pincode: "625020",
    phone: "0452-2531110",
    email: "collrmdu@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 9.9252,
    lng: 78.1408,
    servicesProvided: ["CMCHIS Smart Cards", "Uzhavar Pathukappu Thittam", "Post-Matric Scholarship Helpdesk", "All TNeGA Certificates"]
  },
  {
    id: "centre-mdu-02",
    name: "Taluk Office e-Seva Centre - Madurai South",
    tamilName: "தெற்கு வட்டாட்சியர் அலுவலக இ-சேவை மையம் - மதுரை",
    type: "Taluk Office",
    district: "Madurai",
    taluk: "Madurai South",
    address: "Mahal Road, Near Thirumalai Nayakar Mahal, Madurai - 625001",
    tamilAddress: "மஹால் ரோடு, திருமலை நாயக்கர் மஹால் அருகில், மதுரை - 625001",
    pincode: "625001",
    phone: "0452-2334455",
    email: "tah.mdusouth@tn.gov.in",
    operatingHours: "Monday - Friday: 10:00 AM - 5:00 PM",
    lat: 9.9154,
    lng: 78.1242,
    servicesProvided: ["Community, Nativity & Income Certificates", "Destitute Widow Pension", "First Graduate Certificate"]
  },

  // TIRUCHIRAPPALLI (TRICHY)
  {
    id: "centre-try-01",
    name: "Tiruchirappalli Collectorate e-Seva Kiosk",
    tamilName: "திருச்சிராப்பள்ளி ஆட்சியரகம் இ-சேவை மையம்",
    type: "Collectorate",
    district: "Tiruchirappalli",
    taluk: "Tiruchirappalli West",
    address: "District Collector Office, Cantonment, Tiruchirappalli - 620001",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலகம், கண்டோன்மென்ட், திருச்சிராப்பள்ளி - 620001",
    pincode: "620001",
    phone: "0431-2415358",
    email: "collrtry@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 10.7905,
    lng: 78.6856,
    servicesProvided: ["CMCHIS Card Enrollment", "Pudhumai Penn Registration", "UDID Differently Abled Cards", "Revenue Records"]
  },

  // SALEM
  {
    id: "centre-slm-01",
    name: "Salem Collectorate TNeGA Integrated Centre",
    tamilName: "சேலம் மாவட்ட ஆட்சியர் ஒருங்கிணைந்த இ-சேவை மையம்",
    type: "Collectorate",
    district: "Salem",
    taluk: "Salem",
    address: "District Collectorate Building, Bretts Road, Salem - 636001",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலகம், பிரெட்ஸ் ரோடு, சேலம் - 636001",
    pincode: "636001",
    phone: "0427-2450111",
    email: "collrslm@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 11.6643,
    lng: 78.1460,
    servicesProvided: ["PM-KISAN e-KYC", "Kalaignar Magalir Urimai Verification", "Uzhavar Pathukappu", "Scholarships"]
  },

  // TIRUNELVELI
  {
    id: "centre-ten-01",
    name: "Tirunelveli District Collectorate e-Seva Centre",
    tamilName: "திருநெல்வேலி மாவட்ட ஆட்சியர் அலுவலக இ-சேவை மையம்",
    type: "Collectorate",
    district: "Tirunelveli",
    taluk: "Palayamkottai",
    address: "Collectorate Complex, Kokkirakulam, Tirunelveli - 627009",
    tamilAddress: "ஆட்சியர் அலுவலக வளாகம், கொக்கிரகுளம், திருநெல்வேலி - 627009",
    pincode: "627009",
    phone: "0462-2500828",
    email: "collrtnv@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 8.7274,
    lng: 77.7280,
    servicesProvided: ["Fishermen Welfare Services", "Farmer Registrations", "Women Welfare Schemes", "All TNeGA Certificates"]
  },

  // THANJAVUR
  {
    id: "centre-tj-01",
    name: "Thanjavur Taluk & e-Seva Centre",
    tamilName: "தஞ்சாவூர் வட்டாட்சியர் & இ-சேவை மையம்",
    type: "Taluk Office",
    district: "Thanjavur",
    taluk: "Thanjavur",
    address: "Taluk Office Compound, Court Road, Thanjavur - 613001",
    tamilAddress: "வட்டாட்சியர் அலுவலக வளாகம், கோர்ட் ரோடு, தஞ்சாவூர் - 613001",
    pincode: "613001",
    phone: "04362-230021",
    email: "tah.thanjavur@tn.gov.in",
    operatingHours: "Monday - Friday: 10:00 AM - 5:30 PM",
    lat: 10.7870,
    lng: 79.1378,
    servicesProvided: ["Uzhavar Pathukappu Thittam", "PM-KISAN e-KYC & Land Seeding", "Crop Insurance Registration", "Patan / Chitta copies"]
  },

  // VELLORE
  {
    id: "centre-vel-01",
    name: "Vellore District Collectorate e-Seva Centre",
    tamilName: "வேலூர் மாவட்ட ஆட்சியர் அலுவலக இ-சேவை மையம்",
    type: "Collectorate",
    district: "Vellore",
    taluk: "Vellore",
    address: "Collectorate Master Plan Complex, Sathuvachari, Vellore - 632009",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலக வளாகம், சத்துவாச்சாரி, வேலூர் - 632009",
    pincode: "632009",
    phone: "0416-2252110",
    email: "collrvel@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 12.9246,
    lng: 79.1668,
    servicesProvided: ["All Online Govt Certificates", "Ration Card corrections", "CMCHIS Enrollment", "OAP Pensions"]
  },

  // ERODE
  {
    id: "centre-erd-01",
    name: "Erode District Collectorate e-Seva Centre",
    tamilName: "ஈரோடு மாவட்ட ஆட்சியர் அலுவலக இ-சேவை மையம்",
    type: "Collectorate",
    district: "Erode",
    taluk: "Erode",
    address: "District Collectorate, Perundurai Road, Erode - 638011",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலகம், பெருந்துறை ரோடு, ஈரோடு - 638011",
    pincode: "638011",
    phone: "0424-2260226",
    email: "collrerd@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 11.3410,
    lng: 77.7172,
    servicesProvided: ["Uzhavar Pathukappu", "Pudhumai Penn Registration", "MSME Subsidies", "TNPDS Services"]
  },

  // TIRUPPUR
  {
    id: "centre-tpr-01",
    name: "Tiruppur Collectorate e-Seva Centre",
    tamilName: "திருப்பூர் மாவட்ட ஆட்சியரகம் இ-சேவை மையம்",
    type: "Collectorate",
    district: "Tiruppur",
    taluk: "Tiruppur South",
    address: "District Collectorate, Cotton Market Building, Palladam Road, Tiruppur - 641604",
    tamilAddress: "மாவட்ட ஆட்சியர் அலுவலகம், பல்லடம் ரோடு, திருப்பூர் - 641604",
    pincode: "641604",
    phone: "0421-2971100",
    email: "collrtpr@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 11.1085,
    lng: 77.3411,
    servicesProvided: ["Textile Worker Welfare Cards", "Revenue Certificates", "CMCHIS Registration", "MSME Needs Schemes"]
  },

  // KANNYAKUMARI
  {
    id: "centre-kk-01",
    name: "Kanyakumari Collectorate e-Seva Centre - Nagercoil",
    tamilName: "கன்னியாகுமரி மாவட்ட ஆட்சியர் இ-சேவை மையம் - நாகர்கோவில்",
    type: "Collectorate",
    district: "Kanniyakumari",
    taluk: "Agastheeswaram",
    address: "District Collectorate, Nagercoil, Kanniyakumari - 629001",
    tamilAddress: "மாவட்ட ஆட்சியரகம், நாகர்கோவில், கன்னியாகுமரி - 629001",
    pincode: "629001",
    phone: "04652-279555",
    email: "collrkkm@nic.in",
    operatingHours: "Monday - Saturday: 9:30 AM - 5:30 PM",
    lat: 8.1833,
    lng: 77.4119,
    servicesProvided: ["Fishermen Welfare Subsidies", "Revenue Certificates", "Pudhumai Penn Helpdesk", "Community & Income Certificates"]
  },

  // KANCHIPURAM
  {
    id: "centre-kch-01",
    name: "Kanchipuram Taluk e-Seva Centre",
    tamilName: "காஞ்சிபுரம் வட்டாட்சியர் இ-சேவை மையம்",
    type: "Taluk Office",
    district: "Kancheepuram",
    taluk: "Kanchipuram",
    address: "Taluk Office, Gandhi Road, Kanchipuram - 631501",
    tamilAddress: "வட்டாட்சியர் அலுவலகம், காந்தி ரோடு, காஞ்சிபுரம் - 631501",
    pincode: "631501",
    phone: "044-27222333",
    email: "tah.kanchipuram@tn.gov.in",
    operatingHours: "Monday - Friday: 10:00 AM - 5:30 PM",
    lat: 12.8342,
    lng: 79.7036,
    servicesProvided: ["Weaver Welfare Assistance", "First Graduate Certificate", "Patta Transfer Services", "All TNeGA Certificates"]
  }
];

export const DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
  "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanniyakumari", "Karur",
  "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
  "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
  "Viluppuram", "Virudhunagar"
];
