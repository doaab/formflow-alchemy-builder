
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
        Schema::create('conditional_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_element_id')->constrained()->onDelete('cascade');
            $table->string('question_id'); // Element ID this condition depends on
            $table->enum('operator', ['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than']);
            $table->string('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conditional_rules');
    }
};
