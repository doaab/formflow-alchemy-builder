
import { FormData, FormElement, FormElementTypes, Condition } from "@/types/formBuilder";

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

/**
 * Converts a backend form model to the frontend form data structure
 */
export const convertBackendFormToFrontend = (form: any, elements: any[]): FormData => {
  try {
    if (!form || !elements) {
      throw new Error("Invalid form or elements data");
    }
    
    // Convert backend form model to frontend form data structure
    const convertedElements = elements.map(element => {
      const baseElement: any = {
        id: element.element_id,
        type: element.type as any,
        label: element.label,
        required: element.required,
        placeholder: element.placeholder || undefined,
        defaultValue: element.default_value || undefined,
      };
      
      // Handle specific element types
      switch (element.type) {
        case 'email':
          baseElement.confirmEmail = element.confirm_email || false;
          break;
        case 'star':
          baseElement.maxStars = element.max_stars || 5;
          break;
        case 'section':
          baseElement.description = element.description || '';
          break;
        case 'address':
          baseElement.expanded = element.address_expanded || false;
          baseElement.fields = {
            street1: element.address_street1 || true,
            street2: element.address_street2 || true,
            city: element.address_city || true,
            state: element.address_state || true,
            zipCode: element.address_zipcode || true,
            country: element.address_country || true,
          };
          baseElement.allowedCountries = element.allowed_countries || undefined;
          break;
        case 'phone':
          baseElement.defaultCountry = element.default_country || 'US';
          baseElement.allowedCountries = element.allowed_countries || undefined;
          break;
      }
      
      // Handle options for select, radio, checkbox
      if (element.options && element.options.length > 0) {
        baseElement.options = element.options.map((opt: any) => ({
          id: opt.option_id,
          label: opt.label,
          value: opt.value
        }));
      }
      
      // Handle conditional logic
      if (element.conditional_logic_enabled) {
        baseElement.conditionalLogic = {
          enabled: true,
          action: element.conditional_action as 'show' | 'hide',
          logicGate: element.conditional_logic_gate as 'all' | 'any',
          conditions: element.conditionalRules?.map((rule: any) => ({
            questionId: rule.question_id,
            operator: rule.operator as any,
            value: rule.value
          })) || []
        };
      }
      
      return baseElement;
    });
    
    return {
      title: form.title,
      description: form.description,
      elements: convertedElements,
    };
  } catch (error) {
    console.error("Error converting backend form to frontend:", error);
    throw error;
  }
};

/**
 * Transforms form data from the frontend format to the backend format
 */
export const prepareFormDataForBackend = (formData: FormData): any => {
  // Basic form information
  const backendForm = {
    title: formData.title,
    description: formData.description,
    // The following properties would be set if this were updating an existing form
    // slug: "custom-slug", // optional, backend will generate if not provided
    theme: "default",
    collect_email: false,
    one_response_per_user: false,
    show_progress_bar: true,
    shuffle_questions: false,
  };

  // If we're creating a new form without elements initially
  if (!formData.elements.length) {
    return backendForm;
  }

  // If we're including elements with the form creation or updating elements
  const preparedElements = formData.elements.map((element, index) => {
    // Base element properties common to all types
    const baseElement = {
      element_id: element.id,
      type: element.type,
      label: element.label,
      placeholder: element.placeholder || null,
      default_value: element.defaultValue || null,
      required: element.required,
      order: index,
    };

    // Add type-specific properties
    const typeSpecificProps: Record<string, any> = {};

    // Handle email confirmation
    if (element.type === 'email' && 'confirmEmail' in element) {
      typeSpecificProps.confirm_email = element.confirmEmail;
    }

    // Handle star rating max stars
    if (element.type === 'star' && 'maxStars' in element) {
      typeSpecificProps.max_stars = element.maxStars;
    }

    // Handle address fields
    if (element.type === 'address' && 'fields' in element && 'expanded' in element) {
      const addressElement = element as any; // Type assertion for address-specific props
      typeSpecificProps.address_expanded = addressElement.expanded;
      typeSpecificProps.address_street1 = addressElement.fields.street1;
      typeSpecificProps.address_street2 = addressElement.fields.street2;
      typeSpecificProps.address_city = addressElement.fields.city;
      typeSpecificProps.address_state = addressElement.fields.state;
      typeSpecificProps.address_zipcode = addressElement.fields.zipCode;
      typeSpecificProps.address_country = addressElement.fields.country;
      
      if (addressElement.allowedCountries) {
        typeSpecificProps.allowed_countries = addressElement.allowedCountries;
      }
    }

    // Handle phone fields
    if (element.type === 'phone') {
      const phoneElement = element as any; // Type assertion for phone-specific props
      if (phoneElement.defaultCountry) {
        typeSpecificProps.default_country = phoneElement.defaultCountry;
      }
      if (phoneElement.allowedCountries) {
        typeSpecificProps.allowed_countries = phoneElement.allowedCountries;
      }
    }

    // Handle section description
    if (element.type === 'section' && 'description' in element) {
      typeSpecificProps.description = element.description;
    }

    // Handle conditional logic
    if (element.conditionalLogic && element.conditionalLogic.enabled) {
      typeSpecificProps.conditional_logic_enabled = true;
      typeSpecificProps.conditional_action = element.conditionalLogic.action;
      typeSpecificProps.conditional_logic_gate = element.conditionalLogic.logicGate;
      
      // Format conditional rules
      const conditionalRules = element.conditionalLogic.conditions.map(condition => ({
        question_id: condition.questionId,
        operator: condition.operator,
        value: condition.value
      }));
      
      typeSpecificProps.conditional_rules = conditionalRules;
    }

    // Handle options for dropdown, radio, checkbox
    if (element.options && element.options.length > 0) {
      typeSpecificProps.options = element.options.map((option, optIndex) => ({
        option_id: option.id,
        label: option.label,
        value: option.value,
        order: optIndex
      }));
    }

    // Combine all properties
    return {
      ...baseElement,
      ...typeSpecificProps
    };
  });

  // For creating/updating a form with elements
  return {
    ...backendForm,
    elements: preparedElements
  };
};
