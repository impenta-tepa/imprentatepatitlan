# Quad Print Tepatitlán

Sitio estático con Bootstrap 5.3.9. No requiere base de datos. Bootstrap se carga desde jsDelivr.

## Operación diaria: ofertas sin tocar código

Todo se hace desde la carpeta `promociones/`. El buscador usa el nombre del archivo; no lee el texto dentro de la imagen.

### Agregar una oferta

1. En GitHub, abre `promociones` → **Add file** → **Upload files**.
2. Selecciona el JPG (o PNG/WebP/GIF/AVIF) y confirma con **Commit changes** en `main`.
3. Espera a que Actions termine (~1 min) y recarga la web.

### Quitar una oferta

1. Abre la imagen dentro de `promociones`.
2. Usa el icono de eliminar y confirma el commit en `main`.
3. La tarjeta desaparece y las demás ocupan su lugar.

### Pausar una oferta (sin borrarla)

1. Abre la imagen dentro de `promociones`.
2. Usa el lápiz de edición y cambia el nombre a `pausadas/tazas caja.jpg`. GitHub crea la subcarpeta al guardar.
3. Confirma el commit. El escáner solo lee archivos sueltos en `promociones/`, así que la oferta deja de aparecer.
4. Para reactivarla, edita el nombre y quita `pausadas/`.

### Renombrar una oferta

1. Abre la imagen y usa el lápiz de edición.
2. Cambia el nombre: minúsculas, guiones y palabras que el cliente buscaría. Conserva la extensión original (`.jpg` en estas ofertas).
3. Confirma el commit. El título, el `alt`, el buscador y el mensaje de WhatsApp se actualizan solos.

### Reglas de nombres

- Para nombres nuevos usa minúsculas y guiones: `tazas-personalizadas.jpg`, `termos-personalizados-30-oz.jpg`.
- Los archivos existentes con espacios siguen funcionando; no hace falta renombrarlos todos.
- No uses acentos raros, símbolos ni espacios al inicio. La extensión debe ser una de: JPG, JPEG, PNG, WebP, GIF o AVIF.
- **Nunca edites `datos/promociones.js`: es generado automáticamente.**

## Qué hace el build

`node scripts/preparar.mjs` lee `promociones/`, escribe `datos/promociones.js`, copia los archivos públicos a `_site/` y genera los derivados en `_site/derivados/`:

- Cada oferta: miniatura de 800 px en WebP y JPG de respaldo.
- Banner: variantes de 1600 y 800 px.
- Foto del local: variante de 960 px.

Los derivados viven **fuera de `promociones/`** a propósito. Si estuvieran dentro, el escáner los tomaría como ofertas nuevas y duplicaría la galería. En local se guardan en `.cache/derivados/`, que está ignorada por git. Los originales de las ofertas se conservan porque el visor y “Abrir imagen original” los usan. En local, borra `_site/` antes de rehacer el build: el script no reutiliza una publicación anterior.

## Vista previa local

Instala una sola vez las dependencias:

```bash
npm install
```

Arranca el servidor:

```bash
node scripts/servir.mjs
```

Abre http://localhost:4173. Al agregar, quitar, pausar o renombrar imágenes, solo recarga la página: el servidor actualiza el listado y genera la miniatura bajo demanda. En GitHub, el cambio aparece después del push y del build (~1 min).

## Instalación única de dependencias

`npm install` es parte del setup inicial, no una tarea diaria. Instala `sharp`, que genera las miniaturas. En GitHub Actions el workflow ejecuta `npm ci` antes de `node scripts/preparar.mjs`; no tienes que instalar nada a mano en el servidor.

## Publicación

1. Haz commit en `main` (o usa **Upload files**).
2. Abre **Actions** y espera a que “Actualizar ofertas y publicar” termine en verde.
3. Recarga la URL de GitHub Pages. El build tarda aproximadamente 1 minuto.

## Troubleshooting

- **No aparece una oferta**: revisa que la extensión sea válida, que el archivo esté directamente en `promociones/` y no dentro de una subcarpeta (salvo que esté pausada). Si acabas de renombrar, borra el buscador y recarga.
- **Build rojo en Actions**: abre la ejecución fallida y revisa el paso “Detectar imágenes y preparar página”. Suele ser una imagen corrupta o una dependencia sin instalar; el workflow ya ejecuta `npm ci`.
- **No aparece la foto o el banner**: no son ofertas de la galería; son piezas fijas de la portada y de contacto. Se regeneran desde `banner.jpg` y `foto real del local.jpg`.
- **Se ve borroso**: la imagen original es más pequeña que el tamaño de visualización. Sube una versión de mayor resolución.
- **No veo mi cambio**: espera al despliegue, recarga sin caché y confirma que el commit llegó a `main`.

## Banner y foto del local

- `banner.jpg` alimenta las variantes 1600/800. Si lo reemplazas, conserva la proporción 6533:2828 o actualiza `width`/`height` en `index.html`.
- `foto real del local.jpg` alimenta la variante de 960 px. En desktop se muestra a 4:3 para conservar la fachada completa.
- Los originales `banner.jpg` y `foto real del local.jpg` se quedan en la raíz del proyecto; `_site/` solo recibe sus derivados.
- No renombres los archivos de `derivados/` a mano: se generan en cada build.

## Módulos del proyecto

- `scripts/promociones.mjs`: escanea `promociones/` y genera el manifiesto.
- `scripts/imagenes.mjs`: lógica compartida de sharp y nombres de derivados.
- `scripts/preparar.mjs`: build de `_site/` para GitHub Pages.
- `scripts/servir.mjs`: preview local con generación bajo demanda.
- `js/sitio.js`: galería, buscador, visor y enlaces de WhatsApp.
- `css/estilos.css`: estilos y ajustes responsive.
- `index.html`: contenido, banner y foto del local.

## Activación inicial en GitHub (pendiente)

Subir el sitio incluyendo `.github/workflows/pages.yml`. En Settings → Pages → Build and deployment, elegir GitHub Actions. La rama de publicación configurada es `main`. Después de esta configuración inicial, solo hay que mantener las imágenes. El flujo se basa en https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages.
