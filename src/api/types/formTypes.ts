export interface Form {
  id: number;
  user_id: number | null;
  title: string;
  description: string | null;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  form_elements?: FormElement[];
}

export interface FormElement {
  id: number;
  form_id: number;
  question: string;
  type: string;
  options: string[] | null;
  required: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface FormStatus {
  DRAFT: string;
  PUBLISHED: string;
  ARCHIVED: string;
}

export interface QuestionType {
  id: number;
  name: string;
  slug: string;
}

export interface FormResponse {
  id: number;
  form_id: number;
  user_id: number | null;
  respondent_email?: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export interface FormAnswer {
  id: number;
  form_response_id: number;
  form_element_id: number;
  answer: string;
  question?: string;
}

export interface FormResponseWithAnswers extends FormResponse {
  answers: FormAnswer[];
  form?: Form;
}
