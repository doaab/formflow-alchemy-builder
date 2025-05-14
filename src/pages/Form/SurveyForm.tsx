
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFormBySlug } from '@/api/services/formService';
import { Button } from '@/components/ui/button';
import { Form as FormType, FormElementTypes } from '@/api/types/formTypes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { CountrySelect } from "@/components/ui/country-select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

interface FormData {
  [key: string]: any;
}

const SurveyForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  const { data: form, isLoading, error } = useQuery({
    queryKey: ['form', slug],
    queryFn: () => getFormBySlug(slug as string),
    enabled: !!slug,
  });

  useEffect(() => {
    if (isLoading) {
      console.log('Loading form...');
    }
    if (error) {
      console.error('Error fetching form:', error);
    }
    if (form) {
      console.log('Form loaded:', form);
    }
  }, [form, isLoading, error]);

  useEffect(() => {
    // Record the start time when the component mounts
    setStartTime(time());

    // Clean up the start time when the component unmounts
    return () => {
      setStartTime(null);
    };
  }, []);

  // Function to get the current time in milliseconds
  const time = (): number => new Date().getTime();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Record the completion time
    setCompletionTime(time());

    // Basic validation to ensure required fields are filled
    if (!form) {
      toast({
        title: "Error",
        description: "Form data not loaded properly.",
        variant: "destructive",
      })
      return;
    }

    const typedForm = form as FormType;

    // Check if email is required and provided
    const collectEmail = typedForm.collect_email || false;
    if (collectEmail && !formData['email']) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return;
    }

    // Validate required fields
    for (const element of typedForm.elements || []) {
      if (element.required && !formData[element.id]) {
        toast({
          title: "Error",
          description: `Please answer the question: ${element.label}`,
          variant: "destructive",
        })
        return;
      }
    }

    // Prepare the data to be submitted
    const submitData = {
      ...formData,
      start_time: startTime,
      completion_time: completionTime ? completionTime - (startTime || 0) : null,
    };

    // Log the data being submitted
    console.log('Submitting form with data:', submitData);

    // Simulate form submission (replace with actual API call)
    try {
      // const response = await submitForm(slug, submitData);
      // console.log('Form submission successful:', response);
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      })
      // Redirect or show success message
      navigate('/thank-you');
    } catch (submitError: any) {
      console.error('Form submission error:', submitError);
      toast({
        title: "Error",
        description: submitError.message || "Failed to submit form.",
        variant: "destructive",
      })
    }
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle select changes
  const handleSelectChange = (value: string, elementId: string) => {
    setFormData({
      ...formData,
      [elementId]: value,
    });
  };

  // Function to handle slider changes
  const handleSliderChange = (value: number[], elementId: string) => {
    setFormData({
      ...formData,
      [elementId]: value[0],
    });
  };

  // Function to handle date changes
  const handleDateChange = (date: Date | undefined, elementId: string) => {
    setFormData({
      ...formData,
      [elementId]: date,
    });
  };

  // Function to handle country changes
  const handleCountryChange = (value: string, elementId: string) => {
    setFormData({
      ...formData,
      [elementId]: value,
    });
  };

  // Function to handle conditional logic
  const handleConditionalLogic = (elementId: string): boolean => {
    const typedForm = form as FormType;
    const element = typedForm.elements?.find((element) => element.id === elementId);
    if (!element || !element.conditionalLogic?.enabled) {
      return true;
    }

    const { action, conditions, logicGate } = element.conditionalLogic;
    let result = logicGate === 'all';

    for (const condition of conditions) {
      const { questionId, operator, value } = condition;
      const questionValue = formData[questionId];

      let conditionResult = false;

      switch (operator) {
        case 'equals':
          conditionResult = questionValue === value;
          break;
        case 'not_equals':
          conditionResult = questionValue !== value;
          break;
        case 'contains':
          conditionResult = questionValue?.includes(value);
          break;
        case 'not_contains':
          conditionResult = !questionValue?.includes(value);
          break;
        case 'greater_than':
          conditionResult = questionValue > value;
          break;
        case 'less_than':
          conditionResult = questionValue < value;
          break;
        default:
          conditionResult = false;
      }

      if (logicGate === 'all') {
        result = result && conditionResult;
      } else {
        result = result || conditionResult;
      }
    }

    return result ? action === 'show' : action === 'hide';
  };

  // Function to render form elements
  const renderFormElements = () => {
    const typedForm = form as FormType;
    return typedForm.elements?.map((element: FormElementTypes) => {
      // Check if the element should be displayed based on conditional logic
      if (!handleConditionalLogic(element.id)) {
        return null;
      }

      // Render different form elements based on their type
      switch (element.type) {
        case 'text':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Input
                type="text"
                id={element.id}
                name={element.id}
                placeholder={element.placeholder}
                value={formData[element.id] || ''}
                onChange={handleInputChange}
                required={element.required}
              />
            </div>
          );
        case 'paragraph':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Textarea
                id={element.id}
                name={element.id}
                placeholder={element.placeholder}
                value={formData[element.id] || ''}
                onChange={handleInputChange}
                required={element.required}
                className="min-h-[80px]"
              />
            </div>
          );
        case 'number':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Input
                type="number"
                id={element.id}
                name={element.id}
                placeholder={element.placeholder}
                value={formData[element.id] || ''}
                onChange={handleInputChange}
                required={element.required}
              />
            </div>
          );
        case 'email':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Input
                type="email"
                id={element.id}
                name={element.id}
                placeholder={element.placeholder}
                value={formData[element.id] || ''}
                onChange={handleInputChange}
                required={element.required}
              />
            </div>
          );
        case 'select':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Select onValueChange={(value) => handleSelectChange(value, element.id)}>
                <SelectTrigger id={element.id}>
                  <SelectValue placeholder={element.placeholder || element.label} />
                </SelectTrigger>
                <SelectContent>
                  {element.options?.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        case 'radio':
          return (
            <div key={element.id} className="grid gap-2">
              <Label>{element.label}</Label>
              {element.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id={`${element.id}-${option.id}`}
                    name={element.id}
                    value={option.value}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                    required={element.required}
                  />
                  <Label htmlFor={`${element.id}-${option.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          );
        case 'checkbox':
          return (
            <div key={element.id} className="grid gap-2">
              <Label>{element.label}</Label>
              {element.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${element.id}-${option.id}`}
                    name={element.id}
                    value={option.value}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        [`${element.id}-${option.id}`]: checked,
                      })
                    }
                    className="h-4 w-4"
                    required={element.required}
                  />
                  <Label htmlFor={`${element.id}-${option.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          );
        case 'date':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !formData[element.id] && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData[element.id] ? (
                      format(new Date(formData[element.id]), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData[element.id] ? new Date(formData[element.id]) : undefined}
                    onSelect={(date) => handleDateChange(date, element.id)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          );
        case 'star':
          return (
            <div key={element.id} className="grid gap-2">
              <Label htmlFor={element.id}>{element.label}</Label>
              <Slider
                defaultValue={[0]}
                max={element.maxStars || 5}
                step={1}
                onValueChange={(value) => handleSliderChange(value, element.id)}
                aria-label={element.label}
              />
              <p className="text-sm text-muted-foreground">
                Rating: {formData[element.id] || 0} / {element.maxStars || 5}
              </p>
            </div>
          );
        case 'section':
          return (
            <div key={element.id} className="grid gap-2">
              <h2 className="text-xl font-semibold">{element.label}</h2>
              <p className="text-sm text-muted-foreground">{element.description}</p>
            </div>
          );
        case 'break':
          return (
            <Separator key={element.id} className="my-4" />
          );
        default:
          return null;
      }
    });
  };

  const typedForm = form as FormType;

  // Check if the form is paused
  if (typedForm?.is_paused) {
    return (
      <div className="container py-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-600">This form is currently paused and not accepting responses.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if email is required
  const collectEmail = typedForm?.collect_email || false;
  
  // Check for progress bar
  const showProgressBar = typedForm?.show_progress_bar || true;

  return (
    <div className="container py-6">
      {isLoading && <p>Loading form...</p>}
      {error && <p>Error: {(error as Error).message}</p>}
      {form && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{typedForm?.title}</CardTitle>
              <CardDescription>{typedForm?.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Collect email if enabled */}
              {collectEmail && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData['email'] || ''}
                    onChange={handleInputChange}
                    required={collectEmail}
                  />
                </div>
              )}

              {/* Render form elements */}
              {renderFormElements()}
            </CardContent>
            <div className="flex justify-end space-x-2 p-6">
              <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
