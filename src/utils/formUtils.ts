
import { FormData, FormElement, FormElementTypes } from "@/types/formBuilder";

export const evaluateCondition = (
  element: FormElementTypes | undefined,
  formResponses: Record<string, any>
): boolean => {
  // Return true if element is undefined or has no conditional logic
  if (!element || !element.conditionalLogic || !element.conditionalLogic.enabled || element.conditionalLogic.conditions.length === 0) {
    return true; // No conditions or no element, so it should be shown
  }

  const { action, conditions, logicGate } = element.conditionalLogic;
  
  const conditionResults = conditions.map(condition => {
    const { questionId, operator, value } = condition;
    const responseValue = formResponses[questionId];
    
    if (responseValue === undefined) {
      return false;
    }
    
    switch (operator) {
      case 'equals':
        return responseValue === value;
      case 'not_equals':
        return responseValue !== value;
      case 'contains':
        return typeof responseValue === 'string' && responseValue.includes(value);
      case 'not_contains':
        return typeof responseValue === 'string' && !responseValue.includes(value);
      case 'greater_than':
        return parseFloat(responseValue) > parseFloat(value);
      case 'less_than':
        return parseFloat(responseValue) < parseFloat(value);
      default:
        return false;
    }
  });
  
  // Determine if conditions are met based on the logic gate
  const conditionsMet = logicGate === 'all'
    ? conditionResults.every(result => result)
    : conditionResults.some(result => result);
    
  // Return true if the element should be shown
  return action === 'show' ? conditionsMet : !conditionsMet;
};

export const saveFormToLocalStorage = (form: FormData): void => {
  try {
    localStorage.setItem('savedForm', JSON.stringify(form));
  } catch (error) {
    console.error('Error saving form to localStorage:', error);
  }
};

export const getSavedForm = (): FormData | null => {
  try {
    const savedForm = localStorage.getItem('savedForm');
    return savedForm ? JSON.parse(savedForm) : null;
  } catch (error) {
    console.error('Error retrieving form from localStorage:', error);
    return null;
  }
};
