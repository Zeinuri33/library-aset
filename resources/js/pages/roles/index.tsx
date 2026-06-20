import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, Edit, Loader2, Check, AlertTriangle, Lock, Users, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

interface PermissionItem {
    id: number;
    name: string;
    group: string;
    label: string;
}

interface RoleData {
    id: number;
    name: string;
    guard_name: string;
    permissions_count: number;
    permissions: string[];
    created_at: string;
}

interface PageProps {
    roles: RoleData[];
    permissions: Record<string, PermissionItem[]>;
}

const groupLabels: Record<string, string> = {
    dashboard:    'Dashboard',
    inventory:    'Manajemen Inventaris',
    kategori:     'Kategori Barang',
    ruang:        'Ruangan & Lokasi',
    sumber_dana:  'Sumber Dana',
    maintenance:  'Pemeliharaan',
    label:        'Label & Cetak',
    report:       'Laporan & Ekspor',
    user:         'Manajemen User',
    role:         'Role & Izin Akses',
};

const groupIcons: Record<string, string> = {
    dashboard:   '📊',
    inventory:   '📦',
    kategori:    '🏷️',
    ruang:       '📍',
    sumber_dana: '💰',
    maintenance: '🔧',
    label:       '🏷️',
    report:      '📄',
    user:        '👤',
    role:        '🔐',
};

