# OP–XY · composición y jazz

Entrega local de una guía interactiva en español rioplatense para empezar a componer con OP–XY. Abrí `opxy-jazz-guia-estilo-original.html` directamente en un navegador moderno.

## Contenido

- `opxy-jazz-guia-estilo-original.html`: guía autónoma final para abrir.
- `outputs/`: copia de salida usada por los scripts de reconstrucción (debe permanecer junto a `work/`).
- `opxy-curriculum-16h.md`: ruta curricular resumida.
- `work/pdf/`: fuentes, generadores, pruebas y los assets de referencia necesarios para reconstruir la guía.
- `CONTEXTO-Y-FEEDBACK.md`: contexto de uso, decisiones, feedback y trabajo pendiente.

## Reconstruir

Se requiere Python 3 con `Pillow` y `lxml`, y Node.js. Desde esta carpeta:

```sh
python3 work/pdf/build_html.py
python3 work/pdf/reuse_te_layout.py
node work/pdf/check_router.cjs
node work/pdf/check_lesson_lab.cjs
```

Los scripts escriben los HTML en `outputs/`; la guía de la raíz es la copia lista para abrir y coincide con esa salida en esta entrega. En el entorno original se usaron runtimes empaquetados de Codex; cualquier Python/Node compatible sirve si cuenta con esas dependencias. No se necesita hosting ni conexión para abrir la guía final.

## Límites importantes

Las ideas C y snapshots se guardan en el `localStorage` del navegador y no están dentro de este paquete. Mover o abrir la guía desde otra URL puede hacer que esas ideas no aparezcan; no implica que se hayan borrado. Esta entrega no exporta ni lee datos privados del navegador.

La guía simula conceptos y audio WebAudio; no controla ni reemplaza el motor del OP–XY. La revisión visual real con capturas sigue pendiente.
