
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">FormFlow Alchemy Documentation</h1>
      
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Database Schema</h2>
        <p className="mb-4">
          FormFlow Alchemy uses a normalized relational database structure to store forms, 
          elements, responses, and related data.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Database Tables</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium">forms</h4>
            <p className="text-sm text-muted-foreground mb-2">Stores the main form information</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>title</strong> - The form title</li>
              <li><strong>description</strong> - The form description (nullable)</li>
              <li><strong>user_id</strong> - Foreign key to users table</li>
              <li><strong>is_published</strong> - Boolean flag for publish status</li>
              <li><strong>slug</strong> - Unique URL identifier</li>
              <li><strong>theme</strong> - Form theme name</li>
              <li><strong>collect_email</strong> - Whether to collect respondent email</li>
              <li><strong>one_response_per_user</strong> - Limit one response per user</li>
              <li><strong>show_progress_bar</strong> - Display progress bar option</li>
              <li><strong>shuffle_questions</strong> - Randomize questions option</li>
              <li><strong>created_at, updated_at, deleted_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">question_types</h4>
            <p className="text-sm text-muted-foreground mb-2">Defines the available question/element types</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>slug</strong> - Unique identifier (e.g., 'text', 'radio')</li>
              <li><strong>name</strong> - Display name</li>
              <li><strong>category</strong> - Grouping category</li>
              <li><strong>description</strong> - Explanation of the type</li>
              <li><strong>default_properties</strong> - JSON of default properties</li>
              <li><strong>is_active</strong> - Whether type is available</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">form_elements</h4>
            <p className="text-sm text-muted-foreground mb-2">Stores the individual form questions and elements</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>form_id</strong> - Foreign key to forms table</li>
              <li><strong>element_id</strong> - UUID from frontend</li>
              <li><strong>type</strong> - References question_types.slug</li>
              <li><strong>label</strong> - Question/section label</li>
              <li><strong>placeholder</strong> - Placeholder text</li>
              <li><strong>default_value</strong> - Default answer</li>
              <li><strong>required</strong> - Whether answer is required</li>
              <li><strong>order</strong> - Display order</li>
              <li><strong>confirm_email</strong> - For email confirmation</li>
              <li><strong>max_stars</strong> - For star rating</li>
              <li><strong>address_*</strong> - Address field options</li>
              <li><strong>default_country</strong> - For phone/address</li>
              <li><strong>allowed_countries</strong> - JSON of allowed countries</li>
              <li><strong>description</strong> - For section elements</li>
              <li><strong>conditional_*</strong> - Conditional logic fields</li>
              <li><strong>properties</strong> - Additional type-specific properties</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">form_element_options</h4>
            <p className="text-sm text-muted-foreground mb-2">Stores options for elements like dropdowns, radio buttons</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>form_element_id</strong> - Foreign key to form_elements</li>
              <li><strong>option_id</strong> - UUID from frontend</li>
              <li><strong>label</strong> - Display label</li>
              <li><strong>value</strong> - Option value</li>
              <li><strong>order</strong> - Display order</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">conditional_rules</h4>
            <p className="text-sm text-muted-foreground mb-2">Defines conditional logic rules for element visibility</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>form_element_id</strong> - Foreign key to form_elements</li>
              <li><strong>question_id</strong> - Element ID this condition depends on</li>
              <li><strong>operator</strong> - Logic operator (equals, contains, etc.)</li>
              <li><strong>value</strong> - Value to compare against</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">form_responses</h4>
            <p className="text-sm text-muted-foreground mb-2">Stores form submission metadata</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>form_id</strong> - Foreign key to forms</li>
              <li><strong>user_id</strong> - Foreign key to users (nullable)</li>
              <li><strong>ip_address</strong> - Respondent IP address</li>
              <li><strong>user_agent</strong> - Browser/device information</li>
              <li><strong>respondent_email</strong> - Email if collected</li>
              <li><strong>completion_time</strong> - Time taken to complete (seconds)</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">form_answers</h4>
            <p className="text-sm text-muted-foreground mb-2">Stores individual question responses</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>form_response_id</strong> - Foreign key to form_responses</li>
              <li><strong>form_element_id</strong> - Foreign key to form_elements</li>
              <li><strong>value</strong> - Answer content</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium">form_response_analytics</h4>
            <p className="text-sm text-muted-foreground mb-2">Aggregated analytics data</p>
            <ul className="list-disc pl-5 text-sm">
              <li><strong>id</strong> (primary key)</li>
              <li><strong>form_id</strong> - Foreign key to forms</li>
              <li><strong>element_id</strong> - Element identifier</li>
              <li><strong>answer_value</strong> - Answer value</li>
              <li><strong>count</strong> - Number of occurrences</li>
              <li><strong>created_at, updated_at</strong> - Timestamps</li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8 mb-4">Entity Relationship Diagram</h3>
        <div className="border rounded p-4 bg-slate-50 overflow-auto">
          <pre className="text-xs">
{`
+----------------+       +------------------+       +-------------------+
|     forms      |       |  form_elements   |       | form_element_opts |
+----------------+       +------------------+       +-------------------+
| id             |<------| form_id          |       | id                |
| title          |       | element_id       |<------| form_element_id   |
| description    |       | type             |       | option_id         |
| user_id        |       | label            |       | label             |
| is_published   |       | placeholder      |       | value             |
| slug           |       | required         |       | order             |
| theme          |       | order            |       +-------------------+
| collect_email  |       | ...              |
| ...            |       +------------------+
+----------------+               |                  +-------------------+
       |                         |                  | conditional_rules |
       |                         +------------------>-------------------+
       |                                            | id                |
       |                                            | form_element_id   |
       |                                            | question_id       |
       |                                            | operator          |
       |                                            | value             |
       |                                            +-------------------+
       |
       |           +------------------+
       |           |  form_responses  |
       +----------->------------------+       +-------------------+
                   | id               |       |   form_answers    |
                   | form_id          |       +-------------------+
                   | user_id          |<------| form_response_id  |
                   | ip_address       |       | form_element_id   |
                   | user_agent       |       | value             |
                   | respondent_email |       +-------------------+
                   | completion_time  |
                   +------------------+
                           
                           
+------------------+
|  question_types  |
+------------------+
| id               |
| slug             |<-----+
| name             |      |
| category         |      | References
| description      |      |
| default_props    |      |
| is_active        |      |
+------------------+      |
                          |
                    +------------------+
                    |  form_elements   |
                    +------------------+
                    | ...              |
                    | type             |-----+
                    | ...              |
                    +------------------+
`}
          </pre>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-4">Public Endpoints</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium">GET /api/forms/{'{slug}'}</h4>
            <p className="text-sm text-muted-foreground mb-2">Retrieves a published form by its slug</p>
            <p className="text-sm mb-1"><strong>URL Parameters:</strong></p>
            <ul className="list-disc pl-5 text-sm mb-3">
              <li><strong>slug</strong> - The form's unique slug identifier</li>
            </ul>
            <p className="text-sm mb-1"><strong>Response:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`{
  "id": 1,
  "title": "Customer Feedback",
  "description": "Please share your thoughts about our service",
  "slug": "customer-feedback-abc123",
  "theme": "default",
  "collect_email": true,
  "show_progress_bar": true,
  "shuffle_questions": false,
  "elements": [
    {
      "id": 1,
      "element_id": "uuid-string",
      "type": "text",
      "label": "Your Name",
      "placeholder": "Enter your full name",
      "required": true,
      "order": 0,
      "conditional_logic_enabled": false,
      "options": []
    },
    {
      "id": 2,
      "element_id": "uuid-string",
      "type": "radio",
      "label": "How satisfied are you?",
      "required": true,
      "order": 1,
      "conditional_logic_enabled": false,
      "options": [
        {
          "id": 1,
          "option_id": "uuid-string",
          "label": "Very Satisfied",
          "value": "very_satisfied",
          "order": 0
        },
        {
          "id": 2,
          "option_id": "uuid-string",
          "label": "Satisfied",
          "value": "satisfied",
          "order": 1
        }
      ]
    }
  ]
}`}
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium">POST /api/forms/{'{slug}'}/responses</h4>
            <p className="text-sm text-muted-foreground mb-2">Submits a response to a form</p>
            <p className="text-sm mb-1"><strong>URL Parameters:</strong></p>
            <ul className="list-disc pl-5 text-sm mb-3">
              <li><strong>slug</strong> - The form's unique slug identifier</li>
            </ul>
            <p className="text-sm mb-1"><strong>Request Body:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`{
  "user_id": 1,            // Optional, for authenticated users
  "respondent_email": "user@example.com",  // Optional, based on form settings
  "ip_address": "127.0.0.1",               // Optional, auto-captured
  "user_agent": "Mozilla/5.0...",          // Optional, auto-captured
  "start_time": 1617234567,                // Optional, timestamp when form started
  "answers": [
    {
      "element_id": "uuid-string",         // Frontend UUID of the element
      "value": "John Doe"                  // String value of the answer
    },
    {
      "element_id": "uuid-string",
      "value": "very_satisfied"
    }
  ]
}`}
            </pre>
            <p className="text-sm mb-1"><strong>Response:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`{
  "id": 1,
  "form_id": 1,
  "user_id": null,
  "respondent_email": "user@example.com",
  "ip_address": "127.0.0.1",
  "completion_time": 45,
  "created_at": "2025-04-10T12:34:56.000000Z",
  "updated_at": "2025-04-10T12:34:56.000000Z"
}`}
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium">GET /api/question-types</h4>
            <p className="text-sm text-muted-foreground mb-2">Retrieves all active question types</p>
            <p className="text-sm mb-1"><strong>Response:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`[
  {
    "id": 1,
    "slug": "text",
    "name": "Text Input",
    "category": "Basic Fields",
    "description": "Single line text input for short text",
    "default_properties": null,
    "is_active": true
  },
  {
    "id": 2,
    "slug": "paragraph",
    "name": "Paragraph Text",
    "category": "Basic Fields",
    "description": "Multi-line text input for longer responses",
    "default_properties": null,
    "is_active": true
  }
]`}
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium">GET /api/question-types/by-category</h4>
            <p className="text-sm text-muted-foreground mb-2">Retrieves question types grouped by category</p>
            <p className="text-sm mb-1"><strong>Response:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`{
  "Basic Fields": [
    {
      "id": 1,
      "slug": "text",
      "name": "Text Input",
      "description": "Single line text input for short text",
      "default_properties": null,
      "is_active": true
    },
    {
      "id": 2,
      "slug": "paragraph",
      "name": "Paragraph Text",
      "description": "Multi-line text input for longer responses",
      "default_properties": null,
      "is_active": true
    }
  ],
  "Choice Fields": [
    {
      "id": 5,
      "slug": "dropdown",
      "name": "Dropdown",
      "description": "Select field with predefined options",
      "default_properties": null,
      "is_active": true
    }
  ]
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4">Protected Endpoints</h3>
        <p className="mb-4 text-sm">All protected endpoints require authentication using a Bearer token.</p>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium">POST /api/forms</h4>
            <p className="text-sm text-muted-foreground mb-2">Creates a new form</p>
            <p className="text-sm mb-1"><strong>Request Body:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`{
  "title": "Customer Survey",
  "description": "Annual customer satisfaction survey",
  "slug": "customer-survey-2025",   // Optional, auto-generated if not provided
  "theme": "default",               // Optional
  "collect_email": true,            // Optional
  "one_response_per_user": false,   // Optional
  "show_progress_bar": true,        // Optional
  "shuffle_questions": false        // Optional
}`}
            </pre>
          </div>

          <div>
            <h4 className="text-lg font-medium">GET /api/forms</h4>
            <p className="text-sm text-muted-foreground mb-2">Lists all forms owned by the authenticated user</p>
            <p className="text-sm mb-1"><strong>Query Parameters:</strong></p>
            <ul className="list-disc pl-5 text-sm mb-3">
              <li><strong>search</strong> - Filter by title</li>
              <li><strong>sort</strong> - Field to sort by</li>
              <li><strong>order</strong> - Sort direction (asc/desc)</li>
              <li><strong>per_page</strong> - Items per page</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium">POST /api/forms/{'{form}'}/elements</h4>
            <p className="text-sm text-muted-foreground mb-2">Adds a new element to a form</p>
            <p className="text-sm mb-1"><strong>URL Parameters:</strong></p>
            <ul className="list-disc pl-5 text-sm mb-3">
              <li><strong>form</strong> - Form ID</li>
            </ul>
            <p className="text-sm mb-1"><strong>Request Body:</strong></p>
            <pre className="text-xs bg-slate-100 p-2 rounded">
{`{
  "element_id": "uuid-string",       // Frontend UUID
  "type": "text",                    // Question type slug
  "label": "First Name",
  "placeholder": "Enter your first name",
  "default_value": "",               // Optional
  "required": true,                  // Optional
  "order": 0,                        // Optional
  
  // Optional type-specific fields
  "confirm_email": false,            // For email type
  "max_stars": 5,                    // For star rating
  "address_expanded": true,          // For address
  "address_street1": true,           // For address
  "address_street2": true,           // For address
  "address_city": true,              // For address
  "address_state": true,             // For address
  "address_zipcode": true,           // For address
  "address_country": true,           // For address
  "default_country": "US",           // For phone/address
  "allowed_countries": ["US","CA"],  // For phone/address
  "description": "Section details",  // For section type
  
  // Conditional logic
  "conditional_logic_enabled": false,
  "conditional_action": "show",      // "show" or "hide"
  "conditional_logic_gate": "all",   // "all" or "any"
  
  // Optional properties
  "properties": {},                  // Additional properties as JSON
  
  // Options for dropdown, radio, checkbox
  "options": [
    {
      "option_id": "uuid-string",    // Frontend UUID
      "label": "Option 1",
      "value": "option_1",
      "order": 0
    },
    {
      "option_id": "uuid-string",
      "label": "Option 2",
      "value": "option_2",
      "order": 1
    }
  ],
  
  // Conditional rules
  "conditional_rules": [
    {
      "question_id": "other-element-uuid",
      "operator": "equals",          // equals, not_equals, contains, etc.
      "value": "some value"
    }
  ]
}`}
            </pre>
          </div>

          <div className="text-sm mt-4 text-muted-foreground">
            <p>Additional endpoints include:</p>
            <ul className="list-disc pl-5 mb-2">
              <li>GET /api/forms/{'{form}'}</li>
              <li>PUT /api/forms/{'{form}'}</li>
              <li>DELETE /api/forms/{'{form}'}</li>
              <li>GET /api/forms/{'{form}'}/elements</li>
              <li>GET /api/forms/{'{form}'}/elements/{'{element}'}</li>
              <li>PUT /api/forms/{'{form}'}/elements/{'{element}'}</li>
              <li>DELETE /api/forms/{'{form}'}/elements/{'{element}'}</li>
              <li>POST /api/forms/{'{form}'}/elements/reorder</li>
              <li>POST /api/forms/{'{form}'}/toggle-publish</li>
              <li>GET /api/forms/{'{form}'}/analytics</li>
              <li>GET /api/forms/{'{form}'}/responses</li>
              <li>GET /api/forms/{'{form}'}/responses/{'{response}'}</li>
              <li>GET /api/forms/{'{form}'}/responses/export</li>
              <li>GET /api/forms/{'{form}'}/responses/statistics</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Documentation;
