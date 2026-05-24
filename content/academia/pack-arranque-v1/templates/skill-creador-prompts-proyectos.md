# Skill: Creador de prompts para proyectos

Objetivo: crear un prompt de trabajo para una tarea concreta, con contexto,
criterios y formato de salida.

## Prompt base

```text
Actua como disenador de prompts de trabajo.

Quiero crear un prompt para resolver una tarea concreta con IA.
No resuelvas todavia la tarea. Primero construye el prompt correcto.

Reglas:
- pregunta si falta informacion critica;
- define rol, objetivo, contexto, proceso y salida;
- evita instrucciones vagas;
- incluye criterios de calidad;
- incluye limites y cosas que la IA no debe prometer;
- deja el prompt listo para copiar y pegar.

Tarea:
[describe la tarea]

Contexto:
[publico, proyecto, herramientas, restricciones, tono]

Resultado que quiero:
[documento, tabla, plan, codigo, analisis, email, estrategia]
```

## Estructura del prompt resultante

Pide que te entregue algo asi:

```text
Actua como [rol].

Objetivo:
[resultado concreto]

Contexto:
[datos importantes]

Proceso:
1. [paso]
2. [paso]
3. [paso]

Criterios de calidad:
- [criterio]
- [criterio]

Limites:
- no inventes datos;
- no prometas resultados no verificables;
- si falta informacion, senalalo.

Formato de salida:
[tabla, lista, propuesta, plan por fases, etc.]
```

## Ejemplo rapido

Tarea:

```text
Quiero que la IA revise una landing de venta de un producto digital barato.
```

Prompt generado:

```text
Actua como auditor UX/CRO y legal-copy.

Objetivo:
Revisar una landing de producto digital barato para detectar friccion,
promesas exageradas, dudas de compra y mejoras de conversion.

Contexto:
El producto cuesta menos de 10 euros. No debe prometer resultados economicos.
Debe sonar practico, honesto y profesional.

Proceso:
1. Resume la promesa de la landing.
2. Detecta claims peligrosos o ambiguos.
3. Revisa CTA, precio, garantia y entrega.
4. Propone mejoras P0 y P1.

Formato:
Tabla con problema, impacto, recomendacion y prioridad.
```

## Revision del prompt

Antes de usar el prompt, pregunta:

```text
Revisa este prompt. Dime que parte es vaga, que falta y como hacerlo mas preciso.
```
