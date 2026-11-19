# Entregables de Domingo para Fase 4

**Última actualización:** 2026-11-20
**Para:** Domingo (dueño de Quad Print)
**Regla:** usar los nombres y rutas exactos de este documento. No cambiar mayúsculas, acentos ni guiones.

Guardar cada archivo en la carpeta indicada, respetando la estructura del repositorio. Los archivos se aplican por lotes; no se publican solos.

---

## 1. Artes limpias de las 4 promociones destacadas

Formato: WebP, 1080 x 1350 px (4:5), sin texto ni precio dentro de la imagen, fondo limpio.
Peso máximo: 150 KB por archivo.

| # | Archivo exacto | Promoción | Alt sugerido |
|---|---|---|---|
| 1 | `promociones/tarjetas-1000-2-lados-mate.webp` | Tarjetas 1000 · 2 lados mate | Tarjetas de presentación impresas a dos lados con acabado mate. |
| 2 | `promociones/tazas-personalizadas.webp` | Tazas personalizadas | Taza blanca personalizada con diseño sublimado. |
| 3 | `promociones/playera-familiar.webp` | Playera familiar | Paquete de playeras personalizadas para dos adultos y un niño. |
| 4 | `promociones/banner-180.webp` | Banner 1.80 m | Banner de lona de gran formato para anuncios y eventos. |

Nota: estos nombres sustituyen a los archivos actuales de `promociones/`. En el Lote 4A solo se actualiza el campo `imagen` de cada ficha. Los originales viejos se conservan en el repo sin uso (no se borran); el verificador los permitirá como imágenes históricas.

---

## 2. Fotos de servicios

Formato de entrega: JPG o WebP de alta calidad. El build recorta a 16:10 y publica 800 y 1200 px en WebP y JPG.
Peso máximo publicado: 200 KB por archivo.

**Estado:** las 6 fotos se recibieron el 2026-11-19. Son mockups/ilustraciones de 1376 x 768 px (no fotos reales de trabajos). Se recortaron a 16:10 y ya están integradas como imágenes provisionales en `borrador`. Falta que Domingo confirme si se quedan o entrega fotos reales.

| # | Archivo exacto | Servicio | Alt sugerido |
|---|---|---|---|
| 1 | `servicios/01-papeleria.jpg` | Papelería comercial y empresarial | Papelería corporativa con el logo de Quad Print: tarjetas, hojas y folders. |
| 2 | `servicios/02-gran-formato.jpg` | Gran formato | Banner de gran formato con el logo de Quad Print junto a muestras de color. |
| 3 | `servicios/03-textiles.jpg` | Textiles y promocionales | Playera, gorra, taza y termo personalizados con el logo de Quad Print. |
| 4 | `servicios/04-laser.jpg` | Corte y grabado láser | Grabado láser del logo de Quad Print sobre madera. |
| 5 | `servicios/05-toldos.jpg` | Toldos y anuncios | Anuncio luminoso personalizado con el logo de Quad Print. |
| 6 | `servicios/06-diseno.jpg` | Diseño gráfico | Estación de diseño gráfico con el logo de Quad Print en pantalla. |

---

## 3. Foto real del hero

Formato: WebP, 2400 x 1029 px (21:9), mínimo 1600 px de ancho. Horizontal.
Peso máximo: 300 KB.

| Archivo exacto | Qué debe mostrar | Alt sugerido |
|---|---|---|
| `hero/foto-hero.webp` | Trabajos, taller o equipo real de Quad Print. Sin texto ni logos ajenos. | Foto real del taller o de trabajos de Quad Print Tepatitlán. |

En el Lote 4B se mide una vez con la imagen en `eager` + `fetchpriority="high"`. Si el LCP móvil sigue ≤ 2.5 s, se queda así; si empeora, se regresa a `lazy`.

---

## 4. Logo en SVG

Formato: SVG vectorial, texto convertido a trazos, sin imágenes rasterizadas dentro.
Peso máximo: 50 KB por archivo. Incluir `<title>Quad Print Tepatitlán</title>` y `viewBox`.

| Archivo exacto | Uso | Alt / nombre accesible |
|---|---|---|
| `LOGOS/quad-print-claro.svg` | Header y fondos claros | Quad Print Tepatitlán |
| `LOGOS/quad-print-oscuro.svg` | Footer y fondos oscuros | Quad Print Tepatitlán |

Requisitos:
- Versión clara: logo original para fondo claro.
- Versión oscura: logo en blanco o claro para fondo oscuro.
- No incluir fondo, sombra ni margen extra.
- Conservar la proporción del logo actual: header 200:145 y footer 240:174.
- El header se muestra a 92 px de ancho x 66.7 px de alto en escritorio, y 80 x 58 px en móvil. El footer se muestra a 120 x 87 px. El CSS ya reserva esas cajas para que el SVG no mueva el header ni las anclas.
- Mientras lleguen los SVG, el sitio mantiene el WebP/PNG actual.

