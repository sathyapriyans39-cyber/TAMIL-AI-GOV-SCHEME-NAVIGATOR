/**
 * Authentication Helper Module
 * Manages user session, JWT storage, login, registration, and navbar state.
 */

const AUTH_TOKEN_KEY = 'tn_scheme_token';
const AUTH_USER_KEY = 'tn_scheme_user';

// Get stored token
function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// Get stored user object
function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Save authentication data
function setAuthSession(token, user) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

// Clear authentication data
function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

// Login API Call
async function loginUser(email, password) {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Login failed. Please check credentials.');
    }
    setAuthSession(data.token, data.user);
    return data;
  } catch (err) {
    throw err;
  }
}

// Registration API Call
async function registerUser(userData) {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Registration failed.');
    }
    setAuthSession(data.token, data.user);
    return data;
  } catch (err) {
    throw err;
  }
}

// Logout
function logoutUser() {
  clearAuthSession();
  showToast('Logged out successfully', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// Update Navbar based on user state
function updateNavAuthUI() {
  const user = getCurrentUser();
  const authContainer = document.getElementById('navAuthContainer');
  if (!authContainer) return;

  const currentLang = localStorage.getItem('app_lang') || 'ta';
  const isTamil = currentLang === 'ta';

  if (user) {
    const isAdmin = user.role === 'ADMIN';
    authContainer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        ${isAdmin ? `<a href="admin.html" class="user-status-btn btn-admin">⚙️ ${isTamil ? 'நிர்வாக பலகை' : 'Admin'}</a>` : ''}
        <span class="user-status-btn btn-user">👤 ${user.name || 'Citizen'}</span>
        <button onclick="logoutUser()" class="user-status-btn btn-logout">${isTamil ? 'வெளியேறு' : 'Logout'}</button>
      </div>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="user-status-btn btn-login">
        🔑 ${isTamil ? 'உள்நுழை / பதிவு' : 'Login / Register'}
      </a>
    `;
  }
}

// Floating Toast Notification
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
