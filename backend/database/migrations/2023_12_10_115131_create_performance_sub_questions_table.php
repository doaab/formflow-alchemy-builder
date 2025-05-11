<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerformanceSubQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_sub_questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('performance_questions_id')->unsigned();
            $table->foreign('performance_questions_id')->references('id')->on('performance_questions')->onDelete('cascade');
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
        Schema::dropIfExists('performance_sub_questions');
    }
}
