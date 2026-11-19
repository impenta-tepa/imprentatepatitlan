# Quad Print Tepatitlán — página web

**Fase 3 publicada y verificada en vivo** · 19 de noviembre de 2026

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
npm run build      # genera _site, derivados de imagen y minifica CSS/JS/fuentes
npm start          # http://localhost:4173
npm run verificar  # revisa fichas, rutas, SEO, derivados y estructura
```

Si no existe `node_modules`, ejecutar `npm install`. En GitHub Actions se ejecuta `npm ci`.

## Publicación

- Versión publicada: 1.0 (etiqueta de Git `v1.0`).
- Fase 3 publicada: merge `767f87b` (sitio y documentación) y run `44553795932`.
- Fase 2 publicada: merge `1a84847` (sitio) y run `44471747493`.
- URL: https://impenta-tepa.github.io/imprentatepatitlan/
- Repositorio: https://github.com/impenta-tepa/imprentatepatitlan
- Rama de publicación: `main`.
- Flujo: `.github/workflows/pages.yml` ejecuta `npm ci`, `node scripts/preparar.mjs` y publica `_site` con GitHub Pages.
- Respaldo del sitio anterior: rama `respaldo-antes-quad-print-2026-11-16`.
- Para actualizar: agrupar los cambios, ejecutar `npm run build` y `npm run verificar` en local, hacer un solo commit y push a `main`.
- No se sube `_site` ni `node_modules`; GitHub Actions los genera en cada publicación.
- **Fase 3:** publicada y verificada en vivo. Incluye logo optimizado, minificación, lazy render, safe areas, tap targets, foco al catálogo y menú `inert`. PSI móvil 98/100/100/100 y escritorio 100/100/100/100.

## Límites de GitHub Pages (plan gratuito)

- **10 compilaciones por hora.** No hacer un push por cada ajuste pequeño. Agrupar los cambios en un solo commit/push.
- **1 GB máximo** para el sitio y el repositorio.
- **100 GB de ancho de banda al mes.**
- Antes de publicar: ejecutar `npm run build` y `npm run verificar` en local; subir solo cuando el cambio esté completo.
- Optimizar las imágenes antes de subirlas: WebP o JPG ligero, ideal 1080 x 1350 px y menos de 150 KB. Evitar originales pesados.
- No subir `_site/` ni `node_modules/`; se generan en el build.
- Si después de publicar aparece otro ajuste, esperar y agrupar varios cambios; no hacer despliegues continuos.

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
- Entregar el SVG del logo para sustituir el WebP/PNG interino.
- Probar en un Android de gama media y, si hay, en iPhone/Safari real; el agente solo tiene emulación.
