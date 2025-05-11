<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveyQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('survey_questions', function (Blueprint $table) {
            $table->id();
            $table->integer('is_optional')->default(0)->comment('0 = False , 1 = True');
            $table->integer('is_analysis_question')->default(0)->comment('0 = False , 1 = True');
            $table->date('start_date_analysis')->nullable();
            $table->date('end_date_analysis')->nullable();
            $table->bigInteger('survey_id')->unsigned();
            $table->foreign('survey_id')->references('id')->on('surveys')->onDelete('cascade');
            $table->bigInteger('questions__reviews_id')->nullable()->unsigned();
            $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->integer('order_num')->nullable();
            $table->string('next_question_id')->nullable();
            $table->text('logic_questions')->nullable();
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
        Schema::dropIfExists('survey_questions');
    }
}
