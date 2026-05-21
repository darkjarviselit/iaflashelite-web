export const BRAND = {
    name: "IA Flash Elite",
    tagline: "IA aplicada. Resultados en 48h.",
    description:
        "Automatizamos lo que te roba tiempo. Bots, chatbots y scripts con IA, entregados en 48h.",
    email: "hola@iaflashelite.com",
    domain: "iaflashelite.com",
} as const;

export type ProductStatus = "available" | "coming_soon";

export type Audience = "pymes" | "particulares" | "desarrolladores";

export type ProductType = "download" | "service";

export type Subcategory =
    | "seguridad-web"
    | "privacidad-personal"
    | "backup-recuperacion"
    | "automatizacion"
    | "auditoria"
    | "diseno-landing";

export interface Product {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    price: number;
    status: ProductStatus;
    category: "seguridad" | "automatizacion" | "ia" | "diseno-web";
    audience: Audience[];
    subcategory: Subcategory;
    icon: string;
    estimated_install_minutes: number;
    includes: string[];
    guarantee_days: number;
    support_days: number;
    // Service-specific fields (optional, default to download semantics)
    type?: ProductType;
    delivery_time?: string;
    revisions?: number;
    what_you_get?: string[];
    not_technical_friendly?: boolean;
    recommended_tools?: string[];
    // Audio de presentación opcional (URL Vercel Blob, resuelta desde env).
    audioUrl?: string;
}

