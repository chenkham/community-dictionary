'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Check, X, AlertTriangle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastType, typeof Check> = { success: Check, error: X, info: Info, warning: AlertTriangle };
const colors: Record<ToastType, string> = {
  success: 'text-[#059669] bg-[#059669]/10',
  error: 'text-[#DC2626] bg-[#DC2626]/10',
  info: 'text-[#0891B2] bg-[#0891B2]/10',
  warning: 'text-[#D97706] bg-[#D97706]/10',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex items-center gap-2.5 bg-[var(--modal-bg)] border border-[var(--border)] rounded-lg px-3.5 py-2.5 shadow-lg shadow-black/5 anim-fade-up min-w-[200px] max-w-sm"
            >
              <div className={`p-1 rounded-full shrink-0 ${colors[t.type]}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm flex-1">{t.message}</span>
              <button onClick={() => remove(t.id)} className="text-[var(--text-light)] hover:text-[var(--text)] shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
