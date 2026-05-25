# Primer Sistema IA Vendible

## Crea un sistema que capta solicitudes, las ordena con IA y prepara respuestas revisables

IAFlashElite Academy
Versión v1.0
Formato fuente: manual + plantillas + audio guía breve

> Construye un sistema funcional para recibir una solicitud de cliente,
> analizarla con IA, detectar información faltante y preparar una respuesta
> inicial que tú revisas antes de enviar.

---

## 1. Quiénes somos y por qué construimos así

IAFlashElite crea productos, agentes y automatizaciones reales. Eso significa
que no empezamos construyendo algo gigante, frágil y difícil de explicar.

Primero buscamos una pieza pequeña que pueda funcionar:

- una entrada clara;
- una forma simple de ordenar datos;
- una IA que ayude a analizar;
- una salida revisable;
- una persona que decide antes de enviar.

Ese enfoque reduce humo. También reduce riesgo.

Este pack enseña un flujo que puede convertirse en servicio si sabes explicarlo
y venderlo con honestidad. No necesitas empezar con una app compleja ni con una
automatización llena de integraciones. Necesitas demostrar que puedes recibir
una solicitud, entenderla mejor y responder con más orden.

Ese es el primer sistema IA vendible.

---

## 2. Qué vas a construir

Vas a construir un sistema sencillo:

```text
Formulario de solicitud
        ↓
Respuestas guardadas
        ↓
Prompt procesador
        ↓
Análisis con IA
        ↓
Resumen + datos faltantes + propuesta inicial
        ↓
Revisión humana
        ↓
Respuesta final al cliente
```

El sistema tiene ocho piezas:

1. Un formulario de solicitud.
2. Un sitio donde guardar respuestas.
3. Un contexto mínimo del sistema.
4. Un prompt procesador.
5. Un resumen de necesidad.
6. Una lista de preguntas faltantes.
7. Una propuesta inicial.
8. Una revisión humana antes de enviar.

La idea no es que la IA cierre clientes por ti. La idea es que te ayude a
ordenar entradas, detectar huecos y preparar una respuesta mejor.

---

## 3. Qué NO promete este pack

Este pack es práctico, pero no promete milagros.

No promete:

- ventas aseguradas;
- resultados económicos;
- crear un SaaS completo;
- automatizar cada parte del negocio;
- eliminar la revisión humana;
- sustituir tu criterio profesional;
- que todas las solicitudes sean buenas;
- que cualquier cliente esté listo para comprar.

El comprador sigue siendo responsable de leer, revisar y decidir.

---

## 4. Si vienes de los packs anteriores

Si ya hiciste Pack Arranque IA y Sistema IA Pro, tienes una base muy buena.

Usa:

- tu Currículum IA;
- tu Contexto Maestro;
- tus Instrucciones de Trabajo;
- tus Proyectos IA;
- tu Prompt 0;
- tu Flujo Candado.

Cómo encaja cada pieza:

- Currículum IA: ayuda a definir quién eres y qué puedes ofrecer.
- Contexto Maestro: explica el proyecto y el mercado al que quieres servir.
- Instrucciones de Trabajo: marcan el tono y la forma de responder.
- Proyecto IA: sirve como centro de mando para diseñar y revisar el sistema.
- Prompt 0: te ayuda a preparar cada fase con límites claros.
- Flujo Candado: evita enviar respuestas sin revisión.

No repitas trabajo. Reutiliza esa base.

---

## 5. Si empiezas directamente

Puedes seguir este pack sin haber hecho los anteriores.

Antes de crear el sistema, completa una versión rápida de contexto mínimo.

Responde:

- quién eres o qué rol tienes;
- qué servicio quieres ofrecer;
- qué tipo de cliente quieres atender;
- qué problema vas a procesar;
- qué información necesitas para valorar una solicitud;
- qué cosas no debes prometer;
- qué herramienta usarás para formulario y respuestas;
- qué estilo de respuesta quieres enviar.

Usa la plantilla:

`templates/contexto-minimo-sistema.md`

No necesitas una estrategia perfecta. Necesitas una base suficiente para que la
IA entienda qué está procesando.

---

## 6. Tecnología base

El flujo es neutral. Puedes montarlo con herramientas sencillas.

Para captar solicitudes:

- Tally;
- Google Forms;
- Typeform;
- formulario propio;
- email estructurado.

Para guardar respuestas:

- Google Sheets;
- Notion;
- Airtable;
- documento manual;
- bandeja de email organizada.

Para analizar:

- ChatGPT;
- Claude;
- Gemini;
- otra IA de confianza.

Para entregar la respuesta:

