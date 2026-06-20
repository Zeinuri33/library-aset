<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\KategoriBarang;
use App\Models\Ruang;
use App\Models\SumberDana;
use App\Models\Barang;
use App\Models\UnitBarang;
use App\Models\Pemeliharaan;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    

    public function run(): void
    {
        
        User::factory()->create([
            'name' => 'Admin Inventaris',
            'username' => 'admin_inventaris',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);

        
        $elektronik = KategoriBarang::create([
            'kode' => 'B16',
            'nama' => 'Peralatan Elektronik',
        ]);

        $furnitur = KategoriBarang::create([
            'kode' => 'F02',
            'nama' => 'Furnitur Kantor',
        ]);

        $kendaraan = KategoriBarang::create([
            'kode' => 'K05',
            'nama' => 'Kendaraan Operasional',
        ]);

        
        $lab = Ruang::create([
            'nama' => 'Lab Komputer Utama',
            'gedung' => 'Gedung A',
            'kode' => 'LAB-A2',
        ]);

        $ruangGuru = Ruang::create([
            'nama' => 'Ruang Staf & Guru',
            'gedung' => 'Gedung B',
            'kode' => 'STF-B1',
        ]);

        $aula = Ruang::create([
            'nama' => 'Aula Serbaguna',
            'gedung' => 'Gedung C',
            'kode' => 'AUL-C1',
        ]);

        
        $bos = SumberDana::create([
            'kode' => 'BOS',
            'nama' => 'Bantuan Operasional Sekolah',
        ]);

        $apbn = SumberDana::create([
            'kode' => 'I',
            'nama' => 'APBN',
        ]);

        $apbd = SumberDana::create([
            'kode' => 'II',
            'nama' => 'APBD',
        ]);

        
        $barangLaptop = Barang::create([
            'nama_barang' => 'Laptop Lenovo Thinkpad T14',
            'kategori_barang_id' => $elektronik->id,
            'deskripsi' => 'Laptop inventaris untuk staff IT dan pengembang.',
            'thumbnail' => null,
        ]);

        $kursi = Barang::create([
            'kategori_barang_id' => $furnitur->id,
            'nama_barang' => 'Kursi Ergonomis Kantor',
            'deskripsi' => 'Kursi putar hidrolik dengan sandaran jaring mesh hitam.',
        ]);

        
        $unitLaptop1 = UnitBarang::create([
            'barang_id' => $barangLaptop->id,
            'ruang_id' => $lab->id,
            'sumber_dana_id' => $bos->id,
            'tanggal_perolehan' => '2025-01-16',
            'nomor_unit' => 1,
            'kode_inventaris' => 'B16/16.01.25/BOS-001',
            'kondisi' => 'baik',
            'status' => 'tersedia',
            'harga' => 8500000,
            'qr_code' => 'B16/16.01.25/BOS-001',
        ]);

        $unitLaptop2 = UnitBarang::create([
            'barang_id' => $barangLaptop->id,
            'ruang_id' => $lab->id,
            'sumber_dana_id' => $bos->id,
            'tanggal_perolehan' => '2025-01-16',
            'nomor_unit' => 2,
            'kode_inventaris' => 'B16/16.01.25/BOS-002',
            'kondisi' => 'baik',
            'status' => 'tersedia',
            'harga' => 8500000,
            'qr_code' => 'B16/16.01.25/BOS-002',
        ]);

        $unitLaptop3 = UnitBarang::create([
            'barang_id' => $barangLaptop->id,
            'ruang_id' => $ruangGuru->id,
            'sumber_dana_id' => $apbn->id,
            'tanggal_perolehan' => '2025-02-20',
            'nomor_unit' => 3,
            'kode_inventaris' => 'B16/20.02.25/I-003',
            'kondisi' => 'rusak_ringan',
            'status' => 'diperbaiki',
            'harga' => 8500000,
            'qr_code' => 'B16/20.02.25/I-003',
        ]);

        $unitKursi1 = UnitBarang::create([
            'barang_id' => $kursi->id,
            'ruang_id' => $ruangGuru->id,
            'sumber_dana_id' => $apbd->id,
            'tanggal_perolehan' => '2026-03-01',
            'nomor_unit' => 1,
            'kode_inventaris' => 'F02/01.03.26/II-001',
            'kondisi' => 'baik',
            'status' => 'tersedia',
            'harga' => 1200000,
            'qr_code' => 'F02/01.03.26/II-001',
        ]);

        
        Pemeliharaan::create([
            'unit_barang_id' => $unitKursi1->id,
            'tanggal' => '2026-05-10',
            'kategori' => 'Perbaikan',
            'deskripsi' => 'Instalasi ulang OS Windows dan penggantian keyboard unit laptop staf.',
            'petugas' => 'Budi Santoso',
            'biaya' => 250000,
        ]);
    }
}
