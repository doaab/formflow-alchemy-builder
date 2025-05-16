
import { Form, FormStatus } from '../../types/formTypes';
import { API_URL } from '../config';
import { getAuthHeaders } from '../authService';

/**
 * Fetch all forms
 */
export const getAllForms = async (): Promise<{
  data: Form[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
}> => {
  console.log('Fetching forms from API:', `${API_URL}/forms`);
  
  try {
    const response = await fetch(`${API_URL}/forms`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch forms: ${response.status}`);
    }

    const data = await response.json();
    console.log('Forms fetched successfully:', data);
    
    return {
      data: data.data || [],
      meta: {
        current_page: data.current_page || 1,
        last_page: data.last_page || 1,
        total: data.total || 0,
      }
    };
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

/**
 * Fetch a single form by ID
 */
export const getFormById = async (id: number): Promise<Form> => {
  try {
    const response = await fetch(`${API_URL}/forms/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch form: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};

// Add alias for getForm to support existing code
export const getForm = getFormById;

/**
 * Fetch a single form by slug
 */
export const getFormBySlug = async (slug: string): Promise<Form> => {
  try {
    const response = await fetch(`${API_URL}/forms/by-slug/${slug}`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch form: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};

/**
 * Create a new form
 */
export const createForm = async (form: Omit<Form, 'id' | 'created_at' | 'updated_at'>): Promise<Form> => {
  try {
    const response = await fetch(`${API_URL}/forms`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`Failed to create form: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
};

/**
 * Update an existing form
 */
export const updateForm = async (id: number, form: Partial<Omit<Form, 'id' | 'created_at' | 'updated_at'>>): Promise<Form> => {
  try {
    const response = await fetch(`${API_URL}/forms/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`Failed to update form: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating form:', error);
    throw error;
  }
};

/**
 * Delete a form
 */
export const deleteForm = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/forms/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete form: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error;
  }
};

/**
 * Toggle the publish status of a form
 */
export const togglePublishForm = async (id: number): Promise<Form> => {
  try {
    const response = await fetch(`${API_URL}/forms/${id}/toggle-publish`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle publish status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error toggling publish status:', error);
    throw error;
  }
};

/**
 * Update the status of a form
 */
export const updateFormStatus = async (id: number, status: FormStatus): Promise<Form> => {
  try {
    const response = await fetch(`${API_URL}/forms/${id}/status`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update form status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating form status:', error);
    throw error;
  }
};

/**
 * Get analytics for a form
 */
export const getFormAnalytics = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/forms/${id}/analytics`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to get form analytics: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting form analytics:', error);
    throw error;
  }
};
