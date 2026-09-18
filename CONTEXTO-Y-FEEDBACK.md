# Contexto y feedback de la guía

## Paleta fiel a Teenage Engineering · 14 de septiembre de 2026

A pedido del usuario, el taller integrado adopta los negros y grises de la referencia OP–XY original. Se reemplazan los fondos marrones y los acentos salmón, turquesa, lila y dorado por grises; los estados actuales conservan contraste, bordes y etiquetas. `te_palette.css` centraliza los colores y se incorpora también al final de la reconstrucción del estilo original para evitar que las hojas anteriores reintroduzcan acentos. Se revisaron visualmente los capítulos 4 y 5 en escritorio y a 390 px: teoría, selección de acordes y diagramas legibles, sin desborde ni errores de consola. No se modificaron contenido, distribución ni almacenamiento.

## Taller integrado aprobado · 14 de septiembre de 2026

El usuario rechazó el exceso de minimalismo y aprobó el ejemplo de taller integrado con más teoría musical. Esta decisión reemplaza la presentación anterior de una sola tarjeta con el resto del contenido fuera de vista. Se aplicó a la guía real: contexto de la pieza, seis pasos navegables, actividad actual destacada y teoría al lado del OP–XY. Se mantienen cinco piezas, 16 capítulos, 96 actividades y 30–60 minutos por sesión; no se incorpora el saxo.

`integrated_theory.js/.css` aporta explicaciones musicales específicas por capítulo. En el capítulo 5, el laboratorio interactivo explica raíz/tercera/quinta, semitonos y fórmulas mayor/menor sin repetir un bloque teórico estático. Incluye notas audibles, C/Am, C→Cm, función de Mi y transferencia Re menor→Re mayor. Las consultas y extensiones siguen disponibles. En móvil hay accesos directos a teoría, instrumento y consigna.

El diseño conserva los nodos y el almacenamiento del editor. El avance completado usa una clave aparte; visitar un paso no lo marca como hecho. Se corrigió además la preescucha A/B para usar el tempo del modelo y conservar el tempo de C. La prueba de regresión comprueba los tiempos del reproductor y que la composición guardada no cambie.

Verificación real en el navegador, con datos de prueba en un origen local separado del archivo del usuario: acorde desde las teclas del OP–XY, cambio de nota conservando duración, recarga, comparación con referencia propia, ensayo teórico independiente, Re menor→Re mayor, ocultar/mostrar notas, cierre y navegación entre capítulos. Capturas revisadas en escritorio y a 390 px; capítulos 1, 4, 5, 8, 13 y 16 sin desborde horizontal. Consola sin errores ni advertencias. La validación de audio comprueba eventos y reproducción técnica; no sustituye una escucha humana del resultado.

## Feedback validado en prueba del HTML · 14 de septiembre de 2026

El usuario aceptó los cinco primeros puntos de `FEEDBACK-PRUEBA-NOVATO-HTML.md` y rechazó expresamente integrar el saxo. No añadir una vía curricular de saxo a partir de su perfil instrumental.

La revisión implementa una actividad visible con consigna, minutos y resultado, retomable al recargar; acceso directo a C editable; movimiento de ataques conservando notas y duración; referencia propia por capítulo para comparar y recuperar; puentes manipulables entre grados, intervalos y semitonos; y escucha guiada de una nota sobre dos acordes, con ayuda si todavía no se distingue el efecto. Se conservan cinco piezas, 16 capítulos, 96 actividades y 30 minutos de núcleo por capítulo.

Fuentes nuevas: `work/pdf/workshop_flow.js/.css`, `composition_tools.js/.css` y `theory_tools.js/.css`, integradas por `build_html.py`. `lesson_lab.js` mantiene eventos, audio y almacenamiento existentes. Las referencias propias usan una clave local separada y la actividad actual otra; no sustituyen las ideas anteriores.

Verificación: reconstrucción final y checks de router/laboratorio aprobados, incluyendo referencia independiente, movimiento sin pérdidas, rollback y tempo/fraseo de cada versión. En navegador se probaron la continuación del material de prueba anterior, referencia versus variante, persistencia de actividad, cierre, herramientas de teoría, transferencia a Re menor y parada de audio al navegar. Vista de teoría a 390 px sin desborde; consola sin errores ni advertencias. Las dos copias de la guía final son idénticas. Detalles en el informe de feedback.

## Revisión curricular · 14 de septiembre de 2026

