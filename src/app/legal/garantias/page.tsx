import type { Metadata } from "next";
import Link from "next/link";
import { GUARANTEE_POLICY_VERSION } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Garantía Flash y devoluciones — iaflashelite.com",
    description:
        "Política de desistimiento, devoluciones y Garantía Flash de IAFlashElite para productos digitales, servicios personalizados, auditorías, setups y pilotos.",
};

export default function GarantiasPage() {
    return (
        <>
            <h1>Política de desistimiento, devoluciones y Garantía Flash</h1>
            <p className="text-[11px] tracking-[0.18em] uppercase text-gray-500">
                Última actualización: Mayo 2026 · {GUARANTEE_POLICY_VERSION}
            </p>

            <p>
                Compra protegida por Garantía Flash. Entrega digital segura.
                Soporte si algo falla. Esta política explica cuándo revisamos,
                reparamos, reenviamos o entregamos una versión funcional, y
                cuándo puede valorarse un reembolso total o parcial.
            </p>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Productos digitales de entrega inmediata</h2>
                <p>
                    En productos digitales sin soporte físico puedes tener un
                    derecho general de desistimiento de 14 días naturales. Ese
                    derecho deja de aplicarse cuando solicitas entrega inmediata,
                    aceptas expresamente las condiciones y empieza el acceso,
                    descarga o envío del contenido digital.
                </p>
                <p>
                    Esta excepción se basa en la{" "}
                    <a
                        href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32011L0083"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Directiva 2011/83/UE
                    </a>{" "}
                    y en el{" "}
                    <a
                        href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Real Decreto Legislativo 1/2007
                    </a>
                    . No limita tus derechos si el producto no se entrega, está
                    dañado, no coincide con lo descrito o no funciona según lo
                    prometido.
                </p>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Garantía Flash de entrega y funcionamiento</h2>
                <p>
                    La Garantía Flash protege la entrega y el funcionamiento. No
                    es una devolución por cambio de opinión una vez iniciado el
                    acceso digital.
                </p>
                <p>
                    Si el enlace no llega, el enlace falla, el archivo está
                    dañado, el producto no coincide con la descripción o aparece
                    un fallo grave reproducible, lo revisamos. Primero intentamos
                    solucionarlo, reenviarlo o entregarte una versión funcional.
                    Si no podemos resolverlo, valoraremos un reembolso total o
                    parcial según el caso.
                </p>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Casos cubiertos</h2>
                <ul>
                    <li>No recibes el email o enlace de entrega tras el pago confirmado.</li>
                    <li>El enlace de descarga no funciona o apunta a un archivo incorrecto.</li>
                    <li>El archivo está dañado o no puede abrirse con las instrucciones indicadas.</li>
                    <li>El producto recibido no coincide de forma relevante con la descripción publicada.</li>
                    <li>Hay un fallo grave reproducible que impide el uso normal descrito.</li>
                </ul>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Casos no cubiertos</h2>
                <ul>
                    <li>Cambio de opinión tras iniciar acceso, descarga o envío del contenido digital.</li>
                    <li>Compra por error cuando el producto ya se ha entregado correctamente.</li>
                    <li>No leer requisitos, instrucciones o compatibilidades publicadas.</li>
                    <li>Falta de conocimientos técnicos no atribuible a un fallo del producto.</li>
                    <li>Uso distinto al descrito o modificaciones propias que rompan el producto.</li>
                </ul>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Servicios personalizados, auditorías, setups y pilotos</h2>
                <p>
                    En servicios personalizados, auditorías simples, setups y
                    pilotos, la Garantía Flash se aplica al alcance y plazo
                    acordados por escrito antes de empezar. Si algo no encaja,
                    primero revisamos el caso y proponemos corrección, ajuste o
                    entrega funcional dentro del alcance pactado.
                </p>
                <p>
                    No cubre cambios de alcance posteriores, preferencias
                    subjetivas no incluidas en el briefing inicial o rechazar
                    revisiones razonables ofrecidas para corregir la entrega.
                </p>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Cómo recibes tu Auditoría IA</h2>
                <p>
                    Trabajamos en dos pasos pensados para que valides el resultado
                    antes de cerrar la entrega:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-gray-700 leading-relaxed">
                    <li>
                        <strong>Sesión de presentación contigo.</strong> Te entregamos
                        un vídeo donde te explicamos los hallazgos, las conclusiones y
                        qué pasos te proponemos. Lo ves en tu tiempo, sin reuniones
                        obligatorias. Si prefieres una llamada, también.
                    </li>
                    <li>
                        <strong>Informe en PDF.</strong> Después de la sesión recibes el
                        informe completo en PDF, con tu nombre, fecha y un código único
                        que identifica tu copia.
                    </li>
                </ol>
                <p>
                    Tienes <strong>7 días</strong> desde que recibes el PDF para
                    revisarlo a fondo. Si algo no encaja con lo que acordamos al
                    principio, nos lo dices y lo corregimos sin coste. Pasados esos 7
                    días, entendemos que la auditoría está aceptada.
                </p>
                <p>
                    El informe es para uso interno de tu empresa. Si quieres
                    compartirlo o usarlo fuera de ella, lo acordamos antes por escrito.
                </p>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">
                    Cómo pagas la Automatización a medida y el Agente IA privado
                </h2>
                <p>
                    Trabajamos por partes para que veas resultados antes de pagar el
                    siguiente paso. Nada de pagar todo por adelantado y cruzar los
                    dedos:
                </p>
                <ul>
                    <li>
                        <strong>30% al empezar.</strong> Al firmar la propuesta cerrada
                        recibes alcance, precio y plazo por escrito. Entonces pagas el
                        primer 30%.
                    </li>
                    <li>
                        <strong>40% cuando lo veas funcionando.</strong> Cuando tu
                        sistema esté listo, te lo enseñamos en un entorno de prueba que
                        montamos nosotros. Lo probamos juntos con tus datos reales. Si
                        va bien, pagas el 40%.
                    </li>
                    <li>
                        <strong>30% al entregarlo.</strong> Cuando el sistema pasa las
                        pruebas que acordamos en la propuesta, lo dejamos instalado en
                        tus equipos o servidor para que sea totalmente tuyo. Ahí pagas
                        el 30% restante.
                    </li>
                </ul>
                <p>
                    Tienes <strong>14 días</strong> desde la entrega final para
                    reportar cualquier fallo de lo que acordamos y lo corregimos sin
                    coste. Cualquier petición nueva que aparezca después se trata como
                    ampliación: te la presupuestamos aparte y decides.
                </p>
                <p>
                    Si en cualquier paso decides no continuar, no pasa nada. Conservas
                    todo lo que ya hayamos entregado. Lo que has pagado corresponde al
                    trabajo ya hecho.
                </p>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Cómo funciona el Mantenimiento de agente</h2>
                <p>
                    Los planes Basic (99€/mes) y Pro (199€/mes) se pagan mes a mes por
                    adelantado. Sin contratos largos ni penalizaciones.
                </p>
                <p>
                    Puedes cancelar cuando quieras avisándonos con{" "}
                    <strong>30 días</strong> para que ajustemos tu siguiente factura. El
                    mes que ya tengas pagado lo sigues disfrutando hasta el final.
                </p>
                <p>
                    Si prefieres comprometerte un año entero, hay opción anual con
                    descuento: <strong>pagas 10 meses y disfrutas 12</strong>. La opción
                    anual no se devuelve parcialmente, pero conservas el servicio hasta
                    que se cumpla el año.
                </p>
                <p>
                    El Mantenimiento cubre lo que figura en cada plan (soporte,
                    vigilancia y actualizaciones). Las funcionalidades nuevas que no
                    estén incluidas se trabajan aparte como ampliación.
                </p>
            </section>

            <section className="mt-10 p-6 rounded-2xl bg-white border border-gray-200">
                <h2 className="!mt-0">Cómo solicitar revisión</h2>
                <ol className="list-decimal pl-5 space-y-1.5 text-gray-700 leading-relaxed">
                    <li>
                        Escribe a{" "}
                        <a href="mailto:iaflashelite@gmail.com">
                            iaflashelite@gmail.com
                        </a>{" "}
                        con asunto “Garantía Flash — [producto o pedido]”.
                    </li>
                    <li>Incluye email de compra, producto, fecha aproximada y método de pago.</li>
                    <li>Describe el problema y, si puedes, adjunta captura o pasos para reproducirlo.</li>
                    <li>Revisaremos el caso y te responderemos con la solución propuesta.</li>
                </ol>
            </section>

            <section className="mt-10">
                <h2>Medio de reembolso</h2>
                <p>
                    Si procede un reembolso total o parcial, se realizará por el
                    mismo medio de pago siempre que sea posible. En pagos
                    manuales por Bizum o transferencia, podremos pedir datos
                    mínimos necesarios para ejecutar la devolución de forma
                    segura.
                </p>
            </section>

            <section className="mt-12 p-6 rounded-2xl bg-onyx text-paper border border-border-dark flex flex-col gap-4">
                <h3 className="!text-xl !font-semibold !text-paper !mt-0 !mb-0">
                    ¿Necesitas ayuda con una entrega?
                </h3>
                <p className="!text-text-secondary">
                    Responde al email de entrega o escríbenos con el producto,
                    fecha y descripción del problema. Lo revisamos y te damos
                    solución.
                </p>
                <div className="flex flex-wrap gap-3">
                    <a
                        href="mailto:iaflashelite@gmail.com?subject=Garant%C3%ADa%20Flash"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-semibold text-onyx bg-flash hover:scale-[1.02] transition-all !no-underline"
                    >
                        Solicitar revisión
                    </a>
                    <Link
                        href="/productos"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-sm font-medium text-paper border border-border-dark hover:border-flash/40 transition-all !no-underline"
                    >
                        Ver productos
                    </Link>
                </div>
            </section>
        </>
    );
}
