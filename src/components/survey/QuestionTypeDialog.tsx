
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

interface QuestionType {
  id: string;
  name: string;
  icon: string;
}

interface QuestionTypeDialogProps {
  onSelectType: (type: string) => void;
}

const questionTypes: QuestionType[] = [
  { id: "multiple-choice", name: "Multiple Choice", icon: "☰" },
  { id: "star-rating", name: "Star Rating", icon: "★" },
  { id: "text", name: "Text", icon: "T" },
  { id: "emoji-faces", name: "Emoji Faces", icon: "☺" },
  { id: "time-based", name: "Time-based", icon: "⏱" },
  { id: "voice", name: "Voice", icon: "🎤" },
  { id: "file-upload", name: "File Upload", icon: "📁" },
  { id: "satisfaction-scale", name: "Satisfaction Scale", icon: "📊" },
];

export const QuestionTypeDialog: React.FC<QuestionTypeDialogProps> = ({ onSelectType }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleSelectType = (type: string) => {
    onSelectType(type);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 flex items-center gap-2">
          <Plus size={16} />
          {t("addNewQuestion")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("selectQuestionType")}</DialogTitle>
          <DialogDescription>
            {t("chooseTypeDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
          {questionTypes.map((type) => (
            <Button
              key={type.id}
              variant="outline"
              className="flex flex-col items-center justify-center h-24 p-2"
              onClick={() => handleSelectType(type.id)}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-xs text-center">{type.name}</div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDialog;
