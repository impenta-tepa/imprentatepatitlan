# Plan de trabajo — Home Quad Print Tepatitlán

**Última actualización:** 2026-11-20
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)
**Rama de trabajo:** `borrador`
**Rama de publicación:** `main` (solo con aprobación explícita del dueño)

## Regla de trabajo

Una fase a la vez. Al terminar cada fase: build, verificación, commit en `borrador`, reporte y pausa. No se publica en `main` hasta que el dueño lo apruebe.

### Límites de GitHub Pages (plan gratuito)

- **10 compilaciones por hora.** Agrupar los cambios en un solo commit/push; no publicar por cada ajuste pequeño.
- **1 GB máximo** para el sitio y el repositorio, y **100 GB de ancho de banda al mes**.
- Ejecutar `npm run build` y `npm run verificar` en local antes de publicar.
- Optimizar las imágenes antes de subirlas: WebP/JPG ligero, ideal 1080 x 1350 px y menos de 150 KB.
- No subir `_site/` ni `node_modules/`; GitHub Actions los genera en cada publicación.
- Si se acumulan varios ajustes, esperar y agruparlos en un solo push.

---

## Fase 1 — Fuente única de promociones + tarjeta unificada

| Fecha | Intervención | Firma |
|---|---|---|
| 2026-11-18 | Crear `data/promociones.js` como fuente única de las 19 promociones y las 6 macrocategorías. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Migrar títulos, descripciones, etiquetas, imágenes, textos alt y las 4 destacadas. Precios, IVA y vigencia quedan en `null`. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Generar destacadas y catálogo desde los datos; eliminar la duplicación hardcodeada. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Tarjeta unificada: imagen, badge de categoría, título, descripción, precio grande, unidad, IVA, vigencia y CTA de WhatsApp. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Precio `null` → “Precio: confirmar por WhatsApp”; nunca `$0` ni vacío. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Catálogo con buscador, 6 macrocategorías, 9 visibles + “Ver todas”. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Mejorar accesibilidad del visor: alt descriptivo, foco al abrir/cerrar, cierre con Esc y clic fuera. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Adaptar build y verificación a `data/`; el build ya no sobrescribe la fuente única. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Crear documentación en `/docs`. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Pruebas de viewports 320, 360, 390, 430, 768, 844, 1024 y 1280; sin scroll horizontal. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Build y `npm run verificar` en verde; consola sin errores. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Commit de Fase 1 en `borrador`. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Aprobación del asesor y autorización de publicación en `main`. | Asesor de Domingo |
| 2026-11-19 | Ajuste aprobado: headline “Tu idea merece una gran impresión.” y CTA “Cotiza tu pedido por WhatsApp”. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Merge `borrador` → `main` (commit `8523497`) y despliegue de GitHub Actions en verde. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Verificación en vivo: 4 destacadas, 9 + “Ver todas” = 19, 7 filtros, buscador, visor, formulario y sin scroll horizontal a 360 px. | DeepSeek V4.1 Flash Free (OpenCode) |

**Estado:** Fase 1 aprobada, publicada en `main` y verificada en vivo.

### Publicación de Fase 1

- **Rama publicada:** `main`.
- **Commit de merge:** `8523497`.
- **Flujo:** push a `main` → GitHub Actions ejecutó `npm ci` y `node scripts/preparar.mjs` → publicó `_site` con `/derivados` generado.
- **Run de Actions:** completado con éxito el 2026-11-19 (05:33 UTC).
- **URL verificada:** `https://impenta-tepa.github.io/imprentatepatitlan/` con parámetro de caché.
- **Resultado:** 4 destacadas, catálogo 9 + “Ver todas” = 19, 7 filtros (6 categorías + Todas), buscador, visor con Esc y devolución de foco, formulario que abre WhatsApp, 19 imágenes cargadas, consola sin errores y sin scroll horizontal a 360 px.

---

## Fase 2 — Servicios agrupados + nuevo orden de la home

