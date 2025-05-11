<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('questions__reviews_id')->unsigned();
            $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->tinyInteger('type')->default(1)->comment('1:One question, 2:Sub-questions');
            $table->double('percentage');
            $table->integer('order_num')->default(1)->nullable();
            $table->tinyInteger('state')->nullable()->default('1')->comment('1 = activated , 2 = disabled, 3 = deleted');
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
        Schema::dropIfExists('performance_questions');
    }
}
