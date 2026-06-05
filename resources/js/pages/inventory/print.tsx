import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import {
    Sliders, Printer, RotateCcw, X, Info,
    QrCode, Settings, Eye, ArrowLeft,
    Sun, Moon, ChevronDown, LayoutGrid, FileText, Type,
    Maximize2, AlignJustify
} from 'lucide-react';
import { toast } from 'sonner';

interface UnitBarang {
    id: number;
    kode_inventaris: string;
    kondisi: string;
    status: string;
    harga: number | string;
    tanggal_perolehan: string;
    barang: {
        nama_barang: string;
        kategori: { nama: string } | null;
    };
    ruang: { nama: string } | null;
    sumber_dana: { nama: string } | null;
}

interface PageProps {
    units: UnitBarang[];
    variant: string;
}

interface LabelSettings {
    preset: string;
    layoutType: 'thermal' | 'grid';
    width: number;
    height: number;
    padding: number;
    gap: number;
    columns: number;
    qrSize: number;
    qrPosition: 'left' | 'right' | 'top' | 'bottom' | 'qr-only';
    instansiFontSize: number;
    barangFontSize: number;
    kodeFontSize: number;
    websiteFontSize: number;
    instansiText: string;
    websiteText: string;
    overrideNamaBarang: string;
    showInstansi: boolean;
    showNamaBarang: boolean;
    showKode: boolean;
    showWebsite: boolean;
    showBorder: boolean;
    showQr: boolean;
}

const INSTANSI = 'Inv. Perpustakaan Ibrahimy';
const WEBSITE  = 'www.lib.ibrahimy.ac.id';

const PRESETS: Record<string, Omit<LabelSettings, 'preset'>> = {
    'thermal-80x50': {
        layoutType: 'thermal', width: 80, height: 50, padding: 4, gap: 0, columns: 1, qrSize: 28, qrPosition: 'left',
        instansiFontSize: 8.5, barangFontSize: 9.5, kodeFontSize: 13.0, websiteFontSize: 7.5,
        instansiText: INSTANSI, websiteText: WEBSITE, overrideNamaBarang: '',
        showInstansi: true, showNamaBarang: true, showKode: true, showWebsite: true, showBorder: true, showQr: true,
    },
    'thermal-50x30': {
        layoutType: 'thermal', width: 50, height: 30, padding: 3, gap: 0, columns: 1, qrSize: 18, qrPosition: 'left',
        instansiFontSize: 6.5, barangFontSize: 7.5, kodeFontSize: 10.0, websiteFontSize: 5.5,
        instansiText: INSTANSI, websiteText: WEBSITE, overrideNamaBarang: '',
        showInstansi: true, showNamaBarang: true, showKode: true, showWebsite: true, showBorder: true, showQr: true,
    },
    'thermal-40x30': {
        layoutType: 'thermal', width: 40, height: 30, padding: 2, gap: 0, columns: 1, qrSize: 15, qrPosition: 'left',
        instansiFontSize: 5.5, barangFontSize: 6.5, kodeFontSize: 9.0, websiteFontSize: 5.0,
        instansiText: INSTANSI, websiteText: WEBSITE, overrideNamaBarang: '',
        showInstansi: true, showNamaBarang: true, showKode: true, showWebsite: false, showBorder: true, showQr: true,
    },
    'grid-a4-90x35': {
        layoutType: 'grid', width: 90, height: 35, padding: 3, gap: 4, columns: 2, qrSize: 20, qrPosition: 'left',
        instansiFontSize: 7.5, barangFontSize: 8.5, kodeFontSize: 11.5, websiteFontSize: 6.5,
        instansiText: INSTANSI, websiteText: WEBSITE, overrideNamaBarang: '',
        showInstansi: true, showNamaBarang: true, showKode: true, showWebsite: true, showBorder: true, showQr: true,
    },
    'grid-a4-70x37': {
        layoutType: 'grid', width: 70, height: 37, padding: 3, gap: 3, columns: 3, qrSize: 18, qrPosition: 'left',
        instansiFontSize: 6.5, barangFontSize: 7.5, kodeFontSize: 10.0, websiteFontSize: 5.5,
        instansiText: INSTANSI, websiteText: WEBSITE, overrideNamaBarang: '',
        showInstansi: true, showNamaBarang: true, showKode: true, showWebsite: false, showBorder: true, showQr: true,
    },
};

const DEFAULT_SETTINGS: LabelSettings = { preset: 'thermal-80x50', ...PRESETS['thermal-80x50'] };

