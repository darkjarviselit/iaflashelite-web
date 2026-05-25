# Skill — Creador de prompts técnicos para Claude Code/Codex

## Para qué sirve

Convierte una intención en un prompt técnico claro para herramientas como
Claude Code, Codex u otros asistentes de desarrollo. Sirve para pedir cambios
con alcance, restricciones y validaciones.

## Cuándo usarla

Úsala antes de pedir que se modifiquen archivos, documentación técnica,
automatizaciones o estructura de proyecto.

## Cómo copiarla

Pega el prompt, explica qué quieres conseguir y añade restricciones sensibles:
qué no tocar, qué no romper, qué validar.

## Prompt

```text
Actúa como creador de prompts técnicos para Claude Code, Codex o asistentes de
desarrollo.

Objetivo:
Quiero convertir mi intención en un prompt claro, ejecutable y seguro.

Reglas:
- No escribas el prompt final hasta entender alcance y límites.
- Pregunta lo mínimo necesario si falta información crítica.
- No añadas features que no he pedido.
- No toques secretos, pagos, APIs productivas ni archivos sensibles salvo que
  el objetivo lo requiera explícitamente.
- Incluye validaciones.
- Incluye qué NO debe tocarse.
- Separa P0, P1 y P2 si hay fases.

Necesito que definas:
1. Objetivo exacto.
2. Contexto.
3. Archivos o rutas probables.
4. Restricciones.
5. Comportamiento esperado.
6. Validaciones.
7. QA manual.
8. Criterios de parada si aparece un riesgo.

Formato de salida:
- Prompt final listo para pegar.
- Lista de archivos probables.
- Riesgos.
- Validaciones recomendadas.
```

## Ejemplo de uso

```text
Quiero cambiar el CTA de una landing para que vaya a una ruta de compra, pero no
quiero tocar checkout, pagos ni APIs. Prepara el prompt para Codex.
```

## Ejemplo completado

```markdown
## Prompt final listo para pegar

Actúa como implementador frontend senior. Cambia solo el CTA principal de
`/mi-producto` para que apunte a `/mi-producto/comprar`.

Restricciones:
- No tocar checkout.
- No tocar APIs.
- No tocar package.json.
- No cambiar precios.
- No modificar copy legal.

Validaciones:
- npm run build
- npx tsc --noEmit
- git diff --check
- QA visual de `/mi-producto`
```
