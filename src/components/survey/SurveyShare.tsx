
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Link, Mail, Facebook, Twitter, Linkedin, QrCode, Code, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import QRCode from 'qrcode.react';

interface SurveyShareProps {
  formUrl?: string;
  formId?: number;
  formSlug?: string;
}

const SurveyShare: React.FC<SurveyShareProps> = ({ 
  formUrl = 'https://example.com/forms/sample-form', 
  formId,
  formSlug 
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const embedCode = `<iframe src="${formUrl}" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>`;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link className="h-5 w-5 mr-2" />
          {t('shareYourForm')}
        </CardTitle>
        <CardDescription>{t('shareYourFormDesc')}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="link">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="link">{t('link')}</TabsTrigger>
            <TabsTrigger value="email">{t('email')}</TabsTrigger>
            <TabsTrigger value="social">{t('social')}</TabsTrigger>
            <TabsTrigger value="embed">{t('embed')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4 pt-4">
            <div className="flex space-x-2">
              <Input value={formUrl} readOnly />
              <Button variant="secondary" onClick={handleCopyToClipboard}>
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <p className="text-sm font-medium">{t('qrCode')}</p>
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                {t('downloadQrCode')}
              </Button>
            </div>
            
            <div className="flex justify-center py-4">
              <div className="border p-4 rounded-lg bg-white">
                <QRCode value={formUrl} size={180} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="pt-4">
            <div className="space-y-4">
              <p className="text-sm">{t('emailSharingDesc')}</p>
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                {t('composeEmail')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="pt-4">
            <div className="flex flex-wrap gap-4 justify-center py-4">
              <Button variant="outline">
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="embed" className="pt-4">
            <div className="space-y-4">
              <p className="text-sm">{t('embedCodeDesc')}</p>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                  {embedCode}
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(embedCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="outline">{t('preview')}</Button>
        <Button>{t('publish')}</Button>
      </CardFooter>
    </Card>
  );
};

export default SurveyShare;
