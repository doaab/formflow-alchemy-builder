<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('branch_id')->nullable()->unsigned();
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
            $table->bigInteger('stores_category_id')->nullable()->unsigned();
            $table->foreign('stores_category_id')->references('id')->on('stores_categories')->onDelete('cascade');
            $table->string('photo')->nullable();
            $table->string('banner')->nullable();
            $table->text('header_text')->nullable();
            $table->string('qr_code_path')->nullable();
            $table->integer('reward_type')->default(1)->comment('1 = Message of thanks , 2 = points, 3 = coupons, 4 = coupons single use');
            $table->bigInteger('coupon_id')->nullable()->unsigned();
            $table->foreign('coupon_id')->nullable()->references('id')->on('coupons')->onDelete('cascade');
            $table->integer('randomly_generate_link')->default(1)->comment('0 = false , 1 = true');
            $table->integer('type_authentication')->default(1)->comment('1: There is no authentication, 2: Send OTP');
            $table->integer('order_num')->nullable();
            $table->tinyInteger('use_company_logo')->default(1)->comment('0 = false , 1 = true');
            $table->tinyInteger('rewards')->default(0)->comment('0 = false , 1 = true');
            $table->tinyInteger('advanced_setting')->default(0)->comment('0 = false , 1 = true');
            $table->integer('allow_participating')->default(1)->comment('1 = Multiple participating, 2 = Single participating');
            $table->tinyInteger('logic_style')->default(0)->comment('0 = false , 1 = true');
            $table->string('summary_option')->nullable()->default('no summary')->comment('no summary, new review, custom');
            $table->time('summary_time')->nullable();
            $table->integer('state')->default(1)->comment('1 = activated , 2 = disabled, 3 = deleted');
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
        Schema::dropIfExists('surveys');
    }
}
