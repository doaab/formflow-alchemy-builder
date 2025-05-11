
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2, QrCode, Link, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { toast } from "@/hooks/use-toast";

interface SurveyShareProps {
  surveyId: string;
  surveyTitle: string;
}

const SurveyShare: React.FC<SurveyShareProps> = ({ surveyId, surveyTitle }) => {
  const { t } = useTranslation();
  
  const getSurveyUrl = () => {
    return `${window.location.origin}/survey/preview/${surveyId}`;
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getSurveyUrl());
    toast({
      title: t("linkCopied"),
      description: t("surveyLinkCopiedToClipboard"),
    });
  };
  
  const handleDownloadQrCode = () => {
    // In a real implementation, this would generate and download a QR code
    toast({
      title: t("qrCodeDownloaded"),
      description: t("qrCodeDownloadedDescription"),
    });
  };
  
  const handleShareOnSocial = (platform: string) => {
    let shareUrl = '';
    const surveyUrl = encodeURIComponent(getSurveyUrl());
    const title = encodeURIComponent(surveyTitle);
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${surveyUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${surveyUrl}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, typically would open the app
        toast({
          title: t("instagramSharing"),
          description: t("instagramSharingDescription"),
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full p-4 justify-start rounded-none">
          <Share2 className="mr-2 h-4 w-4" />
          {t("share")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={handleDownloadQrCode}>
          <QrCode className="mr-2 h-4 w-4" />
          {t("downloadQrCode")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <Link className="mr-2 h-4 w-4" />
          {t("copyLink")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareOnSocial('facebook')}>
          <Facebook className="mr-2 h-4 w-4" />
          {t("shareOnFacebook")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareOnSocial('instagram')}>
          <Instagram className="mr-2 h-4 w-4" />
          {t("shareOnInstagram")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShareOnSocial('twitter')}>
          <Twitter className="mr-2 h-4 w-4" />
          {t("shareOnTwitter")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SurveyShare;