export const PRODUCTS: Product[] = [
    {
        slug: "generador-contrasenas-basico",
        name: "Generador de Contraseñas Básico",
        tagline: "Genera contraseñas seguras en local. Sin nube, sin trackers.",
        description:
            "Producto descargable con CLI Python y Web GUI HTML local. Genera contraseñas aleatorias, pronunciables, frases o PIN. Funciona sin internet. Tus datos nunca salen de tu equipo.",
        price: 9,
        status: "available",
        category: "seguridad",
        audience: ["particulares", "pymes"],
        subcategory: "privacidad-personal",
        icon: "key-round",
        estimated_install_minutes: 5,
        includes: [
            "Script Python CLI con argparse en español",
            "Web GUI HTML single-file (sin servidor)",
            "3 prompts Claude/Codex pre-hechos para personalizar",
            "Manuales de instalación y uso",
            "Soporte 30 días por email",
        ],
        guarantee_days: 7,
        support_days: 30,
        audioUrl: process.env.AUDIO_URL_PWGEN_BASICO,
    },
    {
        slug: "generador-contrasenas-pro",
        name: "Generador de Contraseñas Pro",
        tagline:
            "Vault local cifrado + auditor de filtraciones. Tus contraseñas, tu equipo.",
        description:
            "Versión Pro con vault SQLite cifrado AES-256, gestor completo, auditor de filtraciones (Have I Been Pwned), exportación a múltiples formatos. Sin servidor, sin nube.",
        price: 29,
        status: "coming_soon",
        category: "seguridad",
        audience: ["particulares", "pymes", "desarrolladores"],
        subcategory: "privacidad-personal",
        icon: "shield-check",
        estimated_install_minutes: 10,
        includes: ["Próximamente. Lanzamiento esta semana."],
        guarantee_days: 7,
        support_days: 30,
    },
    {
        slug: "auditor-web",
        name: "Auditor Web Rápido",
        tagline:
            "Escanea tu web en 5 minutos. Reporte PDF con prioridades y soluciones.",
        description:
            "Auditor descargable que analiza tu web (cabeceras HTTP, certificado SSL/TLS, cookies, formularios, exposición de información, rendimiento) y genera un PDF profesional con score A-F, prioridades y configuración exacta de los fixes según tu stack. Funciona en local; tus datos nunca salen de tu equipo.",
        price: 39,
        status: "available",
        category: "seguridad",
        audience: ["pymes", "desarrolladores"],
        subcategory: "auditoria",
        icon: "scan-search",
        estimated_install_minutes: 10,
        includes: [
            "Script Python CLI con 6 scanners (headers, SSL/TLS, cookies, forms, exposure, performance)",
            "Generador de PDF profesional con score A-F",
            "Web GUI HTML single-file para visualizar reportes",
            "4 manuales (instalación, completo, interpretar PDF, ejemplos)",
            "4 prompts Claude/Codex pre-hechos para personalización",
            "PDF demo IANA incluido en el ZIP",
            "Soporte 30 días por email",
        ],
        guarantee_days: 7,
        support_days: 30,
        audioUrl: process.env.AUDIO_URL_AUDITOR_WEB,
    },
    {
        slug: "anti-phishing",
        name: "Analizador Anti-Phishing de Emails",
        tagline:
            "Pega un email sospechoso. Análisis completo en 30 segundos. 100% offline.",
        description:
            "Analiza emails sospechosos con 6 motores ponderados: headers (SPF/DKIM/DMARC), análisis del remitente (display-name spoofing), URLs incluidos en el email (typosquat, anchor mismatch, IP literal), contenido (palabras clave de urgencia, premios, peticiones sensibles), attachments (extensiones peligrosas, doble extensión, macros) y reputación del dominio. 100% offline tras descarga. Acepta archivos .eml o texto pegado. Devuelve LEGÍTIMO/SOSPECHOSO/PHISHING con top red flags y recomendaciones específicas.",
        price: 29,
        status: "available",
        category: "seguridad",
        audience: ["pymes", "particulares"],
        subcategory: "seguridad-web",
        icon: "mail-warning",
        estimated_install_minutes: 10,
        includes: [
            "Análisis 100% local (cero telemetría)",
            "Soporta archivos .eml y texto pegado vía editor",
            "Verificación SPF/DKIM/DMARC automática",
            "Detección de display-name spoofing (PayPal/Amazon/banca ES)",
            "Análisis profundo de URLs incluidos (typosquat, anchor mismatch)",
            "Detección de extensiones peligrosas y doble extensión (factura.pdf.exe)",
            "Detección de macros habilitadas en Office",
            "Keywords de urgencia/premio/datos sensibles configurables",
            "Reportes PDF con top 5 red flags + recomendaciones",
            "CLI + GUI HTML single-file",
            "57 tests unittest pasando",
            "3 samples .eml educativos incluidos",
        ],
        guarantee_days: 7,
        support_days: 30,
        audioUrl: process.env.AUDIO_URL_ANTI_PHISHING,
    },
    {
        slug: "verificador-urls",
        name: "Verificador URLs Sospechosas",
        tagline:
            "Pega un link, te decimos si es seguro antes de clicar. 100% offline.",
        description:
            "Analiza URLs sospechosas con 6 motores integrados: análisis de dominio, SSL, redirecciones, typosquatting, heurísticas estáticas y blacklists públicas opcionales. Detecta IPs literales, dominios joven, certificados inválidos, redirects cruzados y homógrafos Unicode. 100% offline por defecto. Cero telemetría hacia iaflashelite. Reportes PDF con score 0-100 y veredicto SEGURO/SOSPECHOSO/PELIGROSO.",
        price: 19,
        status: "available",
        category: "seguridad",
        audience: ["particulares", "pymes", "desarrolladores"],
        subcategory: "seguridad-web",
        icon: "link-2",
        estimated_install_minutes: 5,
        includes: [
            "Análisis 100% local (cero telemetría)",
            "6 motores: heurísticas, typosquat, dominio, SSL, redirects, blacklists",
            "Detección de typosquatting (amaz0n.com vs amazon.com)",
            "Verificación de certificado SSL/TLS",
            "Cadena de redirecciones HTTP",
            "Heurísticas: IP literal, @ en URL, TLDs sospechosos, homógrafos Unicode",
            "Blacklists públicas opt-in (URLhaus de abuse.ch)",
            "Reportes PDF profesionales con reportlab",
            "CLI con --format human/json/pdf",
            "GUI HTML single-file (procesa JSON local en navegador)",
            "50 tests unittest pasando",
            "VERIFICAR-ANTES-DE-INSTALAR.md incluido",
        ],
        guarantee_days: 7,
        support_days: 30,
        audioUrl: process.env.AUDIO_URL_VERIFICADOR_URLS,
    },
    {
        slug: "backup-cifrado",
        name: "Backup Automático Cifrado",
        tagline:
            "Copia de seguridad cifrada AES-256 diaria y automática. Sin suscripción.",
        description:
            "Tu Mac hace una copia cifrada de tus carpetas cada día, sola. Doble clic para configurar, doble clic para restaurar. Sin terminal, sin nube propia. Compatible con USB, disco externo o carpetas de Dropbox/Drive ya sincronizadas. Solo macOS. Windows próximamente.",
        price: 49,
        status: "available",
        category: "seguridad",
        audience: ["pymes", "particulares"],
        subcategory: "backup-recuperacion",
        icon: "database-backup",
        estimated_install_minutes: 5,
        includes: [
            "App macOS (.app) con doble clic — sin terminal",
            "Asistente de configuración de 3 pasos",
            "Cifrado AES-256 estándar (pyzipper, compatible con 7-Zip/Keka)",
            "Backup automático diario a la hora que elijas",
            "Catch-up si el Mac estuvo apagado >20h",
            "Rotación: conserva los 10 backups más recientes",
            "Restauración con doble clic + contraseña",
            "Avisos por email (Gmail App Password) o notificación nativa",
            "100% local — cero telemetría",
            "Código fuente Python + 21 tests incluidos",
        ],
        guarantee_days: 7,
        support_days: 30,
        audioUrl: process.env.AUDIO_URL_BACKUP_CIFRADO,
    },
    {
        slug: "landing-page-basica",
        name: "Landing Page Básica",
        tagline:
            "Tu landing page profesional lista en 48h. Diseño moderno estilo Make.com adaptado a tu negocio.",
        description:
            "Landing page de alta conversión hecha a medida para tu negocio. Estilo profesional moderno (referencia: make.com, vercel.com, linear.app). Entregada en 48h con manual de instalación y prompts para Claude/Codex que te permiten desplegarla sin saber programar.",
        price: 149,
        status: "available",
        category: "diseno-web",
        audience: ["pymes", "particulares"],
        subcategory: "diseno-landing",
        icon: "monitor-smartphone",
        estimated_install_minutes: 30,
        includes: [
            "Diseño profesional moderno (estilo Make.com)",
            "1 hero impactante + 3 secciones de contenido",
            "Tema oscuro o claro (tú eliges)",
            "1 idioma (español o inglés)",
            "Responsive móvil + tablet + ordenador",
            "Optimizada para velocidad y SEO básico",
            "Formulario de contacto funcional",
            "1 revisión incluida",
            "Manual PDF de instalación paso a paso",
            "Prompts pre-hechos para Claude/Codex (despliegue rápido)",
            "Audio explicativo descargable",
            "Soporte por email 30 días",
            "Garantía 7 días devolución sin preguntas",
        ],
        guarantee_days: 7,
        support_days: 30,
        type: "service",
        delivery_time: "48 horas",
        revisions: 1,
        what_you_get: [
            "ZIP con código completo (HTML/CSS/JS)",
            "Manual PDF instalación (15 páginas)",
            "Prompts Claude/Codex para despliegue",
            "Audio explicativo (15-20 min)",
            "Soporte email 30 días",
        ],
        not_technical_friendly: true,
        recommended_tools: [
            "Claude Pro (20€/mes)",
            "Codex CLI (gratis)",
            "ChatGPT Plus (20€/mes)",
        ],
    },
    {
        slug: "landing-page-pro",
        name: "Landing Page Pro",
        tagline:
            "Landing page premium estilo Make.com. Tema híbrido, animaciones, 2 idiomas, 2 revisiones.",
        description:
            "Landing page premium con todas las funcionalidades de la Básica más: tema híbrido claro/oscuro alternado por secciones (estilo make.com), 6 secciones de contenido, 2 idiomas configurables, animaciones sutiles con framer-motion, formulario de contacto con validación, y 2 revisiones incluidas. Ideal para PYMES que quieren un nivel verdaderamente profesional.",
        price: 249,
        status: "available",
        category: "diseno-web",
        audience: ["pymes", "desarrolladores"],
        subcategory: "diseno-landing",
        icon: "sparkles",
        estimated_install_minutes: 30,
        includes: [
            "Todo lo de Landing Básica más:",
            "6 secciones de contenido (vs 3)",
            "Tema híbrido claro/oscuro por secciones (estilo Make.com)",
            "2 idiomas configurables (español + inglés u otros)",
            "Animaciones sutiles con framer-motion",
            "Formulario contacto con validación",
            "2 revisiones incluidas",
            "Audio NotebookLM extendido (30+ min)",
            "Video-guía paso a paso de configuración",
            "Plantillas de prompts adicionales por sector",
            "Soporte preferente por email 30 días",
        ],
        guarantee_days: 7,
        support_days: 30,
        type: "service",
        delivery_time: "48 horas",
        revisions: 2,
        what_you_get: [
            "Todo lo de la Básica más:",
            "Versión multiidioma del código",
            "Audio NotebookLM extendido",
            "Video-guía de configuración",
            "Plantillas extra de prompts por sector",
            "Soporte preferente 30 días",
        ],
        not_technical_friendly: true,
        recommended_tools: [
            "Claude Pro (20€/mes)",
            "Codex CLI (gratis)",
            "ChatGPT Plus (20€/mes)",
        ],
    },
];

