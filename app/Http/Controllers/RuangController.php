<?php

namespace App\Http\Controllers;

use App\Models\Ruang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RuangController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $ruang = Ruang::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%")
                      ->orWhere('gedung', 'like', "%{$search}%")
                      ->orWhere('kode', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('ruang/index', [
            'ruang' => $ruang,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'gedung' => 'nullable|string|max:255',
            'kode' => 'nullable|string|max:50|unique:ruangs,kode',
        ]);

        Ruang::create($validated);

        return redirect()->back()->with('success', 'Ruang berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $ruang = Ruang::findOrFail($id);
        
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'gedung' => 'nullable|string|max:255',
            'kode' => 'nullable|string|max:50|unique:ruangs,kode,' . $id,
        ]);

        $ruang->update($validated);

        return redirect()->back()->with('success', 'Ruang berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $ruang = Ruang::findOrFail($id);
        $ruang->delete();

        return redirect()->back()->with('success', 'Ruang berhasil dihapus.');
    }
}