const roleColors: Record<string, string> = {
    'Super Admin':      'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Admin Inventaris': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'Staff':            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'Teknisi':          'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Pimpinan':         'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

const roleDescriptions: Record<string, string> = {
    'Super Admin':      'Akses penuh ke seluruh fitur dan pengaturan sistem.',
    'Admin Inventaris': 'Mengelola data inventaris, kategori, ruang, dan pemeliharaan.',
    'Staff':            'Melihat dan menambah data inventaris serta mencetak label.',
    'Teknisi':          'Mengelola data pemeliharaan dan perbaikan aset.',
    'Pimpinan':         'Melihat laporan dashboard dan data inventaris.',
};

export default function RolesIndex({ roles, permissions }: PageProps) {
    const [editingRole, setEditingRole] = useState<RoleData | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openEditDialog = (role: RoleData) => {
        setEditingRole(role);
        setSelectedPermissions([...role.permissions]);
        setIsDialogOpen(true);
    };

    const closeEditDialog = () => {
        setIsDialogOpen(false);
        setEditingRole(null);
        setSelectedPermissions([]);
    };

    const togglePermission = (permName: string, checked: boolean) => {
        if (checked) {
            setSelectedPermissions((prev) => [...prev, permName]);
        } else {
            setSelectedPermissions((prev) => prev.filter((p) => p !== permName));
        }
    };

    const toggleGroup = (groupPerms: PermissionItem[], checked: boolean) => {
        const groupNames = groupPerms.map((p) => p.name);
        if (checked) {
            setSelectedPermissions((prev) => {
                const newPerms = new Set([...prev, ...groupNames]);
                return Array.from(newPerms);
            });
        } else {
            setSelectedPermissions((prev) =>
                prev.filter((p) => !groupNames.includes(p)),
            );
        }
    };

    const isGroupFullSelected = (groupPerms: PermissionItem[]): boolean => {
        return groupPerms.every((p) => selectedPermissions.includes(p.name));
    };

    const isGroupPartialSelected = (groupPerms: PermissionItem[]): boolean => {
        return (
            groupPerms.some((p) => selectedPermissions.includes(p.name)) &&
            !isGroupFullSelected(groupPerms)
        );
    };

    const handleSave = () => {
        if (!editingRole) return;
        setIsSaving(true);

        router.put(
            `/roles/${editingRole.id}`,
            { permissions: selectedPermissions },
            {
                onSuccess: () => {
                    closeEditDialog();
                    toast.success(
                        `Izin untuk role "${editingRole.name}" berhasil diperbarui`,
                    );
                },
                onError: (errors) => {
                    const msg = Object.values(errors).join(', ');
                    toast.error(msg || 'Gagal memperbarui izin role');
                },
                onFinish: () => setIsSaving(false),
            },
        );
    };

    const permissionGroups = Object.entries(permissions) as [string, PermissionItem[]][];

    return (
        <>
            <Head title="Role & Permission" />

            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-6 md:max-w-7xl">
                <PageHeader
                    title="Role & Izin Akses"
                    description="Kelola role dan tetapkan izin akses sistem untuk setiap tingkatan pengguna."
                />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {roles.map((role) => {
                        const isSuperAdmin = role.name === 'Super Admin';
                        return (
                            <div
                                key={role.id}
                                className={`group relative flex flex-col rounded-2xl border bg-card/60 p-5 shadow-xs backdrop-blur-md transition-all duration-200 hover:shadow-md ${
                                    isSuperAdmin
                                        ? 'border-purple-200/60 dark:border-purple-900/40'
                                        : 'border-border/40 hover:border-border/80'
                                }`}
                            >
                                {}
                                {isSuperAdmin && (
                                    <div className="absolute -top-2.5 right-4 z-10">
                                        <Badge className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[9px] font-bold text-purple-600 uppercase dark:text-purple-400">
                                            <Lock className="mr-1 h-2.5 w-2.5" /> Fixed
                                        </Badge>
                                    </div>
                                )}

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 ${
                                                isSuperAdmin
                                                    ? 'border-purple-200 bg-purple-500/10 text-purple-600 dark:border-purple-800 dark:text-purple-400'
                                                    : 'border-border/50 bg-muted/30 text-muted-foreground'
                                            }`}
                                        >
                                            <Shield className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-foreground">
                                                {role.name}
                                            </h3>
                                            <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                                                {roleDescriptions[role.name] ||
                                                    '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 border-t border-border/20 pt-3">
                                    <Badge
                                        variant="outline"
                                        className="rounded-lg border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[10px] font-bold text-primary"
                                    >
                                        <KeyRound className="mr-1 h-3 w-3" />
                                        {role.permissions_count} izin
                                    </Badge>

                                    {!isSuperAdmin && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-auto h-8 gap-1.5 rounded-lg px-2.5 text-xs font-bold text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
                                            onClick={() =>
                                                openEditDialog(role)
                                            }
                                        >
                                            <Edit className="h-3.5 w-3.5" />{' '}
                                            Atur Izin
                                        </Button>
                                    )}
                                </div>

                                {}
                                {role.permissions.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1">
                                        {role.permissions
                                            .slice(0, 6)
                                            .map((perm) => (
                                                <span
                                                    key={perm}
                                                    className="rounded-md border border-border/20 bg-muted/20 px-1.5 py-0.5 font-mono text-[8px] font-semibold text-muted-foreground"
                                                >
                                                    {perm}
                                                </span>
                                            ))}
                                        {role.permissions.length > 6 && (
                                            <span className="rounded-md border border-border/20 bg-muted/20 px-1.5 py-0.5 font-mono text-[8px] font-semibold text-muted-foreground">
                                                +{role.permissions.length - 6}{' '}
                                                lagi
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {}
                <Dialog open={isDialogOpen} onOpenChange={closeEditDialog}>
                    <DialogContent className="max-w-2xl rounded-2xl border border-border/50 bg-card/95 p-0 backdrop-blur-md">
                        {editingRole && (
                            <>
                                <DialogHeader className="border-b border-border/20 px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <DialogTitle className="text-base font-black tracking-tight text-foreground">
                                                Atur Izin:{' '}
                                                <span
                                                    className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-extrabold uppercase ${
                                                        roleColors[
                                                            editingRole.name
                                                        ] ||
                                                        'bg-muted text-muted-foreground border-border/20'
                                                    }`}
                                                >
                                                    {editingRole.name}
                                                </span>
                                            </DialogTitle>
                                            <DialogDescription className="mt-0.5 text-xs text-muted-foreground">
                                                Centang atau hapus centang pada
                                                izin yang ingin diberikan ke role
                                                ini.
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogHeader>

                                <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
                                    <div className="space-y-4">
                                        {permissionGroups.map(
                                            ([group, perms]) => {
                                                const allSelected =
                                                    isGroupFullSelected(perms);
                                                const partialSelected =
                                                    isGroupPartialSelected(
                                                        perms,
                                                    );

                                                return (
                                                    <div
                                                        key={group}
                                                        className="rounded-xl border border-border/15 bg-muted/10 p-4 transition-colors hover:bg-muted/20"
                                                    >
                                                        <div className="mb-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm">
                                                                    {groupIcons[
                                                                        group
                                                                    ] || '📋'}
                                                                </span>
                                                                <h4 className="text-xs font-black tracking-wider text-foreground uppercase">
                                                                    {groupLabels[
                                                                        group
                                                                    ] || group}
                                                                </h4>
                                                                <Badge className="ml-1.5 rounded-md bg-muted/40 px-1.5 py-0 text-[9px] font-bold text-muted-foreground">
                                                                    {perms.length}{' '}
                                                                    izin
                                                                </Badge>
                                                            </div>

                                                            <button
                                                                onClick={() =>
                                                                    toggleGroup(
                                                                        perms,
                                                                        !allSelected,
                                                                    )
                                                                }
                                                                className="flex items-center gap-1.5 rounded-lg border border-border/20 bg-background px-2.5 py-1 text-[9.5px] font-bold text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                                                            >
                                                                <Checkbox
                                                                checked={
                                                                    partialSelected
                                                                        ? 'indeterminate'
                                                                        : allSelected
                                                                }
                                                                className={
                                                                    partialSelected
                                                                        ? 'opacity-70'
                                                                        : ''
                                                                }
                                                            />
                                                                {allSelected
                                                                    ? 'Hapus Semua'
                                                                    : 'Pilih Semua'}
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                                            {perms.map(
                                                                (perm) => {
                                                                    const isSelected =
                                                                        selectedPermissions.includes(
                                                                            perm.name,
                                                                        );
                                                                    return (
                                                                        <label
                                                                            key={
                                                                                perm.id
                                                                            }
                                                                            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-3 py-2 transition-all duration-150 hover:border-border/20 hover:bg-background"
                                                                        >
                                                                            <Checkbox
                                                                                checked={
                                                                                    isSelected
                                                                                }
                                                                                onCheckedChange={(
                                                                                    checked,
                                                                                ) =>
                                                                                    togglePermission(
                                                                                        perm.name,
                                                                                        !!checked,
                                                                                    )
                                                                                }
                                                                                className="h-4 w-4"
                                                                            />
                                                                            <div className="flex flex-1 items-center justify-between gap-2">
                                                                                <span className="text-xs font-semibold text-foreground">
                                                                                    {
                                                                                        perm.label
                                                                                    }
                                                                                </span>
                                                                                <code className="shrink-0 rounded border border-border/20 bg-muted/30 px-1.5 py-0.5 font-mono text-[8px] font-medium text-muted-foreground">
                                                                                    {
                                                                                        perm.name
                                                                                    }
                                                                                </code>
                                                                            </div>
                                                                        </label>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>

                                <DialogFooter className="border-t border-border/20 px-6 py-4">
                                    <div className="flex w-full items-center justify-between gap-3">
                                        <div className="text-xs font-semibold text-muted-foreground">
                                            {selectedPermissions.length} dari{' '}
                                            {
                                                Object.values(permissions)
                                                    .flat().length
                                            }{' '}
                                            izin dipilih
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                className="h-9 rounded-xl text-xs font-bold"
                                                onClick={closeEditDialog}
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                className="h-9 gap-1.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/95"
                                                onClick={handleSave}
                                                disabled={isSaving}
                                            >
                                                {isSaving && (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                )}
                                                {isSaving
                                                    ? 'Menyimpan...'
                                                    : 'Simpan Pengaturan Izin'}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

RolesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Role & Izin Akses',
            href: '/roles',
        },
    ],
};