// ─── Toggle Switch Component ─────────────────────────────────────────────────
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            id={id}
            onClick={() => onChange(!checked)}
            style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                width: '36px',
                height: '20px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                backgroundColor: checked ? '#6366f1' : '#d1d5db',
                flexShrink: 0,
                outline: 'none',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '2px',
                    left: checked ? '18px' : '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                    transition: 'left 0.2s ease',
                }}
            />
        </button>
    );
}

// ─── Slider Row Component ────────────────────────────────────────────────────
function SliderRow({
    label, value, min, max, step, unit, onChange
}: {
    label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--label-color)' }}>{label}</span>
                <span style={{
                    fontFamily: 'monospace', fontSize: '10px', fontWeight: 700,
                    backgroundColor: 'var(--badge-bg)', color: 'var(--badge-text)',
                    padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.02em',
                }}>{value} {unit}</span>
            </div>
            <input
                type="range" min={min} max={max} step={step ?? 1} value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="lp-range"
            />
        </div>
    );
}

// ─── Section Accordion ───────────────────────────────────────────────────────
function SideSection({
    id, icon, title, color, open, onToggle, children
}: {
    id: string; icon: React.ReactNode; title: string; color: string;
    open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
    return (
        <div className="lp-section">
            <button className="lp-section-header" onClick={onToggle} aria-expanded={open}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="lp-icon-badge" style={{ backgroundColor: `${color}18`, color }}>
                        {icon}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--heading-color)' }}>{title}</span>
                </div>
                <ChevronDown
                    className="lp-chevron"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    size={14}
                />
            </button>
            {open && (
                <div className="lp-section-body">
                    {children}
                </div>
            )}
        </div>
    );
}

// ─── Toggle Row ──────────────────────────────────────────────────────────────
function ToggleRow({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: (v: boolean) => void; id: string }) {
    return (
        <div className="lp-toggle-row">
            <label htmlFor={id} style={{ fontSize: '12px', fontWeight: 500, color: 'var(--body-color)', cursor: 'pointer', flex: 1 }}>
                {label}
            </label>
            <Toggle checked={checked} onChange={onChange} id={id} />
        </div>
    );
}

