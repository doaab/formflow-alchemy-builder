import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@/context/TranslationContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Users as UsersIcon
} from 'lucide-react';

interface SidebarItemProps {
  id: string;
  label: string;
  icon: string;
  path: string;
}

// Update the sidebar menu items to include Users
const sidebarItems = [
  {
    id: 'dashboard',
    label: 'dashboard',
    icon: 'layout-dashboard',
    path: '/dashboard'
  },
  {
    id: 'users',
    label: 'users',
    icon: 'users',
    path: '/users'
  },
  {
    id: 'forms',
    label: 'forms',
    icon: 'file-text',
    path: '/forms'
  },
  {
    id: 'responses',
    label: 'responses',
    icon: 'inbox',
    path: '/responses'
  },
];

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'layout-dashboard': LayoutDashboard,
  'file-text': FileText,
  'inbox': Inbox,
  'users': UsersIcon,
};

const RightSidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside className="hidden border-l bg-secondary lg:block w-60">
      <div className="px-4 py-6">
        <h3 className="mb-4 text-sm font-semibold tracking-tight">Menu</h3>
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon] || (() => null);
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
