import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const CALIDAD_WEBP = 80;
export const CALIDAD_JPG = 78;
export const ANCHO_MINIATURA = 800;
// Visor: imagen ampliada. Nunca se agranda el original, así que si mide menos de 1600 px solo se recomprime.
export const ANCHO_VISOR = 1600;
export const CALIDAD_VISOR_WEBP = 88;
export const CALIDAD_VISOR_JPG = 86;
export const ANCHOS_BANNER = [1600, 800];
export const ANCHO_FOTO = 960;
export const NOMBRE_FOTO = 'foto real del local.jpg';
export const NOMBRE_BANNER = 'banner.jpg';
// Logos optimizados al tamaño real de visualización x2.
export const ANCHO_LOGO_HEADER = 200;
export const ANCHO_LOGO_FOOTER = 240;
export const LOGOS = [
  { base: 'logo-header', origen: 'LOGOS/logo negro.png', ancho: ANCHO_LOGO_HEADER },
  { base: 'logo-footer', origen: 'LOGOS/logo blanco.png', ancho: ANCHO_LOGO_FOOTER }
];
// Vista previa para Facebook y WhatsApp (Open Graph usa 1200 x 630).
export const OG = { ancho: 1200, alto: 630, calidad: 86, nombre: 'og-image.jpg', fondo: '#f6f5f2' };

const FORMATOS = ['webp', 'jpg'];
const generando = new Map();

export const rutaMiniatura = (archivo, formato) => `derivados/promociones/${archivo}-${ANCHO_MINIATURA}.${formato}`;
export const rutaVisor = (archivo, formato) => `derivados/promociones/${archivo}-${ANCHO_VISOR}.${formato}`;
export const rutaBanner = (ancho, formato) => `derivados/banner-${ancho}.${formato}`;
export const rutaFoto = formato => `derivados/foto-local-${ANCHO_FOTO}.${formato}`;
export const rutaOg = () => OG.nombre;

async function generarArchivo(origen, destino, { ancho, formato, calidadWebp = CALIDAD_WEBP, calidadJpg = CALIDAD_JPG }) {
  let imagen = sharp(origen, { failOn: 'none' }).rotate().resize({ width: ancho, withoutEnlargement: true });
  imagen = formato === 'webp'
    ? imagen.webp({ quality: calidadWebp, effort: 5 })
    : imagen.jpeg({ quality: calidadJpg, mozjpeg: true, progressive: true });
  await imagen.toFile(destino);
}

export const rutaLogo = (base, formato) => `derivados/${base}.${formato}`;

async function generarLogo(origen, destino, { ancho, formato }) {
  let imagen = sharp(origen, { failOn: 'none' }).resize({ width: ancho, withoutEnlargement: true });
  imagen = formato === 'webp'
    ? imagen.webp({ quality: 90, effort: 6 })
    : imagen.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 });
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
    // Visor: misma proporción, sin recortar. Calidad alta porque se ve en grande.
    for (const formato of FORMATOS) {
      const relativa = rutaVisor(archivo, formato);
      const destino = path.join(baseDir, relativa);
      await generarArchivo(origen, destino, { ancho: ANCHO_VISOR, formato, calidadWebp: CALIDAD_VISOR_WEBP, calidadJpg: CALIDAD_VISOR_JPG });
      resultados.push({ tipo: 'visor', origen: archivo, derivado: relativa.replace(/\\/g, '/'), bytes: (await stat(destino)).size, formato, ancho: ANCHO_VISOR });
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

  for (const logo of LOGOS) {
    for (const formato of ['webp', 'png']) {
      const relativa = rutaLogo(logo.base, formato);
      const destino = path.join(baseDir, relativa);
      await generarLogo(path.join(sourceRoot, logo.origen), destino, { ancho: logo.ancho, formato });
      resultados.push({ tipo: 'logo', origen: logo.origen, derivado: relativa, bytes: (await stat(destino)).size, formato, ancho: logo.ancho });
    }
  }

  const destinoOg = path.join(baseDir, rutaOg());
  await generarOg(sourceRoot, destinoOg);
  resultados.push({ tipo: 'og', origen: NOMBRE_BANNER, derivado: rutaOg(), bytes: (await stat(destinoOg)).size, formato: 'jpg', ancho: OG.ancho });

  return resultados;
}

