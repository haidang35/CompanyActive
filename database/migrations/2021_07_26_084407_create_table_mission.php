<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableMission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("mission_title");
            $table->text("mission_content");
            $table->dateTime("mission_deadline");
            $table->text("mission_note")->nullable();
            $table->tinyInteger("mission_status")->default(0);
            $table->integer("pic_id");
            $table->integer("staff_id");
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
        Schema::dropIfExists('missions');
    }
}
