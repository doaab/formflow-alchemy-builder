
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/TranslationContext";
import { Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, currentLanguage, toggleLanguage } = useTranslation();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={`${t("search")}...`}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Button
            variant={currentLanguage === 'en' ? "default" : "outline"}
            className={currentLanguage === 'en' ? "bg-purple-600" : ""}
            onClick={() => toggleLanguage()}
          >
            English
          </Button>
          <Button
            variant={currentLanguage === 'ar' ? "default" : "outline"} 
            className={currentLanguage === 'ar' ? "bg-purple-600" : ""}
            onClick={() => toggleLanguage()}
          >
            العربية
          </Button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User menu */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full p-2">
              <User size={20} />
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-sm">{user?.name || "User"}</p>
            </div>
          </div>
        </div>

        {/* Feedback Button */}
        <div className="bg-purple-600 text-white px-3 py-1 rounded-md">
          {t("feedback")}
        </div>
      </div>
    </header>
  );
};

export default Header;
