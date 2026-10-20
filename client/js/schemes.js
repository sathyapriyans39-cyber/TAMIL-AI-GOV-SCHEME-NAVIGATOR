/**
 * Government Schemes Module
 * Search, filter, render scheme cards, and display details modal.
 */

let allSchemes = [];
let currentCategory = 'ALL';
let currentLevel = 'ALL';

// Fetch all schemes from API
async function loadSchemes() {
  const grid = document.getElementById('schemesGrid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⏳</div>
      <h3>திட்டங்கள் ஏற்றப்படுகின்றன / Loading Schemes...</h3>
    </div>
  `;

  try {
    const res = await fetch('/api/schemes');
    const data = await res.json();
    if (data.success && Array.isArray(data.schemes)) {
      allSchemes = data.schemes;
      applyFilters();
    } else {
      throw new Error('Failed to load schemes');
    }
  } catch (err) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <h3>தகவல் பெற முடியவில்லை / Could not load schemes</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">${err.message}</p>
        <button onclick="loadSchemes()" class="btn-search" style="margin-top: 1rem;">மீண்டும் முயற்சிக்க / Retry</button>
      </div>
    `;
  }
}

// Filter by Category
function filterByCategory(category) {
  currentCategory = category;

  // Update pill active state
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
  });

  const catSelect = document.getElementById('categoryFilter');
  if (catSelect) catSelect.value = category;

  applyFilters();
}

// Filter by Government Level (ALL, TAMIL_NADU, CENTRAL)
function filterByLevel(level) {
  currentLevel = level;

  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-level') === level);
  });

  applyFilters();
}

// Search & Apply combined filters
function applyFilters() {
  const searchInput = document.getElementById('schemeSearchInput');
  const searchKeyword = (searchInput ? searchInput.value : '').toLowerCase().trim();

  const sortSelect = document.getElementById('sortSelect');
  const sortType = sortSelect ? sortSelect.value : 'default';

  let filtered = allSchemes.filter(scheme => {
    // Level match
    if (currentLevel !== 'ALL' && scheme.governmentLevel !== currentLevel) {
      return false;
    }

    // Category match
    if (currentCategory !== 'ALL' && scheme.category.toLowerCase() !== currentCategory.toLowerCase()) {
      return false;
    }

    // Keyword match (Tamil & English)
    if (searchKeyword) {
      const matchNameEn = (scheme.schemeName || '').toLowerCase().includes(searchKeyword);
      const matchNameTa = (scheme.tamilName || '').includes(searchKeyword);
      const matchDescEn = (scheme.description || '').toLowerCase().includes(searchKeyword);
      const matchDescTa = (scheme.tamilDescription || '').includes(searchKeyword);
      const matchDept = (scheme.department || '').toLowerCase().includes(searchKeyword);
      const matchDeptTa = (scheme.tamilDepartment || '').includes(searchKeyword);
      if (!matchNameEn && !matchNameTa && !matchDescEn && !matchDescTa && !matchDept && !matchDeptTa) {
        return false;
      }
    }

    return true;
  });

  // Sort
  if (sortType === 'benefit_desc') {
    filtered.sort((a, b) => (b.benefitAmount || 0) - (a.benefitAmount || 0));
  } else if (sortType === 'benefit_asc') {
    filtered.sort((a, b) => (a.benefitAmount || 0) - (b.benefitAmount || 0));
  }

  renderSchemes(filtered);
}

