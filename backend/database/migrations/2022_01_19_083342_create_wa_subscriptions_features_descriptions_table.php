<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaSubscriptionsFeaturesDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wa_subscriptions_feature_descriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('wa_subscription_id')->constrained('wa_subscriptions')->onDelete('cascade');
            $table->string('title_ar');
            $table->string('title_en');
            $table->boolean('supported');
            $table->tinyInteger('state')->default('1')->comment('1 = activated , 2 = disabled, 3 = deleted');
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
        Schema::dropIfExists('wa_subscriptions_feature_descriptions');
    }
}
