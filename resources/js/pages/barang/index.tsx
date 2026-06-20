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
import {
    Plus,
    Edit,
    Trash2,
    Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

interface Kategori {
    id: number;
    nama: string;
}

interface Barang {
    id: number;
    nama_barang: string;
    kategori_id: number;
    deskripsi: string | null;
    created_at: string;
    kategori?: Kategori;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: Barang[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PageProps {
    barang: PaginatedData;
    kategori: Kategori[];
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

export default function BarangIndex({ barang, kategori, filters }: PageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const form = useForm({
        nama_barang: '',
        kategori_id: '',
        deskripsi: '',
    });

    const performSearch = useDebounce((query: string) => {
        router.get(
            '/barang',
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

    const openEditForm = (item: Barang) => {
        form.clearErrors();

        let detectedKategoriId = '';

        if (item.kategori_id) {
            detectedKategoriId = String(item.kategori_id);
        } else if (item.kategori?.nama) {
            const namaKategoriBarang = item.kategori.nama.toLowerCase();
            const match = kategori.find(
                (k) =>
                    namaKategoriBarang.includes(k.nama.toLowerCase()) ||
                    k.nama.toLowerCase().includes(namaKategoriBarang),
            );
            if (match) {
                detectedKategoriId = String(match.id);
            }
        }

        setSelectedId(item.id);
        setIsFormOpen(true);

        form.setData({
            nama_barang: item.nama_barang || '',
            kategori_id: detectedKategoriId,
            deskripsi: item.deskripsi || '',
        });
    };

    const openDeleteConfirm = (id: number) => {
        setSelectedId(id);
        setIsDeleteOpen(true);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedId) {
            router.put(
                `/barang/${selectedId}`,
                {
                    nama_barang: form.data.nama_barang,
                    kategori_id: form.data.kategori_id,
                    deskripsi: form.data.deskripsi,
                },
                {
                    onSuccess: () => {
                        setIsFormOpen(false);
                        form.reset();
                        toast.success('Barang berhasil diperbarui');
                    },
                    onError: (errors) => {
                        Object.keys(errors).forEach((key) =>
                            form.setError(key as any, errors[key]),
                        );
                    },
                },
            );
        } else {
            form.post('/barang', {
                onSuccess: () => {
                    setIsFormOpen(false);
                    form.reset();
                    toast.success('Barang berhasil ditambahkan');
                },
            });
        }
    };

    const onDelete = () => {
        if (!selectedId) return;

        router.delete(`/barang/${selectedId}`, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                toast.success('Barang berhasil dihapus');
            },
        });
    };

    const handleExportCSV = () => {
        const headers = ['Kode Induk', 'Nama Barang', 'Kategori', 'Deskripsi'];
        const rows = barang.data.map((item) => [
            `B-${String(item.id).padStart(4, '0')}`,
            item.nama_barang,
            item.kategori?.nama || '-',
            item.deskripsi || '',
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
        link.setAttribute('download', 'data_barang.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Data barang berhasil diekspor');
    };

    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;

        if (
            confirm(
                `Apakah Anda yakin ingin menghapus ${selectedRows.length} data barang terpilih?`,
            )
        ) {
            selectedRows.forEach((id) => {
                router.delete(`/barang/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedRows([]);
                    },
                });
            });
            toast.success(`${selectedRows.length} barang berhasil dihapus`);
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(barang.data.map((b) => b.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedRows((prev) => [...prev, id]);
        } else {
            setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
        }
    };

    const filteredData = barang.data.filter((item) => {
        if (categoryFilter && item.kategori_id.toString() !== categoryFilter) {
            return false;
        }
        return true;
    });

    const columns = [
        {
            header: (
                <Checkbox
                    checked={
                        selectedRows.length === filteredData.length &&
                        filteredData.length > 0
                    }
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    aria-label="Pilih semua"
                />
            ),
            cell: (item: Barang) => (
                <Checkbox
                    checked={selectedRows.includes(item.id)}
                    onCheckedChange={(checked) =>
                        handleRowSelect(item.id, !!checked)
                    }
                    aria-label="Pilih baris"
                />
            ),
            className: 'w-[50px] pl-4',
        },

        {
            header: 'Kode Induk',
            cell: (item: Barang) => (
                <span className="inline-block rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-xs font-bold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                    B-{String(item.id).padStart(4, '0')}
                </span>
            ),
            className: 'w-[130px] whitespace-nowrap',
        },
        {
            header: 'Nama Barang',
            cell: (item: Barang) => (
                <div
                    className="max-w-[280px] truncate font-bold text-neutral-900 dark:text-neutral-100"
                    title={item.nama_barang}
                >
                    {item.nama_barang}
                </div>
            ),
            className: 'w-[300px]',
        },
        {
            header: 'Kategori',
            cell: (item: Barang) => (
                <span className="inline-flex items-center rounded-lg bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                    {item.kategori?.nama || '-'}
                </span>
            ),
            className: 'w-[180px]',
        },
        {
            header: 'Aksi',
            cell: (item: Barang) => (
                <div className="flex items-center justify-end gap-1.5 pr-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-xl border border-neutral-200 text-blue-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-blue-400 dark:hover:bg-neutral-900"
                        onClick={() => openEditForm(item)}
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-xl border border-neutral-200 text-rose-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-rose-400 dark:hover:bg-neutral-900"
                        onClick={() => openDeleteConfirm(item.id)}
                        title="Hapus"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
            className: 'w-[120px] text-right',
        },
    ];

    return (
        <>
            <Head title="Manajemen Barang" />
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-6 md:max-w-7xl">
                <PageHeader
                    title="Master Data Barang"
                    description="Kelola referensi model master barang inventaris utama."
                    actions={
                        <Button
                            className="hover:bg-neutral-850 gap-2 rounded-xl bg-neutral-900 font-semibold text-white shadow-xs transition-all duration-200 hover:shadow-md dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                            onClick={openCreateForm}
                        >
                            <Plus className="h-4 w-4" /> Tambah Barang
                        </Button>
                    }
                />

                <TableToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Cari kode induk atau nama barang..."
                    filters={[
                        {
                            name: 'kategori',
                            label: 'Semua Kategori',
                            value: categoryFilter,
                            onChange: setCategoryFilter,
                            options: kategori.map((k) => ({
                                label: k.nama,
                                value: k.id.toString(),
                            })),
                        },
                    ]}
                    selectedCount={selectedRows.length}
                    onBulkDelete={handleBulkDelete}
                    onExportCSV={handleExportCSV}
                />

                <div className="space-y-4">
                    <DataTable
                        data={filteredData}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                        emptyMessage="Tidak ada barang yang ditemukan."
                    />

                    {barang.last_page > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 font-mono text-xs backdrop-blur-md sm:flex-row dark:border-neutral-800/80 dark:bg-neutral-900/50">
                            <span className="text-neutral-550 font-semibold dark:text-neutral-400">
                                Menampilkan {barang.from || 0} -{' '}
                                {barang.to || 0} dari {barang.total} barang
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {barang.links.map((link, i) => (
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
                                        className={`h-8 rounded-lg px-3 font-semibold ${link.active ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900' : 'text-neutral-750 dark:border-neutral-350 border-neutral-200'} ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogContent className="max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
                        <DialogHeader className="border-b border-neutral-100 pb-3 dark:border-neutral-800/80">
                            <DialogTitle className="text-sm font-black tracking-wider text-neutral-950 uppercase dark:text-white">
                                {selectedId
                                    ? 'Edit Referensi Barang'
                                    : 'Tambah Referensi Barang Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-[10px] font-medium text-neutral-500">
                                Masukkan detail spesifikasi model barang di
                                bawah ini.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={onSubmit} className="mt-2 space-y-4">
<div className="space-y-1">
                                <Label
                                    htmlFor="nama_barang"
                                    className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase"
                                >
                                    Nama Model Barang{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="nama_barang"
                                    value={form.data.nama_barang}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        form.setData(
                                            'nama_barang',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Masukkan Nama Barang..."
                                    className="shadow-3xs h-9.5 rounded-xl border-neutral-200 bg-white text-xs focus-visible:ring-1 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:focus-visible:ring-neutral-700"
                                    required
                                />
                                {form.errors.nama_barang && (
                                    <p className="text-[10px] font-bold text-destructive">
                                        {form.errors.nama_barang}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="kategori"
                                    className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase"
                                >
                                    Pengelompokan Kategori{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <select
                                    id="kategori"
                                    value={form.data.kategori_id}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>,
                                    ) =>
                                        form.setData(
                                            'kategori_id',
                                            e.target.value,
                                        )
                                    }
                                    className="shadow-3xs flex h-9.5 w-full rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-900 outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus-visible:ring-neutral-700"
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Kategori...
                                    </option>
                                    {kategori.map((k) => (
                                        <option key={k.id} value={String(k.id)}>
                                            {k.nama}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.kategori_id && (
                                    <p className="text-[10px] font-bold text-destructive">
                                        {form.errors.kategori_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="deskripsi"
                                    className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase"
                                >
                                    Deskripsi Spesifikasi
                                </Label>
                                <textarea
                                    id="deskripsi"
                                    value={form.data.deskripsi || ''}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>,
                                    ) =>
                                        form.setData(
                                            'deskripsi',
                                            e.target.value,
                                        )
                                    }
                                    className="shadow-3xs flex min-h-[70px] w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-900 outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:focus-visible:ring-neutral-700"
                                    placeholder="Masukkan rincian spesifikasi teknis barang..."
                                    rows={3}
                                />
                                {form.errors.deskripsi && (
                                    <p className="text-[10px] font-bold text-destructive">
                                        {form.errors.deskripsi}
                                    </p>
                                )}
                            </div>

                            <DialogFooter className="mt-6 flex gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800/80">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-neutral-750 dark:text-neutral-350 h-9 rounded-xl border-neutral-200 text-xs font-semibold dark:border-neutral-800"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="hover:bg-neutral-850 h-9 rounded-xl bg-neutral-900 text-xs font-semibold text-white shadow-xs dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                                >
                                    {form.processing && (
                                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    )}
                                    {selectedId ? 'Simpan' : 'Tambah'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <ConfirmDialog
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={onDelete}
                    title="Hapus Referensi Barang?"
                    description="Apakah Anda yakin ingin menghapus data master barang ini? Tindakan ini permanen."
                    variant="destructive"
                    confirmText="Hapus"
                />
            </div>
        </>
    );
}

BarangIndex.layout = {
    breadcrumbs: [
        {
            title: 'Master Barang',
            href: '/barang',
        },
    ],
};
