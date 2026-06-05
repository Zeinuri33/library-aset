<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pemeliharaans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('unit_barang_id')->constrained('unit_barangs')->cascadeOnDelete();
            $table->date('tanggal');
            $table->string('kategori')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('petugas')->nullable();
            $table->decimal('biaya', 15, 2)->default(0);
            $table->string('bukti')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pemeliharaans');
    }
};
