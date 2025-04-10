import { useFormBuilder } from '@/context/FormBuilderContext';
import { 
  FormElement, 
  FormElementTypes, 
  AddressElement,
  PhoneElement
} from '@/types/formBuilder';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Phone, Home } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ElementConditions from './ElementConditions';
import { Slider } from '../ui/slider';
import { ScrollArea } from '../ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface ElementEditorProps {
  element: FormElementTypes;
}

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'CN', name: 'China' },
  { code: 'KR', name: 'South Korea' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'RU', name: 'Russia' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'SG', name: 'Singapore' },
];

const ElementEditor = ({ element }: ElementEditorProps) => {
  const { updateElement } = useFormBuilder();
  const [activeTab, setActiveTab] = useState("basic");
  const [addressCollapsed, setAddressCollapsed] = useState(!(element.type === 'address' && (element as AddressElement).expanded));

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

  const handleAddressFieldChange = (field: string, value: boolean) => {
    if (element.type !== 'address') return;
    
    const addressElement = element as AddressElement;
    updateElement(element.id, {
      fields: {
        ...addressElement.fields,
        [field]: value
      }
    } as Partial<AddressElement>);
  };

  const toggleAddressExpanded = () => {
    if (element.type !== 'address') return;
    
    const newValue = !(element as AddressElement).expanded;
    setAddressCollapsed(!newValue);
    updateElement(element.id, { expanded: newValue } as Partial<AddressElement>);
  };

  const handleCountryAllowedChange = (country: string, allowed: boolean) => {
    if (!['phone', 'address'].includes(element.type)) return;
    
    let currentAllowed = element.type === 'phone' 
      ? (element as PhoneElement).allowedCountries || []
      : (element as AddressElement).allowedCountries || [];
    
    if (allowed && !currentAllowed.includes(country)) {
      currentAllowed = [...currentAllowed, country];
    } else if (!allowed && currentAllowed.includes(country)) {
      currentAllowed = currentAllowed.filter((c: string) => c !== country);
    }
    
    updateElement(element.id, { allowedCountries: currentAllowed } as Partial<PhoneElement | AddressElement>);
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
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="h-full">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4 mt-4 p-1">
              <div className="space-y-2">
                <Label htmlFor="question-label">Question Label</Label>
                <Input
                  id="question-label"
                  value={element.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                />
              </div>
              
              {['text', 'paragraph', 'email', 'number', 'phone'].includes(element.type) && (
                <div className="space-y-2">
                  <Label htmlFor="placeholder">Placeholder Text</Label>
                  <Input
                    id="placeholder"
                    value={element.placeholder || ''}
                    onChange={(e) => handleChange('placeholder', e.target.value)}
                  />
                </div>
              )}

              {element.type === 'phone' && (
                <div className="space-y-2">
                  <Label htmlFor="default-country">Default Country</Label>
                  <Select 
                    value={(element as PhoneElement).defaultCountry || 'US'}
                    onValueChange={(value) => handleChange('defaultCountry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select default country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {element.type === 'address' && (
                <div className="space-y-2">
                  <Collapsible 
                    open={!addressCollapsed}
                    onOpenChange={(isOpen) => {
                      setAddressCollapsed(!isOpen);
                      toggleAddressExpanded();
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <Label>Address Fields</Label>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                          {addressCollapsed ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="space-y-2 pt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="street1" 
                            checked={(element as AddressElement).fields?.street1 !== false}
                            onCheckedChange={(checked) => handleAddressFieldChange('street1', !!checked)} 
                          />
                          <Label htmlFor="street1">Street Address</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="street2" 
                            checked={(element as AddressElement).fields?.street2 !== false}
                            onCheckedChange={(checked) => handleAddressFieldChange('street2', !!checked)} 
                          />
                          <Label htmlFor="street2">Street Address 2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="city" 
                            checked={(element as AddressElement).fields?.city !== false}
                            onCheckedChange={(checked) => handleAddressFieldChange('city', !!checked)} 
                          />
                          <Label htmlFor="city">City</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="state" 
                            checked={(element as AddressElement).fields?.state !== false}
                            onCheckedChange={(checked) => handleAddressFieldChange('state', !!checked)} 
                          />
                          <Label htmlFor="state">State/Province</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="zipCode" 
                            checked={(element as AddressElement).fields?.zipCode !== false}
                            onCheckedChange={(checked) => handleAddressFieldChange('zipCode', !!checked)} 
                          />
                          <Label htmlFor="zipCode">Zip/Postal Code</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="country" 
                            checked={(element as AddressElement).fields?.country !== false}
                            onCheckedChange={(checked) => handleAddressFieldChange('country', !!checked)} 
                          />
                          <Label htmlFor="country">Country</Label>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}

              {element.type === 'star' && (
                <div className="space-y-2">
                  <Label htmlFor="max-stars">Maximum Number of Stars</Label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      id="max-stars" 
                      min={1} 
                      max={10} 
                      step={1} 
                      value={[element.maxStars || 5]} 
                      onValueChange={(value) => handleChange('maxStars', value[0])}
                    />
                    <span className="w-8 text-center">{element.maxStars || 5}</span>
                  </div>
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
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="options" className="h-full">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="p-1">
              {['dropdown', 'radio', 'checkbox'].includes(element.type) && element.options && (
                <>
                  <div className="space-y-3 mt-4">
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
                    className="flex items-center mt-4"
                    onClick={addOption}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" /> Add Option
                  </Button>
                </>
              )}

              {['phone', 'address'].includes(element.type) && (
                <>
                  <div className="mt-4 mb-2">
                    <Label className="block mb-2">Allowed Countries</Label>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {countries.map((country) => (
                        <div key={country.code} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`country-${country.code}`}
                            checked={(element as any).allowedCountries?.includes(country.code)}
                            onCheckedChange={(checked) => handleCountryAllowedChange(country.code, !!checked)}
                          />
                          <Label htmlFor={`country-${country.code}`}>{country.name} ({country.code})</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!['dropdown', 'radio', 'checkbox', 'phone', 'address'].includes(element.type) && (
                <div className="text-center py-4 text-muted-foreground">
                  No options available for this question type
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="conditions" className="mt-4 h-full">
          <ElementConditions element={element} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElementEditor;
