// Revisa el sitio ya construido en _site/ y avisa si algo quedó roto.
// Uso: npm run verificar  (ejecuta antes npm run build)
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { root, readPromociones } from './promociones.mjs';

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
const sinFicha = imagenes.filter(archivo => !imagenesEnData.includes(archivo));
const sinImagen = imagenesEnData.filter(archivo => !imagenes.includes(archivo));

if (sinFicha.length) fallos.push(`imágenes sin ficha en data/promociones.js: ${sinFicha.join(', ')}`);
if (sinImagen.length) fallos.push(`fichas que apuntan a imágenes inexistentes: ${sinImagen.join(', ')}`);
if (!sinFicha.length && !sinImagen.length) {
  ok.push(`fuente única con ${promociones.length} promociones, igual a promociones/`);
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
if (promociones.length !== 19) avisos.push(`la fuente única tiene ${promociones.length} promociones; la Fase 1 migró 19`);
if (!fallos.length) ok.push(`esquema validado: ${promociones.length} fichas, ${destacadas} destacadas`);

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

// 6. Archivos de SEO y de compartir
for (const archivo of ['robots.txt', 'sitemap.xml', '404.html', 'og-image.jpg']) {
  if (await existe(path.join(sitio, archivo))) ok.push(archivo + ' publicado');
  else fallos.push('falta ' + archivo);
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
const miniaturas = promociones.slice(0, 6).map(p => `derivados/promociones/${basename(p.imagen)}-800.webp`);
const primeraCarga = await peso(['index.html', 'css/estilos.css', 'js/sitio.js', 'data/promociones.js',
  'derivados/banner-1600.webp', 'LOGOS/logo negro.png', ...miniaturas]);
ok.push('primera carga (sin contador de Bootstrap): ' + kb(primeraCarga));

for (const linea of ok) console.log('  OK  ' + linea);
for (const linea of avisos) console.log('  !   ' + linea);
for (const linea of fallos) console.log('  X   ' + linea);
console.log(fallos.length ? `\n${fallos.length} problema(s).` : '\nTodo en orden.');
process.exit(fallos.length ? 1 : 0);
