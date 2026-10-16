"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-xl backdrop-blur-md transition hover:scale-110 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white animate-in fade-in zoom-in-75 duration-200"
    >
      <ArrowUp size={18} />
    </button>
  );
}
