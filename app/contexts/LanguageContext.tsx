"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import en from "../../content/translations/en.json";
import mr from "../../content/translations/mr.json";
import hi from "../../content/translations/hi.json";

export type Language = "en" | "mr" | "hi";

// Typed on the English file — other languages are subsets / overrides
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
type Translations = typeof en;
type PartialTranslations = DeepPartial<Translations>;

const TRANSLATIONS: Record<Language, PartialTranslations> = { en, mr, hi };

export const LANGUAGES: { code: Language; label: string; full: string }[] = [
  { code: "en", label: "EN",     full: "English" },
  { code: "mr", label: "मराठी", full: "Marathi" },
  { code: "hi", label: "हिंदी", full: "Hindi"   },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Resolve a dot-separated key, e.g. t("nav.home") */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

function resolve(obj: Record<string, unknown>, keys: string[]): string | undefined {
  let cur: unknown = obj;
  for (const k of keys) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[k];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("orchid-lang") as Language | null;
    if (saved && (saved === "en" || saved === "mr" || saved === "hi")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("orchid-lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    const result = resolve(
      TRANSLATIONS[language] as Record<string, unknown>,
      keys
    );
    if (result !== undefined) return result;
    // Fallback to English
    const fallback = resolve(
      TRANSLATIONS.en as Record<string, unknown>,
      keys
    );
    return fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
