<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("detail")->nullable();
            $table->string("sigTop");
            $table->string("dewey");
            $table->string("cuter");
            $table->boolean("available");
            $table->boolean("show");

            $table->bigInteger("author_id")->unsigned();
            $table->bigInteger("gender_id")->unsigned();
            $table->bigInteger("language_id")->unsigned();
            $table->bigInteger("material_id")->unsigned();

            $table->foreign('author_id')->references('id')->on('authors')
                ->cascadeOnDelete('set null')
                ->cascadeOnUpdate('cascade');
            $table->foreign('language_id')->references('id')->on('languages')
                ->cascadeOnDelete('set null')
                ->cascadeOnUpdate('cascade');
            $table->foreign('gender_id')->references('id')->on('genders')
                ->cascadeOnDelete('set null')
                ->cascadeOnUpdate('cascade');
            $table->foreign('material_id')->references('id')->on('materials')
                ->cascadeOnDelete('set null')
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
        Schema::dropIfExists('books');
    }
}
