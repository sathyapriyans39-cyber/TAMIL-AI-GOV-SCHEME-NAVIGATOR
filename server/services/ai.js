/**
 * Tamil AI Government Scheme Navigator - AI Assistant Service
 * Provides bilingual (Tamil & English) answers using verified scheme data.
 * Falls back gracefully to rule-based retrieval if external AI API is unavailable.
 */

import axios from 'axios';
import { SCHEMES } from '../data/schemes.js';
import { evaluateEligibility } from './eligibilityEngine.js';

/**
 * Detect language of query (Tamil or English)
 */
export function detectLanguage(text, preferredLang = null) {
  if (!text) return preferredLang || 'ta';
  const t = text.toLowerCase().trim();

  // Explicit user requests
  if (t.includes('in tamil') || t.includes('tamilil') || t.includes('தமிழில்') || t.includes('தமிழ்')) return 'ta';
  if (t.includes('in english') || t.includes('ஆங்கிலத்தில்') || t.includes('ஆங்கிலம்')) return 'en';

  // Check for Tamil Unicode range (U+0B80 to U+0BFF)
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta';

  // Common Tanglish keywords
  const tanglish = ['thittam', 'enakku', 'enna', 'thittangal', 'aarambikka', 'vaanga', 'thevai', 'pengal', 'kadan', 'kalloori', 'manavargal', 'tamilnadu', 'maruthuva', 'sollu', 'eppadi'];
  if (tanglish.some(w => t.includes(w))) return 'ta';

  return preferredLang || 'en';
}

/**
 * Retrieve most relevant scheme based on query keywords and sector matching
 */
