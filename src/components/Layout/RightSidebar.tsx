
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  ChevronDown,
  FileText, 
  BarChart2, 
  HelpCircle,
  Users,
  Bell,
  Mail,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const RightSidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/dashboard'
    },
    {
      name: 'main',
      icon: <Home className="h-5 w-5" />,
      path: '/'
    },
    {
      name: 'forms',
      icon: <FileText className="h-5 w-5" />,
      path: '/forms'
    },
    {
      name: 'users',
      icon: <Users className="h-5 w-5" />,
      path: '/users'
    },
    {
      name: 'advertisingCampaigns',
      icon: <Bell className="h-5 w-5" />,
      path: '/campaigns'
    },
    {
      name: 'bank',
      icon: <FileText className="h-5 w-5" />,
      path: '/bank'
    },
    {
      name: 'notifications',
      icon: <Bell className="h-5 w-5" />,
      path: '/notifications'
    },
    {
      name: 'conversations',
      icon: <Mail className="h-5 w-5" />,
      path: '/conversations'
    },
    {
      name: 'customerService',
      icon: <Users className="h-5 w-5" />,
      path: '/service'
    },
    {
      name: 'settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings'
    },
    {
      name: 'helpCenter',
      icon: <HelpCircle className="h-5 w-5" />,
      path: '/help'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#7e69ab] text-white flex flex-col h-full rtl:border-l ltr:border-r border-gray-200 overflow-y-auto">
      <div className="p-4 flex items-center justify-center">
        <h2 className="text-xl font-bold">{t('formBuilder')}</h2>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? 'bg-white/10' 
                    : 'hover:bg-white/5'
                }`}
              >
                <span className="ltr:mr-3 rtl:ml-3">{item.icon}</span>
                <span className="flex-1">{t(item.name)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/20">
        <Link 
          to="/login" 
          className="flex items-center p-2 rounded-md hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
          <span>{t('logout')}</span>
        </Link>
      </div>
    </aside>
  );
};

export default RightSidebar;
