
import { useFormBuilder } from "@/context/FormBuilderContext";
import { FormElementTypes, QuestionType } from "@/types/formBuilder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ElementEditor from "./ElementEditor";
import { 
  FileText,
  AlignLeft,
  Hash, 
  Mail,
  List,
  CircleCheckBig, 
  CheckSquare,
  Calendar,
  SectionIcon,
  ArrowDown,
  PlusCircle
} from "lucide-react";

const SidePanel = () => {
  const { activeElement, formData, addElement } = useFormBuilder();
  const activeTab = activeElement ? "properties" : "add";
  
  // Add safe check for active element
  const selectedElement = activeElement
    ? formData.elements.find((element) => element && element.id === activeElement)
    : null;

  // Create a wrapper function for adding elements with proper type casting
  const handleAddElement = (type: QuestionType) => {
    addElement(type);
  };

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium">Form Builder</h2>
      </div>
      
      <Tabs 
        value={activeTab} 
        className="flex flex-col flex-1"
        defaultValue={activeTab}
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="add">Add Elements</TabsTrigger>
          <TabsTrigger value="properties" disabled={!activeElement || !selectedElement}>Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="p-4 flex-1 overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Basic Fields</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('text' as QuestionType)}>
                  <FileText className="mr-2 h-4 w-4" /> Text
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('paragraph' as QuestionType)}>
                  <AlignLeft className="mr-2 h-4 w-4" /> Paragraph
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('number' as QuestionType)}>
                  <Hash className="mr-2 h-4 w-4" /> Number
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('email' as QuestionType)}>
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="mb-2 text-sm font-medium">Choice Fields</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('dropdown' as QuestionType)}>
                  <List className="mr-2 h-4 w-4" /> Dropdown
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('radio' as QuestionType)}>
                  <CircleCheckBig className="mr-2 h-4 w-4" /> Multiple Choice
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('checkbox' as QuestionType)}>
                  <CheckSquare className="mr-2 h-4 w-4" /> Checkboxes
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('date' as QuestionType)}>
                  <Calendar className="mr-2 h-4 w-4" /> Date
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="mb-2 text-sm font-medium">Layout Elements</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('section' as QuestionType)}>
                  <SectionIcon className="mr-2 h-4 w-4" /> Section
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleAddElement('break' as QuestionType)}>
                  <ArrowDown className="mr-2 h-4 w-4" /> Page Break
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="properties" className="flex-1 overflow-auto">
          {selectedElement ? (
            <div className="p-4 space-y-4">
              <ElementEditor element={selectedElement as FormElementTypes} />
              
              <Separator />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">Add More Elements</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('text' as QuestionType)}>
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('paragraph' as QuestionType)}>
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('number' as QuestionType)}>
                    <Hash className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('dropdown' as QuestionType)}>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('radio' as QuestionType)}>
                    <CircleCheckBig className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('section' as QuestionType)}>
                    <SectionIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <PlusCircle className="mx-auto h-8 w-8 mb-2" />
              <p>Select an element to edit its properties</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SidePanel;
