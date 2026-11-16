# Quad Print Tepatitlán — página web

**Versión 1.0** · 16 de noviembre de 2026

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

- `index.html`: página completa.
- `css/estilos.css`: diseño nuevo, sin Bootstrap.
- `js/sitio.js`: menú móvil, catálogo, búsqueda, visor y cotización.
- `datos/catalogo.js`: títulos, categorías y descripciones de las 19 promociones.
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

- Versión: 1.0 (etiqueta de Git `v1.0`).
- Commit del sitio: `4cd3c5e`.
- URL: https://impenta-tepa.github.io/imprentatepatitlan/
- Repositorio: https://github.com/impenta-tepa/imprentatepatitlan
- Rama de publicación: `main`.
- Flujo: `.github/workflows/pages.yml` ejecuta `npm ci`, `node scripts/preparar.mjs` y publica `_site` con GitHub Pages.
- Respaldo del sitio anterior: rama `respaldo-antes-quad-print-2026-11-16`.
- Para actualizar: editar, ejecutar `npm run build`, `npm run verificar`, hacer commit y push a `main`.
- No se sube `_site` ni `node_modules`; GitHub Actions los genera en cada publicación.

## Promociones

El flujo se conserva: se agrega, reemplaza o elimina una imagen en `promociones/`, se ejecuta el build y la galería se regenera. El buscador lee el nombre del archivo, además del título y la descripción de `datos/catalogo.js`.

Para una promoción nueva:

1. Guardar la imagen cuadrada en `promociones/` con un nombre descriptivo y sin acentos raros.
2. Agregar su entrada en `datos/catalogo.js` con título, categoría, descripción y orden.
3. Ejecutar `npm run build`.

No editar `datos/promociones.js`: se genera automáticamente.

## Pendientes

- Validar precios y vigencias de las promociones; están dentro de las imágenes y cambian con el tiempo.
- Decidir si se mantiene el catálogo solo con promociones reales o se agrega un catálogo de productos con fotografías definitivas.
- Confirmar servicios y textos comerciales con el dueño.
- Confirmar que la página de Facebook es la fuente correcta de datos o sustituir la tabla si «página flash» era otro sitio.
- Aplicar los ajustes visuales o de contenido que pida el dueño después de la publicación.
