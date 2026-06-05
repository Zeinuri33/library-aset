import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import {
    Printer, QrCode, Search, Filter, Tag, Box,
    CheckSquare, Square, RefreshCcw, X
} from 'lucide-react';
import { toast } from 'sonner';

interface UnitBarang {
    id: number;
    kode_inventaris: string;
    kondisi: string;
    status: string;
    harga: number;
    tanggal_perolehan: string;
    barang: {
        nama_barang: string;
        kategori: { nama: string } | null;
    };
    ruang: { nama: string } | null;
    sumber_dana: { nama: string } | null;
}

interface PaginatedData {
    data: UnitBarang[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface PageProps {
    units: PaginatedData;
    filters: {
        search?: string;
        kategori_id?: string;
        ruang_id?: string;
        sumber_dana_id?: string;
    };
    kategori_list: { id: number; nama: string }[];
    ruang_list: { id: number; nama: string }[];
    sumber_list: { id: number; nama: string }[];
}

function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    return useCallback((...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => func(...args), delay);
        setTimer(newTimer);
    }, [func, delay, timer]);
}

const INSTANSI = 'Inv. Perpustakaan Ibrahimy';
const WEBSITE  = 'www.lib.ibrahimy.ac.id';

function MiniLabelPreview({ unit }: { unit: UnitBarang }) {
    return (
        <div
            style={{
                width: '100%',
                aspectRatio: '370/140',
                border: '1px solid #000000',
                borderRadius: '0px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                fontFamily: 'Arial, sans-serif',
                color: '#000000',
            }}
        >
            {}
            <div style={{
                width: '35%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '1px solid #000000',
                padding: 2,
                background: '#ffffff',
            }}>
                <QrCode size={32} style={{ color: '#000000' }} />
            </div>

            {}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '6px 8px',
                gap: 1,
                overflow: 'hidden',
            }}>
                {}
                <div style={{
                    fontSize: 6,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: '#000000',
                }}>
                    {INSTANSI}
                </div>

                {}
                <div style={{
                    fontSize: 6.5,
                    fontWeight: 'normal',
                    color: '#000000',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}>
                    {unit.barang.nama_barang}
                </div>

                {}
                <div style={{
                    fontSize: 9.5,
                    fontWeight: 'bold',
                    color: '#000000',
                    wordBreak: 'break-all',
                    lineHeight: 1.1,
                }}>
                    {unit.kode_inventaris}
                </div>

                {}
                <div style={{
                    fontSize: 5,
                    color: '#000000',
                    whiteSpace: 'nowrap',
                }}>
                    {WEBSITE}
                </div>
            </div>
        </div>
    );
}

