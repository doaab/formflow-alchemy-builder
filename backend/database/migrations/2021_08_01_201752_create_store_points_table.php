<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorePointsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_points', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->integer('operation_type')->nullable()->comment('1 = Recharge the balance , 2 = Balance withdrawal, 3 = reviews');
            $table->bigInteger('reviews__campaign_id')->nullable()->unsigned();
            $table->foreign('reviews__campaign_id')->references('id')->on('reviews__campaigns')->onDelete('cascade');
            $table->double('value');
            $table->decimal('total_amount', 8, 2)->nullable();
            $table->decimal('point_price', 8, 2)->nullable();
            $table->decimal('added_tax', 8, 2)->nullable();
            $table->tinyInteger('state')->nullable()->default('1')->comment('1 = No payment , 2 = payment, 3 = deleted , 4 = activated');
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
        Schema::dropIfExists('store_points');
    }
}
