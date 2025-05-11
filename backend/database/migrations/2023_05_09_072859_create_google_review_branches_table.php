<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGoogleReviewBranchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('google_review_branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained();
            $table->foreignId('branch_id')->constrained();
            $table->string('name');
            $table->string('address');
            $table->string('lat');
            $table->string('lng');
            $table->string('url')->nullable();
            $table->string('place_id');
            $table->string('image_license');
            $table->double('old_rating');
            $table->double('rating');
            $table->tinyInteger('state')->default('1')->comment('1 = under review , 2 = rejected, 3 = acceptance');
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
        Schema::dropIfExists('google_review_branches');
    }
}
