# Qué hace cada bloque de la home

**Última actualización:** 2026-11-20
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)
**Fase:** Fase 3 publicada en `main`; Fase 4.0 en `borrador`.

La home es HTML estático con CSS y JavaScript nativo. No hay frameworks de interfaz. El build (`npm run build`) copia archivos, genera derivados de imagen, minifica la copia publicada y arma `_site/`.

---

## Orden de la home

1. Header.
2. Hero.
3. Franja de confianza.
4. Servicios.
5. Promociones destacadas.
6. Catálogo.
7. Testimonios y galería (ocultos).
8. Banda de foráneos.
9. Franja de formatos.
10. Contacto.
11. Franja de cierre.
12. Footer.

---

## 1. Header

- **HTML:** `index.html`.
- **Estilos:** `css/estilos.css`.
- **Comportamiento:** `js/sitio.js`.
- **Qué hace:**
  - Logo optimizado en WebP/PNG (200 px de ancho en header, 240 px en footer) con `width`/`height`; queda pendiente el SVG definitivo.
  - Navegación, teléfono y menú hamburguesa.
  - Nav de escritorio: **Servicios**, **Promociones**, **Ubicación**, **Contacto** + botón **Cotizar**.
  - **Ubicación** lleva a `#ubicacion`, el bloque del mapa dentro de Contacto.
  - En móvil, el header muestra un icono de WhatsApp siempre visible, el teléfono y el menú hamburguesa.
  - El menú móvil cerrado usa `inert`; no recibe foco hasta abrirse.
  - El estado abierto/cerrado vive en **Contacto > Horario**.
  - El header es sticky y respeta el área segura del iPhone (`env(safe-area-inset-top)`).
  - La barra CMYK va al pie del header como divisoria.
- **Para cambiar textos o enlaces:** editar `index.html`.

## 2. Hero

- **HTML:** `index.html`.
- **Qué hace:** headline “Tu idea merece una gran impresión.”, texto de apoyo, CTA primario “Cotiza tu pedido por WhatsApp” y CTA secundario “Ver servicios”.
- **Imagen:** hoy se usa el banner actual como sustituto. Está marcado `TODO-DOMINGO` para reemplazarlo por una foto real de trabajos, del taller o del equipo. El marco reserva una proporción 21:9 y la imagen se recorta con `object-fit: cover`; la foto final debe ser panorámica, de al menos 1600 px de ancho.
- **Carga:** la imagen del hero usa `loading="lazy"` para no competir con el logo, que es el elemento LCP. El marco 21:9 reserva el espacio y evita CLS.
- **WhatsApp:** los enlaces con `data-wa` se construyen en `js/sitio.js` desde `WA_NUMBER`.
- **Para cambiar el headline:** editar `index.html`. El headline actual fue aprobado por el asesor.

## 3. Franja de confianza

- **HTML:** `index.html` (`.trust-strip`).
- **Qué hace:** cuatro datos cortos: Lonas urgentes, Facturación CFDI, Diseño incluido y Domingos con cita.
- **Diseño:** fondo blanco, cuatro columnas en escritorio y 2 x 2 en móvil.
- **Para cambiar:** editar `index.html`.

## 4. Servicios

- **HTML:** `index.html` (`.services__grid`).
- **Qué hace:** seis tarjetas claras con las seis macrocategorías exactas:
  1. Papelería comercial y empresarial.
  2. Gran formato.
  3. Textiles y promocionales.
  4. Corte y grabado láser.
  5. Toldos y anuncios.
  6. Diseño gráfico.
- **Cada tarjeta:** foto desde `data/servicios.js`, nombre, 3–4 ejemplos y un enlace que decide el conteo de promociones activas de su categoría:
  - **Con promociones:** “Ver más”; aplica el filtro correspondiente (`data-filtro`), hace scroll al catálogo, mueve el foco al encabezado del catálogo y actualiza la URL a `#catalogo`. Queda preparado para cambiar el enlace a una subpágina futura.
  - **Sin promociones:** “Cotizar por WhatsApp”; abre `wa.me` con “Hola, quiero cotizar [categoría]. No vi promociones en su página.”
  - La decisión se toma en `js/sitio.js` desde `data/promociones.js`, sin excepciones escritas en el HTML. Al agregar la primera promo de una categoría, la tarjeta vuelve sola a “Ver más” en la siguiente carga.
- **Fotos:** `data/servicios.js` define `base`, `alt` e `ilustrativa`. Las seis actuales son mockups entregados por Domingo (1376 x 768 originales); el build las recorta a 16:10 y publica 800 y 1200 px en WebP y JPG en `derivados/servicios/`. Mientras `ilustrativa: true`, se muestra la etiqueta “Imagen ilustrativa” y el `alt` lleva el prefijo; al cambiar a `false`, ambos desaparecen sin tocar HTML.
- **Rejilla:** 3 columnas en escritorio, 2 en tablet y 1 en móvil.
- **Para cambiar textos:** editar `index.html`. **Para cambiar fotos o quitar la etiqueta:** editar `data/servicios.js`.

## 5. Promociones destacadas

