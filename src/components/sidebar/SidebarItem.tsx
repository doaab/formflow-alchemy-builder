
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  adminOnly?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  path,
  adminOnly = false
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === path || pathname.startsWith(`${path}/`);
  const { user } = useAuth();
  
  // Show only if user is admin when adminOnly is true
  if (adminOnly && user?.role !== 'admin') {
    return null;
  }
  
  return (
    <Link 
      to={path}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