export const AUDIENCES: ReadonlyArray<{
    id: Audience;
    label: string;
    short: string;
    description: string;
    icon: string;
    color: "blue" | "green" | "purple";
}> = [
    {
        id: "pymes",
        label: "Para PYMES",
        short: "PYMES",
        description:
            "Herramientas para pequeñas y medianas empresas que necesitan seguridad sin contratar consultores caros.",
        icon: "building-2",
        color: "blue",
    },
    {
        id: "particulares",
        label: "Para Particulares",
        short: "Personal",
        description:
            "Protege tu vida digital. Para ti, tu familia y tus dispositivos personales.",
        icon: "user",
        color: "green",
    },
    {
        id: "desarrolladores",
        label: "Para Desarrolladores",
        short: "Devs",
        description:
            "Herramientas técnicas para devs, MSPs y consultores que necesitan auditoría rápida o automatizar tareas.",
        icon: "code-2",
        color: "purple",
    },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
    // Top-level categories (Product.category)
    seguridad: "Seguridad",
    automatizacion: "Automatización",
    ia: "IA",
    "diseno-web": "Diseño web",
    // Subcategories (Product.subcategory) — kept in same map for convenience
    "seguridad-web": "Seguridad web",
    "privacidad-personal": "Privacidad personal",
    "backup-recuperacion": "Backup y recuperación",
    auditoria: "Auditoría y compliance",
    "diseno-landing": "Diseño de landings",
};

