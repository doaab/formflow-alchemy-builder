import { useState, useEffect, useCallback } from "react";
import { translations } from "@/i18n/translations";
import { TranslationHook } from "@/i18n/types";
import { getLanguageFromUrl, setDocumentLanguage, updateUrlLanguage } from "@/i18n/languageUtils";
import { config } from "@/config/config";

/**
 * Hook for translating text and managing language settings
 * 
 * @returns Translation functions and language configuration
 */
export const useTranslation = (): TranslationHook => {
  // Get language from URL or use default
  const [currentLanguage, setCurrentLanguage] = useState<string>(getLanguageFromUrl());

  // Update language in URL without refreshing the page
  const changeLanguage = useCallback((lang: string) => {
    if (!config.supportedLanguages.includes(lang)) return;
    
    // Update URL parameter
    updateUrlLanguage(lang);
    
    // Update state
    setCurrentLanguage(lang);
    
    // Update HTML dir attribute for RTL/LTR support
    setDocumentLanguage(lang);
  }, []);

  // Update language when URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      const newLang = getLanguageFromUrl();
      setCurrentLanguage(newLang);
      setDocumentLanguage(newLang);
    };

    // Listen for popstate events (browser back/forward)
    window.addEventListener("popstate", handleUrlChange);
    
    // Set initial direction
    setDocumentLanguage(currentLanguage);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);
// Toggle language between two options (مثال بسيط)
  const toggleLanguage = useCallback(() => {
    const index = config.supportedLanguages.indexOf(currentLanguage);
    const nextIndex = (index + 1) % config.supportedLanguages.length;
    const nextLang = config.supportedLanguages[nextIndex];
    changeLanguage(nextLang);
  }, [currentLanguage, changeLanguage]);

  // Translation function
  const t = useCallback((key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  }, [currentLanguage]);

  return {
    t,
    currentLanguage,
    changeLanguage,
    toggleLanguage,
    supportedLanguages: config.supportedLanguages,
  };
};
