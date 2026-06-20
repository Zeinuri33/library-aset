<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        
        Gate::authorize('manage-users');

        $search = $request->input('search');

        $users = User::with('roles')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('username', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhereHas('roles', function ($q) use ($search) {
                          $q->where('name', 'like', "%{$search}%");
                      });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        
        $users->getCollection()->transform(function ($user) {
            $user->role = $user->getRoleName();
            return $user;
        });

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => $request->only('search'),
            'roles' => ['Super Admin', 'Admin Inventaris', 'Staff', 'Teknisi', 'Pimpinan']
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('manage-users');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|alpha_dash|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'role' => 'required|string|in:Super Admin,Admin Inventaris,Staff,Teknisi,Pimpinan',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $role = $validated['role'];
        unset($validated['role']);

        $user = User::create($validated);
        $user->assignRole($role);

        return redirect()->back()->with('success', 'User berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('manage-users');

        $user = User::findOrFail($id);

        $rules = [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50|alpha_dash|unique:users,username,' . $id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role' => 'required|string|in:Super Admin,Admin Inventaris,Staff,Teknisi,Pimpinan',
        ];

        if ($request->filled('password')) {
            $rules['password'] = 'required|string|min:8';
        }

        $validated = $request->validate($rules);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        
        if ($user->hasRole('Super Admin') && $validated['role'] !== 'Super Admin') {
            $superAdminCount = User::role('Super Admin')->count();
            if ($superAdminCount <= 1 && auth()->id() === $user->id) {
                return redirect()->back()->withErrors(['role' => 'Tidak bisa mengubah role Super Admin terakhir.']);
            }
        }

        $role = $validated['role'];
        unset($validated['role']);

        $user->update($validated);
        $user->syncRoles($role);

        return redirect()->back()->with('success', 'User berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Gate::authorize('manage-users');

        $user = User::findOrFail($id);

        
        if (auth()->id() === $user->id) {
            return redirect()->back()->withErrors(['email' => 'Anda tidak bisa menghapus akun Anda sendiri.']);
        }

        
        if ($user->hasRole('Super Admin')) {
            $superAdminCount = User::role('Super Admin')->count();
            if ($superAdminCount <= 1) {
                return redirect()->back()->withErrors(['email' => 'Tidak bisa menghapus Super Admin terakhir di sistem.']);
            }
        }

        $user->delete();

        return redirect()->back()->with('success', 'User berhasil dihapus.');
    }
}
