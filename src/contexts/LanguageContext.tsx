"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Language = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LANGUAGE = "en";

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage?: string;
}) {
  // Initialize language from localStorage or initialLanguage
  const getInitialLanguage = (): Language => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        return storedLanguage;
      }
    }
    return initialLanguage || DEFAULT_LANGUAGE;
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [isLoading, setIsLoading] = useState(true);

  // Sync localStorage with initialLanguage on mount if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (!storedLanguage && initialLanguage) {
        localStorage.setItem("language", initialLanguage);
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = useCallback(async (lang: Language) => {
    // Update local state
    setLanguageState(lang);
    
    // Update localStorage
    localStorage.setItem("language", lang);
    
    // Sync with server session
    try {
      await fetch("/api/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: lang }),
      });
    } catch (error) {
      console.error("Failed to sync language with server:", error);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

