
import { useFormBuilder } from '@/context/FormBuilderContext';
import { FormElement, FormElementTypes } from '@/types/formBuilder';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { PlusCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ElementConditions from './ElementConditions';

interface ElementEditorProps {
  element: FormElementTypes;
}

const ElementEditor = ({ element }: ElementEditorProps) => {
  const { updateElement } = useFormBuilder();
  const [activeTab, setActiveTab] = useState("basic");

  const handleChange = (field: string, value: any) => {
    updateElement(element.id, { [field]: value });
  };

  const handleOptionChange = (optionId: string, field: string, value: string) => {
    if (!element.options) return;
    
    const updatedOptions = element.options.map(option => 
      option.id === optionId ? { ...option, [field]: value } : option
    );
    
    updateElement(element.id, { options: updatedOptions });
  };

  const addOption = () => {
    if (!element.options) return;
    
    const newOption = {
      id: uuidv4(),
      label: `Option ${element.options.length + 1}`,
      value: `option_${element.options.length + 1}`,
    };
    
    updateElement(element.id, { 
      options: [...element.options, newOption] 
    });
  };

  const removeOption = (optionId: string) => {
    if (!element.options || element.options.length <= 1) return;
    
    const updatedOptions = element.options.filter(option => option.id !== optionId);
    updateElement(element.id, { options: updatedOptions });
  };

  if (['section', 'break'].includes(element.type)) {
    return (
      <div className="p-4 space-y-4">
        {element.type === 'section' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="section-title">Section Title</Label>
              <Input
                id="section-title"
                value={element.label}
                onChange={(e) => handleChange('label', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-desc">Section Description</Label>
              <Textarea
                id="section-desc"
                value={(element as any).description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="question-label">Question Label</Label>
            <Input
              id="question-label"
              value={element.label}
              onChange={(e) => handleChange('label', e.target.value)}
            />
          </div>
          
          {['text', 'paragraph', 'email', 'number'].includes(element.type) && (
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder Text</Label>
              <Input
                id="placeholder"
                value={element.placeholder || ''}
                onChange={(e) => handleChange('placeholder', e.target.value)}
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="required"
              checked={element.required}
              onCheckedChange={(checked) => handleChange('required', checked)}
            />
            <Label htmlFor="required">Required Question</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="space-y-4 mt-4">
          {['dropdown', 'radio', 'checkbox'].includes(element.type) && element.options && (
            <>
              <div className="space-y-3">
                {element.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Input
                      value={option.label}
                      onChange={(e) => handleOptionChange(option.id, 'label', e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(option.id)}
                      disabled={element.options?.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center"
                onClick={addOption}
              >
                <PlusCircle className="mr-1 h-4 w-4" /> Add Option
              </Button>
            </>
          )}

          {!['dropdown', 'radio', 'checkbox'].includes(element.type) && (
            <div className="text-center py-4 text-muted-foreground">
              No options available for this question type
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="conditions" className="mt-4">
          <ElementConditions element={element} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementEditor;
