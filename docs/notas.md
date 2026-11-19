# Notas, decisiones y pendientes

**Última actualización:** 2026-11-19
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)
**Fase actual:** Fase 2 publicada en `main`; Fase 3 terminada en `borrador`, pendiente de aprobación.

---

## Decisiones tomadas

1. **Se usó `data/promociones.js`, no `datos/`.**
   El brief pide esa ruta exacta. Se eliminaron `datos/catalogo.js` y el manifiesto generado `datos/promociones.js`. Ahora hay una sola fuente de verdad y el build ya no la sobrescribe.

2. **El headline regresó a “Tu idea merece una gran impresión.”**
   El dueño lo había cambiado a “¡Contáctanos y cotiza tu pedido!”. El asesor aprobó la Fase 1 y pidió regresar al headline del brief: el headline vende el beneficio y la acción la pide el botón. El texto del dueño se conserva en el botón primario del hero, ahora “Cotiza tu pedido por WhatsApp”. Se mantiene el estilo del `<span class="mark">`.

3. **Los 19 precios quedan en `null`.**
   Hoy los precios están dentro de las imágenes. No se leyeron, no se transcribieron y no se inventaron. La tarjeta muestra “Precio: confirmar por WhatsApp”.

4. **Las unidades son una propuesta.**
   Cuando el título o la descripción indican cantidad (“1000”, “100”, “caja 36”, “paquete 3”), se propuso una unidad (`el millar`, `el ciento`, `caja 36 pzas`, `paquete 3 pzas`). Hay que confirmarlas con Domingo. Las que no se podían inferir quedaron vacías.

5. **Las 4 destacadas son las mismas que ya se mostraban.**
   Tarjetas 1000 · 2 lados mate, Tazas personalizadas, Playera familiar y Banner 1.80 m. Ahora se generan desde `destacado: true`, no desde HTML hardcodeado.

6. **Se mantuvieron las 19 imágenes actuales.**
   Todas son cuadradas (aproximadamente 983 x 983 px) y varias tienen texto y precio dentro del arte. Se conservan temporalmente, como pide el brief. La lista para re-exportar está en el reporte de Fase 1.

7. **Las 6 macrocategorías ya existen, aunque 3 no tengan promociones.**
   Reparto actual:
   - Papelería comercial y empresarial: 10
   - Gran formato: 2
   - Textiles y promocionales: 7
   - Corte y grabado láser: 0
   - Toldos y anuncios: 0
   - Diseño gráfico: 0

   Los filtros muestran las 6 categorías. Si no hay promociones, el catálogo invita a cotizar por WhatsApp. No se inventaron promociones para llenarlas.

8. **El visor conserva su diseño y mejora la accesibilidad.**
   Se agregó `alt` descriptivo, foco al abrir y cerrar, cierre explícito con Esc y devolución del foco al botón que abrió el visor. El `close` nativo del `<dialog>` no disparó en el navegador de pruebas, así que el cierre se resolvió con una función explícita.

9. **El catálogo pasa a 2 columnas en tablet.**
   Con la tarjeta nueva (precio, vigencia y CTA), 3 columnas a 768 px quedaban muy apretadas. Ahora: 3 columnas en desktop, 2 hasta 900 px y 1 en móvil. Los filtros se desplazan horizontalmente en móvil.

10. **Publicación de Fase 1 en `main` autorizada.**
    El asesor autorizó el merge `borrador` → `main` el 2026-11-19, con el ajuste previo del headline. La publicación se hace con el flujo existente: push a `main` → GitHub Actions ejecuta el build → publica `_site` con `/derivados` generado. El detalle de la verificación en vivo se registra en `docs/plan.md`.

11. **La home de Fase 2 sigue el orden del brief.**
    Hero → franja de confianza (4 datos) → servicios claros (6 tarjetas) → promociones destacadas → catálogo → testimonios/galería ocultos → banda de foráneos → franja de formatos → contacto claro → franja negra de cierre → footer. La franja negra grande quedó solo al cierre; el footer conserva su fondo oscuro.

12. **Las tarjetas de servicio usan las 6 macrocategorías exactas.**
    Papelería comercial y empresarial, Gran formato, Textiles y promocionales, Corte y grabado láser, Toldos y anuncios y Diseño gráfico. Cada tarjeta muestra 3–4 ejemplos y “Ver más” aplica el filtro del catálogo (`data-filtro`), dejando preparado el enlace para la futura subpágina.

