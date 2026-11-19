# Formato de promociones

**Archivo único:** `data/promociones.js`
**Última actualización:** 2026-11-19
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)

Este archivo es la única fuente de verdad de las promociones. De aquí se alimentan:

- La sección **Promociones destacadas**.
- El **catálogo** completo.
- El **buscador** y los **filtros** de las 6 macrocategorías.
- La **tarjeta unificada** y el **visor de imagen**.
- Los enlaces **“Ver más”** de las tarjetas de servicio, que aplican el filtro de su categoría.

No hace falta editar `index.html`, `css/estilos.css` ni `js/sitio.js` para agregar, cambiar el precio, la vigencia, desactivar o destacar una promoción.

---

## 1. Estructura del archivo

El archivo es JavaScript de navegador, no JSON, para que funcione incluso abriendo `index.html` directamente sin servidor. Tiene dos arreglos globales:

```js
window.CATEGORIAS = [ ... ];

window.PROMOCIONES = [ ... ];
```

Cada promoción es un objeto dentro de `window.PROMOCIONES`. El orden del arreglo es el orden en que aparecen las tarjetas.

---

## 2. Esquema completo de una promoción

| Campo | Tipo | Obligatorio | Qué significa | Ejemplo |
|---|---|---|---|---|
| `id` | texto | Sí | Identificador único, en minúsculas y con guiones. No se repite. | `"tarjetas-1000-2-lados-mate"` |
| `categoria` | texto | Sí | Una de las 6 macrocategorías (ver tabla abajo). | `"papeleria"` |
| `etiquetas` | arreglo de textos | Sí | Palabras finas para el buscador: producto, técnica, uso. | `["tarjetas", "presentación", "mate"]` |
| `titulo` | texto | Sí | Nombre visible de la promoción. | `"Tarjetas 1000 · 2 lados mate"` |
| `descripcion` | texto | Sí | Una sola línea, sin precios ni fechas. | `"Millar de tarjetas de presentación con acabado mate."` |
| `precio` | número o `null` | Sí | Precio en pesos, sin `$` y sin comas. `null` si falta confirmarlo. | `1250` o `null` |
| `prefijoPrecio` | texto | Sí | `"Desde"` si el precio es inicial; `""` si es precio directo. | `"Desde"` |
| `unidad` | texto | Sí | Unidad del precio. Puede ir vacía si no aplica. | `"el millar"`, `"c/u"`, `"paquete 36 pzas"` |
| `iva` | texto o `null` | Sí | `"incluido"`, `"+ IVA"` o `null` si falta confirmarlo. | `"+ IVA"` |
| `vigencia` | texto o `null` | Sí | Fecha `AAAA-MM-DD` o `null` si no hay fecha. | `"2026-12-31"` |
| `imagen` | texto | Sí | Ruta dentro del proyecto. Debe empezar con `promociones/`. | `"promociones/tarjetas 1000 2 lados mate.jpg"` |
| `alt` | texto | Sí | Descripción de la imagen para lectores de pantalla. Sin precios. | `"Promoción de tarjetas de presentación a dos lados con acabado mate."` |
| `destacado` | booleano | Sí | `true` para aparecer en destacadas. Máximo 4 en total. | `true` |
| `activo` | booleano | Sí | `false` para ocultarla del sitio sin borrar la imagen. | `true` |

### Las 6 macrocategorías

| `id` | Nombre visible |
|---|---|
| `papeleria` | Papelería comercial y empresarial |
| `gran-formato` | Gran formato |
| `textiles` | Textiles y promocionales |
| `laser` | Corte y grabado láser |
| `toldos` | Toldos y anuncios |
| `diseno` | Diseño gráfico |

No inventes un `id` nuevo sin actualizar `window.CATEGORIAS` y sin avisar. El build revisa que existan exactamente estas 6 categorías.

---

## 3. Cómo se muestra cada campo en la tarjeta

Orden visual de la tarjeta:

1. Imagen (sin texto ni precio dentro del arte).
2. Badge de categoría.
3. Título.
4. Descripción de una línea.
5. Precio grande + unidad + IVA.
6. Vigencia, si existe.
7. Botón **Pedir por WhatsApp** con el mensaje:
   `Hola, vi la promo [TITULO] en su página y quiero pedirla. ¿Sigue vigente?`

Reglas:

- Si `precio` es `null`, la tarjeta muestra **“Precio: confirmar por WhatsApp”**. Nunca muestra `$0` ni un espacio vacío.
- Si `precio` es un número, la tarjeta lo formatea como pesos mexicanos. No escribas `$` ni comas en el número.
- `prefijoPrecio: "Desde"` se muestra pequeño, arriba del precio.
- `unidad` se muestra junto al precio, en texto pequeño.
- `iva: "incluido"` muestra **“IVA incluido”**; `iva: "+ IVA"` muestra **“+ IVA”**; `iva: null` no muestra nada.
- `vigencia` se muestra como **“Válido hasta el 31 de diciembre de 2026”**.
- `destacado: true` manda la promoción a la sección de destacadas, en el orden del arreglo. Si hay más de 4, el build falla.
- `activo: false` la oculta de destacadas y del catálogo. La imagen puede quedarse en `promociones/`.
- Las `etiquetas` no se muestran; solo alimentan el buscador.

