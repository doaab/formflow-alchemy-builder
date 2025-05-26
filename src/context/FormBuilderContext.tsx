
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormElementTypes, QuestionType, FormData, Condition } from '@/api/types/formTypes';

// Define context types
interface FormBuilderContextType {
  form: Form | null;
  formData: FormData;
  activeElement: string | null;
  isDragging: boolean;
  updateForm: (formData: Form) => void;
  setActiveElement: (elementId: string | null) => void;
  addElement: (type: QuestionType) => void;
  updateElement: (elementId: string, updates: Partial<FormElementTypes>) => void;
  updateFormTitle: (title: string) => void;
  updateFormDescription: (description: string) => void;
  removeElement: (elementId: string) => void;
  moveElement: (dragId: string, hoverId: string) => void;
  deleteElement: (elementId: string) => void;
  duplicateElement: (elementId: string) => void;
  setIsDragging: (dragging: boolean) => void;
  reorderElements: (dragIndex: number, hoverIndex: number) => void;
}

// Create the context
const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

// Provider component
export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form, setForm] = useState<Form | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  // Initialize formData with empty values
  const [formData, setFormData] = useState<FormData>({
    title: 'New Form',
    description: '',
    elements: []
  });

  // Update the entire form - memoized to prevent infinite re-renders
  const updateForm = useCallback((formData: Form) => {
    console.log('updateForm called with:', formData);
    setForm(formData);
    setFormData({
      title: formData.title || 'New Form',
      description: formData.description || '',
      elements: formData.elements || []
    });
  }, []);

  // Update form title - memoized
  const updateFormTitle = useCallback((title: string) => {
    setFormData(prev => ({
      ...prev,
      title
    }));
    setForm(prev => prev ? {
      ...prev,
      title
    } : prev);
  }, []);

  // Update form description - memoized
  const updateFormDescription = useCallback((description: string) => {
    setFormData(prev => ({
      ...prev,
      description
    }));
    setForm(prev => prev ? {
      ...prev,
      description
    } : prev);
  }, []);

  // Add a new element - memoized
  const addElement = useCallback((type: QuestionType) => {
    const newElementId = uuidv4();
    console.log('Adding element of type:', type, 'with ID:', newElementId);
    
    // Create basic element with defaults
    const newElement: FormElementTypes = {
      id: newElementId,
      type,
      label: `New ${type.toString().charAt(0).toUpperCase() + type.toString().slice(1)} Question`,
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
      newElement.expanded = true;
      newElement.fields = {
        street1: true,
        street2: true,
        city: true,
        state: true,
        zipCode: true,
        country: true
      };
      newElement.allowedCountries = ['US', 'CA'];
    }
    
    // Add phone configuration
    if (type === 'phone') {
      newElement.defaultCountry = 'US';
      newElement.allowedCountries = ['US', 'CA'];
    }

    // Add conditional logic
    newElement.conditionalLogic = {
      enabled: false,
      action: 'show',
      conditions: [],
      logicGate: 'all'
    };

    console.log('Created new element:', newElement);

    // Update the form with the new element
    setFormData(prev => {
      const updatedFormData = {
        ...prev,
        elements: [...prev.elements, newElement]
      };
      console.log('Updated formData:', updatedFormData);
      return updatedFormData;
    });
    
    setForm(prev => {
      if (!prev) return prev;
      const updatedForm = {
        ...prev,
        elements: [...(prev.elements || []), newElement]
      };
      console.log('Updated form:', updatedForm);
      return updatedForm;
    });
    
    // Set the new element as active
    setActiveElement(newElementId);
    console.log('Set active element to:', newElementId);
  }, []);

  // Update an existing element - memoized
  const updateElement = useCallback((elementId: string, updates: Partial<FormElementTypes>) => {
    console.log('Updating element:', elementId, 'with updates:', updates);
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
    
    setForm(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        elements: (prev.elements || []).map(el => 
          el.id === elementId ? { ...el, ...updates } : el
        )
      };
    });
  }, []);

  // Remove an element - memoized
  const removeElement = useCallback((elementId: string) => {
    // If the active element is being removed, clear the selection
    setActiveElement(prev => prev === elementId ? null : prev);
    
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    
    setForm(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        elements: (prev.elements || []).filter(el => el.id !== elementId)
      };
    });
  }, []);

  // Duplicate an element - memoized
  const duplicateElement = useCallback((elementId: string) => {
    setFormData(prev => {
      const elementToDuplicate = prev.elements.find(el => el.id === elementId);
      if (!elementToDuplicate) return prev;
      
      const newElementId = uuidv4();
      const duplicatedElement = {
        ...elementToDuplicate,
        id: newElementId,
        label: `${elementToDuplicate.label} (Copy)`
      };
      
      // Set the duplicated element as active
      setActiveElement(newElementId);
      
      return {
        ...prev,
        elements: [...prev.elements, duplicatedElement]
      };
    });
    
    setForm(prev => {
      if (!prev) return prev;
      
      const elementToDuplicate = prev.elements?.find(el => el.id === elementId);
      if (!elementToDuplicate) return prev;
      
      const newElementId = uuidv4();
      const duplicatedElement = {
        ...elementToDuplicate,
        id: newElementId,
        label: `${elementToDuplicate.label} (Copy)`
      };
      
      return {
        ...prev,
        elements: [...(prev.elements || []), duplicatedElement]
      };
    });
  }, []);

  // Move an element (reorder) - memoized
  const moveElement = useCallback((dragId: string, hoverId: string) => {
    const reorderFn = (elements: FormElementTypes[]) => {
      const dragIndex = elements.findIndex(el => el.id === dragId);
      const hoverIndex = elements.findIndex(el => el.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return elements;
      
      const newElements = [...elements];
      const dragElement = newElements[dragIndex];
      
      newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, dragElement);
      
      return newElements;
    };
    
    setFormData(prev => ({
      ...prev,
      elements: reorderFn(prev.elements)
    }));
    
    setForm(prev => {
      if (!prev || !prev.elements) return prev;
      return {
        ...prev,
        elements: reorderFn(prev.elements)
      };
    });
  }, []);
  
  // Helper function for reordering elements by index - memoized
  const reorderElements = useCallback((dragIndex: number, hoverIndex: number) => {
    const reorderFn = (elements: FormElementTypes[]) => {
      if (dragIndex === -1 || hoverIndex === -1) return elements;
      
      const newElements = [...elements];
      const dragElement = newElements[dragIndex];
      
      newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, dragElement);
      
      return newElements;
    };
    
    setFormData(prev => ({
      ...prev,
      elements: reorderFn(prev.elements)
    }));
    
    setForm(prev => {
      if (!prev || !prev.elements) return prev;
      return {
        ...prev,
        elements: reorderFn(prev.elements)
      };
    });
  }, []);

  // Alias for removeElement for compatibility - memoized
  const deleteElement = removeElement;

  const value = {
    form,
    formData,
    activeElement,
    isDragging,
    updateForm,
    setActiveElement,
    addElement,
    updateElement,
    updateFormTitle,
    updateFormDescription,
    removeElement,
    moveElement,
    deleteElement,
    duplicateElement,
    setIsDragging,
    reorderElements
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
