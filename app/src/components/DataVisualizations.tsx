"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
} from "recharts";
import { CLUSTERS } from "@/data/clusters";
import { BarChart3, ScatterChart as ScatterIcon, KeyRound } from "lucide-react";

export function DataVisualizations() {
  const [activeTab, setActiveTab] = useState<"distribution" | "pca" | "keywords">("distribution");
  const [selectedClusterId, setSelectedClusterId] = useState<number>(3);

  // Data for bar chart
  const barData = CLUSTERS.map((c) => ({
    name: `Cluster #${c.id}`,
    fullName: c.name,
    count: c.articleCount,
    percentage: c.datasetPercentage,
    category: c.category,
  }));

  // Data for 2D PCA scatter
  const scatterData = CLUSTERS.map((c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    x: c.pcaX ?? 0,
    y: c.pcaY ?? 0,
    size: Math.max(100, Math.sqrt(c.articleCount) * 8),
  }));

  const selectedCluster = CLUSTERS.find((c) => c.id === selectedClusterId) || CLUSTERS[3];

  const categoryColors: Record<string, string> = {
    Technology: "#3b82f6",
    World: "#ef4444",
    Sports: "#10b981",
    Business: "#f59e0b",
    Politics: "#8b5cf6",
    Energy: "#f97316",
    Lifestyle: "#ec4899",
    Local: "#06b6d4",
    General: "#64748b",
  };

  return (
    <section id="insights" className="relative z-10 px-6 py-20 sm:py-28 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/40 dark:bg-transparent">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <BarChart3 size={14} />
            DATA VISUALIZATIONS
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore the Learned Representation Space
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Authentic statistical distributions and projections calculated directly from the 120,000 news dataset.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-1.5 shadow-sm backdrop-blur-md">
            <button
              onClick={() => setActiveTab("distribution")}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === "distribution"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BarChart3 size={14} />
              <span>Cluster Size Distribution</span>
            </button>

            <button
              onClick={() => setActiveTab("pca")}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === "pca"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ScatterIcon size={14} />
              <span>2D PCA Projection</span>
            </button>

            <button
              onClick={() => setActiveTab("keywords")}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition ${
                activeTab === "keywords"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <KeyRound size={14} />
              <span>Top Terms per Cluster</span>
            </button>
          </div>
        </div>

        {/* Visualizations Container */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          {/* TAB 1: CLUSTER DISTRIBUTION */}
          {activeTab === "distribution" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Article Count per Discovered Cluster
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Distribution across 120,000 news articles in the dataset.
                  </p>
                </div>
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  Total: 120,000 articles
                </span>
              </div>

              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      angle={-30}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0c1020]/95 p-3 text-xs shadow-xl backdrop-blur-md">
                              <div className="font-bold text-slate-900 dark:text-white">
                                {d.name}: {d.fullName}
                              </div>
                              <div className="text-blue-600 dark:text-blue-400 font-mono mt-1 font-semibold">
                                {d.count.toLocaleString()} articles ({d.percentage}%)
                              </div>
                              <div className="text-slate-400 text-[10px] mt-0.5">Category: {d.category}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {barData.map((entry) => (
                        <Cell key={entry.name} fill={categoryColors[entry.category] || "#3b82f6"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 2: 2D PCA SCATTER */}
          {activeTab === "pca" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    2D PCA Projection of Cluster Centroids
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Principal Component Analysis projection from 100D TruncatedSVD space to 2D.
                  </p>
                </div>
              </div>

              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="PC1"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      domain={[-0.6, 0.6]}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="PC2"
                      stroke="#94a3b8"
                      fontSize={11}
                      tickLine={false}
                      domain={[-0.6, 0.4]}
                    />
                    <ZAxis type="number" dataKey="size" range={[60, 400]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0c1020]/95 p-3 text-xs shadow-xl backdrop-blur-md">
                              <div className="font-bold text-slate-900 dark:text-white">
                                Cluster #{d.id}: {d.name}
                              </div>
                              <div className="text-slate-400 text-[10px] mt-1">
                                Category: {d.category}
                              </div>
                              <div className="font-mono text-blue-500 text-[11px] mt-0.5">
                                PC1: {d.x.toFixed(4)}, PC2: {d.y.toFixed(4)}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Centroids" data={scatterData}>
                      {scatterData.map((entry) => (
                        <Cell key={entry.id} fill={categoryColors[entry.category] || "#3b82f6"} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-black/30 p-3.5 text-center text-xs text-slate-500 dark:text-slate-400">
                * Note: 2D projection shown for visualization only. Clustering itself was performed in the learned 100-dimensional Latent Semantic Analysis feature space.
              </div>
            </div>
          )}

          {/* TAB 3: KEYWORDS MATRIX */}
          {activeTab === "keywords" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/[0.08] pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Top TF-IDF Keywords by Cluster
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Centroid coefficients projected back into the 30,000-word vocabulary space.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Select Cluster:</span>
                  <select
                    value={selectedClusterId}
                    onChange={(e) => setSelectedClusterId(Number(e.target.value))}
                    className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none"
                  >
                    {CLUSTERS.map((c) => (
                      <option key={c.id} value={c.id}>
                        Cluster #{String(c.id).padStart(2, "0")} — {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded-md">
                    Cluster #{String(selectedCluster.id).padStart(2, "0")}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {selectedCluster.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedCluster.articleCount.toLocaleString()} articles ({selectedCluster.datasetPercentage}% of dataset) &middot; Category: {selectedCluster.category}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Dominant Vocabulary Terms:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {selectedCluster.topTerms.map((term, idx) => (
                    <div
                      key={term}
                      className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3.5 py-2.5"
                    >
                      <span className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                        #{term}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
