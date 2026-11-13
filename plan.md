# Plan de pasada final (post-Bloque 5, antes del push)

Estado: Bloque 5 **aprobado**. Pasada final aplicada con los defaults acordados. Sin commit y sin push. Quedan dos puertas externas antes de publicar: confirmación de los nombres comerciales y prueba literal del README en la interfaz web de GitHub.

## 1. Condición 4.1 — cerrada

- [x] `package.json` declara `sharp` (`^0.35.5`).
- [x] `pages.yml` ejecuta `npm ci` antes de `node scripts/preparar.mjs`.
- [x] `servir.mjs` sirve `.webp`, `.avif`, `.gif`, `.png`, `.jpg` y `.jpeg`.

Evidencia: `bloque4-revision/condicion-4.1.txt` y `bloque5-revision/condicion-4.1.txt`. La prueba definitiva será el Action en verde tras el push.

## 2. Alineación en 576 px — cerrada: se deja como está

Contexto: entre 576 y 767.98 px el contenedor de promociones es fluido (`max-width:none`) para que quepan dos columnas con imagen de 270 px. El encabezado queda a 12 px del borde y el logo del header a 30 px.

- [x] **Decisión (default):** mantener el contenedor fluido y la imagen de 270 px. Se prioriza la legibilidad del póster sobre la alineación de 18 px en una banda estrecha.
- [x] **Alternativa medida y descartada:** quitar el override deja el contenedor en 540 px, el encabezado alineado a 30 px y la imagen en **252 px**. La estimación anterior de ~220 px era incorrecta y queda retirada. Tampoco es 258: el cálculo real descuenta padding del contenedor, gutter `gx-2` y borde de la tarjeta.
- [x] Medición a 576: 2 columnas, imagen 270 px, `scrollWidth` 576, sin desbordamiento.

## 3. Cleanup de `.show` al cruzar 992 px — aplicado y probado

- [x] En `js/sitio.js`, listener `matchMedia('(min-width: 992px)')` que llama a `setMenu(false)` al entrar en desktop.
- [x] A 991 px con el menú abierto, al pasar a 992 px: `#menu.show` y `body.menu-open` desaparecen, `aria-expanded="false"` y el toggler queda oculto.
- [x] Al volver a 991 px: menú cerrado, `aria-expanded="false"` y flotante visible (`display:flex`).
- [x] Escape sigue cerrando y devolviendo el foco al toggler; click fuera sigue cerrando. Sin errores.

## 4. Originales de banner y foto fuera de `_site` — aplicado y probado

- [x] En `scripts/preparar.mjs`, se quitaron `'banner.jpg'` y `'foto real del local.jpg'` del array de copia. Los derivados se siguen generando desde la raíz (`sourceRoot`).
- [x] Build: 19 ofertas y 44 derivados. `_site` pasa de 76 a 74 archivos; los originales ya no están.
- [x] `_site/derivados` conserva banner 1600/800 (WebP + JPG) y foto 960 (WebP + JPG).
- [x] Carga real a 390/576/1440: banner y foto salen de `derivados/`; 0 peticiones a los originales; 0 errores HTTP.

## 5. Borde del toggler — descartado

- [x] Se mantiene el borde actual de 1 px `#d8d8d8`. El icono ya identifica el control; no se toca el target de 52 × 52 px.

## 6. Opcional post-publicación (no bloquea)

- [ ] Evaluar un derivado de 1600 px para el visor de termos, dejando “Abrir imagen original” intacto. Hoy el visor carga el original de 2.23 MB; el derivado ahorraría datos en móvil. Se decide después del smoke test en la URL real.

## Orden de ejecución y cierre

1. [x] Resolver 576 px: se deja como está.
2. [x] Aplicar cleanup de 992 px.
3. [x] Sacar los originales de `_site`.
4. [x] Descartar el cambio de borde del toggler.
5. [x] Build, regresión 390/576/1440/992 y capturas.
6. [ ] Confirmación explícita de los nombres comerciales por el dueño.
7. [ ] Prueba literal del README en la interfaz web de GitHub (DepsHeK).
8. [ ] Aprobación explícita final → push → Action en verde → smoke test en la URL real de GitHub Pages.

Sin aprobación explícita no se publica.
