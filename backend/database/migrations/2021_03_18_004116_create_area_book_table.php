<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreaBookTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('area_book', function (Blueprint $table) {
            $table->id();

            $table->bigInteger("area_id")->unsigned();
            $table->bigInteger("book_id")->unsigned();

            $table->foreign('area_id')->references('id')->on('areas')
                ->cascadeOnDelete('cascade')
                ->cascadeOnUpdate('cascade');
            $table->foreign('book_id')->references('id')->on('books')
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
        Schema::dropIfExists('area_book');
    }
}