- email;
- documento;
- mensaje revisado manualmente.

Como bonus conceptual, más adelante podrías conectar partes con Make, Zapier,
n8n o Telegram. Pero no empieces por ahí. Primero valida que el flujo manual
funciona y que la respuesta revisada tiene sentido.

---

## 7. Diseño del sistema

El diseño completo es:

```text
Entrada → Orden → Análisis IA → Propuesta → Revisión → Respuesta
```

### Entrada

El cliente deja una solicitud. Puede ser por Tally, Google Forms, un formulario
web, email o un documento compartido.

### Orden

La solicitud se guarda en un sitio donde puedas verla: Google Sheets, Notion,
Airtable, una carpeta o un email organizado.

### Análisis IA

Pegas la solicitud en el prompt procesador. La IA genera un resumen, detecta
datos faltantes y propone una primera lectura.

### Propuesta

La IA prepara una respuesta inicial con enfoque, dudas y siguiente paso.

### Revisión

Tú lees la salida. Corriges tono, alcance, precio, promesas y riesgos.

### Respuesta

Envías una respuesta final clara, humana y revisada.

---

## 8. Crear el formulario de solicitud

El formulario debe ser corto, pero no pobre.

Campos recomendados:

- nombre;
- email o forma de contacto;
- tipo de servicio que necesita;
- descripción del problema;
- herramientas actuales;
- urgencia;
- presupuesto aproximado si lo sabe;
- objetivo que quiere conseguir;
- archivos o enlaces si aplica.

Herramientas posibles:

- Tally;
- Google Forms;
- Typeform;
- formulario web propio;
- email estructurado.

Para este pack, mantén la versión simple. Tally o Google Forms son suficientes
para validar el sistema.

Evita formularios interminables. Si preguntas demasiado, menos gente lo
terminará. Si preguntas muy poco, la IA tendrá que inventar. El punto correcto
es pedir lo necesario para preparar una respuesta útil.

Usa:

`templates/formulario-solicitud-cliente.md`

---

## 9. Guardar y ordenar solicitudes

Necesitas guardar las respuestas de forma sencilla.

Opciones:

- Google Sheets;
- Notion;
- Airtable;
- documento manual;
- email organizado por etiquetas o carpetas.

Para empezar, Google Sheets es suficiente:

- cada fila es una solicitud;
- cada columna es una respuesta;
- puedes copiar una fila y pegarla en la IA;
- puedes añadir columnas de estado: nuevo, revisado, respondido, descartado.

Columnas recomendadas:

- fecha;
- nombre;
- email;
- servicio solicitado;
- problema;
- herramientas actuales;
- urgencia;
- presupuesto;
- enlaces;
- estado;
- notas internas.

No compliques esta parte. Un sistema que se entiende se puede vender mejor que
una automatización bonita pero frágil.

---

## 10. Prompt procesador de solicitudes

Este es el corazón del pack.

El prompt convierte una solicitud desordenada en una salida útil:

- resumen ejecutivo;
- problema real detectado;
- tipo de cliente;
- datos faltantes;
- nivel de urgencia;
- dificultad estimada;
- riesgos;
- propuesta inicial;
- preguntas para responder al cliente;
- siguiente paso recomendado.

Copia este prompt y adáptalo.

```text
Actúa como analista de solicitudes comerciales con IA.

Tu función es ayudarme a entender una solicitud de cliente y preparar una
respuesta inicial que yo revisaré antes de enviar. No debes prometer resultados,
precios cerrados ni plazos cerrados si la información no está clara.

Contexto del sistema:
[Pega aquí tu contexto mínimo del sistema, sector, servicio y límites]

Solicitud recibida:
[Pega aquí la solicitud completa del cliente]

Analiza la solicitud y responde con esta estructura:

1. Resumen ejecutivo
Explica en 5-8 líneas qué quiere el cliente y qué parece necesitar realmente.

2. Problema real detectado
Diferencia lo que el cliente pide de lo que probablemente necesita resolver.

3. Tipo de cliente
Clasifica el perfil: particular, pequeño negocio, profesional, empresa,
proyecto interno u otro. Explica por qué.

4. Datos faltantes
Lista la información que falta para valorar bien el caso. No inventes datos.

5. Nivel de urgencia
Clasifica como bajo, medio o alto, con justificación.

6. Dificultad estimada
Clasifica como simple, media o compleja. Explica los motivos.

7. Riesgos
Indica riesgos técnicos, de expectativas, legales, de soporte o de alcance.

8. Propuesta inicial revisable
Prepara una primera propuesta en lenguaje claro. Debe ser prudente y no debe
comprometer precio ni plazo definitivo si faltan datos.

9. Preguntas para el cliente
Escribe de 3 a 7 preguntas concretas para completar la información.

10. Siguiente paso recomendado
Indica si conviene responder por email, pedir más datos, proponer llamada,
descartar el caso o preparar presupuesto.

Reglas:
- No prometas ventas ni resultados económicos.
- No prometas integraciones que no estén confirmadas.
- No uses lenguaje agresivo.
- Mantén revisión humana obligatoria.
- Si la solicitud es mala o incompleta, dilo con respeto.
- Separa hechos de hipótesis.
```

