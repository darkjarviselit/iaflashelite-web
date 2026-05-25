# Informe final de entrega

Usa esta plantilla para cerrar una sesión de trabajo con IA.

No hace falta escribir demasiado. Hace falta que sea claro.

## Plantilla

```text
Objetivo:
[Qué se quería conseguir]

Cambios realizados:
[Qué se hizo]

Evidencias:
[Qué demuestra que funciona o que está preparado]

Validaciones:
[Build, typecheck, tests, revisión visual, búsquedas, etc.]

Riesgos pendientes:
[Qué falta revisar o comprobar]

Próximos pasos:
[Qué haría después]

No tocado:
[Archivos, sistemas o zonas sensibles que no se modificaron]
```

## Ejemplo completado

```text
Objetivo:
Crear una landing interna para una lista de espera.

Cambios realizados:
Se creó la ruta /academia/lista-espera con hero, formulario de interés,
checkbox de privacidad y CTAs a productos existentes.

Evidencias:
La ruta responde 200 en local y el formulario se renderiza.

Validaciones:
npm run build OK.
npx tsc --noEmit OK.
git diff --check OK.

Riesgos pendientes:
Falta probar envío real en producción.

Próximos pasos:
Revisar visualmente en móvil y decidir si se añade al sitemap.

No tocado:
.env, checkout, PayPal, APIs de productos, media y deploy.
```
