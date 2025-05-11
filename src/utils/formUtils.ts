
import { Condition, FormElementTypes } from '@/api/types/formTypes';

export const evaluateCondition = (
  condition: Condition,
  formValues: Record<string, any>,
  elements: FormElementTypes[]
): boolean => {
  const { questionId, operator, value } = condition;
  const questionValue = formValues[questionId];
  
  // If question hasn't been answered yet, default to false
  if (questionValue === undefined || questionValue === null) {
    return false;
  }
  
  switch (operator) {
    case 'equals':
      return questionValue === value;
    case 'not_equals':
      return questionValue !== value;
    case 'contains':
      return String(questionValue).includes(value);
    case 'not_contains':
      return !String(questionValue).includes(value);
    case 'greater_than':
      return Number(questionValue) > Number(value);
    case 'less_than':
      return Number(questionValue) < Number(value);
    default:
      return false;
  }
};

export const evaluateConditions = (
  conditionalLogic: {
    enabled: boolean;
    action: 'show' | 'hide';
    conditions: Condition[];
    logicGate: 'all' | 'any';
  },
  formValues: Record<string, any>,
  elements: FormElementTypes[]
): boolean => {
  if (!conditionalLogic.enabled || conditionalLogic.conditions.length === 0) {
    return true;
  }
  
  const conditionResults = conditionalLogic.conditions.map(condition => 
    evaluateCondition(condition, formValues, elements)
  );
  
  // If ANY condition should match (OR logic)
  if (conditionalLogic.logicGate === 'any') {
    const shouldShow = conditionResults.some(result => result);
    return conditionalLogic.action === 'show' ? shouldShow : !shouldShow;
  }
  
  // If ALL conditions should match (AND logic)
  const shouldShow = conditionResults.every(result => result);
  return conditionalLogic.action === 'show' ? shouldShow : !shouldShow;
};
