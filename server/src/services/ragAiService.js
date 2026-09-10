/**
 * RAG AI Knowledge & Scheme Matching Engine
 * Personalized Scheme Recommendations based on Stored User Profile,
 * Bilingual Tamil/English NLP intent parsing, document checklist generation, and citations.
 */

import { SCHEMES } from '../data/schemes.js';
import { evaluateEligibility } from './eligibilityEngine.js';

/**
 * Language detection helper
 */
export function detectQueryLanguage(text) {
  if (!text) return 'en';
  // Check for Tamil Unicode character range (U+0B80 to U+0BFF)
  const tamilRegex = /[\u0B80-\u0BFF]/;
  if (tamilRegex.test(text)) return 'ta';

  // Check for Tanglish common keywords
  const tanglishWords = ['thittam', 'enakku', 'enna', 'thittangal', 'aarambikka', 'vaanga', 'thevai', 'pengal', 'kadan', 'kalloori', 'manavargal', 'tamilnadu', 'arasaangam', 'maruthuva', 'seithi'];
  const words = text.toLowerCase().split(/\s+/);
  const isTanglish = words.some(w => tanglishWords.includes(w));
  if (isTanglish) return 'tanglish';

  return 'en';
}

/**
 * Enhanced Scheme retrieval with User Profile Matching
 */
export function retrieveRelevantSchemes(query, userProfile = null) {
  const q = query.toLowerCase();

  const scored = SCHEMES.map(scheme => {
    let score = 0;
    const titleEn = scheme.schemeName.toLowerCase();
    const titleTa = scheme.tamilName.toLowerCase();
    const descEn = scheme.description.toLowerCase();
    const descTa = scheme.tamilDescription.toLowerCase();
    const dept = (scheme.department + ' ' + scheme.tamilDepartment).toLowerCase();
    const cat = scheme.category.toLowerCase();

    // Query Keyword matches
    const tokens = q.split(/\s+/).filter(t => t.length > 2);
    tokens.forEach(tok => {
      if (titleEn.includes(tok) || titleTa.includes(tok)) score += 35;
      if (descEn.includes(tok) || descTa.includes(tok)) score += 15;
      if (dept.includes(tok)) score += 20;
      if (cat.includes(tok)) score += 25;
    });

    // Sector Intent mappings
    if (q.includes('woman') || q.includes('women') || q.includes('girl') || q.includes('பெண்') || q.includes('மகளிர்') || q.includes('pengal')) {
      if (scheme.category === 'Women Welfare' || scheme.eligibilityCriteria?.gender === 'FEMALE') score += 40;
    }
    if (q.includes('student') || q.includes('college') || q.includes('school') || q.includes('scholarship') || q.includes('கல்வி') || q.includes('மாணவ') || q.includes('படிப்பு')) {
      if (scheme.category === 'Education' || scheme.category === 'Higher Education') score += 40;
    }
    if (q.includes('farmer') || q.includes('agriculture') || q.includes('crop') || q.includes('விவசாயி') || q.includes('உழவர்') || q.includes('பயிர்')) {
      if (scheme.category === 'Farmer Schemes' || scheme.category === 'Agriculture') score += 40;
    }
    if (q.includes('loan') || q.includes('business') || q.includes('startup') || q.includes('msme') || q.includes('தொழில்') || q.includes('கடன்') || q.includes('mudra')) {
      if (scheme.category === 'MSME' || scheme.category === 'Employment & Skill') score += 40;
    }
    if (q.includes('health') || q.includes('hospital') || q.includes('medical') || q.includes('insurance') || q.includes('மருத்துவம்') || q.includes('காப்பீடு') || q.includes('சிகிச்சை')) {
      if (scheme.category === 'Health' || scheme.category === 'Social Welfare') score += 40;
    }
    if (q.includes('house') || q.includes('housing') || q.includes('home') || q.includes('வீடு') || q.includes('குடியிருப்பு')) {
      if (scheme.category === 'Housing') score += 40;
    }

    // Profile match bonus
    let evalMatch = null;
    if (userProfile) {
      evalMatch = evaluateEligibility(userProfile, scheme);
      if (evalMatch.isPotentiallyEligible) {
        score += evalMatch.matchPercentage / 2;
      }
    }

    return {
      scheme,
      score,
      eligibility: evalMatch
    };
  });

  // Sort descending by score
  const sorted = scored.sort((a, b) => b.score - a.score);
  return sorted.slice(0, 5);
}