export default function LabelsIndex({ units, filters, kategori_list, ruang_list, sumber_list }: PageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [variant, setVariant] = useState('detailed');

    const performSearch = useDebounce((query: string) => {
        router.get('/inventory/labels', {
            search: query,
            kategori_id: filters.kategori_id,
            ruang_id: filters.ruang_id,
            sumber_dana_id: filters.sumber_dana_id,
        }, { preserveState: true, preserveScroll: true, replace: true });
    }, 400);

    useEffect(() => {
        if (search !== (filters.search || '')) performSearch(search);
    }, [search]);

    const applyFilter = (key: string, value: string) => {
        router.get('/inventory/labels', {
            search,
            kategori_id: filters.kategori_id,
            ruang_id: filters.ruang_id,
            sumber_dana_id: filters.sumber_dana_id,
            [key]: value === 'all' ? undefined : value,
        }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        const pageIds = units.data.map(u => u.id);
        const allSelected = pageIds.every(id => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
        } else {
            setSelectedIds(prev => [...new Set([...prev, ...pageIds])]);
        }
    };

    const clearFilters = () => {
        setSearch('');
        router.get('/inventory/labels', {}, { preserveState: true, preserveScroll: true, replace: true });
    };

    const handlePrint = () => {
        if (selectedIds.length === 0) {
            toast.error('Pilih minimal 1 unit inventaris terlebih dahulu.');
            return;
        }
        const params = new URLSearchParams();
        selectedIds.forEach(id => params.append('ids[]', id.toString()));
        params.append('variant', variant);
        window.open(`/inventory/labels/print?${params.toString()}`, '_blank');
    };

    const pageIds = units.data.map(u => u.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id));
    const hasFilters = !!(filters.search || filters.kategori_id || filters.ruang_id || filters.sumber_dana_id);

    const kondisiColor = (k: string) => ({
        baik: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        rusak_ringan: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        rusak_berat: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    }[k] ?? 'bg-muted text-muted-foreground border-border/20');

    return (
        <>
            <Head title="Label & Print Inventaris" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 md:max-w-7xl mx-auto w-full">

                <PageHeader
                    title="Label & Print Inventaris"
                    description="Pilih unit inventaris, pratinjau format label, dan cetak stiker identifikasi aset 80mm × 50mm."
                    actions={
                        <div className="flex items-center gap-2 flex-wrap">
                            <Select value={variant} onValueChange={setVariant}>
                                <SelectTrigger className="w-[140px] h-9 rounded-xl text-xs border-border/50 bg-background">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="detailed" className="text-xs">Format Lengkap</SelectItem>
                                    <SelectItem value="compact" className="text-xs">Format Ringkas</SelectItem>
                                    <SelectItem value="qr-only" className="text-xs">QR Code Saja</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={handlePrint}
                                disabled={selectedIds.length === 0}
                                className="rounded-xl h-9 gap-2 bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-md disabled:opacity-50"
                                size="sm"
                            >
                                <Printer className="h-4 w-4" />
                                Cetak {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
                            </Button>
                        </div>
                    }
                />

                {}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                            placeholder="Cari nama atau kode inventaris..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-9 rounded-xl text-xs border-border/50 bg-background"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                        <Select value={filters.kategori_id || 'all'} onValueChange={v => applyFilter('kategori_id', v)}>
                            <SelectTrigger className="w-[140px] h-9 rounded-xl text-xs border-border/50 bg-background">
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all" className="text-xs">Semua Kategori</SelectItem>
                                {kategori_list.map(k => (
                                    <SelectItem key={k.id} value={String(k.id)} className="text-xs">{k.nama}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={filters.ruang_id || 'all'} onValueChange={v => applyFilter('ruang_id', v)}>
                            <SelectTrigger className="w-[130px] h-9 rounded-xl text-xs border-border/50 bg-background">
                                <SelectValue placeholder="Ruang" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all" className="text-xs">Semua Ruang</SelectItem>
                                {ruang_list.map(r => (
                                    <SelectItem key={r.id} value={String(r.id)} className="text-xs">{r.nama}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {hasFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-3 rounded-xl text-xs gap-1 text-muted-foreground hover:text-foreground">
                                <X className="h-3.5 w-3.5" /> Reset Filter
                            </Button>
                        )}
                    </div>
                </div>

                {}
                <div className="flex items-center justify-between bg-muted/30 dark:bg-muted/10 border border-border/30 rounded-2xl px-4 py-2.5">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={selectAll}
                            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {allPageSelected
                                ? <CheckSquare className="h-4 w-4 text-primary" />
                                : <Square className="h-4 w-4" />
                            }
                            {allPageSelected ? 'Batal Pilih Semua' : 'Pilih Semua di Halaman'}
                        </button>
                        {selectedIds.length > 0 && (
                            <Badge className="rounded-lg px-2.5 py-0.5 text-[10px] font-black bg-primary/10 text-primary border-primary/20">
                                {selectedIds.length} terpilih
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Tag className="h-3.5 w-3.5" />
                        {units.from || 0}–{units.to || 0} dari {units.total} unit
                        {selectedIds.length > 0 && (
                            <button
                                onClick={() => setSelectedIds([])}
                                className="ml-2 text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                                <RefreshCcw className="h-3 w-3" /> Bersihkan
                            </button>
                        )}
                    </div>
                </div>

                {}
                {units.data.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {units.data.map((unit) => {
                            const selected = selectedIds.includes(unit.id);
                            return (
                                <div
                                    key={unit.id}
                                    onClick={() => toggleSelect(unit.id)}
                                    className={`relative cursor-pointer rounded-none border transition-all ${
                                        selected
                                            ? 'border-neutral-900 ring-1 ring-neutral-900 bg-neutral-50'
                                            : 'border-neutral-300 hover:border-neutral-600 bg-white'
                                    }`}
                                >
                                    {}
                                    <div className={`absolute top-2 right-2 z-10 h-4.5 w-4.5 rounded-none flex items-center justify-center border transition-all ${
                                        selected
                                            ? 'bg-neutral-900 border-neutral-900 text-white'
                                            : 'bg-white border-neutral-300'
                                    }`}>
                                        {selected && <span className="text-[9px] font-bold">✓</span>}
                                    </div>

                                    <Card className="rounded-none border-0 bg-transparent shadow-none overflow-hidden">
                                        <CardContent className="p-3.5 space-y-2">
                                            {}
                                            <MiniLabelPreview unit={unit} />

                                            {}
                                            <div className="space-y-1 pt-1">
                                                <p className="text-[10px] font-black text-foreground truncate leading-tight">
                                                    {unit.barang.nama_barang}
                                                </p>
                                                <p className="font-mono text-[9px] text-muted-foreground truncate">
                                                    {unit.kode_inventaris}
                                                </p>
                                                <div className="flex items-center gap-1 flex-wrap">
                                                    <span className={`text-[8.5px] font-bold px-1.5 py-px rounded border ${kondisiColor(unit.kondisi)}`}>
                                                        {unit.kondisi.replace('_', ' ')}
                                                    </span>
                                                    {unit.ruang && (
                                                        <span className="text-[8.5px] text-muted-foreground truncate max-w-[70px]">
                                                            {unit.ruang.nama}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                        <div className="rounded-2xl bg-muted/30 p-6">
                            <Box className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                        </div>
                        <div>
                            <p className="font-bold text-foreground">Tidak ada unit ditemukan</p>
                            <p className="text-xs text-muted-foreground mt-1">Coba ubah filter atau pencarian Anda.</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-xl gap-2">
                            <RefreshCcw className="h-3.5 w-3.5" /> Reset Filter
                        </Button>
                    </div>
                )}

                {}
                {units.last_page > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/10 p-3 rounded-2xl border border-border/20 text-xs">
                        <span className="font-semibold text-muted-foreground">
                            Halaman {units.current_page} dari {units.last_page}
                        </span>
                        <div className="flex flex-wrap gap-1">
                            {units.links.map((link, i) => (
                                <Button
                                    key={i}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveState: true, preserveScroll: true })}
                                    className={`px-3.5 h-8 font-bold rounded-lg ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

LabelsIndex.layout = {
    breadcrumbs: [
        { title: 'Label & Print', href: '/inventory/labels' },
    ],
};
