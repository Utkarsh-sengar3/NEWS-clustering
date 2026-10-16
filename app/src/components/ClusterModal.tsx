"use client";

import React, { useEffect } from "react";
import { X, Copy, Hash, TrendingUp, Quote } from "lucide-react";
import { ClusterInfo } from "@/types/cluster";
import { useToast } from "./Toast";

interface ClusterModalProps {
  cluster: ClusterInfo | null;
  onClose: () => void;
}

export function ClusterModal({ cluster, onClose }: ClusterModalProps) {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!cluster) return null;

  const handleCopyCluster = () => {
    const text = `Cluster #${String(cluster.id).padStart(2, "0")}: ${cluster.name}
Category: ${cluster.category}
Articles: ${cluster.articleCount.toLocaleString()} (${cluster.datasetPercentage}%)
Keywords: ${cluster.topTerms.join(", ")}
Description: ${cluster.description}
Interpretation: ${cluster.interpretation}`;

    navigator.clipboard.writeText(text);
    toast(`Copied Cluster #${cluster.id} details`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0e1c] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-blue-500/15 px-2.5 py-1 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                Cluster #{String(cluster.id).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-slate-200 dark:border-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                {cluster.category}
              </span>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {cluster.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCluster}
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              title="Copy details"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              title="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-6 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Hash size={13} />
                <span>Cluster Size</span>
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white font-mono">
                {cluster.articleCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">Total assigned news articles</div>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <TrendingUp size={13} />
                <span>Dataset Proportion</span>
              </div>
              <div className="mt-1 text-xl font-bold text-slate-900 dark:text-white font-mono">
                {cluster.datasetPercentage}%
              </div>
              <div className="text-[11px] text-slate-400">of 120,000 corpus</div>
            </div>
          </div>

          {/* Description & Interpretation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Overview & Topic Interpretation
            </h4>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {cluster.description}
            </p>
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Centroid Pattern: </span>
              {cluster.interpretation}
            </div>
          </div>

          {/* Top Lexical Terms */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Top TF-IDF Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {cluster.topTerms.map((term, index) => (
                <span
                  key={term}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.05] px-3 py-1 font-mono text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  <span className="text-slate-400 text-[10px] mr-1">#{index + 1}</span>
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Real Representative Samples from Dataset */}
          {cluster.samples && cluster.samples.length > 0 && (
            <div className="space-y-3 border-t border-slate-100 dark:border-white/[0.08] pt-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Quote size={13} className="text-blue-500" />
                <span>Representative Articles from Dataset (120K Corpus)</span>
              </div>

              <div className="space-y-3">
                {cluster.samples.map((sample, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/80 dark:bg-white/[0.02] p-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300"
                  >
                    <span className="font-mono text-slate-400 font-medium block mb-1">
                      Sample #{idx + 1}
                    </span>
                    &ldquo;{sample}&rdquo;
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
