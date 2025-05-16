import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronLeft, Search, Download, Trash2, EyeIcon, 
  Calendar, User, Clock 
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormResponses } from "@/api/services/formService";
import { FormResponse, FormResponsesResponse } from "@/api/types/formTypes";

const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: responseData, isLoading, error } = useQuery({
    queryKey: ["form-responses", formId],
    queryFn: () => getFormResponses(Number(formId)),
    enabled: !!formId,
  });

  // Process the response data to handle paginated format
  const responses = React.useMemo(() => {
    if (!responseData) return [];
    
    // Extract the data array from the paginated response
    return responseData.data || [];
  }, [responseData]);
  
  // Filter responses by search term (email or IP)
  const filteredResponses = React.useMemo(() => {
    if (!responses || responses.length === 0) return [];
    
    if (!searchTerm.trim()) return responses;
    
    const lowerSearch = searchTerm.toLowerCase();
    return responses.filter(response => 
      (response.respondent_email && response.respondent_email.toLowerCase().includes(lowerSearch)) ||
      (response.ip_address && response.ip_address.includes(lowerSearch))
    );
  }, [responses, searchTerm]);

  if (error) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Failed to load responses: {(error as Error).message}</p>
            <Button asChild className="mt-4">
              <Link to={`/forms/${formId}`}>Return to Form</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link 
          to={`/forms/${formId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Form
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Responses</h1>
          <div className="text-muted-foreground mt-1">
            {isLoading ? (
              <Skeleton className="h-4 w-40 inline-block" />
            ) : (
              `${filteredResponses.length} total responses`
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search responses..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-3 w-40" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <Skeleton className="h-8 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredResponses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResponses.map((response) => (
            <Card key={response.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{new Date(response.created_at).toLocaleDateString()}</span>
                </CardTitle>
                <CardDescription className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{response.respondent_email || "Anonymous"}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="font-medium">Completion Time:</span>{" "}
                    {response.completion_time ? 
                      `${Math.floor(response.completion_time / 60)} min ${response.completion_time % 60} sec` : 
                      "Not available"}
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="font-medium">IP Address:</span>{" "}
                    {response.ip_address || "Not available"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3 flex justify-between">
                <Button asChild variant="ghost" size="sm">
                  <Link to={`/forms/${formId}/responses/${response.id}`}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-full max-w-md p-6 border rounded-lg bg-background shadow-sm">
            <h3 className="text-xl font-semibold mb-2">No responses yet</h3>
            <p className="text-muted-foreground mb-4">This form hasn't received any responses or no responses match your search.</p>
            <Button asChild>
              <Link to={`/forms/${formId}`}>Return to Form</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormResponses;
