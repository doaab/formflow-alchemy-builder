
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, User, Clock, Calendar, Globe, Monitor } from "lucide-react";

import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { fetchFormResponseDetails } from "@/api/formApi.ts";

const ResponseMetadataCard = ({ icon: Icon, title, value, loading }: { 
  icon: React.ElementType, 
  title: string, 
  value: string | null | undefined,
  loading?: boolean
}) => (
  <div className="flex items-start space-x-4 rounded-md border p-4">
    <div className="rounded-full bg-primary/10 p-2">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div className="space-y-1">
      <p className="text-sm font-medium">{title}</p>
      {loading ? (
        <Skeleton className="h-5 w-32" />
      ) : (
        <p className="text-sm text-muted-foreground">
          {value || <span className="italic">Not available</span>}
        </p>
      )}
    </div>
  </div>
);

const FormResponseDetail = () => {
  const { formId, responseId } = useParams<{ formId: string, responseId: string }>();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["form-response", Number(formId), Number(responseId)],
    queryFn: () => fetchFormResponseDetails(Number(formId), Number(responseId)),
  });

  if (error) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Failed to load response: {error.message}</p>
            <Button asChild className="mt-4">
              <Link to={`/forms/${formId}/responses`}>Return to Responses</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-4xl">
      <div className="mb-6">
        <Link 
          to={`/forms/${formId}/responses`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Responses
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Response #{responseId}
        </h1>
        <Badge variant="outline" className="text-sm">
          {isLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            new Date(data?.created_at || "").toLocaleDateString()
          )}
        </Badge>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2 my-6">
        <ResponseMetadataCard
          icon={User}
          title="Respondent"
          value={data?.respondent_email}
          loading={isLoading}
        />
        <ResponseMetadataCard
          icon={Clock}
          title="Completion Time"
          value={data?.completion_time ? 
            `${Math.floor(data.completion_time / 60)}m ${data.completion_time % 60}s` : 
            null
          }
          loading={isLoading}
        />
        <ResponseMetadataCard
          icon={Calendar}
          title="Submitted On"
          value={data?.created_at ? 
            new Date(data.created_at).toLocaleString() : 
            null
          }
          loading={isLoading}
        />
        <ResponseMetadataCard
          icon={Globe}
          title="IP Address"
          value={data?.ip_address}
          loading={isLoading}
        />
      </div>

      <Card className="my-6">
        <CardHeader>
          <CardTitle>Response Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-16 w-full" />
              </div>
            </>
          ) : data?.answers?.length ? (
            data.answers.map((answer, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium">{answer.formElement?.label || "Question"}</h3>
                <div className="rounded-md border p-3 bg-muted/30">
                  {answer.value || <span className="italic text-muted-foreground">No answer provided</span>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground italic">No answer data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormResponseDetail;