---

## 5. Galería de trabajos

Formato: WebP, 1200 x 900 px (4:3), mínimo 1200 px de ancho.
Peso máximo: 200 KB por archivo. Mínimo 4 fotos; se pueden entregar hasta 8.

| Archivo exacto | Alt |
|---|---|
| `galeria/trabajo-01.webp` | Describir la pieza real: producto, material y uso. |
| `galeria/trabajo-02.webp` | Describir la pieza real: producto, material y uso. |
| `galeria/trabajo-03.webp` | Describir la pieza real: producto, material y uso. |
| `galeria/trabajo-04.webp` | Describir la pieza real: producto, material y uso. |
| `galeria/trabajo-05.webp` | Opcional. Describir la pieza real. |
| `galeria/trabajo-06.webp` | Opcional. Describir la pieza real. |
| `galeria/trabajo-07.webp` | Opcional. Describir la pieza real. |
| `galeria/trabajo-08.webp` | Opcional. Describir la pieza real. |

El `alt` definitivo se escribe en `data/testimonios.js` al recibir cada foto. No se inventa la descripción.

### Retratos opcionales de testimonios

Formato: WebP, 600 x 600 px (1:1). Peso máximo: 60 KB.

| Archivo exacto | Uso | Alt |
|---|---|---|
| `galeria/testimonio-01.webp` | Retrato de la persona del testimonio 1 | Vacío (decorativo; el nombre ya está visible). |
| `galeria/testimonio-02.webp` | Retrato de la persona del testimonio 2 | Vacío (decorativo; el nombre ya está visible). |
| `galeria/testimonio-03.webp` | Retrato de la persona del testimonio 3 | Vacío (decorativo; el nombre ya está visible). |

Solo con autorización de la persona. Si no hay foto, el testimonio se muestra sin retrato.

---

## 6. Datos de texto

Estos datos llegan en los copies del asesor y se aplican **verbatim**. No se leen de imágenes ni se completan por intuición.

### Precios de las 4 destacadas (Lote 4A)

| Promoción | Precio (número, sin $ ni comas) | Unidad | IVA | Vigencia (AAAA-MM-DD) | Prefijo |
|---|---|---|---|---|---|
| Tarjetas 1000 · 2 lados mate |  |  |  |  |  |
| Tazas personalizadas |  |  |  |  |  |
| Playera familiar |  |  |  |  |  |
| Banner 1.80 m |  |  |  |  |  |

- `IVA`: `incluido` o `+ IVA`.
- `Vigencia`: fecha exacta o `null` si no aplica.
- `Prefijo`: `Desde` o vacío.

### Precios de las 14 promociones restantes (Lote 4C)

Se entregan en una tabla con las mismas columnas, en el orden del catálogo.

### Testimonios (Lote 4C)

| # | Nombre | Negocio | Texto autorizado | ¿Foto autorizada? |
|---|---|---|---|---|
| 1 |  |  |  | Sí / No |
| 2 |  |  |  | Sí / No |
| 3 |  |  |  | Sí / No |

### Confirmaciones (2026-11-20)

- WhatsApp principal: **confirmado 378 109 7423** (`5213781097423`). No cambian los enlaces; el 378 101 1768 queda como contacto secundario visible.
- “Anuncio circular”: **confirmado** como letrero circular con luz por ambos lados. Pasa a Toldos y anuncios, con el título “Anuncio circular con luz”.
- “Sellos varios · precios”: **confirmado** que es el mismo producto que “Sellos varios”. Se conserva una sola ficha y el archivo con precios queda sin uso.
- Cualquier precio, unidad o vigencia que no cuadre con el título se marca y se pregunta; no se corrige por cuenta propia.

---

## 7. Cómo entregar

1. Crear las carpetas si no existen: `promociones/`, `servicios/`, `hero/`, `LOGOS/`, `galeria/`.
2. Copiar cada archivo con el nombre exacto de este documento.
3. No usar espacios, acentos ni mayúsculas distintas en los nombres.
4. Comprimir la carpeta y enviarla al asesor, o subirla al repositorio en una rama de entrega.
5. Avisar qué archivos llegaron y cuáles faltan.

## 8. Checklist rápido

- [ ] 4 artes de destacadas en `promociones/`.
- [ ] 6 fotos de servicios en `servicios/`.
- [ ] 1 foto de hero en `hero/`.
- [ ] 2 SVG del logo en `LOGOS/`.
- [ ] Mínimo 4 fotos de galería en `galeria/`.
- [ ] Precios, unidades, IVA y vigencias de las 4 destacadas.
- [ ] 3 testimonios reales con nombre, negocio y texto autorizado.
- [ ] Confirmación de WhatsApp, “Anuncio circular” y “Sellos varios”.
