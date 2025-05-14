
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '@/i18n/translations';
import { setDocumentLanguage } from '@/i18n/languageUtils';

type Language = 'en' | 'ar';

interface TranslationContextType {
  t: (key: string) => string;
  currentLanguage: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // Get stored language or default to English
  const getInitialLanguage = (): Language => {
    const storedLang = localStorage.getItem('language');
    return (storedLang === 'en' || storedLang === 'ar') ? storedLang : 'en';
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    setDocumentLanguage(currentLanguage);
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let translated = translations[currentLanguage];
    
    for (const k of keys) {
      if (translated && typeof translated === 'object' && k in translated) {
        translated = translated[k];
      } else {
        // Return the key itself if translation not found
        return key;
      }
    }
    
    return typeof translated === 'string' ? translated : key;
  };

  const contextValue = {
    t,
    currentLanguage,
    toggleLanguage,
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
