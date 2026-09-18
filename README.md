# OP–XY · composición y jazz

Guía interactiva en español rioplatense para aprender a componer con OP–XY: **cinco piezas nuevas, 16 capítulos y autonomía creciente**. Combina temas instrumentales y grooves para improvisar. Abrí `opxy-jazz-guia-estilo-original.html` en un navegador moderno.

## Recorrido

Cada capítulo propone 30 minutos de trabajo y hasta 30 de profundización opcional. Los primeros cuatro ciclos tienen tres capítulos (90 minutos cada uno); el quinto, cuatro (120 minutos). El núcleo suma ocho horas orientativas; con todas las extensiones, dieciséis.

Cada ciclo termina una miniatura: las tres primeras tienen cuatro compases; las dos últimas, ocho. El objetivo es poder empezar, desarrollar, escuchar, corregir y cerrar otra pieza con menos ayuda.

- `opxy-jazz-guia-estilo-original.html`: guía autónoma para abrir.
- `CURRICULA-POR-CANCIONES.md`: diseño pedagógico, competencias y criterios de autonomía.
- `opxy-curriculum-16h.md`: resumen del recorrido; conserva su nombre histórico.
- `outputs/`: salidas de los generadores.
- `work/pdf/`: fuentes y verificaciones.
- `CONTEXTO-Y-FEEDBACK.md`: contexto y decisiones de la revisión.

## Reconstrucción

Requiere Python 3 con Pillow y lxml, y Node.js. Desde esta carpeta:

```sh
python3 work/pdf/build_html.py
python3 work/pdf/reuse_te_layout.py
node work/pdf/check_router.cjs
node work/pdf/check_lesson_lab.cjs
```

La reconstrucción actualiza tanto `outputs/` como la guía de la raíz. No requiere hosting para abrir el resultado.

## Paleta visual

El taller usa la paleta monocroma de la guía original OP–XY: fondo `#0f0e12`, texto `#b2b2b2` y destacados `#e5e5e5`. Los colores compartidos se definen en `work/pdf/te_palette.css`, a partir de la referencia oficial guardada en `work/pdf/reference-layout.html` y `work/pdf/te-reference/`. La actividad actual, las selecciones y las funciones musicales se distinguen también por bordes y etiquetas.

## Guardado y alcance

C se guarda por capítulo en el almacenamiento local del navegador. «Continuar mi C» copia la versión anterior dentro del mismo ciclo, con sus pistas, tempo y swing; no importa la pieza anterior al iniciar un ciclo nuevo. Copiar un compás conserva el original y permite variar el destino. Los reemplazos de contenido existente requieren confirmación.

Cada capítulo funciona como un taller integrado: contexto de la canción, seis pasos visibles y una consigna actual, con teoría musical junto al OP–XY interactivo. Recuerda el paso donde quedaste y marca los que completás con «Hecho, continuar». Las 96 actividades conservan herramientas específicas para copiar, mover, comparar o escuchar sin notas. Las teclas, duraciones, versiones y modelos se consultan dentro del taller; «Consultar el capítulo» abre el plan completo y la configuración del equipo. En pantallas chicas hay accesos directos entre consigna, teoría e instrumento. Mover un ataque conserva sus notas y duración; quitar y reponer una altura conserva la duración del ataque anterior.

«Conservar mi versión actual» guarda una referencia propia del capítulo. Podés alternarla con «Mi composición (C)» para escuchar el cambio y recuperarla si preferís el original. Las referencias incluyen tempo y fraseo y se guardan por separado de los modelos A/B.

Los 16 capítulos incluyen teoría ligada a la decisión musical del día. Los capítulos 3–6 también tienen ayudas manipulables para distinguir grados, intervalos y semitonos. El capítulo 5 permite escuchar cada nota de C y Am, comparar sus funciones, aislar la tercera con C→Cm y construir Re menor y Re mayor desde otra raíz. La elección de acordes incorpora una comparación guiada y una prueba más simple si todavía no distinguís el efecto.

Las ideas antiguas y los snapshots siguen siendo compatibles. Si una idea antigua ocupa más compases que el nuevo capítulo, el visor conserva ese espacio. Abrir el archivo desde otra dirección o navegador puede mostrar otro almacenamiento: las ideas no viajan dentro del HTML.

La simulación usa WebAudio y no reproduce los motores del OP–XY. No controla el equipo ni guarda proyectos en él. El trabajo de hardware se guarda por separado mediante PROJECT. Las notas del editor llegan como máximo al final del compás donde empiezan.
