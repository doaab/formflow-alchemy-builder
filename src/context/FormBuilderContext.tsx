
import React, { createContext, useContext, useState } from 'react';
import { Form, FormData } from '@/api/types/formTypes';
import { FormBuilderContextType } from './types/formBuilderTypes';
import { useFormOperations } from './hooks/useFormOperations';

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

  // Get form operations from custom hook
  const formOperations = useFormOperations({
    form,
    formData,
    setForm,
    setFormData,
    setActiveElement
  });

  // Alias for removeElement for compatibility
  const deleteElement = formOperations.removeElement;

  const value: FormBuilderContextType = {
    form,
    formData,
    activeElement,
    isDragging,
    setActiveElement,
    setIsDragging,
    deleteElement,
    ...formOperations
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
