
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  ChevronDown,
  FileText, 
  BarChart2, 
  HelpCircle
} from 'lucide-react';
import { useTranslation } from '@/context/TranslationContext';

const RightSidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const menuItems = [
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
      name: 'responses',
      icon: <FileText className="h-5 w-5" />,
      path: '/forms'
    },
    {
      name: 'analytics',
      icon: <BarChart2 className="h-5 w-5" />,
      path: '/forms'
    },
    {
      name: 'settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings'
    },
    {
      name: 'help',
      icon: <HelpCircle className="h-5 w-5" />,
      path: '/docs'
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
                {item.name === 'analytics' && (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/20 text-sm text-center">
        <p>© {new Date().getFullYear()} {t('formBuilder')}</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