- [x] Reordenar la home exactamente como pide el brief.
- [x] Header fijo: logo + nav (Servicios, Promociones, Ubicación, Contacto) + botón de WhatsApp siempre visible.
- [x] Hero: headline actual + foto real de trabajos o placeholder marcado + CTA primario “Cotiza tu pedido por WhatsApp” + secundario “Ver servicios”.
- [x] Franja de confianza con 4 datos: Lonas urgentes · Facturación CFDI · Diseño incluido · Domingos con cita.
- [x] Servicios sobre fondo claro: 6 tarjetas, rejilla 3x2 en desktop, 2 columnas en tablet, 1 en móvil.
- [x] Usar las 6 categorías exactas del brief, incluida “Toldos y anuncios”.
- [x] Cada tarjeta de servicio: foto real o placeholder, nombre, 3–4 ejemplos y enlace “Ver más” preparado para la subpágina futura.
- [x] Promociones destacadas desde `data/promociones.js`.
- [x] Catálogo con filtros alineados a las 6 categorías.
- [x] Estructura de 3 testimonios reales + galería de trabajos; oculta si no hay datos reales.
- [x] Compactar “¿Vienes de fuera de Tepatitlán? Domingos con cita” a una banda.
- [x] Compactar “¿Ya tienes tu diseño?” a una franja breve con CDR/AI/PSD/PDF/PNG/JPG.
- [x] Contacto: formulario actual + mapa con carga diferida + horarios + pagos y facturación.
- [x] Franja oscura de cierre: “Aquí empieza tu próxima impresión” + WhatsApp.
- [x] Footer completo con los datos del negocio.
- [x] Reporte de Fase 2 y pausa para aprobación.

**Estado:** Fase 2 implementada, construida y verificada en `borrador`. **No publicada en `main`**; espera aprobación del dueño/asesor.

### Registro de Fase 2

| Fecha | Intervención | Firma |
|---|---|---|
| 2026-11-19 | Reordenar la home: hero → franja de confianza → servicios → destacadas → catálogo → testimonios ocultos → foráneos → formatos → contacto → cierre → footer. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Header con nav Servicios, Promociones, Ubicación, Contacto + Cotizar; icono de WhatsApp en móvil; “Ubicación” ancla al mapa. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Hero con headline aprobado, CTA primario de WhatsApp y secundario “Ver servicios”; banner actual marcado como TODO-DOMINGO. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Franja de confianza de 4 datos y 6 tarjetas de servicio claras con las 6 macrocategorías exactas, ejemplos y “Ver más” que aplica el filtro del catálogo. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Placeholders dignos de las 6 fotos de servicio y de la foto de hero/testimonios, marcados TODO-DOMINGO; testimonios y galería ocultos. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Tarjetas de promoción con marco fijo 4:5, `object-fit: cover`, `width`/`height` 800x1000 y detección `is-square` para el arte cuadrado legado con `contain`. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Banda compacta de foráneos y franja compacta de formatos; contacto claro con formulario, mapa diferido por clic, horarios, pagos y CFDI; cierre negro único y footer completo. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Select del formulario alineado a las 6 macrocategorías + “Otro”; el mensaje de WhatsApp usa el nombre visible. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Build y `npm run verificar` en verde; 24 comprobaciones estructurales de Fase 2; viewports 320, 360, 390, 430, 768, 844, 1024 y 1280 sin scroll horizontal; consola sin errores. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Lighthouse móvil sobre el build local: Performance 87, Accesibilidad 100, Buenas prácticas 100, SEO 100. LCP 2.9 s, CLS 0, TBT 340 ms, primera carga 303 KiB. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Commit único de Fase 2 en `borrador`; reporte y pausa para aprobación. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Aprobación del asesor y autorización de publicación en `main`. | Asesor de Domingo |
| 2026-11-19 | Merge `borrador` → `main` (commit `1a84847`) y despliegue de GitHub Actions en verde (run `44471747493`). | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Verificación en vivo de Fase 2: orden de secciones, hero, 6 servicios, select, anclas, mapa diferido, cierre, footer, 4 destacadas, 9 + “Ver todas” = 19, 7 filtros, buscador, visor, formulario, imágenes y consola sin errores. | DeepSeek V4.1 Flash Free (OpenCode) |

**Estado:** Fase 2 aprobada, publicada en `main` y verificada en vivo.

### Publicación de Fase 2