La preferencia actual del usuario reemplaza la idea de una única canción durante 16 capítulos. Quiere avanzar 30–60 minutos por día, terminar canciones en ciclos breves y adquirir capacidad para componer cada vez mejor por su cuenta. Eligió mezclar temas instrumentales con melodía/armonía y grooves para improvisar.

La ruta actual tiene cinco piezas independientes: capítulos 1–3, 4–6, 7–9, 10–12 y 13–16. Dentro de cada ciclo se continúa la misma pieza; entre ciclos se transfieren habilidades con material nuevo. Los productos mínimos tienen 4/4/4/8/8 compases, con cierre intencional. Son miniaturas; no se promete una producción extensa terminada en dos días.

Cada capítulo tiene seis actividades que suman 30 minutos y una profundización opcional de otros 30: ocho horas de núcleo, dieciséis si se hacen todas las extensiones. Tiempo orientativo, sin tareas obligatorias escondidas fuera de sesión. La ayuda disminuye y cada cierre incluye una prueba concreta de decisión independiente.

Fuentes curriculares: `CURRICULA-POR-CANCIONES.md` (diseño completo) y `opxy-curriculum-16h.md` (resumen actualizado; nombre histórico). En el visor, C puede continuar desde el capítulo anterior dentro del ciclo y copiar un compás con todas sus pistas. Las versiones fuente se conservan. La reproducción mantiene tempo y swing propios al continuar. Las comparaciones, el ocultamiento de notas y los mensajes ante fallos de guardado se revisaron junto con la currícula.

La ruta de una sola canción, los 60 minutos obligatorios por taller y los hitos CANCIÓN-01→06 que aparecen en el historial siguiente son decisiones anteriores, no la dirección actual.

## Verificación de esta revisión

- Pasaron `check_router.cjs` y `check_lesson_lab.cjs`: 22 páginas, 16 capítulos/96 actividades, 30 minutos por núcleo, continuación y copia sin mutar la fuente, persistencia de tempo/swing, datos anteriores compatibles, rollback ante fallos de guardado y audio con final/exclusividad en WebAudio simulado.
- Se reconstruyeron ambos HTML y se comprobó que la salida final de la raíz coincide con `outputs/`, sin IDs estáticos duplicados ni marcadores pendientes de generación.
- QA real en navegador local: se inspeccionaron capturas del índice en escritorio y a 390 px, del capítulo 5 en escritorio y del 13 a 390 px. Se midieron también los capítulos 1, 8 y 13: ancho de documento igual al viewport de 390 px, sin desborde global. El índice queda oculto al abrir un capítulo. No hubo errores de consola en la comprobación final.
- La revisión encontró y corrigió una copia que habría reemplazado acordes en capítulo 7, una descripción desactualizada del swing en 10 y una transición de 12 que no contemplaba acompañamiento sostenido. Las pruebas de audio verifican comportamiento técnico; no hubo escucha humana de los sonidos del OP–XY.

## Para quién es

La persona usuaria tocó saxofón durante años, olvidó buena parte de escalas y teoría, y está empezando piano. Tiene un OP–XY, no un OP–1. Busca componer jazz, armonías, secuencias e improvisación para divertirse y entender el porqué. No quiere ejercicios de canto.

La guía pasó de un PDF inicial de 24 páginas a HTML/CSS/JS interactivo. Usa la guía oficial de Teenage Engineering como referencia visual y emplea una foto real del OP–XY con overlays programáticos; no usa imágenes IA para representar el teclado.

## Estado anterior a la revisión por canciones

- 16 talleres, 96 actividades y unas 16 horas de práctica estimada; no promete nivel profesional en 16 horas.
- Navegación por hash: 16 lecciones y 6 páginas de referencia; índice por defecto, una página visible por vez, y anclas internas que revelan su contenedor.
- Tres etapas: entender, experimentar, crear. La teoría profunda se conserva en detalles y pestañas.
- Simulador con 8 pistas, 16 pasos, 24 teclas, navegación BAR, A/B fijos y C editable persistente.
- Maqueta local de 8 compases, transferencias por pista/rango y snapshots. Guardar en OP–XY mediante PROJECT → M2 sigue siendo un paso separado.
- Diagramas: pulso, intervalos, tríada/C→Am, conducción de voces, ii–V–I, forma y roles por pista/compás.
- Audio WebAudio de piano sintetizado: cuatro parciales, brillo/decays por registro, sustain, release y colas finales. No es un piano acústico sampleado.

## Feedback histórico y respuesta

