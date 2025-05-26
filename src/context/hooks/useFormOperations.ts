
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, FormElementTypes, QuestionType, FormData } from '@/api/types/formTypes';
import { createFormElement } from '../utils/elementFactory';

interface UseFormOperationsProps {
  form: Form | null;
  formData: FormData;
  setForm: React.Dispatch<React.SetStateAction<Form | null>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setActiveElement: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useFormOperations = ({
  form,
  formData,
  setForm,
  setFormData,
  setActiveElement
}: UseFormOperationsProps) => {
  
  // Update the entire form - memoized to prevent infinite re-renders
  const updateForm = useCallback((formData: Form) => {
    console.log('updateForm called with:', formData);
    setForm(formData);
    setFormData({
      title: formData.title || 'New Form',
      description: formData.description || '',
      elements: formData.elements || []
    });
  }, [setForm, setFormData]);

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
  }, [setFormData, setForm]);

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
  }, [setFormData, setForm]);

  // Add a new element - memoized
  const addElement = useCallback((type: QuestionType) => {
    const newElement = createFormElement(type);

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
    setActiveElement(newElement.id);
    console.log('Set active element to:', newElement.id);
  }, [setFormData, setForm, setActiveElement]);

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
  }, [setFormData, setForm]);

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
  }, [setFormData, setForm, setActiveElement]);

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
  }, [setFormData, setForm, setActiveElement]);

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
  }, [setFormData, setForm]);
  
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
  }, [setFormData, setForm]);

  return {
    updateForm,
    updateFormTitle,
    updateFormDescription,
    addElement,
    updateElement,
    removeElement,
    duplicateElement,
    moveElement,
    reorderElements
  };
};
