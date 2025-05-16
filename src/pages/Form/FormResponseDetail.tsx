
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { FormResponseWithAnswers } from '@/api/types/formTypes';
import { getFormResponse } from '@/api/services/form/responseService';
import { toast } from 'sonner';

const FormResponseDetail = () => {
  const { formId, responseId } = useParams<{ formId: string; responseId: string }>();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['form-response', formId, responseId],
    queryFn: () => getFormResponse(Number(formId), Number(responseId)),
    enabled: !!formId && !!responseId,
    retry: 1,
    meta: {
      onError: (e: Error) => {
        toast.error(`Error loading response: ${e.message}`);
        console.error('Response detail error:', e);
      }
    }
  });

  useEffect(() => {
    if (formId && responseId) {
      refetch();
    }
  }, [formId, responseId, refetch]);

  if (isLoading) {
    return (
      <div className="container py-6 space-y-4">
        <div>
          <Link to={`/forms/${formId}/responses`}>
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Responses
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
            <p className="text-red-600">Failed to load response details: {(error as Error).message}</p>
            <Button asChild className="mt-4">
              <Link to={`/forms/${formId}/responses`}>Return to Responses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle the typescript error by adding a type check and fallback
  const responseData = data as FormResponseWithAnswers | undefined;

  if (!responseData) {
    return (
      <div className="container py-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-600">Response not found</p>
            <Button asChild className="mt-4">
              <Link to={`/forms/${formId}/responses`}>Return to Responses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-4">
      <div>
        <Link to={`/forms/${formId}/responses`}>
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Responses
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Response Details</CardTitle>
          <CardDescription>Submitted on {new Date(responseData.created_at).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {responseData.answers && responseData.answers.length > 0 ? (
              responseData.answers.map((answer) => (
                <div key={answer.id} className="space-y-1">
                  <h3 className="font-medium">{answer.question || "Question"}</h3>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    {answer.answer || "No answer provided"}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No answers found for this response
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormResponseDetail;
