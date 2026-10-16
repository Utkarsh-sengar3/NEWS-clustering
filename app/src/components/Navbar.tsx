"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Activity } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon } from "./icons/GithubIcon";
import { BackendHealth } from "@/types/cluster";

interface NavbarProps {
  backendHealth: BackendHealth;
}

export function Navbar({ backendHealth }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Analyze", href: "#analyzer" },
    { name: "Explore", href: "#clusters" },
    { name: "Insights", href: "#insights" },
    { name: "Methodology", href: "#methodology" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/80 dark:border-white/[0.08] bg-white/85 dark:bg-[#05070e]/85 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition group-hover:scale-105">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              NewsLens
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                120K ML
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Topic Discovery AI
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 text-xs font-semibold text-slate-600 dark:text-slate-300 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 transition hover:text-blue-600 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Backend Status indicator badge */}
          <div
            className={`hidden lg:flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
              backendHealth.status === "healthy"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : backendHealth.status === "checking"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
            }`}
            title={
              backendHealth.status === "healthy"
                ? "FastAPI ML backend running at :8000"
                : backendHealth.status === "checking"
                ? "Checking backend status..."
                : "Backend offline - Run: uvicorn backend.main:app"
            }
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                backendHealth.status === "healthy"
                  ? "bg-emerald-500 animate-pulse"
                  : backendHealth.status === "checking"
                  ? "bg-amber-500 animate-ping"
                  : "bg-slate-400"
              }`}
            />
            <span>{backendHealth.status === "healthy" ? "API Live" : "Local API"}</span>
          </div>

          <ThemeToggle />

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur transition hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/[0.08]"
          >
            <GithubIcon size={15} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] text-slate-700 dark:text-slate-200 md:hidden"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#05070e]/95 px-6 py-5 shadow-xl backdrop-blur-2xl md:hidden animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-3">
              <span className="text-xs text-slate-400">Backend API:</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Activity size={12} />
                {backendHealth.status === "healthy" ? "127.0.0.1:8000 Connected" : "Local Engine"}
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
