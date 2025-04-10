
import { useFormBuilder } from "@/context/FormBuilderContext";
import { FormElementTypes } from "@/types/formBuilder";
import { Card } from "../ui/card";
import { 
  GripVertical, 
  Trash2, 
  Copy, 
  Settings, 
  FileText, 
  AlignLeft, 
  Hash, 
  Mail, 
  List, 
  CheckSquare, 
  CircleCheckBig, 
  Calendar, 
  SectionIcon,
  ArrowDown,
  Star,
  Smile,
  Phone,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./constants";

const getQuestionIcon = (type: string) => {
  switch (type) {
    case 'text': return <FileText className="h-4 w-4" />;
    case 'paragraph': return <AlignLeft className="h-4 w-4" />;
    case 'number': return <Hash className="h-4 w-4" />;
    case 'email': return <Mail className="h-4 w-4" />;
    case 'dropdown': return <List className="h-4 w-4" />;
    case 'radio': return <CircleCheckBig className="h-4 w-4" />;
    case 'checkbox': return <CheckSquare className="h-4 w-4" />;
    case 'date': return <Calendar className="h-4 w-4" />;
    case 'section': return <SectionIcon className="h-4 w-4" />;
    case 'break': return <ArrowDown className="h-4 w-4" />;
    case 'star': return <Star className="h-4 w-4" />;
    case 'face': return <Smile className="h-4 w-4" />;
    case 'phone': return <Phone className="h-4 w-4" />;
    case 'address': return <Home className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getHumanReadableType = (type: string) => {
  switch (type) {
    case 'text': return 'Text Question';
    case 'paragraph': return 'Paragraph Question';
    case 'number': return 'Number Question';
    case 'email': return 'Email Question';
    case 'dropdown': return 'Dropdown Question';
    case 'radio': return 'Multiple Choice';
    case 'checkbox': return 'Checkboxes';
    case 'date': return 'Date Question';
    case 'section': return 'Section';
    case 'break': return 'Page Break';
    case 'star': return 'Star Rating';
    case 'face': return 'Face Rating';
    case 'phone': return 'Phone Number';
    case 'address': return 'Address';
    default: return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

interface FormElementProps {
  element: FormElementTypes;
  index: number;
}

export const FormElement = ({ element, index }: FormElementProps) => {
  const { activeElement, setActiveElement, deleteElement, duplicateElement, setIsDragging, reorderElements } = useFormBuilder();
  
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: () => {
      // Set global dragging state when drag starts
      setIsDragging(true);
      return { id: element.id, index };
    },
    end: () => {
      // Reset global dragging state when drag ends
      setIsDragging(false);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [element.id, index, setIsDragging]);
  
  const [, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    hover(item: { id: string, index: number }, monitor) {
      if (!element) {
        return;
      }

      // Don't replace items with themselves
      const draggedIndex = item.index;
      const hoverIndex = index;
      
      if (draggedIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      if (draggedIndex !== hoverIndex) {
        reorderElements(draggedIndex, hoverIndex);
        // Update the index for subsequent drags
        item.index = hoverIndex;
      }
    },
  });
  
  const handleClick = () => {
    setActiveElement(element.id);
  };
  
  const isActive = activeElement === element.id;
  const isSection = element.type === 'section';
  const isBreak = element.type === 'break';

  return (
    <Card 
      ref={(node) => drop(dragRef(node))}
      className={cn(
        "mb-2 relative transition-all duration-200 border overflow-hidden",
        isActive && "ring-2 ring-primary ring-offset-2",
        isDragging && "opacity-50"
      )}
      onClick={handleClick}
    >
      <div 
        className="absolute top-0 left-0 bottom-0 flex items-center justify-center p-2 cursor-grab bg-muted border-r"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center p-4 pl-10">
        <div className="flex-1">
          {isSection && (
            <div className="space-y-1">
              <h3 className="font-medium">{element.label || "Untitled Section"}</h3>
              {'description' in element && element.description && (
                <p className="text-sm text-muted-foreground">{element.description}</p>
              )}
            </div>
          )}
          
          {isBreak && (
            <div className="flex items-center justify-center py-1">
              <div className="border-t border-dashed border-primary/50 w-full"></div>
              <span className="mx-2 text-xs text-muted-foreground">PAGE BREAK</span>
              <div className="border-t border-dashed border-primary/50 w-full"></div>
            </div>
          )}
          
          {!isSection && !isBreak && (
            <div className="flex items-center">
              <span className="mr-2 text-primary">{getQuestionIcon(element.type)}</span>
              <span className="font-medium">{element.label}</span>
              {element.required && <span className="text-red-500 ml-1">*</span>}
              <span className="text-xs text-muted-foreground ml-2 border rounded px-1 py-0.5">{getHumanReadableType(element.type)}</span>
              
              {element.conditionalLogic?.enabled && (
                <span className="ml-2 text-xs bg-primary-100 text-primary-800 rounded px-1 py-0.5 flex items-center">
                  <Settings className="h-3 w-3 mr-1" /> Conditional
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex space-x-1">
          {!isBreak && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                duplicateElement(element.id);
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(element.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FormElement;