- **Rama publicada:** `main`.
- **Commit de merge:** `1a84847`.
- **Run de Actions:** `44471747493`, completado con éxito el 2026-11-19 (06:22 UTC).
- **URL verificada:** `https://impenta-tepa.github.io/imprentatepatitlan/?v=[timestamp]`.
- **Resultado:** orden nuevo de las secciones, hero con el headline y los dos CTA, 6 tarjetas de servicio con los nombres exactos, “Ver más” que filtra y baja al catálogo, select con las 6 macrocategorías + “Otro”, mensaje de WhatsApp con el nombre visible, anclas que aterrizan debajo del header, mapa que no se descarga hasta pulsar el botón y luego carga, franja de cierre, footer completo, 4 destacadas, 9 iniciales + “Ver todas” = 19, 7 filtros, buscador, visor, formulario, 19 imágenes de promoción cargadas, consola sin errores y sin scroll horizontal a 360 ni 320 px.
- **Nota para Fase 3:** mover el foco al encabezado del catálogo al usar “Ver más” queda como mejora de Fase 3; en la verificación de Fase 2 se comprobó el filtro y el scroll, no el foco.

---

## Fase 3 — Móvil, rendimiento, accesibilidad y SEO

- [x] Mobile-first; cero scroll horizontal incluso a 320 px.
- [x] Safe areas en header, botones flotantes, nav móvil y contenido (`env(safe-area-inset-*)`).
- [x] Objetivos táctiles de 44 px; formulario con texto de 16 px.
- [x] Menú hamburguesa accesible: `aria-expanded`, cierre con Esc, cierre con toque fuera y `inert` cuando está cerrado.
- [x] Imágenes con `width`/`height` o `aspect-ratio`; hero 21:9, servicios 16:10 y promociones 4:5; logos optimizados.
- [x] Mapa en iframe con carga diferida al pulsar el botón.
- [x] Teléfonos, WhatsApp y correo como enlaces `tel:`, `wa.me` y `mailto:`.
- [x] Contraste AA, un solo `h1`, jerarquía `h2`/`h3`, alt descriptivos, foco visible, visor con Esc y `prefers-reduced-motion`.
- [x] SEO local: title y meta description con “imprenta en Tepatitlán”; JSON-LD LocalBusiness con datos reales.
- [x] Probar 320, 360x800, 390x844, 430x932, 768, 844, 1024, 1280 y horizontal; consola sin errores.
- [x] Reporte de Fase 3 y pausa para aprobación.

**Estado:** Fase 3 aprobada, publicada en `main` y verificada en vivo el 2026-11-19. Puerta de rendimiento aprobada; no se abre Fase 3.1.

### Registro de Fase 3

| Fecha | Intervención | Firma |
|---|---|---|
| 2026-11-19 | Logos de header y footer optimizados a 200 px y 240 px en WebP y PNG, con `width`/`height` y preload del logo del header. Queda pendiente el SVG definitivo de Domingo. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Build con minificación de CSS, fuentes, JS y datos mediante esbuild; los fuentes permanecen legibles. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Destacadas y catálogo se pintan antes de entrar en pantalla con `IntersectionObserver`; el catálogo ya no bloquea el primer pintado. Los enlaces internos pintan las secciones diferidas antes de saltar para que el destino no se mueva. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Auditoría de safe areas con insets de iPhone portrait, iPhone landscape y Android; nav móvil con padding seguro y `scroll-margin-top` en secciones. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Objetivos táctiles de 44 px en filtros, visor, footer, contacto, zoom de promos, enlaces de servicio, mapa y botón flotante; formulario a 16 px. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | “Ver más” de servicios filtra, hace scroll, enfoca el encabezado del catálogo y actualiza la URL; el estado muestra la categoría activa y “Todas” queda visible con `position: sticky`. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Menú móvil con `inert` al cerrar; recorrido solo con teclado por menú, filtros, visor, formulario y mapa. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Hero con proporción 21:9 reservada, servicios 16:10 y promociones 4:5; placeholders con la proporción final. La imagen del hero queda con `loading="lazy"` para no competir con el logo LCP. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Verificación final: 13 comprobaciones de Fase 3, build con 87 derivados, minificación 73 KB → 52 KB, viewports sin scroll horizontal, teclado y safe areas aprobados, consola sin errores. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Lighthouse móvil local de Fase 3: Performance 97, Accesibilidad 100, Buenas prácticas 100, SEO 100. LCP 2.5 s, CLS 0, TBT 50 ms, primera carga 250 KiB. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Commit de Fase 3 en `borrador`; sin merge a `main`. | DeepSeek V4.1 Flash Free (OpenCode) |

