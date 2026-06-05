<?php

namespace App\Services;

use App\Models\Barang;
use App\Models\KategoriBarang;
use App\Models\Pemeliharaan;
use App\Models\Ruang;
use App\Models\SumberDana;
use App\Models\UnitBarang;

class DashboardService
{
    

    public function getStatistics(): array
    {
        return [
            'total_barang'          => Barang::count(),
            'total_unit_inventaris' => UnitBarang::count(),
            'total_kategori'        => KategoriBarang::count(),
            'total_ruang'           => Ruang::count(),
            'total_sumber_dana'     => SumberDana::count(),
            'total_nilai_aset'      => (float) UnitBarang::sum('harga'),
            'recent_maintenance'    => $this->getRecentMaintenance(),
            'recent_inventory'      => $this->getRecentInventory(),
            'chart_kategori'        => $this->getChartKategori(),
            'chart_kondisi'         => $this->getChartKondisi(),
            'chart_maintenance'     => $this->getChartMaintenance(),
            'chart_inventory'       => $this->getChartInventory(),
        ];
    }

    private function getChartKategori()
    {
        return KategoriBarang::withCount('barangs')
            ->orderByDesc('barangs_count')
            ->take(5)
            ->get()
            ->map(function ($cat) {
                $count = UnitBarang::whereHas('barang', function ($q) use ($cat) {
                    $q->where('kategori_barang_id', $cat->id);
                })->count();
                $value = UnitBarang::whereHas('barang', function ($q) use ($cat) {
                    $q->where('kategori_barang_id', $cat->id);
                })->sum('harga');
                return [
                    'name' => $cat->nama,
                    'count' => $count,
                    'value' => (float) $value
                ];
            });
    }

    private function getChartKondisi()
    {
        return [
            ['name' => 'Baik', 'value' => UnitBarang::where('kondisi', 'baik')->count(), 'color' => '#10B981'],
            ['name' => 'Rusak Ringan', 'value' => UnitBarang::where('kondisi', 'rusak_ringan')->count(), 'color' => '#F59E0B'],
            ['name' => 'Rusak Berat', 'value' => UnitBarang::where('kondisi', 'rusak_berat')->count(), 'color' => '#EF4444'],
        ];
    }

    private function getChartMaintenance()
    {
        $maintenanceData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $monthName = $date->translatedFormat('M Y');
            $sum = Pemeliharaan::whereMonth('tanggal', $date->month)
                ->whereYear('tanggal', $date->year)
                ->sum('biaya');
            $maintenanceData[] = [
                'label' => $monthName,
                'value' => (float) $sum
            ];
        }
        return $maintenanceData;
    }

    private function getChartInventory()
    {
        $inventoryData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $monthName = $date->translatedFormat('M Y');
            $count = UnitBarang::whereMonth('tanggal_perolehan', $date->month)
                ->whereYear('tanggal_perolehan', $date->year)
                ->count();
            $inventoryData[] = [
                'label' => $monthName,
                'value' => $count
            ];
        }
        return $inventoryData;
    }

    

    private function getRecentMaintenance(int $limit = 5)
    {
        return Pemeliharaan::with([
                'unitBarang' => function ($query) {
                    $query->select('id', 'barang_id', 'ruang_id', 'kode_inventaris', 'kondisi');
                },
                'unitBarang.barang' => function ($query) {
                    $query->select('id', 'nama_barang');
                },
                'unitBarang.ruang' => function ($query) {
                    $query->select('id', 'nama');
                }
            ])
            ->select('id', 'unit_barang_id', 'tanggal', 'deskripsi', 'biaya')
            ->latest('tanggal')
            ->latest('id')
            ->take($limit)
            ->get();
    }

    

    private function getRecentInventory(int $limit = 5)
    {
        return UnitBarang::with([
                'barang' => function ($query) {
                    $query->select('id', 'nama_barang', 'kategori_barang_id');
                },
                'ruang' => function ($query) {
                    $query->select('id', 'nama');
                },
                'sumberDana' => function ($query) {
                    $query->select('id', 'nama');
                }
            ])
            ->latest('tanggal_perolehan')
            ->latest('id')
            ->take($limit)
            ->get();
    }
}
