"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    ClipboardList,
    CreditCard,
    Landmark,
    Smartphone,
    Wallet,
    Zap,
} from "lucide-react";
import { useState, type ComponentType, type FormEvent, type SVGProps } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    EXPRESS_SURCHARGE,
    GUARANTEE_POLICY_VERSION,
    SLOTS_CONFIG,
    calculateProductTotal,
    type ProductAddon,
    type ProductType,
} from "@/lib/constants";

interface CheckoutFormProps {
    slug: string;
    name: string;
    price: number;
    type?: ProductType;
    addons?: readonly ProductAddon[];
}

const SERVICE_QUESTIONS = [
    "Nombre de tu negocio",
    "Sector y público objetivo",
    "Referencias visuales (webs que te gustan)",
    "Textos y logo (si los tienes)",
    "Dominio donde la quieres alojar",
];

type PaymentMethodValue = "bizum" | "paypal" | "transferencia";
type DownloadManualMethod = Exclude<PaymentMethodValue, "paypal">;
type DownloadMode = "paypal_direct" | "manual";

interface PaymentMethodOption<V extends string> {
    value: V;
    label: string;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const SERVICE_PAYMENT_METHODS: PaymentMethodOption<PaymentMethodValue>[] = [
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

const DOWNLOAD_MANUAL_METHODS: PaymentMethodOption<DownloadManualMethod>[] = [
    {
        value: "bizum",
        label: "Bizum",
        description: "Pago instantáneo desde tu móvil. Solo necesitas tu app del banco.",
        icon: Smartphone,
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

export function CheckoutForm({
    slug,
    name,
    price,
    type = "download",
    addons = [],
}: CheckoutFormProps) {
    const isService = type === "service";
    return isService ? (
        <ServiceCheckout slug={slug} name={name} price={price} />
    ) : (
        <DownloadCheckout slug={slug} name={name} price={price} addons={addons} />
    );
}

// ─── Servicios (flujo manual original, intacto) ───────────────

function ServiceCheckout({ slug, name, price }: { slug: string; name: string; price: number }) {
    const expressSurcharge = EXPRESS_SURCHARGE[slug] ?? 0;
    const expressOffered = expressSurcharge > 0;
    const expressDisabled = SLOTS_CONFIG.express_available === 0;
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue | "">("");
    const [isExpress, setIsExpress] = useState(false);

    const effectiveExpress = expressOffered && !expressDisabled && isExpress;
    const totalPrice = price + (effectiveExpress ? expressSurcharge : 0);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        if (!paymentMethod) {
            setError("missing_payment_method");
            return;
        }
        const fd = new FormData(event.currentTarget);
        const consentTimestamp = new Date().toISOString();
        const payload = {
            productSlug: slug,
            name: String(fd.get("name") ?? ""),
            email: String(fd.get("email") ?? ""),
            paymentMethod,
            comments: String(fd.get("comments") ?? ""),
            website: String(fd.get("website") ?? ""),
            acceptedPrivacy,
            isExpress: effectiveExpress,
            consentDigital: null,
            consentDigitalAt: null,
            consentTimestamp,
            policyVersion: GUARANTEE_POLICY_VERSION,
            consentSummary:
                "Privacidad aceptada. Garantía Flash aplicable al plazo y alcance acordados para servicios personalizados.",
        };
        setSending(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { ok: boolean; error?: string };
            if (!res.ok || !data.ok) setError(data.error ?? "send_failed");
            else setSuccess(true);
        } catch {
            setError("network_error");
        } finally {
            setSending(false);
        }
    }

    if (success) {
        const methodLabel = paymentMethod ? METHOD_LABELS[paymentMethod] : "—";
        return (
            <SuccessCard
                customerName={customerName}
                customerEmail={customerEmail}
                productName={name}
                totalPrice={totalPrice}
                paymentLabel={methodLabel}
                effectiveExpress={effectiveExpress}
                expressSurcharge={expressSurcharge}
                variant="service"
            />
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid sm:grid-cols-2 gap-5 p-8 sm:p-10 rounded-3xl border border-gray-200 bg-white shadow-sm"
        >
            <Honeypot />

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
                    Te entregamos la landing en 48h desde que recibimos estos datos y confirmemos el pago.
                </p>
            </div>

            <ProductSummary
                isService
                name={name}
                price={price}
                totalPrice={totalPrice}
                effectiveExpress={effectiveExpress}
                expressSurcharge={expressSurcharge}
            />

            {expressOffered && (
                <ExpressToggle
                    enabled={!expressDisabled}
                    checked={effectiveExpress}
                    surcharge={expressSurcharge}
                    onChange={setIsExpress}
                />
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
                <PaymentMethodGrid<PaymentMethodValue>
                    methods={SERVICE_PAYMENT_METHODS}
                    selected={paymentMethod}
                    onSelect={setPaymentMethod}
                    columns="sm:grid-cols-3"
                />
            </fieldset>

            <Field label="Cuéntanos algo inicial (opcional)" className="sm:col-span-2">
                <textarea
                    name="comments"
                    rows={4}
                    placeholder="Si quieres adelantarnos el nombre de tu negocio, sector o webs de referencia, escríbelo aquí. (No es obligatorio, te lo pediremos por email igualmente.)"
                    className={`${inputClass} resize-none h-auto py-3`}
                />
            </Field>

            <PrivacyCheckbox
                checked={acceptedPrivacy}
                onChange={setAcceptedPrivacy}
            />

            <div className="sm:col-span-2 flex flex-col gap-2 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {error && <Badge variant="muted">⚠️ {error}</Badge>}
                    <div className="ml-auto">
                        <Button
                            size="lg"
                            type="submit"
                            variant="gradient"
                            disabled={sending || !acceptedPrivacy || !paymentMethod}
                        >
                            {sending ? "Enviando…" : "Solicitar landing"} <ArrowRight size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

// ─── Descargables (PayPal directo + tab manual Bizum/Transferencia) ───────

function DownloadCheckout({
    slug,
    name,
    price,
    addons,
}: {
    slug: string;
    name: string;
    price: number;
    addons: readonly ProductAddon[];
}) {
    const [mode, setMode] = useState<DownloadMode>("paypal_direct");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [consentDigital, setConsentDigital] = useState(false);
    const [consentDigitalAt, setConsentDigitalAt] = useState("");
    const [manualMethod, setManualMethod] = useState<DownloadManualMethod | "">("");
    const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
    const [sending, setSending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentLabel, setPaymentLabel] = useState<string>("");
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const total = calculateProductTotal(slug, price, selectedAddonIds);
    const selectedAddons = total?.selectedAddons ?? [];
    const totalPrice = total?.total ?? price;
    const trimmedName = customerName.trim();
    const trimmedEmail = customerEmail.trim();
    const validEmail = /.+@.+\..+/.test(trimmedEmail);
    const canPay =
        trimmedName.length > 0 && validEmail && consentDigital && acceptedPrivacy;

    function toggleDigitalConsent(checked: boolean) {
        setConsentDigital(checked);
        setConsentDigitalAt(checked ? new Date().toISOString() : "");
    }

    function toggleAddon(addonId: string, checked: boolean) {
        setSelectedAddonIds((current) => {
            if (checked) {
                return current.includes(addonId) ? current : [...current, addonId];
            }
            return current.filter((id) => id !== addonId);
        });
    }

    async function handleManualSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        if (!manualMethod) {
            setError("missing_payment_method");
            return;
        }
        if (!consentDigital) {
            setError("missing_digital_consent");
            return;
        }
        const fd = new FormData(event.currentTarget);
        const consentTimestamp = consentDigitalAt || new Date().toISOString();
        const payload = {
            productSlug: slug,
            name: trimmedName,
            email: trimmedEmail,
            paymentMethod: manualMethod,
            addonIds: selectedAddonIds,
            comments: String(fd.get("comments") ?? ""),
            website: String(fd.get("website") ?? ""),
            acceptedPrivacy,
            isExpress: false,
            consentDigital,
            consentDigitalAt: consentTimestamp,
            consentTimestamp,
            policyVersion: GUARANTEE_POLICY_VERSION,
            consentSummary:
                "Entrega inmediata solicitada. El cliente reconoce pérdida de desistimiento tras acceso, descarga o envío y mantiene Garantía Flash de entrega y funcionamiento.",
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
                setPaymentLabel(METHOD_LABELS[manualMethod]);
                setSuccess(true);
            }
        } catch {
            setError("network_error");
        } finally {
            setSending(false);
        }
    }

    if (success) {
        return (
            <SuccessCard
                customerName={trimmedName}
                customerEmail={trimmedEmail}
                productName={name}
                totalPrice={totalPrice}
                paymentLabel={paymentLabel || "PayPal (pago directo)"}
                effectiveExpress={false}
                expressSurcharge={0}
                variant={paymentLabel ? "download_manual" : "download_paypal"}
                downloadUrl={downloadUrl}
            />
        );
    }

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

    return (
        <div className="flex flex-col gap-5 p-8 sm:p-10 rounded-3xl border border-gray-200 bg-white shadow-sm">
            <ProductSummary
                isService={false}
                name={name}
                price={price}
                totalPrice={totalPrice}
                effectiveExpress={false}
                expressSurcharge={0}
                selectedAddons={selectedAddons}
            />

            <p className="text-sm text-gray-600 leading-relaxed">
                Antes de pagar, confirma tus datos y las condiciones de entrega
                digital. Guardaremos la prueba del pedido, consentimiento, fecha
                y método de pago para proteger ambas partes.
            </p>

            {addons.length > 0 && (
                <AddonSelector
                    addons={addons}
                    selectedAddonIds={selectedAddonIds}
                    onToggle={toggleAddon}
                />
            )}

            <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nombre completo *">
                    <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        autoComplete="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={inputClass}
                    />
                </Field>
                <Field label="Email * (aquí recibirás el producto)">
                    <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        autoComplete="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className={inputClass}
                    />
                </Field>
            </div>

            <PrivacyCheckbox
                checked={acceptedPrivacy}
                onChange={setAcceptedPrivacy}
            />

            <DigitalConsentCheckbox
                checked={consentDigital}
                onChange={toggleDigitalConsent}
            />

            <div className="flex flex-col gap-3">
                <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                    Método de pago *
                </span>
                <div className="grid sm:grid-cols-2 gap-3">
                    <ModeTab
                        active={mode === "paypal_direct"}
                        icon={<CreditCard className="w-4 h-4" />}
                        title="PayPal / Tarjeta"
                        hint="Pago inmediato con tarjeta o PayPal. Recibes la entrega por email al instante."
                        onClick={() => {
                            setError(null);
                            setMode("paypal_direct");
                        }}
                    />
                    <ModeTab
                        active={mode === "manual"}
                        icon={<Smartphone className="w-4 h-4" />}
                        title="Bizum / Transferencia"
                        hint="Pago manual. Recibes instrucciones por email en menos de 12h."
                        onClick={() => {
                            setError(null);
                            setMode("manual");
                        }}
                    />
                </div>
            </div>

            {mode === "paypal_direct" ? (
                <div className="flex flex-col gap-3">
                    {!paypalClientId ? (
                        <p className="text-sm text-red-600">
                            PayPal no está configurado. Usa Bizum o transferencia.
                        </p>
                    ) : !canPay ? (
                        <p className="text-sm text-gray-500">
                            Rellena tu nombre, email y acepta las condiciones para continuar con PayPal.
                        </p>
                    ) : (
                        <PayPalScriptProvider
                            options={{
                                clientId: paypalClientId,
                                currency: "EUR",
                                locale: "es_ES",
                                intent: "capture",
                            }}
                        >
                            <PayPalButtons
                                style={{
                                    layout: "vertical",
                                    color: "blue",
                                    shape: "rect",
                                    label: "pay",
                                }}
                                createOrder={async () => {
                                    setError(null);
                                    const res = await fetch("/api/paypal/create-order", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            productName: name,
                                            productSlug: slug,
                                            addonIds: selectedAddonIds,
                                        }),
                                    });
                                    const data = (await res.json()) as { id?: string; error?: string };
                                    if (!res.ok || !data.id) {
                                        throw new Error(data.error ?? "create_order_failed");
                                    }
                                    return data.id;
                                }}
                                onApprove={async (data) => {
                                    const consentTimestamp =
                                        consentDigitalAt || new Date().toISOString();
                                    const res = await fetch("/api/paypal/capture-order", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            orderID: data.orderID,
                                            customerName: trimmedName,
                                            customerEmail: trimmedEmail,
                                            productSlug: slug,
                                            addonIds: selectedAddonIds,
                                            consentDigital,
                                            consentDigitalAt: consentTimestamp,
                                            consentTimestamp,
                                            policyVersion: GUARANTEE_POLICY_VERSION,
                                            consentSummary:
                                                "Entrega inmediata solicitada. El cliente reconoce pérdida de desistimiento tras acceso, descarga o envío y mantiene Garantía Flash de entrega y funcionamiento.",
                                        }),
                                    });
                                    const result = (await res.json()) as {
                                        ok?: boolean;
                                        error?: string;
                                        downloadUrl?: string | null;
                                    };
                                    if (res.ok && result.ok) {
                                        setPaymentLabel("");
                                        setDownloadUrl(result.downloadUrl ?? null);
                                        setSuccess(true);
                                    } else {
                                        setError(
                                            "El pago se completó pero hubo un problema al registrar el pedido. Escribe a iaflashelite@gmail.com con tu nombre y el ID de PayPal.",
                                        );
                                    }
                                }}
                                onError={() => {
                                    setError(
                                        "Error en PayPal. Prueba con Bizum o transferencia, o reintenta en unos minutos.",
                                    );
                                }}
                                onCancel={() => {
                                    setError(null);
                                }}
                            />
                        </PayPalScriptProvider>
                    )}
                    {error && <Badge variant="muted">⚠️ {error}</Badge>}
                </div>
            ) : (
                <form onSubmit={handleManualSubmit} className="flex flex-col gap-5">
                    <Honeypot />
                    <PaymentMethodGrid<DownloadManualMethod>
                        methods={DOWNLOAD_MANUAL_METHODS}
                        selected={manualMethod}
                        onSelect={setManualMethod}
                        columns="sm:grid-cols-2"
                    />
                    <Field label="Comentarios (opcional)">
                        <textarea
                            name="comments"
                            rows={3}
                            placeholder="¿Algo que debamos saber antes de procesar tu pedido?"
                            className={`${inputClass} resize-none h-auto py-3`}
                        />
                    </Field>
                    <div className="flex flex-col gap-2 pt-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            {error && <Badge variant="muted">⚠️ {error}</Badge>}
                            <div className="ml-auto">
                                <Button
                                    size="lg"
                                    type="submit"
                                    variant="gradient"
                                    disabled={
                                        sending ||
                                        !canPay ||
                                        !manualMethod
                                    }
                                >
                                    {sending ? "Enviando…" : "Confirmar pedido"} <ArrowRight size={16} />
                                </Button>
                            </div>
                        </div>
                        {!consentDigital && (
                            <p className="text-xs text-gray-400 text-right">
                                Acepta las condiciones de descarga para continuar.
                            </p>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
}

// ─── Subcomponentes compartidos ───────────────────────────────

function Honeypot() {
    return (
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
    );
}

interface ProductSummaryProps {
    isService: boolean;
    name: string;
    price: number;
    totalPrice: number;
    effectiveExpress: boolean;
    expressSurcharge: number;
    selectedAddons?: readonly ProductAddon[];
}

function ProductSummary({
    isService,
    name,
    price,
    totalPrice,
    effectiveExpress,
    expressSurcharge,
    selectedAddons = [],
}: ProductSummaryProps) {
    return (
        <div className="sm:col-span-2 flex items-start justify-between gap-4 p-4 rounded-xl border border-cyan-200 bg-cyan-50">
            <div className="flex flex-col">
                <Badge variant="cyan">{isService ? "Servicio" : "Producto"}</Badge>
                <span className="mt-2 text-base font-semibold text-gray-900">{name}</span>
                {selectedAddons.length > 0 && (
                    <span className="mt-1 text-xs font-medium text-cyan-800">
                        Extra: {selectedAddons.map((addon) => addon.name).join(", ")}
                    </span>
                )}
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
                {!effectiveExpress && selectedAddons.length > 0 && (
                    <span className="block text-[11px] text-gray-500 mt-1">
                        {price}€ +{" "}
                        {selectedAddons.reduce((sum, addon) => sum + addon.price, 0)}€ extras
                    </span>
                )}
            </div>
        </div>
    );
}

interface AddonSelectorProps {
    addons: readonly ProductAddon[];
    selectedAddonIds: readonly string[];
    onToggle: (addonId: string, checked: boolean) => void;
}

function AddonSelector({
    addons,
    selectedAddonIds,
    onToggle,
}: AddonSelectorProps) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <span className="text-[11px] tracking-[0.18em] uppercase text-gray-500 font-medium">
                Extras opcionales
            </span>
            {addons.map((addon) => {
                const checked = selectedAddonIds.includes(addon.id);
                return (
                    <label
                        key={addon.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                            checked
                                ? "border-cyan-500 bg-cyan-50"
                                : "border-gray-200 bg-white hover:border-cyan-300"
                        }`}
                    >
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(event) => onToggle(addon.id, event.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                        />
                        <span className="flex flex-1 flex-col gap-1">
                            <span className="flex flex-col gap-1 text-sm font-semibold text-gray-900 sm:flex-row sm:items-center sm:justify-between">
                                <span>{addon.name}</span>
                                <span className="text-cyan-700">+{addon.price}€</span>
                            </span>
                            <span className="text-xs leading-relaxed text-gray-600">
                                {addon.description}
                            </span>
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

interface ExpressToggleProps {
    enabled: boolean;
    checked: boolean;
    surcharge: number;
    onChange: (checked: boolean) => void;
}

function ExpressToggle({ enabled, checked, surcharge, onChange }: ExpressToggleProps) {
    return (
        <label
            className={`sm:col-span-2 flex items-start gap-3 p-5 rounded-2xl border-2 transition-all ${
                !enabled
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-70"
                    : checked
                        ? "border-cyan-500 bg-cyan-50 cursor-pointer"
                        : "border-gray-200 bg-white hover:border-cyan-300 cursor-pointer"
            }`}
        >
            <input
                type="checkbox"
                name="isExpress"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={!enabled}
                className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:cursor-not-allowed"
            />
            <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Zap className="w-4 h-4 text-cyan-600" />
                    ¿Necesitas entrega Express?
                    {enabled && <span className="text-cyan-700">+{surcharge}€</span>}
                </span>
                <span className="text-xs text-gray-600 leading-relaxed">
                    {!enabled
                        ? "Express agotado este mes — solo modo normal disponible."
                        : "Tu landing en 24h en lugar de 48h. Prioridad máxima. Solo disponible si quedan huecos express este mes."}
                </span>
            </div>
        </label>
    );
}

interface PaymentMethodGridProps<V extends string> {
    methods: PaymentMethodOption<V>[];
    selected: V | "";
    onSelect: (value: V) => void;
    columns: string;
}

function PaymentMethodGrid<V extends string>({
    methods,
    selected,
    onSelect,
    columns,
}: PaymentMethodGridProps<V>) {
    return (
        <div className={`grid gap-3 ${columns}`}>
            {methods.map((m) => {
                const Icon = m.icon;
                const isSelected = selected === m.value;
                return (
                    <label
                        key={m.value}
                        className={`relative flex flex-col gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ease-out ${
                            isSelected
                                ? "border-cyan-500 bg-cyan-50 shadow-md"
                                : "border-gray-200 bg-white hover:border-cyan-300 hover:-translate-y-0.5 hover:shadow-sm"
                        }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={m.value}
                            checked={isSelected}
                            onChange={() => onSelect(m.value)}
                            required
                            className="sr-only"
                        />
                        <span
                            className={`absolute top-3 right-3 inline-flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
                                isSelected
                                    ? "bg-cyan-500 border-cyan-500 text-white"
                                    : "bg-white border-gray-300 text-transparent"
                            }`}
                            aria-hidden
                        >
                            <Check size={12} strokeWidth={3} />
                        </span>
                        <span
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${
                                isSelected
                                    ? "bg-white border-cyan-200 text-cyan-600"
                                    : "bg-cyan-50 border-cyan-100 text-cyan-600"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{m.label}</span>
                        <span className="text-xs text-gray-600 leading-relaxed">
                            {m.description}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

interface PrivacyCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function PrivacyCheckbox({ checked, onChange }: PrivacyCheckboxProps) {
    return (
        <div className="sm:col-span-2 flex items-start gap-3 pt-2">
            <input
                type="checkbox"
                id="order-accepted-privacy"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
            <label
                htmlFor="order-accepted-privacy"
                className="text-sm text-gray-600 leading-relaxed"
            >
                He leído la{" "}
                <a
                    href="/legal/privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 underline hover:no-underline"
                >
                    política de privacidad
                </a>{" "}
                y acepto que IAFlashElite trate mis datos para gestionar este
                pedido y el soporte asociado.
            </label>
        </div>
    );
}

function DigitalConsentCheckbox({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="sm:col-span-2 flex items-start gap-3 pt-2">
            <input
                type="checkbox"
                id="order-consent-digital"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 bg-white accent-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 shrink-0"
            />
            <label
                htmlFor="order-consent-digital"
                className="text-sm text-gray-600 leading-relaxed"
            >
                Solicito la entrega inmediata del contenido digital y entiendo
                que, cuando empiece el acceso, descarga o envío, pierdo el
                derecho de desistimiento de 14 días, conforme a la{" "}
                <a
                    href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32011L0083"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 underline hover:no-underline"
                >
                    Directiva EU 2011/83/UE Art. 16(m)
                </a>
                . Mantengo la Garantía Flash si el producto no llega, falla,
                está dañado o no coincide con la descripción. Ver{" "}
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
    );
}

interface ModeTabProps {
    active: boolean;
    icon: React.ReactNode;
    title: string;
    hint: string;
    onClick: () => void;
}

function ModeTab({ active, icon, title, hint, onClick }: ModeTabProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`text-left p-4 rounded-2xl border-2 transition-all ${
                active
                    ? "border-cyan-500 bg-cyan-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-cyan-300 hover:-translate-y-0.5 hover:shadow-sm"
            }`}
        >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
                    {icon}
                </span>
                {title}
            </div>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">{hint}</p>
        </button>
    );
}

interface SuccessCardProps {
    customerName: string;
    customerEmail: string;
    productName: string;
    totalPrice: number;
    paymentLabel: string;
    effectiveExpress: boolean;
    expressSurcharge: number;
    variant: "service" | "download_manual" | "download_paypal";
    downloadUrl?: string | null;
}

function SuccessCard({
    customerName,
    customerEmail,
    productName,
    totalPrice,
    paymentLabel,
    effectiveExpress,
    expressSurcharge,
    variant,
    downloadUrl,
}: SuccessCardProps) {
    const isService = variant === "service";
    const isPaypalDirect = variant === "download_paypal";

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
                {isPaypalDirect ? "¡Pago completado!" : "Gracias"}
                {customerName ? `, ${customerName}` : ""}.
            </h2>
            <div className="flex flex-col gap-3 max-w-md text-emerald-800 leading-relaxed">
                <p>
                    Hemos recibido tu {isService ? "solicitud" : "pedido"} de{" "}
                    <span className="font-semibold">{productName}</span>{" "}
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
                        con los datos de pago (
                        <span className="font-semibold">{paymentLabel}</span>) y el cuestionario
                        inicial para empezar tu landing. La entrega es{" "}
                        <span className="font-semibold">48h</span> desde que recibimos pago +
                        cuestionario.
                    </p>
                ) : isPaypalDirect ? (
                    <>
                        <p>
                            ✅ El pago se ha cobrado correctamente vía PayPal.
                        </p>
                        <p>
                            📧 Te hemos enviado el enlace de descarga a{" "}
                            {customerEmail ? (
                                <span className="font-semibold">{customerEmail}</span>
                            ) : (
                                <span className="font-semibold">tu email</span>
                            )}
                            .
                        </p>
                        {downloadUrl && (
                            <div className="flex justify-center pt-2">
                                <a
                                    href={downloadUrl}
                                    download
                                    className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                                >
                                    ⬇️ Descargar ahora
                                </a>
                            </div>
                        )}
                    </>
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
                            (<span className="font-semibold">{paymentLabel}</span>).
                        </p>
                        <p>
                            Una vez recibamos el pago, te enviaremos el producto directamente a tu
                            email.
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
