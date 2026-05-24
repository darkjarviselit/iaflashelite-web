# Skill: Revisor de ideas

Objetivo: analizar una idea antes de invertir tiempo, dinero o energía.

Esta skill no está para destruir ideas. Está para hacerlas más claras.

## Prompt base

```text
Actúa como revisor de ideas práctico y honesto.

Voy a darte una idea. Quiero que la analices antes de dedicarle más tiempo.

Reglas:
- no uses tono motivacional;
- no prometas resultados económicos;
- no asumas que existe demanda si no hay prueba;
- detecta contradicciones;
- separa potencial, dificultad y riesgos;
- termina con un siguiente paso pequeño y verificable.

Evalúa:
1. Problema que intenta resolver.
2. Usuario o comprador probable.
3. Valor real de la idea.
4. Dificultad técnica u operativa.
5. Riesgos de copy, legales o de expectativas.
6. Versión mínima viable.
7. Qué tendría que validar antes de construir.
8. Recomendación final: avanzar, ajustar o pausar.

Idea:
[pega aquí la idea]

Contexto:
[quién eres, recursos, plazo, herramientas, restricciones]
```

## Tabla de salida recomendada

Pide este formato cuando quieras claridad:

```text
Devuelve una tabla con columnas:
- Área
- Observación
- Riesgo
- Recomendación

Después añade:
- decisión recomendada;
- primer experimento de validación;
- qué no construir todavía.
```

## Preguntas útiles

Si la idea sigue poco clara, pide:

```text
Hazme 7 preguntas para aclarar esta idea antes de construir nada.
Ordénalas de más importante a menos importante.
```

Si quieres reducir alcance:

```text
Convierte esta idea en una primera versión que pueda probar en una tarde.
No añadas funcionalidades extra.
```

## Ejemplo completado

Idea de ejemplo:

```text
Quiero vender una plantilla de Notion para organizar proyectos personales con IA.
```

Salida útil esperada:

```text
Resumen:
La idea puede tener valor, pero necesita diferenciarse. "Plantilla de Notion con
IA" es demasiado amplio si no se concreta qué problema resuelve.

Potencial:
- Puede servir a estudiantes, creadores o profesionales con muchos proyectos.
- El precio debería ser bajo o incluir una guía clara de uso.

Riesgos:
- Suena genérico si solo promete "organización".
- Puede parecer otra plantilla más si no incluye ejemplos reales.
- No debe prometer productividad garantizada.

Versión mínima viable:
Una plantilla con tres vistas: proyectos activos, tareas de esta semana y
prompts reutilizables. Añadir un PDF corto con instrucciones y un ejemplo
relleno.

Qué validar antes de construir:
1. Si la gente entiende el problema en una frase.
2. Si pagaría por plantilla + guía o solo quiere el tutorial.
3. Si el comprador usa Notion de verdad.

Recomendación:
Ajustar antes de construir. Define un público concreto y prueba una página de
venta simple antes de dedicar tiempo a una plantilla completa.
```
