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
    const response = await fetch(`${API_URL}/forms`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header here when implemented
        // 'Authorization': `Bearer ${token}`
      },
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
    const response = await fetch(`${API_URL}/forms/${formId}/responses`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header here when implemented
        // 'Authorization': `Bearer ${token}`
      },
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
    const response = await fetch(`${API_URL}/forms/${formId}/responses/${responseId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add authorization header here when implemented
        // 'Authorization': `Bearer ${token}`
      },
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
