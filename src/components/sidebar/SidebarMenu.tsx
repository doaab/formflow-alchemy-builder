
import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import SidebarItem from "./SidebarItem";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Megaphone, 
  Wallet, 
  HelpCircle, 
  Settings, 
  Bell, 
  Percent, 
  Repeat, 
  HeadphonesIcon,
  BookText,
  FileText,
  BarChart,
  Star,
  Radio
} from "lucide-react";

interface SidebarMenuProps {
  collapsed: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Define menu items with their icons
  const menuItems = [
    { 
      to: "/dashboard", 
      icon: <LayoutDashboard size={18} />, 
      label: t("dashboard"),
      permission: "view_dashboard" 
    },
    { 
      to: "/survey", 
      icon: <FileText size={18} />, 
      label: t("survey"), 
      permission: "view_surveys"
    },
    { 
      to: "/survey-results", 
      icon: <BarChart size={18} />, 
      label: t("surveyResultsAnalysis"), 
      permission: "view_surveys"
    },
    { 
      to: "/reviews", 
      icon: <Star size={18} />, 
      label: t("reviews"), 
      permission: "view_surveys"
    },
    { 
      to: "/advertising-channels", 
      icon: <Radio size={18} />, 
      label: t("advertisingChannels"), 
      permission: "view_channels"
    },
    { 
      to: "/coupons", 
      icon: <Percent size={18} />, 
      label: t("coupons"),
      permission: "view_coupons" 
    },
    { 
      to: "/subscriptions", 
      icon: <ClipboardList size={18} />, 
      label: t("subscriptions"), 
      permission: "view_surveys"
    },
    { 
      to: "/users", 
      icon: <Users size={18} />, 
      label: t("users"),
      permission: "view_users"
    },
    { 
      to: "/ads", 
      icon: <Megaphone size={18} />, 
      label: t("advertisements"),
      permission: "view_channels"
    },
    { 
      to: "/balance", 
      icon: <Wallet size={18} />, 
      label: t("balance"),
      permission: "view_balance" 
    },
    { 
      to: "/question-bank", 
      icon: <BookText size={18} />, 
      label: t("questionBank"),
      permission: "view_questions" 
    },
    { 
      to: "/notifications", 
      icon: <Bell size={18} />, 
      label: t("notifications"),
      permission: "view_notifications" 
    },
    { 
      to: "/exchanges", 
      icon: <Repeat size={18} />, 
      label: t("exchanges"),
      permission: "view_exchanges" 
    },
    { 
      to: "/customer-service", 
      icon: <HeadphonesIcon size={18} />, 
      label: t("customerService"),
      permission: "view_customer_service" 
    },
    { 
      to: "/settings", 
      icon: <Settings size={18} />, 
      label: t("settings"),
      permission: "view_settings" 
    },
    { 
      to: "/help-center", 
      icon: <HelpCircle size={18} />, 
      label: t("helpCenter"),
      permission: "view_help" 
    }
  ];

  return (
    <nav className="flex-1 overflow-y-auto p-2">
      <ul>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.to}
            permission={item.permission}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarMenu;