export const SUBCATEGORIES: ReadonlyArray<{
    id: Subcategory;
    label: string;
    icon: string;
}> = [
    { id: "seguridad-web", label: "Seguridad web", icon: "shield" },
    { id: "privacidad-personal", label: "Privacidad personal", icon: "lock" },
    { id: "backup-recuperacion", label: "Backup y recuperación", icon: "database" },
    { id: "automatizacion", label: "Automatización", icon: "zap" },
    { id: "auditoria", label: "Auditoría y compliance", icon: "search-check" },
    { id: "diseno-landing", label: "Diseño de landings", icon: "monitor-smartphone" },
] as const;

export const BRAND_VALUES = [
    {
        icon: "shield",
        title: "Privacidad",
        description: "Tus datos son tuyos. Nada más.",
    },
    {
        icon: "gem",
        title: "Transparencia",
        description: "Sabes qué pagas y qué recibes. Siempre.",
    },
    {
        icon: "handshake",
        title: "Confianza",
        description: "Garantías reales, no letra pequeña.",
    },
    {
        icon: "zap",
        title: "Valor",
        description: "Solo creamos para ayudar, no para extraer.",
    },
] as const;

export const SERVICES = [
    {
        id: "telegram-bot",
        number: "01",
        title: "Bot de Telegram / WhatsApp",
        pitch: "Atiende a tus clientes 24/7 con un bot que responde como tú",
        description:
            "Automatiza respuestas, gestiona pedidos y cualifica leads sin intervención humana. Tu negocio activo las 24 horas.",
        features: [
            "Respuestas automáticas",
            "Integración con tu CRM",
            "Notificaciones en tiempo real",
            "Panel de control",
        ],
        priceFrom: 150,
        priceTo: 400,
        deliveryDays: 48,
        icon: "MessageCircle",
    },
    {
        id: "automation",
        number: "02",
        title: "Automatización de tareas",
        pitch: "Convierte tareas repetitivas en procesos automáticos",
        description:
            "Elimina el trabajo manual que te roba horas. Conectamos tus herramientas y hacemos que todo fluya solo.",
        features: [
            "Análisis de flujos de trabajo",
            "Integración entre plataformas",
            "Sistemas internos escalables",
            "Automatización de operaciones",
        ],
        priceFrom: 200,
        priceTo: 600,
        deliveryDays: 48,
        icon: "Workflow",
    },
    {
        id: "web-chatbot",
        number: "03",
        title: "Chatbot IA para tu web",
        pitch: "Un asistente inteligente que cualifica leads mientras duermes",
        description:
            "Convierte visitantes en clientes con un chatbot que entiende, responde y cierra conversaciones de forma natural.",
        features: [
            "Cualificación automática de leads",
            "Integración con tu web",
            "Entrenado con tu contenido",
            "Análisis de conversaciones",
        ],
        priceFrom: 300,
        priceTo: 800,
        deliveryDays: 48,
        icon: "Bot",
    },
    {
        id: "custom-scripts",
        number: "04",
        title: "Scripts personalizados",
        pitch: "Soluciones a medida para problemas específicos",
        description:
            "Cuando ninguna herramienta hace exactamente lo que necesitas, nosotros lo construimos desde cero.",
        features: [
            "Solución a medida",
            "Código limpio y mantenible",
            "Documentación incluida",
            "Soporte post-entrega",
        ],
        priceFrom: 100,
        priceTo: 300,
        deliveryDays: 48,
        icon: "Code2",
    },
] as const;

