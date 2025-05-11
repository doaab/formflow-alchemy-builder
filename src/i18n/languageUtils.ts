
import { config } from "../config/config";

/**
 * Gets the current language from URL parameters
 * @returns The detected language code, or default language if not found
 */
export const getLanguageFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");
  
  if (langParam && config.supportedLanguages.includes(langParam)) {
    return langParam;
  }
  
  return config.defaultLanguage;
};

/**
 * Updates the document's direction and language attributes
 * @param language The language code to set
 */
export const setDocumentLanguage = (language: string): void => {
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = language;
};

/**
 * Updates the URL with the language parameter without page refresh
 * @param language The language code to set in URL
 */
export const updateUrlLanguage = (language: string): void => {
  if (!config.supportedLanguages.includes(language)) return;
  
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.pushState({}, "", url.toString());
};