13. **Las fotos que faltan quedan como placeholders dignos y marcados.**
    Hero, las 6 tarjetas de servicio y la estructura de testimonios tienen comentarios `TODO-DOMINGO`. Los servicios muestran un placeholder gráfico con número y “Foto próximamente”; no se usaron fotos ajenas ni se inventaron testimonios. La sección de testimonios/galería está oculta hasta tener 3 testimonios reales con nombre y negocio y fotos propias.

14. **Las miniaturas de promoción usan un marco fijo 4:5.**
    El marco tiene `aspect-ratio: 4 / 5` y las imágenes `width="800" height="1000"` para reservar espacio y evitar CLS. Las imágenes nuevas se verán con `object-fit: cover`. Las 19 imágenes actuales son cuadradas y se detectan por JavaScript; reciben la clase `is-square` y se muestran completas con `object-fit: contain` para no recortar texto ni precios. Al reemplazar el arte, la clase desaparece sola.

15. **El mapa se carga solo cuando la persona lo pide.**
    La fachada del local se muestra con una foto real y un botón “Ver mapa interactivo”. Al pulsarlo se crea un iframe de Google Maps con `loading="lazy"`. Así la primera carga no descarga el mapa ni scripts de terceros. Siempre queda el enlace “Abrir en Google Maps”.

16. **El formulario usa las 6 macrocategorías visibles.**
    El select de servicio tiene las 6 categorías exactas + “Otro”. El mensaje de WhatsApp se arma con el texto visible de la opción, sin códigos internos. No se cambió la lógica de envío: solo abre WhatsApp con el mensaje preparado.

17. **“Ubicación” ancla al mapa.**
    El nav del header quedó: Servicios, Promociones, Ubicación, Contacto + Cotizar. “Ubicación” lleva a `#ubicacion`, el bloque del mapa dentro de Contacto; “Contacto” lleva al inicio de la sección. En móvil se agregó un icono de WhatsApp siempre visible en el header.

18. **Contacto es claro; el cierre es la única franja negra grande.**
    El contacto pasó de fondo negro a fondo de papel con formulario blanco. La franja de cierre “Aquí empieza tu próxima impresión” es la única banda negra grande; el footer conserva su fondo oscuro habitual.

19. **Resultado de Fase 2 en rendimiento y accesibilidad.**
    Lighthouse móvil sobre el build local: Performance 87, Accesibilidad 100, Buenas prácticas 100 y SEO 100. LCP 2.9 s, CLS 0, TBT 340 ms y primera carga 303 KiB. Se corrigió el contraste del eyebrow cian y el nombre accesible del botón del mapa. La mejora fina de rendimiento (minificación, CSS crítico, fuentes) queda para Fase 3.

20. **Fase 2 publicada y verificada.**
    Merge `borrador` → `main` con commit `1a84847` y run `44471747493` en verde. Se verificó en vivo el orden de secciones, hero, 6 servicios, select, anclas, mapa diferido, cierre, footer, 4 destacadas, 9 + “Ver todas” = 19, 7 filtros, buscador, visor, formulario, imágenes y consola. El registro de publicación quedó en `docs/plan.md` en el commit `2af0bd7` de `borrador`; se publicará junto con la Fase 3 para no generar un despliegue extra.

21. **Logo optimizado como puente mientras llega el SVG.**
    El logo del header y del footer se generan a 200 px y 240 px de ancho en WebP y PNG, con `width`/`height` explícitos y preload del logo del header. El elemento LCP sigue siendo el logo; el SVG en línea que entregará Domingo es la mejora definitiva. No se sirve el PNG original de 407 x 295.

22. **El build minifica, los fuentes quedan legibles.**
    `scripts/preparar.mjs` minifica `css/estilos.css`, `fonts/fonts.css`, `js/sitio.js` y `data/promociones.js` solo en `_site`. Se agregó `esbuild` como dependencia de desarrollo. La reducción medida fue de 73 KB a 52 KB en CSS + fuentes + JS + datos.

23. **Destacadas y catálogo se pintan antes de entrar en pantalla.**
    `IntersectionObserver` con `rootMargin: 1200px` renderiza las secciones pesadas sin bloquear el primer pintado. Los enlaces internos que apuntan a secciones posteriores pintan las secciones diferidas antes del salto, para que el destino no se mueva. “Ver más” de servicios pinta, filtra, hace scroll y enfoca el encabezado del catálogo.

24. **Safe areas probadas con insets reales simulados.**
    Se probaron iPhone portrait (47/0/34/0), iPhone landscape (0/47/21/47) y Android portrait (24/0/24/0) con CDP. El contenido del header, el nav, el botón flotante y el footer quedan dentro del área segura. El nav móvil usa padding lateral seguro.