Guárdalo como plantilla base. No lo cambies cada vez desde cero. Mejora el
prompt después de probarlo con solicitudes reales o simuladas.

---

## 11. Plantilla de respuesta/propuesta inicial

La salida de la IA no debe enviarse directamente.

Primero prepara una respuesta inicial. Después la revisas.

Estructura recomendada:

```text
Hola [nombre],

gracias por contarme el caso.

Por lo que entiendo, necesitas [resumen de necesidad].

Antes de darte una propuesta cerrada, necesito confirmar algunos puntos:

1. [pregunta 1]
2. [pregunta 2]
3. [pregunta 3]

Con la información actual, el enfoque inicial podría ser:

- [paso 1]
- [paso 2]
- [paso 3]

Esto todavía es una propuesta inicial revisable. Cuando me confirmes los datos,
puedo ajustar alcance, plazo y precio.

Un saludo,
[tu nombre]
```

Esta plantilla evita dos errores:

- responder de forma vaga;
- comprometerte demasiado pronto.

Usa:

`templates/plantilla-respuesta-propuesta-inicial.md`

---

## 12. Revisión humana obligatoria

No envíes respuestas automáticas sin revisar.

Antes de enviar:

- lee todo;
- corrige el tono;
- elimina promesas débiles;
- revisa precios;
- revisa plazos;
- revisa si entiendes el caso;
- comprueba que no aceptas algo que no sabes hacer;
- adapta el mensaje a tu forma de trabajar.

La IA puede ayudarte a ordenar. Pero tú eres quien responde ante el cliente.

Usa:

`templates/checklist-revision-humana.md`

---

## 13. Adaptación a 5 sectores

El sistema se puede adaptar a muchos sectores. Aquí tienes cinco ejemplos.

### Agencia web

Formulario:

- tipo de web;
- objetivo;
- páginas necesarias;
- referencias visuales;
- textos y logo;
- dominio y hosting;
- plazo deseado.

La IA analiza:

- si el cliente quiere landing, web corporativa o tienda;
- si faltan textos, branding o estructura;
- riesgos de plazo;
- necesidad de mantenimiento.

Propuesta inicial posible:

> "Por lo que cuentas, necesitas una landing clara para validar oferta antes de
> hacer una web grande. Te pediría referencias, textos base y objetivo principal
> antes de cerrar alcance."

### Automatizaciones IA

Formulario:

- proceso repetitivo;
- herramientas actuales;
- volumen mensual;
- qué datos entran;
- qué salida necesita;
- quién revisa;
- errores actuales.

La IA analiza:

- si el flujo es automatizable;
- qué parte requiere revisión humana;
- qué integraciones son críticas;
- qué conviene probar primero.

Propuesta inicial posible:

> "Podemos empezar con un flujo P0: recibir solicitud, resumirla, detectar datos
> faltantes y preparar respuesta revisable. No automatizaría el envío hasta que
> el flujo esté probado."

### Gestoría/asesoría

Formulario:

- tipo de trámite;
- cliente particular o empresa;
- documentos disponibles;
- fecha límite;
- software actual;
- canal de comunicación;
- nivel de urgencia.

La IA analiza:

- documentos faltantes;
- vencimientos;
- riesgo de prometer trámites oficiales;
- necesidad de revisión profesional.

Propuesta inicial posible:

> "Antes de valorar el caso, necesito confirmar documentos, fecha límite y tipo
> de trámite. La herramienta puede ordenar la solicitud, pero la revisión debe
> hacerla el profesional."

### Inmobiliaria

Formulario:

- tipo de operación;
- zona;
- presupuesto;
- urgencia;
- características del inmueble;
- documentación disponible;
- objetivo del cliente.

La IA analiza:

- si es venta, compra o alquiler;
- datos faltantes;
- prioridad;
- respuesta inicial y siguiente paso.

Propuesta inicial posible:

> "Con la información actual puedo preparar una primera búsqueda o valoración
> orientativa, pero necesito zona exacta, presupuesto y urgencia para avanzar."

### Servicios locales

Formulario:

