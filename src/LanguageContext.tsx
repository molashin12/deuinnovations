import React, { createContext, useContext, useState, useEffect } from "react";
import type { Language, TranslationSchema } from "./i18n";
import { translations } from "./i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load language from localStorage, fallback to English
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("deu_language");
    if (saved === "en" || saved === "de" || saved === "ar") {
      return saved;
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("deu_language", lang);
  };

  useEffect(() => {
    // Update HTML attributes for text direction (RTL/LTR) and language lang
    const htmlElement = document.documentElement;
    htmlElement.lang = language;
    
    if (language === "ar") {
      htmlElement.dir = "rtl";
      htmlElement.classList.add("rtl-mode");
    } else {
      htmlElement.dir = "ltr";
      htmlElement.classList.remove("rtl-mode");
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
