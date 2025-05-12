
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/context/TranslationContext';
import { LogOut, Search, Bell, Menu } from 'lucide-react';
import { updateUrlLanguage } from '@/i18n/languageUtils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileMenu from './MobileMenu';

const MainHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleLanguage, t, currentLanguage } = useTranslation();
  
  const isRtl = currentLanguage === 'ar';

  const handleToggleLanguage = () => {
    toggleLanguage();
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRtl ? "right" : "left"} className="p-0">
            <MobileMenu />
          </SheetContent>
        </Sheet>
        
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <span className="text-lg font-semibold hidden md:inline">{t('hi')}, {user?.name}</span>
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
      
      <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleToggleLanguage}
          className="font-semibold"
        >
          {currentLanguage === 'ar' ? 'EN' : 'AR'}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={logout}
          title={t('logout')}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
