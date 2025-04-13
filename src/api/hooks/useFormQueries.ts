
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchForms, fetchFormResponses, fetchFormResponseDetails } from '../services/formService';
import { API_URL } from '../services/config';
import { toast } from 'sonner';
import { getCsrfCookie } from '../services/authService';

// React Query hooks
export const useForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: fetchForms,
  });
};

export const useFormResponses = (formId: number) => {
  return useQuery({
    queryKey: ['form-responses', formId],
    queryFn: () => fetchFormResponses(formId),
    enabled: !!formId,
  });
};

export const useFormResponseDetails = (formId: number, responseId: number) => {
  return useQuery({
    queryKey: ['form-response-details', formId, responseId],
    queryFn: () => fetchFormResponseDetails(formId, responseId),
    enabled: !!formId && !!responseId,
  });
};

export const useSaveForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData: any) => {
      try {
        // Ensure we have a valid API URL
        if (!API_URL) {
          throw new Error('API URL is not configured');
        }
        
        // Check if form has an ID to determine if it's an update or new form
        const method = formData.id ? 'PUT' : 'POST';
        const url = formData.id ? `${API_URL}/forms/${formData.id}` : `${API_URL}/forms`;
        
        // Try to get CSRF token first - this is important even for unauthenticated requests
        console.log("Fetching CSRF token from:", API_URL);
        await getCsrfCookie();
        
        // Ensure user_id is set
        if (!formData.user_id) {
          formData.user_id = 1; // Set default user_id for anonymous forms
          console.log("Setting default user_id=1 for form");
        }
        
        console.log(`Sending ${method} request to ${url}`, formData);
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
          // Add timeout to avoid waiting too long
          signal: AbortSignal.timeout(10000),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Form save error response:', response.status, errorData || response.statusText);
          
          throw new Error(errorData?.message || `Failed to save form: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Form saved successfully:', result);
        
        return result;
      } catch (error) {
        console.error('Form save error details:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch forms list
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success("Form saved successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error saving form: ${error.message}`);
    }
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
      // Using the correct URL format for the export endpoint
      const response = await fetch(`${API_URL}/forms/${formId}/responses/export`, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv, application/json',
        },
        credentials: 'include', // Include cookies for Laravel Sanctum
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Export response error:', errorText);
        throw new Error(`Failed to export responses: ${response.status}`);
      }
      
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
