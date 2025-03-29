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
        Schema::table('news_source', function (Blueprint $table) {
            $table->bigInteger('daily_reach')->default(0)->after('viewership');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news_source', function (Blueprint $table) {
            $table->dropColumn('daily_reach');
        });
    }
};
