import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Package,
    Box,
    Wrench,
    Activity,
    Plus,
    QrCode,
    ClipboardList,
    DollarSign,
    Layers,
    MapPin,
    ArrowUpRight,
    TrendingUp,
    Upload,
} from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { PageHeader } from '@/components/page-header';

interface DashboardProps {
    statistics: {
        total_barang: number;
        total_unit_inventaris: number;
        total_kategori: number;
        total_ruang: number;
        total_sumber_dana: number;
        total_nilai_aset: number;
        recent_maintenance: {
            id: number;
            deskripsi: string;
            biaya: string | number;
            tanggal: string;
            unit_barang: {
                kode_inventaris: string;
                kondisi: string;
                barang: { nama_barang: string };
                ruang: { nama: string } | null;
            };
        }[];
        recent_inventory: {
            id: number;
            kode_inventaris: string;
            tanggal_perolehan: string;
            barang: { nama_barang: string };
            ruang: { nama: string } | null;
            sumber_dana: { nama: string } | null;
        }[];
        chart_kategori: { name: string; count: number; value: number }[];
        chart_kondisi: { name: string; value: number; color: string }[];
        chart_maintenance: { label: string; value: number }[];
        chart_inventory: { label: string; value: number }[];
    };
}

function DonutChart({
    data,
}: {
    data: { name: string; value: number; color: string }[];
}) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let accumulatedCircumference = 0;
    const radius = 60;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius; 

    return (
        <div className="flex flex-col items-center justify-center gap-8 p-4 sm:flex-row">
            <div className="relative h-36 w-36 flex-shrink-0">
                <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        className="stroke-muted/40 dark:stroke-muted/10"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {total > 0
                        ? data.map((item, idx) => {
                              const percent = item.value / total;
                              const strokeLength = percent * circumference;
                              const strokeOffset =
                                  circumference -
                                  strokeLength +
                                  accumulatedCircumference;
                              accumulatedCircumference -= strokeLength;
                              return (
                                  <circle
                                      key={idx}
                                      cx="80"
                                      cy="80"
                                      r={radius}
                                      stroke={item.color}
                                      strokeWidth={strokeWidth}
                                      strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
                                      strokeDashoffset={strokeOffset}
                                      strokeLinecap="round"
                                      fill="transparent"
                                      className="origin-center transition-all duration-700 ease-out"
                                  />
                              );
                          })
                        : null}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black tracking-tight text-foreground">
                        {total}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        Aset Fisik
                    </span>
                </div>
            </div>

            <div className="flex w-full max-w-xs flex-1 flex-col justify-center gap-2.5">
                {data.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-border/20 bg-muted/30 p-2 text-xs dark:bg-muted/5"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="font-semibold text-muted-foreground">
                                {item.name}
                            </span>
                        </div>
                        <span className="font-bold text-foreground">
                            {item.value} unit{' '}
                            <span className="font-normal text-muted-foreground/60">
                                (
                                {total > 0
                                    ? Math.round((item.value / total) * 100)
                                    : 0}
                                %)
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MaintenanceLineChart({
    data,
}: {
    data: { label: string; value: number }[];
}) {
    const maxVal = Math.max(...data.map((d) => d.value), 100000);
    const height = 150;
    const width = 450;
    const padding = 35;

    const points = data.map((d, index) => {
        const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
        const y =
            height - padding - (d.value * (height - 2 * padding)) / maxVal;
        return { x, y, label: d.label, val: d.value };
    });

    
    let pathD = '';
    if (points.length > 0) {
        pathD = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const cpX1 = p0.x + (p1.x - p0.x) / 2;
            const cpY1 = p0.y;
            const cpX2 = p0.x + (p1.x - p0.x) / 2;
            const cpY2 = p1.y;
            pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
        }
    }

    const areaD =
        points.length > 0
            ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
            : '';

    const formatRpShort = (val: number) => {
        if (val >= 1000000) return `${(val / 1000000).toFixed(1)}jt`;
        if (val >= 1000) return `${(val / 1000).toFixed(0)}rb`;
        return val.toString();
    };

    return (
        <div className="flex w-full flex-col gap-2 p-1">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full overflow-visible"
            >
                <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity="0.25"
                        />
                        <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                {}
                {[0, 0.5, 1].map((ratio, idx) => {
                    const y = padding + ratio * (height - 2 * padding);
                    const val = maxVal * (1 - ratio);
                    return (
                        <g key={idx} className="opacity-50">
                            <line
                                x1={padding}
                                y1={y}
                                x2={width - padding}
                                y2={y}
                                className="stroke-dashed stroke-muted-foreground/20"
                                strokeDasharray="3 3"
                            />
                            <text
                                x={padding - 8}
                                y={y + 3}
                                textAnchor="end"
                                className="fill-muted-foreground text-[8px] font-bold"
                            >
                                {formatRpShort(val)}
                            </text>
                        </g>
                    );
                })}

                {}
                {areaD && <path d={areaD} fill="url(#areaGrad)" />}

                {}
                {pathD && (
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}

                {}
                {points.map((p, idx) => (
                    <g key={idx} className="group/dot">
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r="4"
                            className="hover:r-6 cursor-pointer fill-background stroke-purple-500 transition-all duration-200"
                            strokeWidth="2.5"
                        />
                        <g className="pointer-events-none opacity-0 transition-all duration-200 group-hover/dot:opacity-100">
                            <rect
                                x={p.x - 50}
                                y={p.y - 30}
                                width="100"
                                height="20"
                                rx="4"
                                className="border fill-slate-900 text-white dark:fill-slate-100 dark:text-slate-900"
                                strokeWidth="0"
                            />
                            <text
                                x={p.x}
                                y={p.y - 17}
                                textAnchor="middle"
                                className="fill-slate-100 text-[8.5px] font-bold dark:fill-slate-900"
                            >
                                Rp {p.val.toLocaleString('id-ID')}
                            </text>
                        </g>
                    </g>
                ))}

                {}
                {points.map((p, idx) => (
                    <text
                        key={idx}
                        x={p.x}
                        y={height - padding + 16}
                        textAnchor="middle"
                        className="fill-muted-foreground text-[8.5px] font-bold"
                    >
                        {p.label.split(' ')[0]}
                    </text>
                ))}
            </svg>
        </div>
    );
}

function InventoryBarChart({
    data,
}: {
    data: { label: string; value: number }[];
}) {
    const maxVal = Math.max(...data.map((d) => d.value), 5);
    const height = 150;
    const width = 450;
    const padding = 35;
    const barWidth = 20;

    const points = data.map((d, index) => {
        const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
        const y =
            height - padding - (d.value * (height - 2 * padding)) / maxVal;
        return { x, y, label: d.label, val: d.value };
    });

    return (
        <div className="flex w-full flex-col gap-2 p-1">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full overflow-visible"
            >
                {}
                {[0, 0.5, 1].map((ratio, idx) => {
                    const y = padding + ratio * (height - 2 * padding);
                    const val = Math.round(maxVal * (1 - ratio));
                    return (
                        <g key={idx} className="opacity-50">
                            <line
                                x1={padding}
                                y1={y}
                                x2={width - padding}
                                y2={y}
                                className="stroke-dashed stroke-muted-foreground/20"
                                strokeDasharray="3 3"
                            />
                            <text
                                x={padding - 8}
                                y={y + 3}
                                textAnchor="end"
                                className="fill-muted-foreground text-[8px] font-bold"
                            >
                                {val}
                            </text>
                        </g>
                    );
                })}

                {}
                {points.map((p, idx) => {
                    const barHeight = height - padding - p.y;
                    return (
                        <g key={idx} className="group/bar">
                            <rect
                                x={p.x - barWidth / 2}
                                y={p.y}
                                width={barWidth}
                                height={Math.max(barHeight, 2)}
                                rx="4"
                                className="cursor-pointer fill-emerald-500/85 transition-colors duration-200 hover:fill-emerald-500 dark:fill-emerald-600/85 dark:hover:fill-emerald-500"
                            />
                            <g className="pointer-events-none opacity-0 transition-all duration-200 group-hover/bar:opacity-100">
                                <rect
                                    x={p.x - 30}
                                    y={p.y - 28}
                                    width="60"
                                    height="20"
                                    rx="4"
                                    className="fill-slate-900 text-white dark:fill-slate-100 dark:text-slate-900"
                                    strokeWidth="0"
                                />
                                <text
                                    x={p.x}
                                    y={p.y - 15}
                                    textAnchor="middle"
                                    className="fill-slate-100 text-[9px] font-bold dark:fill-slate-900"
                                >
                                    +{p.val} unit
                                </text>
                            </g>
                        </g>
                    );
                })}

                {}
                {points.map((p, idx) => (
                    <text
                        key={idx}
                        x={p.x}
                        y={height - padding + 16}
                        textAnchor="middle"
                        className="fill-muted-foreground text-[8.5px] font-bold"
                    >
                        {p.label.split(' ')[0]}
                    </text>
                ))}
            </svg>
        </div>
    );
}

export default function Dashboard({ statistics }: DashboardProps) {
    const { auth } = usePage().props as {
        auth: { user: { role?: string } | null };
    };
    const userRole = auth?.user?.role ?? 'Staff';
    const canImport = ['Super Admin', 'Admin Inventaris', 'Staff'].includes(
        userRole,
    );

    const stats = [
        {
            title: 'Total Nilai Aset',
            value: `Rp ${statistics.total_nilai_aset.toLocaleString('id-ID')}`,
            icon: DollarSign,
            description: 'Akumulasi total nilai perolehan',
            colorScheme: 'emerald' as const,
        },
        {
            title: 'Total Barang',
            value: statistics.total_barang,
            icon: Package,
            description: 'Model master barang terdaftar',
            colorScheme: 'primary' as const,
        },
        {
            title: 'Total Unit',
            value: statistics.total_unit_inventaris,
            icon: Box,
            description: 'Total fisik item aset',
            colorScheme: 'violet' as const,
        },
        {
            title: 'Kategori',
            value: statistics.total_kategori,
            icon: Layers,
            description: 'Kategori pengelompokan',
            colorScheme: 'amber' as const,
        },
        {
            title: 'Ruangan',
            value: statistics.total_ruang,
            icon: MapPin,
            description: 'Lokasi penempatan barang',
            colorScheme: 'cyan' as const,
        },
        {
            title: 'Servis Pemeliharaan',
            value: statistics.recent_maintenance.length,
            icon: Wrench,
            description: 'Unit dalam pemeliharaan aktif',
            colorScheme: 'rose' as const,
        },
    ];

    const getKondisiPercentage = (cond: string) => {
        const item = statistics.chart_kondisi.find(
            (c) => c.name.toLowerCase() === cond.toLowerCase(),
        );
        if (!item || statistics.total_unit_inventaris === 0) return 0;
        return Math.round(
            (item.value / statistics.total_unit_inventaris) * 100,
        );
    };

    return (
        <>
            <Head title="Dashboard Inventaris" />
            <div className="mx-auto flex h-full w-full flex-1 flex-col gap-6 overflow-x-auto p-6 md:max-w-7xl md:p-8">
                <PageHeader
                    title="Dashboard Inventaris Aset"
                    description="Sistem pengelolaan dan pemantauan aset perpustakaan."
                    actions={<div className="flex flex-wrap gap-2"></div>}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="rounded-2xl border border-neutral-100 bg-white/60 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-sm dark:border-neutral-800/80 dark:bg-neutral-950/40">
                        <CardHeader className="border-b border-neutral-100 p-5 pb-4 dark:border-neutral-800/80">
                            <div className="flex items-center gap-2.5">
                                <div className="shrink-0 rounded-xl bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                                    <Wrench className="h-4 w-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black tracking-wider text-neutral-900 uppercase dark:text-white">
                                        Biaya Pemeliharaan
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[10px] font-medium text-neutral-500">
                                        Tren biaya perawatan & servis (6 bulan
                                        terakhir)
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-6">
                            <MaintenanceLineChart
                                data={statistics.chart_maintenance}
                            />
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border border-neutral-100 bg-white/60 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-sm dark:border-neutral-800/80 dark:bg-neutral-950/40">
                        <CardHeader className="border-b border-neutral-100 p-5 pb-4 dark:border-neutral-800/80">
                            <div className="flex items-center gap-2.5">
                                <div className="shrink-0 rounded-xl bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                                    <Activity className="h-4 w-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black tracking-wider text-neutral-900 uppercase dark:text-white">
                                        Kondisi Aset Fisik
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[10px] font-medium text-neutral-500">
                                        Distribusi kondisi fisik aset dalam
                                        sistem
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-2">
                            <DonutChart data={statistics.chart_kondisi} />
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border border-neutral-100 bg-white/60 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-sm dark:border-neutral-800/80 dark:bg-neutral-950/40">
                        <CardHeader className="border-b border-neutral-100 p-5 pb-4 dark:border-neutral-800/80">
                            <div className="flex items-center gap-2.5">
                                <div className="shrink-0 rounded-xl bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black tracking-wider text-neutral-900 uppercase dark:text-white">
                                        Registrasi Unit Baru
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[10px] font-medium text-neutral-500">
                                        Grafik penambahan unit inventaris baru
                                        (6 bulan terakhir)
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-6">
                            <InventoryBarChart
                                data={statistics.chart_inventory}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <Card className="rounded-2xl border border-neutral-100 bg-white/60 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-sm xl:col-span-2 dark:border-neutral-800/80 dark:bg-neutral-950/40">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 p-5 pb-4 dark:border-neutral-800/80">
                            <div className="flex items-center gap-2.5">
                                <div className="shrink-0 rounded-xl bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                                    <Box className="h-4 w-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black tracking-wider text-neutral-900 uppercase dark:text-white">
                                        Inventaris Terbaru
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[10px] font-medium text-neutral-500">
                                        Daftar unit fisik yang baru saja
                                        ditambahkan
                                    </CardDescription>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="shadow-3xs gap-1.5 rounded-xl border border-neutral-200 px-3.5 py-1.5 text-[10.5px] font-semibold text-neutral-700 transition-all duration-200 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                                asChild
                            >
                                <Link href="/unit-barang">
                                    Lihat Semua{' '}
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-neutral-100 bg-neutral-50/50 text-neutral-600 dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:text-neutral-400">
                                        <tr>
                                            <th className="px-6 py-3 text-[10px] font-black tracking-wider uppercase">
                                                Aset / Barang
                                            </th>
                                            <th className="px-6 py-3 text-[10px] font-black tracking-wider uppercase">
                                                Kode Inventaris
                                            </th>
                                            <th className="px-6 py-3 text-[10px] font-black tracking-wider uppercase">
                                                Ruang Lokasi
                                            </th>
                                            <th className="px-6 py-3 text-right text-[10px] font-black tracking-wider uppercase">
                                                Tgl Perolehan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                        {statistics.recent_inventory.map(
                                            (item) => (
                                                <tr
                                                    key={item.id}
                                                    className="transition-colors duration-200 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50"
                                                >
                                                    <td className="px-6 py-3.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                                        <Link
                                                            href={`/unit-barang/${item.id}`}
                                                            className="flex items-center gap-2 hover:underline"
                                                        >
                                                            {
                                                                item.barang
                                                                    .nama_barang
                                                            }
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-3.5">
                                                        <Badge
                                                            variant="outline"
                                                            className="dark:text-neutral-350 rounded-md border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900"
                                                        >
                                                            {
                                                                item.kode_inventaris
                                                            }
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-3.5 font-semibold text-muted-foreground">
                                                        {item.ruang?.nama ??
                                                            '-'}
                                                    </td>
                                                    <td className="px-6 py-3.5 text-right font-semibold text-muted-foreground">
                                                        {new Date(
                                                            item.tanggal_perolehan,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )}
                                        {statistics.recent_inventory.length ===
                                            0 && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-12 text-center font-medium text-muted-foreground"
                                                >
                                                    Tidak ada unit inventaris
                                                    terbaru.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border border-neutral-100 bg-white/60 shadow-xs backdrop-blur-md transition-all duration-300 hover:shadow-sm dark:border-neutral-800/80 dark:bg-neutral-950/40">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 p-5 pb-4 dark:border-neutral-800/80">
                            <div className="flex items-center gap-2.5">
                                <div className="shrink-0 rounded-xl bg-neutral-100 p-2 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                                    <ClipboardList className="h-4 w-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black tracking-wider text-neutral-900 uppercase dark:text-white">
                                        Pemeliharaan Terkini
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[10px] font-medium text-neutral-500">
                                        Riwayat perawatan unit aset fisik
                                    </CardDescription>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="shadow-3xs gap-1.5 rounded-xl border border-neutral-200 px-3.5 py-1.5 text-[10.5px] font-semibold text-neutral-700 transition-all duration-200 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
                                asChild
                            >
                                <Link href="/pemeliharaan">
                                    Lihat Semua{' '}
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex max-h-[340px] flex-col divide-y divide-neutral-200 overflow-y-auto dark:divide-neutral-800">
                                {statistics.recent_maintenance.map((maint) => {
                                    const condColors = {
                                        baik: 'border-emerald-500/20 text-emerald-600 bg-emerald-500/10 dark:bg-emerald-500/20 dark:text-emerald-400',
                                        rusak_ringan:
                                            'border-amber-500/20 text-amber-600 bg-amber-500/10 dark:bg-amber-500/20 dark:text-amber-400',
                                        rusak_berat:
                                            'border-rose-500/20 text-rose-600 bg-rose-500/10 dark:bg-rose-500/20 dark:text-rose-400',
                                    };
                                    return (
                                        <div
                                            key={maint.id}
                                            className="flex items-start justify-between p-5 transition-colors duration-200 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50"
                                        >
                                            <div className="space-y-1">
                                                <p className="text-xs leading-snug font-bold text-neutral-900 dark:text-white">
                                                    {
                                                        maint.unit_barang.barang
                                                            .nama_barang
                                                    }
                                                </p>
                                                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                                    <span className="dark:bg-neutral-850 rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                                                        {
                                                            maint.unit_barang
                                                                .kode_inventaris
                                                        }
                                                    </span>
                                                    <span className="text-[9.5px] font-medium text-neutral-500">
                                                        {new Date(
                                                            maint.tanggal,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: 'numeric',
                                                                month: 'short',
                                                            },
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="max-w-[190px] truncate pt-1 text-[10px] text-neutral-500 italic dark:text-neutral-400">
                                                    &ldquo;{maint.deskripsi}
                                                    &rdquo;
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end justify-between gap-1.5 text-right">
                                                <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                                                    Rp{' '}
                                                    {Number(
                                                        maint.biaya,
                                                    ).toLocaleString('id-ID')}
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className={`rounded-full border px-2.5 py-0.5 text-[8.5px] font-bold uppercase ${
                                                        condColors[
                                                            maint.unit_barang
                                                                .kondisi as keyof typeof condColors
                                                        ] || 'bg-neutral-100'
                                                    }`}
                                                >
                                                    {maint.unit_barang.kondisi.replace(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </Badge>
                                            </div>
                                        </div>
                                    );
                                })}
                                {statistics.recent_maintenance.length === 0 && (
                                    <div className="p-8 text-center text-xs font-medium text-muted-foreground">
                                        Tidak ada catatan pemeliharaan aktif.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ],
};
