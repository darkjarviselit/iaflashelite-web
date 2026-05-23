@AGENTS.md

# iaflashelite-web — Reglas del repo

Web comercial pública de **IAFlashElite** (`iaflashelite.com`). Capta leads, vende productos descargables (PayPal directo / Bizum / transferencia) y servicios (landings). Cualquier cambio aquí toca **pagos reales, datos de clientes o el discurso comercial** — actuar como producción, no como sandbox.

## Stack

- **Next.js 16.2.6** (App Router). Recordatorio: las APIs cambian respecto a tu training. Consultar `node_modules/next/dist/docs/` antes de tocar APIs del framework (ver `AGENTS.md`).
- **React 19.2.4** · **TypeScript 5 strict** · **Tailwind v4** (PostCSS) · **shadcn** estilo `base-nova` · **framer-motion** · **three / @react-three** (`/mundo-giruia`).
- **Biome 2.4** (tabs, doble comilla, `organizeImports: on`).
- **Pagos:** PayPal REST API (OAuth client-credentials server-side) + Bizum/transferencia manual.
- **Email:** nodemailer con Gmail App Password.
- **Almacenamiento ZIPs:** Vercel Blob público.
- **Hosting:** Vercel, region `cdg1`. **Push a `main` = deploy a producción**.
- **Forward de leads/pedidos:** servicio externo `giris-agent` vía `${GIRIS_AGENT_URL}`.

## Fuentes de verdad (single source of truth)

| Zona | Archivo | Regla |
|---|---|---|
| Catálogo, precios, FAQ, slots, surcharge | `src/lib/constants.ts` | Prohibido hardcodear precios fuera de aquí. El servidor cruza el precio contra `PRODUCTS` en cada pago. |
| Soluciones / verticales | `src/lib/solutions.ts` | Único origen de `/soluciones` y `/soluciones/[slug]`. |
| Emails de entrega | `src/lib/email.ts` | Plantilla HTML + resolver `DOWNLOAD_URL_*`. Escapar SIEMPRE input de usuario. |
| Pago PayPal | `src/app/api/paypal/{create-order,capture-order}/route.ts` | Por defecto apunta a **producción** (`api-m.paypal.com`). |
| Pedidos manuales | `src/app/api/orders/route.ts` | Bizum/transferencia/paypal-manual. Honeypot + rate-limit + consentDigital (EU 2011/83/UE Art. 16(m)). |
| Entrega manual | `src/app/api/orders/deliver/route.ts` | Bearer `DELIVER_SECRET_TOKEN`. |
| Leads | `src/app/api/contact/route.ts` | Forward fire-and-forget a Giris. |
| Waitlist | `src/app/api/waitlist/route.ts` | Forward fire-and-forget a Giris. |
| Textos legales | `src/app/legal/*` | Legalmente exigibles. No tocar sin Oscar. |

## Reglas críticas del repo (additional sobre las globales)

- **Push a `main` despliega prod**. Nunca `git push` sin aprobación explícita de Oscar en el turno actual.
- **No tocar** `.env`, `.env.local`, `.env.production`, `.vercel/`. No leer, no imprimir, no copiar a logs.
- **No introducir trackers / analytics / pixeles**. La home anuncia `0 trackers` (`STATS` en `constants.ts`) — meter GA, Plausible, Hotjar, etc. rompe el discurso.
- **Nunca `git add .` ni `git add -A`**. Solo `git add <archivo-específico>`.
- **No tocar `src/app/legal/*`** sin permiso explícito (impacto legal directo).
- **No editar `SLOTS_CONFIG`, `EXPRESS_SURCHARGE` ni precios de `PRODUCTS`** sin permiso explícito — los gestiona Oscar según capacidad real.
- **No cambiar endpoints de `/api/paypal/*`, `/api/orders/*`, `/api/contact`, `/api/waitlist`** sin `/audit-only` previo. Tocan pagos o leads.
- **No tocar `src/lib/email.ts`** sin revisión — afecta a la entrega del producto que el cliente acaba de pagar.
- **No tocar `scripts/upload-zips.mjs`** sin permiso — usa `BLOB_READ_WRITE_TOKEN`.
- **No subir archivos a `public/`** sin permiso — son públicos en Vercel sin autenticación.
- **No instalar dependencias** sin permiso explícito (la lista actual es intencionada).
- **No mockear PayPal apuntando a sandbox** sin confirmar con Oscar (la variable `PAYPAL_API_BASE` por defecto es producción).

## Variables de entorno usadas por el código

Lectura — no se documentan valores, solo se listan para que sepas qué existe:

`GIRIS_AGENT_URL` · `PAYPAL_API_BASE` · `NEXT_PUBLIC_PAYPAL_CLIENT_ID` · `PAYPAL_SECRET` · `DELIVER_SECRET_TOKEN` · `GMAIL_USER` · `GMAIL_APP_PASSWORD` · `BLOB_READ_WRITE_TOKEN` · `DOWNLOAD_URL_GENERADOR_CONTRASENAS_BASICO` · `DOWNLOAD_URL_VERIFICADOR_URLS` · `DOWNLOAD_URL_ANTI_PHISHING` · `DOWNLOAD_URL_AUDITOR_WEB` · `DOWNLOAD_URL_BACKUP_CIFRADO` · `AUDIO_URL_PWGEN_BASICO` · `AUDIO_URL_AUDITOR_WEB` · `AUDIO_URL_ANTI_PHISHING` · `AUDIO_URL_VERIFICADOR_URLS` · `AUDIO_URL_BACKUP_CIFRADO`

