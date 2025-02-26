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
            $table->bigInteger('reach')->default(0)->after('pr');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('media_news', function (Blueprint $table) {
            $table->dropColumn('reach');
        });
    }
};
