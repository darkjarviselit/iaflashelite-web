# Plantilla — Contexto maestro del proyecto

## Para qué sirve

Esta plantilla crea el documento que explica tu proyecto a la IA. Sirve para
que no tengas que repetir cada vez qué estás construyendo, para quién, con qué
límites y qué debe evitarse.

## Cuándo usarla

Úsala antes de pedir estrategia, copy, automatizaciones, revisión de producto,
prompts técnicos para Claude Code/Codex o decisiones importantes.

## Cómo copiarla

Copia el prompt y pégalo en tu IA. Puedes responder por texto o por voz. La IA
debe entrevistar paso a paso y esperar tus respuestas.

## Prompt

```text
Actúa como auditor estratégico de proyectos.

Objetivo:
Quiero que me entrevistes paso a paso para crear un documento limpio llamado
"Contexto maestro del proyecto".

Este documento debe servir para que una IA entienda mi web, app, negocio,
producto, trabajo, idea o futuro proyecto antes de ayudarme.

Reglas:
- No hagas una lista enorme de preguntas al principio.
- Pregunta por bloques pequeños.
- Espera mi respuesta antes de avanzar.
- Si detectas una contradicción, señálala con respeto y pide aclaración.
- Separa hechos, hipótesis y decisiones pendientes.
- No prometas capacidades que no estén confirmadas.
- No inventes clientes, métricas, integraciones ni resultados.

Necesito que entiendas:
1. Qué es el proyecto.
2. Qué problema resuelve.
3. A quién sirve.
4. Qué existe ya.
5. Qué falta.
6. Qué se quiere vender o entregar.
7. Qué no debe prometer.
8. Qué riesgos técnicos, legales, de marca o de ejecución existen.
9. Qué objetivos hay a 30, 60 y 90 días.
10. Qué partes son P0, P1 y P2.
11. Qué dudas hay que resolver antes de avanzar.

Proceso:
Primero hazme una entrevista paso a paso.
Después crea un resumen provisional.
Pregúntame qué corregiría.
Cuando confirme, genera el documento final:
"Contexto maestro del proyecto".

Formato final:
- Nombre del proyecto.
- Descripción en una frase.
- Problema que resuelve.
- Público objetivo.
- Estado actual.
- Activos existentes.
- Qué falta.
- Oferta o entrega prevista.
- Límites y claims prohibidos.
- Riesgos principales.
- Objetivos a 30 días.
- Objetivos a 60 días.
- Objetivos a 90 días.
- Prioridades P0/P1/P2.
- Próximo paso recomendado.
```

## Qué salida pedirle a la IA

Pide una versión clara, ordenada y útil como contexto. Si el documento queda
muy largo, pide una versión corta:

```text
Crea una versión resumida de este Contexto maestro del proyecto para pegarla al
inicio de una conversación IA.
```

## Cómo guardar el resultado

Guárdalo como:

```text
contexto-maestro-proyecto.md
```

## Ejemplo breve de uso

```text
Lee este Contexto maestro del proyecto. Antes de proponer acciones, dime qué
información falta, qué riesgos ves y qué harías primero.
```

## Ejemplo completado

```markdown
# Contexto maestro del proyecto

## Nombre del proyecto

Agenda Clara

## Descripción en una frase

Una mini herramienta para ayudar a profesionales independientes a convertir
notas sueltas en tareas de la semana.

## Problema que resuelve

La persona tiene ideas, encargos y recordatorios repartidos entre notas, emails
y mensajes. Pierde tiempo ordenando y priorizando.

## Público objetivo

Freelancers y profesionales pequeños que ya usan herramientas simples, pero no
quieren montar un sistema complejo.

## Estado actual

Idea validándose con una landing y una demo manual.

## Qué falta

- Copy final.
- Flujo de onboarding.
- Ejemplo de uso real.
- Decidir si se venderá como plantilla o servicio.

## Límites y claims prohibidos

No prometer productividad perfecta. No decir que sustituye la planificación
personal. No prometer resultados económicos.

## Riesgos principales

La promesa puede sonar demasiado genérica. Falta concretar un caso de uso
visible.

## Objetivos a 30 días

Crear landing, demo manual y primer contenido de explicación.
```
