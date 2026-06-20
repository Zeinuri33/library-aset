<?php

namespace App\Http\Controllers;

use App\Models\UnitBarang;
use App\Models\Barang;
use App\Models\Ruang;
use App\Models\SumberDana;
use App\Models\KategoriBarang;
use App\Services\InventoryCodeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UnitBarangController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $unitBarang = UnitBarang::query()
            ->with(['barang.kategori', 'ruang', 'sumberDana'])
            ->when($search, function ($query, $search) {
                $query->where('kode_inventaris', 'like', "%{$search}%")
                      ->orWhereHas('barang', function($q) use ($search) {
                          $q->where('nama_barang', 'like', "%{$search}%");
                      })
                      ->orWhereHas('ruang', function($q) use ($search) {
                          $q->where('nama', 'like', "%{$search}%");
                      });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $barang = Barang::with('kategori')->orderBy('nama_barang')->get();
        $ruang = Ruang::orderBy('nama')->get();
        $sumberDana = SumberDana::orderBy('nama')->get();

        return Inertia::render('unit-barang/index', [
            'unit_barang' => $unitBarang,
            'barang' => $barang,
            'ruang' => $ruang,
            'sumber_dana' => $sumberDana,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request, InventoryCodeService $codeService)
    {
        $validated = $request->validate([
            'barang_id' => 'required|exists:barangs,id',
            'ruang_id' => 'nullable|exists:ruangs,id',
            'sumber_dana_id' => 'required|exists:sumber_danas,id',
            'tanggal_perolehan' => 'required|date',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'status' => 'required|in:tersedia,dipinjam,diperbaiki,dihapus',
            'harga' => 'nullable|numeric|min:0',
            'qr_code' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        
        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('foto-unit', 'public');
            $validated['foto'] = '/storage/' . $path;
        }

        
        $codeData = $codeService->generate(
            $validated['barang_id'],
            $validated['sumber_dana_id'],
            $validated['tanggal_perolehan']
        );

        $validated['nomor_unit'] = $codeData['nomor_unit'];
        $validated['kode_inventaris'] = $codeData['kode_inventaris'];

        
        $validated['qr_code'] = url('/asset/' . $codeData['kode_inventaris']);

        UnitBarang::create($validated);

        return redirect()->back()->with('success', 'Unit inventaris berhasil ditambahkan.');
    }

    public function update(Request $request, $id, InventoryCodeService $codeService)
    {
        $unitBarang = UnitBarang::findOrFail($id);
        
        $validated = $request->validate([
            'barang_id' => 'required|exists:barangs,id',
            'ruang_id' => 'nullable|exists:ruangs,id',
            'sumber_dana_id' => 'required|exists:sumber_danas,id',
            'tanggal_perolehan' => 'required|date',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'status' => 'required|in:tersedia,dipinjam,diperbaiki,dihapus',
            'harga' => 'nullable|numeric|min:0',
            'qr_code' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            
            if ($unitBarang->foto) {
                $oldPath = str_replace('/storage/', '', $unitBarang->foto);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('foto')->store('foto-unit', 'public');
            $validated['foto'] = '/storage/' . $path;
        }

        $originalBarangId = $unitBarang->barang_id;
        $newBarangId = $validated['barang_id'];

        if ($originalBarangId != $newBarangId) {
            
            $maxNomorUnit = UnitBarang::where('barang_id', $newBarangId)->max('nomor_unit') ?? 0;
            $validated['nomor_unit'] = $maxNomorUnit + 1;
        } else {
            $validated['nomor_unit'] = $unitBarang->nomor_unit;
        }

        
        $codeData = $codeService->generate(
            $newBarangId,
            $validated['sumber_dana_id'],
            $validated['tanggal_perolehan'],
            $validated['nomor_unit']
        );

        $validated['kode_inventaris'] = $codeData['kode_inventaris'];
        $validated['qr_code'] = url('/asset/' . $codeData['kode_inventaris']);

        $unitBarang->update($validated);

        return redirect()->back()->with('success', 'Unit inventaris berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $unitBarang = UnitBarang::findOrFail($id);
        $unitBarang->delete();

        return redirect()->back()->with('success', 'Unit inventaris berhasil dihapus.');
    }

    public function show($id)
    {
        $unitBarang = UnitBarang::with(['barang.kategori', 'ruang', 'sumberDana', 'pemeliharaans' => function ($q) {
            $q->latest('tanggal')->latest('id');
        }])->findOrFail($id);

        return Inertia::render('unit-barang/show', [
            'unit' => $unitBarang
        ]);
    }

    public function lookup(Request $request)
    {
        $code = $request->input('code');

        if (!$code) {
            return redirect()->route('dashboard')->with('error', 'Kode QR tidak valid.');
        }

        
        $unitBarang = UnitBarang::where('kode_inventaris', $code)
            ->orWhere('qr_code', $code)
            ->first();

        if (!$unitBarang) {
            
            if (filter_var($code, FILTER_VALIDATE_URL)) {
                $path = parse_url($code, PHP_URL_PATH);
                
                if (preg_match('/\/unit-barang\/(\d+)/', $path, $matches)) {
                    $id = $matches[1];
                    $unitBarang = UnitBarang::find($id);
                }
                
                if (preg_match('#/asset/(.+)#', $path, $matches)) {
                    $kode = $matches[1];
                    $unitBarang = UnitBarang::where('kode_inventaris', $kode)->first();
                }
            }
        }

        if (!$unitBarang) {
            return redirect()->back()->with('error', "Aset dengan kode \"{$code}\" tidak ditemukan.");
        }

        return redirect()->route('unit-barang.show', $unitBarang->id)->with('success', 'Aset berhasil di-scan.');
    }

    public function labels(Request $request)
    {
        $search   = $request->input('search');
        $kategori = $request->input('kategori_id');
        $ruangId  = $request->input('ruang_id');
        $sumberId = $request->input('sumber_dana_id');

        $units = UnitBarang::query()
            ->with(['barang.kategori', 'ruang', 'sumberDana'])
            ->when($search, function ($q, $s) {
                $q->where('kode_inventaris', 'like', "%{$s}%")
                  ->orWhereHas('barang', fn($q2) => $q2->where('nama_barang', 'like', "%{$s}%"));
            })
            ->when($kategori, function ($q, $k) {
                $q->whereHas('barang', fn($q2) => $q2->where('kategori_barang_id', $k));
            })
            ->when($ruangId, fn($q, $r) => $q->where('ruang_id', $r))
            ->when($sumberId, fn($q, $sd) => $q->where('sumber_dana_id', $sd))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('inventory/labels', [
            'units'       => $units,
            'filters'     => $request->only(['search', 'kategori_id', 'ruang_id', 'sumber_dana_id']),
            'kategori_list' => KategoriBarang::orderBy('nama')->get(['id', 'nama']),
            'ruang_list'  => Ruang::orderBy('nama')->get(['id', 'nama']),
            'sumber_list' => SumberDana::orderBy('nama')->get(['id', 'nama']),
        ]);
    }

    public function printLabels(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return redirect()->route('inventory.labels')->with('error', 'Pilih minimal 1 unit untuk dicetak.');
        }

        $units = UnitBarang::with(['barang.kategori', 'ruang', 'sumberDana'])
            ->whereIn('id', $ids)
            ->get();

        return Inertia::render('inventory/print', [
            'units'   => $units,
            'variant' => $request->input('variant', 'detailed'),
        ]);
    }
}