// Render Schemes to Grid
function renderSchemes(schemesList) {
  const grid = document.getElementById('schemesGrid');
  const counter = document.getElementById('schemesCount');
  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';

  if (counter) {
    counter.textContent = isTamil
      ? `${schemesList.length} திட்டங்கள் காட்டப்படுகின்றன`
      : `Showing ${schemesList.length} Government Schemes`;
  }

  if (!schemesList || schemesList.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>${isTamil ? 'திட்டங்கள் எதுவும் பொருந்தவில்லை' : 'No Matching Schemes Found'}</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">
          ${isTamil ? 'வேறு முக்கிய சொற்களை அல்லது வகையைத் தேர்ந்தெடுத்து முயற்சிக்கவும்.' : 'Please try different keywords or reset category filters.'}
        </p>
        <button onclick="resetFilters()" class="btn-search" style="margin-top: 1rem;">
          ${isTamil ? 'வடிப்பான்களை மீட்டமைக்கவும்' : 'Reset All Filters'}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = schemesList.map(scheme => createSchemeCardHtml(scheme, isTamil)).join('');
}

// Generate single scheme card HTML
function createSchemeCardHtml(scheme, isTamil) {
  const isTN = scheme.governmentLevel === 'TAMIL_NADU';
  const levelBadge = isTN
    ? `<span class="badge badge-tn">🏛️ ${isTamil ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu'}</span>`
    : `<span class="badge badge-central">🇮🇳 ${isTamil ? 'மத்திய அரசு' : 'Central Govt'}</span>`;

  const categoryName = isTamil ? (scheme.tamilCategory || scheme.category) : scheme.category;
  const deptName = isTamil ? (scheme.tamilDepartment || scheme.department) : scheme.department;
  const benefitsText = isTamil ? (scheme.tamilBenefits || scheme.benefits) : scheme.benefits;
  const descText = isTamil ? (scheme.tamilDescription || scheme.description) : scheme.description;

  return `
    <div class="scheme-card" id="card-${scheme.id}">
      <div>
        <div class="scheme-card-header">
          ${levelBadge}
          <span class="badge badge-cat">${categoryName}</span>
        </div>

        ${isTamil
          ? `<h3 class="scheme-title-en">${scheme.tamilName || scheme.schemeName}</h3>
             <h4 class="scheme-title-ta">${scheme.schemeName}</h4>`
          : `<h3 class="scheme-title-en">${scheme.schemeName}</h3>
             <h4 class="scheme-title-ta">${scheme.tamilName || ''}</h4>`}

        <div class="scheme-dept">
          <span>🏢</span> ${deptName}
        </div>

        <div class="scheme-benefit-box">
          <span>💰</span>
          <span>${benefitsText}</span>
        </div>

        <p class="scheme-desc-text">${descText}</p>
      </div>

      <div class="scheme-card-footer">
        <button onclick="openSchemeModal('${scheme.id}')" class="btn-card-details">
          ${isTamil ? 'விவரம் & விண்ணப்பிக்கும் வழி ↗' : 'View Details & Apply ↗'}
        </button>
      </div>
    </div>
  `;
}

// Reset all search & category filters
function resetFilters() {
  currentCategory = 'ALL';
  currentLevel = 'ALL';
  const searchInput = document.getElementById('schemeSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
  const allCatPill = document.querySelector('.cat-pill[data-cat="ALL"]');
  if (allCatPill) allCatPill.classList.add('active');

  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
  const allLevelBtn = document.querySelector('.level-btn[data-level="ALL"]');
  if (allLevelBtn) allLevelBtn.classList.add('active');

  applyFilters();
}

// Open Scheme Modal
function openSchemeModal(schemeId) {
  const scheme = allSchemes.find(s => s.id === schemeId);
  if (!scheme) return;

  const isTamil = (localStorage.getItem('app_lang') || 'ta') === 'ta';
  const modal = document.getElementById('schemeModal');
  const modalBody = document.getElementById('modalSchemeContent');

  const isTN = scheme.governmentLevel === 'TAMIL_NADU';
  const levelBadge = isTN
    ? `<span class="badge badge-tn">🏛️ ${isTamil ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu Government'}</span>`
    : `<span class="badge badge-central">🇮🇳 ${isTamil ? 'மத்திய அரசு' : 'Central Government'}</span>`;

  const criteria = scheme.eligibilityCriteria || {};
  let eligibilityHtml = '';
  if (criteria.gender && criteria.gender !== 'ALL') {
    eligibilityHtml += `<li><strong>${isTamil ? 'பாலினம்' : 'Gender'}:</strong> ${criteria.gender}</li>`;
  }
  if (criteria.minAge || criteria.maxAge) {
    eligibilityHtml += `<li><strong>${isTamil ? 'வயது வரம்பு' : 'Age Range'}:</strong> ${criteria.minAge || 0} - ${criteria.maxAge || 100} ${isTamil ? 'வயது' : 'years'}</li>`;
  }
  if (criteria.maxAnnualIncome) {
    eligibilityHtml += `<li><strong>${isTamil ? 'அதிகபட்ச வருமானம்' : 'Max Annual Income'}:</strong> ₹${Number(criteria.maxAnnualIncome).toLocaleString('en-IN')}</li>`;
  }
  if (criteria.studentOnly) {
    eligibilityHtml += `<li><strong>${isTamil ? 'மாணவர் நிலை' : 'Student Status'}:</strong> ${isTamil ? 'பள்ளி / கல்லூரி மாணவராக இருக்க வேண்டும்' : 'Must be an enrolled student'}</li>`;
  }
  if (!eligibilityHtml) {
    eligibilityHtml = `<li>${isTamil ? 'தமிழ்நாடு நிரந்தர குடியிருப்புதாரர்கள் அனைவரும் விண்ணப்பிக்கலாம்.' : 'Open to eligible residents.'}</li>`;
  }

  const docsHtml = (scheme.documentsRequired || []).map(doc => `
    <li class="doc-item">
      <strong>${isTamil ? doc.tamilName : doc.name}</strong>
      ${doc.description ? ` - <span>${doc.description}</span>` : ''}
      ${doc.source ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">📌 ${isTamil ? 'வழங்கும் துறை' : 'Issuing Source'}: ${doc.source}</div>` : ''}
    </li>
  `).join('');

  modalBody.innerHTML = `
    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
      ${levelBadge}
      <span class="badge badge-cat">${isTamil ? scheme.tamilCategory : scheme.category}</span>
    </div>

    <h2 style="color: var(--primary-dark); font-size: 1.4rem; margin-bottom: 0.25rem;">${scheme.schemeName}</h2>
    <h3 style="color: var(--primary-light); font-size: 1.15rem; margin-bottom: 0.75rem;">${scheme.tamilName || ''}</h3>

    <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
      🏢 <strong>${isTamil ? 'துறை' : 'Department'}:</strong> ${isTamil ? scheme.tamilDepartment : scheme.department}
    </div>

    <div class="scheme-benefit-box" style="margin-bottom: 1.5rem; font-size: 0.95rem;">
      <span>💰</span>
      <div>
        <strong>${isTamil ? 'திட்ட பயன்' : 'Benefits'}:</strong>
        <div>${isTamil ? scheme.tamilBenefits : scheme.benefits}</div>
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">📖 ${isTamil ? 'திட்ட விளக்கம்' : 'Scheme Description'}</h4>
      <p style="font-size: 0.92rem; color: #334155;">${isTamil ? scheme.tamilDescription : scheme.description}</p>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">✅ ${isTamil ? 'தகுதி வரம்புகள்' : 'Eligibility Conditions'}</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6;">
        ${eligibilityHtml}
      </ul>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">📋 ${isTamil ? 'தேவையான ஆவணங்கள்' : 'Required Documents'}</h4>
      <ul class="doc-list">
        ${docsHtml}
      </ul>
      <div style="font-size: 0.82rem; color: #0284c7; background: #e0f2fe; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-top: 0.5rem;">
        💡 ${isTamil ? 'சான்றிதழ்களை உங்கள் அருகிலுள்ள இ-சேவை மையம் அல்லது tnesevai.tn.gov.in மூலம் பெறலாம்.' : 'Certificates can be availed at your nearest e-Sevai centre or via tnesevai.tn.gov.in.'}
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">📍 ${isTamil ? 'விண்ணப்பிக்கும் இடம் & உதவி எண்' : 'Application Office & Helpline'}</h4>
      <p style="font-size: 0.9rem;">🏢 ${scheme.applicationCentre || 'e-Sevai Centre / Taluk Office'}</p>
      <p style="font-size: 0.9rem; margin-top: 0.25rem;">📞 <strong>${isTamil ? 'உதவி எண்' : 'Helpline'}:</strong> ${scheme.helpline || '1100'}</p>
    </div>

    <div style="background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.82rem; margin-top: 1rem;">
      ⚠️ <strong>${isTamil ? 'முக்கிய குறிப்பு' : 'Verification Note'}:</strong>
      ${isTamil ? 'அரசு வழிகாட்டுதலின்படி இறுதி தகுதி துறை அதிகாரிகளால் மட்டுமே தீர்மானிக்கப்படும். அதிகாரப்பூர்வ தளத்தில் உறுதிப்படுத்தவும்.' : 'Final eligibility and benefit grants are subject to verification by the respective government department.'}
    </div>
  `;

  const applyBtn = document.getElementById('modalApplyLink');
  if (applyBtn) {
    applyBtn.href = scheme.applicationWebsite || 'https://www.tn.gov.in';
    applyBtn.textContent = isTamil ? 'அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்க ↗' : 'Apply on Official Portal ↗';
  }

  modal.classList.add('active');
}

// Close Scheme Modal
function closeSchemeModal() {
  const modal = document.getElementById('schemeModal');
  if (modal) modal.classList.remove('active');
}
