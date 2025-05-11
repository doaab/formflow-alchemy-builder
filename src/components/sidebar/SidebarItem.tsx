
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  permission?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  active = false,
  permission,
}) => {
  const { hasPermission } = useAuth();

  // Hide menu item if user doesn't have permission
  if (permission && !hasPermission(permission)) {
    return null;
  }

  return (
    <li className="mb-2">
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
          active
            ? "bg-purple-600 text-white"
            : "hover:bg-purple-100 dark:hover:bg-purple-900"
        )}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
