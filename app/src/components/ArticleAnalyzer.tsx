"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Keyboard,
  Upload,
  Globe,
  CheckCircle2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { PredictionResult, ArticlePreviewData } from "@/types/cluster";
import { EXAMPLE_ARTICLES } from "@/data/examples";
import { ArticlePreview } from "./ArticlePreview";
import { AnalysisResult } from "./AnalysisResult";
import { useToast } from "./Toast";

interface ArticleAnalyzerProps {
  onAnalyzeSuccess?: (result: PredictionResult) => void;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type InputTab = "paste" | "upload" | "url";
type UploadState = "default" | "hover" | "uploading" | "extracting" | "ready" | "error";

export function ArticleAnalyzer({ onAnalyzeSuccess }: ArticleAnalyzerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<InputTab>("paste");

  // Input states
  const [articleText, setArticleText] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [uploadState, setUploadState] = useState<UploadState>("default");
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Extracted preview state (for file/url/paste edit)
  const [preview, setPreview] = useState<ArticlePreviewData | null>(null);

  // Analysis result & loading
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = articleText.trim() ? articleText.trim().split(/\s+/).length : 0;
  const charCount = articleText.length;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  // --- EXAMPLE HANDLERS ---
  const handleLoadExample = (categoryName: string) => {
    const found = EXAMPLE_ARTICLES.find(
      (a) => a.category.toLowerCase() === categoryName.toLowerCase()
    ) || EXAMPLE_ARTICLES[0];

    setArticleText(found.text);
    setActiveTab("paste");
    setPreview(null);
    setError(null);
    setResult(null);
    toast(`Loaded example article: "${found.title}"`, "info");
    textareaRef.current?.focus();
  };

  const handleClearAll = () => {
    setArticleText("");
    setUrlInput("");
    setPreview(null);
    setResult(null);
    setError(null);
    setUploadState("default");
    setUploadedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast("Input cleared", "info");
  };

  // --- ML PREDICTION ---
  const executePrediction = async (textToPredict: string) => {
    const text = textToPredict.trim();
    if (!text) {
      setError("Please provide article text to analyze.");
      return;
    }

    if (text.length < 15) {
      setError("Article text is too short to extract meaningful TF-IDF features. Please provide a complete sentence or paragraph.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Prediction request failed.");
      }

      const data: PredictionResult = await response.json();
      setResult(data);
      onAnalyzeSuccess?.(data);
      toast(`Discovered Topic: ${data.topic} (Cluster #${String(data.cluster).padStart(2, "0")})`, "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("usable text after preprocessing")) {
        setError("Article contains no usable text after preprocessing and stop-word filtering. Please enter standard journalistic text.");
      } else {
        setError("Unable to reach the ML service. Make sure the FastAPI backend is running (uvicorn backend.main:app).");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FILE EXTRACTION ---
  const handleFileUpload = useCallback(async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "docx", "txt"].includes(ext)) {
      setError("Unsupported file format. Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt) file.");
      setUploadState("error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10 MB limit.");
      setUploadState("error");
      return;
    }

    setUploadState("uploading");
    setExtracting(true);
    setError(null);
    setResult(null);
    setUploadedFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadState("extracting");
      const response = await fetch(`${API_BASE_URL}/extract-file`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "File extraction failed.");
      }

      const data = await response.json();
      const extractedWords = data.text.trim().split(/\s+/).length;

      setPreview({
        title: file.name,
        source: `${data.file_type} Document`,
        inputType: ext as "pdf" | "docx" | "txt",
        filename: file.name,
        text: data.text,
        wordCount: extractedWords,
        charCount: data.text.length,
        readingTimeMin: Math.max(1, Math.ceil(extractedWords / 200)),
      });

      setUploadState("ready");
      toast(`Extracted ${extractedWords.toLocaleString()} words from ${file.name}`, "success");
    } catch (err: unknown) {
      setUploadState("error");
      const msg = err instanceof Error ? err.message : "Failed to extract file contents.";
      setError(msg);
    } finally {
      setExtracting(false);
    }
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadState("default");
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (uploadState !== "hover") setUploadState("hover");
  };

  const handleDragLeave = () => {
    if (uploadState === "hover") setUploadState("default");
  };

  // --- URL EXTRACTION ---
  const handleUrlExtract = async () => {
    let cleanUrl = urlInput.trim();
    if (!cleanUrl) {
      setError("Please enter an article URL.");
      return;
    }

    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    setExtracting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/extract-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "URL article extraction failed.");
      }

      const data = await response.json();
      const extractedWords = data.text.trim().split(/\s+/).length;

      setPreview({
        title: data.title,
        source: data.source,
        inputType: "url",
        url: cleanUrl,
        text: data.text,
        wordCount: extractedWords,
        charCount: data.text.length,
        readingTimeMin: Math.max(1, Math.ceil(extractedWords / 200)),
      });

      toast(`Extracted article from ${data.source}`, "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to extract article from URL.";
      setError(msg);
    } finally {
      setExtracting(false);
    }
  };

  // Ctrl/Cmd + Enter shortcut
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (!loading) {
        executePrediction(articleText);
      }
    }
  };

  const exampleChips = [
    { label: "Technology", category: "Technology" },
    { label: "Sports", category: "Sports" },
    { label: "Business", category: "Business" },
    { label: "Politics", category: "Politics" },
    { label: "Oil & Energy", category: "Oil & Energy" },
    { label: "World Conflict", category: "World" },
  ];

  return (
    <section id="analyzer" className="relative z-10 px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
            <Sparkles size={14} />
            ARTICLE ANALYZER
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Discover the Hidden Topic in Any News Article
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Choose your preferred input method to map any news piece into the 12-topic space learned from 120,000 articles.
          </p>
        </div>

        {/* Input Mode Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-1.5 shadow-sm backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab("paste");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition ${
                activeTab === "paste"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FileText size={15} />
              <span>Paste Text</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("upload");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition ${
                activeTab === "upload"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Upload size={15} />
              <span>Upload Document</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("url");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition ${
                activeTab === "url"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Globe size={15} />
              <span>Article URL</span>
            </button>
          </div>
        </div>

        {/* Example Chips Bar */}
        <div className="mb-6 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-400 font-medium mr-1 shrink-0">
            Example articles:
          </span>
          {exampleChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleLoadExample(chip.category)}
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-white/[0.06] shrink-0 transition"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* --- TAB 1: PASTE TEXT --- */}
        {activeTab === "paste" && (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 shadow-2xl shadow-slate-900/5 dark:shadow-black/50 backdrop-blur-xl transition-all">
            {/* Top info bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-white/[0.08] px-6 py-3.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 font-medium">
                <BookOpen size={14} className="text-blue-500" />
                <span>Article Textarea</span>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span>{wordCount} words &middot; {charCount.toLocaleString()} chars</span>
                <span className="hidden sm:inline text-violet-500">~{readingTimeMin} min read</span>
                <div className="hidden sm:flex items-center gap-1 text-slate-400">
                  <Keyboard size={12} />
                  <span>Ctrl + Enter</span>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={articleText}
              onChange={(e) => {
                setArticleText(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste a full news article or headline here (or click an Example article chip above)..."
              rows={7}
              className="w-full resize-y bg-transparent p-6 text-sm sm:text-base leading-relaxed text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 dark:border-white/[0.08] p-5">
              <button
                type="button"
                onClick={handleClearAll}
                disabled={loading || !articleText}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-40"
              >
                <RotateCcw size={13} />
                <span>Clear</span>
              </button>

              <button
                type="button"
                onClick={() => executePrediction(articleText)}
                disabled={loading || !articleText.trim()}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 2: UPLOAD DOCUMENT --- */}
        {activeTab === "upload" && (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
                uploadState === "hover"
                  ? "border-blue-500 bg-blue-500/10 scale-[1.01]"
                  : uploadState === "uploading" || uploadState === "extracting"
                  ? "border-amber-500/50 bg-amber-500/5"
                  : uploadState === "ready"
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-slate-300 dark:border-white/15 bg-slate-50/50 dark:bg-white/[0.02] hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                {extracting ? (
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                ) : uploadState === "ready" ? (
                  <CheckCircle2 size={28} className="text-emerald-500" />
                ) : (
                  <Upload size={28} />
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {uploadState === "hover"
                  ? "Drop to upload"
                  : extracting
                  ? "Extracting article text..."
                  : uploadState === "ready"
                  ? `Loaded ${uploadedFileName}`
                  : "Drop your article here, or browse files"}
              </h3>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                Supported formats: <strong className="text-slate-700 dark:text-slate-200">PDF</strong>,{" "}
                <strong className="text-slate-700 dark:text-slate-200">DOCX</strong>, and{" "}
                <strong className="text-slate-700 dark:text-slate-200">TXT</strong> (up to 10 MB).
              </p>

              <button
                type="button"
                className="mt-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm"
              >
                Browse Files
              </button>
            </div>
          </div>
        )}

        {/* --- TAB 3: ARTICLE URL --- */}
        {activeTab === "url" && (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Public Article URL
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://www.reuters.com/article/technology-..."
                      className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleUrlExtract}
                    disabled={extracting || !urlInput.trim()}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition disabled:opacity-50"
                  >
                    {extracting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        <span>Extracting...</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink size={14} />
                        <span>Fetch & Extract</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] p-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong>Safety & Extraction:</strong> NewsLens extracts the primary article text while automatically filtering out navigation menus, sidebars, advertisements, and tracking scripts.
              </div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-800 dark:text-rose-300 animate-in fade-in duration-200">
            <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold">Unable to process input</div>
              <p className="text-rose-700/80 dark:text-rose-300/80">{error}</p>
            </div>
          </div>
        )}

        {/* Article Preview Card (For Document / URL / Edited Text) */}
        {preview && (
          <ArticlePreview
            preview={preview}
            onTextChange={(newText) => {
              const updatedWords = newText.trim() ? newText.trim().split(/\s+/).length : 0;
              setPreview({
                ...preview,
                text: newText,
                wordCount: updatedWords,
                charCount: newText.length,
                readingTimeMin: Math.max(1, Math.ceil(updatedWords / 200)),
              });
            }}
            onAnalyze={() => executePrediction(preview.text)}
            onClear={handleClearAll}
            loading={loading}
          />
        )}

        {/* Prediction Analysis Result Card */}
        {result && <AnalysisResult result={result} />}
      </div>
    </section>
  );
}
