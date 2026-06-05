<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnitBarang extends Model
{
    protected $fillable = [
        'barang_id',
        'ruang_id',
        'sumber_dana_id',
        'tanggal_perolehan',
        'nomor_unit',
        'kode_inventaris',
        'kondisi',
        'status',
        'qr_code',
        'harga'
    ];

    protected $casts = [
        'tanggal_perolehan' => 'date',
        'harga'             => 'decimal:2',
    ];

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class);
    }

    public function ruang(): BelongsTo
    {
        return $this->belongsTo(Ruang::class);
    }

    public function sumberDana(): BelongsTo
    {
        return $this->belongsTo(SumberDana::class);
    }

    public function pemeliharaans(): HasMany
    {
        return $this->hasMany(Pemeliharaan::class);
    }
}
