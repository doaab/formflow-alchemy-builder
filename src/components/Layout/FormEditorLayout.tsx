
import React from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Settings, Layout, Play, PauseCircle, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormStatusControl from '@/components/FormBuilder/FormStatusControl';
import { useForm } from '@/api/hooks/useFormQueries';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

const FormEditorLayout: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { data: form, isLoading } = useForm(Number(formId));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={() => navigate('/forms')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Back</span>
          </Button>
          
          <div className="ml-auto flex items-center space-x-2">
            <FormStatusControl 
              formId={Number(formId)} 
              initialStatus={form?.status} 
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  Actions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/forms/${formId}`)}>
                  <Layout className="mr-2 h-4 w-4" />
                  Form Overview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/forms/${formId}/edit`)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Form Builder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/forms/${formId}/responses`)}>
                  <List className="mr-2 h-4 w-4" />
                  View Responses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/forms/${formId}/preview`)}>
                  <Play className="mr-2 h-4 w-4" />
                  Preview Form
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm" onClick={() => navigate(`/forms/${formId}`)}>
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container py-4">
          <div className="mb-4">
            {isLoading ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              <h1 className="text-2xl font-bold">{form?.title || 'Form Editor'}</h1>
            )}
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default FormEditorLayout;
