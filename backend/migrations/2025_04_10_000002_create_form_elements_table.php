
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
        Schema::create('form_elements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained()->onDelete('cascade');
            $table->string('element_id')->unique(); // UUID from frontend
            $table->string('type')->comment('Reference to question_types.slug');
            $table->string('label');
            $table->text('placeholder')->nullable();
            $table->text('default_value')->nullable();
            $table->boolean('required')->default(false);
            $table->integer('order')->default(0);
            
            // Type-specific properties (can be moved to JSON column for more flexibility)
            $table->boolean('confirm_email')->nullable(); // For email fields
            $table->integer('max_stars')->nullable(); // For star rating fields
            
            // For address elements
            $table->boolean('address_expanded')->nullable();
            $table->boolean('address_street1')->nullable();
            $table->boolean('address_street2')->nullable();
            $table->boolean('address_city')->nullable();
            $table->boolean('address_state')->nullable();
            $table->boolean('address_zipcode')->nullable();
            $table->boolean('address_country')->nullable();
            
            // For phone elements
            $table->string('default_country')->nullable();
            $table->json('allowed_countries')->nullable();
            
            // For section elements
            $table->text('description')->nullable();
            
            // Conditional logic
            $table->boolean('conditional_logic_enabled')->default(false);
            $table->enum('conditional_action', ['show', 'hide'])->nullable();
            $table->enum('conditional_logic_gate', ['all', 'any'])->nullable();
            
            // Advanced properties
            $table->json('properties')->nullable()->comment('Additional type-specific properties');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_elements');
    }
};
