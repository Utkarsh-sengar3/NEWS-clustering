"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Theme } from "@/types/cluster";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("newscluster_theme_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("newscluster_theme_change", callback);
  };
}

function getStoredThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("newscluster_theme") as Theme | null;
  if (saved && (saved === "dark" || saved === "light" || saved === "system")) {
    return saved;
  }
  return "dark";
}

function getStoredThemeServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToStorage,
    getStoredThemeSnapshot,
    getStoredThemeServerSnapshot
  );

  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      const active: "dark" | "light" =
        theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme;

      setResolvedTheme(active);

      const root = document.documentElement;
      if (active === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    updateTheme();

    const handleMediaChange = () => {
      if (theme === "system") {
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("newscluster_theme", newTheme);
      window.dispatchEvent(new Event("newscluster_theme_change"));
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
