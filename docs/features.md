# Qué hace cada bloque de la home

**Última actualización:** 2026-11-18
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)

La home es HTML estático con CSS y JavaScript nativo. No hay frameworks, dependencias de interfaz ni pasos de build para editar contenido. El único build (`npm run build`) copia archivos, genera derivados de imagen y arma `_site/`.

---

## 1. Header

- **HTML:** `index.html`.
- **Estilos:** `css/estilos.css`.
- **Comportamiento:** `js/sitio.js`.
- **Qué hace:**
  - Logo, navegación, teléfono y menú hamburguesa.
  - El estado abierto/cerrado ya no vive en la barra superior: se muestra en **Contacto > Horario**.
  - El header es sticky y respeta el área segura del iPhone (`env(safe-area-inset-top)`).
  - La barra CMYK va al pie del header como divisoria.
- **Para cambiar textos o enlaces:** editar `index.html`.

## 2. Hero

- **HTML:** `index.html`.
- **Qué hace:** headline actual “¡Contáctanos y cotiza tu pedido!”, texto de apoyo, CTA “Cotizar por WhatsApp” y CTA secundario “Ver promociones”.
- **WhatsApp:** los enlaces con `data-wa` se construyen en `js/sitio.js` desde `WA_NUMBER`.
- **Para cambiar el headline:** editar `index.html`. Confirmar antes con el dueño: el brief del asesor pedía otro headline.

## 3. Franja de confianza

- **HTML:** `index.html` (`.promise-strip`).
- **Qué hace:** datos cortos de confianza: atención personalizada, lonas urgentes y domingos con cita.
- **Para cambiar:** editar `index.html`.

## 4. Promociones destacadas

- **Datos:** `data/promociones.js`.
- **Render:** `js/sitio.js` (`pintarDestacados`).
- **Qué hace:** toma las promociones con `destacado: true`, máximo 4, en el orden del arreglo. Si no hay ninguna, oculta la sección.
- **Tarjeta:** imagen, badge de categoría, título, descripción, precio, vigencia y CTA de WhatsApp.
- **Para cambiar una destacada:** editar `destacado` en `data/promociones.js`. No tocar HTML.

## 5. Servicios

- **HTML:** `index.html` (`.services__grid`).
- **Qué hace:** seis tarjetas de servicio con número, título, descripción y enlace de WhatsApp.
- **Estado actual:** es contenido estático. La Fase 2 las reagrupará en las 6 categorías exactas del brief, incluida “Toldos y anuncios”.
- **Para cambiar textos:** editar `index.html`.

## 6. Catálogo

- **Datos:** `data/promociones.js`.
- **Render:** `js/sitio.js` (`pintarFiltros`, `pintarCatalogo`, `coincidencias`, `tarjeta`).
- **Qué hace:**
  - Muestra 9 promociones y un botón “Ver todas”.
  - Busca por título, descripción, categoría, etiquetas y nombre de archivo.
  - Filtra por las 6 macrocategorías.
  - Si una categoría no tiene promociones, muestra un mensaje para cotizar por WhatsApp.
  - Si `precio` es `null`, muestra “Precio: confirmar por WhatsApp”.
- **Para agregar o editar:** ver `docs/promociones-format.md`.

## 7. Foráneos / domingos con cita

- **HTML:** `index.html` (`.foraneos`).
- **Qué hace:** bloque para clientes de fuera de Tepatitlán, con CTA para agendar por WhatsApp.
- **Estado actual:** contenido estático. La Fase 2 lo compactará a una banda.
- **Para cambiar textos:** editar `index.html`.

## 8. Formatos de archivo

- **HTML:** `index.html` (`.formats`).
- **Qué hace:** explica que se reciben CDR, AI, PSD, PDF, PNG, JPG/JPEG y que se revisan antes de imprimir.
- **Estado actual:** contenido estático. La Fase 2 lo compactará a una franja.
- **Para cambiar textos:** editar `index.html`.

## 9. Contacto

- **HTML:** `index.html` (`.section--contact`).
- **Qué hace:**
  - Datos de contacto, horario, pagos y facturación.
  - Estado abierto/cerrado en vivo.
  - Formulario “Quiero cotizar”.
  - Mapa.
- **Formulario:** `js/sitio.js` toma servicio, cantidad, fecha y detalles, y abre WhatsApp con el mensaje precargado. No se cambió su lógica.
- **Para cambiar datos de contacto:** confirmar con el dueño antes de editar `index.html`.

## 10. Footer

- **HTML:** `index.html`.
- **Qué hace:** datos del negocio, navegación, horario, redes y año automático.
- **Año:** `js/sitio.js` actualiza `#year`.
- **Para cambiar textos:** editar `index.html`.

## 11. Visor de promociones (lightbox)

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

## 12. WhatsApp

- **Número:** `5213781097423` en `js/sitio.js` (`WA_NUMBER`).
- **Enlaces estáticos:** atributos `data-wa` en `index.html`; el JS les agrega el mensaje y el número.
- **Mensaje de promoción:** `Hola, vi la promo [TITULO] en su página y quiero pedirla. ¿Sigue vigente?`
- **Pendiente:** confirmar con el dueño cuál número es el WhatsApp principal.

## 13. Build y datos

- `data/promociones.js`: fuente única de promociones y categorías. **No se sobrescribe.**
- `scripts/promociones.mjs`: lee la fuente única y lista las imágenes.
- `scripts/preparar.mjs`: copia `data/`, genera derivados y arma `_site/`.
- `scripts/imagenes.mjs`: genera 800 px y 1600 px en WebP y JPG.
- `scripts/verificar.mjs`: revisa fichas, imágenes, derivados, SEO y peso inicial.
- `scripts/servir.mjs`: servidor local en `http://localhost:4173`.

## 14. Lo que no es dinámico

- Servicios, hero, franja de confianza, foráneos, formatos, contacto y footer son HTML estático.
- Los testimonios aún no existen; la Fase 2 dejará la estructura preparada y oculta hasta tener datos reales.
- No hay base de datos ni panel administrativo. Las promociones se editan en `data/promociones.js`.
