<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\KategoriBarang;
use App\Models\Ruang;
use App\Models\SumberDana;
use App\Models\UnitBarang;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;

class ImportController extends Controller
{
    

    public function index()
    {
        return Inertia::render('inventory/import');
    }

    

    public function preview(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv,txt|max:10240'
        ]);

        $file     = $request->file('file');
        $filePath = $file->getRealPath();

        try {
            $spreadsheet = IOFactory::load($filePath);
            $sheet       = $spreadsheet->getActiveSheet();
            $rawRows     = $sheet->toArray(null, true, true, true);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal membaca file: ' . $e->getMessage()], 422);
        }

        if (count($rawRows) < 2) {
            return response()->json(['error' => 'File kosong atau tidak memiliki baris data.'], 422);
        }

        
        $headers   = array_values(array_shift($rawRows));
        $headerMap = $this->mapHeaders($headers);

        $previewData = [];
        $totalRows   = count($rawRows);
        $count       = 0;

        foreach ($rawRows as $rowKey => $rowValues) {
            $rowValues = array_values($rowValues);

            
            if (empty(array_filter($rowValues))) {
                $totalRows--;
                continue;
            }

            $count++;
            if ($count > 10) {
                continue; 
            }

            $mapped     = $this->mapRowToFields($rowValues, $headerMap);
            $validation = $this->validateRow($mapped, $rowKey);

            $previewData[] = [
                'row_number' => $rowKey,
                'raw'        => $mapped,
                'valid'      => $validation['valid'],
                'errors'     => $validation['errors'],
                'exists'     => $validation['exists'],
            ];
        }

        return response()->json([
            'headers' => [
                'no_inventaris'    => 'No. Inventaris',
                'nama'             => 'Nama',
                'kategori'         => 'Kategori',
                'volume'           => 'Volume',
                'harga'            => 'Harga',
                'tanggal_pembelian'=> 'Tanggal Pembelian',
                'sumber_dana'      => 'Sumber Dana',
                'kondisi'          => 'Kondisi',
                'lokasi'           => 'Lokasi',
            ],
            'preview'    => $previewData,
            'total_rows' => $totalRows,
        ]);
    }

    

    public function import(Request $request)
    {
        $request->validate([
            'file'             => 'required|file|mimes:xlsx,xls,csv,txt|max:10240',
            'duplicate_option' => 'required|in:skip,overwrite',
        ]);

        $file            = $request->file('file');
        $filePath        = $file->getRealPath();
        $duplicateOption = $request->input('duplicate_option');

        try {
            $spreadsheet = IOFactory::load($filePath);
            $sheet       = $spreadsheet->getActiveSheet();
            $rawRows     = $sheet->toArray(null, true, true, true);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal membaca file: ' . $e->getMessage()], 422);
        }

        if (count($rawRows) < 2) {
            return response()->json(['error' => 'File kosong atau tidak memiliki baris data.'], 422);
        }

        $headers   = array_values(array_shift($rawRows));
        $headerMap = $this->mapHeaders($headers);

        $stats = [
            'total'    => 0,
            'imported' => 0,
            'skipped'  => 0,
            'failed'   => 0,
            'errors'   => [],
        ];

        DB::beginTransaction();

        try {
            foreach ($rawRows as $rowKey => $rowValues) {
                $rowValues = array_values($rowValues);

                
                if (empty(array_filter($rowValues))) {
                    continue;
                }

                $stats['total']++;
                $mapped     = $this->mapRowToFields($rowValues, $headerMap);
                $validation = $this->validateRow($mapped, $rowKey);

                if (! $validation['valid']) {
                    $stats['failed']++;
                    $stats['errors'][] = [
                        'row'          => $rowKey,
                        'no_inventaris'=> $mapped['no_inventaris'] ?? '-',
                        'nama'         => $mapped['nama'] ?? '-',
                        'message'      => implode(', ', $validation['errors']),
                    ];
                    continue;
                }

                
                $existing = UnitBarang::where('kode_inventaris', $mapped['no_inventaris'])->first();
                if ($existing && $duplicateOption === 'skip') {
                    $stats['skipped']++;
                    continue;
                }

                
                $kategoriName = trim($mapped['kategori']);
                $kategori     = KategoriBarang::where('nama', $kategoriName)->first();
                if (! $kategori) {
                    $kategori = KategoriBarang::create([
                        'nama' => $kategoriName,
                        'kode' => $this->generateUniqueCode(KategoriBarang::class, $kategoriName),
                    ]);
                }

                
                $lokasiName = trim($mapped['lokasi'] ?: 'Tidak Diketahui');
                $ruang      = Ruang::where('nama', $lokasiName)->first();
                if (! $ruang) {
                    $ruang = Ruang::create([
                        'nama'   => $lokasiName,
                        'gedung' => '-',
                        'kode'   => $this->generateUniqueCode(Ruang::class, $lokasiName),
                    ]);
                }

                
                $sumberDanaName = trim($mapped['sumber_dana'] ?: 'APBN');
                $sumberDana     = SumberDana::where('nama', $sumberDanaName)->first();
                if (! $sumberDana) {
                    $sumberDana = SumberDana::create([
                        'nama' => $sumberDanaName,
                        'kode' => $this->generateUniqueCode(SumberDana::class, $sumberDanaName),
                    ]);
                }

                
                $barangName = trim($mapped['nama']);
                $barang     = Barang::where('nama_barang', $barangName)
                    ->where('kategori_barang_id', $kategori->id)
                    ->first();
                if (! $barang) {
                    $barang       = Barang::create([
                        'nama_barang'       => $barangName,
                        'kategori_barang_id'=> $kategori->id,
                        'deskripsi'         => 'Diimpor otomatis dari Excel',
                    ]);
                }

                
                
                $nomorUnit = 1;
                if (! empty($mapped['volume']) && is_numeric($mapped['volume'])) {
                    $nomorUnit = (int) $mapped['volume'];
                } elseif (preg_match('/-(\d+)$/', $mapped['no_inventaris'], $matches)) {
                    $nomorUnit = (int) $matches[1];
                }

                
                $kondisi    = 'baik';
                $rawKondisi = strtolower(trim($mapped['kondisi'] ?? ''));
                if (str_contains($rawKondisi, 'ringan') || $rawKondisi === 'rusak_ringan') {
                    $kondisi = 'rusak_ringan';
                } elseif (str_contains($rawKondisi, 'berat') || $rawKondisi === 'rusak_berat') {
                    $kondisi = 'rusak_berat';
                }

                
                $kodeInventaris = $mapped['no_inventaris'];

                $dataUnit = [
                    'barang_id'         => $barang->id,
                    'ruang_id'          => $ruang->id,
                    'sumber_dana_id'    => $sumberDana->id,
                    'tanggal_perolehan' => $mapped['tanggal_pembelian'],
                    'nomor_unit'        => $nomorUnit,
                    'kode_inventaris'   => $kodeInventaris,
                    'kondisi'           => $kondisi,
                    'status'            => 'tersedia',
                    'qr_code'           => $kodeInventaris,  
                    'harga'             => $mapped['harga'],
                ];

                if ($existing && $duplicateOption === 'overwrite') {
                    $existing->update($dataUnit);
                } else {
                    UnitBarang::create($dataUnit);
                }

                $stats['imported']++;
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Import gagal: ' . $e->getMessage()], 500);
        }

        return response()->json($stats);
    }

    

    public function template()
    {
        $headers = [
            'No. Inventaris',
            'Nama',
            'Kategori',
            'Volume',
            'Harga',
            'Tanggal Pembelian',
            'Sumber Dana',
            'Kondisi',
            'Lokasi',
        ];

        $mockData = [
            ['B16/01.01.00/II/0002-001', 'Laptop Lenovo ThinkPad T14', 'Peralatan Elektronik', '1', '17500000', '2026-05-10', 'APBN', 'baik', 'Ruang Rapat Utama'],
            ['B16/01.01.00/II/0002-002', 'Meja Rapat Kayu Jati',       'Furnitur',              '1', '4500000',  '2026-05-12', 'APBD', 'baik', 'Ruang Rapat Utama'],
            ['B16/01.01.00/II/0002-003', 'Proyektor Epson EB-E500',    'Peralatan Elektronik', '1', '6800000',  '2026-05-15', 'APBN', 'rusak_ringan', 'AULA Utama'],
        ];

        $filename = 'template_import_inventaris.csv';
        header('Content-Type: text/csv; charset=UTF-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Pragma: no-cache');
        header('Expires: 0');

        $handle = fopen('php://output', 'w');

        
        fwrite($handle, chr(0xEF) . chr(0xBB) . chr(0xBF));

        fputcsv($handle, $headers);
        foreach ($mockData as $row) {
            fputcsv($handle, $row);
        }

        fclose($handle);
        exit;
    }

    
    
    

    

    private function mapHeaders(array $headers): array
    {
        $map         = [];
        $expectedMap = [
            'no_inventaris'     => ['no. inventaris', 'no inventaris', 'kode inventaris', 'nomor inventaris', 'no', 'kode', 'no.inventaris'],
            'nama'              => ['nama', 'nama barang', 'barang', 'title', 'uraian'],
            'kategori'          => ['kategori', 'kategori barang'],
            'volume'            => ['volume', 'jumlah', 'qty', 'unit', 'jml'],
            'harga'             => ['harga', 'harga aset', 'nilai', 'harga satuan', 'nilai aset'],
            'tanggal_pembelian' => ['tanggal pembelian', 'tanggal', 'tgl perolehan', 'tgl pembelian', 'perolehan', 'tanggal perolehan'],
            'sumber_dana'       => ['sumber dana', 'sumber', 'dana'],
            'kondisi'           => ['kondisi', 'status kondisi', 'keadaan'],
            'lokasi'            => ['lokasi', 'ruang', 'ruangan', 'tempat', 'penempatan'],
        ];

        foreach ($headers as $index => $colName) {
            $colNormalized = strtolower(trim((string) $colName));
            foreach ($expectedMap as $field => $aliases) {
                if (in_array($colNormalized, $aliases)) {
                    $map[$field] = $index;
                    break;
                }
            }
        }

        
        $defaultOrder = ['no_inventaris', 'nama', 'kategori', 'volume', 'harga', 'tanggal_pembelian', 'sumber_dana', 'kondisi', 'lokasi'];
        foreach ($defaultOrder as $index => $field) {
            if (! isset($map[$field]) && isset($headers[$index])) {
                $map[$field] = $index;
            }
        }

        return $map;
    }

    

    private function mapRowToFields(array $rowValues, array $headerMap): array
    {
        $mapped = [];
        foreach ($headerMap as $field => $index) {
            $mapped[$field] = isset($rowValues[$index]) ? trim((string) $rowValues[$index]) : null;
        }

        
        if (isset($mapped['harga'])) {
            $raw = $mapped['harga'];
            
            $raw = explode(',', $raw)[0];
            
            $mapped['harga'] = (float) preg_replace('/[^\d]/', '', $raw);
        } else {
            $mapped['harga'] = 0.0;
        }

        
        if (! empty($mapped['tanggal_pembelian'])) {
            $rawDate = $mapped['tanggal_pembelian'];
            $date    = null;

            if (is_numeric($rawDate)) {
                
                try {
                    $date = ExcelDate::excelToDateTimeObject((float) $rawDate)->format('Y-m-d');
                } catch (\Exception $e) {}
            }

            if (! $date) {
                $normalizedDate = str_replace(['/', '.'], '-', $rawDate);
                try {
                    $date = Carbon::parse($normalizedDate)->format('Y-m-d');
                } catch (\Exception $e) {}
            }

            $mapped['tanggal_pembelian'] = $date ?: now()->format('Y-m-d');
        } else {
            $mapped['tanggal_pembelian'] = now()->format('Y-m-d');
        }

        return $mapped;
    }

    

    private function validateRow(array $mapped, int $rowNumber): array
    {
        $errors = [];

        if (empty($mapped['no_inventaris'])) {
            $errors[] = 'No. Inventaris wajib diisi.';
        }

        if (empty($mapped['nama'])) {
            $errors[] = 'Nama Barang wajib diisi.';
        }

        if (empty($mapped['kategori'])) {
            $errors[] = 'Kategori wajib diisi.';
        }

        if (empty($mapped['lokasi'])) {
            $errors[] = 'Lokasi wajib diisi.';
        }

        if (! is_numeric($mapped['harga']) || $mapped['harga'] < 0) {
            $errors[] = 'Harga harus berupa angka positif.';
        }

        $exists = false;
        if (! empty($mapped['no_inventaris'])) {
            $exists = UnitBarang::where('kode_inventaris', $mapped['no_inventaris'])->exists();
        }

        return [
            'valid'  => empty($errors),
            'errors' => $errors,
            'exists' => $exists,
        ];
    }

    

    private function generateUniqueCode(string $modelClass, string $name): string
    {
        $words = explode(' ', preg_replace('/[^a-zA-Z0-9 ]/', '', $name));
        $code  = '';

        if (count($words) >= 2) {
            foreach ($words as $w) {
                $code .= strtoupper(substr($w, 0, 1));
            }
        } else {
            $code = strtoupper(substr($words[0] ?? 'X', 0, 3));
        }

        if (strlen($code) < 2) {
            $code .= 'X';
        }

        $baseCode = $code;
        $counter  = 1;

        while ($modelClass::where('kode', $code)->exists()) {
            $code = $baseCode . $counter++;
        }

        return $code;
    }
}
