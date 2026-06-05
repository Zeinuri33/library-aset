import { BookOpen } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs transition-transform duration-300 hover:scale-105">
                <BookOpen className="size-4.5" />
            </div>
            <div className="ml-2.5 grid flex-1 text-left">
                <span className="text-xs font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-none">
                    Perpustakaan
                </span>
                <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 leading-none mt-0.5">
                    Ibrahimy
                </span>
            </div>
        </>
    );
}

