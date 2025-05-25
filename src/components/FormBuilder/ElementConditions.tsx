
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Condition, FormElementTypes } from "@/types/formBuilder";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ElementConditionsProps {
  element: FormElementTypes;
}

const ElementConditions = ({ element }: ElementConditionsProps) => {
  const { formData, updateElement } = useFormBuilder();
  
  // Get all elements that appear before this one and can be used for conditions
  const availableElements = formData.elements.filter(e => 
    e.id !== element.id && 
    e.type !== 'break' && 
    e.type !== 'section' && 
    formData.elements.indexOf(e) < formData.elements.indexOf(element)
  );
  
  // Ensure we always have a valid conditionalLogic object
  const conditionalLogic = element.conditionalLogic || {
    enabled: false,
    action: 'show',
    conditions: [],
    logicGate: 'all'
  };
  
  const updateConditionalLogic = (updates: Partial<typeof conditionalLogic>) => {
    console.log('Updating conditional logic:', updates);
    const newConditionalLogic = {
      ...conditionalLogic,
      ...updates
    };
    console.log('New conditional logic:', newConditionalLogic);
    
    updateElement(element.id, {
      conditionalLogic: newConditionalLogic
    });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    console.log('Switch changed to:', checked);
    updateConditionalLogic({ enabled: checked });
  };
  
  const addCondition = () => {
    if (availableElements.length === 0) return;
    
    const newCondition: Condition = {
      questionId: availableElements[0].id,
      operator: 'equals',
      value: ''
    };
    
    updateConditionalLogic({
      conditions: [...conditionalLogic.conditions, newCondition]
    });
  };
  
  const updateCondition = (index: number, updates: Partial<Condition>) => {
    const updatedConditions = [...conditionalLogic.conditions];
    updatedConditions[index] = { ...updatedConditions[index], ...updates };
    
    updateConditionalLogic({
      conditions: updatedConditions
    });
  };
  
  const removeCondition = (index: number) => {
    const updatedConditions = conditionalLogic.conditions.filter((_, i) => i !== index);
    updateConditionalLogic({
      conditions: updatedConditions
    });
  };

  const getQuestionOptions = (questionId: string) => {
    const question = formData.elements.find(e => e.id === questionId);
    if (question && 'options' in question && question.options) {
      return question.options;
    }
    return [];
  };
  
  console.log('ElementConditions rendering, conditionalLogic.enabled:', conditionalLogic.enabled);
  
  return (
    <ScrollArea className="h-[calc(100vh-250px)]">
      <div className="space-y-4 p-1">
        <div className="flex items-center space-x-2">
          <Switch
            id="conditions-enabled"
            checked={conditionalLogic.enabled}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="conditions-enabled">Enable Conditional Logic</Label>
        </div>
        
        {conditionalLogic.enabled && (
          <>
            <div className="space-y-2">
              <Label className="block mb-1">This element should:</Label>
              <RadioGroup 
                value={conditionalLogic.action}
                onValueChange={(value: 'show' | 'hide') => updateConditionalLogic({ action: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="show" id="action-show" />
                  <Label htmlFor="action-show">Show</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hide" id="action-hide" />
                  <Label htmlFor="action-hide">Hide</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="block mb-1">When:</Label>
              <RadioGroup 
                value={conditionalLogic.logicGate}
                onValueChange={(value: 'all' | 'any') => updateConditionalLogic({ logicGate: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="logic-all" />
                  <Label htmlFor="logic-all">All conditions match (AND)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="logic-any" />
                  <Label htmlFor="logic-any">Any condition matches (OR)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              {conditionalLogic.conditions.map((condition, index) => {
                const selectedElement = formData.elements.find(e => e.id === condition.questionId);
                const isChoiceQuestion = selectedElement && ['dropdown', 'radio', 'checkbox'].includes(selectedElement.type);
                
                return (
                  <div key={index} className="space-y-2 border rounded-md p-3 bg-muted/30">
                    <div className="grid grid-cols-1 gap-2">
                      <Select 
                        value={condition.questionId}
                        onValueChange={(value) => updateCondition(index, { questionId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableElements.map((element) => (
                            <SelectItem key={element.id} value={element.id}>
                              {element.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        value={condition.operator}
                        onValueChange={(value: any) => updateCondition(index, { operator: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Does not equal</SelectItem>
                          {!isChoiceQuestion && (
                            <>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="not_contains">Does not contain</SelectItem>
                              <SelectItem value="greater_than">Greater than</SelectItem>
                              <SelectItem value="less_than">Less than</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      
                      {isChoiceQuestion ? (
                        <Select 
                          value={condition.value}
                          onValueChange={(value) => updateCondition(index, { value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select value" />
                          </SelectTrigger>
                          <SelectContent>
                            {getQuestionOptions(condition.questionId).map((option) => (
                              <SelectItem key={option.id} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          value={condition.value}
                          onChange={(e) => updateCondition(index, { value: e.target.value })}
                          placeholder="Enter value"
                        />
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(index)}
                      className="ml-auto flex items-center text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={addCondition}
              disabled={availableElements.length === 0}
            >
              <PlusCircle className="mr-1 h-4 w-4" /> Add Condition
            </Button>
            
            {availableElements.length === 0 && conditionalLogic.conditions.length === 0 && (
              <div className="text-center py-2 text-muted-foreground text-sm">
                No previous questions available for conditional logic
              </div>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default ElementConditions;
