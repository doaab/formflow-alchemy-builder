
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'sonner';
import { useFormBuilder } from '@/context/FormBuilderContext';
import { useAuth } from '@/context/AuthContext';
import { getFormById, updateForm } from '@/api/services/formService';
import DragDrop from './DragDrop';
import SidePanel from './SidePanel';
import FormTitle from './FormTitle';
import ElementEditor from './ElementEditor';
import ElementConditions from './ElementConditions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormPreviewDialog from './FormPreviewDialog';
import FormStatusControl from './FormStatusControl';
import { Loader2 } from 'lucide-react';
import { Form } from '@/api/types/formTypes';

const FormBuilder: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    updateForm: updateFormInContext, 
    form,
    formData,
    activeElement
  } = useFormBuilder();
  const [activeTab, setActiveTab] = useState<string>('elements');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { data: formApiData, isLoading, error } = useQuery<Form, Error>({
    queryKey: ['form', formId],
    queryFn: () => getFormById(Number(formId)),
    enabled: !!formId && isAuthenticated,
    meta: {
      onSuccess: (data: Form) => {
        updateFormInContext(data);
      },
      onError: (error: Error) => {
        toast.error(`Failed to load form: ${error.message}`);
      }
    }
  });

  const mutation = useMutation({
    mutationFn: (form: any) => updateForm(Number(formId), form),
    onSuccess: () => {
      toast.success('Form updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update form: ${error.message}`);
    },
  });

  const handleSave = async () => {
    if (form) {
      mutation.mutate(form);
    } else {
      toast.error('No form data to save.');
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
  if (error) return <p>Error: {(error as Error).message}</p>;

  if (!formApiData) {
    return <p>Loading form...</p>;
  }

  // Find the selected element for editor and conditions
  const selectedElement = activeElement ? formData.elements.find(el => el.id === activeElement) : undefined;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full">
        {/* Main Content Area */}
        <div className="flex flex-col w-full">
          {/* Form Header */}
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <FormTitle />
              <div className="flex gap-2 items-center">
                <FormStatusControl formId={Number(formId)} />
                <FormPreviewDialog />
                <button
                  onClick={handleSave}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="m-4">
            <TabsList>
              <TabsTrigger value="elements">Elements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
            </TabsList>
            <TabsContent value="elements" className="mt-2">
              <DragDrop />
            </TabsContent>
            <TabsContent value="settings" className="mt-2">
              {selectedElement && <ElementEditor element={selectedElement} />}
            </TabsContent>
            <TabsContent value="conditions" className="mt-2">
              {selectedElement && <ElementConditions element={selectedElement} />}
            </TabsContent>
          </Tabs>
        </div>

        {/* Side Panel */}
        <SidePanel />
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
