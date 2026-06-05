import { usePage } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative flex min-h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-neutral-50 p-4 md:p-10 dark:bg-neutral-950">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]" />

            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 mix-blend-screen blur-[90px]" />

            <div className="relative z-10 w-full max-w-[440px] animate-in duration-500 ease-out fade-in slide-in-from-bottom-4">
                <div className="mb-4 text-center">
                    <span className="font-mono text-[10px] font-black tracking-[0.2em] text-neutral-400 uppercase dark:text-neutral-500">
                        {name}
                    </span>
                </div>

                <div className="w-full">{children}</div>
            </div>
        </div>
    );
}
