
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormElement, QuestionType } from '@/api/types/formTypes';

// Define context types
interface FormBuilderContextType {
  form: Form | null;
  activeElement: string | null;
  updateForm: (formData: Form) => void;
  setActiveElement: (elementId: string | null) => void;
  addElement: (type: QuestionType) => void;
  updateElement: (elementId: string, updates: Partial<FormElement>) => void;
  removeElement: (elementId: string) => void;
  moveElement: (dragId: string, hoverId: string) => void;
}

// Create the context
const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

// Provider component
export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  // Update the entire form
  const updateForm = (formData: Form) => {
    setForm(formData);
  };

  // Add a new element
  const addElement = (type: QuestionType) => {
    if (!form) return;

    const newElementId = uuidv4();
    
    // Create basic element with defaults
    const newElement: FormElement = {
      id: newElementId,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Question`,
      required: false,
    };
    
    // Add appropriate defaults based on element type
    if (['text', 'paragraph', 'email', 'number'].includes(type)) {
      newElement.placeholder = '';
      newElement.defaultValue = '';
    }
    
    // Add options for select/choice type elements
    if (['dropdown', 'radio', 'checkbox'].includes(type)) {
      newElement.options = [
        { id: uuidv4(), label: 'Option 1', value: 'option_1' },
        { id: uuidv4(), label: 'Option 2', value: 'option_2' }
      ];
    }
    
    // Add email confirmation for email type
    if (type === 'email') {
      newElement.confirmEmail = false;
    }
    
    // Add rating options
    if (type === 'star') {
      newElement.maxStars = 5;
    }
    
    // Add section description
    if (type === 'section') {
      newElement.description = '';
    }
    
    // Add address fields configuration
    if (type === 'address') {
      (newElement as any).expanded = true;
      (newElement as any).fields = {
        street1: true,
        street2: true,
        city: true,
        state: true,
        zipCode: true,
        country: true
      };
      (newElement as any).allowedCountries = ['US', 'CA'];
    }
    
    // Add phone configuration
    if (type === 'phone') {
      (newElement as any).defaultCountry = 'US';
      (newElement as any).allowedCountries = ['US', 'CA'];
    }

    // Add conditional logic
    newElement.conditionalLogic = {
      enabled: false,
      action: 'show',
      conditions: [],
      logicGate: 'all'
    };

    // Update the form with the new element
    setForm(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        elements: [...prev.elements, newElement]
      };
    });
    
    // Set the new element as active
    setActiveElement(newElementId);
  };

  // Update an existing element
  const updateElement = (elementId: string, updates: Partial<FormElement>) => {
    if (!form) return;
    
    setForm(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        elements: prev.elements.map(el => 
          el.id === elementId ? { ...el, ...updates } : el
        )
      };
    });
  };

  // Remove an element
  const removeElement = (elementId: string) => {
    if (!form) return;
    
    // If the active element is being removed, clear the selection
    if (activeElement === elementId) {
      setActiveElement(null);
    }
    
    setForm(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        elements: prev.elements.filter(el => el.id !== elementId)
      };
    });
  };

  // Move an element (reorder)
  const moveElement = (dragId: string, hoverId: string) => {
    if (!form) return;
    
    setForm(prev => {
      if (!prev) return prev;
      
      const dragIndex = prev.elements.findIndex(el => el.id === dragId);
      const hoverIndex = prev.elements.findIndex(el => el.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return prev;
      
      const newElements = [...prev.elements];
      const dragElement = newElements[dragIndex];
      
      // Remove the dragged element
      newElements.splice(dragIndex, 1);
      // Insert it at the new position
      newElements.splice(hoverIndex, 0, dragElement);
      
      return {
        ...prev,
        elements: newElements
      };
    });
  };

  const value = {
    form,
    activeElement,
    updateForm,
    setActiveElement,
    addElement,
    updateElement,
    removeElement,
    moveElement
  };

  return (
    <FormBuilderContext.Provider value={value}>
      {children}
    </FormBuilderContext.Provider>
  );
};

// Custom hook to use the context
export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};
