
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Edit2, Check } from "lucide-react";

const FormTitle = () => {
  const { formData, updateFormTitle, updateFormDescription } = useFormBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(formData.title);
  const [tempDesc, setTempDesc] = useState(formData.description);
  
  const handleSave = () => {
    updateFormTitle(tempTitle);
    updateFormDescription(tempDesc);
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white shadow-sm border-b p-4">
      <div className="container max-w-4xl mx-auto">
        {isEditing ? (
          <div className="space-y-3">
            <Input 
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="text-2xl font-medium border-primary"
              placeholder="Form Title"
            />
            
            <Textarea 
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              placeholder="Form Description (optional)"
              rows={2}
            />
            
            <Button onClick={handleSave} size="sm" className="flex items-center">
              <Check className="mr-1 h-4 w-4" /> Save
            </Button>
          </div>
        ) : (
          <div className="relative">
            <Button
              variant="ghost" 
              size="icon"
              className="absolute top-0 right-0"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            
            <h1 className="text-2xl font-medium">{formData.title}</h1>
            {formData.description && (
              <p className="mt-1 text-muted-foreground">{formData.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormTitle;
