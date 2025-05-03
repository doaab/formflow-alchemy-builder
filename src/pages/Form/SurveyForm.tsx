
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';
import { API_URL } from '@/api/services/config';
import { Form } from '@/api/types/formTypes';
import { FormElement } from 'lucide-react';

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
  const [startTime] = useState<number>(Date.now() / 1000); // Record start time in seconds
  
  const { slug } = useParams<SurveyParams>();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchForm = async () => {
      try {
        if (!slug) {
          setError('No form slug provided');
          setLoading(false);
          return;
        }
        
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
        setForm(data);
        
        // Initialize form data with default values if available
        if (data.elements) {
          const initialFormData: Record<string, any> = {};
          data.elements.forEach((element: any) => {
            if (element.default_value) {
              initialFormData[element.element_id] = element.default_value;
            }
          });
          setFormData(initialFormData);
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
  
  // Filter elements to exclude layout elements like section and break
  const getFormElements = () => {
    if (!form?.elements) return [];
    
    // First filter out section and break elements
    return form.elements
      .filter(element => !['section', 'break'].includes(element.type))
      .sort((a, b) => a.order - b.order);
  };
  
  // Get layout elements like section and break
  const getLayoutElements = () => {
    if (!form?.elements) return [];
    
    return form.elements
      .filter(element => ['section', 'break'].includes(element.type))
      .sort((a, b) => a.order - b.order);
  };
  
  const handleInputChange = (elementId: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [elementId]: value
    }));
  };
  
  const handleNextStep = () => {
    const elements = getFormElements();
    
    // Check if current step's required fields are filled
    const currentElement = elements[currentStep];
    if (currentElement?.required && !formData[currentElement.element_id]) {
      toast.error(`${currentElement.label} is required`);
      return;
    }
    
    if (currentStep < elements.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
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
    
    setSubmitting(true);
    
    try {
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
      setForm(prevForm => ({
        ...prevForm!,
        completed: true
      }));
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to submit form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Render form element based on type
  const renderFormElement = (element: any) => {
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
      
      case 'textarea':
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
                        handleInputChange(element_id, currentValues.filter(v => v !== option.value));
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
  if (form.completed) {
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
  
  // Active form
  const elements = getFormElements();
  const currentElement = elements[currentStep];
  const progress = elements.length > 0 ? (currentStep / elements.length) * 100 : 0;
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{form.title}</CardTitle>
          {form.description && <CardDescription>{form.description}</CardDescription>}
          
          {form.show_progress_bar && elements.length > 1 && (
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-right mt-1 text-gray-500">
                Question {currentStep + 1} of {elements.length}
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          {currentElement && (
            <div className="py-4">
              {renderFormElement(currentElement)}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0 || submitting}
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNextStep}
            disabled={submitting}
          >
            {currentStep < elements.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SurveyForm;
