import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Lock, Mail, MapPin, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Sobre — iaflashelite.com",
    description:
        "Un equipo de profesionales + herramientas IA propias. Formación UPC FIB y UPF, especializados en automatización IA y ciberseguridad. Sin oficina física, sin inversores.",
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
                            Un equipo de profesionales + herramientas IA propias.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Sin oficina física. Sin inversores. Sin equipo de marketing.
                            Equipo técnico + ecosistema IA propio = precios honestos y
                            entregas rápidas.
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Quiénes somos
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Quiénes somos.
                        </h2>
                        <div className="flex flex-col gap-5 text-gray-700 leading-relaxed">
                            <p>
                                Somos un equipo de profesionales especializados en
                                automatización con IA, sistemas multi-agente y
                                ciberseguridad.
                            </p>
                            <p>
                                Combinamos formación de las mejores universidades
                                públicas españolas con experiencia práctica construyendo
                                nuestro propio ecosistema de agentes IA — una{" "}
                                <span className="font-semibold text-gray-900">
                                    herramienta interna
                                </span>{" "}
                                que potencia nuestro trabajo y nos permite ofrecer
                                precios honestos.
                            </p>
                            <p>
                                Trabajamos desde Barcelona. Sin oficina física, sin
                                inversores, sin equipo de marketing.{" "}
                                <span className="font-semibold text-gray-900">
                                    Equipo técnico + herramientas IA propias
                                </span>{" "}
                                = entregas rápidas y precios ajustados.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-6 mt-12 grid lg:grid-cols-2 gap-6">
                        <article className="p-6 rounded-2xl bg-white border border-gray-200">
                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-5">
                                <GraduationCap className="w-5 h-5" />
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">
                                Formación del equipo
                            </h3>
                            <ul className="flex flex-col gap-1.5 text-sm text-gray-700 leading-relaxed">
                                <li>
                                    UPC FIB · Facultat d&apos;Informàtica de Barcelona
                                    (acreditada con excelencia AQU Catalunya)
                                </li>
                                <li>
                                    UPF · Universitat Pompeu Fabra (especialización en
                                    sistemas multi-agente IA)
                                </li>
                                <li>
                                    Formación continua en ciberseguridad y automatización
                                </li>
                            </ul>
                        </article>
                        <article className="p-6 rounded-2xl bg-white border border-gray-200">
                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-5">
                                <MapPin className="w-5 h-5" />
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">
                                Cómo trabajamos
                            </h3>
                            <ul className="flex flex-col gap-1.5 text-sm text-gray-700 leading-relaxed">
                                <li>Barcelona, España</li>
                                <li>Trabajo remoto · sin oficina física</li>
                                <li>Respuesta en &lt;12h</li>
                                <li>Equipo técnico + ecosistema IA propio</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Por qué
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Por qué construimos iaflashelite.
                        </h2>
                        <div className="flex flex-col gap-5 text-gray-700 leading-relaxed">
                            <p>
                                Empezamos a construir nuestro propio ecosistema de
                                agentes IA en 2024 como parte de nuestra investigación
                                académica y profesional. Cinco agentes que nos ayudan
                                internamente: orquestación de proyectos, programación,
                                búsqueda de leads, supervisión y seguridad.
                            </p>
                            <p>
                                A medida que el ecosistema maduraba, vimos una realidad:
                                PYMES y particulares pagan miles de euros por
                                herramientas que en el fondo son sencillas.
                                Suscripciones perpetuas por gestores de contraseñas.
                                Cuotas anuales por escáneres de seguridad. Agencias que
                                cobran 1.500€ por una landing simple.
                            </p>
                            <p>
                                Decidimos hacer lo contrario:{" "}
                                <span className="font-semibold text-gray-900">
                                    vender lo mismo a precios honestos. Una vez. Sin
                                    suscripciones. Sin nube. Sin trackers. Sin letra
                                    pequeña.
                                </span>
                            </p>
                            <p>
                                Nuestras herramientas IA internas nos permiten ser
                                eficientes. Por eso podemos cobrar menos sin perder
                                calidad. Pero{" "}
                                <span className="font-semibold text-gray-900">
                                    el trabajo final SIEMPRE pasa por nuestras manos
                                </span>{" "}
                                antes de llegarte.
                            </p>
                            <p className="pt-4 border-t border-gray-200">
                                Y por eso este año (2026) cambia el rumbo:{" "}
                                <span className="font-semibold text-gray-900">
                                    la seguridad pasa a ser eje central de
                                    iaflashelite.
                                </span>{" "}
                                No solo vendemos herramientas — incluimos material
                                formativo gratis con cada compra. Cada producto es
                                auditable. Cada decisión nuestra prioriza tu privacidad
                                por encima de la rentabilidad rápida.
                            </p>
                            <p>
                                No somos expertos de élite en ciberseguridad. Somos un
                                equipo de profesionales en formación continua que
                                conocemos los peligros reales y los explicamos claros.
                                Si tu caso necesita un pentester certificado, te lo
                                decimos abiertamente y te derivamos.
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
                            <Pledge icon={<Mail className="w-5 h-5" />} title="Respondemos personalmente cada email." />
                            <Pledge icon={<Wallet className="w-5 h-5" />} title="Sin suscripciones ni cargos ocultos." />
                            <Pledge icon={<ShieldCheck className="w-5 h-5" />} title="Compra protegida por Garantía Flash." />
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
                                ¿Quieres contactar?
                            </h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Sin filtros, sin formularios infinitos. Email directo al
                                equipo.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button href="mailto:iaflashelite@gmail.com" variant="gradient">
                                    Escríbenos a iaflashelite@gmail.com
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
