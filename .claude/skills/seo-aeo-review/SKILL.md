---
name: seo-aeo-review
description: Revisión SEO/AEO read-only de iaflashelite-web (titles, metadata, headings, sitemap, robots, contenido indexable, enlaces internos, schema, preparación para Google + ChatGPT Search + Perplexity + motores IA). Solo diagnóstico; cualquier cambio requiere safe-feature posterior aprobado por Oscar.
---

# seo-aeo-review

## Propósito
Auditar la salud SEO clásica y AEO (Answer Engine Optimization para Google AI Overviews, ChatGPT Search, Perplexity, Claude.ai, Gemini) de las páginas de iaflashelite-web. **Estrictamente read-only** salvo que Oscar apruebe pasar a `safe-feature`.

## Reglas
- **PROHIBIDO** modificar archivos. Solo lectura.
- **PROHIBIDO** commit, push, deploy.
- **PERMITIDO**: `Read`, `git status`, `git log`, `grep`, `find`, `curl` HEAD/GET a URLs públicas, ejecutar `npm run build` para inspeccionar route table.

## Procedimiento
1. **Inventario**: listar páginas indexables (estáticas + SSG). Cruzar con `src/app/sitemap.ts`.
2. **Por página, revisar**:
   - `<title>` (60-65 caracteres ideales, único, descriptivo, sin "—" duplicado).
   - `<meta name="description">` (140-160 caracteres, vendedora, sin keyword stuffing).
   - `<h1>` único por página, alineado con title.
   - Jerarquía `h1 → h2 → h3` sin saltos.
   - `<link rel="canonical">` si aplica.
   - Open Graph + Twitter Card (`opengraph-image.tsx` ya define una global).
   - `lang="es"` en el `<html>`.
3. **Sitemap**: confirmar que solo lista rutas públicas reales, que excluye `/api/*`, `/productos/[slug]/comprar`, zonas privadas (`/gestoria` si aplica).
4. **Robots**: confirmar `Disallow` de rutas no indexables, que apunta al sitemap.
5. **Contenido indexable**: detectar texto crítico en client components (no se prerenderiza fácilmente), imágenes sin `alt`, listas sin estructura.
6. **Enlaces internos**: orfanas (sin enlaces de entrada), profundidad excesiva, anchor text genérico ("click aquí").
7. **Schema.org JSON-LD**: detectar si hay (Product, Service, FAQPage, Organization, BreadcrumbList). Si no hay, listar dónde aportaría.
8. **AEO específico**:
   - Respuestas directas a preguntas frecuentes en formato `<h2>pregunta</h2><p>respuesta concreta</p>`.
   - FAQs visibles en HTML sin requerir JS (server-rendered).
   - Estructura escaneable (listas, tablas, definiciones cortas).
   - Frases atómicas y citables (que un motor IA pueda copiar como respuesta).
   - Autoría / E-E-A-T: indicadores de quién está detrás (nombre, formación, ubicación — `/sobre`).
   - `llms.txt` si decidimos incluirlo más adelante (estándar emergente para guiar a LLMs sobre el sitio).
9. **Rendimiento básico** (afecta a ranking): tamaño del bundle, fuentes, imágenes sin optimizar (next/image vs `<img>`).

## Riesgos no resolver desde esta skill
- Cambios en sitemap/robots → `safe-feature` aparte.
- Reescritura masiva de copy → `product-landing-builder` aparte.
- Cambios en metadata por página → `safe-feature` con scope explícito.

## Salida obligatoria

```
## Inventario de páginas auditadas
- ruta — title actual — h1 actual

## Hallazgos por nivel
- [ALTO] descripción + ruta + impacto
- [MEDIO] ...
- [BAJO] ...

## SEO clásico
- Titles, descriptions, headings, canonicals, OG.

## AEO (motores IA)
- FAQ estructurado server-side, datos citables, autoría visible.

## Sitemap / robots
- Coherencia con rutas reales y zonas privadas.

## Schema.org
- Presente / ausente / dónde aportaría.

## Recomendación priorizada
- 3-5 acciones, cada una clasificada con [scope-guardian]: BLOQUEANTE / RIESGO ALTO / BACKLOG / RUIDO.
- NO generar prompts de implementación salvo que Oscar lo pida.

CANDADO_RESULTADO: PASS | FAIL
```

## Cierre
Diagnóstico, no implementación. Próximo paso lo decide Oscar.
