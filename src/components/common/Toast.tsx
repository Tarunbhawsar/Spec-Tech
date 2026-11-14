import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium px-4 py-3 rounded-xl shadow-2xl border border-slate-700 dark:border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
      <span>{toastMessage}</span>
    </div>
  );
};
