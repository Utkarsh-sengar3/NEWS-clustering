"use client";

import React from "react";
import { Scale, Trophy, BarChart } from "lucide-react";
import { MODEL_METRICS } from "@/data/clusters";

export function ModelComparison() {
  const comp = MODEL_METRICS.controlled20kComparison;

  return (
    <section id="comparison" className="relative z-10 px-6 py-20 sm:py-28 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Scale size={14} />
            EMPIRICAL EVALUATION
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Classical vs Semantic Clustering
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Controlled evaluation on a representative 20,000-article benchmark comparing sparse lexical LSA against dense neural embeddings.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.03]">
                  <th className="p-5 font-semibold text-slate-700 dark:text-slate-200">
                    Clustering Pipeline
                  </th>
                  <th className="p-5 font-semibold text-slate-700 dark:text-slate-200">
                    Feature Space
                  </th>
                  <th className="p-5 font-semibold text-slate-700 dark:text-slate-200">
                    Silhouette Score <br />
                    <span className="text-[10px] font-normal text-slate-400">(Higher is better)</span>
                  </th>
                  <th className="p-5 font-semibold text-slate-700 dark:text-slate-200">
                    Davies-Bouldin Index <br />
                    <span className="text-[10px] font-normal text-slate-400">(Lower is better)</span>
                  </th>
                  <th className="p-5 font-semibold text-slate-700 dark:text-slate-200">
                    Calinski-Harabasz <br />
                    <span className="text-[10px] font-normal text-slate-400">(Higher is better)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {/* Classical Row (Winner) */}
                <tr className="bg-blue-500/[0.04] dark:bg-blue-500/[0.06]">
                  <td className="p-5 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span>{comp.classical.name}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <Trophy size={11} />
                        Selected Model
                      </span>
                    </div>
                  </td>
                  <td className="p-5 font-mono text-xs text-slate-600 dark:text-slate-300">
                    {comp.classical.features}
                  </td>
                  <td className="p-5 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    {comp.classical.silhouette.toFixed(6)}
                  </td>
                  <td className="p-5 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    {comp.classical.daviesBouldin.toFixed(6)}
                  </td>
                  <td className="p-5 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    {comp.classical.calinskiHarabasz.toFixed(2)}
                  </td>
                </tr>

                {/* Semantic Row */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                  <td className="p-5 font-medium text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2">
                      <span>{comp.semantic.name}</span>
                    </div>
                  </td>
                  <td className="p-5 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {comp.semantic.features}
                  </td>
                  <td className="p-5 font-mono text-slate-600 dark:text-slate-400 text-base">
                    {comp.semantic.silhouette.toFixed(6)}
                  </td>
                  <td className="p-5 font-mono text-slate-600 dark:text-slate-400 text-base">
                    {comp.semantic.daviesBouldin.toFixed(6)}
                  </td>
                  <td className="p-5 font-mono text-slate-600 dark:text-slate-400 text-base">
                    {comp.semantic.calinskiHarabasz.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer Note */}
          <div className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.01] p-5 text-xs text-slate-500 dark:text-slate-400">
            * Benchmark conducted with identical K=12 clusters and seed=42 on 20,000 articles sampled from the AG News training set.
          </div>
        </div>

        {/* Honest Scientific Conclusion Card */}
        <div className="mt-8 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/[0.04] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <BarChart size={18} />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Honest Empirical Takeaway
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;For this dataset and evaluated representation spaces, the classical TF-IDF + SVD pipeline produced stronger internal clustering metrics. This demonstrates that a more advanced semantic representation is not automatically better for every clustering task.&rdquo;
              </p>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 pt-1">
                While dense transformer embeddings excel in cross-sentence semantic nuance and paraphrase detection, high-dimensional lexical TF-IDF with LSA provided crisper spherical partitions for news topic classification without requiring GPU inference overhead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
