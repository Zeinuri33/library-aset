<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('unit_barangs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('barang_id')->constrained('barangs')->cascadeOnDelete();
            $table->foreignId('ruang_id')->nullable()->constrained('ruangs')->nullOnDelete();
            $table->foreignId('sumber_dana_id')->nullable()->constrained('sumber_danas')->nullOnDelete();
            $table->date('tanggal_perolehan')->nullable();
            $table->decimal('harga', 15, 2)->default(0);
            $table->unsignedInteger('nomor_unit');
            $table->string('kode_inventaris')->unique();
            $table->string('kondisi')->default('baik');
            $table->string('status')->default('tersedia');
            $table->string('qr_code')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('unit_barangs');
    }
};
