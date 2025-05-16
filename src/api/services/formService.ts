
// Re-export all form-related services from their specific files
export * from './form/formService';
export * from './form/elementService';
export * from './form/responseService';
export * from './form/questionTypeService';

// Re-export specific functions to maintain backward compatibility
import { 
  getFormResponses as _getFormResponses,
  getFormResponse as _getFormResponse 
} from './form/responseService';

// Export with the original names for backward compatibility
export const getFormResponses = _getFormResponses;
export const getFormResponse = _getFormResponse;
