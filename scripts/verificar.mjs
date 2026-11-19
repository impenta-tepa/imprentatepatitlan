// Revisa el sitio ya construido en _site/ y avisa si algo quedó roto.
// Uso: npm run verificar  (ejecuta antes npm run build)
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { root, readPromociones, readTestimonios, readServicios } from './promociones.mjs';
import { SERVICIOS, ANCHOS_SERVICIO } from './imagenes.mjs';

const sitio = path.join(root, '_site');
const BASE = 'https://impenta-tepa.github.io/imprentatepatitlan/';
const fallos = [];
const avisos = [];
const ok = [];

const existe = async ruta => {
  try { const s = await stat(ruta); return s.isFile() && s.size > 0; } catch { return false; }
};
const kb = bytes => Math.round(bytes / 1024) + ' KB';
const basename = ruta => String(ruta).split('/').pop();

// 1. Publicación generada
if (!(await existe(path.join(sitio, 'index.html')))) {
  console.error('Falta _site/. Ejecuta primero: npm run build');
  process.exit(1);
}

// 2. Fuente única de promociones contra la carpeta real de imágenes
const { categorias, promociones } = await readPromociones(root);
const imagenes = (await readdir(path.join(root, 'promociones'), { withFileTypes: true }))
  .filter(e => e.isFile() && /\.(jpe?g|png|webp|gif|avif)$/i.test(e.name))
  .map(e => e.name)
  .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));

const imagenesEnData = promociones.map(p => basename(p.imagen || ''));
// Archivo histórico: se conserva sin ficha porque Domingo confirmó que es el mismo
// producto que "Sellos varios" con precios dentro del arte. No se publica en el catálogo.
const IMAGENES_SIN_FICHA_PERMITIDAS = new Set(['sellos varios PRECIOS.jpg']);
const sinFicha = imagenes.filter(archivo => !imagenesEnData.includes(archivo) && !IMAGENES_SIN_FICHA_PERMITIDAS.has(archivo));
const sinImagen = imagenesEnData.filter(archivo => !imagenes.includes(archivo));

if (sinFicha.length) fallos.push(`imágenes sin ficha en data/promociones.js: ${sinFicha.join(', ')}`);
if (sinImagen.length) fallos.push(`fichas que apuntan a imágenes inexistentes: ${sinImagen.join(', ')}`);
if (!sinFicha.length && !sinImagen.length) {
  ok.push(`fuente única con ${promociones.length} promociones activas; 1 imagen histórica sin ficha permitida`);
}

// 3. Esquema y reglas de la fuente única
const CATEGORIAS_ESPERADAS = [
  'Papelería comercial y empresarial',
  'Gran formato',
  'Textiles y promocionales',
  'Corte y grabado láser',
  'Toldos y anuncios',
  'Diseño gráfico'
];
const idsCategorias = new Set(categorias.map(c => c.id));
const nombresCategorias = new Set(categorias.map(c => c.nombre));
if (categorias.length !== 6) fallos.push(`deben existir 6 macrocategorías; hay ${categorias.length}`);
for (const nombre of CATEGORIAS_ESPERADAS) {
  if (!nombresCategorias.has(nombre)) fallos.push(`falta la macrocategoría: ${nombre}`);
}
for (const categoria of categorias) {
  if (!categoria.id || !categoria.nombre) fallos.push('hay una categoría sin id o sin nombre');
}

