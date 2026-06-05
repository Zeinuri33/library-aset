import { Head, useForm, router } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { TableToolbar } from '@/components/table/table-toolbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Plus,
    Edit,
    Trash2,
    Loader2,
    User as UserIcon,
    Shield,
    Check,
    X,
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: User[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PageProps {
    users: PaginatedData;
    filters: { search?: string };
    roles: string[];
}

function useDebounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
) {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    return useCallback(
        (...args: Parameters<T>) => {
            if (timer) clearTimeout(timer);
            const newTimer = setTimeout(() => {
                func(...args);
            }, delay);
            setTimer(newTimer);
        },
        [func, delay, timer],
    );
}

export default function UserIndex({ users, filters, roles }: PageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const form = useForm({
        name: '',
        email: '',
        role: 'Staff',
        password: '',
    });

    const performSearch = useDebounce((query: string) => {
        router.get(
            '/users',
            { search: query },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }, 300);

    useEffect(() => {
        if (search !== (filters.search || '')) {
            performSearch(search);
        }
    }, [search]);

    const openCreateForm = () => {
        form.reset();
        form.clearErrors();
        setSelectedId(null);
        setIsFormOpen(true);
    };

    const openEditForm = (item: User) => {
        form.clearErrors();
        form.setData({
            name: item.name,
            email: item.email,
            role: item.role || 'Staff',
            password: '',
        });
        setSelectedId(item.id);
        setIsFormOpen(true);
    };

    const openDeleteConfirm = (id: number) => {
        setSelectedId(id);
        setIsDeleteOpen(true);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedId) {
            form.put(`/users/${selectedId}`, {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('User berhasil diperbarui');
                },
                onError: (errors) => {
                    if (errors.role) toast.error(errors.role);
                },
            });
        } else {
            form.post('/users', {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('User berhasil ditambahkan');
                },
            });
        }
    };

    const onDelete = () => {
        if (!selectedId) return;

        router.delete(`/users/${selectedId}`, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                toast.success('User berhasil dihapus');
            },
            onError: (errors) => {
                if (errors.email) toast.error(errors.email);
            },
        });
    };

    
    const handleExportCSV = () => {
        const headers = [
            'Nama',
            'Email',
            'Role',
            'Status Verifikasi',
            'Tanggal Pendaftaran',
        ];
        const rows = users.data.map((item) => [
            item.name,
            item.email,
            item.role,
            item.email_verified_at ? 'Terverifikasi' : 'Belum Verifikasi',
            new Date(item.created_at).toLocaleDateString('id-ID'),
        ]);
        const csvContent =
            '\uFEFF' +
            [
                headers.join(','),
                ...rows.map((e) =>
                    e.map((val) => `"${val.replace(/"/g, '""')}"`).join(','),
                ),
            ].join('\n');

        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'data_users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Data user berhasil diekspor');
    };

    const handleRowSelect = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedRows((prev) => [...prev, id]);
        } else {
            setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case 'Super Admin':
                return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
            case 'Admin Inventaris':
                return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'Staff':
                return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'Teknisi':
                return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'Pimpinan':
                return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
            default:
                return 'bg-muted text-muted-foreground border-border/20';
        }
    };

    const columns = [
        {
            header: '',
            cell: (item: User) => (
                <Checkbox
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={(checked) =>
                        handleRowSelect(item.id, !!checked)
                    }
                    aria-label="Pilih baris"
                />
            ),
            className: 'w-[40px]',
        },
        {
            header: 'User / Anggota',
            cell: (item: User) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xs font-black text-primary">
                        {getInitials(item.name)}
                    </div>
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate font-bold text-foreground">
                            {item.name}
                        </span>
                        <span className="truncate text-[10px] text-muted-foreground">
                            {item.email}
                        </span>
                    </div>
                </div>
            ),
            className: 'min-w-[200px]',
        },
        {
            header: 'Role / Jabatan',
            cell: (item: User) => (
                <span
                    className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${getRoleBadgeStyle(item.role)}`}
                >
                    <Shield className="h-3 w-3" />
                    {item.role}
                </span>
            ),
            className: 'w-[160px]',
        },
        {
            header: 'Verifikasi Email',
            cell: (item: User) =>
                item.email_verified_at ? (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" /> Terverifikasi
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-muted-foreground/60">
                        <X className="h-3.5 w-3.5" /> Belum Verifikasi
                    </span>
                ),
            className: 'w-[150px]',
        },
        {
            header: 'Bergabung Sejak',
            cell: (item: User) => (
                <span className="font-semibold text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })}
                </span>
            ),
            className: 'w-[150px]',
        },
        {
            header: 'Aksi',
            cell: (item: User) => (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
                        onClick={() => openEditForm(item)}
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                        onClick={() => openDeleteConfirm(item.id)}
                        title="Hapus"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
            className: 'w-[100px] text-right',
        },
    ];

    return (
        <>
            <Head title="Manajemen User" />
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-6 md:max-w-7xl">
                <PageHeader
                    title="Manajemen User & Hak Akses"
                    description="Kelola hak akses sistem, tambah pengguna baru, kelola role dan otorisasi inventaris secara terpusat."
                    actions={
                        <Button
                            className="gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-md hover:bg-primary/95"
                            onClick={openCreateForm}
                        >
                            <Plus className="h-4 w-4" /> Tambah User
                        </Button>
                    }
                />

                <TableToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Cari nama, email, atau role..."
                    selectedCount={selectedRows.length}
                    onExportCSV={handleExportCSV}
                />

                <div className="space-y-4">
                    <DataTable
                        data={users.data}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                        emptyMessage="Tidak ada user yang ditemukan."
                    />

                    {}
                    {users.last_page > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/20 bg-muted/10 p-3 text-xs sm:flex-row">
                            <span className="font-semibold text-muted-foreground">
                                Menampilkan {users.from || 0} - {users.to || 0}{' '}
                                dari {users.total} user
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {users.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            )
                                        }
                                        className={`h-8 rounded-lg px-3.5 font-bold ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {}
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogContent className="max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-md">
                        <DialogHeader>
                            <DialogTitle className="text-base font-black tracking-tight">
                                {selectedId
                                    ? 'Edit Akun Pengguna'
                                    : 'Tambah Pengguna Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                Masukkan nama, email, dan tetapkan
                                kewenangan/role akses di bawah ini.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={onSubmit} className="mt-2 space-y-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="name"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Nama Lengkap{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => form.setData('name', e.target.value)}
                                    placeholder=""
                                    className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    required
                                />
                                {form.errors.name && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="email"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Alamat Email{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => form.setData('email', e.target.value)}
                                    placeholder=""
                                    className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    required
                                />
                                {form.errors.email && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="role"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Tingkat Hak Akses / Role{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={form.data.role}
                                    onValueChange={(val) =>
                                        form.setData('role', val)
                                    }
                                >
                                    <SelectTrigger
                                        id="role"
                                        className="h-9.5 rounded-xl border-border/50 bg-background text-xs focus:ring-1 focus:ring-primary"
                                    >
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border border-border bg-card/95">
                                        {roles.map((role) => (
                                            <SelectItem
                                                key={role}
                                                value={role}
                                                className="rounded-lg text-xs"
                                            >
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.errors.role && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.role}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="password"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Kata Sandi{' '}
                                    {selectedId ? (
                                        '(Kosongkan jika tidak diubah)'
                                    ) : (
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    )}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.data.password}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        form.setData('password', e.target.value)
                                    }
                                    placeholder="Minimal 8 karakter"
                                    className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    required={!selectedId}
                                />
                                {form.errors.password && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.password}
                                    </p>
                                )}
                            </div>

                            <DialogFooter className="mt-6 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-9 rounded-xl text-xs font-semibold"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="h-9 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/95"
                                >
                                    {form.processing && (
                                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    )}
                                    {selectedId ? 'Simpan Perubahan' : 'Tambah'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {}
                <ConfirmDialog
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={onDelete}
                    title="Hapus Akun Pengguna?"
                    description="Apakah Anda yakin ingin menghapus akun pengguna ini? Hak akses mereka ke sistem akan dicabut sepenuhnya."
                    variant="destructive"
                    confirmText="Hapus"
                />
            </div>
        </>
    );
}

UserIndex.layout = {
    breadcrumbs: [
        {
            title: 'Manajemen User',
            href: '/users',
        },
    ],
};