**Notas de la Fase 3:**
- El objetivo obligatorio de LCP ≤ 2.5 s se cumple; el ideal ≤ 2.0 s no se alcanzó. El elemento LCP sigue siendo el logo del header y el CSS de la página sigue siendo render-blocking. El SVG en línea que entregará Domingo es la siguiente mejora natural.
- La medición local de Lighthouse es variable: la corrida de referencia dio 97 de Performance y 50 ms de TBT; corridas posteriores en el mismo equipo, sin cambios funcionales, dieron 64–73 y TBT de 1.2–2.4 s. La verificación definitiva debe hacerse en vivo después de publicar.
- No hubo dispositivo Android físico ni iPhone/Safari conectados. Las pruebas móviles se hicieron con emulación de Chrome y CDP (viewport, safe areas y user agent); queda pendiente la prueba en dispositivo real.
- El registro de publicación de Fase 2 (`2af0bd7`) quedó incluido en el merge de Fase 3; no se generó un despliegue extra.

### Publicación de Fase 3

- **Rama publicada:** `main`.
- **Commit de merge:** `767f87b`.
- **Run de Actions:** `44553795932`, completado con éxito el 2026-11-19 (15:21 UTC).
- **URL verificada:** `https://impenta-tepa.github.io/imprentatepatitlan/?v=[timestamp]`.
- **Verificación en vivo:** 320 y 360 px sin scroll horizontal; 4 destacadas; 9 iniciales + “Ver todas” = 19; 7 filtros; “Ver más” aplica “Papelería comercial y empresarial”, actualiza a `#catalogo` y enfoca `#catalogo-titulo`; mapa con 0 iframes antes del clic y 1 después; visor abre y cierra con Escape; formulario arma `wa.me/5213781097423` con servicio, cantidad y detalles; consola sin errores.
- **PSI móvil:** 3 corridas; mediana 98 / 100 / 100 / 100; LCP 1.4 s, TBT 0 ms, CLS 0. Elemento LCP: logo del header (`logo-header.webp`, 200 x 145 px).
- **PSI escritorio:** 3 corridas; mediana 100 / 100 / 100 / 100; LCP 0.3 s, TBT 0 ms, CLS 0. Elemento LCP: banner del hero.
- **Puerta de decisión:** aprobada. Fase 3 cerrada; no se abre Fase 3.1.
- **Prueba en dispositivo real:** pendiente, con checklist y tabla en `docs/pruebas-dispositivo.md`.

---

## Fase 4 — Datos y contenido

**Estado:** Fase 4.0 (correcciones confirmadas y ajustes del asesor) aplicada en `borrador`; no publicada en `main`. Los lotes 4A, 4B y 4C esperan los copies y archivos de Domingo.

### Preparación (2026-11-19)

- [x] `docs/entregables-domingo.md`: rutas y nombres exactos, formatos, pesos máximos y `alt` sugerido por archivo.
- [x] `data/testimonios.js`: fuente única de testimonios y trabajos de galería, con arreglos vacíos hasta tener datos reales.
- [x] `docs/testimonios-format.md`: esquema, umbrales de activación y reglas.
- [x] Render automático desde datos: la sección se muestra con 3 testimonios activos; la galería es opcional con 4 trabajos. No se edita el HTML.
- [x] Logo SVG preparado: puntos de sustitución comentados en header y footer, reglas CSS para SVG en línea y WebP interino conservado.
- [x] Build: minifica `data/testimonios.js` y copia `galeria/`.
- [x] Verificación: 6 comprobaciones nuevas de Fase 4.
- [x] Prueba de activación en `_site` con datos ficticios no commiteados: 3 testimonios + 4 fotos muestran la sección; con arreglos vacíos sigue oculta; sin scroll horizontal a 320 px.
- [ ] Lote 4A: precios de las 4 destacadas y su arte 4:5.
- [x] Fotos de servicio recibidas e integradas como provisionales: 6 mockups de 1376 x 768, recorte 16:10 y derivados de 800 y 1200 px en WebP/JPG.
- [ ] Lote 4B completo: foto real del hero, SVG del logo y medición eager/lazy.
- [ ] Lote 4C: precios de las 14 restantes, testimonios, galería y correcciones confirmadas.

### Fase 4.0 — Correcciones confirmadas (2026-11-20)

