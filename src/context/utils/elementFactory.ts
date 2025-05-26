
import { v4 as uuidv4 } from 'uuid';
import { FormElementTypes, QuestionType } from '@/api/types/formTypes';

export const createFormElement = (type: QuestionType): FormElementTypes => {
  const newElementId = uuidv4();
  console.log('Adding element of type:', type, 'with ID:', newElementId);
  
  // Create basic element with defaults
  const newElement: FormElementTypes = {
    id: newElementId,
    type,
    label: `New ${type.toString().charAt(0).toUpperCase() + type.toString().slice(1)} Question`,
    required: false,
  };
  
  // Add appropriate defaults based on element type
  if (['text', 'paragraph', 'email', 'number'].includes(type)) {
    newElement.placeholder = '';
    newElement.defaultValue = '';
  }
  
  // Add options for select/choice type elements
  if (['dropdown', 'radio', 'checkbox'].includes(type)) {
    newElement.options = [
      { id: uuidv4(), label: 'Option 1', value: 'option_1' },
      { id: uuidv4(), label: 'Option 2', value: 'option_2' }
    ];
  }
  
  // Add email confirmation for email type
  if (type === 'email') {
    newElement.confirmEmail = false;
  }
  
  // Add rating options
  if (type === 'star') {
    newElement.maxStars = 5;
  }
  
  // Add section description
  if (type === 'section') {
    newElement.description = '';
  }
  
  // Add address fields configuration
  if (type === 'address') {
    newElement.expanded = true;
    newElement.fields = {
      street1: true,
      street2: true,
      city: true,
      state: true,
      zipCode: true,
      country: true
    };
    newElement.allowedCountries = ['US', 'CA'];
  }
  
  // Add phone configuration
  if (type === 'phone') {
    newElement.defaultCountry = 'US';
    newElement.allowedCountries = ['US', 'CA'];
  }

  // Add conditional logic
  newElement.conditionalLogic = {
    enabled: false,
    action: 'show',
    conditions: [],
    logicGate: 'all'
  };

  console.log('Created new element:', newElement);
  return newElement;
};