- tipo de servicio;
- dirección aproximada;
- problema concreto;
- fotos si aplica;
- fecha deseada;
- presupuesto aproximado;
- disponibilidad.

La IA analiza:

- tipo de trabajo;
- urgencia;
- desplazamiento;
- materiales o datos faltantes;
- si conviene visita previa.

Propuesta inicial posible:

> "Gracias por la información. Para darte una respuesta útil necesito foto,
> ubicación aproximada y disponibilidad. Con eso podré decirte si encaja y qué
> siguiente paso tendría sentido."

---

## 14. Flujo Candado aplicado

El Flujo Candado evita que el sistema se convierta en una caja negra.

Paso a paso:

1. Entra una solicitud.
2. La guardas.
3. La IA genera análisis y propuesta inicial.
4. Tú revisas.
5. Si algo falla, pides corrección a la IA.
6. Preparas respuesta final.
7. Envías tú.
8. Registras aprendizaje.

Ejemplo de corrección:

```text
Revisa la propuesta anterior. El tono está demasiado vendedor y promete plazo
sin datos suficientes. Reescríbela con tono más prudente, manteniendo preguntas
faltantes y dejando claro que el alcance se confirma después.
```

Regla principal:

> La IA prepara. Tú revisas. El cliente recibe una respuesta humana.

Usa:

`templates/flujo-candado-solicitudes.md`

---

## 15. Cómo convertirlo en oferta vendible

Este sistema puede venderse como servicio si lo presentas bien.

No lo presentes como "te pongo IA y ya está".

Preséntalo como:

- sistema de captación ordenada;
- análisis inicial de solicitudes;
- preparación de respuestas revisables;
- reducción de trabajo manual repetitivo;
- mejor filtrado antes de presupuestar.

Rangos orientativos según complejidad:

- versión simple con formulario + prompt + plantilla: precio bajo/medio;
- versión con hoja organizada y guía de uso: precio medio;
- versión con automatización parcial en Make, Zapier, n8n o Telegram: precio
  superior, solo si está bien probado.

No prometas:

- ventas;
- cierre automático;
- atención sin revisión;
- integraciones críticas sin auditar;
- resultados iguales en todos los negocios.

Cómo enseñarlo con demo:

1. Muestra el formulario.
2. Rellena una solicitud simulada.
3. Enseña cómo se guarda.
4. Pega la solicitud en el prompt.
5. Muestra resumen, datos faltantes y propuesta.
6. Enseña la revisión humana.
7. Enseña la respuesta final.

Una demo simple y honesta vende mejor que una promesa grande.

---

## 16. Prueba real con 3 solicitudes simuladas

Antes de enseñar o vender el sistema, pruébalo.

Usa tres solicitudes:

### Solicitud fácil

Cliente con problema claro, presupuesto aproximado y urgencia razonable.

Objetivo:

- comprobar que el sistema resume bien;
- comprobar que la propuesta no se complica.

### Solicitud incompleta

Cliente con pocas respuestas y datos confusos.

Objetivo:

- comprobar que la IA no inventa;
- comprobar que detecta preguntas faltantes.

### Solicitud difícil

Cliente con expectativas poco realistas, urgencia alta o integración delicada.

Objetivo:

- comprobar que el sistema detecta riesgos;
- comprobar que la respuesta mantiene límites.

Usa:

`templates/demo-solicitudes-simuladas.md`

---

## 17. Checklist final

Tu sistema queda listo si puedes marcar:

- formulario creado;
- respuestas guardadas;
- prompt procesador listo;
- plantilla de respuesta lista;
- prueba con tres solicitudes hecha;
- revisión humana aplicada;
- ejemplo de demo preparado.

El sistema no tiene que ser perfecto. Tiene que ser comprensible, útil y
revisable.

---

## 18. Garantía de calidad

Garantía de calidad — 14 días. Si después de recibir el material consideras que
no entrega lo prometido en la página de venta, te devolvemos el 100% del importe
en los 14 días siguientes a la compra.

La garantía cubre la calidad y completitud del material descargable. No cubre
resultados económicos ni la ejecución incorrecta por parte del comprador.

---

## 19. Próximo paso

Si quieres construir con más ritmo, revisar tu sistema y mejorar tus flujos con
otros builders, el siguiente paso es Builder Pass / Sábados Builder.

Builder Pass no sustituye este trabajo. Lo acelera:

- revisas tu sistema con más criterio;
- aprendes viendo otros casos;
- mejoras prompts y formularios;
- conviertes una demo básica en algo más robusto.

Por ahora, termina este pack. Construye el sistema pequeño. Pruébalo. Enséñalo.
Y mejora desde una base real.
