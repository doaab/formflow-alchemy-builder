
import React from 'react';
import SidebarItem from './SidebarItem';
import { Home, FileText, Users, Settings, ExternalLink, HelpCircle } from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

interface SidebarMenuProps {
  collapsed?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed = false }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-2 text-sm font-medium">
        <SidebarItem 
          icon={<Home />} 
          label={t('dashboard')} 
          path="/dashboard" 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<FileText />} 
          label={t('forms')} 
          path="/forms" 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<Users />} 
          label={t('users')} 
          path="/users" 
          collapsed={collapsed}
          adminOnly 
        />
        <SidebarItem 
          icon={<Settings />} 
          label={t('settings')} 
          path="/settings" 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<HelpCircle />} 
          label={t('help')} 
          path="/help" 
          collapsed={collapsed}
        />
        <SidebarItem 
          icon={<ExternalLink />} 
          label={t('documentation')} 
          path="https://docs.example.com" 
          collapsed={collapsed}
        />
      </nav>
    </div>
  );
};

export default SidebarMenu;
