"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectOverview } from "@/components/ProjectOverview";
import { WhyMatters } from "@/components/WhyMatters";
import { ArticleAnalyzer } from "@/components/ArticleAnalyzer";
import { ClusterExplorer } from "@/components/ClusterExplorer";
import { StatsSection } from "@/components/StatsSection";
import { DataVisualizations } from "@/components/DataVisualizations";
import { Methodology } from "@/components/Methodology";
import { ModelComparison } from "@/components/ModelComparison";
import { Limitations } from "@/components/Limitations";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackendHealth } from "@/types/cluster";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [backendHealth, setBackendHealth] = useState<BackendHealth>({
    status: "checking",
  });

  // Check backend health on mount and periodically
  useEffect(() => {
    let isMounted = true;

    async function checkHealth() {
      try {
        const res = await fetch(`${API_BASE_URL}/health`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok && isMounted) {
          const data = await res.json();
          setBackendHealth({
            status: "healthy",
            modelLoaded: data.model_loaded,
            clusters: data.clusters,
          });
        } else if (isMounted) {
          setBackendHealth({ status: "offline" });
        }
      } catch {
        if (isMounted) {
          setBackendHealth({ status: "offline" });
        }
      }
    }

    checkHealth();
    const interval = setInterval(checkHealth, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#05070e] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-600 transition-colors duration-300">
      {/* Subtle Background Glows & Grid Pattern */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden bg-grid-pattern opacity-60 dark:opacity-40" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[140px]" />
        <div className="absolute -right-[150px] top-[400px] h-[500px] w-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px]" />
        <div className="absolute -left-[150px] top-[1000px] h-[500px] w-[500px] rounded-full bg-violet-500/10 dark:bg-violet-600/10 blur-[140px]" />
      </div>

      {/* Sticky Header Navbar */}
      <Navbar backendHealth={backendHealth} />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <ProjectOverview />
        <WhyMatters />
        <ArticleAnalyzer />
        <ClusterExplorer />
        <StatsSection />
        <DataVisualizations />
        <Methodology />
        <ModelComparison />
        <Limitations />
        <About />
      </main>

      {/* Footer & Floating Controls */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}