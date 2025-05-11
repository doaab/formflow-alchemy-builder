<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews_questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('stores_sections_reviews_id')->nullable()->unsigned();
            $table->foreign('stores_sections_reviews_id')->references('id')->on('stores_sections_reviews')->onDelete('cascade');
            $table->integer('stars')->nullable();
            $table->bigInteger('questions__reviews_id')->nullable()->unsigned();
            $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->bigInteger('questions__answers_id')->nullable()->nullable()->unsigned();
            $table->foreign('questions__answers_id')->references('id')->on('questions__answers')->onDelete('cascade');
            $table->integer('review_type')->nullable()->comment('1 = branche , 2 = section');
            $table->text('answer_text')->nullable();
            $table->text('comment')->nullable();
            $table->text('files')->nullable();
            $table->string('audio_file_name')->nullable();
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
        Schema::dropIfExists('reviews_questions');
    }
}
