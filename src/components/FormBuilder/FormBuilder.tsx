import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormBuilderProvider, useFormBuilder } from "@/context/FormBuilderContext";
import SidePanel from "./SidePanel";
import FormTitle from "./FormTitle";
import DragDrop from "./DragDrop";
import FormPreviewDialog from "./FormPreviewDialog";
import { Button } from "../ui/button";
import { Save, Loader2, BookOpen, List, AlertCircle, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { saveFormToLocalStorage, prepareFormDataForBackend } from "@/utils/formUtils";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, checkBackendConnection } from "@/api/services/config";
import { useSaveForm } from "@/api/hooks/useFormQueries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

const FormBuilder = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const saveFormMutation = useSaveForm();
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Check backend connection on component mount
    const checkConnection = async () => {
      const isConnected = await checkBackendConnection();
      setBackendConnected(isConnected);
      if (!isConnected) {
        toast({
          title: "Backend Connection Issue",
          description: `Cannot connect to backend at ${API_URL}. Forms cannot be saved to the server.`,
          variant: "destructive",
        });
      }
    };
    
    checkConnection();
  }, [toast]);
  
  const handleSaveForm = async () => {
    try {
      setIsSaving(true);
      
      // Get the form data from the context
      const formData = document.getElementById('form-builder-provider')?.dataset.formdata;
      if (!formData) throw new Error("Form data not found");
      
      const parsedForm = JSON.parse(formData);
      
      // Save to localStorage for persistence during development
      saveFormToLocalStorage(parsedForm);
      
      // Check if backend is available before trying to save
      if (!backendConnected) {
        toast({
          title: "Saved Locally Only",
          description: "Form saved to browser storage only. Backend connection not available.",
        });
        setIsSaving(false);
        return;
      }
      
      // Prepare data for backend and send to API
      const backendData = prepareFormDataForBackend(parsedForm);
      
      // Always provide a user_id for anonymous forms
      // The backend will handle permissions appropriately
      if (!isAuthenticated) {
        backendData.user_id = 1; // Default anonymous user ID
        console.log("Saving form as anonymous user");
      }
      
      console.log("Data ready for backend submission:", backendData);
      
      // Using the mutation to save the form
      const result = await saveFormMutation.mutateAsync(backendData);
      
      toast({
        title: "Form saved",
        description: isAuthenticated 
          ? "Your form has been saved successfully" 
          : "Your form has been saved anonymously. Create an account to access it later.",
      });
      
      // Redirect to the forms list if user is authenticated
      if (isAuthenticated) {
        navigate('/forms');
      }
      
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error",
        description: "There was an error saving your form. Please try again.",
        variant: "destructive",
      });
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
          data-formdata=""
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
              {!isAuthenticated && (
                <Link to="/login">
                  <Button variant="outline" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
              <FormPreviewDialog />
              <Button 
                onClick={handleSaveForm} 
                disabled={isSaving || saveFormMutation.isPending}
                className="flex items-center"
              >
                {isSaving || saveFormMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Form
              </Button>
            </div>
          </div>
          
          {!isAuthenticated && (
            <Alert className="m-4 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-700">Not Logged In</AlertTitle>
              <AlertDescription className="text-amber-600">
                You are currently not logged in. You can still save your form, but logging in will give you better access to manage your forms later.
              </AlertDescription>
            </Alert>
          )}
          
          {backendConnected === false && (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Backend Connection Issue</AlertTitle>
              <AlertDescription>
                Cannot connect to backend server at {API_URL}. Forms will be saved locally only.
                Please ensure the backend server is running at the correct URL.
              </AlertDescription>
            </Alert>
          )}
          
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
      element.dataset.formdata = JSON.stringify(formData);
    }
  }, [formData]);
  
  return null;
};

export default FormBuilder;
