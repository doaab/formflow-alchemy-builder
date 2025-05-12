
import { useContext } from 'react';
import { TranslationContext } from '@/context/TranslationContext';
import { TranslationHook } from '@/i18n/types';

export const useTranslation = (): TranslationHook => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default useTranslation;
