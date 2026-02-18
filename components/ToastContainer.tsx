import React from 'react';
import { useUI } from '../contexts/UIContext';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function ToastContainer(): JSX.Element {
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return <></>;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? AlertCircle : Info;
        const bgColor = toast.type === 'success' ? 'bg-lockin-success' : toast.type === 'error' ? 'bg-lockin-danger' : 'bg-lockin-accent';

        return (
          <div
            key={toast.id}
            role="alert"
            className={`flex items-start space-x-3 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in`}
          >
            <Icon size={20} className="mt-0.5 flex-shrink-0" />
            <p className="flex-1 text-sm">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-80"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
