
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  FileText, AlignLeft, Hash, Mail, List, CheckCircle, CheckSquare, 
  Calendar, Star, Smile, Phone, MapPin, Section, ArrowDown, Plus 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface QuestionTypeDialogProps {
  onSelect: (type: string) => void;
}

const QuestionTypeDialog = ({ onSelect }: QuestionTypeDialogProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  
  const handleSelect = (type: string) => {
    onSelect(type);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          {t('addQuestion')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('questionTypes')}</DialogTitle>
          <DialogDescription>{t('selectQuestionType')}</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="basic">{t('basicFields')}</TabsTrigger>
            <TabsTrigger value="choice">{t('choiceFields')}</TabsTrigger>
            <TabsTrigger value="advanced">{t('advancedFields')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handleSelect('text')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <FileText className="h-8 w-8 mb-2" />
                {t('shortAnswer')}
              </Button>
              <Button onClick={() => handleSelect('paragraph')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <AlignLeft className="h-8 w-8 mb-2" />
                {t('paragraph')}
              </Button>
              <Button onClick={() => handleSelect('number')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Hash className="h-8 w-8 mb-2" />
                {t('number')}
              </Button>
              <Button onClick={() => handleSelect('email')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Mail className="h-8 w-8 mb-2" />
                {t('email')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="choice" className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handleSelect('dropdown')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <List className="h-8 w-8 mb-2" />
                {t('dropdown')}
              </Button>
              <Button onClick={() => handleSelect('radio')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <CheckCircle className="h-8 w-8 mb-2" />
                {t('multipleChoice')}
              </Button>
              <Button onClick={() => handleSelect('checkbox')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <CheckSquare className="h-8 w-8 mb-2" />
                {t('checkboxes')}
              </Button>
              <Button onClick={() => handleSelect('date')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Calendar className="h-8 w-8 mb-2" />
                {t('date')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handleSelect('star')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Star className="h-8 w-8 mb-2" />
                {t('starRating')}
              </Button>
              <Button onClick={() => handleSelect('face')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Smile className="h-8 w-8 mb-2" />
                {t('faceRating')}
              </Button>
              <Button onClick={() => handleSelect('phone')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Phone className="h-8 w-8 mb-2" />
                {t('phone')}
              </Button>
              <Button onClick={() => handleSelect('address')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <MapPin className="h-8 w-8 mb-2" />
                {t('address')}
              </Button>
              <Button onClick={() => handleSelect('section')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <Section className="h-8 w-8 mb-2" />
                {t('section')}
              </Button>
              <Button onClick={() => handleSelect('pageBreak')} variant="outline" className="h-24 flex flex-col p-4 justify-center">
                <ArrowDown className="h-8 w-8 mb-2" />
                {t('pageBreak')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDialog;
