---
name: ui-polish
description: Mejoras visuales acotadas en iaflashelite-web (diseño, responsive, spacing, CTAs, copy visual, claridad, confianza, estética premium). Solo presentación. Prohibido tocar lógica de negocio, endpoints, pagos, legal, envs o datos.
---

# ui-polish

## Propósito
Refinar la capa visual de páginas y componentes existentes para alcanzar estética premium tipo Vercel / Linear / Stripe / Make, sin tocar lógica de negocio.

## Cuándo usarla
- Pulir hero, espaciados, jerarquía visual.
- Mejorar contraste, foco, hover, transiciones.
- Ajustar responsive (breakpoints `sm`, `md`, `lg`).
- Refinar microcopy (botones, labels, mensajes de error/éxito).
- Aplicar efectos sutiles (dot-grid, gradientes, sombras) consistentes con el repo.

NO es para: cambiar precios, modificar productos, tocar endpoints, alterar legal, ajustar lógica de validación, integraciones nuevas.

## Reglas inviolables
- **PROHIBIDO** tocar `src/lib/constants.ts`, `src/lib/solutions.ts`, `src/lib/email.ts`.
- **PROHIBIDO** tocar `src/app/api/*`.
- **PROHIBIDO** tocar `src/app/legal/*`.
- **PROHIBIDO** cambiar lógica de submit, fetch, validación.
- **PROHIBIDO** instalar dependencias.
- **PROHIBIDO** introducir trackers/analytics/pixeles (`STATS` declara "0 trackers").
- **PROHIBIDO** `git add`, commit, push, deploy.

## Contrato obligatorio

```
## Objetivo visual
- Qué se ve hoy vs qué debe verse después. En una frase.

## Página(s) afectada(s)
- Rutas concretas.

## Componentes a tocar
- Lista cerrada.

## Lo que NO se toca
- Endpoints, lógica, props, tipos, datos, env.

## Validaciones
- typecheck, biome, build, smoke visual local (npm run dev + captura mental de la página).

## Criterios de éxito
- Mejora visual observable, sin regresión funcional.
```

## Patrones del repo
- Tailwind v4 + tokens existentes (`text-flash`, `bg-onyx`, `bg-paper`, `border-border-dark`, `text-text-secondary`).
- Fuentes y tamaños existentes — no introducir tipografías nuevas.
- Animación: `framer-motion` con `transition={{ duration: 0.2-0.3 }}`. Sin animaciones largas ni distractoras.
- Iconos: `lucide-react` con `size={14-20}`.
- Botones: `Button` de `@/components/ui/button` con variantes existentes.

## Riesgos
- Cambios visuales pueden romper layout en breakpoints no comprobados — verificar `sm`, `md`, `lg` en build.
- Refactor de utility classes puede romper hover/focus accidental.
- Tocar tipos `props` está fuera de scope — si hace falta, parar y subir a `safe-feature` con alcance ampliado.

## Salida obligatoria

```
## Cambios realizados
- archivo — qué cambia visualmente

## Validaciones
- typecheck, biome, build, diff --check

## Mejora visual confirmada
- Antes / después en 1 frase cada uno.

## Regresiones revisadas
- Responsive sm/md/lg
- Hover/focus/disabled
- Modo oscuro/claro si aplica
- Otros componentes que usan los mismos tokens

## Scope creep
- Ninguno / Detalle

CANDADO_RESULTADO: PASS | FAIL
```

## Cierre
Si PASS → `review-diff` → `ship-candado`. Nunca commitear desde aquí.
