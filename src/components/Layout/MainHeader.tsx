
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/context/TranslationContext';
import { LogOut, Menu, Search } from 'lucide-react';

const MainHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleLanguage, t, currentLanguage } = useTranslation();
  
  const isRtl = currentLanguage === 'ar';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className={`flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700 mr-3">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <h1 className="text-lg font-semibold">{t('hi')}, {user?.name}</h1>
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Input 
            type="search" 
            placeholder={`${t('search')}...`} 
            className={`w-full bg-gray-100 focus:bg-white ${isRtl ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
          />
          <div className={`absolute inset-y-0 ${isRtl ? 'left-3' : 'right-3'} flex items-center pointer-events-none`}>
            <Search className="h-5 w-5 text-gray-400" />
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