export function findMatchingSchemes(query) {
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(w => w.length > 2);

  const scored = SCHEMES.map(scheme => {
    let score = 0;
    const nameEn = (scheme.schemeName || '').toLowerCase();
    const nameTa = (scheme.tamilName || '').toLowerCase();
    const descEn = (scheme.description || '').toLowerCase();
    const descTa = (scheme.tamilDescription || '').toLowerCase();
    const cat = (scheme.category || '').toLowerCase();
    const dept = (scheme.department || '').toLowerCase();

    // Exact name matches get highest weight
    tokens.forEach(tok => {
      if (nameEn.includes(tok) || nameTa.includes(tok)) score += 30;
      if (descEn.includes(tok) || descTa.includes(tok)) score += 15;
      if (cat.includes(tok) || dept.includes(tok)) score += 20;
    });

    // Sector intents
    if (q.includes('பெண்') || q.includes('மகளிர்') || q.includes('women') || q.includes('woman') || q.includes('girl') || q.includes('urimai') || q.includes('kalaignar') || q.includes('pudhumai')) {
      if (scheme.category === 'Women Welfare' || scheme.eligibilityCriteria?.gender === 'FEMALE') score += 35;
    }
    if (q.includes('மாணவ') || q.includes('கல்வி') || q.includes('student') || q.includes('college') || q.includes('scholarship') || q.includes('school') || q.includes('laptop') || q.includes('puthalvan')) {
      if (scheme.category === 'Education' || scheme.category === 'Higher Education') score += 35;
    }
    if (q.includes('விவசாயி') || q.includes('உழவர்') || q.includes('பயிர்') || q.includes('farmer') || q.includes('agriculture') || q.includes('kisan')) {
      if (scheme.category === 'Farmer Schemes' || scheme.category === 'Agriculture') score += 35;
    }
    if (q.includes('மருத்துவ') || q.includes('காப்பீடு') || q.includes('health') || q.includes('hospital') || q.includes('insurance') || q.includes('cmchis')) {
      if (scheme.category === 'Health' || scheme.category === 'Social Welfare') score += 35;
    }
    if (q.includes('கடன்') || q.includes('தொழில்') || q.includes('loan') || q.includes('business') || q.includes('msme') || q.includes('needs')) {
      if (scheme.category === 'MSME' || scheme.category === 'Employment & Skill') score += 35;
    }
    if (q.includes('வீடு') || q.includes('house') || q.includes('housing') || q.includes('pmay')) {
      if (scheme.category === 'Housing') score += 35;
    }

    return { scheme, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).map(s => s.scheme);
}

/**
 * Generate accurate rule-based response using actual scheme details
 */
function generateRuleBasedReply(query, scheme, lang) {
  const isTamil = lang === 'ta';

  if (!scheme) {
    if (isTamil) {
      return "மன்னிக்கவும், உங்கள் கேள்விக்குரிய குறிப்பிட்ட திட்டம் கிடைக்கவில்லை. தயவுசெய்து 'மகளிர் திட்டம்', 'கல்வி உதவித்தொகை', 'விவசாயி கடன்', அல்லது 'மருத்துவக் காப்பீடு' போன்ற சொற்களைப் பயன்படுத்தி தேடவும். மேலும், அதிகாரப்பூர்வ தகவல்களுக்கு அருகிலுள்ள இ-சேவை மையத்தை அணுகலாம்.\n\n⚠️ குறிப்பு: முக்கியமான விவரங்களை சம்பந்தப்பட்ட அரசு துறையில் உறுதிப்படுத்தவும்.";
    }
    return "Sorry, I could not find a specific scheme matching your query. Please try searching with keywords like 'women schemes', 'scholarship', 'farmer subsidy', or 'health insurance'. You may also visit your nearest e-Sevai centre for assistance.\n\n⚠️ Note: Always verify important details with official government sources.";
  }

  const isDocQuery = query.toLowerCase().includes('document') || query.toLowerCase().includes('சான்றிதழ்') || query.toLowerCase().includes('ஆவணம்') || query.toLowerCase().includes('proof');
  const isApplyQuery = query.toLowerCase().includes('apply') || query.toLowerCase().includes('விண்ணப்ப') || query.toLowerCase().includes('எப்படி') || query.toLowerCase().includes('how');

  if (isTamil) {
    let reply = `🏛️ **${scheme.tamilName}**\n\n`;
    reply += `* **அரசு நிலை**: ${scheme.governmentLevel === 'TAMIL_NADU' ? 'தமிழ்நாடு அரசு' : 'மத்திய அரசு'} | **துறை**: ${scheme.tamilDepartment}\n`;
    reply += `* **பயன்கள்**: 💰 ${scheme.tamilBenefits}\n\n`;

    if (isDocQuery) {
      reply += `📋 **தேவையான ஆவணங்கள்:**\n`;
      scheme.documentsRequired.forEach((doc, idx) => {
        reply += `${idx + 1}. **${doc.tamilName}** - ${doc.description} (${doc.source})\n`;
      });
      reply += `\n> 💡 வருமானச் சான்று, சாதிச் சான்று போன்றவற்றை உங்கள் அருகிலுள்ள **இ-சேவை மையத்தில்** அல்லது tnesevai.tn.gov.in மூலம் பெறலாம்.\n\n`;
    } else if (isApplyQuery) {
      reply += `📝 **விண்ணப்பிக்கும் முறை:**\n`;
      scheme.tamilApplicationProcess.forEach((step, idx) => {
        reply += `${idx + 1}. ${step}\n`;
      });
      reply += `* **விண்ணப்பிக்கும் மையம்**: ${scheme.applicationCentre}\n\n`;
    } else {
      reply += `* **திட்ட விளக்கம்**: ${scheme.tamilDescription}\n\n`;
      reply += `📋 **தேவையான முக்கிய ஆவணங்கள்:**\n`;
      scheme.documentsRequired.slice(0, 3).forEach((doc, idx) => {
        reply += `${idx + 1}. ${doc.tamilName}\n`;
      });
      reply += `\n`;
    }

    reply += `🌐 **அதிகாரப்பூர்வ தளம்**: ${scheme.applicationWebsite}\n`;
    reply += `📞 **உதவி எண்**: ${scheme.helpline}\n\n`;
    reply += `⚠️ **முக்கிய அறிவிப்பு**: அரசு திட்ட விதிகளின்படி இறுதி தகுதி சம்பந்தப்பட்ட அரசுத் துறையினரால் மட்டுமே தீர்மானிக்கப்படும். அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.`;
    return reply;
  } else {
    let reply = `🏛️ **${scheme.schemeName}**\n\n`;
    reply += `* **Government Level**: ${scheme.governmentLevel === 'TAMIL_NADU' ? 'Government of Tamil Nadu' : 'Central Government'} | **Department**: ${scheme.department}\n`;
    reply += `* **Key Benefits**: 💰 ${scheme.benefits}\n\n`;

    if (isDocQuery) {
      reply += `📋 **Required Documents:**\n`;
      scheme.documentsRequired.forEach((doc, idx) => {
        reply += `${idx + 1}. **${doc.name}** - ${doc.description} (Issuing: ${doc.source})\n`;
      });
      reply += `\n> 💡 Certificates like Income & Community can be obtained at your nearest **e-Sevai centre** or online via tnesevai.tn.gov.in.\n\n`;
    } else if (isApplyQuery) {
      reply += `📝 **How to Apply:**\n`;
      scheme.applicationProcess.forEach((step, idx) => {
        reply += `${idx + 1}. ${step}\n`;
      });
      reply += `* **Application Centre**: ${scheme.applicationCentre}\n\n`;
    } else {
      reply += `* **Description**: ${scheme.description}\n\n`;
      reply += `📋 **Key Required Documents:**\n`;
      scheme.documentsRequired.slice(0, 3).forEach((doc, idx) => {
        reply += `${idx + 1}. ${doc.name}\n`;
      });
      reply += `\n`;
    }

    reply += `🌐 **Official Website**: ${scheme.applicationWebsite}\n`;
    reply += `📞 **Helpline**: ${scheme.helpline}\n\n`;
    reply += `⚠️ **Important Notice**: Final eligibility and benefit disbursement are subject to verification by the respective government department. Always verify on official portals.`;
    return reply;
  }
}

/**
 * Main AI Query Handler
 * Checks external API first, then falls back to verified scheme database
 */
export async function processAiQuery(query, userProfile = null, preferredLang = null) {
  const lang = detectLanguage(query, preferredLang);
  const matchedSchemes = findMatchingSchemes(query);
  const primaryScheme = matchedSchemes.length > 0 ? matchedSchemes[0] : null;

  // Try Sarvam AI API if configured
  const sarvamKey = process.env.SARVAM_API_KEY;
  if (sarvamKey && sarvamKey.startsWith('sk_') && !sarvamKey.includes('your_')) {
    try {
      const prompt = `You are the Tamil AI Government Scheme Navigator. Answer user questions about Tamil Nadu State and Central Government schemes. Answer in ${lang === 'ta' ? 'simple, clear Tamil' : 'clear, concise English'}. Only provide factual information from verified government sources. If asked about a scheme, mention its benefits, eligibility, required documents, and official link. Always advise the user to verify with official sources. User query: "${query}"`;
      
      const response = await axios.post(
        'https://api.sarvam.ai/v1/chat/completions',
        {
          model: 'sarvam-105b',
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: query }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': sarvamKey
          },
          timeout: 6000
        }
      );

      const aiReply = response.data?.choices?.[0]?.message?.content;
      if (aiReply && aiReply.trim()) {
        const disclaimer = lang === 'ta'
          ? "\n\n⚠️ **அறிவிப்பு**: இந்த பதில் AI வழிகாட்டலாகும். முக்கியமான விவரங்களை அதிகாரப்பூர்வ அரசு தளத்தில் உறுதிப்படுத்தவும்."
          : "\n\n⚠️ **Notice**: This reply is for guidance. Please verify details through official government portals.";
        return {
          reply: aiReply.trim() + disclaimer,
          language: lang,
          scheme: primaryScheme,
          source: 'sarvam-ai'
        };
      }
    } catch (err) {
      console.warn('Sarvam API call failed, falling back to rule-based engine:', err.message);
    }
  }

  // Pure rule-based response using verified database
  const reply = generateRuleBasedReply(query, primaryScheme, lang);
  return {
    reply,
    language: lang,
    scheme: primaryScheme,
    source: 'rule-based-verified'
  };
}