export const NAV = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Casos", href: "/casos" },
    { label: "FAQ", href: "#faq" },
] as const;

export const PROCESS_STEPS = [
    {
        number: "01",
        title: "Cuéntanos tu problema",
        description: "Analizamos tu flujo de trabajo, herramientas y cuellos de botella.",
    },
    {
        number: "02",
        title: "Diseñamos la solución",
        description:
            "Implementamos la automatización adaptada a tu negocio en menos de 48h.",
    },
    {
        number: "03",
        title: "Entregamos y mejoramos",
        description:
            "Refinamos, mejoramos y escalamos a medida que tu negocio crece.",
    },
] as const;

export const FAQS = [
    // GENERALES
    {
        q: "¿Quién está detrás de iaflashelite?",
        a: "Un equipo de profesionales especializados en IA y ciberseguridad, con formación de universidades públicas españolas (UPC FIB + UPF). Sin oficina física, sin inversores. Más info en /sobre.",
    },
    {
        q: "¿Por qué los precios son tan bajos?",
        a: "Sin oficina, sin inversores, sin equipo de marketing. Lo que ahorro en estructura te lo descuento en el precio. Más info en la sección 'Por qué tan barato' de la home.",
    },
    {
        q: "¿Es una empresa real o un experimento?",
        a: "Equipo profesional registrado en España. Nuestros datos legales completos están en /legal/aviso-legal. RGPD compliant.",
    },
    {
        q: "¿Cómo sé que recibiré el producto?",
        a: "Productos digitales: pagas directamente con PayPal o tarjeta y recibes el producto por email en menos de 1 hora. Si prefieres Bizum o transferencia, te enviamos las instrucciones en menos de 12h. Servicios: confirmamos plazo primero, luego pagas. Garantía técnica: fallo no resuelto en 48h = devolución 100%. Detalle en /legal/garantias.",
    },
    {
        q: "¿Y si el equipo desaparece después de pagar?",
        a: "Las garantías están publicadas y son legalmente exigibles según legislación española. PayPal y Bizum tienen sus propios mecanismos de devolución de pago. El equipo lleva activo desde 2024.",
    },
    // PRODUCTOS Y SERVICIOS
    {
        q: "¿Hay garantía de devolución?",
        a: "Sí, con matices importantes. Productos digitales: garantía técnica de funcionamiento. Si hay un fallo no resuelto en 48h, devolución del 100%. NO aplica si simplemente cambias de opinión (contenido digital ejecutado, Directiva EU 2011/83/UE). Servicios: devolución total si no cumplimos el plazo acordado. Ver /legal/garantias para todos los detalles.",
    },
    {
        q: "¿Puedo pedir devolución si no me gusta el producto descargable?",
        a: "Para productos digitales descargables, no. Al aceptar la descarga confirmas que entiendes que pierdes el derecho de desistimiento de 14 días. Lo hacemos así porque el producto queda en tu poder tras la descarga — igual que Steam, Gumroad u otras plataformas digitales. Lo que sí garantizamos: que funciona. Si no funciona, devolución en 48h.",
    },
    {
        q: "¿Necesito ser técnico para usar los productos?",
        a: "No. Cada producto incluye manual PDF + prompts pre-hechos para Claude/Codex/ChatGPT que te permiten configurarlo en 30 minutos.",
    },
    {
        q: "¿Qué pasa si tarda más del plazo prometido?",
        a: "Te aviso ANTES si veo que no llego. Si fallé al plazo CONFIRMADO contigo: devolución 100%.",
    },
    {
        q: "¿Hay límite de pedidos al mes?",
        a: "Sí. Máximo 6 servicios normales + 2 express al mes para garantizar calidad. La disponibilidad real es visible en /servicios.",
    },
    {
        q: "¿Qué es el modo Express?",
        a: "+29€ (básica) o +49€ (pro) para entrega en 24h en lugar de 48h y prioridad máxima sobre otros pedidos. Solo 2 huecos express/mes.",
    },
    // PAGOS
    {
        q: "¿Qué métodos de pago aceptáis?",
        a: "Productos digitales: PayPal directo o tarjeta (cobro inmediato), Bizum o transferencia (manual <12h por email). Servicios: Bizum, PayPal o transferencia tras confirmar el encargo.",
    },
    {
        q: "¿Cuándo cobráis?",
        a: "Productos digitales con PayPal directo: al pulsar 'Pagar' (entrega del producto en <1h). Productos digitales con Bizum/transferencia: tras enviarte las instrucciones de pago. Servicios: tras confirmar el encargo por email. Nunca cobramos antes de confirmar que podemos entregar.",
    },
    {
        q: "¿Emitís factura?",
        a: "Si necesitas factura con IVA, indícalo en los comentarios. Te explico mi situación actual (persona física, sin alta autónomo) para que decidas si te encaja.",
    },
    // PRIVACIDAD
    {
        q: "¿Qué hacéis con mis datos?",
        a: "Lo mínimo legal para procesar tu pedido (nombre, email). Cero tracking, cero perfiles, cero venta de datos. Detalle completo en /legal/privacidad.",
    },
    // VERIFICACIÓN DE CÓDIGO
    {
        q: "¿Cómo sé que vuestro código no es malicioso?",
        a: "Cada producto incluye un archivo VERIFICAR-ANTES-DE-INSTALAR.md con un prompt para que verifiques el código con Claude o ChatGPT en 2 minutos. Detalles en /como-verificar.",
    },
    {
        q: "¿Y si la IA dice que vuestro código es sospechoso?",
        a: "Avísanos. Te devolvemos 100% del dinero sin preguntas y investigamos. Puede ser falso positivo (común en herramientas de seguridad) o error real que corregimos.",
    },
    {
        q: "¿Por qué invitáis a verificaros con una IA?",
        a: "Porque es lo correcto. La desconfianza al instalar software es comprensible en 2026. Preferimos enseñarte a auditar antes que pedirte confianza ciega.",
    },
    // SEGURIDAD + ACADEMIA
    {
        q: "¿Por qué la seguridad es vuestro eje central?",
        a: "Porque en 2026 nadie te enseña a protegerte. Vendemos IA pero también enseñamos a usarla sin riesgos. Es lo correcto.",
    },
    {
        q: "¿Qué incluye exactamente el material gratis con cada compra?",
        a: "Depende del producto. Productos 9-19€: mini guía (1 audio + PDF corto). Productos 29-39€: curso básico (3 audios + PDF). Productos 49€+: curso intermedio (5 audios + 2 PDFs). Servicios 149€+ incluyen todo lo anterior + plantilla. Servicios 249€ además 30 min consulta 1-a-1.",
    },
    {
        q: "¿Por qué no anunciáis valores de los cursos (ej. «curso valorado en 90€»)?",
        a: "Porque odiamos inflar precios percibidos. Sería tratarte de tonto. El material va incluido honestamente. Si te aporta utilidad, perfecto. Si no, devuelves el producto en 7 días sin preguntas.",
    },
    {
        q: "¿Cuándo estarán disponibles los cursos?",
        a: "Los estamos produciendo con NotebookLM. Empezamos por la mini guía y avanzamos progresivamente. Si compras antes de que estén listos, recibes acceso automático cuando se publiquen. Te avisamos por email.",
    },
    {
        q: "¿Sois expertos certificados en ciberseguridad?",
        a: "No, no somos expertos certificados de élite. Somos un equipo de profesionales en formación continua (UPC FIB + UPF) que conocen los peligros y los explican claros. Si tu caso necesita un pentester certificado, te lo decimos y te derivamos.",
    },
] as const;

