
<?php

namespace App\Services;

use App\Models\Form;
use App\Models\FormElement;
use App\Models\FormElementOption;
use App\Models\ConditionalRule;
use Illuminate\Support\Facades\DB;

class FormElementService
{
    /**
     * Get all elements for a form.
     */
    public function getElementsByForm(Form $form)
    {
        return $form->elements()
            ->orderBy('order')
            ->with(['options' => function ($query) {
                $query->orderBy('order');
            }, 'conditionalRules'])
            ->get();
    }

    /**
     * Create a new form element.
     */
    public function createElement(Form $form, array $data)
    {
        DB::beginTransaction();

        try {
            $element = $form->elements()->create([
                'element_id' => $data['element_id'],
                'type' => $data['type'],
                'label' => $data['label'],
                'placeholder' => $data['placeholder'] ?? null,
                'default_value' => $data['default_value'] ?? null,
                'required' => $data['required'] ?? false,
                'order' => $data['order'] ?? 0,
                'confirm_email' => $data['confirm_email'] ?? null,
                'max_stars' => $data['max_stars'] ?? null,
                'address_expanded' => $data['address_expanded'] ?? null,
                'address_street1' => $data['address_street1'] ?? null,
                'address_street2' => $data['address_street2'] ?? null,
                'address_city' => $data['address_city'] ?? null,
                'address_state' => $data['address_state'] ?? null,
                'address_zipcode' => $data['address_zipcode'] ?? null,
                'address_country' => $data['address_country'] ?? null,
                'default_country' => $data['default_country'] ?? null,
                'allowed_countries' => $data['allowed_countries'] ?? null,
                'description' => $data['description'] ?? null,
                'conditional_logic_enabled' => $data['conditional_logic_enabled'] ?? false,
                'conditional_action' => $data['conditional_action'] ?? null,
                'conditional_logic_gate' => $data['conditional_logic_gate'] ?? null,
                'properties' => $data['properties'] ?? null,
            ]);

            // Create options if provided
            if (isset($data['options']) && is_array($data['options'])) {
                foreach ($data['options'] as $option) {
                    $element->options()->create([
                        'option_id' => $option['option_id'],
                        'label' => $option['label'],
                        'value' => $option['value'],
                        'order' => $option['order'] ?? 0,
                    ]);
                }
            }

            // Create conditional rules if provided
            if (isset($data['conditional_rules']) && is_array($data['conditional_rules'])) {
                foreach ($data['conditional_rules'] as $rule) {
                    $element->conditionalRules()->create([
                        'question_id' => $rule['question_id'],
                        'operator' => $rule['operator'],
                        'value' => $rule['value'],
                    ]);
                }
            }

            DB::commit();
            return $this->getElementWithDetails($element);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Update an existing form element.
     */
    public function updateElement(FormElement $element, array $data)
    {
        DB::beginTransaction();

        try {
            $element->update([
                'element_id' => $data['element_id'] ?? $element->element_id,
                'type' => $data['type'] ?? $element->type,
                'label' => $data['label'] ?? $element->label,
                'placeholder' => $data['placeholder'] ?? $element->placeholder,
                'default_value' => $data['default_value'] ?? $element->default_value,
                'required' => $data['required'] ?? $element->required,
                'order' => $data['order'] ?? $element->order,
                'confirm_email' => $data['confirm_email'] ?? $element->confirm_email,
                'max_stars' => $data['max_stars'] ?? $element->max_stars,
                'address_expanded' => $data['address_expanded'] ?? $element->address_expanded,
                'address_street1' => $data['address_street1'] ?? $element->address_street1,
                'address_street2' => $data['address_street2'] ?? $element->address_street2,
                'address_city' => $data['address_city'] ?? $element->address_city,
                'address_state' => $data['address_state'] ?? $element->address_state,
                'address_zipcode' => $data['address_zipcode'] ?? $element->address_zipcode,
                'address_country' => $data['address_country'] ?? $element->address_country,
                'default_country' => $data['default_country'] ?? $element->default_country,
                'allowed_countries' => $data['allowed_countries'] ?? $element->allowed_countries,
                'description' => $data['description'] ?? $element->description,
                'conditional_logic_enabled' => $data['conditional_logic_enabled'] ?? $element->conditional_logic_enabled,
                'conditional_action' => $data['conditional_action'] ?? $element->conditional_action,
                'conditional_logic_gate' => $data['conditional_logic_gate'] ?? $element->conditional_logic_gate,
                'properties' => $data['properties'] ?? $element->properties,
            ]);

            // Update options if provided
            if (isset($data['options']) && is_array($data['options'])) {
                // Delete existing options
                $element->options()->delete();
                
                // Create new options
                foreach ($data['options'] as $option) {
                    $element->options()->create([
                        'option_id' => $option['option_id'],
                        'label' => $option['label'],
                        'value' => $option['value'],
                        'order' => $option['order'] ?? 0,
                    ]);
                }
            }

            // Update conditional rules if provided
            if (isset($data['conditional_rules'])) {
                // Delete existing rules
                $element->conditionalRules()->delete();
                
                // Create new rules if there are any
                if (is_array($data['conditional_rules'])) {
                    foreach ($data['conditional_rules'] as $rule) {
                        $element->conditionalRules()->create([
                            'question_id' => $rule['question_id'],
                            'operator' => $rule['operator'],
                            'value' => $rule['value'],
                        ]);
                    }
                }
            }

            DB::commit();
            return $this->getElementWithDetails($element);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Delete a form element.
     */
    public function deleteElement(FormElement $element)
    {
        return $element->delete();
    }

    /**
     * Get a form element with its options and conditional rules.
     */
    public function getElementWithDetails(FormElement $element)
    {
        return $element->load([
            'options' => function ($query) {
                $query->orderBy('order');
            },
            'conditionalRules'
        ]);
    }

    /**
     * Reorder form elements.
     */
    public function reorderElements(array $elements)
    {
        DB::transaction(function () use ($elements) {
            foreach ($elements as $element) {
                FormElement::where('id', $element['id'])->update([
                    'order' => $element['order']
                ]);
            }
        });
    }
}
