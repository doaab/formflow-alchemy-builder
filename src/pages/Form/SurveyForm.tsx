import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';
import { API_URL } from '@/api/services/config';
import { Form, FormElementTypes } from '@/api/types/formTypes';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Define a type for server-side form elements that include element_id and order
interface ServerFormElement extends FormElementTypes {
  element_id: string;
  order: number;
}

// Define the interface for URL parameters
interface SurveyParams {
  slug: string;
}

const SurveyForm = () => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [startTime] = useState<number>(Math.floor(Date.now() / 1000)); // Record start time in seconds
  const [formCompleted, setFormCompleted] = useState<boolean>(false);
  const [wizardMode, setWizardMode] = useState<boolean>(false);
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);
  
  const params = useParams<{ slug?: string }>();
  const slug = params.slug;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchForm = async () => {
      try {
        if (!slug) {
          setError('No form slug provided');
          setLoading(false);
          return;
        }
        
        console.log('Fetching form with slug:', slug);
        const response = await fetch(`${API_URL}/forms/by-slug/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Form not found');
          } else {
            setError('Failed to load the form');
          }
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        console.log('Form data loaded:', data);
        setForm(data);
        
        // Initialize form data with default values if available
        if (data.elements) {
          const initialFormData: Record<string, any> = {};
          data.elements.forEach((element: ServerFormElement) => {
            if (element.defaultValue) {
              initialFormData[element.element_id] = element.defaultValue;
            } else if (element.type === 'checkbox') {
              // Initialize checkbox values as empty arrays
              initialFormData[element.element_id] = [];
            }
          });
          setFormData(initialFormData);
          
          // Check if form has break elements (for wizard mode)
          const breakIndices: number[] = [];
          data.elements.forEach((element: ServerFormElement, index: number) => {
            if (element.type === 'break') {
              breakIndices.push(index);
            }
          });
          
          if (breakIndices.length > 0) {
            setWizardMode(true);
            setPageBreaks(breakIndices);
            console.log("Wizard mode enabled with page breaks at:", breakIndices);
          } else {
            setWizardMode(false);
            console.log("Standard form mode enabled");
          }
        }
      } catch (err) {
        console.error('Error fetching form:', err);
        setError('An error occurred while loading the form');
      } finally {
        setLoading(false);
      }
    };
    
    fetchForm();
  }, [slug]);
  
  // Get all form elements except layout elements
  const getAllFormElements = () => {
    if (!form?.elements) return [];
    
    // Sort elements by order
    return (form.elements as ServerFormElement[])
      .filter(element => !['break'].includes(element.type))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };
  
  // Get visible elements for current wizard step
  const getVisibleElements = () => {
    if (!wizardMode) {
      // In standard mode, return all elements except breaks
      return getAllFormElements();
    }
    
    // In wizard mode, return only elements for the current step
    const allElements = form?.elements || [];
    const sortedElements = [...allElements].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    
    let startIndex = 0;
    let endIndex = sortedElements.length;
    
    // Find the correct start index
    if (currentStep > 0 && pageBreaks.length > 0) {
      if (currentStep - 1 < pageBreaks.length) {
        startIndex = pageBreaks[currentStep - 1] + 1; // Start after the previous page break
      }
    }
    
    // Find the correct end index
    if (currentStep < pageBreaks.length) {
      endIndex = pageBreaks[currentStep];
    }
    
    // Return elements for current step
    return sortedElements
      .slice(startIndex, endIndex)
      .filter(element => !['break'].includes(element.type));
  };
  
  const handleInputChange = (elementId: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [elementId]: value
    }));
  };
  
  const handleNextStep = () => {
    const visibleElements = getVisibleElements();
    
    // Check if current step's required fields are filled
    const isValid = visibleElements.every(element => {
      if (element.required && !formData[element.element_id]) {
        toast.error(`${element.label} is required`);
        return false;
      }
      return true;
    });
    
    if (!isValid) {
      return;
    }
    
    if (wizardMode) {
      if (currentStep < pageBreaks.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        handleSubmit();
      }
    } else {
      // In standard mode, just submit the form
      handleSubmit();
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async () => {
    if (!form) return;
    
    // Check if form is paused
    if (form.status === 'paused' || form.is_paused) {
      toast.error("This form is currently paused and not accepting responses");
      return;
    }
    
    setSubmitting(true);
    
    try {
      console.log('Preparing form data to submit');
      // Format the answers data
      const answers = Object.keys(formData).map(elementId => ({
        element_id: elementId,
        value: formData[elementId]
      }));
      
      const responseData = {
        answers,
        start_time: startTime,
        user_agent: navigator.userAgent,
        ip_address: '', // This will be filled by the server
        respondent_email: form.collect_email ? formData['email'] : null
      };
      
      console.log('Submitting form data:', responseData);
      
      const response = await fetch(`${API_URL}/forms/${slug}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(responseData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }
      
      // Show success message and navigate to thank you page
      toast.success('Form submitted successfully!');
      
      // Redirect to a thank you page or show completion component
      // For now, we'll just show a toast and clear the form
      setFormData({});
      
      // Show a completion message or screen
      setFormCompleted(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Render form element based on type
  const renderFormElement = (element: ServerFormElement) => {
    const { type, element_id, label, placeholder, required, options } = element;
    
    switch (type) {
      case 'text':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
              type="text" 
              placeholder={placeholder || ''} 
              value={formData[element_id] || ''} 
              onChange={(e) => handleInputChange(element_id, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
      
      case 'paragraph':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea 
              placeholder={placeholder || ''} 
              value={formData[element_id] || ''} 
              onChange={(e) => handleInputChange(element_id, e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
              type="email" 
              placeholder={placeholder || ''} 
              value={formData[element_id] || ''} 
              onChange={(e) => handleInputChange(element_id, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
        
      case 'number':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
              type="number" 
              placeholder={placeholder || ''} 
              value={formData[element_id] || ''} 
              onChange={(e) => handleInputChange(element_id, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        );
        
      case 'radio':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {options?.map((option: any) => (
                <label key={option.option_id} className="flex items-center">
                  <input 
                    type="radio" 
                    name={element_id} 
                    value={option.value} 
                    checked={formData[element_id] === option.value} 
                    onChange={() => handleInputChange(element_id, option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {options?.map((option: any) => (
                <label key={option.option_id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    value={option.value} 
                    checked={Array.isArray(formData[element_id]) && formData[element_id].includes(option.value)} 
                    onChange={(e) => {
                      const currentValues = Array.isArray(formData[element_id]) ? [...formData[element_id]] : [];
                      if (e.target.checked) {
                        handleInputChange(element_id, [...currentValues, option.value]);
                      } else {
                        handleInputChange(element_id, currentValues.filter((v: string) => v !== option.value));
                      }
                    }}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        );
        
      case 'select':
      case 'dropdown':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select 
              value={formData[element_id] || ''} 
              onChange={(e) => handleInputChange(element_id, e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select an option</option>
              {options?.map((option: any) => (
                <option key={option.option_id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
        
      case 'section':
        return (
          <div className="mb-6">
            <h3 className="text-lg font-medium">{label}</h3>
            {element.description && (
              <p className="text-sm text-gray-600 mt-1">{element.description}</p>
            )}
            <hr className="my-2" />
          </div>
        );
        
      default:
        return (
          <div className="mb-4">
            <p className="text-sm text-gray-500">Unsupported element type: {type}</p>
          </div>
        );
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Error</CardTitle>
            <CardDescription>There was a problem loading the form</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Form not found
  if (!form) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Form Not Found</CardTitle>
            <CardDescription>The requested form could not be found</CardDescription>
          </CardHeader>
          <CardContent>
            <p>The form you're looking for doesn't exist or has been removed.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Form completion state
  if (formCompleted) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Thank You!</CardTitle>
            <CardDescription>Your response has been submitted successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8">
              Thank you for completing the form. Your response has been recorded.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Form is paused
  if (form.status === 'paused' || form.is_paused) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">{form.title}</CardTitle>
            {form.description && <CardDescription>{form.description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Form Paused</AlertTitle>
              <AlertDescription>
                This form is currently not accepting responses. Please check back later.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Active form
  const visibleElements = getVisibleElements() as ServerFormElement[];
  const totalSteps = wizardMode ? pageBreaks.length + 1 : 1; // In wizard mode, total steps = number of page breaks + 1
  const progress = wizardMode ? ((currentStep / totalSteps) * 100) : 0;
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{form.title}</CardTitle>
          {form.description && <CardDescription>{form.description}</CardDescription>}
          
          {form.show_progress_bar && wizardMode && totalSteps > 1 && (
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-right mt-1 text-gray-500">
                Step {currentStep + 1} of {totalSteps}
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="py-4 space-y-6">
            {visibleElements.map((element) => (
              <div key={element.element_id}>
                {renderFormElement(element)}
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {wizardMode && (
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 0 || submitting}
            >
              Previous
            </Button>
          )}
          
          {!wizardMode && (
            <div></div> // Empty div to maintain flex spacing when not in wizard mode
          )}
          
          <Button
            onClick={handleNextStep}
            disabled={submitting}
          >
            {wizardMode && currentStep < pageBreaks.length ? 'Next' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SurveyForm;
