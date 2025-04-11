import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ChevronLeft, Download, Filter, MailOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useFormResponses, useExportResponses } from "@/api/hooks/useFormQueries";

interface ResponseTableProps {
  formId: number;
}

const ResponseTable = ({ formId }: ResponseTableProps) => {
  const { data, isLoading, error } = useFormResponses(formId);
  
  const { toast } = useToast();
  const { mutate: exportResponses, isPending: isExporting } = useExportResponses();

  const handleExport = () => {
    exportResponses(formId, {
      onSuccess: () => {
        toast({
          title: "Export completed",
          description: "Your responses have been exported to CSV",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Export failed",
          description: "There was a problem exporting your responses",
        });
      }
    });
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
        <p className="text-red-600">Failed to load responses: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter responses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Responses</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExport}
          disabled={isExporting || !data?.data?.length}
        >
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Response ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Completion Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.length ? (
                data.data.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell>#{response.id}</TableCell>
                    <TableCell>
                      {new Date(response.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {response.respondent_email || <span className="text-muted-foreground italic">Not provided</span>}
                    </TableCell>
                    <TableCell>
                      {response.completion_time ? (
                        <Badge variant="outline">
                          {Math.floor(response.completion_time / 60)}m {response.completion_time % 60}s
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground italic">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/forms/${formId}/responses/${response.id}`}>
                        <Button variant="ghost" size="sm">
                          <MailOpen className="h-4 w-4 mr-1" /> View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No responses yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const [view, setView] = useState<"table" | "stats">("table");
  
  const { data: formData, isLoading } = useQuery({
    queryKey: ["form", Number(formId)],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/api/forms/${formId}`).then(res => res.json()),
    enabled: !!formId
  });

  return (
    <div className="container py-6 max-w-6xl">
      <div className="mb-6">
        <Link 
          to="/forms"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Forms
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isLoading ? <Skeleton className="h-9 w-64 inline-block" /> : formData?.title || "Form Responses"}
          </h1>
          <div className="text-muted-foreground mt-1 text-lg">
            {isLoading ? <Skeleton className="h-6 w-96 inline-block" /> : formData?.description || "View and analyze form submission data"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
          >
            <MailOpen className="mr-2 h-4 w-4" />
            Responses
          </Button>
          <Button
            variant={view === "stats" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("stats")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Statistics
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {view === "table" ? (
        <ResponseTable formId={Number(formId)} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total Responses</CardTitle>
              <CardDescription>All-time form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {isLoading ? <Skeleton className="h-10 w-20 inline-block" /> : formData?.responses_count || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Avg. Completion Time</CardTitle>
              <CardDescription>Time to complete the form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {isLoading ? <Skeleton className="h-10 w-20 inline-block" /> : "2:34"}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Completion Rate</CardTitle>
              <CardDescription>Form starts vs submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {isLoading ? <Skeleton className="h-10 w-20 inline-block" /> : "87%"}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FormResponses;