// ─── Label Component ─────────────────────────────────────────────────────────
function InventoryLabel({ unit, settings }: { unit: UnitBarang; settings: LabelSettings }) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(unit.kode_inventaris)}&size=200x200`;
    const borderStyle = settings.showBorder ? '1.2px solid #000000' : 'none';

    let flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
    if (settings.qrPosition === 'right') flexDirection = 'row-reverse';
    else if (settings.qrPosition === 'top') flexDirection = 'column';
    else if (settings.qrPosition === 'bottom') flexDirection = 'column-reverse';

    const instansiText = settings.instansiText || INSTANSI;
    const websiteText = settings.websiteText || WEBSITE;
    const barangText = settings.overrideNamaBarang || unit.barang.nama_barang;

    if (settings.qrPosition === 'qr-only') {
        return (
            <div className="print-label" style={{
                width: `${settings.width}mm`, height: `${settings.height}mm`, border: borderStyle,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#ffffff', pageBreakInside: 'avoid', breakInside: 'avoid', boxSizing: 'border-box',
                padding: `${settings.padding}mm`,
            }}>
                <img src={qrUrl} alt="QR Code" style={{ width: '95%', height: '95%', objectFit: 'contain' }} />
            </div>
        );
    }

    return (
        <div className="print-label" style={{
            width: `${settings.width}mm`, height: `${settings.height}mm`, border: borderStyle,
            display: 'flex', flexDirection, overflow: 'hidden', background: '#ffffff',
            fontFamily: 'Arial, Helvetica, sans-serif', color: '#000000',
            pageBreakInside: 'avoid', breakInside: 'avoid', boxSizing: 'border-box',
        }}>
            {settings.showQr && (
                <div className="qr-section" style={{
                    width: ['top', 'bottom'].includes(settings.qrPosition) ? '100%' : `${settings.qrSize + (settings.padding * 2)}mm`,
                    height: ['top', 'bottom'].includes(settings.qrPosition) ? `${settings.qrSize + (settings.padding * 2)}mm` : '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: ['left', 'top'].includes(settings.qrPosition) && settings.showBorder ? '1.2px solid #000000' : 'none',
                    borderLeft: settings.qrPosition === 'right' && settings.showBorder ? '1.2px solid #000000' : 'none',
                    borderBottom: settings.qrPosition === 'top' && settings.showBorder ? '1.2px solid #000000' : 'none',
                    borderTop: settings.qrPosition === 'bottom' && settings.showBorder ? '1.2px solid #000000' : 'none',
                    padding: `${settings.padding}mm`, background: '#ffffff', boxSizing: 'border-box',
                }}>
                    <img src={qrUrl} alt="QR" style={{ width: `${settings.qrSize}mm`, height: `${settings.qrSize}mm`, objectFit: 'contain', display: 'block' }} />
                </div>
            )}
            <div className="text-section" style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                padding: `${settings.padding}mm`, overflow: 'hidden', background: '#ffffff', boxSizing: 'border-box',
            }}>
                {settings.showInstansi && (
                    <div style={{ fontSize: `${settings.instansiFontSize}pt`, fontWeight: 'bold', color: '#000', lineHeight: 1.2, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {instansiText}
                    </div>
                )}
                {settings.showNamaBarang && (
                    <div style={{ fontSize: `${settings.barangFontSize}pt`, fontWeight: 'normal', color: '#000', lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: '0.5mm' }}>
                        {barangText}
                    </div>
                )}
                {settings.showKode && (
                    <div style={{ fontSize: `${settings.kodeFontSize}pt`, fontWeight: 'bold', color: '#000', lineHeight: 1.2, letterSpacing: '-0.01em', wordBreak: 'break-all', marginTop: '0.5mm', marginBottom: '0.5mm', fontFamily: "'Courier New', Courier, monospace" }}>
                        {unit.kode_inventaris}
                    </div>
                )}
                {settings.showWebsite && (
                    <div style={{ fontSize: `${settings.websiteFontSize}pt`, fontWeight: 'normal', color: '#000', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {websiteText}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Label Visual Wrapper ────────────────────────────────────────────────────
function LabelVisualWrapper({ children, settings }: { children: React.ReactNode; settings: LabelSettings }) {
    return (
        <div className="relative group my-8 print:my-0 flex items-center justify-center no-print-wrapper">
            <div className="no-print absolute -top-6 left-0 right-0 flex justify-center pointer-events-none select-none">
                <div className="ruler-line-h">
                    <span className="ruler-badge">{settings.width} mm</span>
                </div>
            </div>
            <div className="no-print absolute top-0 -left-6 bottom-0 flex justify-center items-center pointer-events-none select-none">
                <div className="ruler-line-v">
                    <span className="ruler-badge ruler-badge-v">{settings.height} mm</span>
                </div>
            </div>
            <div className="no-print absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-indigo-400/60 pointer-events-none rounded-tl-sm" />
            <div className="no-print absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-indigo-400/60 pointer-events-none rounded-tr-sm" />
            <div className="no-print absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-indigo-400/60 pointer-events-none rounded-bl-sm" />
            <div className="no-print absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-indigo-400/60 pointer-events-none rounded-br-sm" />
            <div className="label-shadow bg-white print:shadow-none print:border-0">
                {children}
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PrintLabels({ units, variant }: PageProps) {
    const [settings, setSettings] = useState<LabelSettings>(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [openSection, setOpenSection] = useState<string>('preset');
    const [isDark, setIsDark] = useState(() =>
        typeof window !== 'undefined'
            ? document.documentElement.classList.contains('dark') || localStorage.getItem('print_theme') === 'dark'
            : false
    );

    useEffect(() => {
        const root = document.documentElement;
        isDark ? root.classList.add('dark') : root.classList.remove('dark');
        localStorage.setItem('print_theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    useEffect(() => {
        const saved = localStorage.getItem('aset_print_settings');
        if (saved) {
            try {
                const p = JSON.parse(saved);
                if (p.instansiFontSize == null) p.instansiFontSize = 8.5;
                if (p.barangFontSize == null) p.barangFontSize = 9.5;
                if (p.kodeFontSize == null) p.kodeFontSize = 13.0;
                if (p.websiteFontSize == null) p.websiteFontSize = 7.5;
                if (p.instansiText == null) p.instansiText = INSTANSI;
                if (p.websiteText == null) p.websiteText = WEBSITE;
                if (p.overrideNamaBarang == null) p.overrideNamaBarang = '';
                setSettings(p);
                setIsLoaded(true);
                return;
            } catch { /* ignore */ }
        }
        let initial = 'thermal-80x50';
        if (variant === 'compact') initial = 'thermal-50x30';
        else if (variant === 'qr-only') {
            setSettings({ ...DEFAULT_SETTINGS, preset: 'custom', qrPosition: 'qr-only' });
            setIsLoaded(true); return;
        } else if (variant === 'qr-only-small') {
            setSettings({ ...DEFAULT_SETTINGS, preset: 'custom', width: 40, height: 30, qrSize: 22, qrPosition: 'qr-only' });
            setIsLoaded(true); return;
        }
        setSettings({ preset: initial, ...PRESETS[initial] });
        setIsLoaded(true);
    }, [variant]);

    useEffect(() => {
        if (isLoaded) localStorage.setItem('aset_print_settings', JSON.stringify(settings));
    }, [settings, isLoaded]);

    const upd = <K extends keyof LabelSettings>(key: K, val: LabelSettings[K]) =>
        setSettings(p => ({ ...p, [key]: val, preset: 'custom' }));

    const handlePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        if (v === 'custom') { setSettings(p => ({ ...p, preset: 'custom' })); return; }
        const d = PRESETS[v];
        if (d) setSettings({ preset: v, ...d });
    };

    const toggle = (s: string) => setOpenSection(p => p === s ? '' : s);

    const printStyles = `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --sidebar-bg: #ffffff;
            --sidebar-border: #e5e7eb;
            --board-bg: #f1f5f9;
            --heading-color: #111827;
            --body-color: #6b7280;
            --label-color: #374151;
            --badge-bg: #f3f4f6;
            --badge-text: #374151;
            --section-border: #e5e7eb;
            --section-bg: #ffffff;
            --input-bg: #ffffff;
            --input-border: #d1d5db;
            --input-text: #111827;
            --hover-bg: #f9fafb;
            --toggle-bg: #e5e7eb;
            --icon-size: 15px;
        }
        .dark {
            --sidebar-bg: #18181b;
            --sidebar-border: #27272a;
            --board-bg: #09090b;
            --heading-color: #f4f4f5;
            --body-color: #a1a1aa;
            --label-color: #d4d4d8;
            --badge-bg: #27272a;
            --badge-text: #d4d4d8;
            --section-border: #27272a;
            --section-bg: #18181b;
            --input-bg: #09090b;
            --input-border: #3f3f46;
            --input-text: #f4f4f5;
            --hover-bg: #27272a;
            --toggle-bg: #3f3f46;
            --icon-size: 15px;
        }

        html, body, #app {
            height: 100%;
            overflow: hidden;
            background: var(--board-bg);
            color: var(--heading-color);
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Arial, sans-serif;
        }

        .lp-layout {
            height: 100vh;
            overflow: hidden;
            position: relative;
        }

        /* ─── Sidebar ─────────────────────────── */
        .lp-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 320px;
            background: var(--sidebar-bg);
            border-right: 1px solid var(--sidebar-border);
            display: flex;
            flex-direction: column;
            z-index: 30;
            overflow: hidden;
        }

        .lp-header {
            padding: 16px;
            border-bottom: 1px solid var(--sidebar-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
        }

        .lp-header-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .lp-app-icon {
            width: 36px; height: 36px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }

        .lp-header-actions {
            display: flex; align-items: center; gap: 4px;
        }

        .lp-icon-btn {
            width: 32px; height: 32px;
            border: none; cursor: pointer; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            background: transparent;
            color: var(--body-color);
            transition: background 0.15s, color 0.15s;
        }
        .lp-icon-btn:hover { background: var(--hover-bg); color: var(--heading-color); }

        /* ─── Scrollable area ─── */
        /* min-height: 0 is CRITICAL for flex column children to respect overflow-y: auto */
        .lp-scroll {
            flex: 1 1 0%;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .lp-scroll::-webkit-scrollbar { width: 6px; }
        .lp-scroll::-webkit-scrollbar-track { background: transparent; }
        .lp-scroll::-webkit-scrollbar-thumb { background: var(--input-border); border-radius: 9999px; }
        .lp-scroll::-webkit-scrollbar-thumb:hover { background: #6366f1; }

        /* ─── Section Card ─── */
        .lp-section {
            border: 1px solid var(--section-border);
            border-radius: 12px;
            overflow: hidden;
            background: var(--section-bg);
        }
        .lp-section-header {
            width: 100%; padding: 12px 14px;
            display: flex; align-items: center; justify-content: space-between;
            background: transparent; border: none; cursor: pointer;
            transition: background 0.12s;
        }
        .lp-section-header:hover { background: var(--hover-bg); }
        .lp-icon-badge {
            width: 28px; height: 28px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .lp-chevron { color: var(--body-color); transition: transform 0.2s ease; }
        .lp-section-body {
            padding: 14px;
            border-top: 1px solid var(--section-border);
            display: flex; flex-direction: column; gap: 14px;
            background: var(--section-bg);
        }

        /* ─── Inputs & Select ─── */
        .lp-input, .lp-select {
            width: 100%; height: 38px;
            border: 1px solid var(--input-border);
            border-radius: 8px;
            background: var(--input-bg);
            color: var(--input-text);
            font-size: 12px; font-weight: 600;
            padding: 0 12px;
            outline: none;
            transition: border-color 0.15s, box-shadow 0.15s;
            appearance: none;
            -webkit-appearance: none;
        }
        .lp-input:focus, .lp-select:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .lp-select {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
            background-position: right 10px center;
            background-size: 16px;
            background-repeat: no-repeat;
            padding-right: 32px;
            cursor: pointer;
        }

        /* ─── Label ─── */
        .lp-label {
            font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
            text-transform: uppercase; color: var(--body-color); display: block; margin-bottom: 6px;
        }

        /* ─── Layout Toggle Tabs ─── */
        .lp-tab-group {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 4px; padding: 3px;
            background: var(--badge-bg);
            border-radius: 10px;
        }
        .lp-tab {
            padding: 7px 0; text-align: center;
            font-size: 11px; font-weight: 700;
            border: none; cursor: pointer; border-radius: 7px;
            transition: background 0.15s, color 0.15s, box-shadow 0.15s;
        }
        .lp-tab-active {
            background: var(--sidebar-bg);
            color: #6366f1;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .lp-tab-inactive { background: transparent; color: var(--body-color); }
        .lp-tab-inactive:hover { color: var(--heading-color); }

        /* ─── Range Slider ─── */
        .lp-range {
            -webkit-appearance: none; appearance: none;
            width: 100%; height: 4px; border-radius: 9999px;
            background: var(--badge-bg);
            outline: none; cursor: pointer;
        }
        .lp-range::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 16px; height: 16px; border-radius: 50%;
            background: #6366f1;
            border: 2.5px solid var(--sidebar-bg);
            box-shadow: 0 1px 4px rgba(99,102,241,0.35);
            cursor: pointer;
            transition: transform 0.1s, box-shadow 0.1s;
        }
        .lp-range::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 2px 8px rgba(99,102,241,0.5); }
        .lp-range::-moz-range-thumb {
            width: 14px; height: 14px; border-radius: 50%;
            background: #6366f1; border: 2px solid var(--sidebar-bg);
            cursor: pointer;
        }

        /* ─── Toggle Row ─── */
        .lp-toggle-row {
            display: flex; align-items: center; justify-content: space-between;
            padding: 6px 8px; border-radius: 8px;
            transition: background 0.12s; cursor: pointer;
            gap: 10px;
        }
        .lp-toggle-row:hover { background: var(--hover-bg); }

        /* ─── Divider ─── */
        .lp-divider { height: 1px; background: var(--section-border); margin: 4px 0; }

        /* ─── Footer Actions ─── */
        .lp-footer {
            padding: 12px 14px;
            border-top: 1px solid var(--sidebar-border);
            display: flex; flex-direction: column; gap: 8px;
            flex-shrink: 0;
            background: var(--sidebar-bg);
        }
        .lp-btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .lp-btn {
            height: 36px; border-radius: 8px;
            font-size: 12px; font-weight: 700;
            border: 1px solid var(--input-border);
            background: var(--section-bg);
            color: var(--label-color);
            cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 6px;
            transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
        }
        .lp-btn:hover { background: var(--hover-bg); box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
        .lp-btn:active { transform: scale(0.97); }

        .lp-print-btn {
            height: 44px; border-radius: 10px;
            font-size: 13px; font-weight: 700;
            border: none; cursor: pointer;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: #ffffff;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
            box-shadow: 0 4px 14px rgba(99,102,241,0.35);
            letter-spacing: 0.01em;
        }
        .lp-print-btn:hover { opacity: 0.92; box-shadow: 0 6px 20px rgba(99,102,241,0.45); }
        .lp-print-btn:active { transform: scale(0.98); }

        /* ─── Preview Board ─── */
        .lp-preview {
            margin-left: 320px;
            height: 100vh;
            overflow-y: auto;
            padding: 40px 48px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--board-bg);
            background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .dark .lp-preview {
            background-color: #09090b;
            background-image: radial-gradient(circle, #27272a 1px, transparent 1px);
        }

        /* ─── Info Banner ─── */
        .lp-banner {
            width: 100%; max-width: 680px; margin-bottom: 32px;
            background: var(--sidebar-bg);
            border: 1px solid var(--section-border);
            border-radius: 12px; padding: 14px 16px;
            display: flex; gap: 12px; align-items: flex-start;
        }
        .lp-banner-icon {
            width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
            background: #eef2ff; color: #6366f1;
            display: flex; align-items: center; justify-content: center;
        }
        .dark .lp-banner-icon { background: #312e81; color: #a5b4fc; }

        /* ─── Ruler ─── */
        .ruler-line-h { width: 100%; border-top: 1.5px dashed #a5b4fc; position: relative; display: flex; justify-content: center; }
        .ruler-line-v { height: 100%; border-left: 1.5px dashed #a5b4fc; position: relative; display: flex; align-items: center; }
        .ruler-badge {
            position: absolute; top: -9px;
            background: #6366f1; color: #fff;
            font-family: monospace; font-size: 9px; font-weight: 800;
            padding: 1px 6px; border-radius: 4px; white-space: nowrap;
        }
        .ruler-badge-v { top: auto; left: -28px; transform: rotate(-90deg); }
        .label-shadow {
            box-shadow: 0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.07);
            border: 1px solid rgba(0,0,0,0.06);
            transition: box-shadow 0.2s;
        }
        .label-shadow:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.18); }

        /* ─── A4 Sheet ─── */
        .lp-a4 {
            width: 210mm; min-height: 297mm; padding: 10mm;
            background: #fff; color: #000;
            box-shadow: 0 8px 40px rgba(0,0,0,0.18);
            border-radius: 4px;
            position: relative;
        }
        .lp-a4-badge {
            position: absolute; top: 8px; right: 10px;
            font-size: 9px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
            color: #cbd5e1; border: 1px solid #e5e7eb; border-radius: 4px;
            padding: 2px 8px; background: #f8fafc; pointer-events: none; user-select: none;
        }

        /* ─── Print Media ─── */
        @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body, html { background: white !important; }
            .no-print, .lp-sidebar, .lp-banner, .no-print-wrapper .ruler-line-h,
            .no-print-wrapper .ruler-line-v, .no-print-wrapper .ruler-badge,
            .no-print-wrapper > div:not(.label-shadow) { display: none !important; }
            .lp-layout { display: block !important; }
            .lp-preview { padding: 0 !important; margin-left: 0 !important; background: white !important; overflow: visible !important; }
            .print-page {
                display: ${settings.layoutType === 'thermal' ? 'block' : 'grid'} !important;
                grid-template-columns: ${settings.layoutType === 'thermal' ? 'none' : `repeat(${settings.columns}, ${settings.width}mm)`} !important;
                gap: ${settings.layoutType === 'thermal' ? '0' : `${settings.gap}mm`} !important;
                justify-content: ${settings.layoutType === 'thermal' ? 'stretch' : 'center'} !important;
                background: white !important; padding: 0 !important; margin: 0 !important;
            }
            .print-label {
                break-inside: avoid !important; page-break-inside: avoid !important; margin: 0 !important;
                ${settings.layoutType === 'thermal' ? 'page-break-after: always !important; break-after: always !important;' : ''}
            }
            .label-shadow { box-shadow: none !important; border: none !important; }
            .no-print-wrapper { margin: 0 !important; }
        }
        @page {
            size: ${settings.layoutType === 'thermal' ? `${settings.width}mm ${settings.height}mm` : 'A4 portrait'};
            margin: ${settings.layoutType === 'thermal' ? '0' : '10mm 10mm'};
        }
    `;

    return (
        <>
            <Head title="Cetak Label Inventaris" />
            <style dangerouslySetInnerHTML={{ __html: printStyles }} />

            <div className="lp-layout">
                {/* ── SIDEBAR ── */}
                <aside className="lp-sidebar no-print">
                    {/* Header */}
                    <div className="lp-header">
                        <div className="lp-header-left">
                            <div className="lp-app-icon">
                                <Printer size={18} color="#fff" />
                            </div>
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: 800, color: 'var(--heading-color)', lineHeight: 1 }}>Cetak Label</p>
                                <p style={{ fontSize: '10px', color: 'var(--body-color)', marginTop: '2px', fontWeight: 600 }}>
                                    {units.length} item dipilih
                                </p>
                            </div>
                        </div>
                        <div className="lp-header-actions">
                            <button className="lp-icon-btn" onClick={() => setIsDark(d => !d)} title={isDark ? 'Terang' : 'Gelap'}>
                                {isDark ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} />}
                            </button>
                            <button className="lp-icon-btn" onClick={() => window.close()} title="Tutup">
                                <X size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Scroll Area */}
                    <div className="lp-scroll">

                        {/* Section: Format & Preset */}
                        <SideSection id="preset" icon={<LayoutGrid size={14} />} title="Format & Preset" color="#6366f1"
                            open={openSection === 'preset'} onToggle={() => toggle('preset')}>
                            <div>
                                <label className="lp-label">Preset Ukuran</label>
                                <select className="lp-select" value={settings.preset} onChange={handlePreset}>
                                    <option value="thermal-80x50">Thermal Besar (80 × 50 mm)</option>
                                    <option value="thermal-50x30">Thermal Sedang (50 × 30 mm)</option>
                                    <option value="thermal-40x30">Thermal Kecil (40 × 30 mm)</option>
                                    <option value="grid-a4-90x35">A4 Grid 2 Kolom (90 × 35 mm)</option>
                                    <option value="grid-a4-70x37">A4 Grid 3 Kolom (70 × 37 mm)</option>
                                    <option value="custom">— Custom Sendiri —</option>
                                </select>
                            </div>
                            <div>
                                <label className="lp-label">Tipe Layout</label>
                                <div className="lp-tab-group">
                                    <button className={`lp-tab ${settings.layoutType === 'thermal' ? 'lp-tab-active' : 'lp-tab-inactive'}`}
                                        onClick={() => upd('layoutType', 'thermal')}>
                                        Thermal / Roll
                                    </button>
                                    <button className={`lp-tab ${settings.layoutType === 'grid' ? 'lp-tab-active' : 'lp-tab-inactive'}`}
                                        onClick={() => upd('layoutType', 'grid')}>
                                        A4 Grid
                                    </button>
                                </div>
                            </div>
                        </SideSection>

                        {/* Section: Dimensi */}
                        <SideSection id="dimensi" icon={<Maximize2 size={14} />} title="Dimensi Stiker" color="#8b5cf6"
                            open={openSection === 'dimensi'} onToggle={() => toggle('dimensi')}>
                            <SliderRow label="Lebar Stiker" value={settings.width} min={20} max={150} unit="mm" onChange={v => upd('width', v)} />
                            <SliderRow label="Tinggi Stiker" value={settings.height} min={15} max={100} unit="mm" onChange={v => upd('height', v)} />
                            <SliderRow label="Padding" value={settings.padding} min={1} max={10} unit="mm" onChange={v => upd('padding', v)} />
                            {settings.layoutType === 'grid' && (
                                <>
                                    <div className="lp-divider" />
                                    <SliderRow label="Jumlah Kolom" value={settings.columns} min={1} max={5} unit="col" onChange={v => upd('columns', v)} />
                                    <SliderRow label="Jarak Antar Label" value={settings.gap} min={0} max={15} unit="mm" onChange={v => upd('gap', v)} />
                                </>
                            )}
                        </SideSection>

                        {/* Section: QR Code */}
                        <SideSection id="qr" icon={<QrCode size={14} />} title="Pengaturan QR Code" color="#0ea5e9"
                            open={openSection === 'qr'} onToggle={() => toggle('qr')}>
                            <ToggleRow label="Tampilkan QR Code" checked={settings.showQr} onChange={v => upd('showQr', v)} id="tgl-qr" />
                            {settings.showQr && (
                                <>
                                    <div>
                                        <label className="lp-label">Posisi QR Code</label>
                                        <select className="lp-select" value={settings.qrPosition}
                                            onChange={e => upd('qrPosition', e.target.value as any)}>
                                            <option value="left">Samping Kiri</option>
                                            <option value="right">Samping Kanan</option>
                                            <option value="top">Di Atas</option>
                                            <option value="bottom">Di Bawah</option>
                                            <option value="qr-only">Hanya QR Code</option>
                                        </select>
                                    </div>
                                    {settings.qrPosition !== 'qr-only' && (
                                        <SliderRow label="Ukuran QR Code" value={settings.qrSize}
                                            min={10} max={Math.min(settings.width - 15, settings.height - 5)}
                                            unit="mm" onChange={v => upd('qrSize', v)} />
                                    )}
                                </>
                            )}
                        </SideSection>

                        {/* Section: Teks */}
                        <SideSection id="text" icon={<Type size={14} />} title="Konten Teks" color="#10b981"
                            open={openSection === 'text'} onToggle={() => toggle('text')}>
                            <div>
                                <label className="lp-label">Nama Instansi</label>
                                <input className="lp-input" type="text" value={settings.instansiText}
                                    onChange={e => upd('instansiText', e.target.value)}
                                    placeholder="Inv. Perpustakaan Ibrahimy" />
                            </div>
                            <div>
                                <label className="lp-label">Override Nama Aset</label>
                                <input className="lp-input" type="text" value={settings.overrideNamaBarang}
                                    onChange={e => upd('overrideNamaBarang', e.target.value)}
                                    placeholder="Biarkan kosong untuk nama asli…" />
                            </div>
                            <div>
                                <label className="lp-label">Website URL</label>
                                <input className="lp-input" type="text" value={settings.websiteText}
                                    onChange={e => upd('websiteText', e.target.value)}
                                    placeholder="www.lib.ibrahimy.ac.id" />
                            </div>
                        </SideSection>

                        {/* Section: Ukuran Huruf & Visibilitas */}
                        <SideSection id="font" icon={<AlignJustify size={14} />} title="Huruf & Visibilitas" color="#f59e0b"
                            open={openSection === 'font'} onToggle={() => toggle('font')}>
                            <SliderRow label="Teks Instansi" value={settings.instansiFontSize} min={4} max={20} step={0.5} unit="pt" onChange={v => upd('instansiFontSize', v)} />
                            <SliderRow label="Teks Nama Aset" value={settings.barangFontSize} min={4} max={20} step={0.5} unit="pt" onChange={v => upd('barangFontSize', v)} />
                            <SliderRow label="Kode Inventaris" value={settings.kodeFontSize} min={6} max={25} step={0.5} unit="pt" onChange={v => upd('kodeFontSize', v)} />
                            <SliderRow label="Website" value={settings.websiteFontSize} min={3} max={15} step={0.5} unit="pt" onChange={v => upd('websiteFontSize', v)} />
                            {settings.qrPosition !== 'qr-only' && (
                                <>
                                    <div className="lp-divider" />
                                    <ToggleRow label="Tampilkan Instansi" checked={settings.showInstansi} onChange={v => upd('showInstansi', v)} id="tgl-instansi" />
                                    <ToggleRow label="Tampilkan Nama Aset" checked={settings.showNamaBarang} onChange={v => upd('showNamaBarang', v)} id="tgl-nama" />
                                    <ToggleRow label="Tampilkan Kode" checked={settings.showKode} onChange={v => upd('showKode', v)} id="tgl-kode" />
                                    <ToggleRow label="Tampilkan Website" checked={settings.showWebsite} onChange={v => upd('showWebsite', v)} id="tgl-website" />
                                </>
                            )}
                            <div className="lp-divider" />
                            <ToggleRow label="Garis Tepi (Border)" checked={settings.showBorder} onChange={v => upd('showBorder', v)} id="tgl-border" />
                        </SideSection>

                    </div>

                    {/* Footer */}
                    <div className="lp-footer">
                        <div className="lp-btn-row">
                            <button className="lp-btn" onClick={() => { setSettings(DEFAULT_SETTINGS); toast.success('Reset ke default'); }}>
                                <RotateCcw size={13} /> Reset
                            </button>
                            <button className="lp-btn" onClick={() => window.close()}>
                                <ArrowLeft size={13} /> Kembali
                            </button>
                        </div>
                        <button className="lp-print-btn" onClick={() => window.print()}>
                            <Printer size={17} />
                            Cetak Label ({units.length} item)
                        </button>
                    </div>
                </aside>

                {/* ── PREVIEW AREA ── */}
                <main className="lp-preview">
                    {/* Info Banner */}
                    <div className="lp-banner no-print">
                        <div className="lp-banner-icon"><Info size={16} /></div>
                        <div>
                            <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--heading-color)', marginBottom: '4px' }}>
                                Pratinjau Label Cetak
                            </p>
                            <p style={{ fontSize: '11px', color: 'var(--body-color)', lineHeight: 1.6 }}>
                                Sesuaikan ukuran stiker menggunakan panel kiri agar cocok dengan kertas label fisik Anda.
                                Pengaturan disimpan otomatis di perangkat ini.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#6366f1' }}>
                                    {settings.width} × {settings.height} mm — {units.length} label
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sheet Preview */}
                    <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                        {settings.layoutType === 'grid' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                {/* A4 label */}
                                <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', width: '210mm', marginBottom: '12px', fontSize: '11px', fontWeight: 700, color: 'var(--body-color)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <LayoutGrid size={14} color="#6366f1" />
                                        <span>A4 Grid — {settings.columns} Kolom</span>
                                    </div>
                                    <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--badge-bg)', padding: '2px 10px', borderRadius: '6px', color: 'var(--badge-text)' }}>210 × 297 mm</span>
                                </div>
                                <div className="lp-a4">
                                    <span className="lp-a4-badge no-print">A4 Sheet Preview</span>
                                    <div className="print-page" style={{ display: 'grid', gridTemplateColumns: `repeat(${settings.columns}, ${settings.width}mm)`, gap: `${settings.gap}mm`, justifyContent: 'center' }}>
                                        {units.map(u => <InventoryLabel key={u.id} unit={u} settings={settings} />)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
                                <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '680px', width: '100%', fontSize: '11px', fontWeight: 700, color: 'var(--body-color)', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FileText size={14} color="#6366f1" />
                                        <span>Thermal Roll Stiker</span>
                                    </div>
                                    <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--badge-bg)', padding: '2px 10px', borderRadius: '6px', color: 'var(--badge-text)' }}>
                                        {settings.width} × {settings.height} mm
                                    </span>
                                </div>
                                <div className="print-page" style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    {units.map(u => (
                                        <LabelVisualWrapper key={u.id} settings={settings}>
                                            <InventoryLabel unit={u} settings={settings} />
                                        </LabelVisualWrapper>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

PrintLabels.layout = null;
