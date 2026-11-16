import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root, generatePromotions } from './promociones.mjs';
import { generarDerivados } from './imagenes.mjs';
const promotions = await generatePromotions();
// Cada publicación se genera desde cero: así una imagen borrada no sobrevive en el sitio.
const output = path.join(root, '_site');
await rm(output, { recursive: true, force: true });
await mkdir(output);
// Los originales de banner y foto se quedan en la raíz: la página solo usa sus derivados.
for (const item of ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '.nojekyll', 'css', 'js', 'datos', 'fonts', 'LOGOS', 'promociones', 'ubicacion.png', 'WhatsApp_icon.png', 'Facebook_Logo_(2019).png']) {
  await cp(path.join(root, item), path.join(output, item), { recursive: true });
}
const derivados = await generarDerivados({ sourceRoot: root, baseDir: output });
// El sitemap siempre lleva la fecha del día en que se genera la publicación.
const sitemapPath = path.join(output, 'sitemap.xml');
const sitemap = await readFile(sitemapPath, 'utf8');
const fecha = new Date();
const hoy = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
await writeFile(sitemapPath, sitemap.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${hoy}</lastmod>`));
console.log(`Sitio preparado con ${promotions.length} ofertas y ${derivados.length} derivados.`);
