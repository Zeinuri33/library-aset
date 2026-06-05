<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable, HasRoles;

    

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    

    protected string $guard_name = 'web';

    

    public function getRoleName(): string
    {
        $spatieRole = $this->roles->first();
        if ($spatieRole) {
            return $spatieRole->name;
        }
        return 'Staff';
    }

    

    public function getRoleBadgeColor(): string
    {
        return match ($this->getRoleName()) {
            'Super Admin'      => 'destructive',
            'Admin Inventaris' => 'default',
            'Staff'            => 'secondary',
            'Teknisi'          => 'outline',
            'Pimpinan'         => 'warning',
            default            => 'secondary',
        };
    }
}
