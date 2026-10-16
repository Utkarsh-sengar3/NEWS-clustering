"use client";

import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, Laptop, ChevronDown, Check } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Theme } from "@/types/cluster";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "dark", label: "Dark", icon: <Moon size={14} className="text-blue-400" /> },
    { value: "light", label: "Light", icon: <Sun size={14} className="text-amber-500" /> },
    { value: "system", label: "System", icon: <Laptop size={14} className="text-slate-400" /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme mode"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur transition hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
      >
        {resolvedTheme === "dark" ? (
          <Moon size={14} className="text-blue-400" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
        <span className="capitalize hidden sm:inline">{theme}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0c1020]/95 p-1 shadow-xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                  isSelected
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check size={13} className="text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
