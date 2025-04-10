
import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionType } from '@/types/formBuilder';

const Documentation = () => {
  // List of all form element types
  const elementTypes: { type: QuestionType; description: string }[] = [
    { type: 'text', description: 'Single line text input for short answers' },
    { type: 'paragraph', description: 'Multi-line text area for longer responses' },
    { type: 'number', description: 'Input that only accepts numerical values' },
    { type: 'email', description: 'Input specifically for email addresses with optional confirmation field' },
    { type: 'dropdown', description: 'Dropdown selection with customizable options' },
    { type: 'radio', description: 'Radio button selection for single-choice questions' },
    { type: 'checkbox', description: 'Checkbox options for multiple-choice questions' },
    { type: 'date', description: 'Date picker for selecting calendar dates' },
    { type: 'face', description: 'Emoji face rating scale for feedback' },
    { type: 'star', description: 'Star rating scale with customizable number of stars' },
    { type: 'phone', description: 'Phone number input with country code selection' },
    { type: 'address', description: 'Address fields collection with customizable components' },
    { type: 'section', description: 'Section header to organize form into logical groups' },
    { type: 'break', description: 'Page break to split the form into multiple pages' },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">FormFlow Alchemy Documentation</h1>
        <Link to="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
          Back to Builder
        </Link>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-700 mb-4">
          FormFlow Alchemy is a powerful form building tool that allows you to create customized forms
          with various question types, conditional logic, and styling options. This documentation
          provides a comprehensive guide to all available features and properties.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Key Features:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Drag and drop form builder interface</li>
            <li>Multiple question types including text, email, address, etc.</li>
            <li>Conditional logic to show/hide fields based on responses</li>
            <li>Email confirmation field option</li>
            <li>Form preview functionality</li>
            <li>Form saving and loading capability</li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Form Element Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {elementTypes.map((element) => (
            <div 
              key={element.type} 
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <h3 className="font-medium text-lg text-primary mb-2">{element.type.charAt(0).toUpperCase() + element.type.slice(1)}</h3>
              <p className="text-gray-600">{element.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Form Builder Architecture</h3>
          
          {/* Simple ASCII diagram of the system architecture */}
          <pre className="bg-gray-50 p-4 rounded text-xs md:text-sm overflow-x-auto">
{`
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│  FormBuilderContext     │◄─────┤  FormBuilder Components │
│  - Form State           │      │  - DragDrop             │
│  - Active Element       │      │  - SidePanel            │
│  - Element Operations   │      │  - FormTitle            │
│                         │      │  - FormElement          │
└─────────────┬───────────┘      └─────────────────────────┘
              │
              ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│  Form Element Types     │◄─────┤  Element Editor         │
│  - Text, Email, etc.    │      │  - Element Properties   │
│  - Configuration        │      │  - Conditional Logic    │
│  - Validation           │      │                         │
│                         │      │                         │
└─────────────────────────┘      └─────────────────────────┘

┌─────────────────────────┐      
│                         │      
│  FormPreviewDialog      │      
│  - Form Rendering       │      
│  - Response Collection  │      
│  - Validation           │      
│                         │      
└─────────────────────────┘      
`}
          </pre>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Element Properties</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border p-2 text-left">Property</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Applicable To</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border p-2 font-medium">Label</td>
                <td className="border p-2">The question or prompt text shown to users</td>
                <td className="border p-2">All elements</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Required</td>
                <td className="border p-2">Whether the field must be filled before submission</td>
                <td className="border p-2">All input elements</td>
              </tr>
              <tr className="bg-white">
                <td className="border p-2 font-medium">Placeholder</td>
                <td className="border p-2">Example or hint text shown in empty fields</td>
                <td className="border p-2">Text, Paragraph, Email, Number, Phone</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Options</td>
                <td className="border p-2">List of choices for selection elements</td>
                <td className="border p-2">Dropdown, Radio, Checkbox</td>
              </tr>
              <tr className="bg-white">
                <td className="border p-2 font-medium">Max Stars</td>
                <td className="border p-2">Maximum number of stars in the rating</td>
                <td className="border p-2">Star element</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Confirm Email</td>
                <td className="border p-2">Adds a confirmation field to verify email input</td>
                <td className="border p-2">Email element</td>
              </tr>
              <tr className="bg-white">
                <td className="border p-2 font-medium">Fields</td>
                <td className="border p-2">Which address components to include</td>
                <td className="border p-2">Address element</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Allowed Countries</td>
                <td className="border p-2">Country restrictions for phone/address</td>
                <td className="border p-2">Phone, Address elements</td>
              </tr>
              <tr className="bg-white">
                <td className="border p-2 font-medium">Conditional Logic</td>
                <td className="border p-2">Rules for showing/hiding elements based on other responses</td>
                <td className="border p-2">All elements</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Updates</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-medium">Email Confirmation Feature</h3>
            <p className="text-sm text-gray-700">
              Added functionality to create a confirmation field for email inputs, ensuring users
              correctly input their email address by typing it twice.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t text-center text-gray-500 text-sm">
        <p>FormFlow Alchemy Documentation - Last updated {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
};

export default Documentation;
