import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
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
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Kategori {
    id: number;
    kode: string;
    nama: string;
    keterangan: string | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: Kategori[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PageProps {
    kategori: PaginatedData;
    filters: { search?: string };
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

export default function KategoriIndex({ kategori, filters }: PageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const form = useForm({
        kode: '',
        nama: '',
        keterangan: '',
    });

    const performSearch = useDebounce((query: string) => {
        router.get(
            '/kategori',
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

    const openEditForm = (item: Kategori) => {
        form.clearErrors();
        form.setData({
            kode: item.kode,
            nama: item.nama,
            keterangan: item.keterangan || '',
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
            form.put(`/kategori/${selectedId}`, {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('Kategori berhasil diperbarui');
                },
            });
        } else {
            form.post('/kategori', {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('Kategori berhasil ditambahkan');
                },
            });
        }
    };

    const onDelete = () => {
        if (!selectedId) return;

        router.delete(`/kategori/${selectedId}`, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                toast.success('Kategori berhasil dihapus');
            },
        });
    };

    
    const handleExportCSV = () => {
        const headers = ['Kode Kategori', 'Nama Kategori', 'Keterangan'];
        const rows = kategori.data.map((item) => [
            item.kode,
            item.nama,
            item.keterangan || '',
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
        link.setAttribute('download', 'data_kategori.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Data kategori berhasil diekspor');
    };

    
    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;

        if (
            confirm(
                `Apakah Anda yakin ingin menghapus ${selectedRows.length} kategori terpilih?`,
            )
        ) {
            selectedRows.forEach((id) => {
                router.delete(`/kategori/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedRows([]);
                    },
                });
            });
            toast.success(`${selectedRows.length} kategori berhasil dihapus`);
        }
    };

    const handleRowSelect = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedRows((prev) => [...prev, id]);
        } else {
            setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
        }
    };

    const columns = [
        {
            header: '',
            cell: (item: Kategori) => (
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
            header: 'Kode Kategori',
            cell: (item: Kategori) => (
                <span className="rounded border bg-muted px-2.5 py-0.5 font-mono text-xs font-bold text-muted-foreground uppercase dark:bg-muted/10">
                    {item.kode}
                </span>
            ),
            className: 'w-[140px]',
        },
        {
            header: 'Nama Kategori',
            accessorKey: 'nama' as keyof Kategori,
            className: 'font-bold text-foreground/90',
        },
        {
            header: 'Keterangan',
            accessorKey: 'keterangan' as keyof Kategori,
            className: 'text-muted-foreground',
        },
        {
            header: 'Aksi',
            cell: (item: Kategori) => (
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
            <Head title="Kategori Barang" />
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-6 md:max-w-7xl">
                <PageHeader
                    title="Kategori Barang"
                    description="Kelola referensi klasifikasi kategori untuk mempermudah identifikasi dan monitoring aset."
                    actions={
                        <Button
                            className="gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-md hover:bg-primary/95"
                            onClick={openCreateForm}
                        >
                            <Plus className="h-4 w-4" /> Tambah Kategori
                        </Button>
                    }
                />

                <TableToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Cari kode atau nama kategori..."
                    selectedCount={selectedRows.length}
                    onBulkDelete={handleBulkDelete}
                    onExportCSV={handleExportCSV}
                />

                <div className="space-y-4">
                    <DataTable
                        data={kategori.data}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                        emptyMessage="Tidak ada kategori yang ditemukan."
                    />

                    {}
                    {kategori.last_page > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/20 bg-muted/10 p-3 text-xs sm:flex-row">
                            <span className="font-semibold text-muted-foreground">
                                Menampilkan {kategori.from || 0} -{' '}
                                {kategori.to || 0} dari {kategori.total}{' '}
                                kategori
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {kategori.links.map((link, i) => (
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
                                    ? 'Edit Kategori'
                                    : 'Tambah Kategori Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                Masukkan detail parameter kategori aset baru di
                                bawah ini.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={onSubmit} className="mt-2 space-y-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="kode"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Kode Singkat Kategori{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="kode"
                                    value={form.data.kode}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        form.setData(
                                            'kode',
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    placeholder="Masukkan Kode Kategori..."
                                    className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    required
                                    maxLength={5}
                                />
                                {form.errors.kode && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.kode}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="nama"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Nama Kategori Aset{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="nama"
                                    value={form.data.nama}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => form.setData('nama', e.target.value)}
                                    placeholder="Masukkan Nama Kategori..."
                                    className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    required
                                />
                                {form.errors.nama && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.nama}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="keterangan"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Keterangan Singkat
                                </Label>
                                <textarea
                                    id="keterangan"
                                    value={form.data.keterangan}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>,
                                    ) =>
                                        form.setData(
                                            'keterangan',
                                            e.target.value,
                                        )
                                    }
                                    className="flex min-h-[70px] w-full rounded-xl border border-border/50 bg-background px-3 py-2 text-xs text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                    placeholder="Keterangan pendukung..."
                                    rows={3}
                                />
                                {form.errors.keterangan && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.keterangan}
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
                    title="Hapus Klasifikasi Kategori?"
                    description="Apakah Anda yakin ingin menghapus kategori ini? Aksi ini bersifat permanen."
                    variant="destructive"
                    confirmText="Hapus"
                />
            </div>
        </>
    );
}

KategoriIndex.layout = {
    breadcrumbs: [
        {
            title: 'Kategori',
            href: '/kategori',
        },
    ],
};
