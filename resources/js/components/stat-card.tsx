import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    colorScheme?: 'emerald' | 'primary' | 'violet' | 'amber' | 'cyan' | 'rose';
}

export function StatCard({ title, value, description, icon: Icon, colorScheme = 'primary' }: StatCardProps) {
    const colorSchemes = {
        emerald: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
        primary: 'bg-neutral-900/10 text-neutral-900 dark:bg-white/10 dark:text-white',
        violet: 'bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400',
        amber: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
        cyan: 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
        rose: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    };

    return (
        <Card className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 p-5 shadow-xs backdrop-blur-md hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-3">
                <CardTitle className="text-[10px] font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-xl shrink-0 transition-transform duration-350 hover:rotate-6 ${colorSchemes[colorScheme]}`}>
                    <Icon className="h-4.5 w-4.5" />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    {value}
                </div>
                {description && (
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium leading-none mt-1.5">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

