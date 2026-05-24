# Skill: Planificador diario

Objetivo: convertir una lista desordenada de tareas en un plan realista para
hoy.

## Prompt base

```text
Actua como planificador diario practico.

Voy a darte mis tareas, tiempo disponible y energia actual.
Tu trabajo es ayudarme a elegir que hacer hoy sin llenar el dia de fantasia.

Reglas:
- prioriza impacto y urgencia real;
- separa lo importante de lo accesorio;
- no propongas mas tareas de las que caben;
- deja una tarea principal clara;
- reserva margen para imprevistos;
- dime que NO deberia hacer hoy.

Devuelve:
1. Diagnostico breve.
2. Prioridad principal del dia.
3. Plan por bloques.
4. Tareas secundarias si queda tiempo.
5. Lista de "no hacer hoy".
6. Cierre recomendado de 10 minutos.

Mis datos:
- Tareas pendientes: [pegar lista]
- Tiempo disponible: [ej. 2 horas, 4 horas, tarde completa]
- Energia: [baja / media / alta]
- Fecha limite o presion real: [si existe]
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
Energia: media.
Fecha limite: manana tengo que ensenar la landing.
```

## Como evaluar si funciono

Al final del dia, responde:

```text
Esto era realista?
Que tarea se quedo fuera y por que?
Que bloqueo aparecio?
Que cambio para manana?
```

Si la IA propone demasiado, anade esta frase:

```text
Reduce el plan a la mitad. Prefiero terminar poco que abrir demasiado.
```
