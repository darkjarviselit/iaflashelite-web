import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad — iaflashelite.com",
    description: "Cómo tratamos tus datos personales según RGPD y LOPDGDD",
};

export default function PrivacidadPage() {
    return (
        <>
            <h1>Política de Privacidad</h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                Última actualización: 18 de mayo de 2026
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <ul>
                <li>
                    <strong>Responsable:</strong> Oscar Pérez Tello
                </li>
                <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:iaflashelite@gmail.com">
                        iaflashelite@gmail.com
                    </a>
                </li>
                <li>
                    <strong>Finalidad principal:</strong> Atender consultas
                    comerciales
                </li>
            </ul>

            <h2>2. Datos que recogemos</h2>
            <p>
                A través del formulario de contacto y formularios de interés o
                lista de espera recogemos los siguientes datos:
            </p>
            <ul>
                <li>Nombre</li>
                <li>Email</li>
                <li>Empresa (opcional)</li>
                <li>Tipo de servicio, producto o iniciativa que te interesa</li>
                <li>Urgencia y presupuesto orientativo</li>
                <li>Mensaje libre</li>
            </ul>
            <p>
                No recogemos datos sensibles (origen racial, salud, opiniones
                políticas, orientación sexual, etc.) ni datos de menores de 14
                años.
            </p>

            <h2>3. Finalidad del tratamiento</h2>
            <p>
                Los datos se utilizan exclusivamente para responder a tu consulta,
                avisarte sobre la iniciativa concreta a la que te has apuntado y,
                si así lo decides, iniciar una conversación comercial. No se
                utilizan para envíos masivos, perfilado automatizado ni publicidad
                de terceros.
            </p>

            <h2>4. Base legal</h2>
            <p>
                La base legal del tratamiento es el consentimiento explícito que
                otorgas al marcar la casilla correspondiente en el formulario
                (art. 6.1.a RGPD).
            </p>

            <h2>5. Conservación</h2>
            <p>
                Los datos se conservan durante el tiempo necesario para gestionar
                la consulta. Si no hay relación comercial posterior, se eliminan a
                los 12 meses. Si se inicia un proyecto, los datos asociados se
                conservan el tiempo legal exigido por la normativa fiscal
                española.
            </p>

            <h2>6. Destinatarios</h2>
            <p>
                Los datos no se ceden a terceros. Para el funcionamiento del sitio
                utilizamos los siguientes proveedores que actúan como encargados
                del tratamiento:
            </p>
            <ul>
                <li>
                    <strong>Vercel Inc.</strong> (hosting de la web — Estados
                    Unidos, con cláusulas tipo de la Comisión Europea para
                    transferencias internacionales)
                </li>
                <li>
                    <strong>Google Workspace</strong> (gestión del email de
                    contacto iaflashelite@gmail.com)
                </li>
            </ul>

            <h2>7. Tus derechos</h2>
            <p>Como titular de los datos tienes derecho a:</p>
            <ul>
                <li>Acceder a tus datos</li>
                <li>Rectificarlos si son inexactos</li>
                <li>Suprimirlos cuando ya no sean necesarios</li>
                <li>Oponerte al tratamiento</li>
                <li>Solicitar la portabilidad</li>
                <li>Retirar el consentimiento en cualquier momento</li>
            </ul>
            <p>
                Para ejercer estos derechos, envía un email a{" "}
                <a href="mailto:iaflashelite@gmail.com">iaflashelite@gmail.com</a>{" "}
                indicando el derecho que deseas ejercer. Responderemos en un
                plazo máximo de 30 días.
            </p>
            <p>
                Si te apuntas a una lista de espera o aviso de lanzamiento, puedes
                solicitar la baja en cualquier momento respondiendo al email que
                recibas o escribiendo a{" "}
                <a href="mailto:iaflashelite@gmail.com">iaflashelite@gmail.com</a>.
            </p>

            <h2>8. Reclamaciones</h2>
            <p>
                Si consideras que el tratamiento de tus datos no se ajusta a la
                normativa, tienes derecho a presentar una reclamación ante la{" "}
                <a
                    href="https://www.aepd.es"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Agencia Española de Protección de Datos
                </a>
                .
            </p>

            <h2>9. Seguridad</h2>
            <p>
                Aplicamos medidas técnicas y organizativas razonables para
                proteger los datos: cifrado TLS en tránsito, control de acceso al
                backend de gestión de leads, hosting con estándares de seguridad
                de Vercel.
            </p>
        </>
    );
}
