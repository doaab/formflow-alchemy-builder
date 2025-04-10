
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
  | 'section'
  | 'break';

export type ConditionOperator = 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';

export interface Condition {
  questionId: string;
  operator: ConditionOperator;
  value: string;
}

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
  conditionalLogic?: {
    enabled: boolean;
    action: 'show' | 'hide';
    conditions: Condition[];
    logicGate: 'all' | 'any';
  };
}

export interface FormSection extends FormElement {
  type: 'section';
  description?: string;
}

export interface FormBreak extends FormElement {
  type: 'break';
}

export type FormElementTypes = FormElement | FormSection | FormBreak;

export interface FormData {
  title: string;
  description: string;
  elements: FormElementTypes[];
}
