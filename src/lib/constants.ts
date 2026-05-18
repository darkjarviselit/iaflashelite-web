export const BRAND = {
    name: "IA Flash Elite",
    tagline: "IA aplicada. Resultados en 48h.",
    description:
        "Automatizamos lo que te roba tiempo. Bots, chatbots y scripts con IA, entregados en 48h.",
    email: "hola@iaflashelite.com",
    domain: "iaflashelite.com",
} as const;

export type ProductStatus = "available" | "coming_soon";

export interface Product {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    price: number;
    status: ProductStatus;
    category: "seguridad" | "automatizacion" | "ia";
    includes: string[];
    guarantee_days: number;
    support_days: number;
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
        includes: [
            "Script Python CLI con argparse en español",
            "Web GUI HTML single-file (sin servidor)",
            "3 prompts Claude/Codex pre-hechos para personalizar",
            "Manuales de instalación y uso",
            "Soporte 30 días por email",
        ],
        guarantee_days: 7,
        support_days: 30,
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
    },
    {
        slug: "backup-cifrado",
        name: "Backup Automático Cifrado",
        tagline:
            "Tu BD y archivos cifrados a Drive/Dropbox/S3. Sin perder datos jamás.",
        description:
            "Script de backup automático cifrado AES-256. Compatible con bases de datos MySQL/PostgreSQL/SQLite y carpetas de archivos. Subida programada a tu Drive, Dropbox o S3.",
        price: 49,
        status: "coming_soon",
        category: "seguridad",
        includes: ["Próximamente."],
        guarantee_days: 7,
        support_days: 30,
    },
];

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
    {
        q: "¿Qué hace exactamente IA Flash Elite?",
        a: "Construimos bots, chatbots y automatizaciones con IA para negocios que quieren eliminar el trabajo manual y atender clientes sin parar.",
    },
    {
        q: "¿De verdad en 48 horas?",
        a: "Sí. Para la mayoría de proyectos entregamos una versión funcional en 48h. Proyectos más complejos pueden llevar más, pero siempre con plazos claros desde el principio.",
    },
    {
        q: "¿Qué necesito tener yo para empezar?",
        a: "Solo contarnos tu problema. Nosotros nos encargamos del resto: análisis, desarrollo, entrega y soporte.",
    },
    {
        q: "¿Hacéis mantenimiento después de entregar?",
        a: "Sí. Ofrecemos soporte post-entrega en todos los proyectos y planes de mantenimiento para quienes lo necesiten.",
    },
    {
        q: "¿Cuánto cuesta?",
        a: "Desde 100€ para scripts simples hasta 800€ para chatbots IA completos. Bots y automatizaciones se sitúan en el rango intermedio (150-600€). Cada proyecto tiene su presupuesto personalizado según el alcance — cuéntanos qué necesitas.",
    },
] as const;

export const STATS = [
    { value: "48h", label: "Tiempo máximo de entrega" },
    { value: "4", label: "Servicios especializados" },
    { value: "1:1", label: "Comunicación directa, sin account managers" },
    { value: "Código", label: "A medida, no plantillas no-code" },
] as const;

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
