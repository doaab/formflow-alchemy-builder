
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/context/TranslationContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Users,
  Settings,
  HelpCircle,
  MessageSquare,
  Star,
  CreditCard,
  Cog
} from 'lucide-react';

const RightSidebar: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const location = useLocation();
  const isRtl = currentLanguage === 'ar';

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'dashboard', path: '/dashboard' },
    { id: 'forms', icon: FileText, label: 'forms', path: '/forms' },
    { id: 'users', icon: Users, label: 'users', path: '/users' },
    { id: 'responses', icon: Inbox, label: 'responses', path: '/responses' },
    { id: 'campaigns', icon: Star, label: 'campaigns', path: '/campaigns' },
    { id: 'messages', icon: MessageSquare, label: 'customerService', path: '/messages' },
    { id: 'subscriptions', icon: CreditCard, label: 'subscriptions', path: '/subscriptions' },
    { id: 'settings', icon: Cog, label: 'settings', path: '/settings' },
    { id: 'help', icon: HelpCircle, label: 'help', path: '/help' },
  ];

  return (
    <aside className={`hidden md:block border-l border-gray-200 bg-[#2A2A3F] w-20 flex-shrink-0 text-white ${isRtl ? 'order-first border-r border-l-0' : 'order-last'}`}>
      <div className="h-full flex flex-col items-center pt-6 pb-4">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-8">
          <span className="text-xl font-semibold text-white">F</span>
        </div>
        
        <div className="flex-1 w-full overflow-y-auto">
          <nav className="flex flex-col items-center gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "group flex flex-col items-center w-full relative px-2",
                    isActive && "after:absolute after:left-0 after:w-1 after:h-8 after:bg-blue-500 after:rounded-r-md"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-md transition-colors",
                    isActive ? "bg-white/10 text-white" : "text-gray-400 group-hover:text-white"
                  )}>
                    <Icon size={20} />
                  </div>
                  <span className="text-xs mt-1 text-center">
                    {t(item.label)}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
