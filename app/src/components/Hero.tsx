"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Layers3,
  Cpu,
  Binary,
  Network,
  FileText,
  CheckCircle2,
} from "lucide-react";

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    { name: "Article", icon: FileText, desc: "Raw input text, document, or URL" },
    { name: "Preprocessing", icon: Cpu, desc: "HTML cleaning, lowercasing & stopwords" },
    { name: "TF-IDF", icon: Binary, desc: "30,000 lexical unigrams and bigrams" },
    { name: "TruncatedSVD", icon: Layers3, desc: "Dimensionality reduction to 100D space" },
    { name: "K-Means", icon: Network, desc: "Euclidean clustering into 12 centroids" },
    { name: "Discovered Topic", icon: CheckCircle2, desc: "Interpretable semantic news category" },
  ];

  return (
    <section className="relative z-10 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-5xl text-center">
        {/* Eyebrow Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400 backdrop-blur-md">
          <Sparkles size={14} />
          UNSUPERVISED MACHINE LEARNING
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Discover the Hidden <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 dark:from-blue-400 dark:via-cyan-300 dark:to-violet-400 bg-clip-text text-transparent">
            Structure of News.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          An unsupervised machine learning system that automatically discovers meaningful topics and groups related news articles without predefined topic labels.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
          <a
            href="#analyzer"
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/35 hover:-translate-y-0.5"
          >
            <span>Analyze an Article</span>
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </a>

          <a
            href="#clusters"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur transition hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:-translate-y-0.5"
          >
            <Layers3 size={16} className="text-violet-500" />
            <span>Explore 12 Topics</span>
          </a>

          <a
            href="#methodology"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur transition hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:-translate-y-0.5"
          >
            <Cpu size={16} className="text-cyan-500" />
            <span>View Methodology</span>
          </a>
        </div>

        {/* Interactive Visual ML Pipeline Nodes */}
        <div className="mt-14 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-wider">End-to-End Inference Pipeline</span>
            <span className="font-mono text-blue-500 dark:text-blue-400">
              Stage {activeStep + 1} of 6: {pipelineSteps[activeStep].name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.name}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex flex-col items-center rounded-2xl border p-3.5 text-center transition duration-200 ${
                    isActive
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-md"
                      : "border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl ${
                    isActive ? "bg-blue-500 text-white" : "bg-slate-200/70 dark:bg-white/10 text-slate-500 dark:text-slate-300"
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-semibold">{step.name}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 font-mono">0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-black/30 p-3 text-xs text-slate-600 dark:text-slate-300">
            <strong className="text-slate-800 dark:text-white font-medium">{pipelineSteps[activeStep].name}: </strong>
            {pipelineSteps[activeStep].desc}
          </div>
        </div>
      </div>
    </section>
  );
}
