<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaServiceSubscriptionsFeaturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wa_service_subscriptions_features', function (Blueprint $table) {
            $table->id();
            $table->integer('wa_feature_id')->constrained('wa_features')->onDelete('cascade');
            $table->integer('wa_service_subscription_id')->constrained('wa_service_subscriptions')->onDelete('cascade');
            $table->string('value');
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
        Schema::dropIfExists('wa_service_subscriptions_features');
    }
}
