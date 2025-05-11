
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
    loading: 'Loading',
    
    // Menu items
    main: 'Home',
    forms: 'Forms',
    responses: 'Responses',
    analytics: 'Analytics',
    settings: 'Settings',
    help: 'Help',
    dashboard: 'Dashboard',
    
    // Auth
    email: 'Email',
    password: 'Password',
    login: 'Login',
    register: 'Register',
    name: 'Name',
    passwordConfirmation: 'Confirm Password',
    dontHaveAccount: 'Don\'t have an account',
    forgotPassword: 'Forgot Password?',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    rememberMe: 'Remember me',
    or: 'Or',
    
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
    
    // Content
    welcomeBack: 'Welcome back',
    signInToContinue: 'Sign in to continue',
    and: 'and',
    enter: 'Enter',
    
    // Dashboard
    statistics: 'Statistics',
    financialAffairs: 'Financial Affairs',
    registeredCompanies: 'Registered Companies',
    paidSubscriptions: 'Paid Subscriptions',
    purchasedPoints: 'Points Purchased',
    totalSales: 'Total Sales',
    totalSubscriptions: 'Total Subscriptions', 
    totalPoints: 'Total Points',
    totalProfit: 'Total Profit',
    latestPointTransfers: 'Latest Point Transfer Requests',
    requestNumber: 'Request No.',
    userName: 'User Name',
    phoneNumber: 'Phone Number',
    requestedPoints: 'Requested Points',
    requestDate: 'Request Date',
    transfer: 'Transfer',
    cancel: 'Cancel',
    users: 'Users',
    advertisingCampaigns: 'Advertising Campaigns',
    bank: 'Bank',
    notifications: 'Notifications',
    conversations: 'Conversations',
    customerService: 'Customer Service',
    settings: 'Settings',
    helpCenter: 'Help Center',
    logout: 'Logout',
  },
  ar: {
    // General
    formBuilder: 'منشئ النماذج',
    hi: 'مرحباً',
    logout: 'تسجيل الخروج',
    search: 'بحث',
    loading: 'جاري التحميل',
    
    // Menu items
    main: 'الرئيسية',
    forms: 'النماذج',
    responses: 'الإجابات',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    help: 'المساعدة',
    dashboard: 'لوحة التحكم',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    name: 'الاسم',
    passwordConfirmation: 'تأكيد كلمة المرور',
    dontHaveAccount: 'ليس لديك حساب',
    forgotPassword: 'نسيت كلمة المرور؟',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    rememberMe: 'تذكرني',
    or: 'أو',
    
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
    
    // Content
    welcomeBack: 'مرحباً بعودتك',
    signInToContinue: 'سجل الدخول للمتابعة',
    and: 'و',
    enter: 'أدخل',
    
    // Dashboard
    statistics: 'إحصائيات',
    financialAffairs: 'الأمور المالية',
    registeredCompanies: 'عدد الشركات المسجلة',
    paidSubscriptions: 'الاشتراكات المدفوعة',
    purchasedPoints: 'النقاط التي تم شرائها',
    totalSales: 'إجمالي عدد المبيعات',
    totalSubscriptions: 'إجمالي الاشتراكات', 
    totalPoints: 'إجمالي ربح النقاط',
    totalProfit: 'إجمالي الربح',
    latestPointTransfers: 'أحدث طلبات تحويل النقاط',
    requestNumber: 'رقم الطلب',
    userName: 'اسم المستخدم',
    phoneNumber: 'رقم الجوال',
    requestedPoints: 'النقاط المراد تحويلها',
    requestDate: 'تاريخ الطلب',
    transfer: 'تم التحويل',
    cancel: 'إلغاء',
    users: 'المستخدمين',
    advertisingCampaigns: 'الحملات الإعلانية',
    bank: 'بنك الأسئلة',
    notifications: 'الإشعارات',
    conversations: 'المحادثات',
    customerService: 'خدمة العملاء',
    settings: 'الإعدادات',
    helpCenter: 'مركز المساعدة',
    logout: 'تسجيل الخروج',
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