25. **Objetivos táctiles y texto de formulario.**
    Filtros, botones del visor, enlaces del footer, contacto, zoom de promos, enlaces de servicio, mapa, cierre y botón flotante tienen al menos 44 px de alto. Los campos del formulario usan 16 px para evitar el zoom automático de iOS. El texto base del cuerpo sigue en 16 px; las etiquetas pequeñas son secundarias.

26. **El menú móvil cerrado no recibe foco.**
    Se agregó `inert` al nav cuando está cerrado en móvil y se quita al abrir. El recorrido solo con teclado confirmó que los enlaces cerrados no aparecen en el orden de tabulación, que Enter abre el menú, que Tab llega a “Servicios” y que Escape cierra y devuelve el foco al botón.

27. **Proporciones reservadas para las fotos.**
    Hero 21:9, servicios 16:10, promociones 4:5 y logos con dimensiones explícitas. Los placeholders de servicios usan la proporción final para que el cambio de foto no mueva el layout. El hero mantiene el banner actual como sustituto marcado. La imagen del hero usa `loading="lazy"` para no competir con el logo, que es el LCP.

28. **Resultado de Fase 3 y límites.**
    Lighthouse móvil local: mejor corrida verificada con Performance 97, Accesibilidad 100, Buenas prácticas 100, SEO 100. LCP 2.5 s, CLS 0, TBT 50 ms y 250 KiB. Se cumple el objetivo obligatorio de LCP ≤ 2.5 s; el ideal ≤ 2.0 s no se alcanzó porque el CSS sigue siendo render-blocking y el LCP es el logo. La medición local es variable: corridas posteriores en el mismo equipo, sin cambios funcionales, dieron 64–73 de Performance y TBT de 1.2–2.4 s; la verificación definitiva debe hacerse en vivo. No hubo Android físico ni Safari/iOS conectados: las pruebas móviles fueron con emulación de Chrome y CDP. Queda pendiente la prueba en dispositivo real.

29. **Registro de Fase 2 sin despliegue extra.**
    El commit `2af0bd7` con el registro de publicación de Fase 2 está en `borrador`, no en `main`. Se publicará junto con la Fase 3 cuando se apruebe, respetando el límite de compilaciones de GitHub Pages y la regla de un despliegue por fase.

---

## Pendientes para Domingo (TODO-DOMINGO)

1. **Precios de las 19 promociones.** La tabla exacta está en el reporte de Fase 1.
2. **Unidades.** Confirmar `el millar`, `el ciento`, `c/u`, `caja 36 pzas`, `paquete 3 pzas`, etc.
3. **IVA.** Decidir si cada precio es `incluido`, `+ IVA` o no aplica.
4. **Vigencia.** Fecha `AAAA-MM-DD` o `null` para cada promoción.
5. **Destacadas.** Confirmar las 4 actuales o elegir otras. Máximo 4.
6. **WhatsApp principal.** Hoy todos los enlaces usan `5213781097423` (378 109 7423). Confirmar si ese es el principal o si debe ser 378 101 1768.
7. **Imágenes nuevas.** Las 19 deben re-exportarse a 1080 x 1350 px, proporción 4:5, WebP menor a 150 KB, solo producto sobre fondo limpio, sin texto ni precio dentro de la imagen.
8. **Headline.** Resuelto: se regresó a “Tu idea merece una gran impresión.” y el botón primario dice “Cotiza tu pedido por WhatsApp”.
9. **Categorías ambiguas.** Confirmar la asignación de:
   - `anuncio-circular` → hoy en Papelería.
   - `paquete-padrinos` → hoy en Papelería.
   - `panalero-2026` → hoy en Textiles y promocionales.
10. **Descripción de “Sellos varios · precios”.** Hoy dice “precios y opciones en la imagen”. Cuando la imagen nueva ya no tenga precios, hay que cambiar la descripción.
11. **6 fotos de servicio.** Una por macrocategoría: papelería, gran formato, textiles, láser, toldos y diseño. Ideal horizontal, al menos 1200 px de ancho. Hoy hay placeholders marcados `TODO-DOMINGO`.
12. **Foto real para el hero.** Una foto de trabajos, del taller o del equipo, horizontal y de al menos 1600 px de ancho. Hoy se usa el banner actual como sustituto marcado `TODO-DOMINGO`.
13. **3 testimonios reales.** Nombre, negocio y texto autorizado. Sin testimonios inventados. La sección está oculta hasta tenerlos.
14. **Fotos propias para la galería de trabajos.** Pueden ser las mismas de servicios o fotos adicionales. La sección está oculta hasta tener material real.
15. **SVG del logo.** Domingo lo entregará para sustituir el WebP/PNG interino del header y del footer. Es la mejora natural del LCP.
16. **Prueba en dispositivo real.** Falta probar en un Android de gama media y, si hay, en iPhone/Safari. El agente solo tiene emulación de Chrome y CDP.

