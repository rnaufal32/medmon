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
        Schema::table('media_news', function (Blueprint $table) {
            $table->string('page', 10)->nullable()->after('publisher');
            $table->bigInteger('ad')->default(0)->after('page');
            $table->bigInteger('pr')->default(0)->after('ad');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media_news', function (Blueprint $table) {
            //
        });
    }
};
