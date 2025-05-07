
import { useFormBuilder } from "@/context/FormBuilderContext";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import FormElement from "./FormElement";
import { FileTextIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const DragDrop = () => {
  const { formData, setActiveElement, isDragging } = useFormBuilder();
  const [isLoading, setIsLoading] = useState(true);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: () => ({}),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Add a short delay to ensure elements are loaded properly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.elements]);

  const hasElements = formData.elements && formData.elements.length > 0;

  console.log("DragDrop rendering with elements:", formData.elements.length);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading elements...</span>
        </div>
      ) : (
        <div 
          ref={drop}
          className={`min-h-[calc(100%-2rem)] rounded-lg border-2 border-dashed p-4 transition-colors ${
            isOver || isDragging ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
        >
          {!hasElements && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <FileTextIcon className="h-12 w-12 mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium">Add elements from the panel on the right</h3>
              <p className="max-w-xs mt-2">
                Drag and drop elements to build your form. Elements can be reordered by dragging.
              </p>
            </div>
          )}

          {hasElements && (
            <div className="space-y-2 mb-24">
              {formData.elements.map((element, index) => (
                <FormElement 
                  key={element.id} 
                  element={element} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DragDrop;
