<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsAnalysesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained();
            $table->foreignId('survey_id')->constrained();
            $table->integer('question_id');
            $table->text('text')->nullable();
            $table->date('date')->nullable();
            $table->double('sentiment_score')->nullable();
            $table->double('sentiment_magnitude')->nullable();
            $table->string('classification_categories')->nullable();
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
        Schema::dropIfExists('reviews_analyses');
    }
}
