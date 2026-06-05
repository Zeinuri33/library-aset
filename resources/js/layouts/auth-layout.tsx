import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage().props;

    return (
        <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-neutral-50 p-4 md:p-10 dark:bg-neutral-950">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:3rem_3rem] opacity-[0.25] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] dark:opacity-[0.4]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 mix-blend-screen blur-[100px]" />

            <div className="relative z-10 w-full max-w-[440px] animate-in duration-500 ease-out fade-in slide-in-from-bottom-4">
                <div className="mb-6 flex flex-col items-center gap-3 text-center">
                    <Link href="/">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-primary-foreground shadow-xl shadow-primary/25">
                            <AppLogoIcon className="h-6 w-6 fill-current" />
                        </div>
                    </Link>
                    <div className="space-y-0.5">
                        <span className="bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-500 bg-clip-text font-mono text-[12px] font-black tracking-[0.2em] text-transparent uppercase dark:from-neutral-300 dark:via-neutral-400 dark:to-neutral-500">
                            PERPUSTAKAAN IBRAHIMY
                        </span>
                        <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                            Assets Management System
                        </p>
                    </div>
                </div>

                <div className="rounded-3xl border border-neutral-200/60 bg-white/90 p-8 shadow-xl shadow-neutral-200/50 backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-900/90 dark:shadow-none">
                    {children}
                </div>
            </div>
        </div>
    );
}
