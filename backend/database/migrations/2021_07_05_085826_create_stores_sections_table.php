<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores_sections', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('store_id')->unsigned();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->tinyText('name');
            $table->integer('campaign_type')->default('1')->comment('1 = free , 2 = paid');
            $table->integer('review_type');
            $table->string('qr_code_path')->nullable();
            // $table->string('questions_ids')->nullable();
            // $table->bigInteger('questions__reviews_id')->nullable()->unsigned();
            // $table->foreign('questions__reviews_id')->references('id')->on('questions__reviews')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->integer('type')->default('1')->comment('1 = offline , 2 = online');
            $table->integer('reward_type')->default('1')->comment('1 = Message of thanks , 2 = points, 3 = coupons, 4 = coupons single use');
            $table->integer('coupon_id')->nullable()->constrained('coupons')->onDelete('cascade');
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
        Schema::dropIfExists('stores_sections');
    }
}
