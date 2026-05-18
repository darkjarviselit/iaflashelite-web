import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aviso Legal — iaflashelite.com",
    description:
        "Información legal sobre el titular y uso del sitio iaflashelite.com",
};

export default function AvisoLegalPage() {
    return (
        <>
            <h1>Aviso Legal</h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                Última actualización: 18 de mayo de 2026
            </p>

            <h2>1. Información del titular</h2>
            <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
                de Servicios de la Sociedad de la Información y de Comercio
                Electrónico (LSSI-CE), se facilitan los siguientes datos:
            </p>
            <ul>
                <li>
                    <strong>Titular:</strong> Oscar Pérez Tello
                </li>
                <li>
                    <strong>Naturaleza:</strong> Persona física (desarrollador
                    freelance)
                </li>
                <li>
                    <strong>Email de contacto:</strong>{" "}
                    <a href="mailto:iaflashelite@gmail.com">
                        iaflashelite@gmail.com
                    </a>
                </li>
                <li>
                    <strong>Sitio web:</strong>{" "}
                    <a href="https://iaflashelite.com">https://iaflashelite.com</a>
                </li>
                <li>
                    <strong>Ubicación:</strong> España
                </li>
            </ul>

            <h2>2. Objeto del sitio</h2>
            <p>
                iaflashelite.com es un sitio informativo que presenta servicios de
                desarrollo de software, automatización y agentes de inteligencia
                artificial. El sitio permite a usuarios interesados solicitar
                información mediante un formulario de contacto.
            </p>

            <h2>3. Condiciones de uso</h2>
            <p>
                El acceso a este sitio web es gratuito. El usuario se compromete a
                hacer un uso adecuado del sitio, no destinándolo a actividades
                ilegales o contrarias a la buena fe.
            </p>

            <h2>4. Propiedad intelectual</h2>
            <p>
                Todos los contenidos del sitio (textos, imágenes, código, marca
                iaflashelite, mascota Flash) son propiedad de Oscar Pérez Tello,
                salvo indicación expresa. Se prohíbe su reproducción sin
                autorización previa.
            </p>

            <h2>5. Responsabilidad</h2>
            <p>
                El titular no se responsabiliza de daños derivados del uso de la
                información publicada. Los servicios descritos se prestan caso a
                caso mediante acuerdo directo entre las partes.
            </p>

            <h2>6. Legislación aplicable</h2>
            <p>
                Las presentes condiciones se rigen por la legislación española.
                Para cualquier controversia, las partes se someten a los tribunales
                del domicilio del titular.
            </p>

            <h2>7. Contacto</h2>
            <p>
                Para cualquier consulta sobre este aviso legal, puede escribir a{" "}
                <a href="mailto:iaflashelite@gmail.com">iaflashelite@gmail.com</a>.
            </p>
        </>
    );
}