- WhatsApp principal confirmado: `5213781097423` (378 109 7423). No se cambió ningún enlace; el 378 101 1768 queda como secundario.
- “Anuncio circular” pasa a Toldos y anuncios como “Anuncio circular con luz”; se conservan id e imagen. Toldos deja de estar vacía; la prueba de categoría vacía usa Láser o Diseño.
- “Sellos varios · precios” se consolida en “Sellos varios”. El catálogo queda en 18 fichas activas; `sellos varios PRECIOS.jpg` se conserva sin ficha y el verificador lo permite.
- Activación de testimonios desacoplada: 3 testimonios muestran la sección; la galería se agrega con 4 trabajos. Solo fotos, sin testimonios, no muestra la sección.
- Entregables de galería actualizados a 1200 x 900 (4:3) y retratos a 600 x 600 (1:1).
- Logo SVG con caja reservada: header 92 x 66.7 px (80 x 58 px en móvil) y footer 120 x 87 px. Al sustituir se re-verifican header, anclas, safe areas y LCP.
- Primera carga medida por transferencia real, no por tamaño en disco: **255.4 KiB** móvil (HTML 6.8, CSS 6.6, JS 5.5, datos 2.3, fuentes 85.8, imágenes 127.5, favicon 21.0). Coincide con los ~250 KiB de PSI de Fase 3. Lighthouse móvil actual: 98/100/100/100, LCP 2.4 s, TBT 0 ms, CLS 0.
- Pruebas de activación: 3 testimonios sin galería → sección visible; 0 testimonios + 4 fotos → oculta; 3 + 4 → ambas visibles.
- Pruebas de categorías: Láser y Diseño muestran el mensaje de categoría vacía; Toldos muestra “Anuncio circular con luz”; Todas muestra 18 promociones.
- Fotos de servicio con etiqueta “Imagen ilustrativa”: origen y licencia registrados por archivo en `docs/notas.md`; el flag `ilustrativa` vive en `data/servicios.js` y al cambiarlo a `false` desaparece la etiqueta y el prefijo del `alt`, sin tocar HTML.
- Publicación de Fase 4.0 autorizada el 2026-11-20; se publica junto con esta condición y se registran las mediciones en vivo.

### Publicación de Fase 4.0

- **Rama publicada:** `main`.
- **Commit de merge:** `f3d0109`.
- **Run de Actions:** `44576882173`, completado con éxito el 2026-11-20 (17:24 UTC).
- **URL verificada:** `https://impenta-tepa.github.io/imprentatepatitlan/?v=f40-live`.
- **Verificación en vivo:** Toldos muestra 1 promoción, “Anuncio circular con luz”; “Sellos varios” aparece una sola vez; Todas + “Ver todas” = 18; Láser y Diseño muestran el mensaje de categoría vacía; 4 destacadas; 9 iniciales; 7 filtros; buscador “sellos” = 1; visor abre y cierra con Escape; mapa 0 → 1 iframe; formulario arma `wa.me/5213781097423`; las 6 tarjetas muestran “Imagen ilustrativa” y su `alt` lleva el prefijo; consola sin errores; sin scroll horizontal a 320 y 360 px.
- **PSI:** disponible parcialmente. La API respondió 429 por cuota diaria agotada. La web de PSI completó **1 corrida móvil**: 98 / 100 / 100 / 100; LCP 1.4 s; TBT 0 ms; CLS 0. Las corridas 2-3 y las de escritorio quedaron atascadas en “Ejecutando análisis” y no terminaron. Se usó Lighthouse 13.6 sobre la URL publicada, 3 corridas por modo, como respaldo.
- **Lighthouse móvil (mediana):** 99 / 100 / 100 / 100; LCP 1.56 s; TBT 88 ms; CLS 0; 360 KiB.
- **Lighthouse escritorio (mediana):** 100 / 100 / 100 / 100; LCP 0.45 s; TBT 0 ms; CLS 0; 426 KiB.
- **Elemento LCP:** móvil, 2 de 3 corridas el banner del hero y 1 el logo; escritorio, 2 de 3 el banner y 1 el logo. Ambos muy por debajo de 2.5 s; no se cambia el hero.
- **Guarda:** PSI móvil 98 ≥ 90 con LCP 1.4 s ≤ 2.5 s; Lighthouse móvil 99 ≥ 90 con LCP 1.56 s ≤ 2.5 s. Cumplida.
- **Nota:** la corrida PSI móvil confirma el resultado de Lighthouse. El 2026-11-20 el asesor aceptó ambas mediciones y cerró el tema; no se repiten corridas hasta el Lote 4B.

