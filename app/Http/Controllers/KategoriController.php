<?php

namespace App\Http\Controllers;

use App\Models\KategoriBarang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $kategori = KategoriBarang::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%")
                      ->orWhere('kode', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('kategori/index', [
            'kategori' => $kategori,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:50|unique:kategori_barangs,kode',
            'nama' => 'required|string|max:255',
        ]);

        KategoriBarang::create($validated);

        return redirect()->back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $kategori = KategoriBarang::findOrFail($id);
        
        $validated = $request->validate([
            'kode' => 'required|string|max:50|unique:kategori_barangs,kode,' . $id,
            'nama' => 'required|string|max:255',
        ]);

        $kategori->update($validated);

        return redirect()->back()->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $kategori = KategoriBarang::findOrFail($id);
        $kategori->delete();

        return redirect()->back()->with('success', 'Kategori berhasil dihapus.');
    }
}
