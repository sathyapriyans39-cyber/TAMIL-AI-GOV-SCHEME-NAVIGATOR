/**
 * Main Application Module
 * Manages language toggling, eligibility checker, e-Sevai locator, notifications, and initialization.
 */

// 38 Districts of Tamil Nadu fallback
const TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
  "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai",
  "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
  "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

let allDistricts = TN_DISTRICTS;
let lastEligibleSchemes = null;
let lastUserProfile = null;

// Language Toggle (ta / en)
function toggleLanguage(lang) {
  const target = lang || ((localStorage.getItem('app_lang') || 'ta') === 'ta' ? 'en' : 'ta');
  localStorage.setItem('app_lang', target);

  // Apply translations to all static elements
  if (window.i18n) {
    window.i18n.applyTranslations(target);
  }

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.textContent = target === 'ta' ? 'English' : 'தமிழ்';
  }

  loadDistricts();
  updateNavAuthUI();
  applyFilters();
  initChatbot();
  loadCentres();
  loadNotifications();

  if (lastEligibleSchemes) {
    renderEligibilityResults(lastEligibleSchemes, lastUserProfile, target === 'ta');
  }
}

// Load Districts for dropdowns
async function loadDistricts() {
  try {
    const res = await fetch('/api/centres/districts');
    const data = await res.json();
    if (data.success && Array.isArray(data.districts)) {
      allDistricts = data.districts;
    }
  } catch (e) {
    // Keep fallback list
  }

  // Populate District dropdowns
  const elDist = document.getElementById('eligibilityDistrict');
  const centreDist = document.getElementById('centreDistrictFilter');
  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';

  const options = allDistricts.map(d => `<option value="${d}">${d}</option>`).join('');

  if (elDist) {
    const currentVal = elDist.value;
    elDist.innerHTML = `<option value="">${isTamil ? '-- தேர்ந்தெடுக்கவும் --' : '-- Select District --'}</option>` + options;
    if (currentVal) elDist.value = currentVal;
  }
  if (centreDist) {
    const currentVal = centreDist.value;
    centreDist.innerHTML = `<option value="ALL">${isTamil ? 'அனைத்து மாவட்டங்கள்' : 'All Districts'}</option>` + options;
    if (currentVal) centreDist.value = currentVal;
  }
}

// Eligibility Checker
async function checkEligibility(event) {
  if (event) event.preventDefault();

  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';
  const resultsContainer = document.getElementById('eligibilityResults');

  const age = parseInt(document.getElementById('eligibilityAge').value) || 0;
  const gender = document.getElementById('eligibilityGender').value;
  const district = document.getElementById('eligibilityDistrict').value;
  const occupation = document.getElementById('eligibilityOccupation').value;
  const isStudent = document.getElementById('eligibilityStudent').value === 'true';
  const studiedGovtSchool = document.getElementById('eligibilityGovtSchool').value === 'true';
  const annualIncome = parseFloat(document.getElementById('eligibilityIncome').value) || 0;
  const community = document.getElementById('eligibilityCommunity').value;

  if (!age || age < 1 || age > 120) {
    showToast(isTamil ? 'சரியான வயதை உள்ளிடவும்.' : 'Please enter a valid age.', 'error');
    return;
  }

  resultsContainer.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <div class="empty-icon">⏳</div>
      <h4>${isTamil ? 'உங்கள் விவரங்கள் அரசு விதிகளுடன் ஒப்பிடப்படுகின்றன...' : 'Matching your profile with government scheme rules...'}</h4>
    </div>
  `;
  resultsContainer.style.display = 'block';

  const userProfile = {
    age,
    gender,
    state: "Tamil Nadu",
    district: district || "Chennai",
    annualIncome,
    occupation,
    isStudent,
    studiedInGovtSchool6to12: studiedGovtSchool,
    community
  };

  try {
    const res = await fetch('/api/schemes/match-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfile)
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Eligibility check failed');
    }

    lastEligibleSchemes = data.eligibleSchemes;
    lastUserProfile = userProfile;
    renderEligibilityResults(data.eligibleSchemes, userProfile, isTamil);
  } catch (err) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <h4>${isTamil ? 'தகுதி சரிபார்ப்பில் பிழை ஏற்பட்டது' : 'Error Checking Eligibility'}</h4>
        <p>${err.message}</p>
      </div>
    `;
  }
}