| Feedback | Estado |
|---|---|
| PDF feo/confuso; etiquetas como “Pista 1: batería” no orientaban | Resuelto mediante talleres, roles y simulador contextual. |
| No cantar; aclarar el secuenciador y qué tecla tocar | Vigente en contenido: no hay canto; teclado y pasos tienen overlays/inspector. |
| Índice extraño o superpuesto | Implementado programáticamente como índice/páginas por hash; pendiente validación visual real. |
| LEDs y marcadores confusos; anillo punteado invisible | Marcador blanco fuerte y estados separados; pendiente validación visual real. |
| BAR amarillo rechazado; falta explicar configuración y cambio de compás | Resuelto en guía BAR y navegación de compases. |
| Cuatro celdas no expresaban flujo temporal | Resuelto con pasos, eventos, duración y diagramas temporales. |
| Faltaba reproductor, A/B/C, teoría, ejemplos y proyecto multinstrumental | Implementado y probado programáticamente. |
| Menos texto, más jerarquía, intro, diagramas, páginas | Implementado; títulos Arial bold y páginas. Pendiente revisión visual. |
| Audio básico y acordes que desaparecían | Se corrigió sustain/release/colas; pruebas temporales. No hubo escucha humana de QA. |

## Precisión musical

En el modelo actual un evento no puede atravesar el límite del compás (`len` máximo hasta el paso 16). Cuatro pulsos en 4/4 equivalen a un compás; no se debe afirmar que el editor ya admite una nota individual de cuatro compases. La expansión de canción propuesta es A(8)–A′(8)–B(8)–A″(8), ocho escenas de cuatro compases. Copiar una escena no independiza patrones: hay que copiar patrón antes de variarlo.

## Fuentes y referencias integradas

- Teenage Engineering: [layout](https://teenage.engineering/guides/op-xy/layout), PROJECT y sequencer.
- Ableton Learning Music: escalas mayores, acordes, estructura, [Get Up Stand Up](https://learningmusic.ableton.com/chords/get-up-stand-up.html), [We Will Rock You](https://learningmusic.ableton.com/make-beats/we-will-rock-you.html), [Around the World](https://learningmusic.ableton.com/make-basslines/around-the-world.html).
- Fuentes curriculares adicionales se listan por taller dentro de la guía y en `opxy-curriculum-16h.md`.

## Criterios de la entrega anterior

La prioridad es una QA visual real, en escritorio y viewport angosto, de: índice, e1, e5, e8 y e13. Revisar jerarquía, intro, legibilidad de diagramas, LEDs, navegación, overflow horizontal y contraste. Mantener intactos C/localStorage, audio, 16 talleres/96 actividades y las duraciones musicales.

No se realizaron capturas falsas. Browser Use bloqueó de forma explícita la URL `file://` local y prohibió vías alternativas; cambiar permisos de archivos no modificó esa política. Un agente futuro puede verificar las herramientas/permisos disponibles, sin asumir que ese bloqueo siga vigente ni eludirlo.


## Simplificación después de la prueba de uso · 14 de septiembre de 2026

El usuario señaló que seguía sin entender qué debía hacer: había actividades arriba y demasiadas cosas debajo. La primera simplificación no resolvía el problema, porque colocaba la consigna sobre el editor completo. No se incorporaron actividades de saxofón; el usuario rechazó esa propuesta.

La interfaz actual reúne consigna, explicación breve, herramienta y continuación en una sola tarjeta. `activity_focus.js` define los controles de las 96 actividades. Sólo se muestra la actividad actual; la ayuda completa abre un diálogo y la escucha guiada opcional se despliega bajo demanda. Los primeros pasos muestran pulsos, grilla y una sola tecla Do según corresponda. Las herramientas de comparación, copia, octava y reflexión aparecen cuando la tarea las necesita.

Se conservaron los nodos y manejadores del editor para mantener compatibilidad con las composiciones anteriores. La revisión detectó y corrigió una pérdida de duración al quitar y reponer la única altura de un ataque, incluida la operación «vaciar este paso». Se agregó una prueba de regresión. Las consignas de escucha se ajustaron al reproductor real, que comienza desde el primer compás.

Verificación en navegador local de prueba: cuatro pulsos, ingresar una nota, reproducir en bucle, detener al avanzar, mover un ataque, alternar referencia propia, abrir/cerrar ayuda, reproducir un modelo y escuchar la comparación de acordes. El sexto paso del capítulo 16 sigue accesible después de documentar la pieza en el quinto. Capturas revisadas en escritorio y a 390 px; una tarjeta visible y ningún desborde global en la actividad inicial. No hubo errores o advertencias de consola. Las pruebas técnicas no sustituyen la validación del usuario sobre claridad ni una escucha humana del audio.