export const STATS = [
    { value: "100%", label: "Bootstrapped sin inversores" },
    { value: "0", label: "Trackers en la web" },
    { value: "<12h", label: "Tiempo medio de respuesta" },
    { value: "7 días", label: "Garantía devolución" },
    { value: "30 días", label: "Soporte incluido" },
    { value: "2", label: "Universidades top (UPC + UPF)" },
] as const;

export const STATS_UPDATED_AT = "Mayo 2026";

export interface SlotsConfig {
    normal_per_month: number;
    express_per_month: number;
    current_month: string;
    normal_available: number;
    express_available: number;
    next_slot_date: string;
    working_days_note?: string;
}

// Editado manualmente por el equipo al confirmar pedidos.
// Capacidad real: 4 horas L-J (revisión + comunicación) + 12 horas V-S
// (entregas intensivas). De ahí los 4 normales + 1 express por mes.
export const SLOTS_CONFIG: SlotsConfig = {
    normal_per_month: 4,
    express_per_month: 1,
    current_month: "Mayo 2026",
    normal_available: 4,
    express_available: 1,
    next_slot_date: "Viernes próximo",
    working_days_note:
        "Trabajamos pedidos en jornadas intensivas viernes y sábado. Pedidos recibidos lunes-jueves entran en cola del viernes siguiente.",
};

