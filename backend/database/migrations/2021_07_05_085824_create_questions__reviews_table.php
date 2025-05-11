<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions__reviews', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->nullable()->unsigned();
            $table->foreign('store_id')->nullable()->references('id')->on('stores')->onDelete('cascade');
            $table->bigInteger('stores_category_id')->nullable()->unsigned();
            $table->foreign('stores_category_id')->nullable()->references('id')->on('stores_categories');
            $table->tinyInteger('question_type')->default('1')
                ->comment('1:Choices, 2:Stars, 3:Text input, 4:faces, 5:date, 6:NPS, 7:MultiChoice, 8:CSAT, 9:audio, 10:Information, 11: Performance
                , 12:slider, 13:files, 14:toggle');
            $table->integer('is_auto')->default(0)->comment('0 = False , 1 = True');
            $table->integer('view_method')->default(1)->comment('1 = List , 2 = Dropdown');
            $table->string('minimum_value')->default(null)->nullable();
            $table->string('maximum_value')->default(null)->nullable();
            $table->string('increase_value')->default(null)->nullable();
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
        Schema::dropIfExists('questions__reviews');
    }
}
