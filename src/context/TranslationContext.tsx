
import React, { createContext, useState, useEffect } from 'react';
import { TranslationHook } from '@/i18n/types';
import languages from '@/i18n/languages';

// Create the context with default values
export const TranslationContext = createContext<TranslationHook>({
  t: (key: string) => key,
  currentLanguage: 'en',
  changeLanguage: () => {},
  supportedLanguages: ['en']
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
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
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
    supportedLanguages
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
