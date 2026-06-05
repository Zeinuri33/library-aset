import { Form, Head, Link, usePage } from '@inertiajs/react';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { useState } from 'react';
import {
    Eye,
    EyeOff,
    Loader2,
    Library,
    BookOpen,
    ShieldCheck,
} from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const { name } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen w-screen overflow-hidden bg-white dark:bg-neutral-950">
            <Head title="Masuk Ke Akun" />

            <div className="relative hidden flex-col justify-between border-r border-neutral-200/10 bg-neutral-900 p-12 text-white md:flex md:w-1/2 dark:bg-neutral-950">
                <img
                    src="/path-ke-gambar-kamu.jpg"
                    alt="Library Background"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#262626,transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,#171717,transparent_60%)]" />
                <div className="absolute top-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-neutral-500/10 blur-[80px]" />

                <div className="relative z-10 flex items-center gap-3">
                    {}
                    <img
                        src="/images/logo.png"
                        alt="Logo Perpustakaan Ibrahimy"
                        className="h-15 w-auto object-contain"
                    />

                    {}
                    <div className="flex flex-col">
                        <span className="font-mono text-xs font-black tracking-[0.2em] text-neutral-200 uppercase">
                            {name || 'PERPUSTAKAAN IBRAHIMY'}
                        </span>
                        <span className="text-[10px] font-medium tracking-wide text-neutral-400 uppercase">
                            Assets Management System
                        </span>
                    </div>
                </div>

                <div className="relative z-10 my-auto max-w-md space-y-4">
                    <h2 className="bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                        KELOLA ASET PERPUSTAKAAN IBRAHIMY
                    </h2>
                </div>

                <div className="relative z-10 flex flex-col gap-6 pt-6 text-xs text-neutral-400">
                    <div className="flex items-center gap-2 border-t border-neutral-800 pt-5 text-neutral-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 text-neutral-600"
                        >
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                        <div className="flex flex-col items-center gap-1 font-medium sm:flex-row">
                            <span>&copy; 2026 Perpustakaan Ibrahimy.</span>
                            <span>
                                Developed by{' '}
                                <span className="font-semibold text-neutral-300">
                                    Amjad Bawazin
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex w-full flex-col items-center justify-center bg-neutral-50 p-6 sm:p-12 md:w-1/2 md:p-16 dark:bg-neutral-950">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:3rem_3rem] opacity-[0.2] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] dark:opacity-[0.3]" />

                <div className="relative z-10 w-full max-w-[380px] animate-in duration-500 ease-out fade-in slide-in-from-bottom-4">
                    <div className="relative z-10 mb-6 flex items-center justify-center gap-3 md:hidden">
                        {}
                        <div className="flex flex-col items-center justify-center">
                            <span className="font-mono text-xs font-black tracking-[0.2em] text-neutral-800 uppercase dark:text-neutral-200">
                                {name || 'PERPUSTAKAAN IBRAHIMY'}
                            </span>
                            <span className="text-[10px] font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                                Assets Management System
                            </span>
                        </div>
                    </div>

                    {}
                    <div className="mb-6 flex flex-col text-left md:text-left">
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                            Masuk Ke Akun
                        </h1>
                        <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                            Masukkan email dan kata sandi Anda untuk mengakses
                            dashboard pengelola.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-center text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4">
                                    <div className="grid gap-1.5">
                                        <label
                                            htmlFor="email"
                                            className="cursor-pointer text-xs font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300"
                                        >
                                            Alamat Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="Masukkan alamat email"
                                            className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 ring-offset-white transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-800"
                                        />
                                        {errors.email && (
                                            <p className="mt-0.5 text-xs font-medium text-red-500 dark:text-red-400">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor="password"
                                                className="cursor-pointer text-xs font-semibold tracking-wide text-neutral-700 uppercase dark:text-neutral-300"
                                            >
                                                Kata Sandi
                                            </label>
                                            {canResetPassword && (
                                                <Link
                                                    href={request()}
                                                    className="text-xs font-medium text-neutral-500 underline-offset-4 transition-colors duration-200 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
                                                    tabIndex={5}
                                                >
                                                    Lupa kata sandi?
                                                </Link>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Masukkan kata sandi"
                                                className="flex h-10 w-full rounded-xl border border-neutral-200 bg-white py-2 pr-10 pl-3 text-sm text-neutral-900 ring-offset-white transition-all placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-800"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 focus:outline-none dark:hover:text-neutral-300"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-0.5 text-xs font-medium text-red-500 dark:text-red-400">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2.5 py-1">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-neutral-900 accent-neutral-950 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:accent-neutral-50 dark:focus:ring-neutral-800"
                                        />
                                        <label
                                            htmlFor="remember"
                                            className="cursor-pointer text-xs font-medium text-neutral-500 select-none dark:text-neutral-400"
                                        >
                                            Ingat saya di perangkat ini
                                        </label>
                                    </div>

                                    {}
                                    <button
                                        type="submit"
                                        className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-neutral-900 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin text-current" />
                                                <span>Memproses...</span>
                                            </div>
                                        ) : (
                                            'Masuk Ke Sistem'
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

Login.layout = null;
