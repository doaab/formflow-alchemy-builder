
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
        Schema::create('form_element_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_element_id')->constrained()->onDelete('cascade');
            $table->string('option_id')->unique(); // UUID from frontend
            $table->string('label');
            $table->string('value');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_element_options');
    }
};