// Render Eligibility Results
function renderEligibilityResults(matchedSchemes, profile, isTamil) {
  const container = document.getElementById('eligibilityResults');

  if (!matchedSchemes || matchedSchemes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h4>${isTamil ? 'உங்கள் தற்போதைய விவரங்களுக்கு திட்டங்கள் எதுவும் பொருந்தவில்லை' : 'No Directly Matching Schemes Found'}</h4>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">
          ${isTamil ? 'வேறு விவரங்களை உள்ளிட்டு சோதிக்கவும் அல்லது பொதுவான திட்டங்களை தேடவும்.' : 'Try adjusting the criteria or explore our complete scheme catalogue.'}
        </p>
      </div>
    `;
    return;
  }

  let html = `
    <div class="eligibility-disclaimer">
      <span>ℹ️</span>
      <div>
        <strong>${isTamil ? 'முக்கிய அறிவிப்பு' : 'Preliminary Result Notice'}:</strong>
        ${isTamil
          ? 'இந்த தகுதி முடிவு ஆரம்பநிலை கணிப்பாகும். இறுதி தகுதி மற்றும் பயன்கள் சம்பந்தப்பட்ட அரசுத் துறையின் சரிபார்ப்பிற்கு பிறகே வழங்கப்படும்.'
          : 'This result is preliminary based on system rules. Final eligibility is determined by the relevant government department after document verification.'}
      </div>
    </div>

    <h3 style="color: var(--primary-dark); margin-bottom: 1rem;">
      🎉 ${isTamil ? `நீங்கள் தகுதி பெறக்கூடிய ${matchedSchemes.length} சிறந்த திட்டங்கள்:` : `Found ${matchedSchemes.length} Potentially Suitable Schemes:`}
    </h3>

    <div class="schemes-grid">
  `;

  matchedSchemes.forEach(item => {
    const s = item;
    const match = item.eligibilityMatch || {};
    const percent = match.matchPercentage || 85;

    const reasons = (match.matchReasons || []).slice(0, 3).map(r => `
      <li class="match-reason-item">
        <span>✅</span> <span>${r}</span>
      </li>
    `).join('');

    html += `
      <div class="scheme-card" style="border-top: 4px solid var(--success);">
        <div>
          <div class="scheme-card-header">
            <span class="badge" style="background: #dcfce7; color: #15803d;">
              🎯 ${percent}% ${isTamil ? 'பொருத்தம்' : 'Match'}
            </span>
            <span class="badge badge-cat">${isTamil ? s.tamilCategory : s.category}</span>
          </div>

          <h3 class="scheme-title-en">${s.schemeName}</h3>
          <h4 class="scheme-title-ta">${s.tamilName || ''}</h4>

          <div class="scheme-benefit-box">
            <span>💰</span>
            <span>${isTamil ? s.tamilBenefits : s.benefits}</span>
          </div>

          <div style="margin: 0.75rem 0;">
            <strong style="font-size: 0.8rem; color: var(--text-muted);">${isTamil ? 'தகுதி பொருந்திய காரணங்கள்' : 'Why You Are Eligible'}:</strong>
            <ul class="match-reason-list">
              ${reasons || `<li class="match-reason-item"><span>✅</span> <span>${isTamil ? 'அடிப்படை தகுதிகள் பொருந்துகிறது' : 'Matches basic criteria'}</span></li>`}
            </ul>
          </div>
        </div>

        <div class="scheme-card-footer">
          <button onclick="openSchemeModal('${s.id}')" class="btn-card-details">
            ${isTamil ? 'முழு விவரம் & விண்ணப்பிக்கும் முறை ↗' : 'View Full Details & Apply ↗'}
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Load e-Sevai Centres
async function loadCentres() {
  const grid = document.getElementById('centresGrid');
  if (!grid) return;

  const districtFilter = document.getElementById('centreDistrictFilter')?.value || 'ALL';
  const searchInput = document.getElementById('centreSearchInput')?.value || '';
  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';

  grid.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⏳</div>
      <h4>இ-சேவை மையங்கள் ஏற்றப்படுகின்றன... / Loading Centres...</h4>
    </div>
  `;

  try {
    const params = new URLSearchParams();
    if (districtFilter !== 'ALL') params.append('district', districtFilter);
    if (searchInput.trim()) params.append('search', searchInput.trim());

    const res = await fetch(`/api/centres?${params.toString()}`);
    const data = await res.json();

    if (data.success && Array.isArray(data.centres)) {
      renderCentres(data.centres, isTamil);
      if (typeof updateCentresMap === 'function') {
        updateCentresMap(data.centres);
      }
    } else {
      throw new Error('Failed to load centres');
    }
  } catch (err) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <h4>${isTamil ? 'மையங்கள் தகவல் பெற முடியவில்லை' : 'Could not load centres'}</h4>
      </div>
    `;
  }
}

// Render e-Sevai Centres
function renderCentres(centres, isTamil) {
  const grid = document.getElementById('centresGrid');
  if (!centres || centres.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏢</div>
        <h4>${isTamil ? 'மையங்கள் எதுவும் கிடைக்கவில்லை' : 'No e-Sevai Centres Found'}</h4>
        <p style="color: var(--text-muted);">${isTamil ? 'வேறு மாவட்டம் அல்லது நகரை தேடவும்.' : 'Please choose another district or try searching for another town.'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = centres.map(c => `
    <div class="centre-card" id="centre-item-${c.id}">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
          <h4 class="centre-name">${isTamil ? (c.tamilName || c.name) : c.name}</h4>
          <span class="badge badge-tn" style="font-size: 0.7rem; white-space: nowrap;">🏛️ ${c.type || 'e-Sevai'}</span>
        </div>
        <div class="centre-taluk">📍 ${c.taluk}, ${c.district} - ${c.pincode || ''}</div>
        <p class="centre-address">${isTamil ? (c.tamilAddress || c.address) : c.address}</p>

        <div class="centre-info-row">
          <span>⏰ ${c.operatingHours || '09:30 AM - 05:30 PM'}</span>
          <span>📞 ${c.phone || c.contactPhone || '1100'}</span>
        </div>
      </div>

      <div class="centre-card-actions">
        <button type="button" onclick="focusCentreOnMap('${c.id}')" class="btn-card-map" title="${isTamil ? 'வரைபடத்தில் இந்த மையத்தை பார்க்க' : 'Show this centre on map'}">
          🗺️ ${isTamil ? 'வரைபடத்தில் பார்க்க' : 'View on Map'}
        </button>
        <a href="${c.directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn-maps" title="${isTamil ? 'கூகிள் வரைபடத்தில் வழிகாட்டி' : 'Open directions in Google Maps'}">
          🧭 ${isTamil ? 'வழிகாட்டி ↗' : 'Directions ↗'}
        </a>
      </div>
    </div>
  `).join('');
}

// In-App Notifications
async function loadNotifications() {
  const badge = document.getElementById('notifBadge');
  const listElem = document.getElementById('notifList');
  if (!badge) return;

  try {
    const token = getAuthToken();
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const res = await fetch('/api/notifications', { headers });
    const data = await res.json();

    if (data.success && Array.isArray(data.notifications)) {
      badge.textContent = data.unreadCount || 0;
      badge.style.display = data.unreadCount > 0 ? 'inline-block' : 'none';

      if (listElem) {
        const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';
        if (data.notifications.length === 0) {
          listElem.innerHTML = `<li style="padding: 1rem; color: var(--text-muted); text-align: center;">${isTamil ? 'அறிவிப்புகள் எதுவும் இல்லை' : 'No notifications'}</li>`;
        } else {
          listElem.innerHTML = data.notifications.map(n => `
            <li style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--border);">
              <div style="font-weight: 700; font-size: 0.9rem; color: var(--primary-dark);">${isTamil ? (n.tamilTitle || n.title) : n.title}</div>
              <div style="font-size: 0.82rem; color: #475569; margin: 0.25rem 0;">${isTamil ? (n.tamilMessage || n.message) : n.message}</div>
              <div style="font-size: 0.7rem; color: var(--text-light);">${new Date(n.date).toLocaleDateString()}</div>
            </li>
          `).join('');
        }
      }
    }
  } catch (e) {
    // Non-blocking
  }
}

// Toggle Notification Drawer Modal
function toggleNotifDrawer() {
  const modal = document.getElementById('notifModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = localStorage.getItem('app_lang') || 'ta';
  if (window.i18n) {
    window.i18n.applyTranslations(currentLang);
  }

  // Sync Language Button text
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.textContent = currentLang === 'ta' ? 'English' : 'தமிழ்';
  }

  updateNavAuthUI();
  loadDistricts();
  loadSchemes();
  initChatbot();
  if (typeof initCentresMap === 'function') {
    initCentresMap();
  }
  loadCentres();
  loadNotifications();
  checkDbStatus();

  // Search input Enter key trigger
  const schemeSearchInput = document.getElementById('schemeSearchInput');
  if (schemeSearchInput) {
    schemeSearchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') applyFilters();
    });
  }

  // Chat input Enter key trigger
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
});

// Live MySQL Database Status Checker
async function checkDbStatus() {
  const el = document.getElementById('footerDbStatusText');
  if (!el) return;
  try {
    const res = await fetch('/api/db/status');
    const data = await res.json();
    if (data.connected) {
      el.textContent = `MySQL Database: Connected (${data.database} | ${data.tables?.schemes || 0} schemes, ${data.tables?.centres || 0} centres)`;
    } else {
      el.textContent = 'MySQL Database: Offline (Using In-Memory Fallback)';
      if (el.parentElement) {
        el.parentElement.style.color = '#f87171';
        el.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        el.parentElement.style.background = 'rgba(239, 68, 68, 0.12)';
      }
    }
  } catch (e) {
    el.textContent = 'MySQL Database: Local Store';
  }
}
