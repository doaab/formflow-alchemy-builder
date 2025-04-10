
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('question_types', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();  // e.g., 'text', 'paragraph', 'dropdown'
            $table->string('name');  // Display name, e.g., 'Text Input', 'Paragraph Text'
            $table->string('category');  // e.g., 'Basic Fields', 'Choice Fields', 'Rating Fields'
            $table->text('description')->nullable();
            $table->json('default_properties')->nullable();  // Default properties for this question type
            $table->boolean('is_active')->default(true);  // To easily disable certain question types
            $table->timestamps();
        });

        // Seed with initial question types
        DB::table('question_types')->insert([
            ['slug' => 'text', 'name' => 'Text Input', 'category' => 'Basic Fields', 'description' => 'Single line text input for short text', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'paragraph', 'name' => 'Paragraph Text', 'category' => 'Basic Fields', 'description' => 'Multi-line text input for longer responses', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'number', 'name' => 'Number', 'category' => 'Basic Fields', 'description' => 'Input field that accepts only numerical values', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'email', 'name' => 'Email', 'category' => 'Basic Fields', 'description' => 'Input field for collecting email addresses', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'dropdown', 'name' => 'Dropdown', 'category' => 'Choice Fields', 'description' => 'Select field with predefined options', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'radio', 'name' => 'Multiple Choice', 'category' => 'Choice Fields', 'description' => 'Radio buttons for selecting one option from many', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'checkbox', 'name' => 'Checkboxes', 'category' => 'Choice Fields', 'description' => 'Checkbox fields for selecting multiple options', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'date', 'name' => 'Date', 'category' => 'Choice Fields', 'description' => 'Date picker for selecting dates', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'face', 'name' => 'Face Rating', 'category' => 'Rating Fields', 'description' => 'Emoji-based satisfaction rating', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'star', 'name' => 'Star Rating', 'category' => 'Rating Fields', 'description' => 'Star-based rating selection', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'phone', 'name' => 'Phone', 'category' => 'Basic Fields', 'description' => 'Input field for collecting phone numbers', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'address', 'name' => 'Address', 'category' => 'Basic Fields', 'description' => 'Input fields for collecting physical addresses', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'section', 'name' => 'Section', 'category' => 'Layout Elements', 'description' => 'Section header for organizing elements', 'created_at' => now(), 'updated_at' => now()],
            ['slug' => 'break', 'name' => 'Page Break', 'category' => 'Layout Elements', 'description' => 'Creates a new page in multi-page forms', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_types');
    }
};