- **Datos:** `data/promociones.js`.
- **Render:** `js/sitio.js` (`pintarDestacados`).
- **Qué hace:** toma las promociones con `destacado: true`, máximo 4, en el orden del arreglo. Si no hay ninguna, oculta la sección.
- **Carga:** se pinta con `IntersectionObserver` antes de entrar en pantalla. Si el nav lleva a `#promociones`, se pinta primero para que el salto no se quede corto.
- **Tarjeta:** imagen, badge de categoría, título, descripción, precio, vigencia y CTA de WhatsApp.
- **Para cambiar una destacada:** editar `destacado` en `data/promociones.js`. No tocar HTML.

## 6. Catálogo

- **Datos:** `data/promociones.js`.
- **Render:** `js/sitio.js` (`pintarFiltros`, `pintarCatalogo`, `coincidencias`, `tarjeta`, `marcarMiniaturas`).
- **Qué hace:**
  - Se pinta con `IntersectionObserver` antes de entrar en pantalla, sin bloquear el primer pintado.
  - Muestra 9 promociones y un botón “Ver todas” (18 activas en total).
  - Busca por título, descripción, categoría, etiquetas y nombre de archivo.
  - Filtra por las 6 macrocategorías; el estado muestra el nombre de la categoría activa.
  - **Categoría sin promociones:** muestra el nombre de la categoría y un botón real de WhatsApp de 44 px, con foco visible y mensaje precargado: “Hola, quiero cotizar [categoría]. No vi promociones en su página.”
  - **Búsqueda sin resultados:** muestra el término buscado y el mismo tipo de botón, con mensaje: “Hola, busco [término] y no lo encontré en su catálogo. ¿Lo pueden hacer?”
  - Si `precio` es `null`, muestra “Precio: confirmar por WhatsApp”.
  - En móvil, el filtro “Todas” queda visible con `position: sticky` para volver fácilmente.
- **Foco:** al usar “Ver más” desde una tarjeta de servicio, el foco pasa al encabezado `#catalogo-titulo`; el encabezado tiene `tabindex="-1"` y `scroll-margin-top`.
- **Marco de imagen:** proporción fija 4:5 con `aspect-ratio` y `width="800" height="1000"` para evitar CLS.
  - Las imágenes nuevas se muestran con `object-fit: cover`.
  - Las 18 imágenes activas son cuadradas; el JS les agrega `is-square` y se muestran completas con `object-fit: contain` para no recortar texto ni precios. La imagen histórica “sellos varios PRECIOS.jpg” se conserva sin ficha y no se muestra.
- **Para agregar o editar:** ver `docs/promociones-format.md`.

## 7. Testimonios y galería

- **HTML:** `index.html` (`#testimonios`, con `hidden`).
- **Datos:** `data/testimonios.js` (`window.TESTIMONIOS` y `window.TRABAJOS`).
- **Render:** `js/sitio.js` (`prepararTestimonios`). No se toca el HTML para editar contenido.
- **Activación automática:** la sección se muestra con al menos 3 testimonios activos. La galería es opcional y aparece dentro de la sección cuando hay 4 trabajos activos; si solo hay fotos y ningún testimonio, la sección sigue oculta.
- **Testimonios:** nombre, negocio, texto autorizado y foto opcional. Se muestran como máximo 3.
- **Galería:** imagen, `alt` y pie opcional. Se muestra a 4:3 cuando hay 4 o más trabajos.
- **Fotos:** `galeria/`; trabajos 1200 x 900 WebP y retratos 600 x 600 WebP.
- **Regla:** no inventar testimonios ni usar fotos ajenas. Ver `docs/testimonios-format.md` y `docs/entregables-domingo.md`.

## 8. Banda de foráneos

- **HTML:** `index.html` (`.foraneos-band`).
- **Qué hace:** banda compacta para clientes de fuera de Tepatitlán, con el mensaje “Domingos con cita” y CTA para agendar por WhatsApp.
- **Para cambiar textos:** editar `index.html`.

## 9. Franja de formatos

- **HTML:** `index.html` (`.formats-strip`).
- **Qué hace:** franja breve que recuerda que se reciben CDR, AI, PSD, PDF, PNG y JPG, y que los archivos se revisan antes de imprimir.
- **Para cambiar textos:** editar `index.html`.

## 10. Contacto

- **HTML:** `index.html` (`.section--contact`).
- **Qué hace:**
  - Datos de contacto, horario, pagos y facturación.
  - Estado abierto/cerrado en vivo.
  - Formulario “Quiero cotizar”.
  - Mapa con carga diferida.
- **Formulario:** `js/sitio.js` toma servicio, cantidad, fecha y detalles, y abre WhatsApp con el mensaje precargado. No se cambió su lógica.
  - El select de servicio usa las 6 macrocategorías exactas + “Otro”.
  - El mensaje de WhatsApp usa el nombre visible de la opción.
  - Los campos usan 16 px para evitar el zoom automático de iOS.
