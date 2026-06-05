import React, { useState, useRef, DragEvent } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Upload, 
    FileSpreadsheet, 
    AlertCircle, 
    CheckCircle2, 
    ArrowLeft, 
    ArrowRight, 
    HelpCircle, 
    Download, 
    Layers, 
    RefreshCw, 
    Info,
    AlertTriangle,
    Eye
} from 'lucide-react';
import { toast } from 'sonner';

interface PreviewRow {
    row_number: number;
    raw: {
        no_inventaris: string;
        nama: string;
        kategori: string;
        volume: string;
        harga: number;
        tanggal_pembelian: string;
        sumber_dana: string;
        kondisi: string;
        lokasi: string;
    };
    valid: boolean;
    errors: string[];
    exists: boolean;
}

interface ImportSummary {
    total: number;
    imported: number;
    skipped: number;
    failed: number;
    errors: Array<{
        row: number;
        no_inventaris: string;
        nama: string;
        message: string;
    }>;
}

export default function ImportInventoryPage() {
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [importStep, setImportStep] = useState<1 | 2 | 3 | 4>(1);
    
    
    const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [duplicateOption, setDuplicateOption] = useState<'skip' | 'overwrite'>('skip');

    
    const [progress, setProgress] = useState<number>(0);
    
    
    const [summary, setSummary] = useState<ImportSummary | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            validateAndSetFile(droppedFile);
        }
    };

    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile: File) => {
        const allowedExtensions = /(\.xlsx|\.xls|\.csv|\.txt)$/i;
        if (!allowedExtensions.exec(selectedFile.name)) {
            toast.error("Format file tidak didukung! Gunakan .xlsx, .xls, atau .csv.");
            return;
        }
        setFile(selectedFile);
        uploadForPreview(selectedFile);
    };

    
    const uploadForPreview = (selectedFile: File) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        fetch('/inventory/import/preview', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Gagal memproses preview file.");
            }
            return data;
        })
        .then((data) => {
            setPreviewData(data.preview);
            setTotalRows(data.total_rows);
            setImportStep(2);
            toast.success("File berhasil dianalisis. Silakan periksa preview data.");
        })
        .catch((error) => {
            toast.error(error.message);
            setFile(null);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    
    const handleImportSubmit = () => {
        if (!file) return;
        setImportStep(3);
        setProgress(15);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('duplicate_option', duplicateOption);

        
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev;
                return prev + Math.floor(Math.random() * 10) + 2;
            });
        }, 600);

        fetch('/inventory/import/process', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            }
        })
        .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Terjadi kesalahan saat mengimpor.");
            }
            return data;
        })
        .then((data) => {
            setProgress(100);
            setTimeout(() => {
                setSummary(data);
                setImportStep(4);
                toast.success(`Import selesai! ${data.imported} aset berhasil diimpor.`);
            }, 500);
        })
        .catch((error) => {
            toast.error(error.message);
            setImportStep(2); 
        })
        .finally(() => {
            clearInterval(progressInterval);
            setIsLoading(false);
        });
    };

    const resetImport = () => {
        setFile(null);
        setPreviewData([]);
        setTotalRows(0);
        setSummary(null);
        setProgress(0);
        setImportStep(1);
    };

    return (
        <>
            <Head title="Import Excel Inventaris" />

            <div className="space-y-6 max-w-6xl mx-auto px-4 py-6">
                
                {}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/10 pb-5">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground/80 font-bold mb-1">
                            <Link href="/unit-barang" className="hover:text-primary transition-colors flex items-center gap-1">
                                <ArrowLeft className="h-3.5 w-3.5" /> Data Aset
                            </Link>
                            <span>/</span>
                            <span>Import Excel</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                            Import Inventaris Enterprise
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Unggah berkas Excel atau CSV untuk memasukkan dan memperbarui data aset secara massal.
                        </p>
                    </div>

                    <a 
                        href="/inventory/import/template"
                        className="inline-flex items-center gap-2 bg-muted/65 hover:bg-muted text-foreground text-sm font-semibold px-4 py-2.5 rounded-xl border border-border/20 transition-all duration-200"
                    >
                        <Download className="h-4 w-4 text-primary" />
                        Download Template CSV
                    </a>
                </div>

                {}
                {importStep === 1 && (
                    <Card className="border-border/15 shadow-xl bg-card/40 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <FileSpreadsheet className="h-5 w-5 text-primary" />
                                Pilih Berkas Inventaris
                            </CardTitle>
                            <CardDescription>
                                Sistem mendukung format .xlsx, .xls, dan .csv dengan header kolom standar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div 
                                className={`relative border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center transition-all duration-200 min-h-[300px] ${
                                    dragActive 
                                        ? "border-primary bg-primary/5 scale-[0.99]" 
                                        : "border-border/30 hover:border-primary/50 bg-muted/5"
                                }`}
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    className="hidden" 
                                    accept=".xlsx,.xls,.csv" 
                                    onChange={handleFileChange}
                                    disabled={isLoading}
                                />
                                
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto" />
                                        <p className="text-sm font-semibold text-muted-foreground">
                                            Menganalisis berkas inventaris...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-w-md">
                                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/20 shadow-inner">
                                            <Upload className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-foreground">
                                                Tarik & lepas file Anda di sini, atau{" "}
                                                <button 
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-primary hover:underline font-bold"
                                                >
                                                    pilih berkas
                                                </button>
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1.5">
                                                Maksimal ukuran berkas 10MB (.xlsx, .xls, atau .csv)
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {}
                            <div className="mt-8 grid md:grid-cols-3 gap-5">
                                <div className="p-4 rounded-xl border border-border/15 bg-muted/10">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                                        <Info className="h-3.5 w-3.5 text-primary" /> Relasi Otomatis
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Kategori, Ruangan/Lokasi, Sumber Dana, dan Barang akan dicari otomatis. Jika belum terdaftar, sistem akan langsung membuatkannya secara instan.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border border-border/15 bg-muted/10">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                                        <Layers className="h-3.5 w-3.5 text-emerald-500" /> Sanitasi Harga
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Format harga Rp. 300.000, 2.000.000, atau 35000000 akan otomatis dibersihkan dan dimasukkan sebagai numerik murni agar aggregate sum akurat.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl border border-border/15 bg-muted/10">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> Duplikasi
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Row dengan No. Inventaris yang sudah terdaftar dapat dilewati secara otomatis (Skip) atau diperbarui secara langsung (Overwrite) sesuai kebutuhan Anda.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {}
                {importStep === 2 && (
                    <div className="space-y-6">
                        {}
                        <Card className="border-border/15 bg-card/40 backdrop-blur-md">
                            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground text-sm">Berkas Terbaca</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {file?.name} ({totalRows} baris terdeteksi)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                                    {}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-muted-foreground">Opsi Duplikat:</span>
                                        <div className="inline-flex bg-muted/70 p-1 rounded-xl border border-border/15">
                                            <button 
                                                onClick={() => setDuplicateOption('skip')}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                    duplicateOption === 'skip'
                                                        ? 'bg-card text-foreground shadow-sm'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                Skip Duplikat
                                            </button>
                                            <button 
                                                onClick={() => setDuplicateOption('overwrite')}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                                    duplicateOption === 'overwrite'
                                                        ? 'bg-card text-foreground shadow-sm'
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                Overwrite Duplikat
                                            </button>
                                        </div>
                                    </div>

                                    {}
                                    <div className="flex items-center gap-2 ml-auto md:ml-0">
                                        <Button variant="outline" size="sm" onClick={resetImport} className="rounded-xl font-bold">
                                            Batal
                                        </Button>
                                        <Button size="sm" onClick={handleImportSubmit} className="rounded-xl font-bold gap-1 bg-primary hover:bg-primary/95 text-primary-foreground shadow-md">
                                            Mulai Impor <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {}
                        <Card className="border-border/15 shadow-lg overflow-hidden bg-card/45">
                            <CardHeader className="border-b border-border/10 bg-muted/10 p-5">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Eye className="h-4.5 w-4.5 text-primary" />
                                    Preview 10 Baris Pertama
                                </CardTitle>
                                <CardDescription>
                                    Validasi struktur data dilakukan secara otomatis. Kolom merah menunjukkan ketidaksesuaian format.
                                </CardDescription>
                            </CardHeader>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                        <tr className="bg-muted/30 border-b border-border/10 text-muted-foreground font-semibold">
                                            <th className="p-3 w-12 text-center">Row</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">No. Inventaris</th>
                                            <th className="p-3">Nama</th>
                                            <th className="p-3">Kategori</th>
                                            <th className="p-3">Harga</th>
                                            <th className="p-3">Tanggal</th>
                                            <th className="p-3">Sumber Dana</th>
                                            <th className="p-3">Kondisi</th>
                                            <th className="p-3">Lokasi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/5">
                                        {previewData.map((row) => (
                                            <tr key={row.row_number} className="hover:bg-muted/10 transition-colors">
                                                <td className="p-3 font-semibold text-muted-foreground text-center">
                                                    {row.row_number}
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex gap-1">
                                                        {row.valid ? (
                                                            <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/20 text-emerald-500 text-[10px] font-bold py-0">
                                                                Valid
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="destructive" className="text-[10px] font-bold py-0">
                                                                Error
                                                            </Badge>
                                                        )}
                                                        {row.exists && (
                                                            <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-500 text-[10px] font-bold py-0">
                                                                Duplikat
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-3 font-mono font-bold text-foreground">
                                                    {row.raw.no_inventaris}
                                                </td>
                                                <td className="p-3 font-semibold">{row.raw.nama}</td>
                                                <td className="p-3">{row.raw.kategori}</td>
                                                <td className="p-3 font-semibold text-right pr-6">
                                                    Rp {row.raw.harga.toLocaleString('id-ID')}
                                                </td>
                                                <td className="p-3">{row.raw.tanggal_pembelian}</td>
                                                <td className="p-3">{row.raw.sumber_dana}</td>
                                                <td className="p-3">
                                                    <Badge variant="outline" className="text-[10px] capitalize font-bold">
                                                        {row.raw.kondisi}
                                                    </Badge>
                                                </td>
                                                <td className="p-3 font-semibold">{row.raw.lokasi}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {}
                        {previewData.some(r => !r.valid) && (
                            <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-2xl p-4 text-destructive">
                                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-sm">Kesalahan Data Ditemukan</h4>
                                    <p className="text-xs opacity-90 mt-1">
                                        Beberapa baris data memiliki kesalahan struktur. Mohon diperiksa kembali sebelum melakukan impor untuk menghindari kegagalan data masuk.
                                    </p>
                                    <ul className="list-disc list-inside text-xs mt-2 space-y-1 opacity-90">
                                        {previewData.filter(r => !r.valid).map(r => (
                                            <li key={r.row_number}>
                                                Baris {r.row_number}: {r.errors.join(', ')}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {}
                {importStep === 3 && (
                    <Card className="border-border/15 shadow-xl bg-card/40 backdrop-blur-md py-12 text-center max-w-xl mx-auto">
                        <CardContent className="space-y-6">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/20 shadow-inner animate-pulse">
                                <RefreshCw className="h-8 w-8 animate-spin" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-foreground">Sedang Mengimpor Aset</h3>
                                <p className="text-sm text-muted-foreground">
                                    Mohon jangan menutup jendela browser Anda. Kami sedang memetakan relasi dan memasukkan data ke database...
                                </p>
                            </div>
                            <div className="space-y-1.5 max-w-sm mx-auto">
                                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-border/10">
                                    <div 
                                        className="h-full bg-primary rounded-full transition-all duration-300 bg-gradient-to-r from-primary to-indigo-600" 
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground font-bold">
                                    <span>Memproses data...</span>
                                    <span>{progress}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {}
                {importStep === 4 && summary && (
                    <div className="space-y-6">
                        {}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="border-border/15 bg-card/45 text-center">
                                <CardContent className="p-5">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Data</p>
                                    <p className="text-3xl font-extrabold text-foreground mt-1.5">{summary.total}</p>
                                </CardContent>
                            </Card>
                            <Card className="border-emerald-500/20 bg-emerald-500/5 text-center border">
                                <CardContent className="p-5">
                                    <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Berhasil Diimport</p>
                                    <p className="text-3xl font-extrabold text-emerald-500 mt-1.5">{summary.imported}</p>
                                </CardContent>
                            </Card>
                            <Card className="border-amber-500/20 bg-amber-500/5 text-center border">
                                <CardContent className="p-5">
                                    <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Dilewati (Duplikat)</p>
                                    <p className="text-3xl font-extrabold text-amber-500 mt-1.5">{summary.skipped}</p>
                                </CardContent>
                            </Card>
                            <Card className="border-destructive/20 bg-destructive/5 text-center border">
                                <CardContent className="p-5">
                                    <p className="text-xs font-semibold text-destructive uppercase tracking-wider">Gagal (Error)</p>
                                    <p className="text-3xl font-extrabold text-destructive mt-1.5">{summary.failed}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {}
                        <Card className="border-border/15 bg-card/40 backdrop-blur-md">
                            <CardContent className="p-5 flex items-center justify-between gap-4">
                                <div className="text-xs text-muted-foreground">
                                    Proses import selesai. Silakan periksa daftar error di bawah ini jika ada data yang gagal masuk.
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" onClick={resetImport} className="rounded-xl font-bold">
                                        Import File Baru
                                    </Button>
                                    <Link href="/unit-barang" className="inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl shadow-md transition-all">
                                        Lihat Data Aset
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {}
                        {summary.errors.length > 0 && (
                            <Card className="border-destructive/15 bg-destructive/5 border overflow-hidden">
                                <CardHeader className="border-b border-destructive/10 bg-destructive/10 p-5 text-destructive">
                                    <CardTitle className="text-base font-bold flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5" />
                                        Log Kesalahan Baris ({summary.errors.length})
                                    </CardTitle>
                                    <CardDescription className="text-destructive/80">
                                        Daftar baris data berikut tidak berhasil diimpor karena kesalahan validasi.
                                    </CardDescription>
                                </CardHeader>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="bg-destructive/10 border-b border-destructive/15 text-destructive/90 font-semibold">
                                                <th className="p-3 w-16 text-center">Row</th>
                                                <th className="p-3 w-48">No. Inventaris</th>
                                                <th className="p-3 w-60">Nama Barang</th>
                                                <th className="p-3">Deskripsi Masalah / Error</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-destructive/10">
                                            {summary.errors.map((err, idx) => (
                                                <tr key={idx} className="hover:bg-destructive/10/5">
                                                    <td className="p-3 font-semibold text-destructive/80 text-center">
                                                        {err.row}
                                                    </td>
                                                    <td className="p-3 font-mono font-bold text-destructive">
                                                        {err.no_inventaris}
                                                    </td>
                                                    <td className="p-3 font-semibold text-foreground">{err.nama}</td>
                                                    <td className="p-3 text-destructive/90 font-medium">
                                                        {err.message}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

ImportInventoryPage.layout = {
    breadcrumbs: [
        {
            title: 'Import Inventaris',
            href: '/inventory/import',
        },
    ],
};