/**
 * Main AI Scheme Query Processor with Profile Personalization
 */
export async function processAiSchemeQuery(query, userProfile = null, preferredLang = null) {
  const detectedLang = detectQueryLanguage(query);
  const targetLang = preferredLang || (detectedLang === 'ta' ? 'ta' : detectedLang === 'tanglish' ? 'ta' : 'en');
  
  const relevantResults = retrieveRelevantSchemes(query, userProfile);
  const matchedSchemes = relevantResults.map(r => r.scheme);
  const primaryMatch = matchedSchemes[0] || SCHEMES[0];

  const qLower = query.toLowerCase();
  const isDocQuery = qLower.includes('doc') || qLower.includes('certificate') || qLower.includes('சான்றிதழ்') || qLower.includes('ஆவணம்') || qLower.includes('thevai');
  const isApplyQuery = qLower.includes('apply') || qLower.includes('how to') || qLower.includes('எப்படி') || qLower.includes('விண்ணப்பிக்க') || qLower.includes('process');
  const isProfileQuery = userProfile && (
    qLower.includes('eligible') || 
    qLower.includes('eligibility') || 
    qLower.includes('தகுதி') || 
    qLower.includes('qualification') || 
    qLower.includes('for me') || 
    qLower.includes('my scheme') || 
    qLower.includes('எனக்கு') || 
    qLower.includes('என்ன திட்டம்') ||
    qLower.includes('what schemes')
  );

  let answerText = "";
  let requiredDocsSummary = [];

  if (targetLang === 'ta') {
    // TAMIL RESPONSES
    if (isProfileQuery && userProfile) {
      const allEvaluated = SCHEMES.map(s => ({
        scheme: s,
        eval: evaluateEligibility(userProfile, s)
      })).filter(item => item.eval.isPotentiallyEligible)
        .sort((a, b) => b.eval.matchPercentage - a.eval.matchPercentage);

      const topSchemes = allEvaluated.slice(0, 4);

      answerText = `### 👤 வணக்கம் **${userProfile.name || 'பயனர்'}**!\n\n`;
      answerText += `உங்கள் பதிவு செய்யப்பட்ட விவரங்கள்:\n`;
      answerText += `* **வயது & பாலினம்**: ${userProfile.age || '-'} வயது, ${userProfile.gender === 'FEMALE' ? 'பெண்' : userProfile.gender === 'MALE' ? 'ஆண்' : 'மூன்றாம் பாலினம்'}\n`;
      answerText += `* **மாவட்டம்**: ${userProfile.district || 'தமிழ்நாடு'}\n`;
      answerText += `* **தொழில்/கல்வி**: ${userProfile.occupation || 'மாணவர்'} (${userProfile.isStudent ? 'மாணவர் நிலை' : 'தொழில்'})\n`;
      answerText += `* **ஆண்டு வருமானம்**: ₹${Number(userProfile.annualIncome || 0).toLocaleString('en-IN')}\n`;
      answerText += `* **சமூகப் பிரிவு**: ${userProfile.community || '-'}\n\n`;
      answerText += `✨ **உங்கள் சுயவிவரத்தின்படி நீங்கள் தகுதி பெறக்கூடிய சிறந்த அரசு திட்டங்கள் இதோ:**\n\n`;

      topSchemes.forEach((item, idx) => {
        const s = item.scheme;
        const e = item.eval;
        const govTag = s.governmentLevel === 'TAMIL_NADU' ? '🏛️ தமிழ்நாடு அரசு' : '🇮🇳 மத்திய அரசு';

        answerText += `#### ${idx + 1}. **${s.tamilName}** (${e.matchPercentage}% பொருத்தம் ✅)\n`;
        answerText += `* **அரசு நிலை**: ${govTag} • **துறை**: ${s.tamilDepartment}\n`;
        answerText += `* **நிதிப் பயன்**: 💰 **${s.tamilBenefits}**\n`;
        answerText += `* **தகுதி காரணம்**: ${(e.matchReasons && e.matchReasons.length > 0 ? e.matchReasons : ['உங்கள் வயது, பாலினம் மற்றும் வருமான வரம்பிற்கு பொருந்துகிறது']).join('; ')}\n`;
        answerText += `* **தேவையான ஆவணங்கள்**: ${s.documentsRequired.slice(0, 3).map(d => d.tamilName).join(', ')}\n`;
        answerText += `* **விண்ணப்பிக்க**: [${s.applicationWebsite}](${s.applicationWebsite}) | உதவி எண்: **${s.helpline}**\n\n`;
      });

      answerText += `> 💡 **அடுத்த கட்ட நடவடிக்கை**: மேலே குறிப்பிட்டுள்ள ஆவணங்களை தயாராக வைத்து உங்கள் அருகிலுள்ள **இ-சேவை மையத்தில்** அல்லது அதிகாரப்பூர்வ தளத்தில் உடனடியாக விண்ணப்பிக்கலாம்.`;

    } else if (isDocQuery && primaryMatch) {
      answerText = `### 📋 **${primaryMatch.tamilName}** - தேவையான ஆவணங்கள்\n\n`;
      answerText += `இத்திட்டத்திற்கு விண்ணப்பிக்க கீழ்க்கண்ட முக்கிய ஆவணங்கள் தேவைப்படுகின்றன:\n\n`;
      
      primaryMatch.documentsRequired.forEach((doc, idx) => {
        answerText += `${idx + 1}. **${doc.tamilName}** (${doc.name})\n`;
        answerText += `   - *எங்கு பெறலாம்*: ${doc.source}\n`;
        answerText += `   - *விவரம்*: ${doc.description}\n\n`;
        requiredDocsSummary.push(doc);
      });

      answerText += `> 💡 **குறிப்பு**: வருமான சான்றிதழ், சாதி சான்றிதழ், முதல் பட்டதாரி சான்றிதழ் போன்றவற்றை உங்கள் அருகிலுள்ள **இ-சேவை மையம் (e-Seva Centre)** அல்லது [tnesevai.tn.gov.in](https://www.tnesevai.tn.gov.in) இணையதளம் மூலம் உடனடியாக பெறலாம்.\n\n`;
      answerText += `**அதிகாரப்பூர்வ தளம்**: [${primaryMatch.applicationWebsite}](${primaryMatch.applicationWebsite})\n`;
      answerText += `**உதவி எண்**: ${primaryMatch.helpline}`;
    } else if (isApplyQuery && primaryMatch) {
      answerText = `### 📝 **${primaryMatch.tamilName}** - விண்ணப்பிக்கும் முறை\n\n`;
      answerText += `இத்திட்டத்திற்கு விண்ணப்பிக்கும் வழிமுறைகள்:\n\n`;
      primaryMatch.tamilApplicationProcess.forEach((step, idx) => {
        answerText += `${idx + 1}. ${step}\n`;
      });
      answerText += `\n**விண்ணப்பிக்கும் மையம்**: ${primaryMatch.applicationCentre}\n`;
      answerText += `**இணையதளம்**: [${primaryMatch.applicationWebsite}](${primaryMatch.applicationWebsite})\n`;
      answerText += `**உதவி எண்**: ${primaryMatch.helpline}`;
    } else {
      answerText = `வணக்கம்! உங்கள் கேள்விக்கான அரசு திட்டங்கள் பற்றிய அதிகாரப்பூர்வ விவரங்கள் இதோ:\n\n`;
      
      relevantResults.slice(0, 3).forEach((item, idx) => {
        const s = item.scheme;
        const govTag = s.governmentLevel === 'TAMIL_NADU' ? '🏛️ தமிழ்நாடு அரசு' : '🇮🇳 மத்திய அரசு';
        answerText += `### ${idx + 1}. **${s.tamilName}**\n`;
        answerText += `*${s.schemeName}*\n`;
        answerText += `* **அரசு நிலை**: ${govTag}\n`;
        answerText += `* **துறை**: ${s.tamilDepartment}\n`;
        answerText += `* **பயன்கள்**: ${s.tamilBenefits}\n`;
        answerText += `* **விளக்கம்**: ${s.tamilDescription}\n`;
        
        if (item.eligibility && item.eligibility.isPotentiallyEligible) {
          answerText += `* **சுயவிவர தகுதி**: ✅ **${item.eligibility.matchPercentage}% பொருத்தம்**\n`;
        }

        answerText += `* **முக்கிய ஆவணங்கள்**: ${s.documentsRequired.slice(0, 3).map(d => d.tamilName).join(', ')}\n`;
        answerText += `* **அதிகாரப்பூர்வ தளம்**: [${s.applicationWebsite}](${s.applicationWebsite})\n\n`;
      });

      answerText += `\n> 🛡️ **அதிகாரப்பூர்வ வழிகாட்டுதல்**: உங்கள் சுயவிவரத்தின்படி நீங்கள் தகுதி பெறக்கூடியவராக இருக்கலாம். இறுதி தகுதியை சம்பந்தப்பட்ட அரசுத் துறை முடிவு செய்யும்.`;
    }
  } else {
    // ENGLISH RESPONSES
    if (isProfileQuery && userProfile) {
      const allEvaluated = SCHEMES.map(s => ({
        scheme: s,
        eval: evaluateEligibility(userProfile, s)
      })).filter(item => item.eval.isPotentiallyEligible)
        .sort((a, b) => b.eval.matchPercentage - a.eval.matchPercentage);

      const topSchemes = allEvaluated.slice(0, 4);

      answerText = `### 👤 Hello **${userProfile.name || 'Citizen'}**!\n\n`;
      answerText += `Based on your active registered profile:\n`;
      answerText += `* **Age & Gender**: ${userProfile.age || '-'} years, ${userProfile.gender || '-'}\n`;
      answerText += `* **District**: ${userProfile.district || 'Tamil Nadu'}\n`;
      answerText += `* **Occupation**: ${userProfile.occupation || 'Student'} (${userProfile.isStudent ? 'Current Student' : 'Employed/Other'})\n`;
      answerText += `* **Annual Income**: ₹${Number(userProfile.annualIncome || 0).toLocaleString('en-IN')}\n`;
      answerText += `* **Community**: ${userProfile.community || '-'}\n\n`;
      answerText += `✨ **Here are the top welfare schemes you qualify for 100%:**\n\n`;

      topSchemes.forEach((item, idx) => {
        const s = item.scheme;
        const e = item.eval;
        const govTag = s.governmentLevel === 'TAMIL_NADU' ? '🏛️ Government of Tamil Nadu' : '🇮🇳 Central Government';

        answerText += `#### ${idx + 1}. **${s.schemeName}** (${e.matchPercentage}% Match ✅)\n`;
        answerText += `*Tamil: ${s.tamilName}*\n`;
        answerText += `* **Government Level**: ${govTag} • **Department**: ${s.department}\n`;
        answerText += `* **Financial Benefit**: 💰 **${s.benefits}**\n`;
        answerText += `* **Why You Qualify**: ${(e.matchReasons && e.matchReasons.length > 0 ? e.matchReasons : ['Matches your citizen demographic criteria']).join('; ')}\n`;
        answerText += `* **Required Documents**: ${s.documentsRequired.slice(0, 3).map(d => d.name).join(', ')}\n`;
        answerText += `* **Official Application**: [${s.applicationWebsite}](${s.applicationWebsite}) | Helpline: **${s.helpline}**\n\n`;
      });

      answerText += `> 💡 **Next Step**: Keep the listed certificates ready and apply directly online or visit your nearest **e-Seva Centre**.`;

    } else if (isDocQuery && primaryMatch) {
      answerText = `### 📋 **${primaryMatch.schemeName}** - Required Documents Checklist\n\n`;
      answerText += `To apply for this scheme, the following official documents are required:\n\n`;
      
      primaryMatch.documentsRequired.forEach((doc, idx) => {
        answerText += `${idx + 1}. **${doc.name}** (*${doc.tamilName}*)\n`;
        answerText += `   - **Source**: ${doc.source}\n`;
        answerText += `   - **Requirement**: ${doc.description}\n\n`;
        requiredDocsSummary.push(doc);
      });

      answerText += `> 💡 **Tip**: Certificates can be obtained online via the **Tamil Nadu e-Seva Portal** ([tnesevai.tn.gov.in](https://www.tnesevai.tn.gov.in)) or at any authorized CSC.\n\n`;
      answerText += `**Official Portal**: [${primaryMatch.applicationWebsite}](${primaryMatch.applicationWebsite})\n`;
      answerText += `**Helpline**: ${primaryMatch.helpline}`;
    } else if (isApplyQuery && primaryMatch) {
      answerText = `### 📝 **${primaryMatch.schemeName}** - Step-by-Step Application Procedure\n\n`;
      answerText += `Follow these steps to submit your application:\n\n`;
      primaryMatch.applicationProcess.forEach((step, idx) => {
        answerText += `${idx + 1}. ${step}\n`;
      });
      answerText += `\n**Application Centre**: ${primaryMatch.applicationCentre}\n`;
      answerText += `**Official Portal**: [${primaryMatch.applicationWebsite}](${primaryMatch.applicationWebsite})\n`;
      answerText += `**Helpline**: ${primaryMatch.helpline}`;
    } else {
      answerText = `Here are the verified government welfare schemes matching your inquiry:\n\n`;
      
      relevantResults.slice(0, 3).forEach((item, idx) => {
        const s = item.scheme;
        const govTag = s.governmentLevel === 'TAMIL_NADU' ? '🏛️ Government of Tamil Nadu' : '🇮🇳 Government of India (Central Scheme)';
        answerText += `### ${idx + 1}. **${s.schemeName}**\n`;
        answerText += `*Tamil: ${s.tamilName}*\n`;
        answerText += `* **Government Level**: ${govTag}\n`;
        answerText += `* **Department**: ${s.department}\n`;
        answerText += `* **Benefits**: ${s.benefits}\n`;
        answerText += `* **Overview**: ${s.description}\n`;

        if (item.eligibility && item.eligibility.isPotentiallyEligible) {
          answerText += `* **Your Profile Match**: ✅ **${item.eligibility.matchPercentage}% Match**\n`;
        }

        answerText += `* **Required Documents**: ${s.documentsRequired.slice(0, 3).map(d => d.name).join(', ')}\n`;
        answerText += `* **Official Website**: [${s.applicationWebsite}](${s.applicationWebsite})\n\n`;
      });

      answerText += `\n> 🛡️ **Official Disclaimer**: Based on your inputs, you may be potentially eligible. Final eligibility is determined by the respective department upon certificate verification.`;
    }
  }

  return {
    query,
    detectedLang,
    targetLang,
    response: answerText,
    matchedSchemes: matchedSchemes.slice(0, 4),
    primaryScheme: primaryMatch,
    requiredDocs: primaryMatch ? primaryMatch.documentsRequired : [],
    officialSource: primaryMatch ? primaryMatch.sourceUrl : "https://www.tn.gov.in",
    lastUpdated: primaryMatch ? primaryMatch.lastUpdated : "2026-07-01",
    timestamp: new Date().toISOString()
  };
}
