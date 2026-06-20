<?php

namespace App\Http\Controllers;

use App\Models\UnitBarang;
use Inertia\Inertia;

class PublicAssetController extends Controller
{
    public function show(string $kode)
    {
        $unitBarang = UnitBarang::with(['barang.kategori', 'ruang', 'sumberDana', 'pemeliharaans' => function ($q) {
            $q->latest('tanggal')->latest('id');
        }])
            ->where('kode_inventaris', $kode)
            ->firstOrFail();

        return Inertia::render('public/asset', [
            'unit' => $unitBarang,
        ]);
    }
}
