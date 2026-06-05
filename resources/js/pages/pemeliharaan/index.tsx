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
import { Plus, Edit, Trash2, ClipboardList, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Barang {
    id: number;
    nama_barang: string;
}

interface UnitBarang {
    id: number;
    kode_inventaris: string;
    barang?: Barang;
}

interface Pemeliharaan {
    id: number;
    unit_barang_id: number;
    tanggal: string;
    kategori: string | null;
    deskripsi: string;
    petugas: string | null;
    biaya: number;
    bukti: string | null;
    created_at: string;
    unit_barang?: UnitBarang;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: Pemeliharaan[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PageProps {
    pemeliharaan: PaginatedData;
    unit_barang: UnitBarang[];
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

export default function PemeliharaanIndex({
    pemeliharaan,
    unit_barang,
    filters,
}: PageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const form = useForm({
        unit_barang_id: '',
        tanggal: '',
        kategori: '',
        deskripsi: '',
        petugas: '',
        biaya: '',
    });

    const performSearch = useDebounce((query: string) => {
        router.get(
            '/pemeliharaan',
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

    const openEditForm = (item: Pemeliharaan) => {
        form.clearErrors();
        form.setData({
            unit_barang_id: item.unit_barang_id.toString(),
            tanggal: item.tanggal ? item.tanggal.substring(0, 10) : '',
            kategori: item.kategori || '',
            deskripsi: item.deskripsi,
            petugas: item.petugas || '',
            biaya: item.biaya.toString(),
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
            form.put(`/pemeliharaan/${selectedId}`, {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('Catatan pemeliharaan berhasil diperbarui');
                },
            });
        } else {
            form.post('/pemeliharaan', {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('Catatan pemeliharaan berhasil ditambahkan');
                },
            });
        }
    };

    const onDelete = () => {
        if (!selectedId) return;

        router.delete(`/pemeliharaan/${selectedId}`, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                toast.success('Catatan pemeliharaan berhasil dihapus');
            },
        });
    };

    const formatRupiah = (val: number | string) => {
        const parsed = Number(val);
        if (isNaN(parsed)) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parsed);
    };

    
    const handleExportCSV = () => {
        const headers = [
            'Unit Inventaris',
            'Kode Inventaris',
            'Kategori',
            'Tanggal Servis',
            'Deskripsi Servis',
            'Petugas',
            'Biaya Servis (IDR)',
        ];
        const rows = filteredData.map((item) => [
            item.unit_barang?.barang?.nama_barang || '-',
            item.unit_barang?.kode_inventaris || '-',
            item.kategori || '-',
            item.tanggal,
            item.deskripsi,
            item.petugas || '-',
            item.biaya,
        ]);
        const csvContent =
            '\uFEFF' +
            [
                headers.join(','),
                ...rows.map((e) =>
                    e
                        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
                        .join(','),
                ),
            ].join('\n');

        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'data_pemeliharaan_aset.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Data pemeliharaan berhasil diekspor');
    };

    
    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;

        if (
            confirm(
                `Apakah Anda yakin ingin menghapus ${selectedRows.length} catatan pemeliharaan terpilih?`,
            )
        ) {
            selectedRows.forEach((id) => {
                router.delete(`/pemeliharaan/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedRows([]);
                    },
                });
            });
            toast.success(
                `${selectedRows.length} catatan pemeliharaan berhasil dihapus`,
            );
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(pemeliharaan.data.map((p) => p.id));
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

    
    const filteredData = pemeliharaan.data.filter((item) => {
        if (categoryFilter && item.kategori !== categoryFilter) {
            return false;
        }
        return true;
    });

    
    const categories = Array.from(
        new Set(pemeliharaan.data.map((p) => p.kategori).filter(Boolean)),
    ) as string[];

    const columns = [
        {
            header: '',
            cell: (item: Pemeliharaan) => (
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
            header: 'Unit Barang / Aset',
            cell: (item: Pemeliharaan) => (
                <div className="flex flex-col">
                    <span className="font-bold text-foreground/90">
                        {item.unit_barang?.barang?.nama_barang || '-'}
                    </span>
                    <span className="mt-1 w-fit rounded border border-border/15 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground select-all dark:bg-muted/10">
                        {item.unit_barang?.kode_inventaris || '-'}
                    </span>
                </div>
            ),
        },
        {
            header: 'Tanggal Servis',
            cell: (item: Pemeliharaan) => {
                return (
                    <span className="font-bold text-muted-foreground">
                        {new Date(item.tanggal).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                );
            },
            className: 'w-[140px]',
        },
        {
            header: 'Kategori / Petugas',
            cell: (item: Pemeliharaan) => (
                <div className="flex flex-col">
                    <span className="inline-flex w-fit items-center rounded-lg bg-purple-500/10 px-2 py-0.5 text-[10.5px] font-bold text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                        {item.kategori || 'Pemeliharaan'}
                    </span>
                    {item.petugas && (
                        <span className="mt-1 text-[10px] font-semibold text-muted-foreground">
                            Petugas: {item.petugas}
                        </span>
                    )}
                </div>
            ),
            className: 'w-[160px]',
        },
        {
            header: 'Rincian Perbaikan',
            accessorKey: 'deskripsi' as keyof Pemeliharaan,
            className: 'text-muted-foreground max-w-sm truncate',
        },
        {
            header: 'Biaya Pemeliharaan',
            cell: (item: Pemeliharaan) => (
                <span className="font-mono text-xs font-black text-rose-500">
                    {formatRupiah(item.biaya)}
                </span>
            ),
            className: 'w-[150px] text-right',
        },
        {
            header: 'Aksi',
            cell: (item: Pemeliharaan) => (
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
            <Head title="Pemeliharaan Unit" />
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-6 md:max-w-7xl">
                <PageHeader
                    title="Pemeliharaan & Perbaikan"
                    description="Kelola riwayat log tindakan pemeliharaan berkala, perbaikan darurat, dan akumulasi biaya servis aset."
                    actions={
                        <Button
                            className="gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow-md hover:bg-primary/95"
                            onClick={openCreateForm}
                        >
                            <Plus className="h-4 w-4" /> Tambah Catatan Servis
                        </Button>
                    }
                />

                {}
                <TableToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Cari kode unit atau deskripsi servis..."
                    filters={
                        categories.length > 0
                            ? [
                                  {
                                      name: 'kategori',
                                      label: 'Semua Kategori',
                                      value: categoryFilter,
                                      onChange: setCategoryFilter,
                                      options: categories.map((c) => ({
                                          label: c,
                                          value: c,
                                      })),
                                  },
                              ]
                            : []
                    }
                    selectedCount={selectedRows.length}
                    onBulkDelete={handleBulkDelete}
                    onExportCSV={handleExportCSV}
                />

                {}
                <div className="space-y-4">
                    <DataTable
                        data={filteredData}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                        emptyMessage="Tidak ada catatan pemeliharaan yang ditemukan."
                    />

                    {}
                    {pemeliharaan.last_page > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/20 bg-muted/10 p-3 text-xs sm:flex-row">
                            <span className="font-semibold text-muted-foreground">
                                Menampilkan {pemeliharaan.from || 0} -{' '}
                                {pemeliharaan.to || 0} dari {pemeliharaan.total}{' '}
                                catatan
                            </span>
                            <div className="flex flex-wrap gap-1">
                                {pemeliharaan.links.map((link, i) => (
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
                                    ? 'Edit Catatan Pemeliharaan'
                                    : 'Tambah Catatan Pemeliharaan Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-xs">
                                Masukkan rincian perawatan unit aset fisik di
                                bawah ini.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={onSubmit} className="mt-2 space-y-4">
                            <div className="space-y-1">
                                <Label
                                    htmlFor="unit_barang_id"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Unit Aset Fisik{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <select
                                    id="unit_barang_id"
                                    value={form.data.unit_barang_id}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>,
                                    ) =>
                                        form.setData(
                                            'unit_barang_id',
                                            e.target.value,
                                        )
                                    }
                                    className="flex h-9.5 w-full rounded-xl border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Unit Aset...
                                    </option>
                                    {unit_barang.map((ub) => (
                                        <option key={ub.id} value={ub.id}>
                                            {ub.kode_inventaris} -{' '}
                                            {ub.barang?.nama_barang || 'Barang'}
                                        </option>
                                    ))}
                                </select>
                                {form.errors.unit_barang_id && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.unit_barang_id}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="tanggal"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Tanggal Perawatan{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <input
                                        type="date"
                                        id="tanggal"
                                        value={form.data.tanggal}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            form.setData(
                                                'tanggal',
                                                e.target.value,
                                            )
                                        }
                                        className="flex h-9.5 w-full rounded-xl border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                        required
                                    />
                                    {form.errors.tanggal && (
                                        <p className="animate-pulse text-[10px] font-bold text-destructive">
                                            {form.errors.tanggal}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="biaya"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Biaya Servis (IDR){' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Input
                                        type="number"
                                        id="biaya"
                                        value={form.data.biaya}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            form.setData(
                                                'biaya',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Masukan Biaya Servis"
                                        className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                        min="0"
                                        required
                                    />
                                    {form.errors.biaya && (
                                        <p className="animate-pulse text-[10px] font-bold text-destructive">
                                            {form.errors.biaya}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {}
                            {form.data.biaya &&
                                !isNaN(Number(form.data.biaya)) && (
                                    <div className="flex items-center justify-between rounded-xl border border-rose-500/10 bg-rose-500/5 px-3 py-1.5 font-mono text-[10.5px] font-black text-rose-500">
                                        <span>Formatted Value:</span>
                                        <span>
                                            {formatRupiah(form.data.biaya)}
                                        </span>
                                    </div>
                                )}

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="kategori"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Kategori Perbaikan
                                    </Label>
                                    <Input
                                        id="kategori"
                                        value={form.data.kategori}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            form.setData(
                                                'kategori',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Masukan Kategori Perbaikan"
                                        className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="petugas"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Teknisi / Petugas
                                    </Label>
                                    <Input
                                        id="petugas"
                                        value={form.data.petugas}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            form.setData(
                                                'petugas',
                                                e.target.value,
                                            )
                                        }
                                        placeholder=""
                                        className="h-9.5 rounded-xl border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label
                                    htmlFor="deskripsi"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Deskripsi Servis Lengkap{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <textarea
                                    id="deskripsi"
                                    value={form.data.deskripsi}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>,
                                    ) =>
                                        form.setData(
                                            'deskripsi',
                                            e.target.value,
                                        )
                                    }
                                    className="flex min-h-[75px] w-full rounded-xl border border-border/50 bg-background px-3 py-2 text-xs text-foreground shadow-2xs transition-colors placeholder:text-muted-foreground hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                    placeholder="Masukkan rincian spesifik tindakan perbaikan atau komponen yang diganti..."
                                    rows={3}
                                    required
                                />
                                {form.errors.deskripsi && (
                                    <p className="animate-pulse text-[10px] font-bold text-destructive">
                                        {form.errors.deskripsi}
                                    </p>
                                )}
                            </div>

                            <DialogFooter className="mt-6 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-9.5 rounded-xl text-xs font-semibold"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="h-9.5 rounded-xl bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/95"
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
                    title="Hapus Catatan Servis?"
                    description="Apakah Anda yakin ingin menghapus log pemeliharaan ini secara permanen dari sistem? Pengeluaran biaya terkait akan ditarik dari riwayat."
                    variant="destructive"
                    confirmText="Hapus"
                />
            </div>
        </>
    );
}

PemeliharaanIndex.layout = {
    breadcrumbs: [
        {
            title: 'Riwayat Servis',
            href: '/pemeliharaan',
        },
    ],
};
