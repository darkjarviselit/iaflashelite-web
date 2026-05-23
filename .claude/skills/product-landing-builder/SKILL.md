---
name: product-landing-builder
description: Crear o refinar landings comerciales (productos, agentes IA, servicios, secciones) en iaflashelite-web. Exige checklist comercial completo, copy honesto sin humo, alcance acotado y prohíbe tocar pagos/legal/constants/email/endpoints sin auditoría previa.
---

# product-landing-builder

## Propósito
Crear o refinar landings comerciales de IAFlashElite (productos descargables, servicios, agentes IA, soluciones por vertical, páginas comerciales nuevas) con disciplina de scope y copy honesto.

## Cuándo usarla
- Crear una landing nueva para un producto/servicio/agente.
- Refinar una existente (sección hero, beneficios, FAQ, CTA).
- Añadir una vertical nueva en `/soluciones/[slug]`.
- Crear secciones comerciales en páginas existentes.

NO es para: cambios de copy legal, modificaciones de precios, integración de pagos, cambios al schema de productos.

## Reglas inviolables
- **PROHIBIDO** tocar `src/lib/constants.ts` (catálogo y precios — fuente de verdad).
- **PROHIBIDO** tocar `src/lib/solutions.ts` sin permiso explícito en este turno.
- **PROHIBIDO** tocar `src/lib/email.ts` (entregas pagadas).
- **PROHIBIDO** tocar `src/app/api/*` (endpoints) sin `audit-only` previo.
- **PROHIBIDO** tocar `src/app/legal/*` (legalmente exigible).
- **PROHIBIDO** instalar dependencias.
- **PROHIBIDO** `git add`, commit, push, deploy.
- **PROHIBIDO** copy que prometa lo que no existe ("casos reales", "100% garantizado", "el mejor", "líderes del mercado", "miles de clientes").

## Checklist obligatorio antes de tocar código

Declara y confirma:

```
## Problema del cliente
- Una frase concreta. Qué dolor real resuelve esta landing.

## Cliente ideal
- Vertical / tamaño / rol. Quién se ve reflejado.

## Promesa segura
- Lo que SÍ podemos cumplir hoy.

## Promesas prohibidas
- Lista explícita de frases que NO usaremos (humo, exageraciones, certificaciones que no tenemos, garantías legales que requerirían cambio en /legal).

## Beneficios (3-5 máximo)
- Concretos y medibles cuando sea posible.

## Funcionamiento (cómo)
- Pasos reales del producto/servicio.

## CTA principal
- Texto exacto + destino (URL relativa interna).

## Precio (si aplica)
- Importe + recordatorio: NO se hardcodea aquí; debe leer de PRODUCTS si es producto.

## Demo / caso / prueba (si existe)
- Si NO existe, indicar "sin demo aún" y NO inventar.

## FAQ (3-6 preguntas reales)
- Coherentes con el FAQ de /constants.ts (no contradecir).

## Riesgos del cambio
- Qué podría romperse en otras páginas, en SEO, o en discurso comercial.

## Archivos permitidos
- Solo rutas concretas.

## Validaciones
- typecheck, biome, build, smoke local descrito.

## CANDADO_RESULTADO esperado
- PASS si checklist completo + validaciones verdes + scope respetado.
```

## Patrones del repo
- Server components por defecto. Solo `"use client"` si hay interactividad real.
- Estilo: Tailwind v4 + shadcn `base-nova`. Variantes `Button` (`primary`, `secondary`, `ghost`, `gradient`).
- Iconos: `lucide-react`.
- Animación sutil: `framer-motion` solo donde aporta.
- Copy en español. Sin spanglish innecesario.

## Salida obligatoria

```
## Cambios realizados
- ruta — qué + por qué (1 línea)

## Validaciones
- typecheck / lint / build / git diff --check / smoke

## Checklist comercial cumplido
- [✓/✗] cada punto

## Scope creep
- Ninguno / Detalle

CANDADO_RESULTADO: PASS | FAIL
```

## Cierre
Si PASS → recomendar `review-diff` → `ship-candado`. Nunca commitear en esta skill.
