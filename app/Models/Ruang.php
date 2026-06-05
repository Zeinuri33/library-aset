<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ruang extends Model
{
    protected $fillable = ['nama', 'gedung', 'kode'];

    public function unitBarangs(): HasMany
    {
        return $this->hasMany(UnitBarang::class);
    }
}