- **Mapa:** se muestra la foto real de la fachada con un botón “Ver mapa interactivo”. Al pulsarlo se crea un iframe de Google Maps con `loading="lazy"`. Así el mapa no se descarga en la primera carga. También hay un enlace directo “Abrir en Google Maps”.
- **Para cambiar datos de contacto:** confirmar con el dueño antes de editar `index.html`.

## 11. Franja de cierre

- **HTML:** `index.html` (`.closing`).
- **Qué hace:** franja negra con “Aquí empieza tu próxima impresión”, CTA de WhatsApp, teléfono y recordatorio de diseño incluido y CFDI.
- **Regla:** es la única franja negra grande de la home; el footer conserva su fondo oscuro.

## 12. Footer

- **HTML:** `index.html`.
- **Qué hace:** datos del negocio, navegación, horario, redes, pagos/facturación y año automático.
- **Año:** `js/sitio.js` actualiza `#year`.
- **Para cambiar textos:** editar `index.html`.

## 13. Visor de promociones (lightbox)

- **HTML:** `index.html` (`<dialog id="visor">`).
- **Comportamiento:** `js/sitio.js`.
- **Qué hace:**
  - Abre la imagen ampliada al tocar la imagen o “Ver en grande”.
  - Usa el derivado de 1600 px en WebP/JPG.
  - Enlaza a la imagen original.
  - CTA “Consultar por WhatsApp” con el mismo mensaje de la promo.
  - Cierra con el botón, con Esc y con clic fuera.
  - Devuelve el foco al botón que lo abrió.
  - Usa el `alt` descriptivo de la promoción.
- **Para cambiar el texto del CTA:** editar `js/sitio.js` (`mensajePromo`).

## 14. WhatsApp

- **Número:** `5213781097423` en `js/sitio.js` (`WA_NUMBER`).
- **Enlaces estáticos:** atributos `data-wa` en `index.html`; el JS les agrega el mensaje y el número.
- **Mensaje de promoción:** `Hola, vi la promo [TITULO] en su página y quiero pedirla. ¿Sigue vigente?`
- **Pendiente:** confirmar con el dueño cuál número es el WhatsApp principal. El 378 101 1768 sigue listado como dato de contacto, no como número de los botones generados.

## 15. Build y datos

- `data/promociones.js`: fuente única de promociones y categorías. **No se sobrescribe.**
- `data/testimonios.js`: fuente única de testimonios y galería. **No se sobrescribe.**
- `scripts/promociones.mjs`: lee las fuentes únicas y lista las imágenes.
- `scripts/preparar.mjs`: copia `data/` y `galeria/`, minifica la copia publicada con esbuild y arma `_site/`.
- `scripts/imagenes.mjs`: genera 800 px y 1600 px en WebP y JPG, además de los logos optimizados de header y footer.
- `scripts/verificar.mjs`: revisa fichas, imágenes, derivados, SEO, peso, 24 comprobaciones de Fase 2, 13 de Fase 3 y 6 de preparación de Fase 4.
- `scripts/servir.mjs`: servidor local en `http://localhost:4173`.
- **Fuentes:** el CSS de fuentes se redujo a los subconjuntos latin y latin-ext; los archivos woff2 se mantienen.
- **Minificación:** CSS, fuentes, JS y datos se minifican solo en `_site`; los fuentes del repositorio siguen legibles.

## 16. Lo que no es dinámico

- Servicios, hero, franja de confianza, foráneos, formatos, contacto, cierre y footer son HTML estático.
- Los testimonios y la galería están ocultos hasta tener datos reales.
- No hay base de datos ni panel administrativo. Las promociones se editan en `data/promociones.js`.

## 17. Resultado de Fase 3

- PSI móvil en vivo (3 corridas): Performance 98, Accesibilidad 100, Buenas prácticas 100 y SEO 100; mediana LCP 1.4 s, TBT 0 ms, CLS 0.
- PSI escritorio en vivo (3 corridas): 100 / 100 / 100 / 100; mediana LCP 0.3 s, TBT 0 ms, CLS 0.
- Elemento LCP móvil: logo del header (`logo-header.webp`, 200 x 145 px, `fetchpriority="high"`). En escritorio: banner del hero, con `loading="lazy"`; su LCP de 0.3 s está muy por debajo del umbral, así que no se cambia.
- La medición local de Lighthouse era variable; PSI en vivo confirmó que el TBT alto era ruido del entorno.
- Sin scroll horizontal en vivo a 320 y 360 px; también probado en 390, 430, 768, 844, 1024 y 1280 px.
- Safe areas probadas con iPhone portrait, iPhone landscape y Android portrait.
- Recorrido solo con teclado: menú, filtros, visor, formulario y mapa.
- Consola sin errores.
- Pendiente: SVG del logo y prueba en dispositivo Android/Safari real (checklist en `docs/pruebas-dispositivo.md`).
- Fase 4.0: primera carga real móvil 255.4 KiB (transferencia con Brotli); Lighthouse móvil 98/100/100/100, LCP 2.4 s, TBT 0, CLS 0. El estimado de 679 KB era tamaño en disco sin comprimir y contaba 6 miniaturas del catálogo diferido.
