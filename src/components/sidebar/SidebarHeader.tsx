
import React from "react";
import { ChevronLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarHeaderProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed = false, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      {!collapsed && <h2 className="text-lg font-bold">Feedback</h2>}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onToggle} 
        className="text-white hover:bg-gray-700"
      >
        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
