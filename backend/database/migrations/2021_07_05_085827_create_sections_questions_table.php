<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectionsQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sections_questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('stores_sections_id')->nullable()->unsigned();
            $table->foreign('stores_sections_id')->references('id')->on('stores_sections')->onDelete('cascade');
            $table->bigInteger('questions__reviews_id')->nullable()->unsigned();
            $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sections_questions');
    }
}
