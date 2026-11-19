import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Imágenes disponibles en /promociones. El build genera sus derivados. */
export async function listPromotions(base = root) {
  const entries = await readdir(path.join(base, 'promociones'), { withFileTypes: true });
  return entries
    .filter(e => e.isFile() && /\.(jpe?g|png|webp|gif|avif)$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }))
    .map(e => ({ archivo: e.name, activa: true }));
}

/* Lee la fuente única de verdad sin duplicarla ni sobrescribirla.
   El archivo es JavaScript de navegador; se ejecuta en un contexto aislado
   para obtener window.CATEGORIAS y window.PROMOCIONES. */
export async function readPromociones(base = root) {
  const archivo = path.join(base, 'data/promociones.js');
  const texto = await readFile(archivo, 'utf8');
  const contexto = { window: {} };
  vm.createContext(contexto);
  vm.runInContext(texto, contexto, { filename: 'data/promociones.js' });
  return {
    categorias: contexto.window.CATEGORIAS || [],
    promociones: contexto.window.PROMOCIONES || []
  };
}

/* Lee la fuente de testimonios y galería de la Fase 4.
   Igual que promociones: el archivo es JavaScript de navegador. */
export async function readTestimonios(base = root) {
  const archivo = path.join(base, 'data/testimonios.js');
  const texto = await readFile(archivo, 'utf8');
  const contexto = { window: {} };
  vm.createContext(contexto);
  vm.runInContext(texto, contexto, { filename: 'data/testimonios.js' });
  return {
    testimonios: contexto.window.TESTIMONIOS || [],
    trabajos: contexto.window.TRABAJOS || []
  };
}

/* Lee la fuente de fotos de servicios de la Fase 4. */
export async function readServicios(base = root) {
  const archivo = path.join(base, 'data/servicios.js');
  const texto = await readFile(archivo, 'utf8');
  const contexto = { window: {} };
  vm.createContext(contexto);
  vm.runInContext(texto, contexto, { filename: 'data/servicios.js' });
  return { servicios: contexto.window.SERVICIOS || [] };
}
