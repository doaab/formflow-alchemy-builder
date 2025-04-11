
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Form;
use App\Models\FormElement;
use App\Models\FormElementOption;
use App\Models\FormResponse;
use App\Models\FormAnswer;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        // Create test users if they don't exist
        if (User::count() == 0) {
            User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]);
            
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]);
        }
        
        $users = User::all();
        
        // Form types to create with specific elements
        $formTypes = [
            [
                'title' => 'Customer Feedback Survey',
                'description' => 'Collect feedback from customers about our services',
                'elements' => [
                    ['type' => 'text', 'label' => 'Your Name', 'required' => true],
                    ['type' => 'email', 'label' => 'Your Email', 'required' => true],
                    ['type' => 'radio', 'label' => 'How would you rate our service?', 'required' => true, 'options' => ['Excellent', 'Good', 'Average', 'Poor', 'Very poor']],
                    ['type' => 'textarea', 'label' => 'Any additional comments?', 'required' => false],
                ]
            ],
            [
                'title' => 'Employee Satisfaction Survey',
                'description' => 'Annual employee satisfaction survey',
                'elements' => [
                    ['type' => 'text', 'label' => 'Department', 'required' => true],
                    ['type' => 'number', 'label' => 'Years at company', 'required' => true],
                    ['type' => 'radio', 'label' => 'Overall job satisfaction', 'required' => true, 'options' => ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied']],
                    ['type' => 'checkbox', 'label' => 'Which benefits do you value most?', 'required' => true, 'options' => ['Health insurance', 'Retirement plan', 'Flexible hours', 'Remote work', 'Professional development']],
                    ['type' => 'textarea', 'label' => 'Suggestions for improvement', 'required' => false],
                ]
            ],
            [
                'title' => 'Event Registration Form',
                'description' => 'Registration for annual conference',
                'elements' => [
                    ['type' => 'text', 'label' => 'Full Name', 'required' => true],
                    ['type' => 'email', 'label' => 'Email Address', 'required' => true],
                    ['type' => 'text', 'label' => 'Organization', 'required' => true],
                    ['type' => 'select', 'label' => 'Which sessions will you attend?', 'required' => true, 'options' => ['Morning Keynote', 'Technical Workshop', 'Networking Lunch', 'Industry Panel', 'Closing Reception']],
                    ['type' => 'radio', 'label' => 'Dietary preferences', 'required' => true, 'options' => ['No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free', 'Other']],
                ]
            ],
            [
                'title' => 'Product Feedback',
                'description' => 'Collect feedback about our latest product release',
                'elements' => [
                    ['type' => 'text', 'label' => 'Product Name', 'required' => true],
                    ['type' => 'email', 'label' => 'Your Email', 'required' => true],
                    ['type' => 'radio', 'label' => 'How often do you use this product?', 'required' => true, 'options' => ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']],
                    ['type' => 'checkbox', 'label' => 'Which features do you find most useful?', 'required' => false, 'options' => ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E']],
                    ['type' => 'textarea', 'label' => 'What improvements would you suggest?', 'required' => false],
                ]
            ],
            [
                'title' => 'Contact Request Form',
                'description' => 'Allow users to request contact from our sales team',
                'elements' => [
                    ['type' => 'text', 'label' => 'Your Name', 'required' => true],
                    ['type' => 'email', 'label' => 'Email Address', 'required' => true],
                    ['type' => 'text', 'label' => 'Phone Number', 'required' => false],
                    ['type' => 'select', 'label' => 'Interested in', 'required' => true, 'options' => ['Product Information', 'Pricing', 'Demo Request', 'Technical Support', 'Partnership']],
                    ['type' => 'textarea', 'label' => 'Message', 'required' => true],
                ]
            ],
        ];
        
        // Create forms
        foreach ($formTypes as $index => $formType) {
            // Get a random user
            $user = $users->random();
            
            // Create the form
            $form = Form::create([
                'title' => $formType['title'],
                'description' => $formType['description'],
                'user_id' => $user->id,
                'is_published' => $faker->boolean(80), // 80% chance of being published
                'slug' => Str::slug($formType['title']) . '-' . Str::random(8),
                'theme' => 'default',
                'collect_email' => $faker->boolean(),
                'one_response_per_user' => $faker->boolean(),
                'show_progress_bar' => $faker->boolean(80),
                'shuffle_questions' => $faker->boolean(20),
                'created_at' => $faker->dateTimeBetween('-3 months', '-2 days'),
                'updated_at' => $faker->dateTimeBetween('-2 days', 'now'),
            ]);
            
            // Create form elements
            $elementOrder = 0;
            foreach ($formType['elements'] as $elementData) {
                $element = $form->elements()->create([
                    'element_id' => 'element_' . Str::random(12),
                    'type' => $elementData['type'],
                    'label' => $elementData['label'],
                    'description' => $faker->optional(0.7)->sentence(),
                    'required' => $elementData['required'],
                    'order' => $elementOrder++,
                ]);
                
                // Create options for elements that need them
                if (isset($elementData['options'])) {
                    $optionOrder = 0;
                    foreach ($elementData['options'] as $optionText) {
                        $element->options()->create([
                            'option_id' => 'option_' . Str::random(12),
                            'label' => $optionText,  // Adding the label field
                            'value' => $optionText,
                            'order' => $optionOrder++,
                        ]);
                    }
                }
            }
            
            // Create random number of responses for each form (0-50)
            $responseCount = rand(0, 50);
            for ($i = 0; $i < $responseCount; $i++) {
                $startTime = $faker->dateTimeBetween('-3 months', 'now');
                $completionTime = rand(60, 900); // Between 1 and 15 minutes
                
                // Create the response
                $response = $form->responses()->create([
                    'user_id' => $faker->boolean(30) ? $users->random()->id : null,
                    'ip_address' => $faker->ipv4,
                    'user_agent' => $faker->userAgent,
                    'respondent_email' => $faker->optional(0.7)->email,
                    'completion_time' => $completionTime,
                    'created_at' => $startTime,
                    'updated_at' => $startTime,
                ]);
                
                // Create answers for each element in the form
                foreach ($form->elements as $element) {
                    // Skip section and break elements
                    if (in_array($element->type, ['section', 'break'])) {
                        continue;
                    }
                    
                    // Generate different answer values based on element type
                    $value = '';
                    switch ($element->type) {
                        case 'text':
                            $value = $faker->words(rand(1, 5), true);
                            break;
                        case 'textarea':
                            $value = $faker->paragraph;
                            break;
                        case 'email':
                            $value = $faker->email;
                            break;
                        case 'number':
                            $value = (string)$faker->numberBetween(1, 100);
                            break;
                        case 'radio':
                            $options = $element->options;
                            if ($options->count() > 0) {
                                $value = $options->random()->value;
                            }
                            break;
                        case 'select':
                            $options = $element->options;
                            if ($options->count() > 0) {
                                $value = $options->random()->value;
                            }
                            break;
                        case 'checkbox':
                            $options = $element->options;
                            if ($options->count() > 0) {
                                // Select 1-3 random options
                                $selected = $options->random(min(rand(1, 3), $options->count()));
                                $value = $selected->pluck('value')->join(', ');
                            }
                            break;
                    }
                    
                    // Create the answer
                    $response->answers()->create([
                        'form_element_id' => $element->id,
                        'value' => $value,
                    ]);
                }
            }
        }
    }
}
