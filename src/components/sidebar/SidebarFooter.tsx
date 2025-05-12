
import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';

const SidebarFooter = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  
  return (
    <div className="p-4 mt-auto border-t">
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" className="justify-start">
          <Settings className="mr-2 h-4 w-4" />
          {t('settings')}
        </Button>
        <Button variant="outline" size="sm" className="justify-start text-red-500" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
