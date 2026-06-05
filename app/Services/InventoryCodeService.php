<?php

namespace App\Services;

use App\Models\Barang;
use App\Models\SumberDana;
use App\Models\UnitBarang;

class InventoryCodeService
{
    

    public function generate(int $barangId, int $sumberDanaId, string $tanggalPerolehan, ?int $customNomorUnit = null): array
    {
        $barang = Barang::with('kategori')->findOrFail($barangId);
        $sumberDana = SumberDana::findOrFail($sumberDanaId);

        
        $kodeKategori = $barang->kategori->kode ?? 'CAT';

        
        $tglPerolehan = date('d.m.y', strtotime($tanggalPerolehan));

        
        $kodeSumberDana = $sumberDana->kode ?? 'X';

        
        if ($customNomorUnit !== null) {
            $nomorUnitVal = $customNomorUnit;
        } else {
            $maxNomorUnit = UnitBarang::where('barang_id', $barangId)->max('nomor_unit') ?? 0;
            $nomorUnitVal = $maxNomorUnit + 1;
        }
        $nomorUnitStr = sprintf('%03d', $nomorUnitVal);

        
        $kodeInventaris = "{$kodeKategori}/{$tglPerolehan}/{$kodeSumberDana}-{$nomorUnitStr}";

        return [
            'kode_inventaris' => $kodeInventaris,
            'nomor_unit' => $nomorUnitVal,
        ];
    }
}