`.env.example` solo documenta `GIRIS_AGENT_URL` — el resto está incompleto.

## Comandos canónicos

```bash
npm run dev          # next dev --webpack (no Turbopack pese a lo que dice el README)
npm run build        # next build
npx tsc --noEmit     # typecheck (no está como script de npm)
npx biome check src/ # lint/format (no está como script de npm)
```

No hay tests automatizados ni CI en GitHub Actions. Vercel hace el build en cada push.

## Riesgos conocidos (no resolver sin pedirlo Oscar)

- **Rate-limit `Map` in-memory** en `/api/contact|orders|waitlist` no funciona en Vercel serverless multi-instancia — es decorativo. Documentado, pendiente de mover a Vercel KV / Upstash.
- **`x-forwarded-for` se confía sin verificar origen edge** → IP spoofable; OK como log, no OK como seguridad.
- **giris-agent es SPOF silencioso**: si está caído, los leads y pedidos manuales solo quedan como `console.error` en logs de Vercel. PayPal directo sigue entregando el ZIP al cliente.
- **`.env.example` incompleto**: faltan 16+ vars que el código lee.
- **Sin tests** y **sin CI**: cualquier refactor del checkout es a ciegas.
- **`next.config.ts` vacío**: sin CSP, HSTS, X-Frame-Options. Web que cobra sin headers de seguridad.
- **Incoherencia README↔scripts**: README anuncia Turbopack, `npm run dev` usa `--webpack`.
- **Duplicación**: `checkRateLimit` + `getClientIp` están copiados en 3 routes. Refactor obvio a `lib/rate-limit.ts` cuando toque.

## Flujo obligatorio de trabajo (recordatorio del global)

1. `/audit-only` antes de tocar zonas críticas (pagos, email, legal, constants).
2. `/safe-feature` para cambios acotados, con contrato explícito de alcance.
3. `/review-diff` antes de proponer commit.
4. `/ship-candado` solo si Oscar lo aprueba en ese turno.
5. Toda respuesta termina con `CANDADO_RESULTADO: PASS | FAIL`.

## Deploy

Push a `main` → Vercel construye y publica en `iaflashelite.com`. Detalle de DNS + variables de entorno en `DEPLOY.md`. Nunca disparar deploy desde el agente sin instrucción directa de Oscar en el turno.

## Skills avanzadas de IAFlashElite web

Cinco skills locales en `.claude/skills/` y cuatro subagents en `.claude/agents/` cubren los flujos profesionales del repo. Las skills globales base siguen siendo `/audit-only`, `/safe-feature`, `/review-diff`, `/debug-candado`, `/ship-candado`. Las locales se invocan igual (`/<nombre>`).

**Qué usar según la tarea**:
- **Landings, productos, agentes IA, secciones comerciales** → `/product-landing-builder`. Obliga a declarar problema, cliente ideal, promesa segura, promesas prohibidas, CTA, FAQ, riesgos y validaciones antes de tocar código. Prohíbe humo.
- **SEO / AEO (Google + ChatGPT Search + Perplexity + AI Overviews)** → `/seo-aeo-review`. Read-only por defecto. Audita titles, metadata, headings, sitemap, robots, schema, contenido indexable server-side. Si hay que implementar, se hace en una `/safe-feature` aparte aprobada por Oscar.
- **UI / estética / responsive / spacing / CTAs visuales** → `/ui-polish`. Solo presentación. Prohibido tocar lógica, endpoints, pagos, legal, envs o datos.
- **Verificación post-deploy en Vercel** → `/release-verify`. Comprueba rutas 200/404, sitemap, robots, formularios visibles, headers Vercel. Nunca envía formularios reales ni hace POST salvo orden explícita en el turno.
- **Hallazgos laterales (bugs, riesgos, mejoras fuera del objetivo)** → `/scope-guardian`. Clasifica en **BLOQUEANTE / RIESGO ALTO / BACKLOG / RUIDO**. Solo genera prompt de implementación si es BLOQUEANTE o si Oscar dice "hazlo" / "adelante" / "arréglalo" / "priorízalo".

**Subagents** (`.claude/agents/`, invocados vía Agent tool):
- `product-ux-reviewer` — voz de cliente sobre páginas/secciones (vende, fricción, humo, CTA).
- `seo-aeo-reviewer` — auditoría profunda SEO + AEO con schema y `llms.txt`.
- `scope-guardian` — segunda voz independiente que clasifica scope creep al cierre de cualquier fase.
- `release-verifier` — verificación independiente de deploy en Vercel.

**Reglas operativas adicionales**:
- Si una tarea toca **pagos, legal, envs o endpoints (`/api/*`)** → `audit-only` + `security-auditor` **antes** de cualquier `safe-feature`. No saltarse el paso.
- No perseguir hallazgos laterales sin aprobación explícita de Oscar. Aplicar `scope-guardian` siempre al cierre de fase.
- Las skills locales del repo conviven con las globales: el orden recomendado para una fase comercial es `audit-only` → `product-landing-builder` o `ui-polish` o `seo-aeo-review` → `review-diff` → `ship-candado` → `release-verify`.
