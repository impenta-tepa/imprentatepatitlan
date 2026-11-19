# Quad Print Tepatitlán — página web

**Versión 1.0 publicada; Fase 2 en `borrador`** · 19 de noviembre de 2026

Sitio estático de Quad Print Tepatitlán, publicado en:

**https://impenta-tepa.github.io/imprentatepatitlan/**

Repositorio: `impenta-tepa/imprentatepatitlan` (rama `main`). Cada push a `main` ejecuta GitHub Actions, genera `_site` y publica en GitHub Pages.

## Qué se tomó de cada proyecto

| Origen | Uso |
|---|---|
| LIGHT | Base técnica: HTML estático, pipeline Node/Sharp, promociones, SEO, 404 y datos oficiales. |
| Figma | Dirección visual: composición editorial, Manrope/DM Sans, acentos CMYK, tarjetas y bloques negros. |
| Go | Referencia de taxonomía y concepto de catálogo; no se importaron sus precios ni sus datos comerciales. |
| Editor Go | Solo referencia conceptual; no se reutilizó código. |

## Datos del negocio

Datos contrastados con la página de Facebook `IMPRENTATEPA`:

- Quad Print Tepatitlán
- 21 de Marzo 603-B, Colonia Del Carmen, Tepatitlán de Morelos, Jalisco
- Teléfono / WhatsApp: **378 109 7423** (`+52 378 109 7423`) para llamadas y WhatsApp; **378 101 1768** (`+52 378 101 1768`) también recibe WhatsApp. Ambos números fueron confirmados por el dueño.
- Correo: imprentatepa@gmail.com (Facebook). LIGHT mostraba `imprenta.tepa@gmail.com`; Gmail ignora los puntos, así que ambos llegan a la misma cuenta. Se muestra la forma de la página de Facebook.
- Lunes a viernes 10:00–14:00 / 16:00–20:00; sábados 10:00–14:00; domingos con cita previa
- Efectivo y SPEI; facturación CFDI
- Facebook: https://www.facebook.com/IMPRENTATEPA/

No se usaron la dirección de Go, los horarios de Figma ni sus textos de «Imprenta Independencia».

> Nota: si «página flash» se refiere a otro sitio y no a la página de Facebook, hay que reemplazar esta tabla.

## Estructura

- `index.html`: página completa, con el orden de la Fase 2 (hero, confianza, servicios, destacadas, catálogo, foráneos, formatos, contacto, cierre y footer).
- `css/estilos.css`: diseño nuevo, sin Bootstrap.
- `js/sitio.js`: menú móvil, catálogo, búsqueda, visor y cotización.
- `data/promociones.js`: fuente única de las 19 promociones y las 6 macrocategorías.
- `docs/`: plan, funcionamiento, formato de promociones y notas.
- `promociones/`: imágenes originales.
- `scripts/`: build, derivados, servidor local y verificación.
- `fonts/`: Manrope y DM Sans locales.
- `LOGOS/`: logotipos y favicon.
- `.github/workflows/pages.yml`: build y publicación automática en GitHub Pages.

## Comandos

```bash
npm install
npm run build      # genera _site y derivados 800/1600 WebP + JPG
npm start          # http://localhost:4173
npm run verificar  # revisa manifiesto, rutas, SEO y derivados
```

Si no existe `node_modules`, ejecutar `npm install`. En GitHub Actions se ejecuta `npm ci`.

## Publicación

- Versión publicada: 1.0 (etiqueta de Git `v1.0`).
- Fase 1 publicada: merge `8523497` (sitio) y registro `819fbe9` (documentación).
- URL: https://impenta-tepa.github.io/imprentatepatitlan/
- Repositorio: https://github.com/impenta-tepa/imprentatepatitlan
- Rama de publicación: `main`.
- Flujo: `.github/workflows/pages.yml` ejecuta `npm ci`, `node scripts/preparar.mjs` y publica `_site` con GitHub Pages.
- Respaldo del sitio anterior: rama `respaldo-antes-quad-print-2026-11-16`.
- Para actualizar: editar, ejecutar `npm run build`, `npm run verificar`, hacer commit y push a `main`.
- No se sube `_site` ni `node_modules`; GitHub Actions los genera en cada publicación.
- **Fase 2:** implementada y verificada en `borrador`; **no publicada en `main`** hasta que el dueño/asesor la apruebe.

## Promociones

La fuente única es `data/promociones.js`. Ahí viven el título, la categoría, las etiquetas, la descripción, el precio, la unidad, el IVA, la vigencia, la imagen, el texto alternativo, si es destacada y si está activa. El catálogo, las destacadas y el visor se generan desde ese archivo; no hay que tocar HTML, CSS ni JS.

Para una promoción nueva:

1. Guardar la imagen en `promociones/` (ideal: 1080 x 1350 px, proporción 4:5, WebP menor a 150 KB, solo producto sobre fondo limpio, sin texto ni precio dentro de la imagen).
2. Agregar su objeto en `data/promociones.js` con un `id` nuevo.
3. Ejecutar `npm run build` y `npm run verificar`.

La tarjeta usa un marco fijo 4:5 y reserva el espacio con `width="800" height="1000"` para evitar CLS. Las 19 imágenes cuadradas actuales se detectan y se muestran completas con `object-fit: contain`; cuando llegue el arte 4:5, se mostrarán con `object-fit: cover` sin tocar código.

Para cambiar precio, vigencia, destacada o activa, editar solo ese objeto. El detalle está en `docs/promociones-format.md`.

No editar `_site/` ni los derivados: se generan en cada build.

## Pendientes

- Llenar precios, unidades, IVA y vigencia en `data/promociones.js`; hoy están en `null` y marcados como TODO-DOMINGO.
- Re-exportar las 19 imágenes a 1080 x 1350 px, 4:5, WebP menor a 150 KB, sin texto ni precio.
- Confirmar con el dueño cuál número es el WhatsApp principal de todos los botones.
- Entregar 6 fotos de servicio (una por categoría) y una foto real para el hero.
- Entregar 3 testimonios reales con nombre y negocio, y fotos propias para la galería.
- Decidir si se mantiene el catálogo solo con promociones reales o se agrega un catálogo de productos con fotografías definitivas.
- Fase 3: pulir rendimiento (minificación, CSS crítico, fuentes), accesibilidad y SEO.
