
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormBuilderProvider } from "@/context/FormBuilderContext";
import SidePanel from "./SidePanel";
import FormTitle from "./FormTitle";
import DragDrop from "./DragDrop";
import FormPreviewDialog from "./FormPreviewDialog";
import { Button } from "../ui/button";
import { Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { saveFormToLocalStorage } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";

const FormBuilder = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const handleSaveForm = async () => {
    try {
      setIsSaving(true);
      
      // Get the form data from the context
      const formData = document.getElementById('form-builder-provider')?.dataset.formData;
      if (!formData) throw new Error("Form data not found");
      
      const parsedForm = JSON.parse(formData);
      saveFormToLocalStorage(parsedForm);
      
      toast({
        title: "Form saved",
        description: "Your form has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your form",
        variant: "destructive",
      });
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilderProvider>
        <div 
          id="form-builder-provider" 
          className="flex flex-col h-screen"
          data-formData=""
        >
          <div className="flex items-center justify-between p-3 bg-white border-b">
            <h1 className="text-xl font-bold text-primary">FormFlow Alchemy</h1>
            <div className="flex items-center space-x-2">
              <FormPreviewDialog />
              <Button 
                onClick={handleSaveForm} 
                disabled={isSaving}
                className="flex items-center"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Form
              </Button>
            </div>
          </div>
          
          <FormTitle />
          
          <div className="flex flex-1 overflow-hidden">
            <DragDrop />
            <SidePanel />
          </div>
          
          <FormDataTracker />
        </div>
      </FormBuilderProvider>
    </DndProvider>
  );
};

// This component just tracks form data changes for saving
const FormDataTracker = () => {
  const { formData } = useFormBuilder();
  
  useEffect(() => {
    const element = document.getElementById('form-builder-provider');
    if (element) {
      element.dataset.formData = JSON.stringify(formData);
    }
  }, [formData]);
  
  return null;
};

export default FormBuilder;
