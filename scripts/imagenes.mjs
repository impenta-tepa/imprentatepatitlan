import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const CALIDAD_WEBP = 80;
export const CALIDAD_JPG = 78;
export const ANCHO_MINIATURA = 800;
export const ANCHOS_BANNER = [1600, 800];
export const ANCHO_FOTO = 960;
export const NOMBRE_FOTO = 'foto real del local.jpg';
export const NOMBRE_BANNER = 'banner.jpg';

const FORMATOS = ['webp', 'jpg'];
const generando = new Map();

export const rutaMiniatura = (archivo, formato) => `derivados/promociones/${archivo}-${ANCHO_MINIATURA}.${formato}`;
export const rutaBanner = (ancho, formato) => `derivados/banner-${ancho}.${formato}`;
export const rutaFoto = formato => `derivados/foto-local-${ANCHO_FOTO}.${formato}`;

async function generarArchivo(origen, destino, { ancho, formato, calidadWebp = CALIDAD_WEBP, calidadJpg = CALIDAD_JPG }) {
  let imagen = sharp(origen, { failOn: 'none' }).rotate().resize({ width: ancho, withoutEnlargement: true });
  imagen = formato === 'webp'
    ? imagen.webp({ quality: calidadWebp, effort: 5 })
    : imagen.jpeg({ quality: calidadJpg, mozjpeg: true, progressive: true });
  await imagen.toFile(destino);
}

async function listarPromociones(sourceRoot) {
  const entradas = await readdir(path.join(sourceRoot, 'promociones'), { withFileTypes: true });
  return entradas
    .filter(e => e.isFile() && /\.(jpe?g|png|webp|gif|avif)$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }))
    .map(e => e.name);
}

export async function generarDerivados({ sourceRoot, baseDir }) {
  const resultados = [];
  const promociones = await listarPromociones(sourceRoot);
  const salidaPromociones = path.join(baseDir, 'derivados', 'promociones');
  await mkdir(salidaPromociones, { recursive: true });

  for (const archivo of promociones) {
    const origen = path.join(sourceRoot, 'promociones', archivo);
    for (const formato of FORMATOS) {
      const relativa = rutaMiniatura(archivo, formato);
      const destino = path.join(baseDir, relativa);
      await generarArchivo(origen, destino, { ancho: ANCHO_MINIATURA, formato });
      resultados.push({ tipo: 'promocion', origen: archivo, derivado: relativa.replace(/\\/g, '/'), bytes: (await stat(destino)).size, formato, ancho: ANCHO_MINIATURA });
    }
  }

  for (const ancho of ANCHOS_BANNER) {
    for (const formato of FORMATOS) {
      const relativa = rutaBanner(ancho, formato);
      const destino = path.join(baseDir, relativa);
      await generarArchivo(path.join(sourceRoot, NOMBRE_BANNER), destino, { ancho, formato });
      resultados.push({ tipo: 'banner', origen: NOMBRE_BANNER, derivado: relativa.replace(/\\/g, '/'), bytes: (await stat(destino)).size, formato, ancho });
    }
  }

  for (const formato of FORMATOS) {
    const relativa = rutaFoto(formato);
    const destino = path.join(baseDir, relativa);
    await generarArchivo(path.join(sourceRoot, NOMBRE_FOTO), destino, { ancho: ANCHO_FOTO, formato });
    resultados.push({ tipo: 'foto', origen: NOMBRE_FOTO, derivado: relativa.replace(/\\/g, '/'), bytes: (await stat(destino)).size, formato, ancho: ANCHO_FOTO });
  }

  return resultados;
}

function analizarDerivado(urlPath, sourceRoot) {
  const relativa = urlPath.replace(/^\/+/, '').replace(/\\/g, '/');
  let match = relativa.match(/^derivados\/promociones\/(.+)-(\d+)\.(webp|jpg)$/);
  if (match && Number(match[2]) === ANCHO_MINIATURA) {
    const archivo = match[1];
    if (path.basename(archivo) !== archivo) return null;
    return { relativa, origen: path.join(sourceRoot, 'promociones', archivo), ancho: ANCHO_MINIATURA, formato: match[3] };
  }
  match = relativa.match(/^derivados\/banner-(\d+)\.(webp|jpg)$/);
  if (match && ANCHOS_BANNER.includes(Number(match[1]))) {
    return { relativa, origen: path.join(sourceRoot, NOMBRE_BANNER), ancho: Number(match[1]), formato: match[2] };
  }
  match = relativa.match(/^derivados\/foto-local-(\d+)\.(webp|jpg)$/);
  if (match && Number(match[1]) === ANCHO_FOTO) {
    return { relativa, origen: path.join(sourceRoot, NOMBRE_FOTO), ancho: ANCHO_FOTO, formato: match[2] };
  }
  return null;
}

export async function asegurarDerivado({ sourceRoot, baseDir, urlPath }) {
  const spec = analizarDerivado(urlPath, sourceRoot);
  if (!spec) return null;
  const destino = path.join(baseDir, spec.relativa);
  try {
    const [origenStat, destinoStat] = await Promise.all([stat(spec.origen), stat(destino)]);
    if (destinoStat.size > 0 && destinoStat.mtimeMs >= origenStat.mtimeMs) return destino;
  } catch {}

  if (generando.has(destino)) return generando.get(destino);
  const tarea = (async () => {
    await mkdir(path.dirname(destino), { recursive: true });
    await generarArchivo(spec.origen, destino, spec);
    return destino;
  })();
  generando.set(destino, tarea);
  try {
    return await tarea;
  } finally {
    generando.delete(destino);
  }
}
