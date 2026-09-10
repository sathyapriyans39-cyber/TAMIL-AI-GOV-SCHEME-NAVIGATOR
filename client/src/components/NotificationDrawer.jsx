/**
 * NotificationDrawer Component
 * Slide-out notification center for scheme match alerts, new releases, and deadlines
 */

import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

export function NotificationDrawer({ onSelectScheme }) {
  const { lang, t } = useLanguage();
  const { notifications, unreadCount, isOpen, setIsOpen, markAsRead } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-left">
          
          {/* Drawer Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-2 bg-slate-800 rounded-xl">
                <Bell className="w-5 h-5 text-emerald-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-extrabold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-base">
                  {lang === 'ta' ? 'அறிவிப்புகள் & திட்ட எச்சரிக்கைகள்' : 'Scheme Notifications & Alerts'}
                </h3>
                <p className="text-xs text-slate-300">
                  {unreadCount} {lang === 'ta' ? 'படிக்காத அறிவிப்புகள்' : 'unread notifications'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {notifications.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Bell className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">
                  {lang === 'ta' ? 'அறிவிப்புகள் எதுவும் இல்லை' : 'No notifications yet'}
                </p>
              </div>
            ) : (
              notifications.map((notif) => {
                const isRead = notif.isRead;
                return (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markAsRead(notif.id);
                      if (notif.schemeId && onSelectScheme) {
                        onSelectScheme({ id: notif.schemeId, schemeName: notif.title });
                        setIsOpen(false);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isRead 
                        ? 'bg-white border-slate-200 opacity-80' 
                        : 'bg-emerald-50/70 border-emerald-300 shadow-xs ring-1 ring-emerald-400/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs">
                          {notif.type === 'NEW_SCHEME' ? '📢' : notif.type === 'ELIGIBILITY_MATCH' ? '🎯' : '💡'}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {lang === 'ta' ? notif.tamilTitle || notif.title : notif.title}
                        </h4>
                      </div>

                      {!isRead && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {lang === 'ta' ? notif.tamilMessage || notif.message : notif.message}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100/80 text-[10px] text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(notif.createdAt || Date.now()).toLocaleDateString()}</span>
                      </span>

                      {notif.schemeId && (
                        <span className="font-bold text-emerald-800 flex items-center space-x-0.5">
                          <span>{lang === 'ta' ? 'திட்டத்தைப் பார்' : 'View Scheme'}</span>
                          <span>→</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default NotificationDrawer;
