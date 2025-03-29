<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('social_source', function (Blueprint $table) {
            $table->id();
            $table->integer('id_socmed');
            $table->string('username', 255)->nullable();
            $table->bigInteger('followers')->default(0);
            $table->bigInteger('following')->default(0);
            $table->bigInteger('likes')->default(0);
            $table->text('profile_picture')->nullable();
            $table->string('full_name', 255)->nullable();
            $table->string('website', 255)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('phone', 255)->nullable();
            $table->text('bio')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('social_source');
    }
};
