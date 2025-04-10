import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const Documentation = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">FormFlow Alchemy Documentation</h1>
        <p className="text-muted-foreground">
          Complete documentation for the FormFlow Alchemy form builder application
        </p>

        <ScrollArea className="h-[calc(100vh-150px)] pr-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="elements">Elements</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>FormFlow Alchemy Overview</CardTitle>
                  <CardDescription>
                    A powerful form building solution for creating dynamic and interactive forms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    FormFlow Alchemy is a drag-and-drop form builder that allows you to create custom forms with various element types. You can add, remove, and reorder elements, customize their properties, and set conditional logic to show or hide elements based on user input.
                  </p>

                  <h3 className="text-lg font-medium">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Drag-and-drop interface for easy form building</li>
                    <li>Multiple element types for various data collection needs</li>
                    <li>Conditional logic to create dynamic, interactive forms</li>
                    <li>Form preview to test the user experience</li>
                    <li>Save forms to local storage for later use</li>
                  </ul>

                  <h3 className="text-lg font-medium">Getting Started</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Click on the elements in the side panel to add them to your form</li>
                    <li>Drag and drop elements to reorder them</li>
                    <li>Click on an element to edit its properties</li>
                    <li>Set conditional logic to create dynamic forms</li>
                    <li>Preview your form to test the user experience</li>
                    <li>Save your form when you're done</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="elements">
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>
                    Available element types in the FormFlow Alchemy form builder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of available form elements</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Element Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Text</TableCell>
                        <TableCell>Basic Fields</TableCell>
                        <TableCell>Single line text input for short text</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Paragraph</TableCell>
                        <TableCell>Basic Fields</TableCell>
                        <TableCell>Multi-line text input for longer responses</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Number</TableCell>
                        <TableCell>Basic Fields</TableCell>
                        <TableCell>Input field that accepts only numerical values</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Email</TableCell>
                        <TableCell>Basic Fields</TableCell>
                        <TableCell>Input field for collecting email addresses</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Phone</TableCell>
                        <TableCell>Basic Fields</TableCell>
                        <TableCell>Input field for collecting phone numbers</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Address</TableCell>
                        <TableCell>Basic Fields</TableCell>
                        <TableCell>Input fields for collecting physical addresses</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Dropdown</TableCell>
                        <TableCell>Choice Fields</TableCell>
                        <TableCell>Select field with predefined options</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Multiple Choice</TableCell>
                        <TableCell>Choice Fields</TableCell>
                        <TableCell>Radio buttons for selecting one option from many</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Checkboxes</TableCell>
                        <TableCell>Choice Fields</TableCell>
                        <TableCell>Checkbox fields for selecting multiple options</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Date</TableCell>
                        <TableCell>Choice Fields</TableCell>
                        <TableCell>Date picker for selecting dates</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Star Rating</TableCell>
                        <TableCell>Rating Fields</TableCell>
                        <TableCell>Star-based rating selection</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Face Rating</TableCell>
                        <TableCell>Rating Fields</TableCell>
                        <TableCell>Emoji-based satisfaction rating</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Section</TableCell>
                        <TableCell>Layout Elements</TableCell>
                        <TableCell>Section header for organizing elements</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Page Break</TableCell>
                        <TableCell>Layout Elements</TableCell>
                        <TableCell>Creates a new page in multi-page forms</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="architecture">
              <Card>
                <CardHeader>
                  <CardTitle>System Architecture</CardTitle>
                  <CardDescription>
                    Understanding the architectural components of FormFlow Alchemy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Component Structure</h3>
                  <pre className="p-4 bg-muted rounded-md overflow-x-auto">
{`FormBuilder (Container)
├── FormTitle (Form title editor)
├── DragDrop (Drag and drop interface)
│   └── FormElement (Individual form elements)
├── SidePanel (Element selection and properties)
│   └── ElementEditor (Edit element properties)
│       └── ElementConditions (Conditional logic)
└── FormPreviewDialog (Form preview modal)`}
                  </pre>

                  <h3 className="text-lg font-medium">Data Flow</h3>
                  <p className="mb-4">FormFlow Alchemy uses the Context API for state management, with the following data flow:</p>
                  
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md bg-muted/30">
                      <p><strong>1. User Interaction</strong> - User interacts with the UI elements</p>
                    </div>
                    <div className="p-3 border rounded-md bg-muted/30">
                      <p><strong>2. Context Updates</strong> - UI components trigger context updates</p>
                    </div>
                    <div className="p-3 border rounded-md bg-muted/30">
                      <p><strong>3. State Changes</strong> - Context provider updates state based on actions</p>
                    </div>
                    <div className="p-3 border rounded-md bg-muted/30">
                      <p><strong>4. Re-rendering</strong> - Components re-render with updated state</p>
                    </div>
                    <div className="p-3 border rounded-md bg-muted/30">
                      <p><strong>5. Storage</strong> - Form data is saved to local storage when requested</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium">Technologies Used</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>React - Frontend UI library</li>
                    <li>TypeScript - Type safety and code quality</li>
                    <li>React DnD - Drag and drop functionality</li>
                    <li>React Router - Navigation between pages</li>
                    <li>TailwindCSS - Styling and UI components</li>
                    <li>shadcn/ui - UI component library based on Radix UI</li>
                    <li>LocalStorage - Persistent storage for form data</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="properties">
              <Card>
                <CardHeader>
                  <CardTitle>Element Properties</CardTitle>
                  <CardDescription>
                    Configurable properties for each form element
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Common Properties</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Applicable Elements</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Label</TableCell>
                            <TableCell>The text label for the element</TableCell>
                            <TableCell>All elements</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Required</TableCell>
                            <TableCell>Whether the field is mandatory</TableCell>
                            <TableCell>Input elements</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Help Text</TableCell>
                            <TableCell>Additional information for users</TableCell>
                            <TableCell>All elements</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Default Value</TableCell>
                            <TableCell>Initial value for the field</TableCell>
                            <TableCell>Input elements</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Placeholder</TableCell>
                            <TableCell>Example text displayed when empty</TableCell>
                            <TableCell>Text inputs</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Conditional Logic</h3>
                      <p className="mb-4">
                        Conditional logic allows you to show or hide elements based on user input to create dynamic forms.
                      </p>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Action</TableCell>
                            <TableCell>Whether to show or hide the element when conditions are met</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Logic Gate</TableCell>
                            <TableCell>Whether all conditions must be met (AND) or any condition (OR)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Question</TableCell>
                            <TableCell>The element whose value will trigger the condition</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Operator</TableCell>
                            <TableCell>How to compare values (equals, not equals, contains, etc.)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Value</TableCell>
                            <TableCell>The value to compare against</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Input Validation</h3>
                      <p className="mb-4">
                        Certain elements can have validation rules to ensure data quality.
                      </p>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Element</TableHead>
                            <TableHead>Available Validations</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Text</TableCell>
                            <TableCell>Min/max length, pattern matching</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Paragraph</TableCell>
                            <TableCell>Min/max length, word count</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Number</TableCell>
                            <TableCell>Min/max value, step size</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Email</TableCell>
                            <TableCell>Email format validation</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Phone</TableCell>
                            <TableCell>Phone number format validation</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Database Schema Proposals</CardTitle>
                  <CardDescription>
                    Two different approaches to implementing the backend database for FormFlow Alchemy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="normalized" className="mt-4">
                    <TabsList>
                      <TabsTrigger value="normalized">Proposal 1: Normalized Schema</TabsTrigger>
                      <TabsTrigger value="normalizedWithTypes">Proposal 1b: With Question Types</TabsTrigger>
                      <TabsTrigger value="document">Proposal 2: Document-Oriented Schema</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="normalized" className="space-y-6 mt-4">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Normalized Database Schema</h3>
                        <p className="mb-4">
                          This approach uses a fully normalized relational database structure with separate tables for forms, elements, options, conditions, and responses.
                        </p>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-md font-medium mb-2">Entity Relationship Diagram</h4>
                            <div className="p-4 border rounded-md bg-muted overflow-auto">
                              <pre className="whitespace-pre text-xs">
{`+----------------+     +------------------+     +---------------------+
|     users      |     |      forms       |     |    form_elements    |
+----------------+     +------------------+     +---------------------+
| id             |<--->| id               |<--->| id                  |
| name           |     | title            |     | form_id             |
| email          |     | description      |     | element_id          |
| password       |     | user_id          |     | type                |
| ...            |     | is_published     |     | label               |
+----------------+     | slug             |     | placeholder         |
                       | theme            |     | default_value       |
                       | collect_email    |     | required            |
                       | ...              |     | order               |
                       +------------------+     | conditional_logic_* |
                              |                 +---------------------+
                              |                           |
                              |                           v
+----------------------+      |             +------------------------+
|   form_responses     |<-----+             | form_element_options  |
+----------------------+      |             +------------------------+
| id                   |      |             | id                     |
| form_id              |      |             | form_element_id        |
| user_id              |      |             | option_id              |
| ip_address           |      |             | label                  |
| user_agent           |      |             | value                  |
| respondent_email     |      |             | order                  |
| completion_time      |      |             +------------------------+
+----------------------+      |                         |
         |                    |                         |
         v                    |                         |
+--------------------+        |             +-----------------------+
|   form_answers     |        |             |   conditional_rules   |
+--------------------+        |             +-----------------------+
| id                 |        |             | id                    |
| form_response_id   |        +------------>| form_element_id       |
| form_element_id    |                      | question_id           |
| value              |                      | operator              |
+--------------------+                      | value                 |
                                            +-----------------------+`}
                              </pre>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">forms</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>title</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Form title</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>description</TableCell>
                                  <TableCell>text</TableCell>
                                  <TableCell>Form description</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>user_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Owner of the form</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>is_published</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Whether the form is public</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>slug</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>URL-friendly identifier</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>theme</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Visual theme of the form</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>collect_email</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Whether to collect respondent emails</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>one_response_per_user</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Limit responses to one per user</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>show_progress_bar</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Show progress in multi-page forms</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>shuffle_questions</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Randomize question order</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">form_elements</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>form_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Form this element belongs to</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>element_id</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>UUID from frontend</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>type</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Reference to question_types.slug</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>properties</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>Type-specific properties</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Other Tables</h4>
                            <ul className="list-disc pl-6 space-y-2">
                              <li><strong>form_element_options</strong> - Stores options for dropdown, checkbox, and radio elements</li>
                              <li><strong>conditional_rules</strong> - Stores conditions for showing/hiding elements</li>
                              <li><strong>form_responses</strong> - Stores form submission metadata</li>
                              <li><strong>form_answers</strong> - Stores individual question answers</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Advantages</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Fully normalized structure reduces data redundancy</li>
                              <li>Clear separation of concerns between different data entities</li>
                              <li>Efficient querying for specific elements or responses</li>
                              <li>Simple relationship management between entities</li>
                              <li>Better suited for complex data analysis and reporting</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Disadvantages</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>More complex schema with multiple tables to manage</li>
                              <li>Requires more joins for retrieving complete form data</li>
                              <li>Less flexible for handling varying element properties</li>
                              <li>May require schema changes when adding new element types</li>
                              <li>More overhead when syncing with frontend data model</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="normalizedWithTypes" className="space-y-6 mt-4">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Normalized Database Schema with Question Types</h3>
                        <p className="mb-4">
                          This approach builds on the normalized structure but adds a separate table for question types, adding more flexibility to manage different input types.
                        </p>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-md font-medium mb-2">Entity Relationship Diagram</h4>
                            <div className="p-4 border rounded-md bg-muted overflow-auto">
                              <pre className="whitespace-pre text-xs">
{`+----------------+     +------------------+     +---------------------+     +------------------+
|     users      |     |      forms       |     |    form_elements    |     |  question_types  |
+----------------+     +------------------+     +---------------------+     +------------------+
| id             |<--->| id               |<--->| id                  |<--->| id               |
| name           |     | title            |     | form_id             |     | slug             |
| email          |     | description      |     | element_id          |     | name             |
| password       |     | user_id          |     | type                |     | category         |
| role           |     | is_published     |     | label               |     | description      |
| avatar         |     | slug             |     | placeholder         |     | default_properties|
| ...            |     | ...              |     | ...                 |     | is_active        |
+----------------+     +------------------+     +---------------------+     +------------------+
                              |                           |
                              |                           v
+----------------------+      |             +------------------------+
|   form_responses     |<-----+             | form_element_options  |
+----------------------+      |             +------------------------+
| id                   |      |             | id                     |
| form_id              |      |             | form_element_id        |
| user_id              |      |             | option_id              |
| ip_address           |      |             | label                  |
| user_agent           |      |             | value                  |
| respondent_email     |      |             | order                  |
| completion_time      |      |             +------------------------+
+----------------------+      |                         |
         |                    |                         |
         v                    |                         |
+--------------------+        |             +-----------------------+
|   form_answers     |        |             |   conditional_rules   |
+--------------------+        |             +-----------------------+
| id                 |        |             | id                    |
| form_response_id   |        +------------>| form_element_id       |
| form_element_id    |                      | question_id           |
| value              |                      | operator              |
+--------------------+                      | value                 |
                                            +-----------------------+`}
                              </pre>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">question_types</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>slug</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Unique identifier (e.g., 'text', 'dropdown')</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>name</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Display name (e.g., 'Text Input')</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>category</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Grouping (e.g., 'Basic Fields', 'Choice Fields')</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>description</TableCell>
                                  <TableCell>text</TableCell>
                                  <TableCell>Detailed description</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>default_properties</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>Default settings for this question type</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>is_active</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Whether this question type can be used</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">form_elements (modified)</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>form_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Form this element belongs to</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>element_id</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>UUID from frontend</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>type</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Reference to question_types.slug</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>properties</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>Type-specific properties</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">users (enhanced)</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>name</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>User's full name</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>email</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>User's email (unique)</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>role</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>User role (user, admin, etc.)</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>avatar</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Profile image path</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>preferences</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>User-specific settings</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>last_login_at</TableCell>
                                  <TableCell>timestamp</TableCell>
                                  <TableCell>Last login timestamp</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Advantages</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Centralized management of question types</li>
                              <li>Ability to enable/disable specific question types</li>
                              <li>Easier to add new question types without schema changes</li>
                              <li>Better organization of input types by category</li>
                              <li>Default properties can be defined at the type level</li>
                              <li>Improved user management with roles and preferences</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Disadvantages</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Slightly more complex schema with additional table</li>
                              <li>Need to synchronize question types with frontend code</li>
                              <li>May require additional logic to handle type-specific behavior</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="document" className="space-y-6 mt-4">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Document-Oriented Schema</h3>
                        <p className="mb-4">
                          This approach uses a more document-oriented structure with JSON fields to store complex data, requiring fewer tables but more complex data structures.
                        </p>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-md font-medium mb-2">Entity Relationship Diagram</h4>
                            <div className="p-4 border rounded-md bg-muted overflow-auto">
                              <pre className="whitespace-pre text-xs">
{`+----------------+       +---------------------+
|     users      |       |        forms        |
+----------------+       +---------------------+
| id             |<----->| id                  |
| name           |       | title               |
| email          |       | description         |
| password       |       | user_id             |
| ...            |       | settings (JSON)     |
+----------------+       | elements (JSON)     |
                         | is_published        |
                         | slug                |
                         +---------------------+
                                  |
          +-----------------------+---------------------+
          |                       |                     |
          v                       v                     v
+--------------------+  +--------------------+  +---------------------+
|   form_versions    |  |   form_responses   |  | form_response_analytics |
+--------------------+  +--------------------+  +---------------------+
| id                 |  | id                 |  | id                  |
| form_id            |  | form_id            |  | form_id             |
| version_name       |  | form_version_id    |  | element_id          |
| elements (JSON)    |  | user_id            |  | answer_value        |
| settings (JSON)    |  | answers (JSON)     |  | count               |
| is_active          |  | metadata (JSON)    |  +---------------------+
+--------------------+  +--------------------+`}
                              </pre>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">forms</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>title</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Form title</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>description</TableCell>
                                  <TableCell>text</TableCell>
                                  <TableCell>Form description</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>user_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Owner of the form</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>settings</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>Form settings as JSON</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>elements</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>All form elements as JSON</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>is_published</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Whether the form is public</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>slug</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>URL-friendly identifier</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">form_versions</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>form_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Form this version belongs to</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>version_name</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Name of this version</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>elements</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>All form elements as JSON</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>settings</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>Version-specific settings</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>is_active</TableCell>
                                  <TableCell>boolean</TableCell>
                                  <TableCell>Whether this is the active version</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">form_responses</h4>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>form_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Form this response belongs to</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>form_version_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Version of the form answered</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>user_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>User who submitted the form (optional)</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>answers</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>All form answers as JSON</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>metadata</TableCell>
                                  <TableCell>json</TableCell>
                                  <TableCell>Submission metadata</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">form_response_analytics</h4>
                            <p className="mb-2">Denormalized table for analytics purposes:</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Field</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>id</TableCell>
                                  <TableCell>bigint</TableCell>
                                  <TableCell>Primary key</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>form_id</TableCell>
                                  <TableCell>foreign key</TableCell>
                                  <TableCell>Form this analytics entry belongs to</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>element_id</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Specific form element ID</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>answer_value</TableCell>
                                  <TableCell>string</TableCell>
                                  <TableCell>Value that was selected/entered</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>count</TableCell>
                                  <TableCell>integer</TableCell>
                                  <TableCell>Number of times this answer was given</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Advantages</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>Simpler schema with fewer tables to manage</li>
                              <li>Perfect 1:1 mapping with frontend data model</li>
                              <li>Highly flexible for handling varying element properties</li>
                              <li>No schema changes needed when adding new element types</li>
                              <li>Efficient retrieval of complete form structure with minimal queries</li>
                              <li>Support for form versioning built into the schema</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-md font-medium mb-2">Disadvantages</h4>
                            <ul className="list-disc pl-6 space-y-1">
                              <li>More complex JSON operations for querying specific properties</li>
                              <li>Potential for data redundancy within JSON structures</li>
                              <li>Less efficient for focused queries on specific elements</li>
                              <li>May require additional analytics tables for efficient reporting</li>
                              <li>Indexing capabilities more limited within JSON data</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Documentation;
