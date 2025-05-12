import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Settings, List, Eye, ExternalLink } from 'lucide-react';
import { FormWithElements } from '@/api/types/formTypes';
import { getFormById } from '@/api/services/formService';
import { useAuth } from '@/context/AuthContext';

const FormDetail = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['form', formId],
    queryFn: () => getFormById(Number(formId)),
    enabled: !!formId && isAuthenticated,
  });

  useEffect(() => {
    if (formId) {
      refetch();
    }
  }, [formId, refetch]);

  if (isLoading) {
    return (
      <div className="container py-6 space-y-4">
        <div>
          <Link to="/forms">
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Forms
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Failed to load form details: {(error as Error).message}</p>
            <Button asChild className="mt-4">
              <Link to="/forms">Return to Forms</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle the typescript error by adding a type check and fallback
  const formData = data as FormWithElements | undefined;

  if (!formData) {
    return (
      <div className="container py-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-600">Form not found</p>
            <Button asChild className="mt-4">
              <Link to="/forms">Return to Forms</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/forms"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Forms</Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/forms/${formId}/responses`)} className="flex items-center">
            <List className="mr-2 h-4 w-4" />
            View Responses
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate(`/forms/${formId}/preview`)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={() => navigate(`/forms/${formId}/edit`)}>
            <Settings className="mr-2 h-4 w-4" />
            Edit Form
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{formData.title}</CardTitle>
          <CardDescription>{formData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-medium">Form Link</h3>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <a 
                  href={`${window.location.origin}/form/${formData.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {`${window.location.origin}/form/${formData.slug}`}
                  <ExternalLink className="inline-block ml-1 h-4 w-4 align-text-top" />
                </a>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Status</h3>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {formData.status_label || "Draft"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormDetail;
