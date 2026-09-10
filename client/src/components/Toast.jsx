/**
 * Toast Component
 * Global floating notification alerts
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

export function Toast() {
  const { toast } = useNotifications();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm">
      <div className={`p-4 rounded-2xl shadow-xl border flex items-start space-x-3 ${
        isSuccess 
          ? 'bg-emerald-900 text-white border-emerald-700' 
          : isError 
          ? 'bg-red-900 text-white border-red-700' 
          : 'bg-slate-900 text-white border-slate-700'
      }`}>
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-red-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
        </div>

        <div className="flex-1 space-y-0.5">
          <h4 className="text-xs font-bold">{toast.title}</h4>
          <p className="text-xs text-slate-300">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
