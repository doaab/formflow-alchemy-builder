
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FormData, 
  FormElementTypes, 
  QuestionType, 
  AddressElement,
  PhoneElement
} from '../types/formBuilder';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '../hooks/use-toast';
import { Form, FormElement } from '../api/types/formTypes';

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

interface FormBuilderProviderProps {
  children: React.ReactNode;
  initialFormId?: number;
  initialFormData?: Form;
  initialFormElements?: FormElement[];
}

export const FormBuilderProvider: React.FC<FormBuilderProviderProps> = ({ 
  children, 
  initialFormId, 
  initialFormData, 
  initialFormElements 
}) => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  
  // Initialize with existing form data if available
  useEffect(() => {
    if (initialFormData && initialFormElements && !isInitialized) {
      try {
        console.log("Initializing form builder with existing form:", initialFormData);
        console.log("Elements loaded:", initialFormElements.length);
        
        // Convert backend form model to frontend form data structure
        const convertedElements = initialFormElements.map(element => {
          console.log("Converting element:", element);
          const baseElement: any = {
            id: element.element_id,
            type: element.type as QuestionType,
            label: element.label,
            required: element.required,
            placeholder: element.placeholder || undefined,
            defaultValue: element.default_value || undefined,
          };
          
          // Handle specific element types
          switch (element.type) {
            case 'email':
              baseElement.confirmEmail = element.confirm_email || false;
              break;
            case 'star':
              baseElement.maxStars = element.max_stars || 5;
              break;
            case 'section':
              baseElement.description = element.description || '';
              break;
            case 'address':
              baseElement.expanded = element.address_expanded || false;
              baseElement.fields = {
                street1: element.address_street1 || true,
                street2: element.address_street2 || true,
                city: element.address_city || true,
                state: element.address_state || true,
                zipCode: element.address_zipcode || true,
                country: element.address_country || true,
              };
              baseElement.allowedCountries = element.allowed_countries || undefined;
              break;
            case 'phone':
              baseElement.defaultCountry = element.default_country || 'US';
              baseElement.allowedCountries = element.allowed_countries || undefined;
              break;
          }
          
          // Handle options for select, radio, checkbox
          if (element.options && element.options.length > 0) {
            baseElement.options = element.options.map(opt => ({
              id: opt.option_id,
              label: opt.label,
              value: opt.value
            }));
          }
          
          // Handle conditional logic
          if (element.conditional_logic_enabled) {
            baseElement.conditionalLogic = {
              enabled: true,
              action: element.conditional_action as 'show' | 'hide',
              logicGate: element.conditional_logic_gate as 'all' | 'any',
              conditions: element.conditionalRules?.map(rule => ({
                questionId: rule.question_id,
                operator: rule.operator as any,
                value: rule.value
              })) || []
            };
          }
          
          return baseElement;
        });
        
        setFormData({
          title: initialFormData.title,
          description: initialFormData.description,
          elements: convertedElements,
        });
        
        setIsInitialized(true);
        console.log("Successfully initialized form builder with existing form:", initialFormData.title);
        console.log("Elements loaded:", convertedElements.length);
        
      } catch (error) {
        console.error("Error initializing form with existing data:", error);
        toast({
          title: "Error Loading Form",
          description: "There was an error loading the form data. Starting with a blank form.",
          variant: "destructive",
        });
      }
    }
  }, [initialFormData, initialFormElements, isInitialized]);

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
      case 'number':
        return {
          ...baseElement,
          placeholder: 'Enter your answer',
        };
      case 'email':
        return {
          ...baseElement,
          placeholder: 'Enter your email',
          confirmEmail: false, // Default to not requiring confirmation
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
      case 'star':
        return {
          ...baseElement,
          maxStars: 5,
        };
      case 'face':
        return {
          ...baseElement,
        };
      case 'phone':
        // Default to common countries with expanded list
        return {
          ...baseElement,
          type: 'phone',
          placeholder: 'Enter phone number',
          defaultCountry: 'US',
          allowedCountries: [
            'US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR', 'MX', 
            'ES', 'IT', 'CN', 'RU', 'ZA', 'AE', 'SG', 'CH', 'SE', 'NL'
          ],
        } as PhoneElement;
      case 'address':
        // Default to common countries with expanded list
        return {
          ...baseElement,
          type: 'address',
          expanded: false,
          fields: {
            street1: true,
            street2: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
          },
          allowedCountries: [
            'US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'IN', 'BR', 'MX',
            'ES', 'IT', 'CN', 'RU', 'ZA', 'AE', 'SG', 'CH', 'SE', 'NL'
          ],
        } as AddressElement;
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
    // Make sure we have valid indices and they're different
    if (
      startIndex < 0 || 
      startIndex >= formData.elements.length || 
      endIndex < 0 || 
      endIndex > formData.elements.length || 
      startIndex === endIndex
    ) {
      console.warn("Invalid indices for reordering:", startIndex, endIndex);
      return;
    }
    
    // Create a new array from the existing elements
    const updatedElements = [...formData.elements];
    
    // Get the element to move
    const [elementToMove] = updatedElements.splice(startIndex, 1);
    
    // Check if the element exists
    if (!elementToMove) {
      console.warn("Attempted to reorder an undefined element at index:", startIndex);
      return;
    }
    
    // Insert the element at the new position
    updatedElements.splice(endIndex, 0, elementToMove);
    
    // Update the form data
    setFormData(prev => ({
      ...prev,
      elements: updatedElements
    }));
    
    // Update active element to the moved element
    setActiveElement(elementToMove.id);
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
