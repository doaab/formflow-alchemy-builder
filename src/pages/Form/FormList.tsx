
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Eye, EyeOff, File, List, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { format } from "date-fns";
import { getAllForms, Form } from "@/api/formApi.ts";
import { toast } from "sonner";
import { API_URL } from "@/api/services/config.ts";

const FormList = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['forms'],
    queryFn: getAllForms,
    enabled: true, // Enable actual API calls
  });
  
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
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary">My Forms</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center" onClick={() => refetch()}>
            <Loader2 className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link to="/create-form">
            <Button className="flex items-center">
              <File className="mr-2 h-4 w-4" />
              Create New Form
            </Button>
          </Link>
        </div>
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
            {data?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No forms found</p>
                  <Link to="/">
                    <Button variant="link">Create your first form</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((form: Form) => (
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
                      {form.responses_count || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(new Date(form.created_at || ''), 'MMM d, yyyy')}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(form.updated_at || ''), 'MMM d, yyyy')}
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
