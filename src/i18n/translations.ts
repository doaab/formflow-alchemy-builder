
// Type for translations
export type TranslationRecord = Record<string, string>;

// Import translations from the new structure
import { translations as languageTranslations } from './languages';

// Available translations
export const translations: Record<string, TranslationRecord> = languageTranslations;
