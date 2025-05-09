
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFormResponseDetails } from '@/api/hooks/useFormQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { FormResponseWithAnswers } from '@/api/types/formTypes';

const FormResponseDetail = () => {
  const { formId, responseId } = useParams<{ formId: string; responseId: string }>();
  const { data, isLoading, refetch } = useFormResponseDetails(formId as string, responseId as string);

  useEffect(() => {
    if (formId && responseId) {
      refetch();
    }
  }, [formId, responseId, refetch]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-52" />
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

  // Handle the typescript error by adding a type check and fallback
  const responseData = data as FormResponseWithAnswers | undefined;

  if (!responseData) {
    return <div>Response not found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Link to={`/forms/${formId}/responses`}>
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Responses
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Response Details</CardTitle>
          <CardDescription>Viewing response #{responseId} for form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {responseData.answers.map((answer) => (
              <div key={answer.id} className="space-y-1">
                <h3 className="font-medium">{answer.question}</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  {answer.answer || "No answer provided"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormResponseDetail;
