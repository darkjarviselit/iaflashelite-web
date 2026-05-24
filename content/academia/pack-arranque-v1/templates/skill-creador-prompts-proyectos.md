# Skill: Creador de prompts para proyectos

Objetivo: crear un prompt de trabajo para una tarea concreta, con contexto,
criterios y formato de salida.

## Prompt base

```text
Actúa como diseñador de prompts de trabajo.

Quiero crear un prompt para resolver una tarea concreta con IA.
No resuelvas todavía la tarea. Primero construye el prompt correcto.

Reglas:
- pregunta si falta información crítica;
- define rol, objetivo, contexto, proceso y salida;
- evita instrucciones vagas;
- incluye criterios de calidad;
- incluye límites y cosas que la IA no debe prometer;
- deja el prompt listo para copiar y pegar.

Tarea:
[describe la tarea]

Contexto:
[público, proyecto, herramientas, restricciones, tono]

Resultado que quiero:
[documento, tabla, plan, código, análisis, email, estrategia]
```

## Estructura del prompt resultante

Pide que te entregue algo así:

```text
Actúa como [rol].

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

Límites:
- no inventes datos;
- no prometas resultados no verificables;
- si falta información, señálalo.

Formato de salida:
[tabla, lista, propuesta, plan por fases, etc.]
```

## Ejemplo de uso

Tarea:

```text
Quiero que la IA revise una landing de venta de un producto digital barato.
```

Prompt generado:

```text
Actúa como auditor UX/CRO y legal-copy.

Objetivo:
Revisar una landing de producto digital barato para detectar fricción,
promesas exageradas, dudas de compra y mejoras de conversión.

Contexto:
El producto cuesta menos de 10 euros. No debe prometer resultados económicos.
Debe sonar práctico, honesto y profesional.

Proceso:
1. Resume la promesa de la landing.
2. Detecta claims peligrosos o ambiguos.
3. Revisa CTA, precio, garantía y entrega.
4. Propone mejoras P0 y P1.

Formato:
Tabla con problema, impacto, recomendación y prioridad.
```

## Revisión del prompt

Antes de usar el prompt, pregunta:

```text
Revisa este prompt. Dime qué parte es vaga, qué falta y cómo hacerlo más preciso.
```

## Ejemplo completado

Entrada:

```text
Tarea:
Quiero crear un prompt para que la IA me ayude a preparar el índice de un PDF
práctico de 20 páginas.

Contexto:
El PDF será un producto digital barato para personas que empiezan a usar IA.
No quiero promesas de dinero ni tono de gurú. Quiero que sea útil y fácil de
seguir.

Resultado que quiero:
Un prompt listo para pedir a la IA un índice claro, con secciones, objetivo de
cada sección y entregable práctico.
```

Prompt generado:

```text
Actúa como editor de producto digital y formador práctico.

Objetivo:
Crear el índice de un PDF de unas 20 páginas para personas que empiezan a usar
IA en proyectos reales.

Contexto:
El producto debe ser claro, aplicable y honesto. No debe prometer dinero,
automatización milagrosa ni garantías de resultado. El lector debe terminar
con una configuración o plantilla útil.

Proceso:
1. Define el problema principal que resuelve el PDF.
2. Propón 6-8 secciones.
3. Para cada sección, indica objetivo, contenido y entregable.
4. Señala qué partes podrían sonar a humo y cómo evitarlas.
5. Propón una checklist final.

Criterios de calidad:
- lenguaje claro;
- pasos aplicables;
- ejemplos concretos;
- sin promesas exageradas;
- entregable final verificable.

Formato de salida:
Tabla con sección, objetivo, contenido, entregable y riesgo editorial.
```
