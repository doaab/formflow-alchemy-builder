
import { useFormBuilder } from "@/context/FormBuilderContext";
import { FormElementTypes } from "@/types/formBuilder";
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
  
  const selectedElement = activeElement
    ? formData.elements.find((element) => element.id === activeElement)
    : null;

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-medium">Form Builder</h2>
      </div>
      
      <Tabs 
        value={activeTab} 
        className="flex flex-col flex-1"
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="add">Add Elements</TabsTrigger>
          <TabsTrigger value="properties" disabled={!activeElement}>Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="p-4 flex-1 overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Basic Fields</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => addElement('text')}>
                  <FileText className="mr-2 h-4 w-4" /> Text
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('paragraph')}>
                  <AlignLeft className="mr-2 h-4 w-4" /> Paragraph
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('number')}>
                  <Hash className="mr-2 h-4 w-4" /> Number
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('email')}>
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="mb-2 text-sm font-medium">Choice Fields</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => addElement('dropdown')}>
                  <List className="mr-2 h-4 w-4" /> Dropdown
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('radio')}>
                  <CircleCheckBig className="mr-2 h-4 w-4" /> Multiple Choice
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('checkbox')}>
                  <CheckSquare className="mr-2 h-4 w-4" /> Checkboxes
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('date')}>
                  <Calendar className="mr-2 h-4 w-4" /> Date
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="mb-2 text-sm font-medium">Layout Elements</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start" onClick={() => addElement('section')}>
                  <SectionIcon className="mr-2 h-4 w-4" /> Section
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => addElement('break')}>
                  <ArrowDown className="mr-2 h-4 w-4" /> Page Break
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="properties" className="flex-1 overflow-auto">
          {selectedElement ? (
            <ElementEditor element={selectedElement as FormElementTypes} />
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
