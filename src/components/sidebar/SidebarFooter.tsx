
import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <button
        onClick={logout}
        className="flex items-center gap-3 w-full px-4 py-2 text-left rounded-md hover:bg-purple-800 transition-colors"
      >
        <LogOut size={18} />
        {!collapsed && <span>{t("logout")}</span>}
      </button>
    </div>
  );
};

export default SidebarFooter;
