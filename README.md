# Quad Print Tepatitlán — nueva página

Carpeta nueva, independiente de los cuatro proyectos auditados. No tiene repositorio Git ni configuración de publicación: es una copia de trabajo para revisar la propuesta antes de autorizar cualquier despliegue.

## Qué se tomó de cada proyecto

| Origen | Uso |
|---|---|
| LIGHT | Base técnica: HTML estático, pipeline Node/Sharp, promociones, SEO, 404 y datos oficiales. |
| Figma | Dirección visual: composición editorial, Manrope/DM Sans, acentos CMYK, tarjetas y bloques negros. |
| Go | Referencia de taxonomía y concepto de catálogo; no se importaron sus precios ni sus datos comerciales. |
| Editor Go | Solo referencia conceptual; no se reutilizó código. |

## Datos del negocio

Se mantienen los datos de LIGHT, contrastados con la página de Facebook `IMPRENTATEPA`:

- Quad Print Tepatitlán
- 21 de Marzo 603-B, Colonia Del Carmen, Tepatitlán de Morelos, Jalisco
- Teléfono / WhatsApp: **378 109 7423** (`+52 378 109 7423`) para llamadas y WhatsApp; **378 101 1768** (`+52 378 101 1768`) también recibe WhatsApp. Ambos números fueron confirmados por el dueño.
- Correo: imprentatepa@gmail.com (Facebook). LIGHT mostraba `imprenta.tepa@gmail.com`; Gmail ignora los puntos, así que ambos llegan a la misma cuenta. Se muestra la forma de la página de Facebook.
- Lunes a viernes 10:00–14:00 / 16:00–20:00; sábados 10:00–14:00; domingos con cita previa
- Efectivo y SPEI; facturación CFDI
- Facebook: https://www.facebook.com/IMPRENTATEPA/

No se usaron la dirección de Go, los horarios de Figma ni sus textos de «Imprenta Independencia».

> Nota: si «página flash» se refiere a otro sitio y no a la página de Facebook, hay que reemplazar esta tabla antes de publicar.

## Estructura

- `index.html`: página completa.
- `css/estilos.css`: diseño nuevo, sin Bootstrap.
- `js/sitio.js`: menú móvil, catálogo, búsqueda, visor y cotización.
- `datos/catalogo.js`: títulos, categorías y descripciones de las 19 promociones.
- `promociones/`: imágenes originales.
- `scripts/`: build, derivados, servidor local y verificación.
- `fonts/`: Manrope y DM Sans locales.
- `LOGOS/`: logotipos y favicon.

## Comandos

```bash
npm install
npm run build      # genera _site y derivados 800/1600 WebP + JPG
npm start          # http://localhost:4173
npm run verificar  # revisa manifiesto, rutas, SEO y derivados
```

`node_modules` ya está copiado desde la copia de trabajo de LIGHT para poder compilar sin instalar nada. Si se mueve la carpeta a otro equipo, ejecutar `npm install`.

## Promociones

El flujo se conserva: se agrega, reemplaza o elimina una imagen en `promociones/`, se ejecuta el build y la galería se regenera. El buscador lee el nombre del archivo, además del título y la descripción de `datos/catalogo.js`.

Para una promoción nueva:

1. Guardar la imagen cuadrada en `promociones/` con un nombre descriptivo y sin acentos raros.
2. Agregar su entrada en `datos/catalogo.js` con título, categoría, descripción y orden.
3. Ejecutar `npm run build`.

No editar `datos/promociones.js`: se genera automáticamente.

## Pendientes antes de publicar

- Confirmar que la fuente de datos correcta es la página de Facebook o, si es otra, sustituir la tabla.
- Validar precios y vigencias de las promociones; están dentro de las imágenes y cambian con el tiempo.
- Decidir si se mantiene el catálogo solo con promociones reales o se agrega un catálogo de productos con fotografías definitivas.
- Confirmar servicios y textos comerciales con el dueño.
- Revisar la propuesta visual en móvil y escritorio.
- Actualizar canonical, `og:url`, sitemap y JSON-LD con la URL definitiva. Ahora apuntan a `https://impenta-tepa.github.io/imprentatepatitlan/` como marcador, porque aún no hay dominio de publicación para esta carpeta.
- Autorizar cualquier publicación; esta carpeta no está conectada a GitHub Pages ni tiene flujo de despliegue.
