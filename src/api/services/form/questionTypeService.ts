
import { QuestionType } from '../../types/formTypes';
import { API_URL } from '../config';
import { getAuthHeaders } from '../authService';

/**
 * Fetch all question types
 */
export const getAllQuestionTypes = async (): Promise<QuestionType[]> => {
  try {
    const response = await fetch(`${API_URL}/question-types`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch question types: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching question types:', error);
    throw error;
  }
};
