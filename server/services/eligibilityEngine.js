/**
 * Eligibility Matching Engine for Tamil AI Government Scheme Navigator
 * Evaluates citizen profile against structured rules of Central and State schemes.
 */

export function evaluateEligibility(userProfile, scheme) {
  const criteria = scheme.eligibilityCriteria || {};
  let totalRules = 0;
  let passedRules = 0;
  const matchReasons = [];
  const unmetReasons = [];

  // If user profile is empty, return base info
  if (!userProfile) {
    return {
      matchPercentage: 0,
      status: "PROFILE_INCOMPLETE",
      label: "Incomplete Profile",
      tamilLabel: "சுயவிவரம் முழுமையடையவில்லை",
      isPotentiallyEligible: false,
      matchReasons: [],
      unmetReasons: ["Please complete your profile to verify eligibility."]
    };
  }

  // 1. Age Rule
  if (criteria.minAge !== undefined || criteria.maxAge !== undefined) {
    totalRules += 2;
    const userAge = parseInt(userProfile.age) || 0;
    const minOk = criteria.minAge === undefined || userAge >= criteria.minAge;
    const maxOk = criteria.maxAge === undefined || userAge <= criteria.maxAge;

    if (minOk && maxOk) {
      passedRules += 2;
      matchReasons.push(`Age ${userAge} qualifies within required age range (${criteria.minAge || 0} - ${criteria.maxAge || 100} yrs).`);
    } else {
      if (!minOk) unmetReasons.push(`Minimum age required is ${criteria.minAge} years (Your age: ${userAge}).`);
      if (!maxOk) unmetReasons.push(`Maximum age limit is ${criteria.maxAge} years (Your age: ${userAge}).`);
      if (minOk || maxOk) passedRules += 1;
    }
  }

  // 2. Gender Rule
  if (criteria.gender && criteria.gender !== "ALL") {
    totalRules += 2;
    const userGender = (userProfile.gender || "").toUpperCase();
    if (userGender === criteria.gender || (criteria.gender === "FEMALE" && userGender === "TRANSGENDER")) {
      passedRules += 2;
      matchReasons.push(`Gender requirement matches (${criteria.gender}).`);
    } else {
      unmetReasons.push(`This scheme is exclusively designated for ${criteria.gender.toLowerCase()} applicants.`);
    }
  } else {
    // Open to all genders
    totalRules += 1;
    passedRules += 1;
    matchReasons.push("Applicable to all genders.");
  }

  // 3. State & Location Rule
  totalRules += 1;
  const userState = (userProfile.state || "Tamil Nadu").toLowerCase();
  if (scheme.governmentLevel === "TAMIL_NADU") {
    if (userState.includes("tamil nadu") || userState.includes("tn")) {
      passedRules += 1;
      matchReasons.push("Tamil Nadu state residency requirement satisfied.");
    } else {
      unmetReasons.push("Must be a permanent resident of Tamil Nadu.");
    }
  } else {
    // Central Scheme
    passedRules += 1;
    matchReasons.push("National scheme available to all Indian citizens.");
  }

  // 4. Annual Income Rule
  if (criteria.maxAnnualIncome) {
    totalRules += 2;
    const userIncome = parseFloat(userProfile.annualIncome) || 0;
    if (userIncome <= criteria.maxAnnualIncome) {
      passedRules += 2;
      matchReasons.push(`Annual family income (₹${userIncome.toLocaleString('en-IN')}) is well within the ceiling limit of ₹${criteria.maxAnnualIncome.toLocaleString('en-IN')}.`);
    } else {
      unmetReasons.push(`Family annual income (₹${userIncome.toLocaleString('en-IN')}) exceeds maximum income ceiling of ₹${criteria.maxAnnualIncome.toLocaleString('en-IN')}.`);
    }
  }

  // 5. Student Status & Education Level
  if (criteria.studentOnly) {
    totalRules += 2;
    const isStudent = userProfile.isStudent === true || userProfile.isStudent === "true" || userProfile.occupation === "Student";
    if (isStudent) {
      passedRules += 2;
      matchReasons.push("Active student enrollment requirement met.");
    } else {
      unmetReasons.push("Applicant must be a currently enrolled student.");
    }
  }

  // 5b. Govt School 6th to 12th Study (Pudhumai Penn & Tamil Puthalvan)
  if (criteria.govtSchoolStudiedRequired) {
    totalRules += 2;
    const studiedGovt = userProfile.govtSchoolStudied === true || userProfile.govtSchoolStudied === "true" || userProfile.studiedGovtSchool6to12 === true;
    if (studiedGovt) {
      passedRules += 2;
      matchReasons.push("Studied Classes 6th to 12th in Tamil Nadu Government School.");
    } else {
      unmetReasons.push("Requires studying in Tamil Nadu Government School from Class 6 to 12.");
    }
  }

  // 5c. First Graduate in Family
  if (criteria.firstGraduateInFamily) {
    totalRules += 2;
    const isFirstGrad = userProfile.isFirstGraduate === true || userProfile.isFirstGraduate === "true";
    if (isFirstGrad) {
      passedRules += 2;
      matchReasons.push("First graduate candidate in family status matched.");
    } else {
      unmetReasons.push("Applicant must be the first person in family to pursue a graduate degree.");
    }
  }

  // 6. Community / Caste Rule (e.g. SC/ST/BC/MBC Post-Matric)
  if (criteria.communityList && criteria.communityList.length > 0) {
    totalRules += 2;
    const userCommunity = (userProfile.community || "").toUpperCase();
    if (criteria.communityList.includes(userCommunity)) {
      passedRules += 2;
      matchReasons.push(`Community category (${userCommunity}) qualifies under eligible list (${criteria.communityList.join(', ')}).`);
    } else {
      unmetReasons.push(`Scheme targets communities: ${criteria.communityList.join(', ')}. (Your community: ${userCommunity || 'Not provided'}).`);
    }
  }

  // 7. Farmer / Agriculture Status
  if (criteria.farmerOnly) {
    totalRules += 2;
    const isFarmer = userProfile.isFarmer === true || userProfile.isFarmer === "true" || userProfile.occupation === "Farmer" || userProfile.occupation === "Agricultural Laborer";
    if (isFarmer) {
      passedRules += 2;
      matchReasons.push("Agricultural / Farmer occupation verified.");
    } else {
      unmetReasons.push("Applicant must be a farmer or agricultural worker.");
    }
  }

  // 8. Disability Welfare Status
  if (criteria.disabilityStatus === "YES") {
    totalRules += 2;
    const isPwD = userProfile.hasDisability === true || userProfile.hasDisability === "true" || userProfile.disabilityStatus === "YES";
    if (isPwD) {
      passedRules += 2;
      matchReasons.push("Differently Abled (PwD) welfare eligibility matched.");
    } else {
      unmetReasons.push("Scheme is exclusively for Persons with Disabilities (PwD).");
    }
  }

  // 9. Entrepreneur / MSME
  if (criteria.entrepreneurOnly) {
    totalRules += 2;
    const isEntr = userProfile.isEntrepreneur === true || userProfile.isEntrepreneur === "true" || userProfile.occupation === "Business" || userProfile.occupation === "Entrepreneur" || userProfile.occupation === "Self-Employed";
    if (isEntr) {
      passedRules += 2;
      matchReasons.push("Entrepreneurial / business profile matched.");
    } else {
      unmetReasons.push("Applicant should be an aspiring or existing entrepreneur.");
    }
  }

  // 10. Widow Status
  if (criteria.maritalStatus === "WIDOW") {
    totalRules += 2;
    const isWidow = userProfile.maritalStatus === "WIDOW" || userProfile.isWidow === true;
    if (isWidow) {
      passedRules += 2;
      matchReasons.push("Destitute widow status matched.");
    } else {
      unmetReasons.push("Scheme is specifically for destitute widows.");
    }
  }

  // Calculate percentage
  const matchPercentage = totalRules > 0 ? Math.min(100, Math.round((passedRules / totalRules) * 100)) : 50;

  let status = "PARTIALLY_ELIGIBLE";
  let label = "Partially Eligible";
  let tamilLabel = "பகுதி தகுதி வாய்ப்பு";
  let isPotentiallyEligible = false;

  if (matchPercentage >= 80 && unmetReasons.length === 0) {
    status = "HIGHLY_ELIGIBLE";
    label = "Potentially Eligible – High Match";
    tamilLabel = "தகுதி பெற அதிக வாய்ப்புள்ளது";
    isPotentiallyEligible = true;
  } else if (matchPercentage >= 65 && unmetReasons.length <= 1) {
    status = "POTENTIALLY_ELIGIBLE";
    label = "Potentially Eligible – Estimated Match";
    tamilLabel = "சாத்தியமான தகுதி வாய்ப்பு";
    isPotentiallyEligible = true;
  } else if (matchPercentage >= 40) {
    status = "PARTIALLY_ELIGIBLE";
    label = "Check Specific Requirements";
    tamilLabel = "விதிமுறைகளை சரிபார்க்கவும்";
    isPotentiallyEligible = false;
  } else {
    status = "NOT_ELIGIBLE";
    label = "Criteria Not Met";
    tamilLabel = "தகுதி வரம்பிற்குள் வரவில்லை";
    isPotentiallyEligible = false;
  }

  return {
    matchPercentage,
    status,
    label,
    tamilLabel,
    isPotentiallyEligible,
    passedRules,
    totalRules,
    matchReasons,
    unmetReasons,
    disclaimer: "Based on your profile details, you may be eligible. Final eligibility is determined by the concerned government department."
  };
}

/**
 * Evaluates full scheme list against a user profile and returns sorted matched schemes
 */
export function matchUserSchemes(userProfile, schemesList) {
  if (!schemesList || !Array.isArray(schemesList)) return [];

  return schemesList.map(scheme => {
    const evaluation = evaluateEligibility(userProfile, scheme);
    return {
      ...scheme,
      eligibilityMatch: evaluation
    };
  }).sort((a, b) => b.eligibilityMatch.matchPercentage - a.eligibilityMatch.matchPercentage);
}
