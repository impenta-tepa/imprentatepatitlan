# Qué hace cada bloque de la home

**Última actualización:** 2026-11-19
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)
**Fase:** Fase 2 publicada en `main`; Fase 3 terminada en `borrador`, pendiente de aprobación.

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
- **Cada tarjeta:** placeholder de foto, nombre, 3–4 ejemplos y enlace “Ver más”.
- **“Ver más”:** aplica el filtro correspondiente del catálogo (`data-filtro`), hace scroll al catálogo, mueve el foco al encabezado del catálogo y actualiza la URL a `#catalogo`. Queda preparado para cambiar el enlace a una subpágina futura.
- **Fotos:** las seis faltan. Los placeholders están marcados `TODO-DOMINGO` y muestran “Foto próximamente”; no se usaron fotos ajenas. La proporción reservada es 16:10 (ideal 1600 x 1000 px).
- **Rejilla:** 3 columnas en escritorio, 2 en tablet y 1 en móvil.
- **Para cambiar textos:** editar `index.html`.

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
  - Muestra 9 promociones y un botón “Ver todas” (19 en total).
  - Busca por título, descripción, categoría, etiquetas y nombre de archivo.
  - Filtra por las 6 macrocategorías; el estado muestra el nombre de la categoría activa.
  - Si una categoría no tiene promociones, muestra un mensaje para cotizar por WhatsApp.
  - Si `precio` es `null`, muestra “Precio: confirmar por WhatsApp”.
  - En móvil, el filtro “Todas” queda visible con `position: sticky` para volver fácilmente.
- **Foco:** al usar “Ver más” desde una tarjeta de servicio, el foco pasa al encabezado `#catalogo-titulo`; el encabezado tiene `tabindex="-1"` y `scroll-margin-top`.
- **Marco de imagen:** proporción fija 4:5 con `aspect-ratio` y `width="800" height="1000"` para evitar CLS.
  - Las imágenes nuevas se muestran con `object-fit: cover`.
  - Las 19 imágenes actuales son cuadradas; el JS les agrega `is-square` y se muestran completas con `object-fit: contain` para no recortar texto ni precios.
- **Para agregar o editar:** ver `docs/promociones-format.md`.

## 7. Testimonios y galería (ocultos)

- **HTML:** `index.html` (`#testimonios`, con `hidden`).
- **Estado:** ocultos. No hay testimonios ni fotos de trabajos reales todavía.
- **Qué falta:** 3 testimonios con nombre y negocio, y fotos propias para la galería. Cuando existan, se quita `hidden` y se llena `#testimonios-grid` y `#galeria-trabajos`.
- **Regla:** no inventar testimonios.

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
- `scripts/promociones.mjs`: lee la fuente única y lista las imágenes.
- `scripts/preparar.mjs`: copia `data/`, minifica la copia publicada con esbuild y arma `_site/`.
- `scripts/imagenes.mjs`: genera 800 px y 1600 px en WebP y JPG, además de los logos optimizados de header y footer.
- `scripts/verificar.mjs`: revisa fichas, imágenes, derivados, SEO, peso, 24 comprobaciones de Fase 2 y 13 de Fase 3.
- `scripts/servir.mjs`: servidor local en `http://localhost:4173`.
- **Fuentes:** el CSS de fuentes se redujo a los subconjuntos latin y latin-ext; los archivos woff2 se mantienen.
- **Minificación:** CSS, fuentes, JS y datos se minifican solo en `_site`; los fuentes del repositorio siguen legibles.

## 16. Lo que no es dinámico

- Servicios, hero, franja de confianza, foráneos, formatos, contacto, cierre y footer son HTML estático.
- Los testimonios y la galería están ocultos hasta tener datos reales.
- No hay base de datos ni panel administrativo. Las promociones se editan en `data/promociones.js`.

## 17. Resultado de Fase 3

- Lighthouse móvil sobre el build local: mejor corrida verificada con Performance 97, Accesibilidad 100, Buenas prácticas 100 y SEO 100.
- LCP 2.5 s, CLS 0, TBT 50 ms y primera carga 250 KiB.
- La medición local es variable: corridas posteriores en el mismo equipo, sin cambios funcionales, dieron 64–73 de Performance y TBT de 1.2–2.4 s. La verificación definitiva debe hacerse en vivo.
- El objetivo obligatorio de LCP ≤ 2.5 s se cumple; el ideal ≤ 2.0 s no se alcanzó. El CSS sigue siendo render-blocking y el LCP es el logo del header.
- Sin scroll horizontal en 320, 360, 390, 430, 768, 844, 1024 y 1280 px.
- Safe areas probadas con iPhone portrait, iPhone landscape y Android portrait.
- Recorrido solo con teclado: menú, filtros, visor, formulario y mapa.
- Consola sin errores.
- Pendiente: SVG del logo y prueba en dispositivo Android/Safari real.
