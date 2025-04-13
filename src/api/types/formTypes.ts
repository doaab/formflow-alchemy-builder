export interface Form {
  id?: number;
  title: string;
  description: string;
  is_published?: boolean;
  slug?: string;
  theme?: string;
  collect_email?: boolean;
  one_response_per_user?: boolean;
  show_progress_bar?: boolean;
  shuffle_questions?: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  responses_count?: number;
}

export interface FormElement {
  id: number;
  form_id: number;
  element_id: string;
  type: string;
  label: string;
  placeholder: string | null;
  default_value: string | null;
  required: boolean;
  order: number;
  confirm_email: boolean | null;
  max_stars: number | null;
  address_expanded: boolean | null;
  address_street1: boolean | null;
  address_street2: boolean | null;
  address_city: boolean | null;
  address_state: boolean | null;
  address_zipcode: boolean | null;
  address_country: boolean | null;
  default_country: string | null;
  allowed_countries: string[] | null;
  description: string | null;
  conditional_logic_enabled: boolean | null;
  conditional_action: string | null;
  conditional_logic_gate: string | null;
  properties: any | null;
  options?: FormElementOption[];
  conditionalRules?: ConditionalRule[];
}

export interface FormElementOption {
  id: number;
  form_element_id: number;
  option_id: string;
  label: string;
  value: string;
  order: number;
}

export interface ConditionalRule {
  id: number;
  form_element_id: number;
  question_id: string;
  operator: string;
  value: string;
}

export interface FormResponse {
  id: number;
  form_id: number;
  user_id: number | null;
  ip_address: string | null;
  location: string | null;
  completion_time: number | null;
  created_at: string;
  updated_at: string;
  answers?: FormAnswer[];
}

export interface FormAnswer {
  id: number;
  form_response_id: number;
  form_element_id: number;
  value: string | null;
}

export interface FormResponseWithAnswers extends FormResponse {
  answers: FormAnswer[];
}

// API response types
export interface FormsResponse {
  data: Form[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface FormResponsesResponse {
  data: FormResponse[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
}
