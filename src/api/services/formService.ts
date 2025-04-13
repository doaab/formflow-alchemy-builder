import { FormsResponse, FormResponsesResponse, FormResponseWithAnswers } from '../types/formTypes';
import { getMockForms, getMockResponses, getMockResponseDetails } from '../mocks/formMockData';
import { API_URL } from './config';
import { toast } from 'sonner';

// API functions
export const fetchForms = async (): Promise<FormsResponse> => {
  try {
    // During development/testing, we might want to skip actual API calls
    if (import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log("Using mock data for forms");
      return getMockForms();
    }
    
    console.log("Fetching forms from API:", `${API_URL}/forms`);
    
    const response = await fetch(`${API_URL}/forms`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include', // Include cookies for Laravel Sanctum
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Unauthorized when fetching forms. Continuing as anonymous.");
        // Continue without throwing, we'll show forms accessible to anonymous users
      } else {
        console.error(`API error when fetching forms: ${response.status}`);
        // For other errors, we'll show the data we have or empty results
      }
    }
    
    const data = await response.json();
    console.log("Forms fetched successfully:", data);
    return data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    // Return empty data structure instead of throwing
    return { 
      data: [],
      current_page: 1,
      total: 0,
      per_page: 10,
      last_page: 1
    };
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
      },
      credentials: 'include', // Include cookies for Laravel Sanctum
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login.');
      }
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
      },
      credentials: 'include', // Include cookies for Laravel Sanctum
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please login.');
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching response details:', error);
    throw error;
  }
};