const CAMPOS = ['id', 'categoria', 'etiquetas', 'titulo', 'descripcion', 'precio', 'prefijoPrecio', 'unidad', 'iva', 'vigencia', 'imagen', 'alt', 'destacado', 'activo'];
const idsPromos = new Set();
let destacadas = 0;
for (const [indice, promo] of promociones.entries()) {
  const etiqueta = promo.id || `#${indice + 1}`;
  for (const campo of CAMPOS) {
    if (!(campo in promo)) fallos.push(`promoción ${etiqueta}: falta el campo ${campo}`);
  }
  if (!/^[a-z0-9-]+$/.test(String(promo.id || ''))) fallos.push(`promoción ${etiqueta}: el id debe ser un slug en minúsculas`);
  if (idsPromos.has(promo.id)) fallos.push(`promoción ${etiqueta}: id repetido`);
  idsPromos.add(promo.id);
  if (!idsCategorias.has(promo.categoria)) fallos.push(`promoción ${etiqueta}: categoría desconocida (${promo.categoria})`);
  if (!Array.isArray(promo.etiquetas)) fallos.push(`promoción ${etiqueta}: etiquetas debe ser un arreglo`);
  if (typeof promo.titulo !== 'string' || !promo.titulo.trim()) fallos.push(`promoción ${etiqueta}: falta el título`);
  if (typeof promo.descripcion !== 'string' || !promo.descripcion.trim()) fallos.push(`promoción ${etiqueta}: falta la descripción`);
  if (!(promo.precio === null || typeof promo.precio === 'number')) fallos.push(`promoción ${etiqueta}: precio debe ser número o null`);
  if (!(promo.iva === null || promo.iva === 'incluido' || promo.iva === '+ IVA')) fallos.push(`promoción ${etiqueta}: IVA inválido`);
  if (!(promo.vigencia === null || /^\d{4}-\d{2}-\d{2}$/.test(String(promo.vigencia)))) fallos.push(`promoción ${etiqueta}: vigencia debe ser una fecha AAAA-MM-DD o null`);
  if (!promo.imagen || !String(promo.imagen).startsWith('promociones/')) fallos.push(`promoción ${etiqueta}: imagen debe empezar con promociones/`);
  if (typeof promo.alt !== 'string' || !promo.alt.trim()) fallos.push(`promoción ${etiqueta}: falta el texto alt`);
  if (typeof promo.destacado !== 'boolean') fallos.push(`promoción ${etiqueta}: destacado debe ser true o false`);
  if (typeof promo.activo !== 'boolean') fallos.push(`promoción ${etiqueta}: activo debe ser true o false`);
  if (promo.destacado) destacadas++;
}
if (destacadas > 4) fallos.push(`hay ${destacadas} promociones destacadas; el máximo es 4`);
if (destacadas === 0) avisos.push('no hay promociones marcadas como destacadas');
if (promociones.length !== 18) avisos.push(`la fuente única tiene ${promociones.length} promociones; el catálogo activo debe ser 18`);
if (!fallos.length) ok.push(`esquema validado: ${promociones.length} fichas, ${destacadas} destacadas`);

const activasPorCategoria = new Map(categorias.map(c => [c.id, promociones.filter(p => p.categoria === c.id && p.activo !== false).length]));
const categoriasVacias = categorias.filter(c => activasPorCategoria.get(c.id) === 0).map(c => c.nombre);
if (categoriasVacias.length) ok.push('categorías sin promociones para probar el mensaje: ' + categoriasVacias.join(', '));
else avisos.push('no hay categorías vacías para probar el mensaje de cotización');

// 4. Cada promoción tiene miniatura y visor, en WebP y JPG
let faltantes = 0;
for (const archivo of imagenes) {
  for (const ancho of [800, 1600]) {
    for (const formato of ['webp', 'jpg']) {
      const ruta = path.join(sitio, 'derivados/promociones', `${archivo}-${ancho}.${formato}`);
      if (!(await existe(ruta))) { fallos.push(`falta derivado: derivados/promociones/${archivo}-${ancho}.${formato}`); faltantes++; }
    }
  }
}
if (!faltantes) ok.push(`${imagenes.length * 4} derivados de promoción presentes (800 y 1600 px, WebP y JPG)`);

// 5. Archivos de la página que existen de verdad
const html = await readFile(path.join(sitio, 'index.html'), 'utf8');
if (!html.includes('src="data/promociones.js"')) fallos.push('index.html no carga data/promociones.js');
if (html.includes('datos/')) fallos.push('index.html todavía apunta a la carpeta datos/');
if (!(await existe(path.join(sitio, 'data/promociones.js')))) fallos.push('falta data/promociones.js en _site');

