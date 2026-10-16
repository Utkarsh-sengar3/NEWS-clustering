"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Binary,
  Cpu,
  Hash,
  ArrowRight,
  TrendingUp,
  Ruler,
} from "lucide-react";
import { PredictionResult } from "@/types/cluster";
import { CLUSTERS } from "@/data/clusters";
import { useToast } from "./Toast";

interface AnalysisResultProps {
  result: PredictionResult;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const { toast } = useToast();
  const [pipelineExpanded, setPipelineExpanded] = useState(false);

  const clusterMeta = CLUSTERS.find((c) => c.id === result.cluster) || {
    id: result.cluster,
    name: result.topic,
    category: "General" as const,
    articleCount: 0,
    datasetPercentage: 0,
    topTerms: [],
    description: "Assigned topic based on learned feature space representation.",
    interpretation: "Vector clustering mapped this article into nearest cluster centroid.",
    samples: [],
  };

  const handleCopy = () => {
    const textToCopy = `NewsLens Analysis Result:
Discovered Topic: ${result.topic} (Cluster #${String(result.cluster).padStart(2, "0")})
Distance to Centroid: ${result.distance_to_centroid ?? "N/A"}
Dataset Share: ${clusterMeta.datasetPercentage}% (${clusterMeta.articleCount.toLocaleString()} articles in 120K corpus)
Top TF-IDF Keywords: ${clusterMeta.topTerms.slice(0, 8).join(", ")}
Pipeline: Unsupervised TF-IDF (30K) + TruncatedSVD (100D) + K-Means (K=12)`;

    navigator.clipboard.writeText(textToCopy);
    toast("Analysis result copied to clipboard!", "success");
  };

  const handleShare = async () => {
    const shareData = {
      title: `NewsLens: ${result.topic}`,
      text: `Analyzed article was mapped to Cluster #${String(result.cluster).padStart(2, "0")} (${result.topic}) in the 120,000 news dataset.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast("Result shared successfully!", "success");
      } catch {
        // User aborted share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/[0.07] via-slate-900/[0.4] to-indigo-500/[0.05] p-6 sm:p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/10 pb-5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 dark:text-blue-400">
              <CheckCircle2 size={14} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Discovered Topic Result
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 transition hover:bg-white dark:hover:bg-white/10"
              title="Copy analysis summary"
            >
              <Copy size={13} />
              <span>Copy</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 transition hover:bg-white dark:hover:bg-white/10"
              title="Share result"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-blue-500/15 px-2.5 py-1 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                Cluster #{String(result.cluster).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-slate-300 dark:border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {clusterMeta.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {result.topic}
            </h3>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl">
              {clusterMeta.description}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-3 shrink-0 sm:w-60">
            {result.distance_to_centroid !== undefined && (
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-3.5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Ruler size={13} className="text-blue-500" />
                  <span>Distance to Centroid</span>
                </div>
                <div className="mt-1 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                  {result.distance_to_centroid}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Hash size={13} className="text-indigo-500" />
                <span>Cluster Size</span>
              </div>
              <div className="mt-1 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                {clusterMeta.articleCount.toLocaleString()}
                <span className="ml-1 text-xs font-normal text-slate-400">articles</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <TrendingUp size={13} className="text-violet-500" />
                <span>Dataset Proportion</span>
              </div>
              <div className="mt-1 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                {clusterMeta.datasetPercentage}%
                <span className="ml-1 text-xs font-normal text-slate-400">of 120K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Keywords Tags */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Dominant Lexical Features (TF-IDF):
          </div>
          <div className="flex flex-wrap gap-2">
            {clusterMeta.topTerms.map((term) => (
              <span
                key={term}
                className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-xs font-medium text-blue-700 dark:text-blue-300"
              >
                #{term}
              </span>
            ))}
          </div>
        </div>

        {/* Interpretation Note */}
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-800 dark:text-slate-200">Cluster Interpretation: </span>
          {clusterMeta.interpretation}
        </div>

        {/* Expandable Pipeline Explanation */}
        <div className="border-t border-slate-200/60 dark:border-white/10 pt-4">
          <button
            onClick={() => setPipelineExpanded(!pipelineExpanded)}
            className="flex w-full items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-blue-500" />
              How was this topic determined?
            </span>
            {pipelineExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {pipelineExpanded && (
            <div className="mt-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 p-4 sm:p-5 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in duration-200">
              <div className="grid gap-3 sm:grid-cols-5 items-center">
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-center">
                  <FileText size={16} className="mx-auto mb-1 text-slate-400" />
                  <div className="font-semibold text-slate-800 dark:text-white">Article</div>
                  <div className="text-[10px] text-slate-400">Raw Input</div>
                </div>

                <div className="hidden sm:flex justify-center text-slate-400">
                  <ArrowRight size={14} />
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-center">
                  <Binary size={16} className="mx-auto mb-1 text-blue-500" />
                  <div className="font-semibold text-slate-800 dark:text-white">TF-IDF</div>
                  <div className="text-[10px] text-slate-400">30K Lexical Matrix</div>
                </div>

                <div className="hidden sm:flex justify-center text-slate-400">
                  <ArrowRight size={14} />
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-3 text-center">
                  <Cpu size={16} className="mx-auto mb-1 text-indigo-500" />
                  <div className="font-semibold text-slate-800 dark:text-white">SVD (100D)</div>
                  <div className="text-[10px] text-slate-400">Truncated Latent Space</div>
                </div>
              </div>

              <div className="mt-4 text-center sm:text-left text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                The input text undergoes HTML tag stripping, regex tokenization, and stop-word filtering. It is projected into the 30,000 TF-IDF vocabulary space, compressed into 100 latent dimensions with TruncatedSVD, and Euclidean-assigned to centroid #{result.cluster}.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
