import type { Metadata } from "next";
import {
    ArrowRight,
    Bell,
    Check,
    Clock,
    Download,
    Landmark,
    Mail,
    RefreshCw,
    Sparkles,
    ShieldCheck,
    Smartphone,
    Wallet,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductAvailability } from "@/components/productos/product-availability";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CATEGORY_LABELS,
    GESTORIA_LOCAL_PRODUCT_SLUG,
    PRODUCTS,
} from "@/lib/constants";

export function generateStaticParams() {
    return PRODUCTS.filter((p) => !p.hidden).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) {
        return { title: "Producto no encontrado — iaflashelite.com" };
    }
    return {
        title: `${product.name} — iaflashelite.com`,
        description: product.tagline,
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product || product.hidden) notFound();
    if (product.slug === GESTORIA_LOCAL_PRODUCT_SLUG) redirect("/gestoria-local");

    const available = product.status === "available";
    const isService = product.type === "service";
    const isAcademia = product.academia === true;

    // Tier de material formativo según precio (PIEZA 5 W-11). Honesto, sin
    // precios inflados: solo describimos qué incluye y marcamos «Próximamente».
    const tier =
        isAcademia
            ? {
                  name: "Material incluido en el pack",
                  items: [
                      "PDF principal",
                      "Audio guía breve",
                      "Plantillas y skills descargables",
                  ],
              }
            : product.price < 20
            ? {
                  name: "Mini guía",
                  items: ["1 audio (~15 min)", "1 PDF descargable (3 páginas)"],
              }
            : product.price < 49
                ? {
                      name: "Curso básico",
                      items: [
                          "3 audios (~30 min total)",
                          "1 PDF descargable (10 páginas)",
                      ],
                  }
                : {
                      name: "Curso intermedio",
                      items: [
                          "5 audios (~1h total)",
                          "2 PDFs descargables (15 + 10 páginas)",
                      ],
                  };

    return (
        <>
            <Header />
            <main className="bg-white text-gray-900 min-h-screen pb-24">
                <section className="relative bg-onyx text-paper pt-32 pb-16">
                    <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                    <div className="relative max-w-3xl mx-auto px-6 flex flex-col gap-7">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant={available ? "cyan" : "muted"}>
                                {available ? "Disponible" : "Próximamente"}
                            </Badge>
                            {isService && (
                                <Badge variant="cyan">Servicio personalizado</Badge>
                            )}
                            <span className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                                {CATEGORY_LABELS[product.category] ?? product.category}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-paper">
                            {product.name}
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {product.tagline}
                        </p>
                        <p className="text-base text-text-secondary leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap items-end gap-4 pt-4 border-t border-border-dark">
                            <div className="flex flex-col">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-text-muted">
                                    {isService ? "Tarifa fija" : "Precio único"}
                                </span>
                                <span className="text-5xl font-bold text-flash tracking-[-0.03em] leading-none">
                                    {product.price}€
                                </span>
                            </div>
                            {product.slug === "backup-cifrado" && (
                                <div className="flex w-full items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-200 border border-gray-600">
                                        🍎 macOS
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">
                                        🪟 Windows — Próximamente
                                    </span>
                                </div>
                            )}
                            <ProductAvailability
                                slug={product.slug}
                                name={product.name}
                                status={product.status}
                                price={product.price}
                            />
                        </div>
                    </div>
                </section>

                {product.audioUrl && (
                    <section className="relative py-10 bg-white border-b border-gray-200">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/30 p-5">
                                <div className="flex items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl" aria-hidden>🎧</span>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    Escucha antes de comprar
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    1 min 30 seg · Presentación del producto
                                                </p>
                                            </div>
                                        </div>
                                        <audio
                                            controls
                                            preload="none"
                                            className="w-full"
                                            style={{ height: "40px" }}
                                        >
                                            <source src={product.audioUrl} type="audio/mp4" />
                                            Tu navegador no soporta audio HTML5.
                                        </audio>
                                    </div>
                                    <div className="hidden sm:block w-24 flex-shrink-0">
                                        <img
                                            src="/mascota-flash.svg"
                                            alt="Flash"
                                            className="w-full h-auto"
                                            style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.4))" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {isService && available && (
                    <section className="relative py-12 bg-cyan-50 border-y border-cyan-100">
                        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-cyan-100">
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-100 text-cyan-700 shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                                            Plazo de entrega
                                        </span>
                                        <span className="text-xl font-bold text-gray-900 leading-none">
                                            {product.delivery_time ?? "48 horas"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-cyan-100">
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-100 text-cyan-700 shrink-0">
                                        <RefreshCw className="w-5 h-5" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                                            Revisiones incluidas
                                        </span>
                                        <span className="text-xl font-bold text-gray-900 leading-none">
                                            {product.revisions ?? 1}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed text-center">
                                Entrega: <span className="font-semibold text-gray-900">48h tras confirmación del pago</span>.
                                Trabajamos pedidos viernes–sábado. Pedidos L–J entran en
                                cola del viernes siguiente.
                            </p>
                        </div>
                    </section>
                )}

                {available && (
                    <section className="relative py-20 bg-white">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="flex flex-col gap-6 mb-10">
                                <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                    Qué incluye
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                    {isService
                                        ? "Todo lo que entra en tu landing."
                                        : "Todo lo necesario para usarlo hoy."}
                                </h2>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {product.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200"
                                    >
                                        <Check
                                            size={16}
                                            className="text-cyan-600 mt-0.5 shrink-0"
                                        />
                                        <span className="text-sm text-gray-800 leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                {isService && available && product.what_you_get && (
                    <section className="relative py-20 bg-gray-50 border-t border-gray-200">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="flex flex-col gap-6 mb-10">
                                <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                    Qué recibes
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                    Tu paquete completo.
                                </h2>
                            </div>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {product.what_you_get.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200"
                                    >
                                        <Sparkles
                                            size={16}
                                            className="text-cyan-600 mt-0.5 shrink-0"
                                        />
                                        <span className="text-sm text-gray-800 leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}

                <section className={`relative py-20 border-t border-gray-200 ${isService ? "bg-white" : "bg-gray-50"}`}>
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-10">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                Garantías
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                Sin letra pequeña.
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    Garantía Flash
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Entrega protegida y soporte si algo falla.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-4">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    Soporte {product.support_days} días
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Email iaflashelite@gmail.com. Respuesta &lt; 24h L–V.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out">
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 mb-4">
                                    <Download className="w-5 h-5" />
                                </span>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    {isService
                                        ? "Hecho a medida"
                                        : isAcademia
                                            ? "Material descargable"
                                            : "Privacidad total"}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {isService
                                        ? "Diseño exclusivo para tu negocio. No es una plantilla."
                                        : isAcademia
                                            ? "PDF, audio y plantillas para trabajar en tu propio entorno."
                                            : "Funciona en local. Tus datos nunca salen de tu equipo."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {available && !isAcademia && (
                    <section className="relative py-12 bg-white border-t border-gray-200">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-cyan-50 border border-cyan-200">
                                <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
                                    🔍 {isService ? "Auditable antes de subir a tu servidor" : "Auditable antes de instalar"}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {isService
                                        ? "Tu landing incluye código fuente legible + instrucciones para verificarlo con IA antes de desplegar."
                                        : "Este producto incluye un archivo VERIFICAR-ANTES-DE-INSTALAR.md con un prompt para que verifiques nuestro código con Claude o ChatGPT en 2 minutos."}
                                </p>
                                <Link
                                    href="/como-verificar"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-800 hover:gap-2 transition-all"
                                >
                                    Aprender cómo verificar <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {available && !isAcademia && (
                    <section className="relative py-12 bg-white border-t border-gray-200">
                        <div className="max-w-3xl mx-auto px-6">
                            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
                                <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
                                    🎁 Incluido gratis con tu compra
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    <span className="font-semibold text-gray-900">
                                        {tier.name}
                                    </span>{" "}
                                    de seguridad digital, sin coste extra y sin precios
                                    inflados.
                                </p>
                                <ul className="flex flex-col gap-1.5 text-sm text-gray-700">
                                    {tier.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-emerald-700">·</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Estado:{" "}
                                    <span className="font-semibold text-emerald-800">
                                        Próximamente
                                    </span>
                                    . Te avisamos por email cuando esté listo.
                                </p>
                                <Link
                                    href="/academia"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 hover:gap-2 transition-all"
                                >
                                    Ver detalles <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                <section className={`relative py-20 border-t border-gray-200 ${isService ? "bg-gray-50" : "bg-white"}`}>
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="flex flex-col gap-6 mb-8">
                            <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                                ¿Cómo se entrega?
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                                {isService
                                    ? "Flujo a medida en 48h."
                                    : "Flujo manual, sin intermediarios."}
                            </h2>
                        </div>
                        {isService ? (
                            <ol className="flex flex-col gap-4">
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">01</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Rellenas el pedido con tu método de pago (Bizum, PayPal o transferencia).
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">02</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        En menos de 12h te enviamos los datos de pago y un breve cuestionario:
                                        nombre del negocio, sector, referencias visuales, textos/logo y dominio.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">03</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        En 48h desde el pago + cuestionario recibido, te entregamos el ZIP con
                                        código, manual PDF, prompts Claude/Codex y audio explicativo.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">04</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Tienes {product.revisions ?? 1} revisión{(product.revisions ?? 1) === 1 ? "" : "es"} incluida{(product.revisions ?? 1) === 1 ? "" : "s"}.
                                        Soporte por email durante 30 días.
                                    </p>
                                </li>
                            </ol>
                        ) : (
                            <ol className="flex flex-col gap-4">
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">01</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Rellenas el formulario con tu nombre, email y método de pago preferido (Bizum, PayPal o transferencia).
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">02</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Te respondemos en menos de 12 h con los datos para pagar.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="text-[11px] font-mono tracking-[0.18em] text-cyan-600 mt-1">03</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Una vez confirmado el pago, te enviamos el ZIP del producto al email.
                                        Tu compra queda protegida por Garantía Flash y 30 días de soporte.
                                    </p>
                                </li>
                            </ol>
                        )}

                        <div className="mt-12 p-6 rounded-2xl bg-white border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                                Aceptamos:
                            </h3>
                            <ul className="grid sm:grid-cols-3 gap-3 mb-4">
                                <li className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 shrink-0">
                                        <Smartphone className="w-4 h-4" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">Bizum</span>
                                        <span className="text-[11px] text-gray-500">Instantáneo</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 shrink-0">
                                        <Wallet className="w-4 h-4" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">PayPal</span>
                                        <span className="text-[11px] text-gray-500">Cuenta o tarjeta</span>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 shrink-0">
                                        <Landmark className="w-4 h-4" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">Transferencia</span>
                                        <span className="text-[11px] text-gray-500">IBAN por email</span>
                                    </div>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Tras tu pedido, te enviaremos los datos de pago por email en menos de 12 horas.
                                {isService
                                    ? " Cuando recibamos el pago y el cuestionario, empieza el cronómetro de 48h."
                                    : " Cuando recibamos el pago, recibirás el producto en tu correo."}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative py-20 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col gap-5">
                        <span className="text-[11px] tracking-[0.18em] uppercase text-cyan-600 font-semibold">
                            ¿No eres técnico?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Te ayudamos con prompts Claude/Codex.
                        </h2>
                        {isService ? (
                            <>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    Te incluimos manual PDF + prompts pre-hechos para Claude/Codex
                                    que te permiten desplegar tu landing en 30 minutos sin saber
                                    programar. Si nunca has usado IA, te recomendamos:
                                </p>
                                {product.recommended_tools && product.recommended_tools.length > 0 && (
                                    <ul className="grid sm:grid-cols-3 gap-3 mt-2">
                                        {product.recommended_tools.map((tool) => (
                                            <li
                                                key={tool}
                                                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800"
                                            >
                                                <Sparkles size={14} className="text-cyan-600 shrink-0" />
                                                <span>{tool}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Con cualquiera de ellos sigues los prompts paso a paso y tu landing está online.
                                </p>
                            </>
                        ) : (
                            <p className="text-base text-gray-700 leading-relaxed">
                                Cada producto incluye prompts pre-hechos. Los copias y los pegas
                                en Claude, ChatGPT o Codex y la IA te guía paso a paso para
                                instalar, ejecutar o personalizar el producto. Sin saber
                                programar.
                            </p>
                        )}
                        <div className="pt-2 flex flex-wrap gap-3">
                            {isService && (
                                <Link
                                    href="/servicios-extra"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all"
                                >
                                    ¿Necesitas más revisiones o consultoría?
                                    <ArrowRight size={14} />
                                </Link>
                            )}
                            <Link
                                href="/contacto"
                                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:gap-3 transition-all"
                            >
                                ¿Algo a medida? Pídelo aquí <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>

                {!available && (
                    <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                        <div className="max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-5">
                            <Bell className="text-flash" size={28} />
                            <h2 className="text-3xl font-bold tracking-[-0.02em] text-paper">
                                Lanzamiento próximo.
                            </h2>
                            <p className="text-text-secondary">
                                Usa el botón &quot;Avísame&quot; arriba para recibir un
                                email único cuando salga.
                            </p>
                        </div>
                    </section>
                )}

                {available && (
                    <section className="relative py-12 bg-white border-t border-gray-200">
                        <div className="max-w-3xl mx-auto px-6">
                            {isService ? (
                                <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900 flex gap-3 items-start">
                                    <span className="text-lg shrink-0">🛡️</span>
                                    <div>
                                        <p className="font-semibold mb-1">
                                            Servicio con garantía de entrega
                                        </p>
                                        <p className="leading-relaxed">
                                            Confirmamos plazo antes de empezar.
                                            Si hay una incidencia real de entrega
                                            o alcance, primero intentamos resolverla
                                            y valoramos reembolso total o parcial
                                            si no podemos.{" "}
                                            <Link
                                                href="/legal/garantias"
                                                className="underline font-medium hover:no-underline"
                                            >
                                                Ver política completa →
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex gap-3 items-start">
                                    <span className="text-lg shrink-0">⚡</span>
                                    <div>
                                        <p className="font-semibold mb-1">
                                            Producto digital — descarga inmediata
                                        </p>
                                        <p className="leading-relaxed">
                                            Una vez empiece el acceso, descarga o
                                            envío, pierdes el derecho de desistimiento
                                            de 14 días (Directiva EU 2011/83/UE).
                                            Mantienes la Garantía Flash si el
                                            producto no llega, falla, está dañado
                                            o no coincide con la descripción.{" "}
                                            <Link
                                                href="/legal/garantias"
                                                className="underline font-medium hover:no-underline"
                                            >
                                                Ver política completa →
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {available && (
                    <section className="relative py-20 bg-onyx text-paper border-t border-border-dark">
                        <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
                        <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-6">
                            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-paper">
                                ¿Listo para empezar?
                            </h2>
                            <p className="text-text-secondary max-w-xl leading-relaxed">
                                {isService
                                    ? `Confirma tu pedido en menos de 2 minutos. Te respondemos en menos de 12h con el cuestionario inicial y los datos de pago.`
                                    : "Confirma tu pedido en menos de 2 minutos. Te enviamos instrucciones de pago en menos de 12h."}
                            </p>
                            <Button
                                href={`/productos/${product.slug}/comprar`}
                                size="lg"
                                variant="gradient"
                            >
                                {isService ? "Solicitar" : "Comprar"} {product.name} · {product.price}€
                                <ArrowRight size={16} />
                            </Button>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
