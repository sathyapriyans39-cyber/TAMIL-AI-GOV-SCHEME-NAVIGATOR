/**
 * Authentication and User Profile Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tamil_scheme_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('tamil_scheme_token') || null);
  const [loading, setLoading] = useState(false);

  // Sync token & user to localStorage
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('tamil_scheme_token', token);
      localStorage.setItem('tamil_scheme_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tamil_scheme_token');
      localStorage.removeItem('tamil_scheme_user');
    }
  }, [token, user]);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } finally {
      setLoading(false);
    }
  };

  // One-click demo login (Student Citizen or TN Govt Admin)
  const loginDemo = async (role = 'CITIZEN') => {
    if (role === 'ADMIN') {
      return login('admin@tamilnadugov.in', 'admin123');
    } else {
      return login('kavitha@example.com', 'user123');
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    if (!token) return { success: false, message: 'Not logged in' };
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      }
      throw new Error(data.message || 'Failed to update profile');
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // Toggle Save / Bookmark Scheme
  const toggleSaveScheme = async (schemeId) => {
    if (!user) return false;
    try {
      if (token) {
        const res = await fetch(`${API_BASE}/auth/saved-schemes/toggle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ schemeId })
        });
        const data = await res.json();
        if (data.success) {
          setUser(prev => ({
            ...prev,
            savedSchemes: data.savedSchemes
          }));
          return data.saved;
        }
      } else {
        // Local guest save
        const saved = user.savedSchemes || [];
        const isAlready = saved.includes(schemeId);
        const next = isAlready ? saved.filter(id => id !== schemeId) : [...saved, schemeId];
        setUser(prev => ({ ...prev, savedSchemes: next }));
        return !isAlready;
      }
    } catch (err) {
      console.error('Error toggling save scheme:', err);
    }
    return false;
  };

  const isSchemeSaved = (schemeId) => {
    return !!(user && Array.isArray(user.savedSchemes) && user.savedSchemes.includes(schemeId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginDemo,
        logout,
        updateProfile,
        toggleSaveScheme,
        isSchemeSaved,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
