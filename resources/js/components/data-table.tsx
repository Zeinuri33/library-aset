import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
    header: ReactNode;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
    zebra?: boolean;
}

export function DataTable<T>({
    data,
    columns,
    keyExtractor,
    emptyMessage = 'Tidak ada data ditemukan.',
    zebra = true,
}: DataTableProps<T>) {
    return (
        <div className="w-full overflow-hidden rounded-md border border-border/45 bg-card shadow-xs transition-shadow duration-200 hover:shadow-md">
            <div className="w-full overflow-x-auto scrollbar-thin">
                <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-muted/40 dark:bg-muted/10 text-muted-foreground border-b border-border/40 sticky top-0 backdrop-blur-xs z-10">
                        <tr>
                            {columns.map((col, idx) => (
                                <th 
                                    key={idx} 
                                    className={cn(
                                        "px-5 py-4 font-bold uppercase tracking-wider text-[10px] select-none",
                                        col.className
                                    )}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/25">
                        {data.length === 0 ? (
                            <tr>
                                <td 
                                    colSpan={columns.length} 
                                    className="px-6 py-16 text-center text-muted-foreground font-semibold text-xs"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="rounded-md bg-muted/40 p-4 border border-border/30">
                                            <svg className="h-8 w-8 text-muted-foreground/60 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </div>
                                        <span>{emptyMessage}</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIdx) => (
                                <tr 
                                    key={keyExtractor(item)} 
                                    className={cn(
                                        "transition-all duration-200 hover:bg-muted/30 dark:hover:bg-muted/5 group",
                                        zebra && rowIdx % 2 === 1 && "bg-muted/10 dark:bg-muted/2"
                                    )}
                                >
                                    {columns.map((col, idx) => (
                                        <td 
                                            key={idx} 
                                            className={cn(
                                                "px-5 py-3.5 font-medium text-foreground/90 transition-transform duration-200 group-hover:translate-x-0.5",
                                                col.className
                                            )}
                                        >
                                            {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
