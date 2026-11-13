import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { root, generatePromotions } from './promociones.mjs';
import { generarDerivados } from './imagenes.mjs';
const promotions = await generatePromotions();
// Each publication gets a new directory so deleted images cannot remain in the output.
const output = path.join(root, '_site');
await mkdir(output); // Fail rather than reuse an old publication directory.
// Los originales de banner y foto se quedan en la raíz: la página solo usa sus derivados.
for (const item of ['index.html', '.nojekyll', 'css', 'js', 'datos', 'LOGOS', 'promociones', 'ubicacion.png', 'WhatsApp_icon.png', 'Facebook_Logo_(2019).png']) {
  await cp(path.join(root, item), path.join(output, item), { recursive: true });
}
const derivados = await generarDerivados({ sourceRoot: root, baseDir: output });
console.log(`Sitio preparado con ${promotions.length} ofertas y ${derivados.length} derivados.`);
