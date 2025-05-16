
import { FormElement } from '../../types/formTypes';
import { API_URL } from '../config';
import { getAuthHeaders } from '../authService';

/**
 * Fetch all elements for a form
 */
export const getFormElements = async (formId: number): Promise<FormElement[]> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/elements`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch form elements: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching form elements:', error);
    throw error;
  }
};

/**
 * Create a new element for a form
 */
export const createFormElement = async (formId: number, element: Omit<FormElement, 'id' | 'created_at' | 'updated_at' | 'form_id'>): Promise<FormElement> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/elements`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(element),
    });

    if (!response.ok) {
      throw new Error(`Failed to create form element: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating form element:', error);
    throw error;
  }
};

/**
 * Update an existing element for a form
 */
export const updateFormElement = async (formId: number, elementId: number, element: Partial<Omit<FormElement, 'id' | 'created_at' | 'updated_at' | 'form_id'>>): Promise<FormElement> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/elements/${elementId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(element),
    });

    if (!response.ok) {
      throw new Error(`Failed to update form element: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating form element:', error);
    throw error;
  }
};

/**
 * Delete an element from a form
 */
export const deleteFormElement = async (formId: number, elementId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/elements/${elementId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete form element: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting form element:', error);
    throw error;
  }
};

/**
 * Reorder elements for a form
 */
export const reorderFormElements = async (formId: number, elementIds: number[]): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/forms/${formId}/elements/reorder`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ elementIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to reorder form elements: ${response.status}`);
    }
  } catch (error) {
    console.error('Error reordering form elements:', error);
    throw error;
  }
};
