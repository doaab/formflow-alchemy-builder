
import { Form, FormElementTypes, QuestionType, FormData } from '@/api/types/formTypes';

export interface FormBuilderContextType {
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