export const EXPRESS_SURCHARGE: Record<string, number> = {
    "landing-page-basica": 29,
    "landing-page-pro": 49,
};

export const COMPETITORS: ReadonlyArray<{
    category: string;
    ours: { product: string; price: string };
    competitors: ReadonlyArray<{ name: string; price: string; note: string }>;
}> = [
    {
        category: "Auditor web / Pentest básico",
        ours: { product: "Auditor Web Rápido", price: "39€ pago único" },
        competitors: [
            { name: "Agencia auditoría", price: "800 – 2.500€", note: "1 informe puntual" },
            { name: "SaaS escáner web", price: "29 – 99€/mes", note: "suscripción perpetua" },
        ],
    },
    {
        category: "Gestor / generador de contraseñas",
        ours: { product: "Generador Contraseñas", price: "9 – 29€ pago único" },
        competitors: [
            { name: "1Password / Bitwarden Pro", price: "36 – 96€/año", note: "renueva siempre" },
            { name: "LastPass familias", price: "48€/año", note: "renueva siempre" },
        ],
    },
    {
        category: "Landing page profesional",
        ours: { product: "Landing Page Básica / Pro", price: "149 – 249€" },
        competitors: [
            { name: "Agencia web España", price: "1.500 – 4.500€", note: "+ mantenimiento" },
            { name: "Freelance medio", price: "600 – 1.500€", note: "+ revisiones extra" },
        ],
    },
    {
        category: "Soporte post-venta",
        ours: { product: "Incluido 30 días", price: "0€ extra" },
        competitors: [
            { name: "Agencias", price: "60 – 120€/hora", note: "tras entregar" },
            { name: "Mantenimiento mensual", price: "80 – 300€/mes", note: "obligatorio" },
        ],
    },
];

export const COMPARISON = [
    {
        feature: "Velocidad de entrega",
        flash: "48h",
        agencies: "4-8 semanas",
        inhouse: "2-6 meses",
    },
    {
        feature: "Precio",
        flash: "Desde 100€",
        agencies: "+3.000€",
        inhouse: "+4.500€/mes",
    },
    {
        feature: "Personalización",
        flash: "Total",
        agencies: "Limitada",
        inhouse: "Total",
    },
    {
        feature: "Soporte directo",
        flash: "Sí",
        agencies: "Account manager",
        inhouse: "Interno",
    },
    {
        feature: "Tecnología propia",
        flash: "Sí",
        agencies: "No-code/Zapier",
        inhouse: "Variable",
    },
] as const;
