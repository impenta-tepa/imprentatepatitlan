import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export async function listPromotions(base = root) {
  const entries = await readdir(path.join(base, 'promociones'), { withFileTypes: true });
  return entries.filter(e => e.isFile() && /\.(jpe?g|png|webp|gif|avif)$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }))
    .map(e => ({ archivo: e.name, activa: true }));
}
export async function generatePromotions() {
  const promotions = await listPromotions();
  await mkdir(path.join(root, 'datos'), { recursive: true });
  await writeFile(path.join(root, 'datos/promociones.js'), 'window.PROMOCIONES = ' + JSON.stringify(promotions, null, 2) + ';\n');
  return promotions;
}
