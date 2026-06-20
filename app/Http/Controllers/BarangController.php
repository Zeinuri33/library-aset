<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\KategoriBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $barang = Barang::query()
            ->with(['kategori'])
            ->when($search, function ($query, $search) {
                $query->where('nama_barang', 'like', "%{$search}%")
                      ->orWhereHas('kategori', function($q) use ($search) {
                          $q->where('nama', 'like', "%{$search}%");
                      });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $kategori = KategoriBarang::orderBy('nama')->get();

        return Inertia::render('barang/index', [
            'barang' => $barang,
            'kategori' => $kategori,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        if ($request->has('kategori_id') && !$request->has('kategori_barang_id')) {
            $request->merge(['kategori_barang_id' => $request->input('kategori_id')]);
        }

        $validated = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'kategori_barang_id' => 'required|exists:kategori_barangs,id',
            'deskripsi' => 'nullable|string',
        ]);

        Barang::create($validated);

        return redirect()->back()->with('success', 'Barang berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $barang = Barang::findOrFail($id);
        
        if ($request->has('kategori_id') && !$request->has('kategori_barang_id')) {
            $request->merge(['kategori_barang_id' => $request->input('kategori_id')]);
        }

        $validated = $request->validate([
            'nama_barang' => 'required|string|max:255',
            'kategori_barang_id' => 'required|exists:kategori_barangs,id',
            'deskripsi' => 'nullable|string',
        ]);

        $barang->update($validated);

        return redirect()->back()->with('success', 'Barang berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $barang = Barang::findOrFail($id);
        $barang->delete();

        return redirect()->back()->with('success', 'Barang berhasil dihapus.');
    }
}
