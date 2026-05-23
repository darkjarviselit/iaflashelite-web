---
name: release-verify
description: Verificación post-deploy de iaflashelite-web (Vercel URL canónica, rutas 200/404, sitemap.xml, robots.txt, páginas comerciales clave, formularios visibles). Read-only sobre producción. Prohibido enviar formularios reales, hacer POST o pagos sin autorización explícita.
---

# release-verify

## Propósito
Verificar que un push/deploy reciente está sirviendo el contenido esperado en producción Vercel, sin disparar acciones reales.

## Cuándo usarla
- Inmediatamente tras un `git push origin main` que dispara deploy automático.
- Tras cualquier cambio que afecte SEO, navegación o discurso comercial.
- Cuando hay duda sobre si una ruta está publicada / cacheada / 404.

## Reglas inviolables
- **PROHIBIDO** modificar archivos. Read-only.
- **PROHIBIDO** enviar formularios reales (contacto, interest, waitlist, orders).
- **PROHIBIDO** completar flujos de PayPal, crear orders, lanzar create-order/capture-order.
- **PROHIBIDO** POST a `/api/*` salvo orden directa de Oscar en el turno.
- **PROHIBIDO** descargar binarios completos sin necesidad (usar `curl -I` para HEAD).
- **PERMITIDO**: `curl` GET/HEAD, descargar HTML público para grep, leer headers Vercel.

## URLs canónicas
- Producción Vercel: `https://iaflashelite-web.vercel.app`
- Dominio comercial: `https://iaflashelite.com` (puede o no apuntar a Vercel según estado DNS — verificar con `dig` antes de asumir).

## Checklist estándar post-deploy

1. **Git limpio y sincronizado**:
   - `git status --short` sin output.
   - `git rev-parse HEAD origin/main` → mismo SHA.
2. **HTTP de rutas críticas** (HEAD o GET sin enviar nada):
   - `/` (200, HTML)
   - `/productos`, `/servicios`, `/soluciones` (200)
   - `/productos/[slug]` para los `available` (200)
   - `/soluciones/[slug]` para las 5 verticales (200)
   - `/legal/aviso-legal`, `/privacidad`, `/cookies`, `/garantias` (200)
   - `/casos`, `/academia`, `/contacto`, `/sobre` (200)
   - `/sitemap.xml` (200, `application/xml`)
   - `/robots.txt` (200, `text/plain`)
3. **API alive (GET → 405 esperado)**:
   - `/api/contact`, `/api/interest`, `/api/waitlist`, `/api/orders`, `/api/paypal/create-order`, `/api/paypal/capture-order`, `/api/orders/deliver` — todos deben responder 405 a GET (existen, solo aceptan POST).
4. **Sitemap consistente**: contiene rutas públicas, excluye `/api/*` y `/productos/*/comprar`.
5. **Robots consistente**: `Allow: /`, `Disallow: /api/`, `Disallow: /productos/*/comprar`, sitemap apuntado.
6. **Vercel headers**: `server: Vercel`, `x-vercel-cache: HIT/MISS`, `x-vercel-id: <region>::...` (la región debería ser `cdg1` según `CLAUDE.md`).
7. **Smoke específico del cambio**: si el push tocó UI/copy, descargar el HTML de la página y `grep` por strings esperados (marcadores nuevos) y no esperados (textos eliminados).
8. **Formularios**: confirmar que el HTML del form se renderiza correctamente — **NO enviar**.

## Excepciones autorizables
Si Oscar dice explícitamente "envía un test al form" en el turno: usar un email controlado, mandar una vez, comprobar inbox propio, registrar el envío en la respuesta.

## Salida obligatoria

```
## Estado git
- working tree, HEAD local, origin/main

## Tabla HTTP
| URL | HTTP | Notas |
|---|---|---|

## Verificación sitemap/robots
- presencia/ausencia, coherencia con rutas reales

## Smoke del cambio
- Strings esperados encontrados / ausentes
- Headers Vercel (región, cache)

## Confirmaciones
- ✓ No formularios enviados
- ✓ No POST reales
- ✓ No acciones de PayPal
- ✓ No descarga de binarios completos
- ✓ No modificaciones locales

## Notas operacionales
- DNS de iaflashelite.com (si aplica)
- Cualquier 404 inesperado
- Cualquier regresión de cache (MISS persistente, cabeceras raras)

CANDADO_RESULTADO: PASS | FAIL
```

## Cierre
Solo verificación. Si hay regresión grave: clasificar con `scope-guardian` (BLOQUEANTE / RIESGO ALTO / BACKLOG / RUIDO) y esperar decisión de Oscar antes de proponer fix.