// Vista previa al compartir: el banner completo, sin recortar, centrado sobre el color de papel de la marca.
// Si el banner midiera más alto que 630 px se ajusta por altura, para no romper la composición.
async function generarOg(sourceRoot, destino) {
  const origen = path.join(sourceRoot, NOMBRE_BANNER);
  let buffer = await sharp(origen, { failOn: 'none' }).rotate().resize({ width: OG.ancho, withoutEnlargement: true }).jpeg({ quality: 90 }).toBuffer();
  let alto = (await sharp(buffer).metadata()).height;
  if (alto > OG.alto) {
    buffer = await sharp(origen, { failOn: 'none' }).rotate().resize({ height: OG.alto, withoutEnlargement: true }).jpeg({ quality: 90 }).toBuffer();
    alto = (await sharp(buffer).metadata()).height;
  }
  const ancho = (await sharp(buffer).metadata()).width;
  await sharp({ create: { width: OG.ancho, height: OG.alto, channels: 3, background: OG.fondo } })
    .composite([{ input: buffer, top: Math.round((OG.alto - alto) / 2), left: Math.round((OG.ancho - ancho) / 2) }])
    .jpeg({ quality: OG.calidad, mozjpeg: true, progressive: true })
    .toFile(destino);
}

function analizarDerivado(urlPath, sourceRoot) {
  const relativa = urlPath.replace(/^\/+/, '').replace(/\\/g, '/');
  if (relativa === rutaOg()) {
    return { relativa, og: true, origen: path.join(sourceRoot, NOMBRE_BANNER) };
  }
  let match = relativa.match(/^derivados\/promociones\/(.+)-(\d+)\.(webp|jpg)$/);
  if (match && [ANCHO_MINIATURA, ANCHO_VISOR].includes(Number(match[2]))) {
    const archivo = match[1];
    if (path.basename(archivo) !== archivo) return null;
    const ancho = Number(match[2]);
    const alta = ancho === ANCHO_VISOR;
    return {
      relativa,
      origen: path.join(sourceRoot, 'promociones', archivo),
      ancho,
      formato: match[3],
      ...(alta ? { calidadWebp: CALIDAD_VISOR_WEBP, calidadJpg: CALIDAD_VISOR_JPG } : {})
    };
  }
  match = relativa.match(/^derivados\/banner-(\d+)\.(webp|jpg)$/);
  if (match && ANCHOS_BANNER.includes(Number(match[1]))) {
    return { relativa, origen: path.join(sourceRoot, NOMBRE_BANNER), ancho: Number(match[1]), formato: match[2] };
  }
  match = relativa.match(/^derivados\/foto-local-(\d+)\.(webp|jpg)$/);
  if (match && Number(match[1]) === ANCHO_FOTO) {
    return { relativa, origen: path.join(sourceRoot, NOMBRE_FOTO), ancho: ANCHO_FOTO, formato: match[2] };
  }
  match = relativa.match(/^derivados\/(logo-header|logo-footer)\.(webp|png)$/);
  if (match) {
    const logo = LOGOS.find(item => item.base === match[1]);
    if (!logo) return null;
    return { relativa, origen: path.join(sourceRoot, logo.origen), ancho: logo.ancho, formato: match[2], logo: true };
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
    if (spec.og) await generarOg(sourceRoot, destino);
    else if (spec.logo) await generarLogo(spec.origen, destino, spec);
    else await generarArchivo(spec.origen, destino, spec);
    return destino;
  })();
  generando.set(destino, tarea);
  try {
    return await tarea;
  } finally {
    generando.delete(destino);
  }
}
