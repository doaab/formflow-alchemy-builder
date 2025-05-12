
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  adminOnly?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  path,
  adminOnly = false,
  collapsed = false
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === path || pathname.startsWith(`${path}/`);
  const { user } = useAuth();
  
  // Show only if user is admin when adminOnly is true
  if (adminOnly && user?.role !== 'admin') {
    return null;
  }
  
  const content = (
    <Link 
      to={path}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
        collapsed && 'justify-center'
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return content;
};

export default SidebarItem;
