
import React, { createContext, useContext, useState } from 'react';
import { FormData, FormElementTypes, QuestionType } from '../types/formBuilder';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '../hooks/use-toast';

interface FormBuilderContextType {
  formData: FormData;
  activeElement: string | null;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  setActiveElement: (id: string | null) => void;
  updateFormTitle: (title: string) => void;
  updateFormDescription: (description: string) => void;
  addElement: (type: QuestionType) => void;
  updateElement: (id: string, updates: Partial<FormElementTypes>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
}

const initialForm: FormData = {
  title: 'Untitled Form',
  description: 'Form description',
  elements: [],
};

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const FormBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const updateFormTitle = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
  };

  const updateFormDescription = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
  };

  const createDefaultElement = (type: QuestionType): FormElementTypes => {
    const id = uuidv4();

    // Default properties for all element types
    const baseElement = {
      id,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      required: false,
    };

    switch (type) {
      case 'text':
      case 'paragraph':
      case 'email':
      case 'number':
        return {
          ...baseElement,
          placeholder: 'Enter your answer',
        };
      case 'dropdown':
      case 'radio':
      case 'checkbox':
        return {
          ...baseElement,
          options: [
            { id: uuidv4(), label: 'Option 1', value: 'option_1' },
            { id: uuidv4(), label: 'Option 2', value: 'option_2' },
            { id: uuidv4(), label: 'Option 3', value: 'option_3' },
          ],
        };
      case 'date':
        return {
          ...baseElement,
        };
      case 'section':
        return {
          ...baseElement,
          description: 'Section description',
        };
      case 'break':
        return {
          ...baseElement,
          label: '',
        };
      default:
        return baseElement;
    }
  };

  const addElement = (type: QuestionType) => {
    const newElement = createDefaultElement(type);
    setFormData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
    setActiveElement(newElement.id);
    toast({
      title: "Added Element",
      description: `Added new ${type} element`,
    });
  };

  const updateElement = (id: string, updates: Partial<FormElementTypes>) => {
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.map(element =>
        element && element.id === id ? { ...element, ...updates } : element
      ),
    }));
  };

  const deleteElement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.filter(element => element && element.id !== id),
    }));
    
    if (activeElement === id) {
      setActiveElement(null);
    }
    
    toast({
      title: "Element Deleted",
      description: "The element was successfully deleted",
    });
  };

  const duplicateElement = (id: string) => {
    const elementToDuplicate = formData.elements.find(element => element && element.id === id);
    
    if (elementToDuplicate) {
      const duplicatedElement = {
        ...elementToDuplicate,
        id: uuidv4(),
        label: `${elementToDuplicate.label} (Copy)`,
      };
      
      const elementIndex = formData.elements.findIndex(element => element && element.id === id);
      
      const newElements = [...formData.elements];
      newElements.splice(elementIndex + 1, 0, duplicatedElement);
      
      setFormData({
        ...formData,
        elements: newElements,
      });
      
      setActiveElement(duplicatedElement.id);
      
      toast({
        title: "Element Duplicated",
        description: "The element was successfully duplicated",
      });
    }
  };

  const reorderElements = (startIndex: number, endIndex: number) => {
    // Make sure we have valid indices
    if (startIndex < 0 || startIndex >= formData.elements.length || 
        endIndex < 0 || endIndex > formData.elements.length) {
      console.warn("Invalid indices for reordering:", startIndex, endIndex);
      return;
    }
    
    const result = Array.from(formData.elements);
    const [removed] = result.splice(startIndex, 1);
    
    // Check if the removed element is defined
    if (!removed) {
      console.warn("Attempted to reorder an undefined element at index:", startIndex);
      return;
    }
    
    result.splice(endIndex, 0, removed);

    setFormData({
      ...formData,
      elements: result,
    });
  };

  return (
    <FormBuilderContext.Provider
      value={{
        formData,
        activeElement,
        isDragging,
        setIsDragging,
        setActiveElement,
        updateFormTitle,
        updateFormDescription,
        addElement,
        updateElement,
        deleteElement,
        duplicateElement,
        reorderElements,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
};
