<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_sections', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('branche_id')->unsigned();
            $table->foreign('branche_id')->references('id')->on('branches')->onDelete('cascade');
            $table->bigInteger('stores_section_id')->unsigned();
            $table->foreign('stores_section_id')->references('id')->on('stores_sections')->onDelete('cascade');
            $table->integer('campaign_type')->default('1')->comment('1 = free , 2 = paid, 3 = coupon');
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
        Schema::dropIfExists('branch_sections');
    }
}
