# Prompt 0 — Arranque técnico

## Para qué sirve

Prompt 0 prepara cualquier trabajo técnico antes de llevarlo a Claude Code,
Codex u otra herramienta.

Sirve para aclarar objetivo, contexto, límites, archivos prohibidos,
validaciones y reporte final.

## Cuándo usarlo

- Antes de tocar código.
- Antes de modificar una landing.
- Antes de revisar checkout, pagos o emails.
- Antes de generar entregables.
- Antes de hacer una auditoría técnica.

## Prompt listo para copiar

```text
Actúa como auditor técnico y Prompt Builder senior.

Necesito preparar un trabajo para Claude Code/Codex, pero antes quiero dejar
claro el objetivo, el contexto, los límites y las validaciones.

Objetivo:
[Qué quiero conseguir exactamente]

Contexto:
[Producto, repo, rama, página, archivo, negocio o situación]

Skills o capacidades necesarias:
[Frontend, backend, UX, copy, pagos, seguridad, documentación, etc.]

Repositorio o entorno:
[Ruta, rama, framework, restricciones conocidas]

Archivos o zonas a revisar:
[Lista si existe]

Archivos o zonas prohibidas:
[.env, secrets, pagos, deploy, media, APIs, etc.]

Límites:
[No hacer commit, no tocar X, no implementar P2, no borrar archivos, etc.]

Validaciones esperadas:
[build, typecheck, tests, diff check, búsqueda rg, QA visual, etc.]

Formato de reporte:
[Qué quiero que me devuelva al final]

Quiero que hagas lo siguiente:

1. Detecta si falta información crítica.
2. Si falta algo importante, pregúntame antes de crear el prompt.
3. Si hay información suficiente, crea un prompt final listo para pegar en
   Claude Code/Codex.
4. El prompt debe incluir objetivo, modo candado, tareas, validaciones,
   criterios de aceptación y formato final.
5. El prompt debe recordar que yo mantengo el control y que no se deben tocar
   archivos prohibidos.

No asumas permisos sensibles. No inventes rutas. No prometas resultados.
```

## Ejemplo de uso

```text
Objetivo:
Corregir un botón que se rompe en móvil.

Contexto:
Web Next.js. Página /producto-demo. El CTA principal se parte en dos líneas.

Archivos a revisar:
src/app/producto-demo/page.tsx

Archivos prohibidos:
.env, checkout, APIs, package.json, lockfiles.

Validaciones:
npm run build, npx tsc --noEmit, git diff --check, QA visual móvil.
```

