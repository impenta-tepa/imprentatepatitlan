// Revisa el sitio ya construido en _site/ y avisa si algo quedó roto.
// Uso: npm run verificar  (ejecuta antes npm run build)
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { root } from './promociones.mjs';

const sitio = path.join(root, '_site');
const BASE = 'https://impenta-tepa.github.io/imprentatepatitlan/';
const fallos = [];
const avisos = [];
const ok = [];

const existe = async ruta => {
  try { const s = await stat(ruta); return s.isFile() && s.size > 0; } catch { return false; }
};
const kb = bytes => Math.round(bytes / 1024) + ' KB';

// 1. Publicación generada
if (!(await existe(path.join(sitio, 'index.html')))) {
  console.error('Falta _site/. Ejecuta primero: npm run build');
  process.exit(1);
}

// 2. Manifiesto contra la carpeta real de promociones
const imagenes = (await readdir(path.join(root, 'promociones'), { withFileTypes: true }))
  .filter(e => e.isFile() && /\.(jpe?g|png|webp|gif|avif)$/i.test(e.name))
  .map(e => e.name)
  .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));

const textoManifiesto = await readFile(path.join(sitio, 'datos/promociones.js'), 'utf8');
const manifiesto = JSON.parse(textoManifiesto.replace(/^window\.PROMOCIONES\s*=\s*/, '').replace(/;\s*$/, ''));
const enSitio = manifiesto.map(p => p.archivo);

if (JSON.stringify(enSitio) === JSON.stringify(imagenes)) ok.push(`manifiesto con ${imagenes.length} promociones, igual a la carpeta`);
else fallos.push(`el manifiesto (${enSitio.length}) no coincide con promociones/ (${imagenes.length}): ${imagenes.filter(x => !enSitio.includes(x)).join(', ') || '—'}`);

// 3. Cada promoción tiene miniatura y visor, en WebP y JPG
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

// 4. Archivos de la página que existen de verdad
const html = await readFile(path.join(sitio, 'index.html'), 'utf8');
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

// 5. Archivos de SEO y de compartir
for (const archivo of ['robots.txt', 'sitemap.xml', '404.html', 'og-image.jpg']) {
  if (await existe(path.join(sitio, archivo))) ok.push(archivo + ' publicado');
  else fallos.push('falta ' + archivo);
}

// 6. Data estructurada válida y rutas absolutas
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

// 7. Peso de la portada: lo que se descarga al abrir sin desplazarse
const peso = async rutas => {
  let total = 0;
  for (const rel of rutas) { try { total += (await stat(path.join(sitio, rel))).size; } catch {} }
  return total;
};
const miniaturas = manifiesto.slice(0, 6).map(p => `derivados/promociones/${p.archivo}-800.webp`);
const primeraCarga = await peso(['index.html', 'css/estilos.css', 'js/sitio.js', 'datos/promociones.js',
  'derivados/banner-1600.webp', 'LOGOS/logo negro.png', ...miniaturas]);
ok.push('primera carga (sin contador de Bootstrap): ' + kb(primeraCarga));

for (const linea of ok) console.log('  OK  ' + linea);
for (const linea of avisos) console.log('  !   ' + linea);
for (const linea of fallos) console.log('  X   ' + linea);
console.log(fallos.length ? `\n${fallos.length} problema(s).` : '\nTodo en orden.');
process.exit(fallos.length ? 1 : 0);
