
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Link, 
  Settings, 
  Lock, 
  Mail, 
  Calendar, 
  Clock, 
  Smartphone, 
  Globe,
  AlertTriangle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';

interface SurveySettingsProps {
  formId?: number;
}

const SurveySettings: React.FC<SurveySettingsProps> = ({ formId }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('basicSettings')}</CardTitle>
          <CardDescription>{t('basicSettingsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="survey-password">{t('surveyPassword')}</Label>
            <div className="flex space-x-2">
              <Input id="survey-password" type="password" placeholder={t('enterPassword')} />
              <Button variant="secondary">
                <Lock className="h-4 w-4 mr-2" />
                {t('setPassword')}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{t('passwordDesc')}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="collect-email">{t('collectEmail')}</Label>
              <p className="text-sm text-muted-foreground">{t('collectEmailDesc')}</p>
            </div>
            <Switch id="collect-email" />
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Label>{t('completionOptions')}</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="show-thankyou" name="completion" />
                <Label htmlFor="show-thankyou">{t('showThankYouMessage')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="redirect" name="completion" />
                <Label htmlFor="redirect">{t('redirectToWebsite')}</Label>
              </div>
              
              <div className="ml-6 mt-2">
                <Input type="url" placeholder={t('enterRedirectUrl')} disabled />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('scheduleSettings')}</CardTitle>
          <CardDescription>{t('scheduleSettingsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule-form">{t('scheduleForm')}</Label>
              <Switch id="schedule-form" />
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 opacity-50">
              <div className="space-y-2">
                <Label>{t('startDate')}</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <Input 
                    type="date" 
                    className="rounded-l-none" 
                    disabled 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{t('endDate')}</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <Input 
                    type="date" 
                    className="rounded-l-none" 
                    disabled 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <p className="text-sm text-muted-foreground">{t('scheduleNote')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveySettings;
