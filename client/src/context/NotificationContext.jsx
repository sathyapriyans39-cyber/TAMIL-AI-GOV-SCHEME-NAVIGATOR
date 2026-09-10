/**
 * Notification Context
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const API_BASE = 'http://localhost:5000/api';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { token, user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/notifications`, { headers });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.warn('Failed to fetch notifications:', err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications, user]);

  const markAsRead = async (id) => {
    try {
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch(`${API_BASE}/notifications/${id}/read`, {
        method: 'PUT',
        headers
      });

      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification read:', err);
    }
  };

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isOpen,
        setIsOpen,
        markAsRead,
        refreshNotifications: fetchNotifications,
        toast,
        showToast
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
