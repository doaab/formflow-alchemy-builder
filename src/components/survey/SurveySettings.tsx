
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Settings } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

interface SurveySettingsProps {
  settings: {
    requireOtp: boolean;
    allowMultipleSubmissions: boolean;
    bilingual: boolean;
  };
  onSettingsChange: (key: string, value: boolean) => void;
}

const SurveySettings: React.FC<SurveySettingsProps> = ({ settings, onSettingsChange }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full p-4 justify-start rounded-none">
          <Settings className="mr-2 h-4 w-4" />
          {t("settings")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("surveySettings")}</DialogTitle>
          <DialogDescription>
            {t("adjustSurveySettings")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <label htmlFor="require-otp">{t("requireOtpVerification")}</label>
            <Toggle
              id="require-otp"
              pressed={settings.requireOtp}
              onPressedChange={(value) => onSettingsChange('requireOtp', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="multiple-submissions">{t("allowMultipleSubmissions")}</label>
            <Toggle
              id="multiple-submissions"
              pressed={settings.allowMultipleSubmissions}
              onPressedChange={(value) => onSettingsChange('allowMultipleSubmissions', value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="bilingual">{t("bilingualSupport")}</label>
            <Toggle
              id="bilingual"
              pressed={settings.bilingual}
              onPressedChange={(value) => onSettingsChange('bilingual', value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurveySettings;
