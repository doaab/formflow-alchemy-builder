
import React, { createContext, useState, useEffect, useContext } from 'react';
import { TranslationHook } from '@/i18n/types';
import languages from '@/i18n/languages';
import { setDocumentLanguage, updateUrlLanguage } from '@/i18n/languageUtils';

// Create the context with default values
export const TranslationContext = createContext<TranslationHook>({
  t: (key: string) => key,
  currentLanguage: 'en',
  changeLanguage: () => {},
  supportedLanguages: ['en'],
  toggleLanguage: () => {}
});

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const supportedLanguages = Object.keys(languages);

  // Function to get translation by key
  const t = (key: string): string => {
    const translations = languages[currentLanguage as keyof typeof languages];
    return translations && key in translations
      ? translations[key as keyof typeof translations]
      : key;
  };

  // Function to change the language
  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setCurrentLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      setDocumentLanguage(lang);
      updateUrlLanguage(lang);
    }
  };

  // Function to toggle between supported languages
  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(nextLang);
  };

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      changeLanguage(savedLanguage);
    } else {
      // Default to browser language if supported, otherwise use English
      const browserLang = navigator.language.split('-')[0];
      changeLanguage(supportedLanguages.includes(browserLang) ? browserLang : 'en');
    }
  }, []);

  const value: TranslationHook = {
    t,
    currentLanguage,
    changeLanguage,
    supportedLanguages,
    toggleLanguage
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Add useTranslation hook directly in the TranslationContext file
export const useTranslation = (): TranslationHook => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
