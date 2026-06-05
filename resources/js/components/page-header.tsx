import React, { ReactNode } from 'react';

export interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
                {description && <p className="text-muted-foreground text-sm">{description}</p>}
            </div>
            {actions && (
                <div className="flex flex-wrap items-center gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}
