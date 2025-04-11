
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormBuilderProvider, useFormBuilder } from "@/context/FormBuilderContext";
import SidePanel from "./SidePanel";
import FormTitle from "./FormTitle";
import DragDrop from "./DragDrop";
import FormPreviewDialog from "./FormPreviewDialog";
import { Button } from "../ui/button";
import { Save, Loader2, BookOpen, List } from "lucide-react";
import { useEffect, useState } from "react";
import { saveFormToLocalStorage, prepareFormDataForBackend } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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
      
      // Save to localStorage for persistence during development
      saveFormToLocalStorage(parsedForm);
      
      // Prepare data for backend and send to API
      const backendData = prepareFormDataForBackend(parsedForm);
      
      // TODO: Replace with actual API call when integrated
      console.log("Data ready for backend submission:", backendData);
      
      // For now, let's simulate a successful save
      // const response = await fetch('/api/forms', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(backendData)
      // });
      // 
      // if (!response.ok) throw new Error('Failed to save form');
      // const data = await response.json();
      
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
              <Link to="/forms">
                <Button variant="outline" className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  My Forms
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Documentation
                </Button>
              </Link>
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
