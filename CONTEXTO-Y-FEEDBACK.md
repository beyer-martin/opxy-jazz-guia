# Contexto y feedback de la guía

## Para quién es

La persona usuaria tocó saxofón durante años, olvidó buena parte de escalas y teoría, y está empezando piano. Tiene un OP–XY, no un OP–1. Busca componer jazz, armonías, secuencias e improvisación para divertirse y entender el porqué. No quiere ejercicios de canto.

La guía pasó de un PDF inicial de 24 páginas a HTML/CSS/JS interactivo. Usa la guía oficial de Teenage Engineering como referencia visual y emplea una foto real del OP–XY con overlays programáticos; no usa imágenes IA para representar el teclado.

## Estado implementado

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

## Próximos pasos y criterios de aceptación

La prioridad es una QA visual real, en escritorio y viewport angosto, de: índice, e1, e5, e8 y e13. Revisar jerarquía, intro, legibilidad de diagramas, LEDs, navegación, overflow horizontal y contraste. Mantener intactos C/localStorage, audio, 16 talleres/96 actividades y las duraciones musicales.

No se realizaron capturas falsas. Browser Use bloqueó de forma explícita la URL `file://` local y prohibió vías alternativas; cambiar permisos de archivos no modificó esa política. Un agente futuro puede verificar las herramientas/permisos disponibles, sin asumir que ese bloqueo siga vigente ni eludirlo.
