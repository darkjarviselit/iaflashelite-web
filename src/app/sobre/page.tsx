import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Lock, Mail, MapPin, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Sobre — iaflashelite.com",
    description:
        "Detrás de iaflashelite hay un ingeniero, no una agencia. Oscar P., Ingeniero Informático por UPC FIB y actualmente cursando UPF en multi-agentes IA.",
};

export default function SobrePage() {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                            Sobre nosotros
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Detrás de iaflashelite hay un ingeniero, no una agencia.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Sin oficina. Sin inversores. Sin equipo de marketing. Solo
                            yo + un ecosistema de IA propio.
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Quién está detrás
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Soy Oscar P., el ingeniero detrás de iaflashelite.
                        </h2>
                        <div className="flex flex-col gap-5 text-gray-700 leading-relaxed">
                            <p>
                                <span className="font-semibold text-gray-900">
                                    Ingeniero Informático por la Facultat d&apos;Informàtica de
                                    Barcelona (UPC FIB, 2012)
                                </span>
                                {" "}— una de las facultades de informática más prestigiosas
                                de España, acreditada con excelencia por AQU Catalunya.
                            </p>
                            <p>
                                Actualmente terminando un{" "}
                                <span className="font-semibold text-gray-900">
                                    segundo Grado en Ingeniería Informática en la Universitat
                                    Pompeu Fabra (UPF)
                                </span>
                                , especializándome en sistemas multi-agente y entrenamiento
                                de agentes de IA. Es decir: lo que construyo aquí no es
                                teoría, es mi trabajo final académico real.
                            </p>
                            <p>
                                Trabajo desde Barcelona. Sin oficina, sin inversores, sin
                                equipo de marketing. Solo yo + un ecosistema de IA propio
                                que llevo desarrollando desde 2024.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-6 mt-12 grid lg:grid-cols-2 gap-6">
                        <article className="p-6 rounded-2xl bg-white border border-gray-200">
                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-5">
                                <GraduationCap className="w-5 h-5" />
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">
                                Formación
                            </h3>
                            <ul className="flex flex-col gap-1.5 text-sm text-gray-700 leading-relaxed">
                                <li>UPC FIB · Ingeniero Informático (2012)</li>
                                <li>UPF · Multi-agentes IA (en curso)</li>
                            </ul>
                        </article>
                        <article className="p-6 rounded-2xl bg-white border border-gray-200">
                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-5">
                                <MapPin className="w-5 h-5" />
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">
                                Ubicación
                            </h3>
                            <ul className="flex flex-col gap-1.5 text-sm text-gray-700 leading-relaxed">
                                <li>Barcelona, España</li>
                                <li>Trabajo remoto · sin oficina</li>
                                <li>Respuesta en &lt;12h</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Por qué hago esto
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Por qué construyo iaflashelite.
                        </h2>
                        <div className="flex flex-col gap-5 text-gray-700 leading-relaxed">
                            <p>
                                En 2024 empecé a construir mi propio ecosistema de agentes
                                IA como Trabajo Final de Grado. Cinco agentes que trabajan
                                juntos: orquestación de proyectos, programación, búsqueda
                                de clientes, supervisión y seguridad.
                            </p>
                            <p>
                                A medida que el ecosistema maduraba, vi una realidad: las
                                PYMES y particulares pagan miles de euros por herramientas
                                que en el fondo son sencillas. Pago de suscripciones
                                perpetuas por un gestor de contraseñas. Cuotas anuales por
                                un escáner de seguridad. Agencias que cobran 1.500€ por
                                una landing simple.
                            </p>
                            <p>
                                Decidí hacer lo contrario:{" "}
                                <span className="font-semibold text-gray-900">
                                    vender lo mismo a precios honestos. Una vez. Sin
                                    suscripciones. Sin nube. Sin trackers. Sin letra
                                    pequeña.
                                </span>
                            </p>
                            <p>
                                Si funciona, financio el ecosistema. Si no, sigo
                                aprendiendo. Es win-win.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold">
                                Compromiso
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paper">
                                Nuestro compromiso público.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <Pledge icon={<Lock className="w-5 h-5" />} title="No vendemos datos. Nunca." />
                            <Pledge icon={<Mail className="w-5 h-5" />} title="Respondo personalmente cada email." />
                            <Pledge icon={<Wallet className="w-5 h-5" />} title="Sin suscripciones ni cargos ocultos." />
                            <Pledge icon={<ShieldCheck className="w-5 h-5" />} title="Garantía 7 días devolución sin preguntas." />
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="p-10 rounded-3xl border border-gray-200 bg-white shadow-sm flex flex-col gap-6">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Conversemos
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                ¿Quieres hablar conmigo?
                            </h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Sin filtros, sin formularios infinitos. Email directo a mí.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button href="mailto:iaflashelite@gmail.com" variant="gradient">
                                    Escríbeme a iaflashelite@gmail.com
                                </Button>
                                <Link
                                    href="/productos"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-2 transition-all"
                                >
                                    Ver productos <ArrowRight size={14} />
                                </Link>
                                <Link
                                    href="/servicios"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-2 transition-all"
                                >
                                    Ver servicios <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

function Pledge({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <article className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-flash/10 border border-flash/20 text-flash">
                {icon}
            </span>
            <p className="text-sm text-paper leading-relaxed">{title}</p>
        </article>
    );
}
