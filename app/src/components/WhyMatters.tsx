"use client";

import React from "react";
import { HelpCircle, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

export function WhyMatters() {
  const exampleCategories = [
    { label: "Technology", desc: "Software, hardware, internet services, cybersecurity" },
    { label: "Sports", desc: "Olympics, baseball, basketball, international leagues" },
    { label: "Business", desc: "Corporate earnings, mergers, stock indices, quarterly profits" },
    { label: "Politics", desc: "Elections, governance, legislation, international diplomacy" },
    { label: "Energy", desc: "Crude oil benchmarks, OPEC quotas, fuel commodity markets" },
    { label: "International News", desc: "Regional conflicts, global events, foreign dispatches" },
  ];

  return (
    <section className="relative z-10 px-6 py-16 sm:py-20 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <HelpCircle size={14} />
            MOTIVATION & IMPACT
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Why This Project Matters
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            With thousands of news stories published every hour, manual tagging is expensive and biased. Unsupervised clustering surfaces natural narratives automatically.
          </p>
        </div>

        {/* Comparison: Traditional vs NewsLens */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Traditional Way */}
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/[0.03] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4">
              <XCircle size={16} />
              Traditional Approach
            </div>

            <div className="flex flex-col gap-3 py-4">
              <div className="rounded-2xl border border-rose-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-3.5 text-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                Thousands of Raw Articles
              </div>
              <div className="flex justify-center text-rose-400">
                <ArrowRight size={14} className="rotate-90 md:rotate-90" />
              </div>
              <div className="rounded-2xl border border-rose-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-3.5 text-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                Manual Tagging & Fixed Rules (Costly & Slow)
              </div>
              <div className="flex justify-center text-rose-400">
                <ArrowRight size={14} className="rotate-90 md:rotate-90" />
              </div>
              <div className="rounded-2xl border border-rose-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-3.5 text-center text-xs font-semibold text-rose-700 dark:text-rose-300">
                Rigid, Predefined Taxonomy
              </div>
            </div>
          </div>

          {/* NewsLens ML Way */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4">
              <CheckCircle2 size={16} />
              NewsLens Pipeline
            </div>

            <div className="flex flex-col gap-3 py-4">
              <div className="rounded-2xl border border-emerald-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-3.5 text-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                Thousands of Raw Articles
              </div>
              <div className="flex justify-center text-emerald-400">
                <ArrowRight size={14} className="rotate-90 md:rotate-90" />
              </div>
              <div className="rounded-2xl border border-emerald-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-3.5 text-center text-xs font-semibold text-slate-700 dark:text-slate-200">
                TF-IDF + TruncatedSVD Representation
              </div>
              <div className="flex justify-center text-emerald-400">
                <ArrowRight size={14} className="rotate-90 md:rotate-90" />
              </div>
              <div className="rounded-2xl border border-emerald-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-3.5 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                K-Means Unsupervised Discovered Topics
              </div>
            </div>
          </div>
        </div>

        {/* Real Example Category Chips */}
        <div className="mt-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Discovered Topic Domains Discovered Without Prior Labels:
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exampleCategories.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] p-3.5"
              >
                <div className="font-semibold text-xs text-slate-900 dark:text-white">
                  {c.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
