"use client";

import React from "react";
import { AlertCircle, Lightbulb } from "lucide-react";

export function Limitations() {
  const limitations = [
    "Some clusters (e.g., Cluster 11) are broad and capture multiple overlapping governance and political subtopics.",
    "Cluster size distribution is heavily imbalanced, reflecting natural skew in wire service reporting volumes.",
    "Web and RSS markup artifacts (such as &lt;, &gt;, fullquote) formed an artifact cluster (Cluster 5).",
    "K-Means assumes spherical cluster geometry in Euclidean space, which may approximate complex textual manifolds imperfectly.",
    "Internal metrics (Silhouette, Davies-Bouldin, Calinski-Harabasz) depend strictly on the geometric properties of the representation space.",
    "Dense semantic embeddings (Sentence-BERT) did not outperform classical TF-IDF + SVD on this dataset's internal clustering criteria.",
    "Human domain interpretation remains essential to assign meaningful labels to discovered mathematical centroids.",
    "Unsupervised clusters should never be treated as ground-truth classification labels without downstream human verification.",
  ];

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/40 dark:bg-transparent">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <AlertCircle size={14} />
            METHODOLOGICAL RIGOR
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Limitations & Engineering Lessons
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transparent analysis of unsupervised machine learning constraints, edge cases, and practical findings.
          </p>
        </div>

        {/* 8 Limitations Grid */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {limitations.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] p-4 sm:p-5 shadow-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold mt-0.5">
                0{idx + 1}
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Key Takeaway Banner */}
        <div className="mt-10 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Lightbulb size={24} />
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Key Engineering Takeaway
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              &ldquo;Model sophistication alone does not guarantee better results. Data quality, representation, clustering assumptions, and evaluation methodology all matter.&rdquo;
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
              Building practical AI systems requires evaluating inductive biases rather than assuming complex deep learning models automatically suit every unsupervised grouping problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
