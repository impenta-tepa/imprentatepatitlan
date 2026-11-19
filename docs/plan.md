# Plan de trabajo — Home Quad Print Tepatitlán

**Última actualización:** 2026-11-19
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

- [ ] Mobile-first; cero scroll horizontal incluso a 320 px.
- [ ] Safe areas en header, botones flotantes y contenido (`env(safe-area-inset-*)`).
- [ ] Objetivos táctiles de 44–48 px; texto base mínimo de 16 px.
- [ ] Menú hamburguesa accesible: `aria-expanded`, cierre con Esc y con toque fuera.
- [ ] Imágenes WebP < 150 KB; `width`/`height` para evitar CLS; `loading="lazy"` salvo el hero; preload del hero.
- [ ] Mapa en iframe con carga diferida al entrar en viewport o al interactuar.
- [ ] Teléfonos, WhatsApp y correo como enlaces `tel:`, `wa.me` y `mailto:`.
- [ ] Contraste AA, un solo `h1`, jerarquía `h2`/`h3`, alt descriptivos, foco visible, visor con Esc y `prefers-reduced-motion`.
- [ ] SEO local: title y meta description con “imprenta en Tepatitlán”; JSON-LD LocalBusiness con datos reales.
- [ ] Probar 320, 360x800, 390x844, 430x932, 768, 1024, 1280 y horizontal; consola sin errores.
- [ ] Reporte de Fase 3 y pausa para aprobación.

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
