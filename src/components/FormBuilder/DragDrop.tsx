
import { useFormBuilder } from "@/context/FormBuilderContext";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import FormElement from "./FormElement";
import { cn } from "@/lib/utils";

const DragDrop = () => {
  const { formData, reorderElements, setIsDragging } = useFormBuilder();

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: () => ({}),
    hover: (item: { id: string; index: number }, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = formData.elements.length;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Time to actually perform the action
      reorderElements(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div 
          ref={drop}
          className={cn(
            "min-h-[300px]",
            isOver && "bg-primary/5 border-2 border-dashed border-primary/40 rounded-lg"
          )}
        >
          {formData.elements.length === 0 && (
            <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-500">Add elements from the panel on the right</p>
                <p className="text-sm text-gray-400">Drag and drop to reorder</p>
              </div>
            </div>
          )}
          
          {formData.elements.filter(element => element !== undefined).map((element, index) => {
            // Skip rendering if element is undefined
            if (!element) {
              console.warn(`Undefined element found at index ${index}`);
              return null;
            }
            
            return (
              <FormElement 
                key={element.id}
                element={element}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
