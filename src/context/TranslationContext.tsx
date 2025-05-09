
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageType = 'en' | 'ar';

interface TranslationContextType {
  currentLanguage: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // General
    formBuilder: 'Form Builder',
    hi: 'Hi',
    logout: 'Logout',
    search: 'Search',
    
    // Menu items
    main: 'Home',
    forms: 'Forms',
    responses: 'Responses',
    analytics: 'Analytics',
    settings: 'Settings',
    help: 'Help',
    
    // Auth
    email: 'Email',
    password: 'Password',
    login: 'Login',
    register: 'Register',
    name: 'Name',
    passwordConfirmation: 'Confirm Password',
    
    // Forms
    createForm: 'Create Form',
    editForm: 'Edit Form',
    formTitle: 'Form Title',
    formDescription: 'Form Description',
    formElements: 'Form Elements',
    formResponses: 'Form Responses',
    
    // Actions
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    add: 'Add',
  },
  ar: {
    // General
    formBuilder: 'منشئ النماذج',
    hi: 'مرحباً',
    logout: 'تسجيل الخروج',
    search: 'بحث',
    
    // Menu items
    main: 'الرئيسية',
    forms: 'النماذج',
    responses: 'الإجابات',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    help: 'المساعدة',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    name: 'الاسم',
    passwordConfirmation: 'تأكيد كلمة المرور',
    
    // Forms
    createForm: 'إنشاء نموذج',
    editForm: 'تعديل النموذج',
    formTitle: 'عنوان النموذج',
    formDescription: 'وصف النموذج',
    formElements: 'عناصر النموذج',
    formResponses: 'إجابات النموذج',
    
    // Actions
    submit: 'إرسال',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    add: 'إضافة',
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(() => {
    // Check local storage for saved language preference
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'en';
  });

  useEffect(() => {
    // Save language preference to local storage
    localStorage.setItem('language', currentLanguage);
    
    // Set direction on document
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = (lang: LanguageType) => {
    setCurrentLanguage(lang);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations["en"]] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setLanguage, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
