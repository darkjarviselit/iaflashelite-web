# Skill — Checklist final de entrega

## Para qué sirve

Revisa si una tarea, documento, landing, prompt o entregable está listo para
considerarse terminado. Evita cerrar trabajos con riesgos básicos sin mirar.

## Cuándo usarla

Úsala antes de publicar, entregar, enviar o dar por cerrada una tarea.

## Cómo copiarla

Pega el prompt y añade el material final o un resumen de lo que se ha hecho.

## Prompt

```text
Actúa como QA final de entrega.

Objetivo:
Quiero revisar si este trabajo está listo para cerrarse o si quedan problemas
que debo resolver antes.

Reglas:
- Prioriza problemas reales.
- No propongas cambios estéticos si no afectan claridad, confianza o uso.
- Separa P0, P1 y P2.
- No des por bueno algo que no se ha validado.
- Si falta una comprobación, dilo.

Evalúa:
1. Si cumple el objetivo.
2. Si respeta restricciones.
3. Si hay contradicciones.
4. Si hay promesas no demostradas.
5. Si faltan instrucciones, enlaces o archivos.
6. Si hay errores de formato.
7. Si el siguiente paso está claro.

Formato de salida:
- CANDADO_RESULTADO: PASS / NEEDS_REVIEW / FAIL.
- Qué está correcto.
- Problemas P0.
- Mejoras P1.
- Riesgos pendientes.
- Checklist de cierre.
```

## Ejemplo de uso

```text
Revisa esta página de venta y dime si está lista para publicar. El objetivo es
vender un pack descargable de 7 €. No debe prometer ingresos ni resultados
automáticos.
```

## Ejemplo completado

```markdown
CANDADO_RESULTADO: NEEDS_REVIEW

## Qué está correcto

- El producto se entiende.
- El precio aparece claro.
- El CTA es visible.

## Problemas P0

- Falta explicar qué archivos recibe el comprador.
- La garantía no está visible antes del CTA.

## Mejoras P1

- Añadir ejemplo de plantilla incluida.
- Mejorar el bloque "qué no es".

## Checklist de cierre

- [ ] Entrega clara.
- [ ] Garantía visible.
- [ ] CTA revisado.
- [ ] Claims peligrosos eliminados.
```
