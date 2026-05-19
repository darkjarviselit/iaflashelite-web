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
        audience: ["pymes", "desarrolladores"],
        subcategory: "backup-recuperacion",
        icon: "database-backup",
        estimated_install_minutes: 15,
        includes: ["Próximamente."],
        guarantee_days: 7,
        support_days: 30,
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
        a: "Oscar P., ingeniero por UPC FIB. Sin equipo, sin oficina. Más info en /sobre.",
    },
    {
        q: "¿Por qué los precios son tan bajos?",
        a: "Sin oficina, sin inversores, sin equipo de marketing. Lo que ahorro en estructura te lo descuento en el precio. Más info en la sección 'Por qué tan barato' de la home.",
    },
    {
        q: "¿Es una empresa real o un experimento?",
        a: "Persona física registrada en España. Mis datos legales completos están en /legal/aviso-legal. RGPD compliant.",
    },
    {
        q: "¿Cómo sé que recibiré el producto?",
        a: "Pagas SOLO tras confirmación personal por email. Garantía 7 días devolución sin preguntas. Sin riesgo.",
    },
    {
        q: "¿Y si Oscar desaparece después de pagar?",
        a: "Las garantías están publicadas y son legalmente exigibles según legislación española. PayPal y Bizum tienen sus propios mecanismos de devolución de pago.",
    },
    // PRODUCTOS Y SERVICIOS
    {
        q: "¿Qué pasa si no me gusta el resultado?",
        a: "7 días desde la entrega para pedir devolución 100%. Sin justificaciones.",
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
        a: "Bizum, PayPal y transferencia bancaria. Recibirás los datos por email tras confirmar tu pedido.",
    },
    {
        q: "¿Por qué no aceptáis tarjeta automática (Stripe)?",
        a: "Stripe requiere alta de autónomo y comisiones del 2-3% que se trasladarían a tu precio. Cuando alcance el volumen suficiente, automatizaré. Hasta entonces, prefiero el trato personal.",
    },
    {
        q: "¿Cuándo cobráis?",
        a: "Tras confirmar tu pedido por email. NUNCA al instante de hacer clic en 'Comprar'.",
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
}

// Editado manualmente por Oscar al confirmar pedidos.
export const SLOTS_CONFIG: SlotsConfig = {
    normal_per_month: 6,
    express_per_month: 2,
    current_month: "Mayo 2026",
    normal_available: 6,
    express_available: 2,
    next_slot_date: "Lunes 19 de Mayo",
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
