import { Head, useForm, router, Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { TableToolbar } from '@/components/table/table-toolbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
    QrCode,
    Printer,
    Download,
    Eye,
    Loader2,
    Upload,
} from 'lucide-react';
import { toast } from 'sonner';

interface Kategori {
    id: number;
    kode: string | null;
    nama: string;
}

interface Barang {
    id: number;
    nama_barang: string;
    kategori?: Kategori;
}

interface Ruang {
    id: number;
    nama: string;
}

interface SumberDana {
    id: number;
    kode: string;
    nama: string;
}

interface UnitBarang {
    id: number;
    barang_id: number;
    ruang_id: number | null;
    sumber_dana_id: number;
    tanggal_perolehan: string;
    nomor_unit: number;
    kode_inventaris: string;
    kondisi: 'baik' | 'rusak_ringan' | 'rusak_berat';
    status: 'tersedia' | 'dipinjam' | 'diperbaiki' | 'dihapus';
    qr_code: string | null;
    harga: number | null;
    created_at: string;
    barang?: Barang;
    ruang?: Ruang;
    sumber_dana?: SumberDana;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedData {
    data: UnitBarang[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PageProps {
    unit_barang: PaginatedData;
    barang: Barang[];
    ruang: Ruang[];
    sumber_dana: SumberDana[];
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

const kondisiLabels = {
    baik: 'Baik',
    rusak_ringan: 'Rusak Ringan',
    rusak_berat: 'Rusak Berat',
};

const statusLabels = {
    tersedia: 'Tersedia',
    dipinjam: 'Dipinjam',
    diperbaiki: 'Diperbaiki',
    dihapus: 'Hapus',
};

export default function UnitBarangIndex({
    unit_barang,
    barang,
    ruang,
    sumber_dana,
    filters,
}: PageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isQrOpen, setIsQrOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<UnitBarang | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [filterKondisi, setFilterKondisi] = useState<string>('');
    const [filterRuang, setFilterRuang] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('');

    const form = useForm({
        barang_id: '',
        ruang_id: '',
        sumber_dana_id: '',
        tanggal_perolehan: '',
        kondisi: 'baik',
        status: 'tersedia',
        harga: '',
    });

    const performSearch = useDebounce((query: string) => {
        router.get(
            '/unit-barang',
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

    const openEditForm = (item: UnitBarang) => {
        form.clearErrors();
        form.setData({
            barang_id: item.barang_id.toString(),
            ruang_id: item.ruang_id?.toString() || '',
            sumber_dana_id: item.sumber_dana_id?.toString() || '',
            tanggal_perolehan: item.tanggal_perolehan
                ? item.tanggal_perolehan.substring(0, 10)
                : '',
            kondisi: item.kondisi,
            status: item.status,
            harga: item.harga?.toString() || '',
        });
        setSelectedId(item.id);
        setIsFormOpen(true);
    };

    const openDeleteConfirm = (id: number) => {
        setSelectedId(id);
        setIsDeleteOpen(true);
    };

    const openQrDialog = (item: UnitBarang) => {
        setSelectedUnit(item);
        setIsQrOpen(true);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedId) {
            form.put(`/unit-barang/${selectedId}`, {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('Unit inventaris berhasil diperbarui');
                },
            });
        } else {
            form.post('/unit-barang', {
                onSuccess: () => {
                    setIsFormOpen(false);
                    toast.success('Unit inventaris baru berhasil ditambahkan');
                },
            });
        }
    };

    const onDelete = () => {
        if (!selectedId) return;

        router.delete(`/unit-barang/${selectedId}`, {
            onSuccess: () => {
                setIsDeleteOpen(false);
                toast.success('Unit inventaris berhasil dihapus');
            },
        });
    };

    const handleExportCSV = () => {
        const headers = [
            'Kode Inventaris',
            'Nama Barang',
            'Ruang',
            'Sumber Dana',
            'Kondisi',
            'Status',
            'Harga (IDR)',
            'Tgl Perolehan',
        ];
        const rows = filteredData.map((item) => [
            item.kode_inventaris,
            item.barang?.nama_barang || '-',
            item.ruang?.nama || '-',
            item.sumber_dana?.nama || '-',
            item.kondisi.toUpperCase(),
            item.status.toUpperCase(),
            item.harga || 0,
            item.tanggal_perolehan,
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
        link.setAttribute('download', 'data_unit_inventaris.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Data unit inventaris berhasil diekspor');
    };

    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;

        if (
            confirm(
                `Apakah Anda yakin ingin menghapus ${selectedRows.length} unit inventaris terpilih secara permanen?`,
            )
        ) {
            selectedRows.forEach((id) => {
                router.delete(`/unit-barang/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedRows([]);
                    },
                });
            });
            toast.success(
                `${selectedRows.length} unit inventaris berhasil dihapus`,
            );
        }
    };

    const handleRowSelect = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedRows((prev) => [...prev, id]);
        } else {
            setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
        }
    };

    const getFormQrPreview = () => {
        if (
            !form.data.barang_id ||
            !form.data.sumber_dana_id ||
            !form.data.tanggal_perolehan
        ) {
            return 'Preview QR';
        }

        const selBarang = barang.find(
            (b) => b.id.toString() === form.data.barang_id,
        );

        const selDana = sumber_dana.find(
            (s) => s.id.toString() === form.data.sumber_dana_id,
        );

        const catCode = selBarang?.kategori?.kode || 'INV';

        const d = new Date(form.data.tanggal_perolehan);

        if (isNaN(d.getTime())) {
            return 'INVALID-DATE';
        }

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).slice(-2);

        const danaCode = selDana?.kode || 'X';

        return `${catCode}/${day}.${month}.${year}/${danaCode}/TEMP-001`;
    };

    const filteredData = unit_barang.data.filter((item) => {
        if (filterKondisi && item.kondisi !== filterKondisi) return false;
        if (filterRuang && item.ruang_id?.toString() !== filterRuang)
            return false;
        if (filterStatus && item.status !== filterStatus) return false;
        return true;
    });

    const columns = [
        {
            header: '',
            cell: (item: UnitBarang) => (
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
            header: 'Kode Inventaris',
            cell: (item: UnitBarang) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openQrDialog(item)}
                        className="rounded-md p-1.5 text-primary transition-colors hover:bg-primary/10"
                        title="Lihat QR & Label"
                    >
                        <QrCode className="h-4.5 w-4.5 opacity-80" />
                    </button>
                    <span className="font-mono text-[11px] font-extrabold tracking-wider text-foreground select-all">
                        {item.kode_inventaris}
                    </span>
                </div>
            ),
            className: 'w-[230px]',
        },
        {
            header: 'Aset / Barang',
            cell: (item: UnitBarang) => (
                <div className="flex flex-col">
                    <span className="font-bold text-foreground/90">
                        {item.barang?.nama_barang || '-'}
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                        Unit urut ke-{item.nomor_unit}
                    </span>
                </div>
            ),
        },
        {
            header: 'Ruang Lokasi',
            cell: (item: UnitBarang) => (
                <div className="flex items-center gap-1.5 font-bold text-muted-foreground">
                    {item.ruang?.nama ? (
                        <>
                            <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                            {item.ruang.nama}
                        </>
                    ) : (
                        <span className="font-medium text-muted-foreground/60 italic">
                            Belum Ditempatkan
                        </span>
                    )}
                </div>
            ),
        },
        {
            header: 'Kondisi Fisik',
            cell: (item: UnitBarang) => {
                const colors = {
                    baik: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                    rusak_ringan:
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
                    rusak_berat:
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
                };
                return (
                    <Badge
                        variant="outline"
                        className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase ${colors[item.kondisi]}`}
                    >
                        {kondisiLabels[item.kondisi]}
                    </Badge>
                );
            },
        },
        {
            header: 'Status',
            cell: (item: UnitBarang) => {
                const colors = {
                    tersedia:
                        'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
                    dipinjam:
                        'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
                    diperbaiki:
                        'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
                    dihapus:
                        'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
                };
                return (
                    <Badge
                        variant="outline"
                        className={`rounded-md px-2 py-0.5 text-[9px] font-bold uppercase ${colors[item.status]}`}
                    >
                        {statusLabels[item.status]}
                    </Badge>
                );
            },
        },
        {
            header: 'Aksi',
            cell: (item: UnitBarang) => (
                <div className="flex items-center justify-end gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md text-primary hover:bg-primary/10 hover:text-primary"
                        asChild
                        title="Lihat Profil Aset"
                    >
                        <Link href={`/unit-barang/${item.id}`}>
                            <Eye className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
                        onClick={() => openEditForm(item)}
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
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
            <Head title="Unit Inventaris Aset" />
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-4 md:p-6 md:max-w-7xl page-enter">
                <PageHeader
                    title="Unit Fisik Inventaris"
                    description="Kelola aset fisik individual lengkap dengan serialisasi, lokasi penempatan, dan kode QR unik."
                    actions={
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant="outline"
                                className="gap-2 rounded-md border-input bg-background font-bold text-foreground hover:bg-accent hover:text-accent-foreground text-xs h-9"
                                asChild
                            >
                                <Link href="/inventory/import">
                                    <Upload className="h-3.5 w-3.5 text-muted-foreground" />{' '}
                                    Import Excel
                                </Link>
                            </Button>

                            <Button
                                className="gap-2 rounded-md bg-primary font-bold text-primary-foreground hover:bg-primary/90 text-xs h-9"
                                onClick={openCreateForm}
                            >
                                <Plus className="h-3.5 w-3.5" /> Tambah Unit Aset
                            </Button>
                        </div>
                    }
                />

                <TableToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Cari kode unit atau nama barang..."
                    filters={[
                        {
                            name: 'ruang',
                            label: 'Semua Ruang',
                            value: filterRuang,
                            onChange: setFilterRuang,
                            options: ruang.map((r) => ({
                                label: r.nama,
                                value: r.id.toString(),
                            })),
                        },
                        {
                            name: 'kondisi',
                            label: 'Semua Kondisi',
                            value: filterKondisi,
                            onChange: setFilterKondisi,
                            options: Object.keys(kondisiLabels).map((k) => ({
                                label: kondisiLabels[
                                    k as keyof typeof kondisiLabels
                                ],
                                value: k,
                            })),
                        },
                        {
                            name: 'status',
                            label: 'Semua Status',
                            value: filterStatus,
                            onChange: setFilterStatus,
                            options: Object.keys(statusLabels).map((s) => ({
                                label: statusLabels[
                                    s as keyof typeof statusLabels
                                ],
                                value: s,
                            })),
                        },
                    ]}
                    selectedCount={selectedRows.length}
                    onBulkDelete={handleBulkDelete}
                    onExportCSV={handleExportCSV}
                />

                <div className="space-y-4 overflow-hidden">
                    <DataTable
                        data={filteredData}
                        columns={columns}
                        keyExtractor={(item) => item.id}
                        emptyMessage="Tidak ada unit inventaris fisik yang ditemukan."
                    />

                    {unit_barang.last_page > 1 && (
                        <div className="flex flex-col items-center justify-between gap-4 rounded-md border border-border bg-card p-4 font-mono text-xs shadow-xs sm:flex-row">
                            <span className="font-bold text-muted-foreground">
                                Menampilkan {unit_barang.from || 0} -{' '}
                                {unit_barang.to || 0} dari {unit_barang.total}{' '}
                                unit
                            </span>
                            <div className="flex flex-wrap items-center justify-end gap-1 overflow-hidden">
                                {unit_barang.links.map((link, i) => (
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
                                        className={`h-8 rounded-md px-3 font-semibold ${link.active ? 'border-primary bg-primary text-primary-foreground' : 'text-foreground border-border'} ${!link.url ? 'cursor-not-allowed opacity-40' : ''}`}
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
                    <DialogContent className="max-w-2xl rounded-md border border-border bg-background shadow-lg">
                        <DialogHeader className="border-b border-border pb-3">
                            <DialogTitle className="text-sm font-black tracking-wider text-foreground uppercase">
                                {selectedId
                                    ? 'Edit Unit Aset Fisik'
                                    : 'Registrasi Unit Aset Baru'}
                            </DialogTitle>
                            <DialogDescription className="text-[10px] font-medium text-muted-foreground">
                                Daftar unit inventaris fisik baru. Kode inventaris dan kode QR di-generate otomatis.
                            </DialogDescription>
                        </DialogHeader>

                        <form
                            onSubmit={onSubmit}
                            className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2"
                        >
                            <div className="space-y-3.5">
                                <div className="space-y-1">
                                    <Label
                                        htmlFor="barang_id"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Barang / Master Model{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <select
                                        id="barang_id"
                                        value={form.data.barang_id}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLSelectElement>,
                                        ) =>
                                            form.setData(
                                                'barang_id',
                                                e.target.value,
                                            )
                                        }
                                        className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                        required
                                    >
                                        <option value="" disabled>
                                            Pilih Master Model...
                                        </option>
                                        {barang.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.nama_barang}
                                            </option>
                                        ))}
                                    </select>
                                    {form.errors.barang_id && (
                                        <p className="animate-pulse text-[10px] font-bold text-destructive">
                                            {form.errors.barang_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="tanggal_perolehan"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Tanggal Perolehan Aset{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <input
                                        type="date"
                                        id="tanggal_perolehan"
                                        value={form.data.tanggal_perolehan}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            form.setData(
                                                'tanggal_perolehan',
                                                e.target.value,
                                            )
                                        }
                                        className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                        required
                                    />
                                    {form.errors.tanggal_perolehan && (
                                        <p className="animate-pulse text-[10px] font-bold text-destructive">
                                            {form.errors.tanggal_perolehan}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <Label
                                        htmlFor="harga"
                                        className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                    >
                                        Harga Perolehan (Rupiah)
                                    </Label>
                                    <Input
                                        id="harga"
                                        type="number"
                                        value={form.data.harga}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            form.setData(
                                                'harga',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: 12500000"
                                        className="h-9.5 rounded-md border-border/50 bg-background text-xs shadow-2xs focus-visible:ring-1 focus-visible:ring-primary"
                                        min="0"
                                    />
                                    {form.errors.harga && (
                                        <p className="animate-pulse text-[10px] font-bold text-destructive">
                                            {form.errors.harga}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="ruang_id"
                                            className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >
                                            Lokasi Ruang
                                        </Label>
                                        <select
                                            id="ruang_id"
                                            value={form.data.ruang_id}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                form.setData(
                                                    'ruang_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                        >
                                            <option value="">
                                                -- Pilih Ruang --
                                            </option>
                                            {ruang.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="sumber_dana_id"
                                            className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >
                                            Sumber Dana{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <select
                                            id="sumber_dana_id"
                                            value={form.data.sumber_dana_id}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                form.setData(
                                                    'sumber_dana_id',
                                                    e.target.value,
                                                )
                                            }
                                            className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                            required
                                        >
                                            <option value="" disabled>
                                                -- Pilih Dana --
                                            </option>
                                            {sumber_dana.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.nama}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between space-y-3.5">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="kondisi"
                                            className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >
                                            Kondisi Fisik{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <select
                                            id="kondisi"
                                            value={form.data.kondisi}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                form.setData(
                                                    'kondisi',
                                                    e.target.value as any,
                                                )
                                            }
                                            className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                            required
                                        >
                                            <option value="baik">Baik</option>
                                            <option value="rusak_ringan">
                                                Rusak Ringan
                                            </option>
                                            <option value="rusak_berat">
                                                Rusak Berat
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="status"
                                            className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                        >
                                            Status Pemakaian{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <select
                                            id="status"
                                            value={form.data.status}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLSelectElement>,
                                            ) =>
                                                form.setData(
                                                    'status',
                                                    e.target.value as any,
                                                )
                                            }
                                            className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none"
                                            required
                                        >
                                            <option value="tersedia">
                                                Tersedia
                                            </option>
                                            <option value="dipinjam">
                                                Dipinjam
                                            </option>
                                            <option value="diperbaiki">
                                                Diperbaiki
                                            </option>
                                            <option value="dihapus">
                                                Dihapus
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-border bg-muted/30 p-4 text-center">
                                    <h4 className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                                        Pratinjau QR Code Otomatis
                                    </h4>

                                    {form.data.barang_id &&
                                    form.data.sumber_dana_id &&
                                    form.data.tanggal_perolehan ? (
                                        <>
                                            <div className="rounded-md border border-border bg-white p-2">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(getFormQrPreview())}&size=100x100`}
                                                    alt="Preview"
                                                    className="h-20 w-20 object-contain"
                                                />
                                            </div>
                                            <span className="rounded-md border border-border bg-background px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-foreground">
                                                {getFormQrPreview()}
                                            </span>
                                        </>
                                    ) : (
                                        <div className="px-4 py-8 text-[10px] leading-normal text-muted-foreground">
                                            Masukkan parameter barang, tanggal, dan sumber dana untuk melihat kode QR real-time.
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-2 border-t border-border pt-3 md:pt-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-9 rounded-md text-xs font-bold text-foreground"
                                        onClick={() => setIsFormOpen(false)}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                        className="h-9 rounded-md bg-primary text-xs font-black tracking-wider text-primary-foreground uppercase hover:bg-primary/90"
                                    >
                                        {form.processing && (
                                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                        )}
                                        {selectedId
                                            ? 'Simpan Perubahan'
                                            : 'Generate & Simpan'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
                    <DialogContent className="max-w-sm rounded-md border border-border bg-background text-center shadow-lg">
                        <DialogHeader className="border-b border-border pb-2">
                            <DialogTitle className="text-center text-xs font-black tracking-wider text-foreground uppercase">
                                QR Code & Label Inventaris
                            </DialogTitle>
                        </DialogHeader>
                        {selectedUnit && (
                            <div className="flex flex-col items-center justify-center space-y-5 p-4">
                                <div className="flex items-center justify-center rounded-md border border-border bg-white p-4">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(selectedUnit.kode_inventaris)}&size=200x200`}
                                        alt={selectedUnit.kode_inventaris}
                                        className="h-40 w-40 object-contain"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <p className="inline-block rounded-md border border-border bg-muted/40 px-3 py-1 font-mono text-xs font-bold tracking-wider text-foreground">
                                        {selectedUnit.kode_inventaris}
                                    </p>
                                    <p className="mt-2 text-sm leading-snug font-bold text-foreground">
                                        {selectedUnit.barang?.nama_barang}
                                    </p>
                                    <p className="text-xs font-semibold text-muted-foreground">
                                        Ruang:{' '}
                                        {selectedUnit.ruang?.nama ||
                                            'Belum Ditempatkan'}
                                    </p>
                                </div>

                                <div className="flex w-full gap-2 border-t border-border pt-3">
                                    <Button
                                        className="h-9 flex-1 gap-1.5 rounded-md bg-primary text-xs font-bold tracking-wider text-primary-foreground uppercase hover:bg-primary/95"
                                        onClick={() => {
                                            window.open(`/inventory/labels/print?ids[]=${selectedUnit.id}`, '_blank');
                                        }}
                                    >
                                        <Printer className="h-3.5 w-3.5" />{' '}
                                        Cetak Label
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-9 flex-1 gap-1.5 rounded-md border-border text-xs font-semibold text-foreground"
                                        onClick={() => {
                                            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(selectedUnit.kode_inventaris)}&size=300x300`;
                                            const link =
                                                document.createElement('a');
                                            link.href = qrUrl;
                                            link.target = '_blank';
                                            link.download = `QR_${selectedUnit.kode_inventaris}.png`;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                    >
                                        <Download className="h-3.5 w-3.5" />{' '}
                                        Unduh QR
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                <ConfirmDialog
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={onDelete}
                    title="Hapus Unit Barang?"
                    description="Apakah Anda yakin ingin menghapus unit fisik ini secara permanen dari sistem? Tindakan ini tidak dapat diurungkan."
                    variant="destructive"
                    confirmText="Hapus"
                />
            </div>
        </>
    );
}

UnitBarangIndex.layout = {
    breadcrumbs: [
        {
            title: 'Unit Inventaris',
            href: '/unit-barang',
        },
    ],
};
