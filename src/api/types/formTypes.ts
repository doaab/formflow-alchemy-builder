
// Type definitions for form-related data

export interface Form {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  responses_count: number;
}

export interface FormsResponse {
  data: Form[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface FormResponse {
  id: number;
  form_id: number;
  user_id: number | null;
  ip_address: string | null;
  user_agent: string | null;
  respondent_email: string | null;
  completion_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface FormAnswer {
  id: number;
  form_response_id: number;
  form_element_id: number;
  value: string;
  created_at: string;
  updated_at: string;
  formElement?: {
    id: number;
    type: string;
    label: string;
    element_id: string;
  };
}

export interface FormResponseWithAnswers extends FormResponse {
  answers: FormAnswer[];
}

export interface FormResponsesResponse {
  data: FormResponse[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
