import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewsLens — AI-Powered News Clustering & Topic Discovery",
  description:
    "An end-to-end unsupervised machine learning system that discovers hidden topics and patterns across 120,000 news articles using TF-IDF, TruncatedSVD, and K-Means clustering.",
  keywords: [
    "NewsLens",
    "Machine Learning",
    "Topic Modeling",
    "Unsupervised Clustering",
    "TF-IDF",
    "TruncatedSVD",
    "K-Means",
    "NLP",
    "FastAPI",
    "Next.js",
    "Utkarsh Sengar",
  ],
  authors: [{ name: "Utkarsh Sengar" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
