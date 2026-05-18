import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Cookies — iaflashelite.com",
    description: "Información sobre cookies utilizadas en iaflashelite.com",
};

export default function CookiesPage() {
    return (
        <>
            <h1>Política de Cookies</h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-text-muted">
                Última actualización: 18 de mayo de 2026
            </p>

            <h2>1. Qué son las cookies</h2>
            <p>
                Las cookies son pequeños archivos que un sitio web guarda en tu
                navegador para recordar información sobre tu visita.
            </p>

            <h2>2. Cookies que usamos</h2>
            <p>
                Actualmente <strong>iaflashelite.com no utiliza cookies de
                seguimiento, analíticas ni publicidad</strong>. Tampoco
                utilizamos servicios de terceros que instalen cookies (Google
                Analytics, Meta Pixel, etc.).
            </p>
            <p>
                Las únicas cookies que podrían instalarse son las técnicas
                estrictamente necesarias para el funcionamiento del sitio (por
                ejemplo, las que establece Vercel para servir la web).
            </p>

            <h2>3. Cambios futuros</h2>
            <p>
                Si en el futuro incorporamos cookies analíticas o de terceros,
                se añadirá un banner de consentimiento conforme a la normativa
                española y europea, y esta política se actualizará detallando
                cada cookie (proveedor, finalidad, duración).
            </p>

            <h2>4. Cómo desactivar cookies</h2>
            <p>
                Puedes configurar tu navegador para bloquear o eliminar cookies
                en cualquier momento. Cada navegador tiene su propia
                configuración:
            </p>
            <ul>
                <li>
                    <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Chrome
                    </a>
                </li>
                <li>
                    <a
                        href="https://support.mozilla.org/es/kb/proteccion-mejorada-rastreo-firefox-escritorio"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Mozilla Firefox
                    </a>
                </li>
                <li>
                    <a
                        href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Safari
                    </a>
                </li>
                <li>
                    <a
                        href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Microsoft Edge
                    </a>
                </li>
            </ul>

            <h2>5. Contacto</h2>
            <p>
                Para cualquier consulta sobre cookies, escribe a{" "}
                <a href="mailto:iaflashelite@gmail.com">iaflashelite@gmail.com</a>
                .
            </p>
        </>
    );
}
