
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/TranslationContext';
import { Navigate } from 'react-router-dom';
import { setDocumentLanguage } from '@/i18n/languageUtils';

const AppLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { currentLanguage } = useTranslation();
  const isRtl = currentLanguage === 'ar';

  // Set document language and direction
  useEffect(() => {
    setDocumentLanguage(currentLanguage);
  }, [currentLanguage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div 
      className={`flex flex-col h-screen ${isRtl ? 'rtl' : 'ltr'}`} 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <MainHeader />
      <div className={`flex flex-1 overflow-hidden ${isRtl ? 'flex-row-reverse' : ''}`}>
        <RightSidebar />
        <LeftSidebar />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
