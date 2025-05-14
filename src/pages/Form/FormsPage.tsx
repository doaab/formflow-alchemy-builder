
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForms } from "@/api/hooks/useFormQueries";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, File, FileText, Pencil } from "lucide-react";

const FormsPage = () => {
  const navigate = useNavigate();
  const { data: formsData, isLoading, error } = useForms();
  const forms = formsData?.data || [];

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">My Forms</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[200px] animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mt-2"></div>
                <div className="h-4 bg-muted rounded w-3/4 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">My Forms</h1>
        <div className="bg-destructive/10 p-4 rounded-md text-destructive">
          <p>Error loading forms: {(error as Error).message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Forms</h1>
        <Button onClick={() => navigate("/forms/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {forms.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-xl font-semibold">No Forms Yet</h3>
              <p className="text-muted-foreground mt-1">
                Create your first form to start collecting responses
              </p>
            </div>
            <Button onClick={() => navigate("/forms/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Form
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <Card key={form.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
                <CardDescription>
                  {form.status_label || (form.is_published ? "Published" : "Draft")}
                  {form.responses_count !== undefined && (
                    <span className="ml-2 text-muted-foreground">
                      • {form.responses_count} response
                      {form.responses_count !== 1 ? "s" : ""}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {form.description || "No description"}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/forms/${form.id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to={`/forms/${form.id}/responses`}>
                    <File className="mr-2 h-4 w-4" />
                    Responses
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsPage;
