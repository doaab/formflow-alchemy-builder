<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->integer('wa_service_provider_id')->nullable()->constrained('wa_service_providers')->onDelete('cascade');
            $table->integer('store_id')->nullable()->constrained('stores')->onDelete('cascade');
            $table->tinyText('name'); // store name
            $table->tinyText('owner_name')->nullable();
            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('email_token')->nullable();
            $table->tinyText('password');
            $table->tinyText('main_address')->nullable();
            $table->tinyText('commercial_register_no')->nullable();
            $table->string('commercial_register_image')->nullable();
            $table->text('description')->nullable();
            $table->double('points')->nullable()->default('0');
            $table->double('reviews_balance')->nullable()->default('0');
            $table->double('paid_reviews_balance')->nullable()->default('0');
            $table->string('website_url')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('landline_phone')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('tiktok_url')->nullable();
            $table->tinyInteger('store_state_whole')->nullable()->default('3')->comment('1 = Open , 2 = Close, 3 = Time');
            $table->integer('payment_result')->nullable()->default('0')->comment('0 = No payment , 1 = payment true, 2 = payment false');
            $table->integer('registration_completed')->nullable()->default('0')->comment('0 = new , 1 = no section, 2 = no branch, 3 = no image, 4 = done');
            $table->integer('subscription_type')->nullable()->default('1')->comment('1 = Free , 2 = Medium, 3 = Professional');
            $table->integer('subscription_period')->nullable()->default('1')->comment('1 = Open, 2 = Month, 3 = Year');
            $table->string('package_end_date')->nullable();
            $table->string('reviews_balance_reset_date')->nullable();
            $table->integer('confirmed_package')->default(0)->comment('1 = True, 0 = False');
            $table->tinyInteger('state')->nullable()->default('1')->comment('1 = activated , 2 = stopped, 3 = deleted, 4 = No payment ');
            $table->string('branches_access')->default('all');
            $table->boolean('export_data')->default(0)->comment('1 = True, 0 = False');
            $table->rememberToken();
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
        Schema::dropIfExists('stores');
        // Schema::table('stores', function (Blueprint $table) {
        //     $table->dropSpatialIndex(['coordinate']); // either an array of column names or the index name
        // });
    }
}
