
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Save } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createForm } from "@/api/services/formService";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  theme: z.string().default("default"),
  collect_email: z.boolean().default(false),
  one_response_per_user: z.boolean().default(false),
  show_progress_bar: z.boolean().default(true),
  shuffle_questions: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const CreateForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      theme: "default",
      collect_email: false,
      one_response_per_user: false,
      show_progress_bar: true,
      shuffle_questions: false,
    },
  });

  const createFormMutation = useMutation({
    mutationFn: createForm,
    onSuccess: (data) => {
      toast.success("Form created successfully!");
      // Redirect to form editor instead of form details
      navigate(`/forms/${data.id}/edit`);
    },
    onError: (error: Error) => {
      toast.error(`Error creating form: ${error.message}`);
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    createFormMutation.mutate({
      title: data.title, // Make sure title is always provided
      description: data.description || "",
      theme: data.theme,
      collect_email: data.collect_email,
      one_response_per_user: data.one_response_per_user,
      show_progress_bar: data.show_progress_bar,
      shuffle_questions: data.shuffle_questions,
      status: 'draft',
      user_id: 1, // Default user ID
      slug: ''  // The backend will generate a slug
    });
  };

  return (
    <div className="container py-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Form</CardTitle>
            <CardDescription>
              Design your form and collect responses easily
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Form Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Enter form title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter form description (optional)"
                  {...register("description")}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  defaultValue="default" 
                  onValueChange={(value) => setValue("theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="collect_email" 
                    {...register("collect_email")}
                    onCheckedChange={(checked) => 
                      setValue("collect_email", checked as boolean)
                    }
                  />
                  <Label htmlFor="collect_email">
                    Collect Respondent Email
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="one_response_per_user" 
                    {...register("one_response_per_user")}
                    onCheckedChange={(checked) => 
                      setValue("one_response_per_user", checked as boolean)
                    }
                  />
                  <Label htmlFor="one_response_per_user">
                    One Response Per User
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show_progress_bar" 
                    {...register("show_progress_bar")}
                    defaultChecked={true}
                    onCheckedChange={(checked) => 
                      setValue("show_progress_bar", checked as boolean)
                    }
                  />
                  <Label htmlFor="show_progress_bar">
                    Show Progress Bar
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="shuffle_questions" 
                    {...register("shuffle_questions")}
                    onCheckedChange={(checked) => 
                      setValue("shuffle_questions", checked as boolean)
                    }
                  />
                  <Label htmlFor="shuffle_questions">
                    Shuffle Questions
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/forms')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Form
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateForm;
