
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/context/TranslationContext';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  path: string;
  active?: boolean;
}

const LeftSidebar: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const location = useLocation();
  const isRtl = currentLanguage === 'ar';
  
  // These menu items match the ones shown in the reference image
  const menuItems: SidebarItem[] = [
    { id: 'home', label: 'الرئيسية', path: '/dashboard', active: true },
    { id: 'requests', label: 'الطلبات', path: '/requests' },
    { id: 'users', label: 'المستخدمين', path: '/users' },
    { id: 'ads', label: 'الحملات الإعلانية', path: '/ads' },
    { id: 'coupons', label: 'الكوبونات', path: '/coupons' },
    { id: 'questions', label: 'بنك الأسئلة', path: '/questions' },
    { id: 'subscriptions', label: 'الاشتراكات', path: '/subscriptions' },
    { id: 'settings', label: 'الإعدادات', path: '/settings' },
    { id: 'help', label: 'مركز المساعدة', path: '/help' },
  ];

  return (
    <aside className={`hidden lg:block bg-[#15151F] text-white w-64 flex-shrink-0 ${isRtl ? 'order-last' : 'order-first'}`}>
      <div className="h-full flex flex-col pt-4">
        <div className="px-4 mb-6">
          <button className="bg-purple-600 text-white w-full py-2 rounded-md">
            {isRtl ? 'تصميم التقييم' : 'Design Survey'}
          </button>
        </div>
        
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.id === 'home' && location.pathname === '/') ||
                (location.pathname.startsWith(item.path) && item.path !== '/');

              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={cn(
                      `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm ${isRtl ? 'text-right' : ''}`,
                      isActive 
                        ? "bg-purple-600 text-white" 
                        : "text-gray-300 hover:bg-white/5"
                    )}
                  >
                    {isRtl ? t(item.label) : item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div>
              <p className="font-medium text-sm text-gray-200">
                {isRtl ? 'مؤسسة التطبيقات الذكية' : 'Smart Applications'}
              </p>
              <p className="text-xs text-gray-400">
                {isRtl ? 'الحساب المدفوع' : 'Premium Account'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
