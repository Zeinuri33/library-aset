import React from 'react';
import { Search, Download, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterOption {
    label: string;
    value: string;
}

interface FilterConfig {
    name: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: FilterOption[];
}

interface TableToolbarProps {
    searchValue: string;
    onSearchChange: (val: string) => void;
    searchPlaceholder?: string;
    filters?: FilterConfig[];
    selectedCount?: number;
    onBulkDelete?: () => void;
    onExportCSV?: () => void;
}

export function TableToolbar({
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Cari...',
    filters = [],
    selectedCount = 0,
    onBulkDelete,
    onExportCSV,
}: TableToolbarProps) {
    return (
        <div className="flex flex-col gap-4 bg-muted/20 dark:bg-muted/5 p-4.5 rounded-md border border-border/40 transition-all duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:max-w-xs group">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="pl-9 h-9.5 rounded-md border-border/50 bg-background hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary shadow-2xs text-xs"
                    />
                    {searchValue && (
                        <button 
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                            title="Hapus Pencarian"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    {filters.map((filter, index) => (
                        <div key={index} className="flex flex-col gap-0.5 min-w-[120px]">
                            <select
                                value={filter.value}
                                onChange={(e) => filter.onChange(e.target.value)}
                                className="flex h-9.5 w-full rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs shadow-2xs transition-colors hover:border-border/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary text-foreground"
                            >
                                <option value="">{filter.label}</option>
                                {filter.options.map((opt, oIdx) => (
                                    <option key={oIdx} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {onExportCSV && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onExportCSV}
                            className="h-9.5 rounded-md border-border/50 bg-background hover:bg-muted font-bold text-xs gap-1.5 shadow-2xs shrink-0 text-foreground ml-auto md:ml-0"
                            title="Ekspor Data ke CSV/Excel"
                        >
                            <Download className="h-3.5 w-3.5" /> Ekspor CSV
                        </Button>
                    )}
                </div>
            </div>

            {selectedCount > 0 && (
                <div className="flex items-center justify-between bg-primary/10 border border-primary/20 p-3.5 rounded-md animate-in fade-in slide-in-from-top-2 duration-200">
                    <span className="text-xs font-bold text-primary">
                        Terpilih <span className="underline underline-offset-4">{selectedCount}</span> baris data
                    </span>
                    <div className="flex gap-2">
                        {onBulkDelete && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={onBulkDelete}
                                className="h-8 rounded-md font-bold text-xs gap-1.5 shadow-sm"
                            >
                                <Trash2 className="h-3.5 w-3.5" /> Hapus Terpilih
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
