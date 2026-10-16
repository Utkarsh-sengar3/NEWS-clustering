"use client";

import React from "react";
import { ChevronRight, Hash, TrendingUp } from "lucide-react";
import { ClusterInfo } from "@/types/cluster";

interface ClusterCardProps {
  cluster: ClusterInfo;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export function ClusterCard({ cluster, viewMode, onClick }: ClusterCardProps) {
  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-white/[0.045] cursor-pointer text-left"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
            #{String(cluster.id).padStart(2, "0")}
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                {cluster.name}
              </h3>
              <span className="rounded-full border border-slate-200 dark:border-white/10 px-2 py-0.5 text-[10px] uppercase font-medium text-slate-500 dark:text-slate-400">
                {cluster.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-lg">
              {cluster.topTerms.slice(0, 5).join(" · ")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-white/[0.06]">
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
              {cluster.articleCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">
              {cluster.datasetPercentage}% of data
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 transition group-hover:translate-x-1">
            <span>Details</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-slate-50/80 dark:hover:bg-white/[0.045] hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer text-left"
    >
      <div>
        {/* Header Badges */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/15 px-2.5 py-1 rounded-lg">
            CLUSTER #{String(cluster.id).padStart(2, "0")}
          </span>

          <span className="rounded-full border border-slate-200 dark:border-white/10 px-2.5 py-0.5 text-[10px] uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400">
            {cluster.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {cluster.name}
        </h3>

        {/* Dataset Stats */}
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 font-mono">
            <Hash size={12} className="text-slate-400" />
            <strong className="text-slate-700 dark:text-slate-200">{cluster.articleCount.toLocaleString()}</strong> articles
          </span>
          <span className="flex items-center gap-1 font-mono">
            <TrendingUp size={12} className="text-slate-400" />
            <strong className="text-slate-700 dark:text-slate-200">{cluster.datasetPercentage}%</strong>
          </span>
        </div>

        {/* Top Terms Badges */}
        <div className="mt-5 space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Top Terms:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cluster.topTerms.slice(0, 5).map((term) => (
              <span
                key={term}
                className="rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-600 dark:text-slate-300"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/[0.06] pt-4 text-xs text-slate-400 transition group-hover:text-blue-600 dark:group-hover:text-blue-400">
        <span>Explore cluster breakdown</span>
        <ChevronRight size={14} className="transition group-hover:translate-x-1" />
      </div>
    </div>
  );
}