const referencias = new Set();
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) referencias.add(m[1]);
for (const m of html.matchAll(/srcset="([^"]+)"/g)) m[1].split(',').forEach(parte => referencias.add(parte.trim().split(/\s+/)[0]));

const locales = [...referencias].filter(r => r && !/^(https?:|mailto:|tel:|#|data:)/.test(r));
let rotas = 0;
for (const rel of locales) {
  const limpia = decodeURIComponent(rel.split('#')[0].split('?')[0]);
  if (!(await existe(path.join(sitio, limpia)))) { fallos.push(`index.html apunta a un archivo que no existe: ${rel}`); rotas++; }
}
if (!rotas) ok.push(`${locales.length} rutas locales de index.html verificadas`);

// 5b. Estructura y reglas de la Fase 2
const css = await readFile(path.join(sitio, 'css/estilos.css'), 'utf8');
const jsFuente = await readFile(path.join(root, 'js/sitio.js'), 'utf8');
const nav = (html.match(/<nav class="nav"[\s\S]*?<\/nav>/) || [])[0] || '';
const ordenNav = ['#servicios', '#promociones', '#ubicacion', '#contacto']
  .map(ancla => nav.indexOf(`href="${ancla}"`));
const navOk = ordenNav.every(indice => indice >= 0)
  && ordenNav[0] < ordenNav[1] && ordenNav[1] < ordenNav[2] && ordenNav[2] < ordenNav[3];

const selectHtml = (html.match(/<select id="quoteService"[\s\S]*?<\/select>/) || [])[0] || '';
const opcionesServicio = [...selectHtml.matchAll(/<option[^>]*>([^<]+)<\/option>/g)].map(m => m[1].trim());
const opcionesEsperadas = [
  'Elige una opción',
  'Papelería comercial y empresarial',
  'Gran formato',
  'Textiles y promocionales',
  'Corte y grabado láser',
  'Toldos y anuncios',
  'Diseño gráfico',
  'Otro'
];
const selectOk = opcionesServicio.length === opcionesEsperadas.length
  && opcionesEsperadas.every(opcion => opcionesServicio.includes(opcion))
  && !selectHtml.includes('Vinil y publicidad')
  && !selectHtml.includes('Offset y digital / Papelería');

const serviciosOk = ['Papelería comercial y empresarial', 'Gran formato', 'Textiles y promocionales',
  'Corte y grabado láser', 'Toldos y anuncios', 'Diseño gráfico']
  .every(nombre => html.includes(`<h3>${nombre}</h3>`));

const confianzaOk = [
  /<span class="trust-strip__item"><b>\d{2}<\/b> Lonas urgentes<\/span>/,
  /<span class="trust-strip__item"><b>\d{2}<\/b> Facturación CFDI<\/span>/,
  /<span class="trust-strip__item"><b>\d{2}<\/b> Diseño incluido<\/span>/,
  /<span class="trust-strip__item"><b>\d{2}<\/b> Domingos con cita<\/span>/
].every(patron => patron.test(html));

const estructura = [
  ['6 tarjetas de servicio', (html.match(/class="service-card"/g) || []).length === 6],
  ['6 tarjetas de servicio', (html.match(/class="service-card"/g) || []).length === 6],
  ['nombres exactos de las 6 categorías en Servicios', serviciosOk],
  ['4 datos en la franja de confianza', (html.match(/class="trust-strip__item"/g) || []).length === 4 && confianzaOk],
  ['nav en orden Servicios, Promociones, Ubicación, Contacto', navOk],
  ['botón Cotizar en el nav', /class="btn btn--dark nav__cta"[^>]*>Cotizar/.test(nav)],
  ['CTA secundario Ver servicios', html.includes('href="#servicios">Ver servicios</a>')],
  ['6 enlaces Ver más con filtro de catálogo', (html.match(/data-filtro="(papeleria|gran-formato|textiles|laser|toldos|diseno)"/g) || []).length === 6],
  ['testimonios y galería ocultos', /<section[^>]+id="testimonios"[^>]*hidden/.test(html)],
  ['mapa con ancla Ubicación y carga diferida', html.includes('id="ubicacion"') && html.includes('data-mapa')],
  ['sin iframe de mapa en la primera carga', !html.includes('<iframe')],
  ['franja de cierre', html.includes('id="cierre"') && html.includes('Aquí empieza')],
  ['sin franja negra intermedia', !html.includes('section--dark') && !css.includes('.section--dark')],
  ['contacto claro', /\.section--contact\s*\{[^}]*background:\s*var\(--paper\)/.test(css)],
  ['select con las 6 categorías + Otro', selectOk],
  ['mensaje de WhatsApp con el nombre visible del servicio', jsFuente.includes('servicio.value.trim()')],
  ['marco de promoción 4:5', /\.promo-open\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5/.test(css)],
  ['miniatura con object-fit cover', /\.promo-open img\s*\{[^}]*object-fit:\s*cover/.test(css)],
  ['arte cuadrado con contain', /\.promo-open\.is-square img\s*\{[^}]*object-fit:\s*contain/.test(css)],
  ['width/height en tarjetas de promoción', jsFuente.includes('width="800" height="1000"')],
  ['detección de miniaturas cuadradas', jsFuente.includes('is-square') && jsFuente.includes('naturalWidth')],
  ['filtro desde las tarjetas de servicio', jsFuente.includes("closest('[data-filtro]')")],
  ['mapa lazy en JavaScript', jsFuente.includes("iframe.loading = 'lazy'")],
  ['pendientes TODO-DOMINGO documentados', (html.match(/TODO-DOMINGO/g) || []).length >= 2]
];
for (const [nombre, cumple] of estructura) {
  if (!cumple) fallos.push('Fase 2: ' + nombre);
}
if (!estructura.some(([, cumple]) => !cumple)) ok.push('estructura de Fase 2 completa: ' + estructura.length + ' comprobaciones');

// 5c. Estructura y reglas de la Fase 3
let logosFaltantes = 0;
for (const rel of ['derivados/logo-header.webp', 'derivados/logo-header.png', 'derivados/logo-footer.webp', 'derivados/logo-footer.png']) {
  if (!(await existe(path.join(sitio, rel)))) {
    fallos.push('falta ' + rel);
    logosFaltantes++;
  }
}
if (!logosFaltantes) ok.push('logos optimizados de header y footer presentes (WebP y PNG)');

const fase3 = [
  ['logo de header optimizado y precargado', html.includes('derivados/logo-header.webp') && /rel="preload"[^>]*href="derivados\/logo-header\.webp"/.test(html)],
  ['logo de footer optimizado', html.includes('derivados/logo-footer.webp')],
  ['scroll-margin-top en secciones', css.includes('scroll-margin-top')],
  ['tap targets de filtros de 44 px', /\.filter\s*\{[^}]*min-height:\s*44px/.test(css)],
  ['botones del visor de 44 px', /\.viewer__bar button\s*\{[^}]*min-height:\s*44px/.test(css) && /\.viewer__actions \.btn\s*\{[^}]*min-height:\s*44px/.test(css)],
  ['texto de formulario de 16 px', /\.field input,\s*\.field select,\s*\.field textarea\s*\{[^}]*font-size:\s*16px/.test(css)],
  ['prefers-reduced-motion', /prefers-reduced-motion:\s*reduce/.test(css)],
  ['foco al catálogo preparado', html.includes('id="catalogo-titulo"') && html.includes('tabindex="-1"') && jsFuente.includes('catalogo-titulo')],
  ['catálogo diferido sin bloquear el primer pintado', jsFuente.includes('IntersectionObserver') && jsFuente.includes('renderCatalogo')],
  ['menú móvil fuera del foco al cerrar', jsFuente.includes("toggleAttribute('inert'") && jsFuente.includes('menuMovil')],
  ['estado con nombre de la categoría activa', jsFuente.includes('nombreActivo')],
  ['hero con proporción 21:9 reservada', /\.hero__media picture\s*\{[^}]*aspect-ratio:\s*21\s*\/\s*9/.test(css)],
  ['safe areas laterales en el nav móvil', css.includes('safe-area-inset-left') && css.includes('safe-area-inset-right')]
];
for (const [nombre, cumple] of fase3) {
  if (!cumple) fallos.push('Fase 3: ' + nombre);
}
if (!fase3.some(([, cumple]) => !cumple)) ok.push('estructura de Fase 3 completa: ' + fase3.length + ' comprobaciones');

// 5d. Preparación de la Fase 4: testimonios y galería desde datos
const { testimonios, trabajos } = await readTestimonios(root);
const testimoniosActivos = testimonios.filter(item => item && item.activo !== false);
const trabajosActivos = trabajos.filter(item => item && item.activo !== false);
const minimosTestimonios = testimoniosActivos.length >= 3;
const galeriaLista = trabajosActivos.length >= 4;

for (const [indice, testimonio] of testimoniosActivos.entries()) {
  const etiqueta = testimonio.nombre || `#${indice + 1}`;
  for (const campo of ['nombre', 'negocio', 'texto']) {
    if (typeof testimonio[campo] !== 'string' || !testimonio[campo].trim()) fallos.push(`testimonio ${etiqueta}: falta ${campo}`);
  }
  if (testimonio.foto && !(await existe(path.join(sitio, testimonio.foto)))) fallos.push(`testimonio ${etiqueta}: no existe ${testimonio.foto}`);
}

for (const [indice, trabajo] of trabajosActivos.entries()) {
  const etiqueta = trabajo.imagen || `#${indice + 1}`;
  for (const campo of ['imagen', 'alt']) {
    if (typeof trabajo[campo] !== 'string' || !trabajo[campo].trim()) fallos.push(`trabajo ${etiqueta}: falta ${campo}`);
  }
  if (trabajo.imagen && !(await existe(path.join(sitio, trabajo.imagen)))) fallos.push(`trabajo ${etiqueta}: no existe ${trabajo.imagen}`);
}

let derivadosServicio = 0;
for (const servicio of SERVICIOS) {
  for (const ancho of ANCHOS_SERVICIO) {
    for (const formato of ['webp', 'jpg']) {
      const relativa = `derivados/servicios/${servicio.base}-${ancho}.${formato}`;
      if (await existe(path.join(sitio, relativa))) derivadosServicio++;
      else fallos.push('falta ' + relativa);
    }
  }
}
if (derivadosServicio === SERVICIOS.length * ANCHOS_SERVICIO.length * 2) {
  ok.push(`${derivadosServicio} derivados de servicio presentes (800 y 1200 px, WebP y JPG)`);
}

const { servicios } = await readServicios(root);
let serviciosDatosOk = servicios.length === 6;
for (const [indice, servicio] of servicios.entries()) {
  const etiqueta = servicio.base || `#${indice + 1}`;
  if (!/^[a-z0-9-]+$/.test(String(servicio.base || ''))) {
    fallos.push(`servicio ${etiqueta}: base inválida`);
    serviciosDatosOk = false;
  }
  if (typeof servicio.alt !== 'string' || !servicio.alt.trim()) {
    fallos.push(`servicio ${etiqueta}: falta alt`);
    serviciosDatosOk = false;
  }
  if (typeof servicio.ilustrativa !== 'boolean') {
    fallos.push(`servicio ${etiqueta}: ilustrativa debe ser booleano`);
    serviciosDatosOk = false;
  }
}

const serviciosEnHtml = servicios.every(servicio => html.includes(`data-servicio="${servicio.base}"`));
const serviciosEnJs = jsFuente.includes('data-servicio') && jsFuente.includes('service-card__flag') && jsFuente.includes('Imagen ilustrativa: ');
const etiquetaRequerida = servicios.some(servicio => servicio.ilustrativa === true);
const etiquetaCss = css.includes('.service-card__flag');

const fase4 = [
  ['fuente de servicios publicada', await existe(path.join(sitio, 'data/servicios.js'))],
  ['6 servicios con base, alt y flag', serviciosDatosOk],
  ['contenedores de servicio en HTML', serviciosEnHtml],
  ['render de servicios desde datos', serviciosEnJs],
  ['etiqueta ilustrativa cuando aplica', !etiquetaRequerida || etiquetaCss],
  ['fuente de testimonios publicada', await existe(path.join(sitio, 'data/testimonios.js'))],
  ['script de testimonios antes de sitio.js', html.includes('src="data/testimonios.js"') && html.indexOf('data/testimonios.js') < html.indexOf('js/sitio.js')],
  ['sección oculta sin 3 testimonios', minimosTestimonios || /<section[^>]*id="testimonios"[^>]*hidden/.test(html)],
  ['render de testimonios desde datos', jsFuente.includes("getElementById('testimonios-grid')") && jsFuente.includes("getElementById('galeria-trabajos')")],
  ['activación por 3 testimonios y galería opcional', jsFuente.includes('testimonios.length < 3') && jsFuente.includes('trabajos.length >= 4')],
  ['carpeta de galería publicada', await existe(path.join(sitio, 'galeria/LEEME.txt'))]
];
for (const [nombre, cumple] of fase4) {
  if (!cumple) fallos.push('Fase 4: ' + nombre);
}
if (!fase4.some(([, cumple]) => !cumple)) ok.push('preparación de Fase 4 completa: ' + fase4.length + ' comprobaciones');
if (minimosTestimonios) ok.push(`testimonios listos para activarse (${testimoniosActivos.length} testimonios)`);
if (galeriaLista) ok.push(`galería lista para mostrarse (${trabajosActivos.length} trabajos)`);

// 5e. Micro-lote 4.0.2: estados vacíos con salida real a WhatsApp
const micro402 = [
  ['estado vacío con CTA de WhatsApp', jsFuente.includes('pintarEstadoVacio') && jsFuente.includes('catalog__empty-cta')],
  ['mensaje de categoría precargado', jsFuente.includes('No vi promociones en su página')],
  ['mensaje de búsqueda precargado', jsFuente.includes('y no lo encontré en su catálogo')],
  ['enlaces de servicio decididos por conteo', jsFuente.includes('promocionesPorCategoria') && jsFuente.includes("querySelectorAll('.service-card__link[data-filtro]')")],
  ['botón de estado vacío de 44 px', /\.catalog__empty-cta\s*\{[^}]*min-height:\s*44px/.test(css)],
  ['foco visible global', css.includes(':focus-visible')],
  ['foco visible en el CTA', /\.catalog__empty-cta:focus-visible\s*\{[^}]*outline:\s*3px/.test(css)]
];
for (const [nombre, cumple] of micro402) {
  if (!cumple) fallos.push('Micro-lote 4.0.2: ' + nombre);
}
if (!micro402.some(([, cumple]) => !cumple)) ok.push('micro-lote 4.0.2 completo: ' + micro402.length + ' comprobaciones');

const bytesFuente = (await stat(path.join(root, 'css/estilos.css'))).size
  + (await stat(path.join(root, 'fonts/fonts.css'))).size
  + (await stat(path.join(root, 'js/sitio.js'))).size
  + (await stat(path.join(root, 'data/promociones.js'))).size
  + (await stat(path.join(root, 'data/servicios.js'))).size
  + (await stat(path.join(root, 'data/testimonios.js'))).size;
const bytesPublicado = (await stat(path.join(sitio, 'css/estilos.css'))).size
  + (await stat(path.join(sitio, 'fonts/fonts.css'))).size
  + (await stat(path.join(sitio, 'js/sitio.js'))).size
  + (await stat(path.join(sitio, 'data/promociones.js'))).size
  + (await stat(path.join(sitio, 'data/servicios.js'))).size
  + (await stat(path.join(sitio, 'data/testimonios.js'))).size;
if (bytesPublicado < bytesFuente) ok.push(`minificación: ${kb(bytesFuente)} → ${kb(bytesPublicado)} (CSS + fuentes + JS + datos)`);
else fallos.push('la minificación no redujo CSS + fuentes + JS + datos');

// 6. Archivos de SEO y de compartir
for (const archivo of ['robots.txt', 'sitemap.xml', '404.html', 'og-image.jpg']) {
  if (await existe(path.join(sitio, archivo))) ok.push(archivo + ' publicado');
  else fallos.push('falta ' + archivo);
}

// 6b. Favicon optimizado y referenciado
const favicon = path.join(sitio, 'LOGOS/quad-print-favicon.png');
const faviconBytes = (await stat(favicon).catch(() => ({ size: 0 }))).size;
const faviconHtml = await readFile(path.join(sitio, '404.html'), 'utf8').catch(() => '');
const faviconReferenciado = html.includes('LOGOS/quad-print-favicon.png') && faviconHtml.includes('LOGOS/quad-print-favicon.png');
if (faviconReferenciado && faviconBytes > 0 && faviconBytes < 5 * 1024) {
  ok.push(`favicon optimizado: ${faviconBytes} bytes (< 5 KB)`);
} else {
  fallos.push(`favicon ausente, sin referencia o mayor a 5 KB: ${faviconBytes} bytes`);
}

// 7. Data estructurada válida y rutas absolutas
const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ld) fallos.push('no hay JSON-LD');
else {
  try {
    const datos = JSON.parse(ld[1]);
    if (datos['@type'] !== 'LocalBusiness') fallos.push('el JSON-LD no es LocalBusiness');
    if (!datos.name || !datos.telephone || !datos.address) fallos.push('al JSON-LD le faltan datos básicos');
    if (datos.url !== BASE) fallos.push('la url del JSON-LD no es la del sitio publicado');
    ok.push('JSON-LD válido (' + datos['@type'] + ')');
  } catch (error) { fallos.push('el JSON-LD no es JSON válido: ' + error.message); }
}

const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
if (canonical !== BASE) fallos.push('canonical ausente o distinto de ' + BASE);

const ogImage = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || '';
if (ogImage !== BASE + 'og-image.jpg') fallos.push('og:image ausente o con ruta incorrecta');

const sitemap = await readFile(path.join(sitio, 'sitemap.xml'), 'utf8').catch(() => '');
const loc = (sitemap.match(/<loc>([^<]+)<\/loc>/) || [])[1];
if (loc !== BASE) fallos.push('sitemap.xml no apunta a ' + BASE);

const robots = await readFile(path.join(sitio, 'robots.txt'), 'utf8').catch(() => '');
if (!robots.includes(BASE + 'sitemap.xml')) fallos.push('robots.txt no anuncia el sitemap');

// 8. Peso de la portada: lo que se descarga al abrir sin desplazarse
const peso = async rutas => {
  let total = 0;
  for (const rel of rutas) { try { total += (await stat(path.join(sitio, rel))).size; } catch {} }
  return total;
};
const primeraCargaBase = await peso(['index.html', 'css/estilos.css', 'fonts/fonts.css',
  'fonts/rP2Hp2ywxg089UriCZOIHQ.woff2', 'fonts/xn7gYHE41ni1AdIRggexSg.woff2',
  'js/sitio.js', 'data/promociones.js', 'data/testimonios.js', 'derivados/banner-1600.webp',
  'derivados/logo-header.webp']);
ok.push('peso en disco de la primera carga base (sin catálogo diferido): ' + kb(primeraCargaBase));

for (const linea of ok) console.log('  OK  ' + linea);
for (const linea of avisos) console.log('  !   ' + linea);
for (const linea of fallos) console.log('  X   ' + linea);
console.log(fallos.length ? `\n${fallos.length} problema(s).` : '\nTodo en orden.');
process.exit(fallos.length ? 1 : 0);
