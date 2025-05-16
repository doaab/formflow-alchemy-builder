
import { FormResponse, FormResponsesResponse } from '../../types/formTypes';
import { API_URL } from '../config';
import { getAuthHeaders } from '../authService';

/**
 * Submit a form response
 */
export const submitFormResponse = async (slug: string, responseData: Record<string, any>): Promise<FormResponse> => {
  try {
    const response = await fetch(`${API_URL}/forms/${slug}/responses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(responseData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit form response: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting form response:', error);
    throw error;
  }
};

/**
 * Fetch all responses for a form
 */
export const getFormResponses = async (formId: number): Promise<FormResponsesResponse> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/responses`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch form responses: ${response.status}`);
    }

    const data = await response.json();
    console.log('Form responses data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching form responses:', error);
    throw error;
  }
};

/**
 * Fetch a single response for a form
 */
export const getFormResponse = async (formId: number, responseId: number): Promise<FormResponse> => {
  try {
    console.log(`Fetching form response: ${formId}/${responseId}`);
    const response = await fetch(`${API_URL}/forms/${formId}/responses/${responseId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Response error (${response.status}):`, errorText);
      throw new Error(`Failed to fetch form response: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched response data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching form response:', error);
    throw error;
  }
};

/**
 * Delete a response from a form
 */
export const deleteFormResponse = async (formId: number, responseId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/responses/${responseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete form response: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting form response:', error);
    throw error;
  }
};

/**
 * Export responses for a form
 */
export const exportFormResponses = async (formId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/responses/export`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to export form responses: ${response.status}`);
    }

    // Trigger download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form_${formId}_responses.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting form responses:', error);
    throw error;
  }
};

/**
 * Get statistics for form responses
 */
export const getFormResponseStatistics = async (formId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/responses/statistics`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to get form response statistics: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting form response statistics:', error);
    throw error;
  }
};
