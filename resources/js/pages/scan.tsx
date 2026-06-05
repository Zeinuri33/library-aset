import React, { useEffect, useRef, useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Camera,
    Upload,
    AlertCircle,
    RefreshCw,
    QrCode,
    ArrowLeft,
    Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function QRScannerPage() {
    const [isLibLoaded, setIsLibLoaded] = useState<boolean>(false);
    const [cameraDevices, setCameraDevices] = useState<any[]>([]);
    const [selectedCameraId, setSelectedCameraId] = useState<string>('');
    const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [scanError, setScanError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const qrScannerRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const win = window as any;
        if (win.Html5Qrcode) {
            setIsLibLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
        script.async = true;
        script.onload = () => {
            setIsLibLoaded(true);
        };
        script.onerror = () => {
            setScanError(
                'Gagal memuat pustaka pemindai. Pastikan perangkat Anda terhubung ke internet.',
            );
            setIsLoading(false);
        };
        document.body.appendChild(script);
    }, []);

    const playBeep = () => {
        try {
            const AudioContext =
                window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.12);
        } catch (e) {
            console.warn('Audio feedback not allowed by browser', e);
        }
    };

    useEffect(() => {
        if (!isLibLoaded || activeTab !== 'camera') return;

        const win = window as any;
        const Html5QrcodeClass = win.Html5Qrcode;

        Html5QrcodeClass.getCameras()
            .then((devices: any[]) => {
                if (devices && devices.length > 0) {
                    setCameraDevices(devices);
                    const backCam = devices.find(
                        (device) =>
                            device.label.toLowerCase().includes('back') ||
                            device.label.toLowerCase().includes('rear') ||
                            device.label.toLowerCase().includes('environment'),
                    );
                    setSelectedCameraId(backCam ? backCam.id : devices[0].id);
                } else {
                    setScanError(
                        'Tidak ada kamera yang ditemukan pada perangkat ini.',
                    );
                }
            })
            .catch((err: any) => {
                console.error('Error getting cameras', err);
                setScanError(
                    'Izin akses kamera ditolak atau kamera tidak tersedia.',
                );
            });

        return () => {
            stopCamera();
        };
    }, [isLibLoaded, activeTab]);

    const startCamera = async (cameraId: string) => {
        if (!cameraId || !isLibLoaded) return;
        setIsLoading(true);
        setScanError(null);

        if (qrScannerRef.current) {
            await stopCamera();
        }

        const win = window as any;
        const Html5QrcodeClass = win.Html5Qrcode;
        const scanner = new Html5QrcodeClass('scanner-viewport');
        qrScannerRef.current = scanner;

        try {
            await scanner.start(
                cameraId,
                {
                    fps: 12,
                    qrbox: (width: number, height: number) => {
                        const size = Math.min(width, height) * 0.65;
                        return { width: size, height: size };
                    },
                },
                (decodedText: string) => {
                    handleScanSuccess(decodedText);
                },
                (errorMessage: string) => {},
            );
            setIsCameraActive(true);
            setIsScanning(true);
        } catch (err) {
            console.error('Failed to start camera', err);
            setScanError(
                'Gagal mengaktifkan kamera. Pastikan izin kamera aktif.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const stopCamera = async () => {
        if (qrScannerRef.current && qrScannerRef.current.isScanning) {
            try {
                await qrScannerRef.current.stop();
            } catch (err) {
                console.error('Failed to stop scanner', err);
            }
        }
        qrScannerRef.current = null;
        setIsCameraActive(false);
        setIsScanning(false);
    };

    const handleScanSuccess = (text: string) => {
        playBeep();
        stopCamera();
        toast.success('QR Code berhasil di-scan!');

        router.get(
            '/unit-barang/lookup',
            { code: text },
            {
                onError: (err) => {
                    toast.error('Aset tidak terdaftar dalam sistem.');
                    
                    setTimeout(() => {
                        if (selectedCameraId) startCamera(selectedCameraId);
                    }, 2000);
                },
            },
        );
    };

    useEffect(() => {
        if (selectedCameraId && activeTab === 'camera' && isLibLoaded) {
            startCamera(selectedCameraId);
        }
    }, [selectedCameraId, activeTab, isLibLoaded]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !isLibLoaded) return;

        setIsLoading(true);
        setScanError(null);

        const win = window as any;
        const Html5QrcodeClass = win.Html5Qrcode;
        const tempScanner = new Html5QrcodeClass('file-scan-hidden-div');

        tempScanner
            .scanFile(file, true)
            .then((decodedText: string) => {
                handleScanSuccess(decodedText);
            })
            .catch((err: any) => {
                console.error('File scanning error', err);
                setScanError(
                    'Gagal membaca QR Code dari gambar ini. Pastikan gambar jelas dan mengandung kode QR.',
                );
                toast.error('Gagal memindai gambar.');
            })
            .finally(() => {
                setIsLoading(false);
                tempScanner.clear();
            });
    };

    return (
        <>
            <Head title="Scan QR Inventaris" />
            <style>{`
                @keyframes scanLine {
                    0% { top: 0%; opacity: 0.8; }
                    50% { top: 100%; opacity: 0.8; }
                    100% { top: 0%; opacity: 0.8; }
                }
                .scanner-laser {
                    position: absolute;
                    left: 5%;
                    width: 90%;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #10B981, transparent);
                    box-shadow: 0 0 10px #10B981, 0 0 20px #10B981;
                    animation: scanLine 3s infinite linear;
                    z-index: 10;
                    pointer-events: none;
                }
                #scanner-viewport video {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    border-radius: 1rem !important;
                }
            `}</style>

            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 p-6 md:max-w-xl md:p-8">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl px-3 text-muted-foreground hover:text-foreground"
                        asChild
                    >
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-1.5 h-4 w-4" /> Dashboard
                        </Link>
                    </Button>
                </div>

                <div className="space-y-2 text-center">
                    <h1 className="flex items-center justify-center gap-2 text-2xl font-black tracking-tight text-foreground">
                        <QrCode className="h-7 w-7 animate-pulse text-primary" />{' '}
                        Scan QR Inventaris
                    </h1>
                    <p className="mx-auto max-w-sm text-xs text-muted-foreground">
                        Pindai label fisik barang untuk melihat spesifikasi
                        lengkap, lokasi ruangan, penanggung jawab, dan riwayat
                        pemeliharaan.
                    </p>
                </div>

                {}
                <div className="flex rounded-xl border border-border/25 bg-muted/60 p-1">
                    <button
                        onClick={() => {
                            setActiveTab('camera');
                            setScanError(null);
                        }}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                            activeTab === 'camera'
                                ? 'bg-background text-foreground shadow-xs'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Camera className="h-4 w-4" /> Kamera Langsung
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('upload');
                            stopCamera();
                            setScanError(null);
                        }}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all ${
                            activeTab === 'upload'
                                ? 'bg-background text-foreground shadow-xs'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        <Upload className="h-4 w-4" /> Unggah Gambar
                    </button>
                </div>

                <Card className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/65 shadow-md backdrop-blur-xs">
                    <CardHeader className="border-b border-border/20 pb-3">
                        <CardTitle className="text-sm font-extrabold">
                            Viewfinder Pemindai
                        </CardTitle>
                        <CardDescription className="text-[11px]">
                            {activeTab === 'camera'
                                ? 'Posisikan kode QR di tengah kotak kamera untuk memindai otomatis'
                                : 'Pilih file foto berformat PNG atau JPG yang memuat kode QR'}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-6">
                        {!isLibLoaded &&
                            activeTab === 'camera' &&
                            !scanError && (
                                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-background/80 backdrop-blur-xs">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <span className="text-xs font-bold text-muted-foreground">
                                        Menghubungkan Mesin Pemindai...
                                    </span>
                                </div>
                            )}

                        {isLoading && (
                            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-background/80 backdrop-blur-xs">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="text-xs font-bold text-muted-foreground">
                                    Mempersiapkan Kamera...
                                </span>
                            </div>
                        )}

                        {activeTab === 'camera' ? (
                            <div className="flex w-full flex-col items-center gap-4">
                                {}
                                <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border-2 border-border bg-black/5 dark:bg-black/40">
                                    {}
                                    {isScanning && (
                                        <div className="scanner-laser" />
                                    )}

                                    {}
                                    <div className="pointer-events-none absolute top-4 left-4 z-20 h-6 w-6 rounded-tl-md border-t-4 border-l-4 border-emerald-500" />
                                    <div className="pointer-events-none absolute top-4 right-4 z-20 h-6 w-6 rounded-tr-md border-t-4 border-r-4 border-emerald-500" />
                                    <div className="pointer-events-none absolute bottom-4 left-4 z-20 h-6 w-6 rounded-bl-md border-b-4 border-l-4 border-emerald-500" />
                                    <div className="pointer-events-none absolute right-4 bottom-4 z-20 h-6 w-6 rounded-br-md border-r-4 border-b-4 border-emerald-500" />

                                    <div
                                        id="scanner-viewport"
                                        className="h-full w-full"
                                    />
                                </div>

                                {}
                                {cameraDevices.length > 1 && (
                                    <div className="w-full max-w-[280px] space-y-1">
                                        <label className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                            Ganti Kamera
                                        </label>
                                        <select
                                            value={selectedCameraId}
                                            onChange={(e) =>
                                                setSelectedCameraId(
                                                    e.target.value,
                                                )
                                            }
                                            className="flex h-9.5 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-xs text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                                        >
                                            {cameraDevices.map(
                                                (device, idx) => (
                                                    <option
                                                        key={device.id}
                                                        value={device.id}
                                                    >
                                                        {device.label ||
                                                            `Kamera ${idx + 1}`}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex w-full flex-col items-center justify-center">
                                {}
                                <div
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="group relative flex aspect-video w-full max-w-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 transition-all duration-200 hover:border-primary/50 hover:bg-muted/40"
                                >
                                    <Upload className="mb-2 h-8 w-8 animate-bounce text-muted-foreground transition-colors group-hover:text-primary" />
                                    <span className="text-xs font-bold text-foreground">
                                        Klik untuk Unggah
                                    </span>
                                    <span className="mt-1 text-[10px] text-muted-foreground/80">
                                        Format gambar .png, .jpg, .jpeg
                                    </span>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            </div>
                        )}

                        {}
                        {scanError && (
                            <div className="mt-4 flex max-w-[280px] items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive dark:bg-destructive/20">
                                <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                                <div>
                                    <p className="font-bold">
                                        Masalah Pemindaian
                                    </p>
                                    <p className="opacity-90">{scanError}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {}
                <div id="file-scan-hidden-div" className="hidden" />

                {}
                {activeTab === 'camera' && isCameraActive && (
                    <div className="flex items-center justify-center gap-1.5 rounded-xl border border-border/15 bg-muted/30 p-2.5 text-xs font-bold text-muted-foreground/80">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        Lensa Kamera Aktif & Siap Memindai
                    </div>
                )}
            </div>
        </>
    );
}

QRScannerPage.layout = {
    breadcrumbs: [
        {
            title: 'Scan QR Aset',
            href: '/scan',
        },
    ],
};
