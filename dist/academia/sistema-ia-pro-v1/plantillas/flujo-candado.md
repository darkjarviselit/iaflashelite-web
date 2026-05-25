# Flujo candado

## Idea central

El flujo candado separa preparación, ejecución y revisión.

No delegas todo en una IA. Diriges el proceso.

> Tú eres el director de orquesta. La IA trabaja, pero tú lees, decides y
> mantienes el control.

## Pasos

1. Proyecto IA audita y prepara prompt.
2. Usuario pega prompt en Claude Code/Codex.
3. Claude Code/Codex responde.
4. Usuario pega respuesta al proyecto IA.
5. Proyecto IA revisa.
6. Usuario decide siguiente paso.

## Plantilla para usar el flujo

```text
Voy a usar flujo candado.

Fase 1 — Preparación:
Quiero que audites esta tarea y prepares un prompt para Claude Code/Codex.

Tarea:
[Describe la tarea]

Límites:
[Qué no se puede tocar]

Validaciones:
[Qué debe comprobarse]

Fase 2 — Ejecución:
Pegaré el prompt en Claude Code/Codex.

Fase 3 — Revisión:
Después pegaré aquí la respuesta para que revises:
- qué hizo;
- qué tocó;
- qué no tocó;
- qué validó;
- qué riesgo queda;
- si puedo cerrar o debo pedir otra fase.
```

## Ejemplo breve

Tarea: añadir una sección simple a una landing.

Límites: no tocar checkout, no tocar APIs, no tocar precios.

Validaciones: build, typecheck, diff check y revisión visual.

Resultado esperado: prompt seguro, ejecución controlada y revisión final antes
de mergear.
