
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

// Expanded list of countries
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
