"use client";

import React, { useState, useMemo } from "react";
import {
  Layers3,
  Search,
  LayoutGrid,
  List,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { CLUSTERS } from "@/data/clusters";
import { ClusterCategory, ClusterInfo } from "@/types/cluster";
import { ClusterCard } from "./ClusterCard";
import { ClusterModal } from "./ClusterModal";

export function ClusterExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ClusterCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"id" | "size-desc" | "size-asc">("id");
  const [activeModalCluster, setActiveModalCluster] = useState<ClusterInfo | null>(null);

  const categories: ClusterCategory[] = [
    "All",
    "World",
    "Technology",
    "Business",
    "Sports",
    "Politics",
    "Local",
    "Lifestyle",
    "General",
  ];

  const filteredClusters = useMemo(() => {
    return CLUSTERS.filter((cluster) => {
      // Category filter
      if (selectedCategory !== "All" && cluster.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = cluster.name.toLowerCase().includes(q);
        const matchesDesc = cluster.description.toLowerCase().includes(q);
        const matchesTerms = cluster.topTerms.some((t) => t.toLowerCase().includes(q));
        const matchesId = `#${cluster.id}`.includes(q) || `${cluster.id}` === q;
        return matchesName || matchesDesc || matchesTerms || matchesId;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "size-desc") return b.articleCount - a.articleCount;
      if (sortBy === "size-asc") return a.articleCount - b.articleCount;
      return a.id - b.id;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <section id="clusters" className="relative z-10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
              <Layers3 size={14} />
              CLUSTER EXPLORER
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              12 Discovered Topics
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Discovered from unstructured text through TF-IDF representation, TruncatedSVD dimensionality reduction, and K-Means clustering.
            </p>
          </div>

          {/* Quick Summary Badge */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 self-start md:self-auto">
            <span>Showing:</span>
            <strong className="text-slate-900 dark:text-white font-mono">{filteredClusters.length}</strong>
            <span>of 12 clusters</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          {/* Search, Sort, and View Mode */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or cluster #..."
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Sort Select */}
              <div className="relative flex items-center">
                <ArrowUpDown size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "id" | "size-desc" | "size-asc")}
                  className="appearance-none rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] pl-8 pr-8 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none hover:bg-slate-50 dark:hover:bg-white/[0.05] transition cursor-pointer"
                >
                  <option value="id">Sort: Cluster ID</option>
                  <option value="size-desc">Sort: Size (High → Low)</option>
                  <option value="size-asc">Sort: Size (Low → High)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-xl p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-slate-100 dark:bg-white/15 text-blue-600 dark:text-white"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-xl p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-slate-100 dark:bg-white/15 text-blue-600 dark:text-white"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  }`}
                  title="List view"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1 shrink-0">
              <Filter size={12} />
              Filter:
            </span>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium shrink-0 transition ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clusters Grid / List Display */}
        {filteredClusters.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-3"
            }
          >
            {filteredClusters.map((cluster) => (
              <ClusterCard
                key={cluster.id}
                cluster={cluster}
                viewMode={viewMode}
                onClick={() => setActiveModalCluster(cluster)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-12 text-center">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No clusters match your filter criteria
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search terms or selecting &ldquo;All&rdquo; categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detailed Modal Dialog */}
        <ClusterModal
          cluster={activeModalCluster}
          onClose={() => setActiveModalCluster(null)}
        />
      </div>
    </section>
  );
}
