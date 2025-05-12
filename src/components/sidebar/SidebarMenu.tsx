
import React from 'react';
import SidebarItem from './SidebarItem';
import { Home, FileText, Users, Settings, ExternalLink, InfoIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const SidebarMenu: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-2 text-sm font-medium">
        <SidebarItem 
          icon={<Home />} 
          label={t('dashboard')} 
          path="/dashboard" 
        />
        <SidebarItem 
          icon={<FileText />} 
          label={t('forms')} 
          path="/forms" 
        />
        <SidebarItem 
          icon={<Users />} 
          label={t('users')} 
          path="/users" 
          adminOnly 
        />
        <SidebarItem 
          icon={<Settings />} 
          label={t('settings')} 
          path="/settings" 
        />
        <SidebarItem 
          icon={<InfoIcon />} 
          label={t('help')} 
          path="/help" 
        />
        <SidebarItem 
          icon={<ExternalLink />} 
          label={t('documentation')} 
          path="https://docs.example.com" 
        />
      </nav>
    </div>
  );
};

export default SidebarMenu;