### Cierre de rendimiento y micro-lote de favicon (2026-11-20)

- **Tema cerrado por el asesor:** se aceptan PSI móvil 98 / LCP 1.4 s / TBT 0 / CLS 0 y Lighthouse móvil 99 / LCP 1.56 s / TBT 88 ms / CLS 0; escritorio 100 / LCP 0.45 s. Guarda cumplida en ambos métodos.
- **Sin nuevas corridas:** no se ejecuta PSI ni Lighthouse hasta el Lote 4B, cuando entren la foto real del hero, las fotos reales de servicios y el SVG del logo.
- **Observación LCP:** el elemento alterna entre el banner del hero y el logo del header. Refuerza la prueba de `eager` + `fetchpriority="high"` prevista para el hero real en 4B; hoy el LCP de 1.56 s está dentro de la meta.
- **Favicon:** `LOGOS/quad-print-favicon.png` pasó de 502 × 502 px y 21,251 bytes a 128 × 128 px y 4,454 bytes, conservando proporción y aspecto. Se mantiene la misma ruta en `index.html`, `404.html` y el JSON-LD; 128 px cumple el mínimo de 112 × 112 px del logo estructurado. Ahorro aproximado en la primera carga: 16.6 KiB. El verificador ahora exige favicon menor a 5 KiB.
- **Verificación:** build + `npm run verificar` en verde; verificación en vivo con `?v=[timestamp]` sin errores y con la etiqueta “Imagen ilustrativa” en las 6 tarjetas.
- **Firma:** DeepSeek V4.1 Flash Free (OpenCode).

### Condición de imágenes de servicio (confirmada 2026-11-20)

- Las 6 tarjetas renderizadas desde `data/servicios.js` muestran la etiqueta visible **“Imagen ilustrativa”**.
- El `alt` de cada imagen lleva el prefijo exacto **“Imagen ilustrativa: ”**.
- El origen y la licencia por archivo están registrados en `docs/notas.md`, decisión 46: mockups con marca Quad Print entregados por Domingo, usados con autorización del dueño, sin licencia de stock identificada.
- Mientras `ilustrativa: true`, la etiqueta y el prefijo se mantienen; al cambiar a `false`, ambos desaparecen sin editar HTML.

### Cambio de cuenta a imprenta-tepa (2026-11-20)

- La cuenta de GitHub pasó de `impenta-tepa` a `imprenta-tepa`; el repositorio conserva el nombre `imprentatepatitlan`.
- Nueva base pública: `https://imprenta-tepa.github.io/imprentatepatitlan/`.
- Se actualizaron `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt`, README, checklist de dispositivos y la base del verificador.
- Las entradas históricas de este plan conservan la URL con la que se verificó cada fase.
- **Firma:** DeepSeek V4.1 Flash Free (OpenCode).

**Regla del hero:** al integrar la foto real se mide una vez en PSI móvil y escritorio con `eager` + `fetchpriority="high"`. Si el LCP móvil sigue ≤ 2.5 s, se deja eager; si empeora, se regresa a `lazy`. Se reportan ambos números.

**Datos:** se aplican verbatim desde los copies del asesor. No se transcriben precios de imágenes ni se inventan testimonios. Categorías y WhatsApp solo cambian con confirmación explícita.

---

## Historial previo a la Fase 1

| Fecha | Intervención | Firma |
|---|---|---|
| 2026-11-18 | Encabezado: estado abierto/cerrado movido a Contacto > Horario; texto “Fuera de horario · abrimos…”. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Soporte de notch/safe areas en header, contenedor y botón flotante de WhatsApp. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Barra CMYK movida al pie del encabezado como divisoria. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Eliminado el ícono de WhatsApp duplicado del encabezado. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-18 | Respaldo completo: ramas `borrador`, `respaldo-antes-qwen-2026-11-18`, etiqueta `respaldo-qwen-2026-11-18`, carpeta y ZIP en el escritorio. | DeepSeek V4.1 Flash Free (OpenCode) |

> El archivo `plan.md` de la raíz es el plan histórico de la pasada final anterior. Este `docs/plan.md` es el plan vigente del rediseño por fases.
