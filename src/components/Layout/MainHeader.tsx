
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/context/TranslationContext';
import { LogOut, Menu } from 'lucide-react';

const MainHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleLanguage, t, currentLanguage } = useTranslation();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold mr-4">{t('hi')}, {user?.name}</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Input 
            type="search" 
            placeholder={`${t('search')}...`} 
            className="w-full bg-gray-100 focus:bg-white"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleLanguage}
          className="font-semibold"
        >
          {currentLanguage === 'ar' ? 'EN' : 'AR'}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => logout()}
          title={t('logout')}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
