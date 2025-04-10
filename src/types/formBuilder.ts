
export type QuestionType = 
  | 'text'
  | 'paragraph'
  | 'number'
  | 'email'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'face'
  | 'star'
  | 'phone'
  | 'address'
  | 'section'
  | 'break';

export type ConditionOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';

export interface Condition {
  questionId: string;
  operator: ConditionOperator;
  value: string;
}

// Base FormElement interface
export interface FormElement {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  placeholder?: string;
  defaultValue?: string;
  options?: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  maxStars?: number; // For star rating
  confirmEmail?: boolean; // New property for email confirmation
  conditionalLogic?: {
    enabled: boolean;
    action: 'show' | 'hide';
    conditions: Condition[];
    logicGate: 'all' | 'any';
  };
}

// Phone specific properties
export interface PhoneElement extends FormElement {
  type: 'phone';
  allowedCountries?: string[];
  defaultCountry?: string;
}

// Address specific properties
export interface AddressElement extends FormElement {
  type: 'address';
  expanded: boolean;
  fields: {
    street1: boolean;
    street2: boolean;
    city: boolean;
    state: boolean;
    zipCode: boolean;
    country: boolean;
  };
  allowedCountries?: string[];
}

export interface FormSection extends FormElement {
  type: 'section';
  description?: string;
}

export interface FormBreak extends FormElement {
  type: 'break';
}

// Union type of all possible form elements
export type FormElementTypes = 
  | FormElement 
  | FormSection 
  | FormBreak 
  | PhoneElement 
  | AddressElement;

export interface FormData {
  title: string;
  description: string;
  elements: FormElementTypes[];
}
