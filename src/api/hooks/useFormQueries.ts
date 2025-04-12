
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchForms, fetchFormResponses, fetchFormResponseDetails } from '../services/formService';

// Base API URL - adjust based on your environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

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
