"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, ClipboardList, Landmark, Smartphone, Wallet, Zap } from "lucide-react";
import { useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXPRESS_SURCHARGE, SLOTS_CONFIG, type ProductType } from "@/lib/constants";

interface CheckoutFormProps {
    slug: string;
    name: string;
    price: number;
    type?: ProductType;
}

const SERVICE_QUESTIONS = [
    "Nombre de tu negocio",
    "Sector y público objetivo",
    "Referencias visuales (webs que te gustan)",
    "Textos y logo (si los tienes)",
    "Dominio donde la quieres alojar",
];

type PaymentMethodValue = "bizum" | "paypal" | "transferencia";

interface PaymentMethodOption {
    value: PaymentMethodValue;
    label: string;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
    {
        value: "bizum",
        label: "Bizum",
        description: "Pago instantáneo desde tu móvil. Solo necesitas tu app del banco.",
        icon: Smartphone,
    },
    {
        value: "paypal",
        label: "PayPal",
        description: "Paga con tu cuenta PayPal o tarjeta. Sin compartir tus datos bancarios.",
        icon: Wallet,
    },
    {
        value: "transferencia",
        label: "Transferencia bancaria",
        description: "Pago tradicional por transferencia. Recibirás el IBAN por email.",
        icon: Landmark,
    },
];

const METHOD_LABELS: Record<PaymentMethodValue, string> = {
    bizum: "Bizum",
    paypal: "PayPal",
    transferencia: "Transferencia bancaria",
};

const inputClass =
    "w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors";

