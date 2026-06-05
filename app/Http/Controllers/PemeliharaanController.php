<?php

namespace App\Http\Controllers;

use App\Models\Pemeliharaan;
use App\Models\UnitBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemeliharaanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $pemeliharaan = Pemeliharaan::query()
            ->with(['unitBarang.barang'])
            ->when($search, function ($query, $search) {
                $query->where('deskripsi', 'like', "%{$search}%")
                      ->orWhereHas('unitBarang', function($q) use ($search) {
                          $q->where('kode_inventaris', 'like', "%{$search}%")
                            ->orWhereHas('barang', function($qb) use ($search) {
                                $qb->where('nama_barang', 'like', "%{$search}%");
                            });
                      });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $unitBarang = UnitBarang::with('barang')->latest()->get();

        return Inertia::render('pemeliharaan/index', [
            'pemeliharaan' => $pemeliharaan,
            'unit_barang' => $unitBarang,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_barang_id' => 'required|exists:unit_barangs,id',
            'tanggal' => 'required|date',
            'kategori' => 'nullable|string',
            'deskripsi' => 'required|string',
            'petugas' => 'nullable|string',
            'biaya' => 'required|numeric|min:0',
            'bukti' => 'nullable|string',
        ]);

        Pemeliharaan::create($validated);

        return redirect()->back()->with('success', 'Catatan pemeliharaan berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $pemeliharaan = Pemeliharaan::findOrFail($id);
        
        $validated = $request->validate([
            'unit_barang_id' => 'required|exists:unit_barangs,id',
            'tanggal' => 'required|date',
            'kategori' => 'nullable|string',
            'deskripsi' => 'required|string',
            'petugas' => 'nullable|string',
            'biaya' => 'required|numeric|min:0',
            'bukti' => 'nullable|string',
        ]);

        $pemeliharaan->update($validated);

        return redirect()->back()->with('success', 'Catatan pemeliharaan berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $pemeliharaan = Pemeliharaan::findOrFail($id);
        $pemeliharaan->delete();

        return redirect()->back()->with('success', 'Catatan pemeliharaan berhasil dihapus.');
    }
}
