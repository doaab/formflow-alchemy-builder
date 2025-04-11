
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Eye, EyeOff, File, List, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fetchForms } from "@/api/formApi";

const FormList = () => {
  // Use the fetchForms function directly while API is in development
  // Later, you can switch to the useForms hook from formApi.ts
  const { data, isLoading, error } = useQuery({
    queryKey: ['forms'],
    queryFn: fetchForms,
    // While backend is in development, you can use this for testing:
    enabled: false, // Disable actual API calls during development
  });

  // Mock data for development (remove this when API is ready)
  const mockData = {
    data: [
      {
        id: 1,
        title: "Customer Feedback Survey",
        description: "Collect feedback from customers about our services",
        slug: "customer-feedback-survey-abc123",
        is_published: true,
        created_at: "2025-03-15T14:22:18.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        responses_count: 24
      },
      {
        id: 2,
        title: "Employee Satisfaction Survey",
        description: "Annual employee satisfaction survey",
        slug: "employee-satisfaction-survey-def456",
        is_published: false,
        created_at: "2025-03-28T10:45:12.000000Z", 
        updated_at: "2025-03-28T10:45:12.000000Z",
        responses_count: 18
      },
      {
        id: 3,
        title: "Event Registration Form",
        description: "Registration for annual conference",
        slug: "event-registration-form-ghi789",
        is_published: true,
        created_at: "2025-04-05T16:30:22.000000Z",
        updated_at: "2025-04-06T11:20:15.000000Z",
        responses_count: 42
      },
      {
        id: 4,
        title: "Product Feedback",
        description: "Collect feedback about our latest product release",
        slug: "product-feedback-jkl012",
        is_published: true,
        created_at: "2025-04-08T08:15:37.000000Z",
        updated_at: "2025-04-09T14:22:18.000000Z",
        responses_count: 7
      },
      {
        id: 5,
        title: "Contact Request Form",
        description: "Allow users to request contact from our sales team",
        slug: "contact-request-form-mno345",
        is_published: true,
        created_at: "2025-04-10T13:45:22.000000Z",
        updated_at: "2025-04-10T13:45:22.000000Z",
        responses_count: 0
      }
    ]
  };
  
  // Use mock data during development
  const formsData = data || mockData;
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Loading forms...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-destructive">Error loading forms</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">My Forms</h1>
        <Link to="/">
          <Button className="flex items-center">
            <File className="mr-2 h-4 w-4" />
            Create New Form
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableCaption>List of your created forms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Form Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responses</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formsData?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No forms found</p>
                  <Link to="/">
                    <Button variant="link">Create your first form</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              formsData?.data.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">
                    <Link to={`/forms/${form.id}`} className="hover:underline text-primary">
                      {form.title}
                    </Link>
                    <p className="text-xs text-muted-foreground truncate max-w-[280px]">
                      {form.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    {form.is_published ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600 flex items-center gap-1 w-fit">
                        <CheckCircle className="h-3 w-3" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground flex items-center gap-1 w-fit">
                        <XCircle className="h-3 w-3" /> Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <List className="h-4 w-4 text-muted-foreground" />
                      {form.responses_count}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(new Date(form.created_at), 'MMM d, yyyy')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(form.updated_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/forms/${form.id}`}>
                          {form.is_published ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormList;
