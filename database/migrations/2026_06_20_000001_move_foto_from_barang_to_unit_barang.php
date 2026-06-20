<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('unit_barangs', function (Blueprint $table) {
            $table->string('foto')->nullable()->after('qr_code');
        });

        Schema::table('barangs', function (Blueprint $table) {
            $table->dropColumn('thumbnail');
        });
    }

    public function down(): void
    {
        Schema::table('barangs', function (Blueprint $table) {
            $table->string('thumbnail')->nullable()->after('nama_barang');
        });

        Schema::table('unit_barangs', function (Blueprint $table) {
            $table->dropColumn('foto');
        });
    }
};
