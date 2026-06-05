<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    

    public function run(): void
    {
        
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        
        $permissions = [
            'dashboard.view',
            'inventory.view',
            'inventory.create',
            'inventory.edit',
            'inventory.delete',
            'kategori.manage',
            'ruang.manage',
            'sumber_dana.manage',
            'maintenance.view',
            'maintenance.create',
            'maintenance.edit',
            'maintenance.delete',
            'label.print',
            'label.export',
            'report.export',
            'user.manage',
            'role.manage'
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        
        $superAdmin = Role::findOrCreate('Super Admin', 'web');
        $adminInventaris = Role::findOrCreate('Admin Inventaris', 'web');
        $staff = Role::findOrCreate('Staff', 'web');
        $teknisi = Role::findOrCreate('Teknisi', 'web');
        $pimpinan = Role::findOrCreate('Pimpinan', 'web');

        

        
        $superAdmin->givePermissionTo(Permission::all());

        
        $adminInventaris->givePermissionTo([
            'dashboard.view',
            'inventory.view',
            'inventory.create',
            'inventory.edit',
            'inventory.delete',
            'kategori.manage',
            'ruang.manage',
            'sumber_dana.manage',
            'maintenance.view',
            'maintenance.create',
            'maintenance.edit',
            'maintenance.delete',
            'label.print',
            'report.export',
        ]);

        
        $staff->givePermissionTo([
            'dashboard.view',
            'inventory.view',
            'inventory.create',
            'maintenance.view',
            'label.print',
        ]);

        
        $teknisi->givePermissionTo([
            'dashboard.view',
            'inventory.view',
            'inventory.edit', 
            'maintenance.view',
            'maintenance.create',
            'maintenance.edit',
        ]);

        
        $pimpinan->givePermissionTo([
            'dashboard.view',
            'inventory.view',
            'report.export',
            'maintenance.view',
        ]);

        
        $testUsers = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@gmail.com',
                'role' => 'Super Admin'
            ],
            [
                'name' => 'Admin Inventaris',
                'email' => 'admin_inventaris@gmail.com',
                'role' => 'Admin Inventaris'
            ],
            [
                'name' => 'Staff Inventaris',
                'email' => 'staff@gmail.com',
                'role' => 'Staff'
            ],
            [
                'name' => 'Teknisi Inventaris',
                'email' => 'teknisi@gmail.com',
                'role' => 'Teknisi'
            ],
            [
                'name' => 'Pimpinan Lembaga',
                'email' => 'pimpinan@gmail.com',
                'role' => 'Pimpinan'
            ],
        ];

        foreach ($testUsers as $u) {
            $user = User::where('email', $u['email'])->first();
            if (! $user) {
                $user = User::create([
                    'name' => $u['name'],
                    'email' => $u['email'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]);
            }
            $user->assignRole($u['role']);
        }
    }
}
