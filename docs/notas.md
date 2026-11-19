# Notas, decisiones y pendientes

**Última actualización:** 2026-11-18
**Agente:** DeepSeek V4.1 Flash Free (OpenCode)
**Fase actual:** Fase 1 terminada, pendiente aprobación para publicar.

---

## Decisiones tomadas

1. **Se usó `data/promociones.js`, no `datos/`.**
   El brief pide esa ruta exacta. Se eliminaron `datos/catalogo.js` y el manifiesto generado `datos/promociones.js`. Ahora hay una sola fuente de verdad y el build ya no la sobrescribe.

2. **Se conservó el headline actual del dueño.**
   El brief pide “Tu idea merece una gran impresión”, pero el dueño cambió el headline a “¡Contáctanos y cotiza tu pedido!”. Se respetó el cambio del dueño y se marca el conflicto para que el asesor lo confirme.

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

10. **No se publicó en `main`.**
    Todo quedó en `borrador`. El push a `main` se hará solo con aprobación explícita del dueño.

---

## Pendientes para Domingo (TODO-DOMINGO)

1. **Precios de las 19 promociones.** La tabla exacta está en el reporte de Fase 1.
2. **Unidades.** Confirmar `el millar`, `el ciento`, `c/u`, `caja 36 pzas`, `paquete 3 pzas`, etc.
3. **IVA.** Decidir si cada precio es `incluido`, `+ IVA` o no aplica.
4. **Vigencia.** Fecha `AAAA-MM-DD` o `null` para cada promoción.
5. **Destacadas.** Confirmar las 4 actuales o elegir otras. Máximo 4.
6. **WhatsApp principal.** Hoy todos los enlaces usan `5213781097423` (378 109 7423). Confirmar si ese es el principal o si debe ser 378 101 1768.
7. **Imágenes nuevas.** Las 19 deben re-exportarse a 1080 x 1350 px, proporción 4:5, WebP menor a 150 KB, solo producto sobre fondo limpio, sin texto ni precio dentro de la imagen.
8. **Headline.** Confirmar si se queda “¡Contáctanos y cotiza tu pedido!” o se regresa a “Tu idea merece una gran impresión”.
9. **Categorías ambiguas.** Confirmar la asignación de:
   - `anuncio-circular` → hoy en Papelería.
   - `paquete-padrinos` → hoy en Papelería.
   - `panalero-2026` → hoy en Textiles y promocionales.
10. **Descripción de “Sellos varios · precios”.** Hoy dice “precios y opciones en la imagen”. Cuando la imagen nueva ya no tenga precios, hay que cambiar la descripción.

---

## Preguntas para el asesor

1. **Headline:** el brief pide conservar “Tu idea merece una gran impresión”, pero el dueño lo cambió. ¿Se respeta el cambio del dueño o se regresa al del brief?
2. **Destacadas dentro del catálogo:** hoy las 4 destacadas también aparecen en el catálogo completo. ¿El brief pide eliminarlas del catálogo o solo eliminar la duplicación hardcodeada? Se interpretó lo segundo.
3. **Categorías vacías:** ¿se dejan visibles las 3 categorías sin promociones (Láser, Toldos y anuncios, Diseño gráfico) o se ocultan hasta que tengan contenido?
4. **Publicación:** el brief pide push a la rama que publica y verificar la URL en vivo. El dueño pidió no publicar hasta aprobar. ¿Se autoriza pasar `borrador` a `main` al cerrar la Fase 1?

---

## Riesgos y notas técnicas

- **Precio en imagen vs. precio en tarjeta:** mientras las imágenes actuales no se reemplacen, algunas mostrarán precios dentro del arte y la tarjeta dirá “Precio: confirmar por WhatsApp”. Es temporal y está previsto en el brief.
- **Imagen sin ficha:** si se agrega una imagen a `promociones/` sin su objeto en `data/promociones.js`, `npm run verificar` falla. Es intencional para mantener una sola fuente de verdad.
- **Ficha sin imagen:** si una ficha apunta a una imagen que no existe, el build falla.
- **Más de 4 destacadas:** el build falla. Es la regla del brief.
- **`activo: false`:** oculta la promoción del sitio, pero el build sigue generando sus derivados. No afecta la página; se puede optimizar más adelante.
- **`data/promociones.js` es JavaScript, no JSON:** se eligió así para que funcione abriendo `index.html` sin servidor, como pide el brief. No se usa `fetch`.
- **El build lee la fuente única con `node:vm`:** así valida el archivo real que usa el navegador, sin duplicarlo.
- **El plan histórico de la raíz (`plan.md`) no se tocó.** El plan vigente es `docs/plan.md`.

---

## Bitácora

| Fecha | Cambio | Firma |
|---|---|---|
| 2026-11-18 | Fase 1: fuente única, tarjeta unificada, filtros, precio pendiente, visor accesible, build y documentación. | DeepSeek V4.1 Flash Free (OpenCode) |
