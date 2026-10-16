"use client";

import React, { useState } from "react";
import { MODEL_METRICS } from "@/data/clusters";
import { Database, Network, Binary, Cpu, BarChart2, HelpCircle } from "lucide-react";

export function StatsSection() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const primaryStats = [
    {
      value: "120K",
      label: "Articles Analyzed",
      subtext: "AG News training corpus",
      icon: Database,
    },
    {
      value: "12",
      label: "Discovered Clusters",
      subtext: "Unsupervised K-Means",
      icon: Network,
    },
    {
      value: "30K",
      label: "TF-IDF Features",
      subtext: "Unigram & bigram vocabulary",
      icon: Binary,
    },
    {
      value: "100D",
      label: "SVD Feature Space",
      subtext: "Latent Semantic Analysis",
      icon: Cpu,
    },
  ];

  const evalMetrics = [
    {
      id: "silhouette",
      metric: "Silhouette Score",
      value: MODEL_METRICS.fullDataset.silhouette.toFixed(4),
      ideal: "Higher is better ([-1, 1])",
      tooltip: "Calculates the average difference between intra-cluster distance and nearest-cluster distance. Positive values indicate sample points are closer to their own cluster centroid than to other clusters.",
      desc: "Measures cluster cohesion vs. separation in 100D SVD space.",
    },
    {
      id: "davies",
      metric: "Davies-Bouldin Index",
      value: MODEL_METRICS.fullDataset.daviesBouldin.toFixed(3),
      ideal: "Lower is better (≥ 0)",
      tooltip: "Assesses similarity between each cluster and its most similar one. Lower values signify that clusters are compact and well-separated from neighboring groups.",
      desc: "Ratio of within-cluster scatter to between-cluster separation.",
    },
    {
      id: "calinski",
      metric: "Calinski-Harabasz Index",
      value: MODEL_METRICS.fullDataset.calinskiHarabasz.toFixed(2),
      ideal: "Higher is better",
      tooltip: "Variance ratio criterion computing the ratio of between-cluster dispersion to within-cluster dispersion. Higher values denote denser, well-separated clusters.",
      desc: "Variance ratio criterion evaluating overall cluster density.",
    },
  ];

  return (
    <section className="relative z-10 border-y border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.015] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-3.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <BarChart2 size={13} className="text-blue-500" />
            DATASET INSIGHTS
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Model at a Glance
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            High-dimensional sparse lexical representation compressed into latent semantic dimensions.
          </p>
        </div>

        {/* Primary Pipeline Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {primaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 text-center shadow-sm transition hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-white/[0.05]"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Icon size={20} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  {stat.label}
                </div>
                <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clustering Evaluation Metrics Cards with Tooltips */}
        <div className="mt-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.08] pb-4 mb-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Unsupervised Internal Clustering Metrics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculated on the full 120K dataset in 100D TruncatedSVD space without ground-truth labels.
              </p>
            </div>
            <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 self-start sm:self-auto">
              Geometric Validation
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {evalMetrics.map((item) => (
              <div
                key={item.metric}
                className="relative rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] p-5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">{item.metric}</span>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveTooltip(item.id)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={() => setActiveTooltip(activeTooltip === item.id ? null : item.id)}
                    className="p-1 text-slate-400 hover:text-blue-500 transition"
                    aria-label={`Info for ${item.metric}`}
                  >
                    <HelpCircle size={14} />
                  </button>
                </div>

                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white font-mono">
                  {item.value}
                </div>

                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {item.ideal}
                </div>

                <div className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.desc}
                </div>

                {/* Tooltip Overlay */}
                {activeTooltip === item.id && (
                  <div className="absolute inset-x-2 bottom-2 z-20 rounded-xl border border-blue-500/20 bg-white/95 dark:bg-[#0c1020]/95 p-3 text-[11px] text-slate-700 dark:text-slate-300 shadow-xl backdrop-blur-md animate-in fade-in duration-150">
                    {item.tooltip}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 text-center text-xs text-slate-400 dark:text-slate-500">
            * Note: These metrics represent intrinsic geometric cluster quality within the learned feature space, not supervised classification accuracy.
          </div>
        </div>
      </div>
    </section>
  );
}
