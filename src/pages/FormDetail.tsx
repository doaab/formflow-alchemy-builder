
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronLeft, 
  PenLine, 
  BarChart4, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/api/formApi";

const FormDetail = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("settings");
  
  // In a real implementation, we would fetch the form data from the API
  // For now, we'll use mock data
  const { data: form, isLoading } = useQuery({
    queryKey: ["form", formId],
    queryFn: () => {
      // This is temporary mock data - would normally call the API
      const mockForm: Form = {
        id: Number(formId),
        title: "Customer Feedback Survey",
        description: "Collect feedback from customers about our services",
        slug: "customer-feedback-survey-abc123",
        is_published: true,
        created_at: "2025-03-15T14:22:18.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        responses_count: 24
      };
      return Promise.resolve(mockForm);
    },
  });

  const handleTogglePublish = () => {
    if (!form) return;
    
    toast({
      title: form.is_published ? "Form unpublished" : "Form published",
      description: form.is_published 
        ? "The form is now in draft mode and can't receive responses." 
        : "The form is now live and can receive responses.",
    });
    
    // In a real implementation, we would call the API to update the form
  };

  const handleDelete = () => {
    toast({
      title: "Form deleted",
      description: "The form has been deleted successfully.",
    });
    
    // In a real implementation, we would call the API to delete the form
    // Then navigate back to the forms list
    navigate("/forms");
  };

  const handleEdit = () => {
    // Navigate to FormBuilder with the form ID
    navigate(`/?formId=${formId}`);
  };

  const handleViewResponses = () => {
    navigate(`/forms/${formId}/responses`);
  };

  if (isLoading) {
    return (
      <div className="container py-6 max-w-6xl">
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

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

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {form?.title || "Form Details"}
            </h1>
            {form?.is_published ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
            ) : (
              <Badge variant="outline">Draft</Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1 text-lg">
            {form?.description || "No description available"}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <PenLine className="mr-2 h-4 w-4" />
            Edit Form
          </Button>
          <Button variant="outline" onClick={handleViewResponses}>
            <BarChart4 className="mr-2 h-4 w-4" />
            View Responses
          </Button>
          <Button variant="outline" asChild>
            <a href={`/form/${form?.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Live Form
            </a>
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="share">Share</TabsTrigger>
          <TabsTrigger value="embed">Embed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form Status</CardTitle>
              <CardDescription>
                When a form is published, it can accept responses. Draft forms can't receive submissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="form-active" 
                  checked={form?.is_published} 
                  onCheckedChange={handleTogglePublish}
                />
                <label
                  htmlFor="form-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {form?.is_published ? (
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> Published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <EyeOff className="h-4 w-4" /> Draft
                    </span>
                  )}
                </label>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Last updated {new Date(form?.updated_at || "").toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>
                Be careful, these actions cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Form
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="share">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Form</CardTitle>
              <CardDescription>
                Share your form with others using these options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Form Link</label>
                <div className="flex">
                  <input
                    type="text"
                    readOnly
                    value={`https://yoursite.com/form/${form?.slug}`}
                    className="flex-1 rounded-l-md border border-r-0 bg-muted px-3 py-2 text-sm"
                  />
                  <Button className="rounded-l-none" onClick={() => {
                    navigator.clipboard.writeText(`https://yoursite.com/form/${form?.slug}`);
                    toast({
                      title: "Link copied",
                      description: "Form link copied to clipboard",
                    });
                  }}>
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="embed">
          <Card>
            <CardHeader>
              <CardTitle>Embed Form</CardTitle>
              <CardDescription>
                Embed this form on your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">Embed Code</label>
                <div className="flex">
                  <textarea
                    readOnly
                    rows={3}
                    value={`<iframe src="https://yoursite.com/form/${form?.slug}" width="100%" height="500" frameborder="0"></iframe>`}
                    className="flex-1 rounded-l-md border border-r-0 bg-muted px-3 py-2 text-sm"
                  />
                  <Button className="rounded-l-none h-auto" onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://yoursite.com/form/${form?.slug}" width="100%" height="500" frameborder="0"></iframe>`);
                    toast({
                      title: "Code copied",
                      description: "Embed code copied to clipboard",
                    });
                  }}>
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormDetail;
