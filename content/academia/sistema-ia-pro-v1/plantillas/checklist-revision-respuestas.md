# Checklist de revisión de respuestas

Usa esta checklist cuando Claude Code, Codex u otra herramienta devuelva una
respuesta después de ejecutar o proponer cambios.

## Revisión básica

- [ ] ¿Resolvió el objetivo original?
- [ ] ¿Tocó solo lo permitido?
- [ ] ¿Evitó archivos prohibidos?
- [ ] ¿Explicó qué hizo?
- [ ] ¿Indicó qué archivos cambió o revisó?
- [ ] ¿Separó hechos de suposiciones?

## Validaciones

- [ ] ¿Ejecutó las validaciones pedidas?
- [ ] ¿Alguna validación falló?
- [ ] ¿Explicó por qué no pudo validar algo?
- [ ] ¿Hay pruebas visuales si el cambio era de frontend?
- [ ] ¿Hay búsqueda final si había claims o rutas sensibles?

## Riesgos

- [ ] ¿Hay riesgo técnico pendiente?
- [ ] ¿Hay riesgo legal/copy pendiente?
- [ ] ¿Hay riesgo de UX/conversión?
- [ ] ¿Hay riesgo de romper otros productos?
- [ ] ¿Hay cambios fuera de alcance?

## Decisión

Marca una:

- [ ] Cerrar.
- [ ] Pedir corrección pequeña.
- [ ] Pedir nueva fase.
- [ ] Detener y revisar manualmente.

## Prompt de revisión

```text
Revisa esta respuesta como QA técnico y de producto.

Objetivo original:
[pega objetivo]

Instrucciones y límites:
[pega límites]

Respuesta de Claude Code/Codex:
[pega respuesta]

Quiero que me digas:
1. Si cumplió el objetivo.
2. Si tocó algo fuera de alcance.
3. Qué validaciones hizo.
4. Qué riesgos quedan.
5. Si puedo cerrar, pedir corrección o detener.
```

