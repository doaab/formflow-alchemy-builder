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
import { FormData, FormElement, AddressElement, PhoneElement } from "@/types/formBuilder";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { evaluateCondition } from "@/utils/formUtils";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AX', name: 'Åland Islands' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BV', name: 'Bouvet Island' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'BN', name: 'Brunei Darussalam' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos (Keeling) Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo, Democratic Republic' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: 'Côte d\'Ivoire' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'TF', name: 'French Southern Territories' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HM', name: 'Heard Island and McDonald Islands' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Jersey' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'North Korea' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RE', name: 'Réunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'BL', name: 'Saint Barthélemy' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'MF', name: 'Saint Martin' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SX', name: 'Sint Maarten' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia and South Sandwich Islands' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UM', name: 'United States Minor Outlying Islands' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'VG', name: 'Virgin Islands, British' },
  { code: 'VI', name: 'Virgin Islands, U.S.' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' }
];

const FormPreviewDialog = () => {
  const { formData } = useFormBuilder();
  const [open, setOpen] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [addressExpanded, setAddressExpanded] = useState<Record<string, boolean>>({});
  const [emailConfirmationErrors, setEmailConfirmationErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (elementId: string, value: string | boolean | string[] | Date | Record<string, any>) => {
    setResponses(prev => ({
      ...prev,
      [elementId]: value
    }));
    
    if (emailConfirmationErrors[elementId]) {
      setEmailConfirmationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[elementId];
        return newErrors;
      });
    }
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
  
  const validateEmailConfirmation = () => {
    const confirmElements = formData.elements.filter(el => 
      el && el.type === 'email' && el.confirmEmail
    );
    
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    confirmElements.forEach(element => {
      const emailValue = responses[element.id];
      const confirmId = `${element.id}_confirm`;
      const confirmValue = responses[confirmId];
      
      if (emailValue && confirmValue && emailValue !== confirmValue) {
        newErrors[confirmId] = "Email addresses do not match";
        isValid = false;
      }
    });
    
    setEmailConfirmationErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmailConfirmation()) {
      return;
    }
    
    console.log("Form submitted with responses:", responses);
    setOpen(false);
    setResponses({});
    setAddressExpanded({});
    setEmailConfirmationErrors({});
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
                
                const elementOutput = (
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

                if (element.type === 'email' && element.confirmEmail) {
                  const confirmId = `${element.id}_confirm`;
                  return (
                    <React.Fragment key={element.id}>
                      {elementOutput}
                      <div className="space-y-2 mt-4">
                        <Label htmlFor={confirmId}>
                          Confirm {element.label}
                          {element.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Input
                          id={confirmId}
                          type="email"
                          value={responses[confirmId] || ''}
                          onChange={(e) => handleInputChange(confirmId, e.target.value)}
                          placeholder={`Confirm ${element.placeholder || 'email'}`}
                          required={element.required}
                          className={emailConfirmationErrors[confirmId] ? "border-red-500" : ""}
                        />
                        {emailConfirmationErrors[confirmId] && (
                          <p className="text-red-500 text-sm">{emailConfirmationErrors[confirmId]}</p>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }
                
                return elementOutput;
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
      const addressElement = element as AddressElement;
      const fields = addressElement.fields || {
        street1: true,
        street2: true,
        city: true,
        state: true,
        zipCode: true,
        country: true
      };
      
      const addressValue = value || {};
      const allowedAddressCountries = addressElement.allowedCountries || ['US', 'CA', 'GB'];
      
      const shouldShowToggle = !addressElement.expanded;
      
      const shouldShowFields = addressElement.expanded || addressExpanded;
      
      return (
        <div>
          {shouldShowToggle && (
            <Button
              variant="outline"
              className="mb-2 w-full justify-between"
              onClick={() => toggleAddress()}
            >
              <span>{addressExpanded ? "Hide Address Fields" : "Show Address Fields"}</span>
              {addressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
          
          {shouldShowFields && (
            <div className="space-y-2">
              {fields.street1 && (
                <div className="space-y-1">
                  <Label>Street Address</Label>
                  <Input 
                    value={addressValue.street1 || ''} 
                    onChange={(e) => handleAddressFieldChange('street1', e.target.value)}
                    placeholder="Street Address"
                    required={element.required && fields.street1}
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
            </div>
          )}
        </div>
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
