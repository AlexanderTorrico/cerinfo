<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardGenderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_gender', function (Blueprint $table) {
            $table->id();

            $table->float('fine',5,2);
            $table->integer('days');

            $table->bigInteger("card_id")->unsigned()->nullable();
            $table->bigInteger("gender_id")->unsigned()->nullable();


            $table->foreign('card_id')->references('id')->on('cards')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');

            $table->foreign('gender_id')->references('id')->on('genders')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');
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
        Schema::dropIfExists('card_gender');
    }
}
