# Skill: Planificador diario

Objetivo: convertir una lista desordenada de tareas en un plan realista para
hoy.

## Prompt base

```text
Actúa como planificador diario práctico.

Voy a darte mis tareas, tiempo disponible y energía actual.
Tu trabajo es ayudarme a elegir qué hacer hoy sin llenar el día de fantasía.

Reglas:
- prioriza impacto y urgencia real;
- separa lo importante de lo accesorio;
- no propongas más tareas de las que caben;
- deja una tarea principal clara;
- reserva margen para imprevistos;
- dime qué NO debería hacer hoy.

Devuelve:
1. Diagnóstico breve.
2. Prioridad principal del día.
3. Plan por bloques.
4. Tareas secundarias si queda tiempo.
5. Lista de "no hacer hoy".
6. Cierre recomendado de 10 minutos.

Mis datos:
- Tareas pendientes: [pegar lista]
- Tiempo disponible: [ej. 2 horas, 4 horas, tarde completa]
- Energía: [baja / media / alta]
- Fecha límite o presión real: [si existe]
- Contexto importante: [reuniones, cansancio, entregas, bloqueos]
```

## Ejemplo de uso

```text
Tareas pendientes:
- revisar landing;
- estudiar 1 hora;
- responder emails;
- escribir guion de audio;
- ordenar carpeta de proyecto;
- publicar post.

Tiempo disponible: 3 horas.
Energía: media.
Fecha límite: mañana tengo que enseñar la landing.
```

## Ejemplo completado

Ejemplo de respuesta útil esperada:

```text
Diagnóstico breve:
Tienes demasiadas tareas para 3 horas. La landing tiene prioridad porque mañana
debes enseñarla. El resto solo entra si no bloquea el objetivo principal.

Prioridad principal del día:
Revisar la landing y dejar una lista corta de cambios P0.

Plan por bloques:
1. 90 min — revisar hero, CTA, precio, garantía y entrega.
2. 30 min — anotar cambios P0 y P1.
3. 30 min — responder solo emails urgentes.
4. 20 min — preparar cierre: qué está listo y qué falta.
5. 10 min — guardar notas y siguiente paso.

Tareas secundarias si queda tiempo:
- ordenar carpeta de proyecto;
- escribir una primera idea del guion de audio.

No hacer hoy:
- publicar post;
- rediseñar toda la landing;
- abrir nuevas herramientas.

Cierre recomendado:
Escribe tres líneas: qué quedó listo, qué revisarás mañana y cuál es el primer
paso antes de enseñar la landing.
```

## Cómo evaluar si funcionó

Al final del día, responde:

```text
¿Esto era realista?
¿Qué tarea se quedó fuera y por qué?
¿Qué bloqueo apareció?
¿Qué cambio para mañana?
```

Si la IA propone demasiado, añade esta frase:

```text
Reduce el plan a la mitad. Prefiero terminar poco que abrir demasiado.
```
