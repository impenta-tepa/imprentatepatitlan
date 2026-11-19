# Formato de testimonios y galería

**Última actualización:** 2026-11-19
**Archivo que se edita:** `data/testimonios.js`
**No se toca:** `index.html`, `css/estilos.css` ni `js/sitio.js` para agregar contenido.

---

## Activación automática

La sección `#testimonios` se muestra sola cuando se cumplen **las dos** condiciones:

- Al menos **3 testimonios** activos con nombre, negocio y texto.
- Al menos **4 trabajos** activos con imagen y `alt`.

Mientras falte una de las dos, la sección permanece oculta. No hay que quitar `hidden` a mano.

---

## Testimonios

Cada objeto del arreglo `window.TESTIMONIOS` acepta:

| Campo | Obligatorio | Qué es |
|---|---|---|
| `nombre` | Sí | Nombre real de la persona. |
| `negocio` | Sí | Nombre del negocio. |
| `texto` | Sí | Testimonio corto, autorizado por el cliente. Sin inventar. |
| `foto` | No | Ruta a un retrato cuadrado, por ejemplo `galeria/testimonio-01.webp`. |
| `activo` | No | `false` lo oculta sin borrarlo. Por defecto se muestra. |

Ejemplo:

```js
window.TESTIMONIOS = [
  {
    nombre: "Nombre real",
    negocio: "Negocio real",
    texto: "Testimonio corto autorizado por el cliente.",
    foto: "galeria/testimonio-01.webp",
    activo: true
  }
];
```

- Los testimonios se muestran como máximo 3, en el orden del arreglo.
- Si `foto` está vacío o no existe, la tarjeta se muestra solo con nombre y negocio.
- La foto del retrato es decorativa: su `alt` va vacío porque el nombre ya está visible al lado.

---

## Galería de trabajos

Cada objeto del arreglo `window.TRABAJOS` acepta:

| Campo | Obligatorio | Qué es |
|---|---|---|
| `imagen` | Sí | Ruta a la foto, por ejemplo `galeria/trabajo-01.webp`. |
| `alt` | Sí | Descripción real de la pieza, el material y su uso. |
| `pie` | No | Texto breve debajo de la foto. |
| `activo` | No | `false` lo oculta sin borrarlo. Por defecto se muestra. |

Ejemplo:

```js
window.TRABAJOS = [
  {
    imagen: "galeria/trabajo-01.webp",
    alt: "Descripción real de la pieza, el material y su uso.",
    pie: "Pie de foto breve",
    activo: true
  }
];
```

- La galería se muestra a 4:3 con `object-fit: cover`; las fotos deben venir en esa proporción para no recortar contenido importante.
- No se usan fotos de bancos de imágenes ni trabajos ajenos.

---

## Especificaciones de las imágenes

| Uso | Ruta | Formato | Medida | Peso máximo |
|---|---|---|---|---|
| Retrato de testimonio | `galeria/testimonio-01.webp` | WebP | 400 x 400 (1:1) | 60 KB |
| Trabajo de galería | `galeria/trabajo-01.webp` | WebP | 1600 x 1200 (4:3) | 200 KB |

- Las fotos de la galería se copian tal cual al sitio publicado; no se regeneran derivados.
- Si una foto no existe, `npm run verificar` lo reporta y el build no debe publicarse.
- Para las fotos de servicios y el hero, ver `docs/entregables-domingo.md`.

---

## Reglas

1. Solo testimonios reales, con autorización del cliente.
2. Solo fotos propias de trabajos de Quad Print.
3. No transcribir testimonios de imágenes ni de terceros.
4. No completar datos por intuición: si falta algo, se pregunta.
5. Después de editar: `npm run build` y `npm run verificar`.
