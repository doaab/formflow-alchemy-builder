
import React from "react";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, onToggle }) => {
  return (
    <>
      <div className="flex justify-end p-2">
        <button 
          onClick={onToggle} 
          className="p-2 rounded-md hover:bg-purple-800 transition-colors"
        >
          {collapsed ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold">Lingua Navigator</h2>
        </div>
      )}
    </>
  );
};

export default SidebarHeader;
