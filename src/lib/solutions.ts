export type SolutionLevel = {
    name: string;
    price: string;
    features: string[];
};

export type Solution = {
    slug: string;
    name: string;
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
    problems: string[];
    problemsTitle?: string;
    features: string[];
    featuresIntro?: string;
    featuresTitle?: string;
    landingCta?: string;
    landingHref?: string;
    levels: {
        template: SolutionLevel;
        setup: SolutionLevel;
        managed: SolutionLevel;
    };
    pricingTitle?: string;
    ctaSector: string;
    icon: string;
    priceFrom: string;
    pain: string;
};

export const solutions: Solution[] = [
    {
        slug: "gestorias",
        name: "GestorIA Local",
        tagline: "Gestorías / Contables",
        icon: "FileText",
        priceFrom: "490€",
        pain: "Clientes, documentos, vencimientos y revisiones repartidos entre carpetas, email y hojas de cálculo.",
        heroTitle: "GestorIA Local — Copiloto privado para gestorías pequeñas",
        heroSubtitle:
            "Ordena clientes, documentos, vencimientos y revisiones en tu propio ordenador. Complementa tu software fiscal; no lo sustituye.",
        problems: [
            "Documentos pendientes dispersos entre email, carpetas y mensajes",
            "Vencimientos y revisiones que dependen de memoria o Excel",
            "Seguimiento de clientes sin una cola clara de próximos pasos",
            "Borradores y resúmenes que necesitan revisión antes de enviarse",
        ],
        problemsTitle: "Dónde reduce ruido operativo.",
        features: [
            "Fichas de clientes y checklists documentales",
            "Cola de revisión humana para documentos y propuestas",
            "Calendario y vencimientos operativos",
            "Borradores revisables y próximos pasos sugeridos",
            "Checklist de documentación por cliente",
        ],
        landingHref: "/gestoria-local",
        landingCta: "Ver GestorIA Local",
        featuresTitle: "Qué ayuda a ordenar GestorIA Local.",
        featuresIntro:
            "Producto directo con flujos y documentación pensados para complementar el trabajo de una gestoría pequeña.",
        pricingTitle: "Compra directa.",
        levels: {
            template: {
                name: "GestorIA Local",
                price: "490€",
                features: [
                    "Paquete instalable",
                    "Instaladores macOS/Linux y Windows",
                    "Guías de instalación y configuración",
                    "Asistencia opcional +59€",
                    "Garantía Flash",
                ],
            },
            setup: {
                name: "Alcance del producto",
                price: "incluido",
                features: [
                    "Fichas de clientes",
                    "Checklists documentales",
                    "Calendario y revisión humana",
                    "Proveedor IA configurable",
                    "Complemento del software fiscal",
                ],
            },
            managed: {
                name: "Servicio concreto",
                price: "bajo presupuesto",
                features: [
                    "Adaptaciones específicas",
                    "Configuración avanzada",
                    "Soporte adicional acordado",
                    "Alcance por escrito",
                    "Sin promesas fiscales oficiales",
                ],
            },
        },
        ctaSector: "tu gestoría",
    },
    {
        slug: "dentistas",
        name: "DentalGIRU",
        tagline: "Dentistas / Clínicas",
        icon: "Heart",
        priceFrom: "249€",
        pain: "No-shows, citas mal gestionadas y pacientes sin seguimiento.",
        heroTitle: "DentalGIRU — Agente IA para clínicas dentales",
        heroSubtitle:
            "Reduce no-shows, gestiona citas y responde pacientes automáticamente. Sin almacenar datos médicos sensibles.",
        problems: [
            "Pacientes que no confirman cita y no avisan",
            "FAQs de precios y tratamientos respondidas mil veces",
            "Seguimiento post-tratamiento que no se hace",
            "Agenda con huecos sin cubrir",
        ],
        features: [
            "Confirmación y recordatorios de citas",
            "Respuesta automática a FAQs de pacientes",
            "Presupuestos y seguimiento administrativo",
            "Reducción de no-shows",
            "Mensajes por WhatsApp/Telegram",
        ],
        levels: {
            template: {
                name: "Template",
                price: "249€",
                features: [
                    "Descarga y configura tú mismo",
                    "Guía de instalación incluida",
                    "Prompts para Claude/ChatGPT",
                    "Soporte 30 días",
                    "Garantía Flash",
                ],
            },
            setup: {
                name: "Setup asistido",
                price: "desde 690€",
                features: [
                    "Todo lo del Template",
                    "Nosotros lo configuramos",
                    "Adaptado a tu clínica",
                    "Integración con tu agenda",
                    "Formación incluida",
                    "Soporte 60 días",
                ],
            },
            managed: {
                name: "Managed",
                price: "99€/mes",
                features: [
                    "Todo lo del Setup",
                    "Mantenimiento mensual",
                    "Actualizaciones incluidas",
                    "Monitorización continua",
                    "Soporte prioritario",
                ],
            },
        },
        ctaSector: "tu clínica",
    },
    {
        slug: "inmobiliarias",
        name: "RealEstateGIRU",
        tagline: "Inmobiliarias",
        icon: "Building",
        priceFrom: "199€",
        pain: "Leads que no responden y fichas que tardan horas en preparar.",
        heroTitle: "RealEstateGIRU — Agente IA para inmobiliarias",
        heroSubtitle:
            "Cualifica leads, agenda visitas y genera fichas de propiedades en segundos. Más cierres, menos trabajo manual.",
        problems: [
            "Leads que preguntan y desaparecen sin respuesta",
            "Fichas de propiedades que tardan horas en preparar",
            "Visitas sin confirmar que se convierten en no-shows",
            "Seguimiento de clientes que se olvida",
        ],
        features: [
            "Cualificación automática de leads",
            "Respuesta inmediata a consultas",
            "Generación de fichas de propiedades",
            "Agenda de visitas automatizada",
            "Seguimiento de clientes activos",
        ],
        levels: {
            template: {
                name: "Template",
                price: "199€",
                features: [
                    "Descarga y configura tú mismo",
                    "Guía de instalación incluida",
                    "Prompts para Claude/ChatGPT",
                    "Soporte 30 días",
                    "Garantía Flash",
                ],
            },
            setup: {
                name: "Setup asistido",
                price: "desde 590€",
                features: [
                    "Todo lo del Template",
                    "Nosotros lo configuramos",
                    "Adaptado a tu inmobiliaria",
                    "Integración con tu CRM",
                    "Formación incluida",
                    "Soporte 60 días",
                ],
            },
            managed: {
                name: "Managed",
                price: "99€/mes",
                features: [
                    "Todo lo del Setup",
                    "Mantenimiento mensual",
                    "Actualizaciones incluidas",
                    "Monitorización continua",
                    "Soporte prioritario",
                ],
            },
        },
        ctaSector: "tu inmobiliaria",
    },
    {
        slug: "marketing",
        name: "MarketGIRU",
        tagline: "Marketing / Agencias",
        icon: "TrendingUp",
        priceFrom: "149€",
        pain: "Reportes manuales, briefs eternos y seguimiento de campañas a mano.",
        heroTitle: "MarketGIRU — Agente IA para agencias de marketing",
        heroSubtitle:
            "Automatiza reportes, genera briefs y da seguimiento a leads. Más tiempo para estrategia, menos para tareas manuales.",
        problems: [
            "Reportes manuales que consumen viernes enteros",
            "Briefs sin estructura que retrasan proyectos",
            "Leads que entran y no tienen seguimiento",
            "Ideas de contenido que se agotan cada semana",
        ],
        features: [
            "Calendario de contenido automatizado",
            "Generación de briefs estructurados",
            "Seguimiento de leads y pipeline",
            "Reporting de campañas",
            "Ideas de contenido por sector",
        ],
        levels: {
            template: {
                name: "Template",
                price: "149€",
                features: [
                    "Descarga y configura tú mismo",
                    "Guía de instalación incluida",
                    "Prompts para Claude/ChatGPT",
                    "Soporte 30 días",
                    "Garantía Flash",
                ],
            },
            setup: {
                name: "Setup asistido",
                price: "desde 590€",
                features: [
                    "Todo lo del Template",
                    "Nosotros lo configuramos",
                    "Adaptado a tu agencia",
                    "Integración con tus herramientas",
                    "Formación incluida",
                    "Soporte 60 días",
                ],
            },
            managed: {
                name: "Managed",
                price: "99€/mes",
                features: [
                    "Todo lo del Setup",
                    "Mantenimiento mensual",
                    "Actualizaciones incluidas",
                    "Monitorización continua",
                    "Soporte prioritario",
                ],
            },
        },
        ctaSector: "tu agencia",
    },
    {
        slug: "negocios-locales",
        name: "LocalGIRU",
        tagline: "Negocios locales",
        icon: "MapPin",
        priceFrom: "99€",
        pain: "Llamadas perdidas, reservas sin confirmar y preguntas repetidas todo el día.",
        heroTitle: "LocalGIRU — Agente IA para negocios locales",
        heroSubtitle:
            "Responde clientes 24/7, gestiona reservas y reduce llamadas perdidas. Para restaurantes, clínicas, talleres y más.",
        problems: [
            "Llamadas a horas de cierre que nadie coge",
            "Preguntas de precios y horarios respondidas todo el día",
            "Reservas perdidas por no confirmar a tiempo",
            "Clientes que preguntan por WhatsApp sin respuesta",
        ],
        features: [
            "Respuesta a FAQs 24/7",
            "Gestión de reservas automatizada",
            "Mensajes por WhatsApp y Telegram",
            "Horarios y precios siempre disponibles",
            "Seguimiento de clientes",
        ],
        levels: {
            template: {
                name: "Template",
                price: "99€",
                features: [
                    "Descarga y configura tú mismo",
                    "Guía de instalación incluida",
                    "Prompts para Claude/ChatGPT",
                    "Soporte 30 días",
                    "Garantía Flash",
                ],
            },
            setup: {
                name: "Setup asistido",
                price: "desde 490€",
                features: [
                    "Todo lo del Template",
                    "Nosotros lo configuramos",
                    "Adaptado a tu negocio",
                    "Integración con tu agenda",
                    "Formación incluida",
                    "Soporte 60 días",
                ],
            },
            managed: {
                name: "Managed",
                price: "79€/mes",
                features: [
                    "Todo lo del Setup",
                    "Mantenimiento mensual",
                    "Actualizaciones incluidas",
                    "Monitorización continua",
                    "Soporte prioritario",
                ],
            },
        },
        ctaSector: "tu negocio",
    },
];
