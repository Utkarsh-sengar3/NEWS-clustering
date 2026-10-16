"use client";

import React, { useRef } from "react";
import {
  FileText,
  Clock,
  BookOpen,
  Sparkles,
  RotateCcw,
  Edit3,
  Globe,
  FileType,
} from "lucide-react";
import { ArticlePreviewData } from "@/types/cluster";

interface ArticlePreviewProps {
  preview: ArticlePreviewData;
  onTextChange: (newText: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  loading: boolean;
}

export function ArticlePreview({
  preview,
  onTextChange,
  onAnalyze,
  onClear,
  loading,
}: ArticlePreviewProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditFocus = () => {
    textareaRef.current?.focus();
  };

  const getInputTypeBadge = () => {
    switch (preview.inputType) {
      case "pdf":
        return { label: "PDF Document", icon: FileType, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
      case "docx":
        return { label: "Word Document", icon: FileText, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
      case "txt":
        return { label: "Plain Text File", icon: FileText, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" };
      case "url":
        return { label: "Web Article (URL)", icon: Globe, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" };
      default:
        return { label: "Pasted Text", icon: Edit3, color: "text-violet-500 bg-violet-500/10 border-violet-500/20" };
    }
  };

  const badge = getInputTypeBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="mt-8 rounded-3xl border border-blue-500/30 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.08] pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badge.color}`}
            >
              <BadgeIcon size={13} />
              <span>{badge.label}</span>
            </span>

            {preview.source && (
              <span className="rounded-full border border-slate-200 dark:border-white/10 px-2.5 py-0.5 text-xs text-slate-500 dark:text-slate-400">
                Source: {preview.source}
              </span>
            )}
          </div>

          {preview.title && (
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-1">
              {preview.title}
            </h3>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 self-start sm:self-auto shrink-0">
          <span className="flex items-center gap-1">
            <BookOpen size={13} className="text-blue-500" />
            <strong>{preview.wordCount}</strong> words
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-violet-500" />
            ~{preview.readingTimeMin} min read
          </span>
        </div>
      </div>

      {/* Editable Text Area */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Review or edit extracted text before analysis:</span>
          <button
            type="button"
            onClick={handleEditFocus}
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Edit3 size={12} />
            <span>Click to Edit</span>
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={preview.text}
          onChange={(e) => onTextChange(e.target.value)}
          rows={7}
          className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 p-4 text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 transition"
          placeholder="Extracted article text..."
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-white/[0.08] pt-4">
        <button
          type="button"
          onClick={onClear}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-white/10"
        >
          <RotateCcw size={13} />
          <span>Clear & Start Over</span>
        </button>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading || !preview.text.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <span>Mapping article into learned feature space...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Analyze Article</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
