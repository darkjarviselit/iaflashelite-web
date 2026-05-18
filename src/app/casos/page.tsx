import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CasosPage() {
    return (
        <>
            <Header />
            <main className="pt-32 pb-24 bg-white text-gray-900 min-h-screen">
                <section className="relative">
                    <div className="relative max-w-5xl mx-auto px-6 lg:px-8 flex flex-col gap-8 pb-16">
                        <Badge>● Casos en producción próximamente</Badge>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-gray-900 max-w-3xl">
                            Casos de uso.
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                            Estamos cerrando los primeros pilotos. Si tu industria no aparece, probablemente sea perfecta para ser la primera.
                        </p>
                    </div>
                </section>

                <section className="relative pb-20">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="p-10 sm:p-14 rounded-3xl border border-gray-200 bg-white shadow-sm flex flex-col items-start gap-6">
                            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight text-gray-900">
                                Cerrando pilotos con los primeros clientes.
                            </h2>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                Los casos reales aparecen aquí cuando los entregamos. Sin maquetas, sin &quot;Coming soon&quot; eternos. Cuando un proyecto sale a producción y el cliente da el OK, lo publicamos con resultado medible.
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Mientras tanto: los primeros 5 clientes entran con condiciones especiales a cambio de un caso de estudio publicable cuando lo entreguemos.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-6">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            ¿Quieres ser de los primeros?
                        </h2>
                        <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                            Cuéntanos tu proyecto. Si encaja, entras en el lote piloto con condiciones especiales.
                        </p>
                        <Button href="/contacto" size="lg" variant="gradient">
                            Quiero ser de los primeros <ArrowRight size={16} />
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
