# Plantilla — Flujo Candado para solicitudes

Este flujo evita que una salida de IA se convierta en respuesta automática sin
criterio humano.

## Paso 1 — Entrada

Recibe la solicitud por formulario, email o documento.

Guarda:

- fecha;
- nombre;
- contacto;
- solicitud original;
- estado.

## Paso 2 — Procesamiento IA

Pega la solicitud en `prompt-procesador-solicitudes.md`.

Pide:

- resumen;
- datos faltantes;
- riesgos;
- propuesta inicial.

## Paso 3 — Revisión humana

Lee la salida con `checklist-revision-humana.md`.

Corrige:

- tono;
- alcance;
- precio;
- promesas;
- dudas.

## Paso 4 — Corrección con IA

Si la propuesta no sirve, pide:

```text
Revisa la propuesta anterior. Mantén el resumen, pero corrige estas partes:
[lista de problemas]

Quiero una respuesta más prudente, clara y humana.
```

## Paso 5 — Respuesta final

Envía la respuesta final tú.

No envíes una respuesta que no puedas defender.

## Paso 6 — Aprendizaje

Registra:

- qué faltó en el formulario;
- qué parte del prompt funcionó;
- qué parte del prompt falló;
- qué mejorarás en la siguiente versión.
