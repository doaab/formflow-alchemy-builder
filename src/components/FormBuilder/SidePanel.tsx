
import { useFormBuilder } from "@/context/FormBuilderContext";
import { FormElementTypes, QuestionType } from "@/types/formBuilder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ElementEditor from "./ElementEditor";
import { ScrollArea } from "../ui/scroll-area";
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
  PlusCircle,
  Star,
  Smile,
  Phone,
  Home
} from "lucide-react";
import { useState, useEffect } from "react";

const SidePanel = () => {
  const { activeElement, formData, addElement, setActiveElement } = useFormBuilder();
  // Allow switching between tabs regardless of selection
  const [activeTab, setActiveTab] = useState<string>(activeElement ? "properties" : "add");
  
  // Add safe check for active element
  const selectedElement = activeElement
    ? formData.elements.find((element) => element && element.id === activeElement)
    : null;

  // Update tab when active element changes
  useEffect(() => {
    if (activeElement && selectedElement) {
      setActiveTab("properties");
    }
  }, [activeElement, selectedElement]);

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
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="add">Add Elements</TabsTrigger>
          <TabsTrigger value="properties" disabled={!activeElement || !selectedElement}>Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="flex-1">
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Basic Fields</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('text')}>
                    <FileText className="mr-2 h-4 w-4" /> Text
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('paragraph')}>
                    <AlignLeft className="mr-2 h-4 w-4" /> Paragraph
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('number')}>
                    <Hash className="mr-2 h-4 w-4" /> Number
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('email')}>
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('phone')}>
                    <Phone className="mr-2 h-4 w-4" /> Phone
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('address')}>
                    <Home className="mr-2 h-4 w-4" /> Address
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">Choice Fields</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('dropdown')}>
                    <List className="mr-2 h-4 w-4" /> Dropdown
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('radio')}>
                    <CircleCheckBig className="mr-2 h-4 w-4" /> Multiple Choice
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('checkbox')}>
                    <CheckSquare className="mr-2 h-4 w-4" /> Checkboxes
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('date')}>
                    <Calendar className="mr-2 h-4 w-4" /> Date
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">Rating Fields</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('star')}>
                    <Star className="mr-2 h-4 w-4" /> Star Rating
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('face')}>
                    <Smile className="mr-2 h-4 w-4" /> Face Rating
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="mb-2 text-sm font-medium">Layout Elements</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('section')}>
                    <SectionIcon className="mr-2 h-4 w-4" /> Section
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleAddElement('break')}>
                    <ArrowDown className="mr-2 h-4 w-4" /> Page Break
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="properties" className="flex-1">
          {selectedElement ? (
            <div className="flex flex-col h-full">
              <ElementEditor element={selectedElement as FormElementTypes} />
              
              <div className="p-4 mt-auto border-t">
                <h3 className="mb-2 text-sm font-medium">Add More Elements</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('text')}>
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('paragraph')}>
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('phone')}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('dropdown')}>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('address')}>
                    <Home className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAddElement('star')}>
                    <Star className="h-4 w-4" />
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
