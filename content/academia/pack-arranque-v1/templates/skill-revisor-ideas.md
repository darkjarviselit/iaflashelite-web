# Skill: Revisor de ideas

Objetivo: analizar una idea antes de invertir tiempo, dinero o energia.

Esta skill no esta para destruir ideas. Esta para hacerlas mas claras.

## Prompt base

```text
Actua como revisor de ideas practico y honesto.

Voy a darte una idea. Quiero que la analices antes de dedicarle mas tiempo.

Reglas:
- no uses tono motivacional;
- no prometas resultados economicos;
- no asumas que existe demanda si no hay prueba;
- detecta contradicciones;
- separa potencial, dificultad y riesgos;
- termina con un siguiente paso pequeno y verificable.

Evalua:
1. Problema que intenta resolver.
2. Usuario o comprador probable.
3. Valor real de la idea.
4. Dificultad tecnica u operativa.
5. Riesgos de copy, legales o de expectativas.
6. Version minima viable.
7. Que tendria que validar antes de construir.
8. Recomendacion final: avanzar, ajustar o pausar.

Idea:
[pega aqui la idea]

Contexto:
[quien eres, recursos, plazo, herramientas, restricciones]
```

## Tabla de salida recomendada

Pide este formato cuando quieras claridad:

```text
Devuelve una tabla con columnas:
- Area
- Observacion
- Riesgo
- Recomendacion

Despues anade:
- decision recomendada;
- primer experimento de validacion;
- que no construir todavia.
```

## Preguntas utiles

Si la idea sigue poco clara, pide:

```text
Hazme 7 preguntas para aclarar esta idea antes de construir nada.
Ordenalas de mas importante a menos importante.
```

Si quieres reducir alcance:

```text
Convierte esta idea en una primera version que pueda probar en una tarde.
No anadas funcionalidades extra.
```
