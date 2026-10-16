"use client";

import React from "react";
import { Sparkles, User, Code2, CheckCircle2 } from "lucide-react";

export function About() {
  const competencies = [
    "Natural Language Processing (NLP)",
    "Text Preprocessing & Normalization",
    "TF-IDF Feature Engineering",
    "TruncatedSVD Dimensionality Reduction",
    "K-Means Clustering & K Selection",
    "Sentence-BERT Embeddings Comparison",
    "Unsupervised Metric Evaluation",
    "Interactive Data Visualizations",
    "FastAPI Production ML Serving",
    "Full-Stack Next.js & React Architecture",
  ];

  return (
    <section id="about" className="relative z-10 px-6 py-20 sm:py-28 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Sparkles size={14} />
            ABOUT THIS PROJECT
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About NewsLens
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            NewsLens was built to demonstrate an end-to-end machine learning lifecycle from raw textual exploration to interactive deployment.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Developer Card */}
          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 via-slate-900/[0.02] to-indigo-500/5 p-6 sm:p-8 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <User size={22} />
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Developer
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Utkarsh Sengar
                </h3>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              &ldquo;Hi, I&apos;m Utkarsh Sengar, a machine learning enthusiast focused on building practical AI and data-driven applications. I enjoy turning machine learning concepts into complete, usable products — from data preprocessing and model development to interactive interfaces and deployment.&rdquo;
            </p>

            <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Designed as a portfolio project showcasing applied unsupervised machine learning, data visualization, and full-stack API integration.
            </div>
          </div>

          {/* Project Capabilities & Skills Demonstrated */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Code2 size={18} className="text-indigo-500" />
              Machine Learning & Development Capabilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {competencies.map((comp) => (
                <div
                  key={comp}
                  className="flex items-center gap-2 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 size={13} className="text-blue-500 shrink-0" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
