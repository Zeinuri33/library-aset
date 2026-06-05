import { Link } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';
import { Sun, Moon, QrCode } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border/40 bg-background/80 px-6 backdrop-blur-md transition-all duration-200 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg" />
                <div className="h-4 w-[1px] bg-border/50 mx-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2">
                {}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 rounded-xl text-primary hover:text-primary hover:bg-primary/10 transition-colors"
                    asChild
                    title="Scan QR Aset"
                >
                    <Link href="/scan">
                        <QrCode className="h-5 w-5" />
                        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                    </Link>
                </Button>

                {}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-transform duration-200 active:scale-95"
                    title={appearance === 'dark' ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
                >
                    {appearance === 'dark' ? (
                        <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all duration-300 rotate-0 scale-100" />
                    ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700 transition-all duration-300 rotate-0 scale-100 dark:text-slate-400" />
                    )}
                </Button>
            </div>
        </header>
    );
}
