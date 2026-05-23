import type { Metadata } from "next";
import {
    AlertTriangle,
    ArrowDownToLine,
    BookOpen,
    CheckCircle2,
    Download,
    FileText,
    Headphones,
    LockKeyhole,
    Terminal,
} from "lucide-react";
import { AudioGuidePlayer } from "@/components/gestoria/audio-guide-player";
import { CopyInstallCommand } from "@/components/gestoria/copy-install-command";

export const metadata: Metadata = {
    title: "GestorIA — Programa Piloto Privado",
    description:
        "Recursos privados para instalar GestorIA, descargar guías y escuchar audios del Programa Piloto Privado.",
};

const INSTALL_COMMAND =
    "curl -fsSL https://iaflashelite-web.vercel.app/gestoria/install.sh | GESTORIA_BASE_URL=https://iaflashelite-web.vercel.app/gestoria bash";

const PDF_LINKS = [
    {
        title: "Guía de Inicio",
        description:
            "Primeros pasos del Programa Piloto Privado: instalación, flujo básico y validación inicial.",
        href: "/gestoria/GestorIA_Guia_Inicio_Programa_Piloto_Privado.pdf",
    },
    {
        title: "Guía de motores IA económicos",
        description:
            "Cómo elegir motor IA sin gastar de más: OpenCode Go, Codex/ChatGPT, MiniMax, Ollama y APIs.",
        href: "/gestoria/GestorIA_Guia_Motores_IA_Economicos.pdf",
    },
] as const;

const NOTICE_ITEMS = [
    "Programa piloto privado.",
    "Datos locales por defecto; el contenido puede salir al proveedor IA configurado.",
    "No sustituye al gestor.",
    "No presenta impuestos automáticamente.",
    "Gmail/WhatsApp real no están integrados todavía.",
] as const;

export default function GestoriaPrivatePage() {
    return (
        <main className="min-h-screen bg-onyx text-paper">
            <HeroSection />
            <InstallSection />
            <PdfSection />
            <AudioSection />
            <NoticeSection />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pb-14 pt-16 sm:pb-20 sm:pt-24">
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
            <div
                className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.18),transparent_66%)]"
                aria-hidden
            />
            <div className="relative mx-auto max-w-[1120px]">
                <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-flash/25 bg-flash/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-flash">
                        <LockKeyhole className="h-4 w-4" />
                        Programa Piloto Privado
                    </span>
                    <h1 className="mt-8 text-5xl font-black leading-[0.98] tracking-tight text-paper sm:text-7xl">
                        GestorIA
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
                        Asistente IA para gestorías que ayuda a organizar clientes,
                        documentos, vencimientos y revisión humana.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-flash/20 bg-white/[0.04] px-5 py-4 text-base font-semibold text-paper">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-flash" />
                        La IA propone, el gestor aprueba.
                    </div>
                </div>
            </div>
        </section>
    );
}

function InstallSection() {
    return (
        <section className="px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1120px]">
                <SectionHeader
                    eyebrow="Instalación"
                    icon={<Terminal className="h-4 w-4" />}
                    title="Instala GestorIA con un comando"
                    description="Copia y pega este comando en Terminal. Está preparado para usar los recursos públicos del piloto."
                />
                <div className="mt-8 rounded-2xl border border-white/10 bg-[#090909] p-5 shadow-2xl shadow-black/30">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-paper">
                                Comando de instalación
                            </p>
                            <p className="mt-1 text-xs leading-5 text-text-secondary">
                                Copia el comando completo; se pega en una sola línea.
                            </p>
                        </div>
                        <CopyInstallCommand command={INSTALL_COMMAND} />
                    </div>
                    <pre className="whitespace-pre-wrap break-all rounded-xl border border-white/10 bg-black/60 p-4 text-sm leading-6 text-cyan-100 sm:break-words">
                        <code>{INSTALL_COMMAND}</code>
                    </pre>
                    <p className="mt-4 text-sm leading-6 text-text-secondary">
                        Usa esta página solo como recurso privado del piloto.
                    </p>
                </div>
            </div>
        </section>
    );
}

function PdfSection() {
    return (
        <section className="px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1120px]">
                <SectionHeader
                    eyebrow="PDFs"
                    icon={<FileText className="h-4 w-4" />}
                    title="Guías descargables"
                    description="Documentos preparados para entender el piloto, instalar con calma y elegir motor IA sin complicarse."
                />
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {PDF_LINKS.map((pdf) => (
                        <a
                            key={pdf.href}
                            href={pdf.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex min-h-52 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-flash/50 hover:bg-white/[0.06]"
                        >
                            <div>
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-flash/20 bg-flash/10 text-flash">
                                    <BookOpen className="h-5 w-5" />
                                </span>
                                <h3 className="mt-5 text-2xl font-semibold leading-tight text-paper">
                                    {pdf.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-text-secondary">
                                    {pdf.description}
                                </p>
                            </div>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-flash">
                                <Download className="h-4 w-4" />
                                Descargar PDF
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AudioSection() {
    return (
        <section className="px-6 py-12 sm:py-16">
            <div className="mx-auto max-w-[1120px]">
                <SectionHeader
                    eyebrow="Audios"
                    icon={<Headphones className="h-4 w-4" />}
                    title="Escucha las guías del piloto"
                    description="Reproductores nativos con descarga y velocidad ajustable para revisar el material a tu ritmo."
                />
                <div className="mt-8">
                    <AudioGuidePlayer />
                </div>
            </div>
        </section>
    );
}

function NoticeSection() {
    return (
        <section className="px-6 pb-20 pt-12 sm:pb-28 sm:pt-16">
            <div className="mx-auto max-w-[1120px] rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-xl">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
                            <AlertTriangle className="h-4 w-4" />
                            Avisos
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-paper">
                            Límites claros antes de probar
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-text-secondary">
                            GestorIA ayuda a ordenar y proponer, pero el control final
                            sigue en manos del profesional.
                        </p>
                    </div>
                    <ul className="grid flex-1 gap-2 sm:grid-cols-2">
                        {NOTICE_ITEMS.map((item) => (
                            <li
                                key={item}
                                className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm leading-6 text-paper"
                            >
                                <ArrowDownToLine className="mt-0.5 h-4 w-4 shrink-0 rotate-[-45deg] text-amber-200" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function SectionHeader({
    description,
    eyebrow,
    icon,
    title,
}: {
    readonly description: string;
    readonly eyebrow: string;
    readonly icon: React.ReactNode;
    readonly title: string;
}) {
    return (
        <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-flash">
                {icon}
                {eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-paper sm:text-4xl">
                {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">
                {description}
            </p>
        </div>
    );
}
