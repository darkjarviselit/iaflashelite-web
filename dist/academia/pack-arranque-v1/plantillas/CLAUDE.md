# Proyecto: [nombre del proyecto]

Este archivo convierte el flujo de arranque en contexto de proyecto. Úsalo como
base para Claude Code, Codex o cualquier proyecto largo donde la IA necesite
entender objetivo, reglas, límites y definición de terminado antes de tocar nada.

## Objetivo

[Describe en 3-5 líneas qué intenta conseguir este proyecto.]

## Usuario o audiencia

[Quién lo usará, qué problema tiene y qué nivel técnico tiene.]

## Estado actual

- Estado: [idea / borrador / en construcción / publicado]
- Prioridad actual: [qué hay que resolver primero]
- Fecha o hito importante: [si existe]

## Reglas de trabajo con IA

- Responde en español claro y práctico.
- Lee el contexto antes de proponer cambios.
- Separa hechos, supuestos y recomendaciones.
- No prometas resultados económicos.
- No inventes datos, integraciones ni capacidades.
- Si falta información crítica, dilo.
- Prioriza cambios pequeños, revisables y útiles.

## Criterios de calidad

Una respuesta útil debe:

- ayudar a decidir el siguiente paso;
- explicar riesgos;
- evitar humo;
- mantener coherencia con el objetivo;
- diferenciar P0, P1 y P2 si la tarea es grande.

## Límites

- No tocar secretos, credenciales ni variables privadas.
- No cambiar precios, claims legales ni condiciones sin aviso.
- No añadir dependencias sin justificar.
- No crear funcionalidades fuera del alcance.
- No asumir que algo está implementado sin comprobarlo.

## Comandos o validaciones

```bash
[comando de build]
[comando de tests]
[comando de lint o typecheck]
```

Si no hay comandos, escribe:

```text
Validación manual requerida: [describe cómo revisar]
```

## Estructura del proyecto

```text
[carpeta o archivo importante] - [para qué sirve]
[carpeta o archivo importante] - [para qué sirve]
```

## Tareas frecuentes

- Revisar copy.
- Ordenar ideas.
- Crear checklist.
- Preparar prompts.
- Detectar riesgos.
- Mejorar documentación.

## Definición de terminado

Una tarea se considera terminada cuando:

- el resultado cumple el objetivo;
- no rompe restricciones;
- está revisado;
- los riesgos pendientes están escritos;
- hay un siguiente paso claro si algo queda fuera.

## Ejemplo completado

```markdown
# Proyecto: Mini landing para producto digital

## Objetivo

Crear una landing clara para vender un pack descargable de bajo precio. La
landing debe explicar qué incluye, para quién es, qué no promete, garantía y
botón de compra.

## Usuario o audiencia

Personas que empiezan a usar IA para trabajar mejor y quieren una guía práctica,
no un curso largo.

## Estado actual

- Estado: borrador.
- Prioridad actual: aclarar promesa, CTA y garantía.
- Fecha o hito importante: revisar una primera versión esta semana.

## Reglas de trabajo con IA

- Responde en español claro y práctico.
- No prometas resultados económicos.
- Detecta copy exagerado, urgencia falsa o claims ambiguos.
- Propón cambios pequeños antes que rediseños completos.

## Límites

- No inventar testimonios.
- No añadir precios o garantías que no estén escritos.
- No cambiar el objetivo del producto.
- No asumir integraciones técnicas no confirmadas.

## Definición de terminado

Una tarea está terminada cuando el copy es claro, el CTA funciona, la garantía
no crea expectativas falsas y los riesgos pendientes están anotados.
```
