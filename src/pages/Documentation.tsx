
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
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Documentation;
