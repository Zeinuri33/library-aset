import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/10 p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
                <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 mb-6 text-sm text-muted-foreground max-w-sm mx-auto">
                {description}
            </p>
            {action && <div>{action}</div>}
        </div>
    );
}
