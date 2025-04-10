
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useFormBuilder } from "@/context/FormBuilderContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Eye, Frown, MehIcon, Smile, SmileIcon, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FormData, FormElement } from "@/types/formBuilder";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { evaluateCondition } from "@/utils/formUtils";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

// Common country codes and names
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

const FormPreviewDialog = () => {
  const { formData } = useFormBuilder();
  const [open, setOpen] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [addressExpanded, setAddressExpanded] = useState<Record<string, boolean>>({});
  
  const handleInputChange = (elementId: string, value: string | boolean | string[] | Date | Record<string, any>) => {
    setResponses(prev => ({
      ...prev,
      [elementId]: value
    }));
  };

  const handleAddressChange = (elementId: string, field: string, value: string) => {
    const currentValue = responses[elementId] || {};
    
    setResponses(prev => ({
      ...prev,
      [elementId]: {
        ...currentValue,
        [field]: value
      }
    }));
  };
  
  const toggleAddressExpanded = (elementId: string) => {
    setAddressExpanded(prev => ({
      ...prev,
      [elementId]: !prev[elementId]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with responses:", responses);
    setOpen(false);
    setResponses({});
    setAddressExpanded({});
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Eye className="mr-2 h-4 w-4" /> Preview Form
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{formData.title}</DialogTitle>
          <DialogDescription>{formData.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {formData.elements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No elements added to this form yet.
              </div>
            ) : (
              formData.elements.map((element, index) => {
                // Make sure element is defined before evaluation
                if (!element) {
                  console.warn("Undefined element found at index", index);
                  return null;
                }
                
                const shouldShow = evaluateCondition(element, responses);
                
                if (!shouldShow) {
                  return null;
                }
                
                if (element.type === 'section') {
                  return (
                    <div key={element.id} className="py-2">
                      <h3 className="text-lg font-medium">{element.label || "Untitled Section"}</h3>
                      {'description' in element && element.description && (
                        <p className="text-sm text-muted-foreground mt-1">{element.description}</p>
                      )}
                      <Separator className="my-4" />
                    </div>
                  );
                }
                
                if (element.type === 'break') {
                  return (
                    <div key={element.id} className="flex items-center py-4">
                      <div className="flex-1 border-t border-dashed"></div>
                      <div className="px-4 text-xs text-muted-foreground">PAGE BREAK</div>
                      <div className="flex-1 border-t border-dashed"></div>
                    </div>
                  );
                }
                
                return (
                  <div key={element.id} className="space-y-2">
                    <Label htmlFor={element.id}>
                      {element.label}
                      {element.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    
                    {renderFieldByType(
                      element, 
                      responses[element.id], 
                      (value) => handleInputChange(element.id, value), 
                      addressExpanded[element.id] || (element.type === 'address' && (element as any).expanded),
                      () => toggleAddressExpanded(element.id),
                      (field, value) => handleAddressChange(element.id, field, value)
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {formData.elements.length > 0 && (
              <Button type="submit">Submit Form</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

function renderFieldByType(
  element: FormElement, 
  value: any, 
  onChange: (value: any) => void,
  addressExpanded: boolean = false,
  toggleAddress: () => void = () => {},
  handleAddressFieldChange: (field: string, value: string) => void = () => {}
) {
  if (!element || !element.type) {
    console.warn('Invalid element passed to renderFieldByType:', element);
    return null;
  }
  
  switch (element.type) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <Input
          id={element.id}
          type={element.type === 'number' ? 'number' : element.type === 'email' ? 'email' : 'text'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={element.placeholder}
          required={element.required}
        />
      );
      
    case 'paragraph':
      return (
        <Textarea
          id={element.id}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={element.placeholder}
          required={element.required}
          rows={4}
        />
      );
      
    case 'radio':
      return (
        <RadioGroup
          value={value || ''}
          onValueChange={onChange}
          required={element.required}
        >
          {element.options?.map((option) => (
            <div className="flex items-center space-x-2" key={option.id}>
              <RadioGroupItem value={option.value} id={`${element.id}-${option.id}`} />
              <Label htmlFor={`${element.id}-${option.id}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );
      
    case 'checkbox':
      return (
        <div className="space-y-2">
          {element.options?.map((option) => (
            <div className="flex items-center space-x-2" key={option.id}>
              <Checkbox
                id={`${element.id}-${option.id}`}
                checked={value?.includes(option.value)}
                onCheckedChange={(checked) => {
                  const currentValue = value || [];
                  const newValue = checked
                    ? [...currentValue, option.value]
                    : currentValue.filter((v: string) => v !== option.value);
                  onChange(newValue);
                }}
              />
              <Label htmlFor={`${element.id}-${option.id}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      );
      
    case 'dropdown':
      return (
        <Select
          value={value || ''}
          onValueChange={onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {element.options?.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      
    case 'date':
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case 'phone':
      const allowedCountries = (element as any).allowedCountries || ['US', 'CA', 'GB'];
      const defaultCountry = (element as any).defaultCountry || 'US';
      
      return (
        <div className="flex space-x-2">
          <Select
            value={(value?.countryCode || defaultCountry)}
            onValueChange={(code) => onChange({...value, countryCode: code})}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries
                .filter(country => allowedCountries.includes(country.code))
                .map(country => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input
            className="flex-1"
            placeholder={element.placeholder || "Enter phone number"}
            value={(value?.number || '')}
            onChange={(e) => onChange({
              ...value,
              countryCode: value?.countryCode || defaultCountry,
              number: e.target.value
            })}
            required={element.required}
          />
        </div>
      );

    case 'address':
      const fields = (element as any).fields || {
        street1: true,
        street2: true,
        city: true,
        state: true,
        zipCode: true,
        country: true
      };
      
      const addressValue = value || {};
      const allowedAddressCountries = (element as any).allowedCountries || ['US', 'CA', 'GB'];
      
      return (
        <Collapsible open={addressExpanded} onOpenChange={toggleAddress}>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="mb-2 w-full justify-between"
              onClick={() => toggleAddress()}
            >
              <span>{addressExpanded ? "Hide Address Fields" : "Show Address Fields"}</span>
              {addressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          <CollapsibleContent className="space-y-2">
            {fields.street1 && (
              <div className="space-y-1">
                <Label>Street Address</Label>
                <Input 
                  value={addressValue.street1 || ''} 
                  onChange={(e) => handleAddressFieldChange('street1', e.target.value)}
                  placeholder="Street Address"
                  required={element.required}
                />
              </div>
            )}
            
            {fields.street2 && (
              <div className="space-y-1">
                <Label>Street Address 2</Label>
                <Input 
                  value={addressValue.street2 || ''} 
                  onChange={(e) => handleAddressFieldChange('street2', e.target.value)}
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              {fields.city && (
                <div className="space-y-1">
                  <Label>City</Label>
                  <Input 
                    value={addressValue.city || ''} 
                    onChange={(e) => handleAddressFieldChange('city', e.target.value)}
                    placeholder="City"
                    required={element.required && fields.city}
                  />
                </div>
              )}
              
              {fields.state && (
                <div className="space-y-1">
                  <Label>State/Province</Label>
                  <Input 
                    value={addressValue.state || ''} 
                    onChange={(e) => handleAddressFieldChange('state', e.target.value)}
                    placeholder="State/Province"
                    required={element.required && fields.state}
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {fields.zipCode && (
                <div className="space-y-1">
                  <Label>Zip/Postal Code</Label>
                  <Input 
                    value={addressValue.zipCode || ''} 
                    onChange={(e) => handleAddressFieldChange('zipCode', e.target.value)}
                    placeholder="Zip/Postal Code"
                    required={element.required && fields.zipCode}
                  />
                </div>
              )}
              
              {fields.country && (
                <div className="space-y-1">
                  <Label>Country</Label>
                  <Select
                    value={addressValue.country || ''}
                    onValueChange={(value) => handleAddressFieldChange('country', value)}
                    required={element.required && fields.country}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries
                        .filter(country => allowedAddressCountries.includes(country.code))
                        .map(country => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );

    case 'star':
      const maxStars = element.maxStars || 5;
      const selectedRating = value || 0;
      
      return (
        <div className="flex items-center gap-1 py-2">
          {Array.from({length: maxStars}).map((_, i) => (
            <button
              type="button"
              key={`star-${i}`}
              className="text-yellow-400 hover:text-yellow-500 focus:outline-none"
              onClick={() => onChange(i + 1)}
            >
              <Star 
                className={cn(
                  "h-6 w-6", 
                  selectedRating >= i + 1 ? "fill-current" : "fill-none"
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">{selectedRating > 0 ? `${selectedRating}/${maxStars}` : ''}</span>
        </div>
      );
      
    case 'face':
      const selectedFace = value || 0;
      
      return (
        <div className="flex items-center justify-center gap-4 py-2">
          <button
            type="button"
            className={cn(
              "p-2 rounded-full hover:bg-red-100", 
              selectedFace === 1 && "bg-red-100"
            )}
            onClick={() => onChange(1)}
          >
            <Frown className={cn(
              "h-8 w-8", 
              selectedFace === 1 ? "text-red-500" : "text-gray-400"
            )} />
          </button>
          
          <button
            type="button"
            className={cn(
              "p-2 rounded-full hover:bg-yellow-100", 
              selectedFace === 2 && "bg-yellow-100"
            )}
            onClick={() => onChange(2)}
          >
            <MehIcon className={cn(
              "h-8 w-8", 
              selectedFace === 2 ? "text-yellow-500" : "text-gray-400"
            )} />
          </button>
          
          <button
            type="button"
            className={cn(
              "p-2 rounded-full hover:bg-green-100", 
              selectedFace === 3 && "bg-green-100"
            )}
            onClick={() => onChange(3)}
          >
            <Smile className={cn(
              "h-8 w-8", 
              selectedFace === 3 ? "text-green-500" : "text-gray-400"
            )} />
          </button>
        </div>
      );
      
    default:
      return <div>Unsupported field type</div>;
  }
}

export default FormPreviewDialog;
