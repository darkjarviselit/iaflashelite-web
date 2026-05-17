import Link from "next/link";
import { FlashMascot } from "@/components/brand/flash-mascot";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <>
            <Header />
            <main className="bg-onyx min-h-screen pt-32 pb-24">
                <section className="relative">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div
                        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[70%] pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0) 60%)",
                        }}
                        aria-hidden
                    />
                    <div className="relative max-w-3xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center gap-8">
                        <FlashMascot pose="thinking" size={200} />
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-medium">
                            / 404
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Esta página se fugó.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                            La URL que buscas no existe o cambió de sitio. Vuelve al inicio y seguimos automatizando.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 h-14 px-7 text-base font-medium tracking-tight rounded-full bg-paper text-onyx hover:bg-paper/95 transition-all"
                            >
                                Volver al inicio →
                            </Link>
                            <Button href="/contacto" variant="secondary" size="lg">
                                Contactar
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
