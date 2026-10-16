"use client";

import React from "react";
import { Sparkles, ArrowUp } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const techStack = [
    "Python",
    "scikit-learn",
    "Pandas",
    "NumPy",
    "TF-IDF",
    "TruncatedSVD",
    "K-Means",
    "Sentence Transformers",
    "FastAPI",
    "Next.js",
    "React",
    "Tailwind CSS",
  ];

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-white/[0.08] bg-slate-900/[0.02] dark:bg-black/30 px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-4 border-b border-slate-200/80 dark:border-white/[0.08] pb-12">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20">
                <Sparkles size={16} />
              </div>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                NewsLens
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              AI-powered unsupervised learning for discovering hidden structure in news. Uncovering 12 cohesive topics across 120,000 articles without manual labels.
            </p>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
              Developed by <strong className="text-slate-800 dark:text-slate-200">Utkarsh Sengar</strong>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Explore
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400">
              <a href="#analyzer" className="hover:text-blue-600 dark:hover:text-white transition">
                Analyze Article
              </a>
              <a href="#clusters" className="hover:text-blue-600 dark:hover:text-white transition">
                Discovered Topics
              </a>
              <a href="#insights" className="hover:text-blue-600 dark:hover:text-white transition">
                Dataset Insights
              </a>
              <a href="#methodology" className="hover:text-blue-600 dark:hover:text-white transition">
                Methodology
              </a>
            </div>
          </div>

          {/* Project & Tech Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Project
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-400">
              <a href="#about" className="hover:text-blue-600 dark:hover:text-white transition">
                About NewsLens
              </a>
              <a href="#comparison" className="hover:text-blue-600 dark:hover:text-white transition">
                Model Comparison
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-white transition"
              >
                <GithubIcon size={13} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips & Bottom Info */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-1.5 max-w-2xl">
            <span className="text-xs text-slate-400 mr-1 font-semibold">Stack:</span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition self-end sm:self-auto shrink-0"
            title="Scroll to top"
          >
            <ArrowUp size={13} />
            <span>Top</span>
          </button>
        </div>

        <div className="mt-8 border-t border-slate-200/50 dark:border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <span>&copy; 2026 Utkarsh Sengar. Built as an independent machine learning project.</span>
          <span>Built with Python, scikit-learn, FastAPI, Next.js and React.</span>
        </div>
      </div>
    </footer>
  );
}
