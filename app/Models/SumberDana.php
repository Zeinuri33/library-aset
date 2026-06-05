<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SumberDana extends Model
{
    protected $fillable = ['kode', 'nama'];

    public function unitBarangs(): HasMany
    {
        return $this->hasMany(UnitBarang::class);
    }
}
