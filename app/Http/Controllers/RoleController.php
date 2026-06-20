<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        Gate::authorize('role.manage');

        $roles = Role::with('permissions')
            ->get()
            ->map(function ($role) {
                return [
                    'id'                => $role->id,
                    'name'              => $role->name,
                    'guard_name'        => $role->guard_name,
                    'permissions_count' => $role->permissions->count(),
                    'permissions'       => $role->permissions->pluck('name'),
                    'created_at'        => $role->created_at->toIso8601String(),
                ];
            });

        $permissions = Permission::orderBy('name')
            ->get()
            ->map(function ($perm) {
                $parts = explode('.', $perm->name);
                return [
                    'id'    => $perm->id,
                    'name'  => $perm->name,
                    'group' => $parts[0] ?? 'other',
                    'label' => $this->formatPermissionLabel($perm->name),
                ];
            })
            ->groupBy('group');

        return Inertia::render('roles/index', [
            'roles'       => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        Gate::authorize('role.manage');

        if ($role->name === 'Super Admin') {
            return redirect()->back()->with('error', 'Izin Super Admin tidak dapat diubah.');
        }

        $validated = $request->validate([
            'permissions'   => 'required|array',
            'permissions.*' => 'string|exists:permissions,name',
        ]);

        $role->syncPermissions($validated['permissions']);

        return redirect()->back()->with('success', "Izin untuk role {$role->name} berhasil diperbarui.");
    }

    private function formatPermissionLabel(string $name): string
    {
        $labels = [
            'dashboard.view'     => 'Lihat Dashboard',
            'inventory.view'     => 'Lihat Inventaris',
            'inventory.create'   => 'Tambah Inventaris',
            'inventory.edit'     => 'Edit Inventaris',
            'inventory.delete'   => 'Hapus Inventaris',
            'kategori.manage'    => 'Kelola Kategori',
            'ruang.manage'       => 'Kelola Ruang',
            'sumber_dana.manage' => 'Kelola Sumber Dana',
            'maintenance.view'   => 'Lihat Pemeliharaan',
            'maintenance.create' => 'Tambah Pemeliharaan',
            'maintenance.edit'   => 'Edit Pemeliharaan',
            'maintenance.delete' => 'Hapus Pemeliharaan',
            'label.print'        => 'Cetak Label',
            'label.export'       => 'Ekspor Label',
            'report.export'      => 'Ekspor Laporan',
            'user.manage'        => 'Kelola User',
            'role.manage'        => 'Kelola Role & Izin',
        ];

        return $labels[$name] ?? str_replace('_', ' ', ucfirst($name));
    }
}
