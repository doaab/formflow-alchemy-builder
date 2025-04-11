
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Base API URL - adjust based on your environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Type definitions
export interface Form {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  responses_count: number;
}

export interface FormsResponse {
  data: Form[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface FormResponse {
  id: number;
  form_id: number;
  user_id: number | null;
  ip_address: string | null;
  user_agent: string | null;
  respondent_email: string | null;
  completion_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface FormAnswer {
  id: number;
  form_response_id: number;
  form_element_id: number;
  value: string;
  created_at: string;
  updated_at: string;
  formElement?: {
    id: number;
    type: string;
    label: string;
    element_id: string;
  };
}

export interface FormResponseWithAnswers extends FormResponse {
  answers: FormAnswer[];
}

export interface FormResponsesResponse {
  data: FormResponse[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

// API functions
export const fetchForms = async (): Promise<FormsResponse> => {
  try {
    // During development/testing, we might want to skip actual API calls
    if (import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log("Using mock data for forms");
      return getMockForms();
    }
    
    const response = await fetch(`${API_URL}/forms`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header here when implemented
        // 'Authorization': `Bearer ${token}`
      },
      credentials: 'include', // Include cookies for Laravel Sanctum
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

export const fetchFormResponses = async (formId: number): Promise<FormResponsesResponse> => {
  try {
    // During development/testing, we might want to skip actual API calls
    if (import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log("Using mock data for form responses");
      return getMockResponses(formId);
    }
    
    const response = await fetch(`${API_URL}/forms/${formId}/responses`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header here when implemented
        // 'Authorization': `Bearer ${token}`
      },
      credentials: 'include', // Include cookies for Laravel Sanctum
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching form responses:', error);
    throw error;
  }
};

export const fetchFormResponseDetails = async (formId: number, responseId: number): Promise<FormResponseWithAnswers> => {
  try {
    // During development/testing, we might want to skip actual API calls
    if (import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log("Using mock data for response details");
      return getMockResponseDetails(formId, responseId);
    }
    
    const response = await fetch(`${API_URL}/forms/${formId}/responses/${responseId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header here when implemented
        // 'Authorization': `Bearer ${token}`
      },
      credentials: 'include', // Include cookies for Laravel Sanctum
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching response details:', error);
    throw error;
  }
};

// React Query hooks
export const useForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: fetchForms,
  });
};

export const useToggleFormPublish = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ formId, isPublished }: { formId: number, isPublished: boolean }) => {
      const response = await fetch(`${API_URL}/forms/${formId}/toggle-publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add authorization header here when implemented
        },
        credentials: 'include', // Include cookies for Laravel Sanctum
      });
      
      if (!response.ok) throw new Error('Failed to toggle form publish status');
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch forms
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
};

export const useDeleteForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formId: number) => {
      const response = await fetch(`${API_URL}/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add authorization header here when implemented
        },
        credentials: 'include', // Include cookies for Laravel Sanctum
      });
      
      if (!response.ok) throw new Error('Failed to delete form');
      return true;
    },
    onSuccess: () => {
      // Invalidate and refetch forms
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
};

export const useExportResponses = () => {
  return useMutation({
    mutationFn: async (formId: number) => {
      const response = await fetch(`${API_URL}/forms/${formId}/responses/export`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add authorization header here when implemented
        },
        credentials: 'include', // Include cookies for Laravel Sanctum
      });
      
      if (!response.ok) throw new Error('Failed to export responses');
      
      // Create a download link for the CSV file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form-${formId}-responses-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return true;
    }
  });
};

// Mock data functions for development/testing
function getMockForms(): FormsResponse {
  return {
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
      }
    ],
    links: {
      first: "",
      last: "",
      prev: null,
      next: null
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "",
      per_page: 15,
      to: 3,
      total: 3
    }
  };
}

function getMockResponses(formId: number): FormResponsesResponse {
  return {
    data: [
      {
        id: 1,
        form_id: formId,
        user_id: null,
        ip_address: "192.168.1.1",
        user_agent: "Mozilla/5.0",
        respondent_email: "test@example.com",
        completion_time: 145,
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z"
      },
      {
        id: 2,
        form_id: formId,
        user_id: 5,
        ip_address: "192.168.1.2",
        user_agent: "Chrome/100",
        respondent_email: "john@example.com",
        completion_time: 98,
        created_at: "2025-04-02T14:22:18.000000Z",
        updated_at: "2025-04-02T14:22:18.000000Z"
      },
      {
        id: 3,
        form_id: formId,
        user_id: null,
        ip_address: "192.168.1.3",
        user_agent: "Firefox/95",
        respondent_email: null,
        completion_time: 210,
        created_at: "2025-04-03T16:30:22.000000Z",
        updated_at: "2025-04-03T16:30:22.000000Z"
      }
    ],
    links: {
      first: "",
      last: "",
      prev: null,
      next: null
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "",
      per_page: 15,
      to: 3,
      total: 3
    }
  };
}

function getMockResponseDetails(formId: number, responseId: number): FormResponseWithAnswers {
  return {
    id: responseId,
    form_id: formId,
    user_id: null,
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0",
    respondent_email: "test@example.com",
    completion_time: 145,
    created_at: "2025-04-01T09:15:43.000000Z",
    updated_at: "2025-04-01T09:15:43.000000Z",
    answers: [
      {
        id: 1,
        form_response_id: responseId,
        form_element_id: 1,
        value: "John Doe",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 1,
          type: "text",
          label: "Your Name",
          element_id: "element_1"
        }
      },
      {
        id: 2,
        form_response_id: responseId,
        form_element_id: 2,
        value: "test@example.com",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 2,
          type: "email",
          label: "Your Email",
          element_id: "element_2"
        }
      },
      {
        id: 3,
        form_response_id: responseId,
        form_element_id: 3,
        value: "Excellent",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 3,
          type: "radio",
          label: "How would you rate our service?",
          element_id: "element_3"
        }
      },
      {
        id: 4,
        form_response_id: responseId,
        form_element_id: 4,
        value: "The customer service was exceptional. I had a great experience.",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 4,
          type: "textarea",
          label: "Any additional comments?",
          element_id: "element_4"
        }
      }
    ]
  };
}
