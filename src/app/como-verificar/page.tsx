import type { Metadata } from "next";
import { ArrowRight, Bot, ScanSearch, Sparkles } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { CopyPromptButton } from "./copy-prompt-button";

export const metadata: Metadata = {
    title: "Cómo verificar nuestro código — iaflashelite.com",
    description:
        "Te enseñamos a auditar nuestro código con Claude o ChatGPT antes de instalar. Transparencia radical: no te pedimos confianza ciega.",
};

const VERIFY_PROMPT = `Soy un usuario sin conocimientos técnicos profundos. Voy a instalar un producto/script/plantilla y quiero asegurarme de que NO contiene código malicioso antes de ejecutarlo.

Por favor revisa el siguiente código y dime CLARAMENTE:

1. ¿Tiene código que envíe datos a servidores externos sin avisar?
2. ¿Tiene puertas traseras o accesos remotos ocultos?
3. ¿Tiene minado de criptomonedas o consumo anormal de CPU?
4. ¿Tiene keyloggers o capturas de pantalla ocultas?
5. ¿Tiene descargas de archivos externos sin permiso?
6. ¿Recolecta información personal del sistema (passwords, sesiones, cookies)?
7. ¿Hay funciones ofuscadas o sospechosamente escondidas?
8. ¿Las dependencias (imports/requires) son legítimas y conocidas?
9. ¿Accede a archivos del sistema fuera del directorio del proyecto?
10. ¿Usa eval() o exec() con strings dinámicos (red flag típica)?

Dame una respuesta clara: SEGURO o SOSPECHOSO, con motivos concretos. Si es SOSPECHOSO, dime qué línea exacta es el problema y por qué.

Aquí está el código a revisar:

[PEGA AQUÍ EL CONTENIDO COMPLETO DE LOS ARCHIVOS]`;

const STEPS = [
    {
        num: "01",
        title: "Descarga el ZIP que te enviamos",
        description:
            "Después de pagar, recibirás un email con el ZIP del producto. Descárgalo pero NO lo descomprimas aún.",
    },
    {
        num: "02",
        title: "Abre Claude.ai o ChatGPT",
        description:
            "Necesitas una cuenta gratuita. Recomendamos Claude (claude.ai) por su capacidad de análisis de código superior.",
    },
    {
        num: "03",
        title: "Copia el prompt verificador que incluimos",
        description:
            "Dentro del ZIP encontrarás un archivo VERIFICAR-ANTES-DE-INSTALAR.md con el prompt listo para copiar.",
    },
    {
        num: "04",
        title: "Pega el código del producto en Claude",
        description:
            "Sigue las instrucciones del archivo. Te dirá EXACTAMENTE qué archivos pegar y en qué orden.",
    },
    {
        num: "05",
        title: "Lee el veredicto",
        description:
            "En 2 minutos Claude te dirá si el código es SEGURO o SOSPECHOSO con motivos concretos. Si dice sospechoso: NO instales y avísanos.",
    },
];

const SUSPICIOUS_STEPS = [
    "NO lo instales. Esperamos que tu seguridad esté primero.",
    "Avísanos: iaflashelite@gmail.com. Te respondemos en <12h con explicación.",
    "Pide devolución completa. Cumplimos garantía 7 días sin preguntas.",
    "Nosotros mismos investigaremos por qué la IA lo marcó. Puede ser un falso positivo (común en gestores de contraseñas por motivos legítimos) o un error real que debemos corregir.",
];

const BREACH_EXAMPLES = [
    "Plugins de WordPress con backdoors",
    "Paquetes de NPM con código malicioso (xz-utils, event-stream)",
    "Extensiones Chrome con minado de criptomonedas",
    "Repos de GitHub que parecen legítimos y roban credenciales",
];

export default function ComoVerificarPage() {
    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-20">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold inline-flex items-center gap-2">
                            <ScanSearch className="w-3.5 h-3.5" />
                            Transparencia radical
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            Verifica nuestro código antes de instalar.
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                            Te enseñamos a auditar TODO lo que te entregamos con una IA
                            en 2 minutos. Esto no lo hace nadie más.
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-white">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Por qué
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Por qué te pedimos que nos verifiques.
                        </h2>
                        <p className="text-base text-gray-700 leading-relaxed">
                            En 2026, la desconfianza al instalar software es comprensible.
                            Han pasado muchas cosas:
                        </p>
                        <ul className="flex flex-col gap-2">
                            {BREACH_EXAMPLES.map((b) => (
                                <li
                                    key={b}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800"
                                >
                                    <span className="text-cyan-600">·</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-base text-gray-700 leading-relaxed">
                            Por eso preferimos enseñarte a auditar nuestro código antes
                            de instalarlo. <span className="font-semibold text-gray-900">
                                No tienes que confiar en nosotros: confía en lo que la IA
                                te diga.
                            </span>
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Pasos
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Cómo verificar en 5 pasos.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {STEPS.map((step) => (
                                <article
                                    key={step.num}
                                    className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 ease-out"
                                >
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600">
                                        / {step.num}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-flash font-semibold inline-flex items-center gap-2">
                            <Bot className="w-3.5 h-3.5" />
                            El prompt
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paper">
                            El prompt verificador completo.
                        </h2>
                        <p className="text-base text-text-secondary leading-relaxed">
                            Este es el prompt que incluimos en TODOS nuestros productos.
                            Puedes usarlo también con código de OTROS desarrolladores.
                            Es una herramienta de protección general.
                        </p>
                        <div className="flex">
                            <CopyPromptButton prompt={VERIFY_PROMPT} />
                        </div>
                        <pre className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 font-mono text-[12px] sm:text-sm text-text-secondary overflow-x-auto leading-relaxed whitespace-pre-wrap">
{VERIFY_PROMPT}
                        </pre>
                    </div>
                </section>

                <section className="relative py-24 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            Si algo falla
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            ¿Y si Claude dice que es SOSPECHOSO?
                        </h2>
                        <p className="text-base text-gray-700 leading-relaxed">
                            Si nuestro propio código alguna vez fuera marcado como
                            sospechoso por una IA:
                        </p>
                        <ol className="flex flex-col gap-3 list-decimal pl-5">
                            {SUSPICIOUS_STEPS.map((step) => (
                                <li
                                    key={step}
                                    className="text-sm text-gray-700 leading-relaxed"
                                >
                                    {step}
                                </li>
                            ))}
                        </ol>
                        <p className="text-base text-gray-700 leading-relaxed pt-2">
                            <span className="font-semibold text-gray-900">
                                Es nuestro contrato contigo. Sin letra pequeña.
                            </span>
                        </p>
                    </div>
                </section>

                <section className="relative py-24 bg-onyx text-paper border-t border-border-dark">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,229,255,0.18) 0%, transparent 70%)",
                        }}
                        aria-hidden
                    />
                    <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-flash/10 border border-flash/20 text-flash">
                            <Sparkles className="w-5 h-5" />
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                            Una capa de seguridad que NADIE más te ofrece.
                        </h2>
                        <p className="text-text-secondary max-w-xl leading-relaxed">
                            Empieza por cualquier producto. Tienes 7 días de garantía
                            total.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <Button href="/productos" size="lg" variant="gradient">
                                Ver productos <ArrowRight size={16} />
                            </Button>
                            <Button href="/sobre" size="lg" variant="secondary">
                                Sobre nosotros
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