export function CheckoutForm({ slug, name, price, type = "download" }: CheckoutFormProps) {
    const isService = type === "service";
    const expressSurcharge = isService ? (EXPRESS_SURCHARGE[slug] ?? 0) : 0;
    const expressOffered = isService && expressSurcharge > 0;
    const expressDisabled = SLOTS_CONFIG.express_available === 0;
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue | "">("");
    const [isExpress, setIsExpress] = useState(false);
    // Consentimiento Directiva EU 2011/83/UE Art. 16(m): el comprador renuncia
    // al derecho de desistimiento de 14 días al aceptar la descarga. Solo
    // aplica a productos descargables; en servicios la garantía es de entrega.
    const [consentDigital, setConsentDigital] = useState(false);
    const [consentDigitalAt, setConsentDigitalAt] = useState<string>("");

    const requiresDigitalConsent = !isService;
    const effectiveExpress = expressOffered && !expressDisabled && isExpress;
    const totalPrice = price + (effectiveExpress ? expressSurcharge : 0);

    function toggleDigitalConsent(checked: boolean) {
        setConsentDigital(checked);
        setConsentDigitalAt(checked ? new Date().toISOString() : "");
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        if (!paymentMethod) {
            setError("missing_payment_method");
            return;
        }
        if (requiresDigitalConsent && !consentDigital) {
            setError("missing_digital_consent");
            return;
        }
        const fd = new FormData(event.currentTarget);
        const payload = {
            productSlug: slug,
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            paymentMethod,
            comments: String(fd.get("comments") ?? ""),
            website: String(fd.get("website") ?? ""),
            acceptedPrivacy,
            isExpress: effectiveExpress,
            consentDigital: requiresDigitalConsent ? consentDigital : null,
            consentDigitalAt: requiresDigitalConsent ? consentDigitalAt : null,
        };
        setSending(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { ok: boolean; error?: string };
            if (!res.ok || !data.ok) {
                setError(data.error ?? "send_failed");
            } else {
                setSuccess(true);
            }
        } catch {
            setError("network_error");
        } finally {
            setSending(false);
        }
    }

    if (success) {
        const methodLabel = paymentMethod ? METHOD_LABELS[paymentMethod] : "—";
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-10 rounded-3xl border border-emerald-200 bg-emerald-50 flex flex-col items-center text-center gap-5"
            >
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={28} />
                </span>
                <h2 className="text-2xl font-semibold text-emerald-900">
                    Gracias{customerName ? `, ${customerName}` : ""}.
                </h2>
                <div className="flex flex-col gap-3 max-w-md text-emerald-800 leading-relaxed">
                    <p>
                        Hemos recibido tu {isService ? "solicitud" : "pedido"} de{" "}
                        <span className="font-semibold">{name}</span>{" "}
                        (<span className="font-semibold">{totalPrice}€</span>
                        {effectiveExpress && (
                            <>
                                {" "}— incluye <span className="font-semibold">Express +{expressSurcharge}€</span>
                            </>
                        )}
                        ).
                    </p>
                    {isService ? (
                        <p>
                            📧 Te contactaremos en menos de 12h
                            {customerEmail ? (
                                <>
                                    {" "}a <span className="font-semibold">{customerEmail}</span>
                                </>
                            ) : null}{" "}
                            con los datos de pago ({" "}
                            <span className="font-semibold">{methodLabel}</span>) y el
                            cuestionario inicial para empezar tu landing.
                            La entrega es <span className="font-semibold">48h</span> desde
                            que recibimos pago + cuestionario.
                        </p>
                    ) : (
                        <>
                            <p>
                                📧 En menos de 12 horas te enviaremos un email
                                {customerEmail ? (
                                    <>
                                        {" "}a <span className="font-semibold">{customerEmail}</span>
                                    </>
                                ) : null}{" "}
                                con los datos de pago según el método elegido
                                (<span className="font-semibold">{methodLabel}</span>).
                            </p>
                            <p>
                                Una vez recibamos el pago, te enviaremos el producto
                                directamente a tu email.
                            </p>
                        </>
                    )}
                </div>
                <p className="text-sm text-emerald-700">
                    ¿Dudas? Responde a ese email o escribe a{" "}
                    <a
                        href="mailto:iaflashelite@gmail.com"
                        className="text-cyan-700 underline hover:no-underline"
                    >
                        iaflashelite@gmail.com
                    </a>
                </p>
                <Button href="/productos" variant="secondary">
                    Volver al catálogo
                </Button>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid sm:grid-cols-2 gap-5 p-8 sm:p-10 rounded-3xl border border-gray-200 bg-white shadow-sm"
        >
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                }}
            >
                <label htmlFor="website">
                    No rellenar
                    <input
                        id="website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        defaultValue=""
                    />
                </label>
            </div>

            {isService && (
                <div className="sm:col-span-2 flex flex-col gap-3 p-5 rounded-2xl border border-cyan-200 bg-cyan-50">
                    <div className="flex items-center gap-2 text-sm font-semibold text-cyan-900">
                        <ClipboardList className="w-4 h-4" />
                        Tras tu pedido te pediremos por email:
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                        {SERVICE_QUESTIONS.map((q) => (
                            <li key={q} className="flex items-start gap-2 text-sm text-cyan-900">
                                <Check size={14} className="text-cyan-600 mt-0.5 shrink-0" />
                                <span>{q}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-cyan-800 leading-relaxed">
                        Te entregamos la landing en 48h desde que recibimos estos datos y
                        confirmemos el pago.
                    </p>
                </div>
            )}

            <div className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl border border-cyan-200 bg-cyan-50">
                <div className="flex flex-col">
                    <Badge variant="cyan">{isService ? "Servicio" : "Producto"}</Badge>
                    <span className="mt-2 text-base font-semibold text-gray-900">{name}</span>
                    {effectiveExpress && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-700">
                            <Zap className="w-3 h-3" /> Express activado · entrega 24h
                        </span>
                    )}
                </div>
                <div className="text-right">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-gray-500 block">
                        {effectiveExpress ? "Total" : "Precio"}
                    </span>
                    <span className="text-3xl font-bold text-cyan-600 tracking-tight leading-none">
                        {totalPrice}€
                    </span>
                    {effectiveExpress && (
                        <span className="block text-[11px] text-gray-500 mt-1">
                            {price}€ + {expressSurcharge}€ express
                        </span>
                    )}
                </div>
            </div>

            {expressOffered && (
                <label
                    className={`sm:col-span-2 flex items-start gap-3 p-5 rounded-2xl border-2 transition-all ${
                        expressDisabled
                            ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-70"
                            : effectiveExpress
                                ? "border-cyan-500 bg-cyan-50 cursor-pointer"
                                : "border-gray-200 bg-white hover:border-cyan-300 cursor-pointer"
                    }`}
                >
                    <input
                        type="checkbox"
                        name="isExpress"
                        checked={effectiveExpress}
                        onChange={(e) => setIsExpress(e.target.checked)}
                        disabled={expressDisabled}
                        className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <Zap className="w-4 h-4 text-cyan-600" />
                            ¿Necesitas entrega Express?
                            {!expressDisabled && (
                                <span className="text-cyan-700">
                                    +{expressSurcharge}€
                                </span>
                            )}
                        </span>
                        <span className="text-xs text-gray-600 leading-relaxed">
                            {expressDisabled
                                ? "Express agotado este mes — solo modo normal disponible."
                                : "Tu landing en 24h en lugar de 48h. Prioridad máxima. Solo disponible si quedan huecos express este mes."}
                        </span>
                    </div>
                </label>
            )}

            <Field label="Nombre completo *">
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    autoComplete="name"
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputClass}
                />
            </Field>
            <Field label="Email *">
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    autoComplete="email"
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className={inputClass}
                />
            </Field>

            <fieldset className="sm:col-span-2 flex flex-col gap-3">
                <legend className="text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium mb-1">
                    Método de pago *
                </legend>
                <div className="grid sm:grid-cols-3 gap-3">
                    {PAYMENT_METHODS.map((m) => {
                        const Icon = m.icon;
                        const selected = paymentMethod === m.value;
                        return (
                            <label
                                key={m.value}
                                className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ease-out ${
                                    selected
                                        ? "border-cyan-500 bg-cyan-50 shadow-md"
                                        : "border-gray-200 bg-white hover:border-cyan-300 hover:-translate-y-0.5 hover:shadow-sm"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={m.value}
                                    checked={selected}
                                    onChange={() => setPaymentMethod(m.value)}
                                    required
                                    className="sr-only"
                                />
                                <span
                                    className={`absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
                                        selected
                                            ? "bg-cyan-500 border-cyan-500 text-white"
                                            : "bg-white border-gray-300 text-transparent"
                                    }`}
                                    aria-hidden
                                >
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                <span
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${
                                        selected
                                            ? "bg-white border-cyan-200 text-cyan-600"
                                            : "bg-cyan-50 border-cyan-100 text-cyan-600"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {m.label}
                                </span>
                                <span className="text-xs text-gray-600 leading-relaxed">
                                    {m.description}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <Field label={isService ? "Cuéntanos algo inicial (opcional)" : "Comentarios (opcional)"} className="sm:col-span-2">
                <textarea
                    name="comments"
                    rows={4}
                    placeholder={
                        isService
                            ? "Si quieres adelantarnos el nombre de tu negocio, sector o webs de referencia, escríbelo aquí. (No es obligatorio, te lo pediremos por email igualmente.)"
                            : "¿Algo que debamos saber antes de procesar tu pedido?"
                    }
                    className={`${inputClass} resize-none h-auto py-3`}
                />
            </Field>

            <div className="sm:col-span-2 flex items-start gap-3 pt-2">
                <input
                    type="checkbox"
                    id="order-accepted-privacy"
                    name="acceptedPrivacy"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
                <label
                    htmlFor="order-accepted-privacy"
                    className="text-sm text-gray-600 leading-relaxed"
                >
                    He leído y acepto la{" "}
                    <a
                        href="/legal/privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 underline hover:no-underline"
                    >
                        política de privacidad
                    </a>{" "}
                    y consiento el tratamiento de mis datos para procesar este pedido.
                </label>
            </div>

            {requiresDigitalConsent && (
                <div className="sm:col-span-2 flex items-start gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="order-consent-digital"
                        checked={consentDigital}
                        onChange={(e) => toggleDigitalConsent(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 shrink-0"
                    />
                    <label
                        htmlFor="order-consent-digital"
                        className="text-sm text-gray-600 leading-relaxed"
                    >
                        Entiendo que al recibir el enlace de descarga pierdo el
                        derecho de desistimiento de 14 días, conforme a la{" "}
                        <a
                            href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32011L0083"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 underline hover:no-underline"
                        >
                            Directiva EU 2011/83/UE Art. 16(m)
                        </a>
                        . En caso de fallo técnico no resuelto en 48h, puedo
                        solicitar devolución adjuntando capturas del error a{" "}
                        <a
                            href="mailto:iaflashelite@gmail.com"
                            className="text-cyan-600 underline hover:no-underline"
                        >
                            iaflashelite@gmail.com
                        </a>
                        . Ver{" "}
                        <a
                            href="/legal/garantias"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 underline hover:no-underline"
                        >
                            política de garantías
                        </a>
                        .
                    </label>
                </div>
            )}

            <div className="sm:col-span-2 flex flex-col gap-2 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {error && <Badge variant="muted">⚠️ {error}</Badge>}
                    <div className="ml-auto">
                        <Button
                            size="lg"
                            type="submit"
                            variant="gradient"
                            disabled={
                                sending ||
                                !acceptedPrivacy ||
                                !paymentMethod ||
                                (requiresDigitalConsent && !consentDigital)
                            }
                        >
                            {sending ? "Enviando…" : isService ? "Solicitar landing" : "Confirmar pedido"} <ArrowRight size={16} />
                        </Button>
                    </div>
                </div>
                {requiresDigitalConsent && !consentDigital && (
                    <p className="text-xs text-gray-400 text-right">
                        Acepta las condiciones de descarga para continuar.
                    </p>
                )}
            </div>
        </form>
    );
}

function Field({
    label,
    className = "",
    children,
}: {
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <label className={`flex flex-col gap-2 ${className}`}>
            <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                {label}
            </span>
            {children}
        </label>
    );
}
