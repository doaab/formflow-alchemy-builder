
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
        Schema::create('form_response_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained()->onDelete('cascade');
            $table->string('element_id'); // The specific form element
            $table->string('answer_value'); // Value that was selected/entered
            $table->integer('count')->default(0); // Number of times this answer was given
            $table->timestamps();
            
            // Composite index for analytics queries
            $table->index(['form_id', 'element_id', 'answer_value']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_response_analytics');
    }
};