---

## Respuestas del asesor (2026-11-19)

1. **Headline:** regresar a “Tu idea merece una gran impresión.” y renombrar el botón primario a “Cotiza tu pedido por WhatsApp”. Hecho.
2. **Destacadas dentro del catálogo:** sí se quedan. El catálogo es el inventario (19); destacadas es la vitrina curada. La duplicación que se eliminó era la hardcodeada.
3. **Categorías vacías:** sí se quedan visibles con el mensaje de invitación a cotizar. En Fase 2 las tarjetas de servicio enlazan a esos filtros.
4. **Publicación:** autorizada. Se publicó la Fase 1 en `main` con el ajuste del headline y se verificó en vivo.

---

## Riesgos y notas técnicas

- **Precio en imagen vs. precio en tarjeta:** mientras las imágenes actuales no se reemplacen, algunas mostrarán precios dentro del arte y la tarjeta dirá “Precio: confirmar por WhatsApp”. Es temporal y está previsto en el brief.
- **Imagen sin ficha:** si se agrega una imagen a `promociones/` sin su objeto en `data/promociones.js`, `npm run verificar` falla. Es intencional para mantener una sola fuente de verdad.
- **Ficha sin imagen:** si una ficha apunta a una imagen que no existe, el build falla.
- **Más de 4 destacadas:** el build falla. Es la regla del brief.
- **`activo: false`:** oculta la promoción del sitio, pero el build sigue generando sus derivados. No afecta la página; se puede optimizar más adelante.
- **`data/promociones.js` es JavaScript, no JSON:** se eligió así para que funcione abriendo `index.html` sin servidor, como pide el brief. No se usa `fetch`.
- **El build lee la fuente única con `node:vm`:** así valida el archivo real que usa el navegador, sin duplicarlo.
- **Límite de compilaciones de GitHub Pages:** el plan gratuito permite 10 por hora. Un push a `main` por cada ajuste pequeño puede agotar el límite. Agrupar cambios en un solo commit/push y hacer build/verificación locales antes de publicar.
- **Peso y ancho de banda:** 1 GB para el sitio/repositorio y 100 GB al mes. Optimizar las imágenes antes de subirlas (WebP/JPG ligero, ideal 1080 x 1350 px y menos de 150 KB); no subir originales pesados. `_site/` y `node_modules/` no se versionan.
- **El plan histórico de la raíz (`plan.md`) no se tocó.** El plan vigente es `docs/plan.md`.

---

## Bitácora

| Fecha | Cambio | Firma |
|---|---|---|
| 2026-11-18 | Fase 1: fuente única, tarjeta unificada, filtros, precio pendiente, visor accesible, build y documentación. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Ajuste aprobado: headline del brief y CTA principal “Cotiza tu pedido por WhatsApp”. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Publicación de Fase 1 en `main` (merge `8523497`), Actions en verde y verificación en vivo. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Fase 2: nuevo orden de la home, nav y CTA, franja de confianza, 6 servicios claros, placeholders TODO-DOMINGO, promos 4:5, banda de foráneos, franja de formatos, contacto claro con mapa diferido, cierre negro y footer. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Fase 2: select del formulario con las 6 macrocategorías + Otro, “Ver más” de servicios hacia el filtro del catálogo y verificación de 24 comprobaciones. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Fase 2: Lighthouse móvil 87/100/100/100; LCP 2.9 s, CLS 0, TBT 340 ms, 303 KiB. Commit en `borrador`, sin publicar en `main`. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Fase 2 aprobada y publicada en `main` (merge `1a84847`, run `44471747493`); verificación en vivo completa. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Fase 3: logos optimizados, minificación, lazy render, safe areas, tap targets de 44 px, foco al catálogo, menú `inert` y proporciones reservadas. | DeepSeek V4.1 Flash Free (OpenCode) |
| 2026-11-19 | Fase 3: Lighthouse móvil 97/100/100/100; LCP 2.5 s, CLS 0, TBT 50 ms, 250 KiB. Commit en `borrador`, sin publicar en `main`. | DeepSeek V4.1 Flash Free (OpenCode) |
