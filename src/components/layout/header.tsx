"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoFull } from "@/components/brand/logo-full";

const FULL_NAV = [
    { label: "Productos", href: "/productos" },
    { label: "Servicios", href: "/servicios" },
    { label: "Precios", href: "/pricing" },
    { label: "Seguridad", href: "/seguridad", highlight: true },
    { label: "Mundo G.I.R.U", href: "/mundo-giruia", highlight: true },
    { label: "Contacto", href: "/contacto" },
] as ReadonlyArray<{ label: string; href: string; highlight?: boolean }>;

export function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const isActive = (href: string): boolean => {
        if (href.startsWith("/")) {
            if (href === "/") return pathname === "/";
            return pathname === href || pathname.startsWith(`${href}/`);
        }
        return false;
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 bg-onyx/70 backdrop-blur-xl border-b border-white/5"
        >
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                <LogoFull size="md" />

                <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {FULL_NAV.map((item) => {
                        const active = isActive(item.href);
                        const base = "px-3 py-2 text-sm transition-colors duration-200 lg:px-4";
                        const tone = active
                            ? item.highlight
                                ? "text-flash"
                                : "text-paper"
                            : "text-text-secondary hover:text-paper";
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`${base} ${tone}`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    aria-label="Abrir menú"
                    onClick={() => setOpen(true)}
                    className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full border border-border-dark text-paper"
                >
                    <Menu size={16} />
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="md:hidden fixed inset-0 z-50 bg-onyx flex flex-col"
                    >
                        <div className="h-16 flex items-center justify-between px-6 border-b border-border-dark">
                            <LogoFull size="md" />
                            <button
                                type="button"
                                aria-label="Cerrar menú"
                                onClick={() => setOpen(false)}
                                className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border-dark text-paper"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col gap-1 p-6">
                            {FULL_NAV.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="py-4 text-2xl font-semibold tracking-tight text-paper hover:text-flash transition-colors border-b border-border-dark"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
