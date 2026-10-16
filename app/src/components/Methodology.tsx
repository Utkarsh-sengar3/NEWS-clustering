"use client";

import React from "react";
import {
  Database,
  FileCode,
  Binary,
  Layers3,
  Network,
  Search,
  CheckCircle2,
  Cpu,
  BarChart2,
  GitCompare,
  Rocket,
  Filter,
} from "lucide-react";

export function Methodology() {
  const steps = [
    {
      number: "01",
      title: "Data Collection",
      subtitle: "120,000 Articles",
      desc: "Aggregated raw corpus from AG News news feed archives spanning global dispatches, tech updates, market reports, and sports events.",
      icon: Database,
    },
    {
      number: "02",
      title: "Data Cleaning",
      subtitle: "Corpus Normalization",
      desc: "Sanitized corrupt character encodings, stripped non-standard whitespace, and deduplicated identical wire service dispatches.",
      icon: Filter,
    },
    {
      number: "03",
      title: "Text Preprocessing",
      subtitle: "Lexical Filtering",
      desc: "Stripped HTML tags, removed punctuation and special characters, lowercased all tokens, and filtered standard English stopwords.",
      icon: FileCode,
    },
    {
      number: "04",
      title: "TF-IDF Vectorization",
      subtitle: "30,000 Features",
      desc: "Extracted unigrams and bigrams (ngram_range=(1,2)) with sublinear term-frequency scaling and document frequency limits (min_df=5, max_df=0.95).",
      icon: Binary,
    },
    {
      number: "05",
      title: "Dimensionality Reduction",
      subtitle: "TruncatedSVD (100D)",
      desc: "Applied Latent Semantic Analysis (LSA) via TruncatedSVD to compress the 30,000-dimensional sparse TF-IDF space into 100 dense latent dimensions.",
      icon: Layers3,
    },
    {
      number: "06",
      title: "K Selection",
      subtitle: "Cluster Optimization",
      desc: "Evaluated inertia curves and metric trade-offs to determine an optimal, interpretable cluster count of K=12.",
      icon: Search,
    },
    {
      number: "07",
      title: "K-Means Clustering",
      subtitle: "12 Centroids",
      desc: "Partitions the 100D latent space into 12 distinct clusters using Lloyd's algorithm with k-means++ initialization (random_state=42).",
      icon: Network,
    },
    {
      number: "08",
      title: "Cluster Evaluation",
      subtitle: "Internal Metrics",
      desc: "Calculated Silhouette (0.0671), Davies-Bouldin (3.716), and Calinski-Harabasz (172.89) scores to evaluate geometry and cohesion.",
      icon: BarChart2,
    },
    {
      number: "09",
      title: "Semantic Comparison",
      subtitle: "all-MiniLM-L6-v2",
      desc: "Benchmarked classical TF-IDF+SVD against 384D dense Sentence-BERT embeddings on a controlled 20,000-article evaluation sample.",
      icon: GitCompare,
    },
    {
      number: "10",
      title: "Production Deployment",
      subtitle: "FastAPI + Next.js",
      desc: "Encapsulated scikit-learn models into a high-performance FastAPI service connected to a modern responsive Next.js portfolio interface.",
      icon: Rocket,
    },
  ];

  return (
    <section id="methodology" className="relative z-10 px-6 py-20 sm:py-28 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Cpu size={14} />
            10-STAGE METHODOLOGY
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineering & Research Timeline
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From raw, unlabelled text strings to geometric latent manifolds, evaluation benchmarks, and live ML inference.
          </p>
        </div>

        {/* 10-Step Timeline Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] p-5 shadow-sm transition duration-300 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition duration-300">
                      <Icon size={16} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5 mb-2">
                    {step.subtitle}
                  </div>

                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unsupervised Note Banner */}
        <div className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <CheckCircle2 size={24} />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Strictly Unsupervised Topic Discovery
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The clusters were discovered purely from the geometric distribution of lexical patterns without using any AG News category labels during the clustering phase. Topic titles were inferred after training by projecting centroid coefficients back into vocabulary space.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
