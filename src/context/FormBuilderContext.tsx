
import React, { createContext, useContext, useState } from 'react';
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

  // Update the entire form
  const updateForm = (formData: Form) => {
    setForm(formData);
    setFormData({
      title: formData.title || 'New Form',
      description: formData.description || '',
      elements: formData.elements || []
    });
  };

  // Update form title
  const updateFormTitle = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title
    }));
    if (form) {
      setForm({
        ...form,
        title
      });
    }
  };

  // Update form description
  const updateFormDescription = (description: string) => {
    setFormData(prev => ({
      ...prev,
      description
    }));
    if (form) {
      setForm({
        ...form,
        description
      });
    }
  };

  // Add a new element
  const addElement = (type: QuestionType) => {
    const newElementId = uuidv4();
    
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

    // Update the form with the new element
    setFormData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    
    if (form) {
      setForm(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          elements: [...(prev.elements || []), newElement]
        };
      });
    }
    
    // Set the new element as active
    setActiveElement(newElementId);
  };

  // Update an existing element
  const updateElement = (elementId: string, updates: Partial<FormElementTypes>) => {
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
    
    if (form) {
      setForm(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          elements: (prev.elements || []).map(el => 
            el.id === elementId ? { ...el, ...updates } : el
          )
        };
      });
    }
  };

  // Remove an element
  const removeElement = (elementId: string) => {
    // If the active element is being removed, clear the selection
    if (activeElement === elementId) {
      setActiveElement(null);
    }
    
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    
    if (form) {
      setForm(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          elements: (prev.elements || []).filter(el => el.id !== elementId)
        };
      });
    }
  };

  // Alias for removeElement for compatibility
  const deleteElement = removeElement;

  // Duplicate an element
  const duplicateElement = (elementId: string) => {
    const elementToDuplicate = formData.elements.find(el => el.id === elementId);
    if (!elementToDuplicate) return;
    
    const newElementId = uuidv4();
    const duplicatedElement = {
      ...elementToDuplicate,
      id: newElementId,
      label: `${elementToDuplicate.label} (Copy)`
    };
    
    setFormData(prev => ({
      ...prev,
      elements: [...prev.elements, duplicatedElement]
    }));
    
    if (form) {
      setForm(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          elements: [...(prev.elements || []), duplicatedElement]
        };
      });
    }
    
    // Set the duplicated element as active
    setActiveElement(newElementId);
  };

  // Move an element (reorder)
  const moveElement = (dragId: string, hoverId: string) => {
    setFormData(prev => {
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
    
    if (form) {
      setForm(prev => {
        if (!prev || !prev.elements) return prev;
        
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
    }
  };
  
  // Helper function for reordering elements by index
  const reorderElements = (dragIndex: number, hoverIndex: number) => {
    setFormData(prev => {
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
    
    if (form) {
      setForm(prev => {
        if (!prev || !prev.elements) return prev;
        
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
    }
  };

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
