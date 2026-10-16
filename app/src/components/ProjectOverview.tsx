"use client";

import React from "react";
import { Sparkles, Compass, FolderTree, Search, Cpu } from "lucide-react";

export function ProjectOverview() {
  const features = [
    {
      title: "Automatic Topic Discovery",
      desc: "Uncovers natural topic categories across thousands of articles without requiring pre-labeled training datasets or manual category tagging.",
      icon: Compass,
      color: "from-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      title: "Article Grouping",
      desc: "Groups semantically related stories together using TF-IDF word frequencies and 100-dimensional Latent Semantic Analysis (TruncatedSVD).",
      icon: FolderTree,
      color: "from-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",
    },
    {
      title: "Interactive Cluster Exploration",
      desc: "Deep-dive into 12 discovered clusters with real-time search, category filters, top keyword breakdowns, and representative news articles.",
      icon: Search,
      color: "from-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    },
    {
      title: "ML-Powered Article Analysis",
      desc: "Analyze your own articles via text paste, document upload (PDF, DOCX, TXT), or live web URL scraping mapped instantly into the learned space.",
      icon: Cpu,
      color: "from-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
  ];

  return (
    <section className="relative z-10 px-6 py-16 sm:py-20 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/40 dark:bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles size={14} />
            PROJECT OVERVIEW
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            What is NewsLens?
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            NewsLens is an end-to-end unsupervised machine learning application that discovers hidden topics and patterns within news articles without relying on predefined topic labels during clustering.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-lg"
              >
                <div>
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border bg-gradient-to-br ${f.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {f.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
