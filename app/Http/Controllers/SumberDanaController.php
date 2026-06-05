<?php

namespace App\Http\Controllers;

use App\Models\SumberDana;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SumberDanaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $sumberDana = SumberDana::query()
            ->when($search, function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%")
                      ->orWhere('kode', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('sumber-dana/index', [
            'sumber_dana' => $sumberDana,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:50|unique:sumber_danas,kode',
            'nama' => 'required|string|max:255',
        ]);

        SumberDana::create($validated);

        return redirect()->back()->with('success', 'Sumber dana berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $sumberDana = SumberDana::findOrFail($id);
        
        $validated = $request->validate([
            'kode' => 'required|string|max:50|unique:sumber_danas,kode,' . $id,
            'nama' => 'required|string|max:255',
        ]);

        $sumberDana->update($validated);

        return redirect()->back()->with('success', 'Sumber dana berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $sumberDana = SumberDana::findOrFail($id);
        $sumberDana->delete();

        return redirect()->back()->with('success', 'Sumber dana berhasil dihapus.');
    }
}
