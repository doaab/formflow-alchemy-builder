
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
  CreditCard,
  Star,
  MessageSquare,
  Cog
} from 'lucide-react';

const MobileMenu: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const location = useLocation();
  const isRtl = currentLanguage === 'ar';
  
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: t('dashboard'), path: '/dashboard' },
    { id: 'users', icon: <Users size={20} />, label: t('users'), path: '/users' },
    { id: 'forms', icon: <FileText size={20} />, label: t('forms'), path: '/forms' },
    { id: 'responses', icon: <Inbox size={20} />, label: t('responses'), path: '/responses' },
    { id: 'campaigns', icon: <Star size={20} />, label: t('campaigns'), path: '/campaigns' },
    { id: 'messages', icon: <MessageSquare size={20} />, label: t('customerService'), path: '/messages' },
    { id: 'subscriptions', icon: <CreditCard size={20} />, label: t('subscriptions'), path: '/subscriptions' },
    { id: 'settings', icon: <Cog size={20} />, label: t('settings'), path: '/settings' },
    { id: 'help', icon: <HelpCircle size={20} />, label: t('help'), path: '/help' },
  ];

  return (
    <div className="h-full bg-[#2A2A3F] text-white p-4">
      <div className="pb-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-white">F</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">Feedback</h2>
            <p className="text-xs text-gray-400">{t('feedback')}</p>
          </div>
        </div>
      </div>
      
      <nav className={`mt-4 space-y-1 ${isRtl ? 'text-right' : ''}`}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={cn(
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isRtl ? 'flex-row-reverse' : ''}`,
              location.pathname.startsWith(item.path)
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/5"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
