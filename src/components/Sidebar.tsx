
import React from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarFooter from "./sidebar/SidebarFooter";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggle = () => {},
}) => {
  return (
    <aside 
      className={cn(
        "flex flex-col bg-[#2A2A3F] text-white transition-all duration-300 ease-in-out h-screen sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
      <SidebarMenu collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;
