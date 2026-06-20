import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Download, 
    Printer, 
    Layers, 
    MapPin, 
    DollarSign, 
    Calendar, 
    TrendingUp, 
    Info,
    CheckCircle,
    User
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
    deskripsi: string | null;
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

interface Pemeliharaan {
    id: number;
    tanggal: string;
    kategori: string | null;
    deskripsi: string;
    petugas: string | null;
    biaya: number;
}

interface UnitBarang {
    id: number;
    kode_inventaris: string;
    nomor_unit: number;
    tanggal_perolehan: string;
    kondisi: 'baik' | 'rusak_ringan' | 'rusak_berat';
    status: 'tersedia' | 'dipinjam' | 'diperbaiki' | 'dihapus';
    qr_code: string | null;
    foto: string | null;
    harga: number | null;
    barang: Barang;
    ruang: Ruang | null;
    sumber_dana: SumberDana;
    pemeliharaans: Pemeliharaan[];
}

interface ShowProps {
    unit: UnitBarang;
}

export default function UnitBarangShow({ unit }: ShowProps) {
    const formatRupiah = (val: number | null) => {
        if (val === null) return '-';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(val);
    };

    const kondisiColors = {
        baik: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        rusak_ringan: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        rusak_berat: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    };

    const statusColors = {
        disabled: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
        tersedia: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        dipinjam: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        diperbaiki: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
        dihapus: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    };

    const totalMaintenanceBiaya = unit.pemeliharaans.reduce((sum, item) => sum + Number(item.biaya), 0);

    const handlePrint = () => {
        window.open(`/inventory/labels/print?ids[]=${unit.id}`, '_blank');
        toast.success('Membuka halaman cetak label');
    };

    const handleDownloadQR = () => {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(unit.kode_inventaris)}&size=300x300`;
        const link = document.createElement('a');
        link.href = qrUrl;
        link.target = '_blank';
        link.download = `QR_${unit.kode_inventaris}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('QR Code berhasil diunduh');
    };

    return (
        <>
            <Head title={`Aset: ${unit.kode_inventaris}`} />
            
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-4 md:p-6 md:max-w-7xl page-enter">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Button variant="ghost" size="sm" className="rounded-md px-3 text-muted-foreground hover:text-foreground shrink-0" asChild>
                        <Link href="/unit-barang">
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Kembali ke Unit
                        </Link>
                    </Button>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <Button 
                            onClick={handlePrint}
                            className="flex-1 sm:flex-none gap-2 rounded-md bg-primary text-primary-foreground font-semibold px-4 shadow-sm hover:bg-primary/95 transition-all duration-150 text-xs h-9"
                        >
                            <Printer className="h-4 w-4" /> Cetak Label Fisik
                        </Button>
                        <Button 
                            onClick={handleDownloadQR}
                            variant="secondary"
                            className="flex-1 sm:flex-none gap-2 rounded-md font-semibold px-4 shadow-xs transition-all duration-150 text-xs h-9"
                        >
                            <Download className="h-4 w-4" /> Unduh QR
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div className="flex flex-col gap-6">
                        <Card className="rounded-md border border-border bg-card shadow-xs overflow-hidden">
                            <div className="relative aspect-square w-full bg-muted/40 dark:bg-muted/10 border-b border-border/25 flex items-center justify-center overflow-hidden">
                                {unit.foto ? (
                                    <img 
                                        src={unit.foto} 
                                        alt={unit.barang.nama_barang} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground/60 p-8">
                                        <Layers className="h-14 w-14 opacity-40" />
                                        <span className="text-xs font-bold uppercase">Foto Tidak Tersedia</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 flex gap-1.5 z-20">
                                    <Badge variant="outline" className={`rounded-md uppercase font-bold text-[9px] px-2 py-0.5 ${kondisiColors[unit.kondisi] || 'bg-muted'}`}>
                                        {unit.kondisi}
                                    </Badge>
                                    <Badge variant="outline" className={`rounded-md uppercase font-bold text-[9px] px-2 py-0.5 ${statusColors[unit.status] || 'bg-muted'}`}>
                                        {unit.status}
                                    </Badge>
                                </div>
                            </div>
                            
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                                        {unit.barang.kategori?.nama || 'Uncategorized'}
                                    </span>
                                    <h2 className="text-lg font-black leading-snug tracking-tight text-foreground">
                                        {unit.barang.nama_barang}
                                    </h2>
                                    <p className="font-mono text-xs font-bold text-muted-foreground bg-muted dark:bg-muted/20 px-2.5 py-1 rounded border inline-block select-all">
                                        {unit.kode_inventaris}
                                    </p>
                                </div>

                                {unit.barang.deskripsi && (
                                    <div className="space-y-1 bg-muted/20 p-3.5 rounded-md border border-border/15">
                                        <h4 className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
                                            <Info className="h-3 w-3" /> Deskripsi Master
                                        </h4>
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {unit.barang.deskripsi}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-md border border-border bg-card shadow-xs p-6 flex flex-col items-center text-center gap-4">
                            <h3 className="text-xs uppercase font-extrabold text-muted-foreground tracking-wider">Vector QR Label</h3>
                            <div className="bg-white p-3 rounded-md shadow-sm border border-slate-100/60 inline-flex items-center justify-center">
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(unit.kode_inventaris)}&size=150x150`} 
                                    alt={unit.kode_inventaris} 
                                    className="h-32 w-32 object-contain"
                                />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] text-muted-foreground leading-normal">
                                    Pindai kode ini langsung dari kamera scanner untuk melacak lokasi dan status pemeliharaan.
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        <Card className="rounded-md border border-border bg-card shadow-xs">
                            <CardHeader className="border-b border-border/25 pb-3">
                                <CardTitle className="text-sm font-bold tracking-tight">Rincian Informasi Aset</CardTitle>
                                <CardDescription className="text-[11px]">Metadata detail fisik, ruangan, keuangan, dan sumber pendanaan.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3.5 bg-muted/20 dark:bg-muted/5 p-3 rounded-md border border-border/15">
                                            <div className="p-2.5 rounded-md bg-indigo-500/10 text-indigo-500 shrink-0">
                                                <Layers className="h-4.5 w-4.5" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Kategori Barang</p>
                                                <p className="text-xs font-bold text-foreground">{unit.barang.kategori?.nama || '-'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5 bg-muted/20 dark:bg-muted/5 p-3 rounded-md border border-border/15">
                                            <div className="p-2.5 rounded-md bg-emerald-500/10 text-emerald-500 shrink-0">
                                                <MapPin className="h-4.5 w-4.5" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Lokasi Ruangan</p>
                                                <p className="text-xs font-bold text-foreground">{unit.ruang?.nama || 'Belum Ditempatkan'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5 bg-muted/20 dark:bg-muted/5 p-3 rounded-md border border-border/15">
                                            <div className="p-2.5 rounded-md bg-amber-500/10 text-amber-500 shrink-0">
                                                <DollarSign className="h-4.5 w-4.5" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Harga Perolehan</p>
                                                <p className="text-xs font-bold text-foreground">{formatRupiah(unit.harga)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3.5 bg-muted/20 dark:bg-muted/5 p-3 rounded-md border border-border/15">
                                            <div className="p-2.5 rounded-md bg-cyan-500/10 text-cyan-500 shrink-0">
                                                <Calendar className="h-4.5 w-4.5" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Tanggal Perolehan</p>
                                                <p className="text-xs font-bold text-foreground">
                                                    {new Date(unit.tanggal_perolehan).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5 bg-muted/20 dark:bg-muted/5 p-3 rounded-md border border-border/15">
                                            <div className="p-2.5 rounded-md bg-violet-500/10 text-violet-500 shrink-0">
                                                <TrendingUp className="h-4.5 w-4.5" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Sumber Dana</p>
                                                <p className="text-xs font-bold text-foreground">
                                                    {unit.sumber_dana.nama} ({unit.sumber_dana.kode})
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5 bg-muted/20 dark:bg-muted/5 p-3 rounded-md border border-border/15">
                                            <div className="p-2.5 rounded-md bg-rose-500/10 text-rose-500 shrink-0">
                                                <Info className="h-4.5 w-4.5" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Nomor Unit Urut</p>
                                                <p className="text-xs font-bold text-foreground">Unit Ke - {unit.nomor_unit}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-md border border-border bg-card shadow-xs">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-border/25 pb-3">
                                <div>
                                    <CardTitle className="text-sm font-bold tracking-tight">Timeline Riwayat Servis / Pemeliharaan</CardTitle>
                                    <CardDescription className="text-[11px]">Daftar riwayat perbaikan berkala dan biaya servis.</CardDescription>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground">Total Pengeluaran Servis</p>
                                    <p className="text-sm font-black text-rose-500 font-mono">{formatRupiah(totalMaintenanceBiaya)}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                {unit.pemeliharaans.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-12 text-center gap-3">
                                        <div className="p-3 bg-muted/40 rounded-full">
                                            <CheckCircle className="h-7 w-7 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-foreground">Kondisi Aset Prima</p>
                                            <p className="text-[10px] text-muted-foreground">Aset ini belum pernah memerlukan perbaikan atau servis pemeliharaan.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative pl-6 border-l-2 border-border/30 space-y-6 ml-2.5">
                                        {unit.pemeliharaans.map((maint) => (
                                            <div key={maint.id} className="relative group">
                                                <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-card border-2 border-purple-500 z-10 transition-transform duration-200 group-hover:scale-125">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                                </span>

                                                <div className="bg-muted/15 dark:bg-muted/2 p-4.5 rounded-md border border-border/15 space-y-2 hover:border-border/40 hover:bg-muted/25 dark:hover:bg-muted/5 transition-all duration-200">
                                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                                                        <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                                                            {maint.kategori || 'Pemeliharaan'}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(maint.tanggal).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs leading-relaxed text-foreground/80">
                                                        {maint.deskripsi}
                                                    </p>

                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2 border-t border-border/10 text-[10px]">
                                                        {maint.petugas && (
                                                            <span className="text-muted-foreground flex items-center gap-1">
                                                                <User className="h-3 w-3" /> Petugas: <span className="font-bold text-foreground">{maint.petugas}</span>
                                                            </span>
                                                        )}
                                                        <span className="font-mono font-bold text-foreground bg-muted/40 dark:bg-muted/10 px-2 py-0.5 rounded ml-auto">
                                                            Biaya: <span className="text-rose-500 font-extrabold">{formatRupiah(maint.biaya)}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                </div>

            </div>
        </>
    );
}

UnitBarangShow.layout = {
    breadcrumbs: [
        {
            title: 'Unit Inventaris',
            href: '/unit-barang',
        },
        {
            title: 'Detail',
            href: '',
        },
    ],
};
