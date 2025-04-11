
import { FormsResponse, FormResponsesResponse, FormResponseWithAnswers } from '../types/formTypes';

export function getMockForms(): FormsResponse {
  return {
    data: [
      {
        id: 1,
        title: "Customer Feedback Survey",
        description: "Collect feedback from customers about our services",
        slug: "customer-feedback-survey-abc123",
        is_published: true,
        created_at: "2025-03-15T14:22:18.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        responses_count: 24
      },
      {
        id: 2,
        title: "Employee Satisfaction Survey",
        description: "Annual employee satisfaction survey",
        slug: "employee-satisfaction-survey-def456",
        is_published: false,
        created_at: "2025-03-28T10:45:12.000000Z", 
        updated_at: "2025-03-28T10:45:12.000000Z",
        responses_count: 18
      },
      {
        id: 3,
        title: "Event Registration Form",
        description: "Registration for annual conference",
        slug: "event-registration-form-ghi789",
        is_published: true,
        created_at: "2025-04-05T16:30:22.000000Z",
        updated_at: "2025-04-06T11:20:15.000000Z",
        responses_count: 42
      }
    ],
    links: {
      first: "",
      last: "",
      prev: null,
      next: null
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "",
      per_page: 15,
      to: 3,
      total: 3
    }
  };
}

export function getMockResponses(formId: number): FormResponsesResponse {
  return {
    data: [
      {
        id: 1,
        form_id: formId,
        user_id: null,
        ip_address: "192.168.1.1",
        user_agent: "Mozilla/5.0",
        respondent_email: "test@example.com",
        completion_time: 145,
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z"
      },
      {
        id: 2,
        form_id: formId,
        user_id: 5,
        ip_address: "192.168.1.2",
        user_agent: "Chrome/100",
        respondent_email: "john@example.com",
        completion_time: 98,
        created_at: "2025-04-02T14:22:18.000000Z",
        updated_at: "2025-04-02T14:22:18.000000Z"
      },
      {
        id: 3,
        form_id: formId,
        user_id: null,
        ip_address: "192.168.1.3",
        user_agent: "Firefox/95",
        respondent_email: null,
        completion_time: 210,
        created_at: "2025-04-03T16:30:22.000000Z",
        updated_at: "2025-04-03T16:30:22.000000Z"
      }
    ],
    links: {
      first: "",
      last: "",
      prev: null,
      next: null
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "",
      per_page: 15,
      to: 3,
      total: 3
    }
  };
}

export function getMockResponseDetails(formId: number, responseId: number): FormResponseWithAnswers {
  return {
    id: responseId,
    form_id: formId,
    user_id: null,
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0",
    respondent_email: "test@example.com",
    completion_time: 145,
    created_at: "2025-04-01T09:15:43.000000Z",
    updated_at: "2025-04-01T09:15:43.000000Z",
    answers: [
      {
        id: 1,
        form_response_id: responseId,
        form_element_id: 1,
        value: "John Doe",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 1,
          type: "text",
          label: "Your Name",
          element_id: "element_1"
        }
      },
      {
        id: 2,
        form_response_id: responseId,
        form_element_id: 2,
        value: "test@example.com",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 2,
          type: "email",
          label: "Your Email",
          element_id: "element_2"
        }
      },
      {
        id: 3,
        form_response_id: responseId,
        form_element_id: 3,
        value: "Excellent",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 3,
          type: "radio",
          label: "How would you rate our service?",
          element_id: "element_3"
        }
      },
      {
        id: 4,
        form_response_id: responseId,
        form_element_id: 4,
        value: "The customer service was exceptional. I had a great experience.",
        created_at: "2025-04-01T09:15:43.000000Z",
        updated_at: "2025-04-01T09:15:43.000000Z",
        formElement: {
          id: 4,
          type: "textarea",
          label: "Any additional comments?",
          element_id: "element_4"
        }
      }
    ]
  };
}
