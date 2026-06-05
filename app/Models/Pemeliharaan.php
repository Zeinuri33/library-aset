<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pemeliharaan extends Model
{
    protected $fillable = [
        'unit_barang_id',
        'tanggal',
        'kategori',
        'deskripsi',
        'petugas',
        'biaya',
        'bukti'
    ];

    public function unitBarang(): BelongsTo
    {
        return $this->belongsTo(UnitBarang::class);
    }
}
