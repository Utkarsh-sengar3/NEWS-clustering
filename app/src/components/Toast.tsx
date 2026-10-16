"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { ToastMessage } from "@/types/cluster";

interface ToastContextType {
  toast: (message: string, type?: "success" | "info" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: "success" | "info" | "error" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all animate-in slide-in-from-bottom-5 duration-200 ${
              t.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200"
                : t.type === "error"
                ? "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:text-rose-200"
                : "border-blue-500/30 bg-blue-500/10 text-blue-950 dark:text-blue-200"
            }`}
          >
            <div className="flex items-center gap-3 text-xs font-medium">
              {t.type === "success" && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
              {t.type === "error" && <AlertCircle size={16} className="text-rose-500 shrink-0" />}
              {t.type === "info" && <Info size={16} className="text-blue-500 shrink-0" />}
              <span>{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
