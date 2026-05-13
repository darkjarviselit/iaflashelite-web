"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-onyx/85 backdrop-blur-md border-b border-border-dark"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
                <Logo />
                <nav className="hidden md:flex items-center gap-1">
                    {NAV.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="px-4 py-2 text-sm text-text-secondary hover:text-paper transition-colors duration-200"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className="hidden md:block">
                    <Button href="/contacto" size="sm">
                        Empezar →
                    </Button>
                </div>

                <button
                    type="button"
                    aria-label="Abrir menú"
                    onClick={() => setOpen(true)}
                    className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-full border border-border-dark text-paper"
                >
                    <Menu size={16} />
                </button>
            </div>

            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden fixed inset-0 z-50 bg-onyx flex flex-col"
                >
                    <div className="h-16 flex items-center justify-between px-6 border-b border-border-dark">
                        <Logo />
                        <button
                            type="button"
                            aria-label="Cerrar menú"
                            onClick={() => setOpen(false)}
                            className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border-dark text-paper"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2 p-6">
                        {NAV.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="py-4 text-2xl font-semibold tracking-tight text-paper hover:text-flash transition-colors border-b border-border-dark"
                            >
                                {item.label}
                            </a>
                        ))}
                        <Button href="/contacto" size="lg" className="mt-6">
                            Empezar proyecto →
                        </Button>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
