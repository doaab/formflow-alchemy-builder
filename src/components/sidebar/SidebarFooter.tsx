
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/TranslationContext';

interface SidebarFooterProps {
  collapsed?: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed = false }) => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  
  return (
    <div className="p-4 border-t border-gray-700">
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="text-sm">
            <p className="text-gray-400">{t('version')} 2.0</p>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