### Marco de imagen 4:5 y arte cuadrado legado

- La tarjeta reserva un marco fijo 4:5 con `aspect-ratio` y `width="800" height="1000"` para evitar saltos de diseño (CLS).
- El arte nuevo de 1080 x 1350 px se muestra con `object-fit: cover`.
- Las 18 imágenes activas son cuadradas. `js/sitio.js` detecta su proporción y les aplica la clase `is-square`; entonces se muestran completas con `object-fit: contain` para no recortar texto ni precios. La imagen histórica `sellos varios PRECIOS.jpg` se conserva sin ficha y no se muestra.
- Al reemplazar el arte por una imagen 4:5, la clase `is-square` desaparece sola. No hay que tocar HTML, CSS ni JS.
- El visor de imagen no cambia: sigue usando el derivado de 1600 px y el `alt` de la ficha.

---

## 4. Cómo agregar una promoción nueva

1. Guarda la imagen en `promociones/` con un nombre descriptivo. Ideal:
   - 1080 x 1350 px (proporción 4:5).
   - WebP menor a 150 KB.
   - Solo el producto sobre fondo limpio.
   - **Sin texto ni precio dentro de la imagen.**
2. Abre `data/promociones.js` y agrega un objeto al final de `window.PROMOCIONES`:

```js
  {
    id: "playeras-gameras",
    categoria: "textiles",
    etiquetas: ["playeras", "gameras", "textil", "personalización"],
    titulo: "Playeras para gamers",
    descripcion: "Playera personalizada con tu diseño o personaje favorito.",
    precio: null,
    prefijoPrecio: "",
    unidad: "c/u",
    iva: null,
    vigencia: null,
    imagen: "promociones/playeras-gameras.jpg",
    alt: "Promoción de playera personalizada con diseño para gamer.",
    destacado: false,
    activo: true
  }
```

3. Ejecuta:

```bash
npm run build
npm run verificar
```

4. Revisa la página en `http://localhost:4173` o publica cuando el dueño apruebe.

El build revisa que la imagen exista, que el `id` no esté repetido, que la categoría sea válida y que no haya más de 4 destacadas.

---

## 5. Cómo editar el precio

Busca la promoción por su `id` y cambia solo estos campos:

```js
    precio: 1250,
    prefijoPrecio: "Desde",
    unidad: "el millar",
    iva: "+ IVA",
```

- `precio` va como número: `1250`, no `"$1,250"`.
- Si el precio es “desde”, usa `prefijoPrecio: "Desde"`. Si es precio directo, déjalo en `""`.
- Si el precio incluye IVA, usa `iva: "incluido"`. Si se suma, `iva: "+ IVA"`. Si no se sabe, `null`.
- Si el precio todavía no está confirmado, déjalo en `null`; la tarjeta mostrará “Precio: confirmar por WhatsApp”.

**No pongas el precio dentro de la imagen.** El precio oficial vive en este archivo.

---

## 6. Cómo cambiar la vigencia

```js
    vigencia: "2026-12-31",
```

- Formato obligatorio: `AAAA-MM-DD`.
- Si no hay vigencia, usa `null`.
- Si la promoción vence, actualiza la fecha o desactívala con `activo: false`.

---

## 7. Cómo activar, desactivar o destacar

- **Activar:** `activo: true`.
- **Desactivar sin borrar:** `activo: false`. Desaparece del sitio, pero la imagen y la ficha se conservan.
- **Destacar:** `destacado: true`. Máximo 4 promociones destacadas. El orden de las destacadas es el orden del arreglo.
- **Quitar de destacadas:** `destacado: false`.

---

## 8. Cómo reordenar

Mueve el objeto completo dentro del arreglo `window.PROMOCIONES`. El primer objeto aparece primero en el catálogo y en las destacadas.

No agregues un campo `orden`; el orden lo define el arreglo.

---

## 9. Qué no editar

- No edites `_site/`: se genera en cada build.
- No edites los derivados de `derivados/promociones/`: se generan con Sharp.
- No cambies `window.CATEGORIAS` sin revisar los filtros y la validación del build.
- No cambies el número de WhatsApp en `data/promociones.js`; el número vive en `js/sitio.js` (`WA_NUMBER`) y en los enlaces `data-wa` del HTML.

---

## 10. Comandos útiles

```bash
npm run build      # copia data/, genera derivados y arma _site
npm run verificar  # revisa fichas, imágenes, derivados, SEO y peso
npm start          # servidor local en http://localhost:4173
```

Si el build falla, revisa el mensaje: casi siempre es una imagen que no existe, un `id` repetido, una categoría mal escrita o más de 4 destacadas.
