---
name: scope-guardian
description: Clasificar hallazgos laterales (bugs, riesgos, mejoras) detectados al cierre de cualquier fase en iaflashelite-web. Asigna nivel BLOQUEANTE / RIESGO ALTO / BACKLOG / RUIDO. Prohíbe generar prompts de implementación si Oscar no aprueba explícitamente.
---

# scope-guardian

## Propósito
Mantener foco. Cuando una fase (`audit-only`, `review-diff`, `ship-candado`, `safe-feature`, `release-verify`, `seo-aeo-review`, `ui-polish`, `product-landing-builder`) detecta problemas fuera del objetivo declarado, esta skill los clasifica y bloquea la generación automática de tareas nuevas.

## La regla
> Solo se genera un prompt de implementación si el problema es BLOQUEANTE o si Oscar dice claramente "hazlo" / "adelante" / "arréglalo" / "priorízalo".

Build OS de Oscar funciona en bucle:
1. Oscar decide.
2. Build OS crea prompt.
3. Claude Code ejecuta fase.
4. Oscar pega respuesta.
5. Build OS verifica.
6. Build OS propone siguiente paso DENTRO del objetivo aprobado.

Cuando Claude Code persigue hallazgos laterales y genera prompts no pedidos, rompe el bucle.

## Los 4 niveles

### BLOQUEANTE
- Impide completar la fase actual o rompe producción.
- Ejemplos: build falla, typecheck en rojo, secret expuesto en diff, pago roto, deploy en error, dominio caído.
- **Acción**: detener la fase, reportar a Oscar, proponer fix mínimo. Sí puedo generar prompt de fix urgente.

### RIESGO ALTO
- Problema importante (seguridad, privacidad, pérdida de datos, regresión funcional, fuga de propiedad intelectual).
- No impide completar la fase actual, pero requiere decisión a corto plazo.
- **Acción**: reportar con diagnóstico claro. **NO generar prompt de implementación** salvo aprobación explícita de Oscar en el turno.

### BACKLOG
- Mejora útil, refactor pendiente, deuda técnica, optimización.
- No urgente. Conviene apuntarlo para no perderlo.
- **Acción**: anotar en una línea. Frase textual: **"Esto queda apuntado como backlog. No lo tocamos ahora."**
- **NO generar prompt.** NO añadir plan paso a paso. NO redactar arquitectura.

### RUIDO
- Mejora cosmética, preferencia personal, micro-optimización irrelevante, comentario fuera de scope.
- **Acción**: ignorar. No mencionar salvo que Oscar pregunte.

## Procedimiento al cierre de cada fase

1. Listar hallazgos laterales en bruto.
2. Para cada uno: asignar nivel.
3. Para BLOQUEANTE: incluir fix mínimo propuesto en la respuesta de la fase actual.
4. Para RIESGO ALTO: incluir diagnóstico breve (3-5 líneas) + recomendación + esperar decisión.
5. Para BACKLOG: 1 línea por hallazgo, sin desarrollo.
6. Para RUIDO: no incluir en la respuesta.

## Reglas inviolables

- **PROHIBIDO** redactar prompts `/safe-feature` completos para hallazgos clasificados RIESGO ALTO o BACKLOG.
- **PROHIBIDO** "ofrecer ayuda extra" que abra ramas nuevas no pedidas.
- **PROHIBIDO** convertir una verificación en una nueva feature.
- **PERMITIDO** generar prompt de fix inmediato SOLO para hallazgos BLOQUEANTE.

## Salida obligatoria

Cuando se invoca explícitamente:

```
## Hallazgos clasificados

### BLOQUEANTE
- [breve descripción] → [fix mínimo propuesto, archivos exactos]

### RIESGO ALTO
- [breve descripción] → [recomendación + esperar decisión]

### BACKLOG
- [una línea por hallazgo]

### RUIDO
- (no se listan)

## Próximo paso
- DECISIÓN DE OSCAR (no prompt mío).

CANDADO_RESULTADO: PASS
- Hallazgos clasificados. Sin prompts no pedidos.
```

## Cierre
Esta skill no implementa. Solo clasifica y bloquea.
