import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { listPromotions } from './promociones.mjs';
import { asegurarDerivado } from './imagenes.mjs';
const root = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.json': 'application/json'
};
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (pathname === '/datos/promociones.js') {
      res.writeHead(200, {'Content-Type':'text/javascript; charset=utf-8', 'Cache-Control':'no-store'});
      res.end('window.PROMOCIONES = ' + JSON.stringify(await listPromotions()) + ';'); return;
    }
    if (pathname.startsWith('/.cache/') || pathname.startsWith('/.git/')) { res.writeHead(404); res.end(); return; }
    if (pathname.startsWith('/derivados/')) {
      let file;
      try {
        file = await asegurarDerivado({ sourceRoot: root, baseDir: path.join(root, '.cache'), urlPath: pathname });
      } catch (error) {
        console.error('No se pudo generar el derivado', pathname, error);
        res.writeHead(500); res.end('No se pudo generar el derivado'); return;
      }
      if (!file) { res.writeHead(404); res.end(); return; }
      const data = await readFile(file);
      res.writeHead(200, {'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control':'no-store'});
      res.end(data); return;
    }
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) {res.writeHead(403);res.end();return;}
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream'});
    res.end(data);
  } catch {res.writeHead(404);res.end('No encontrado');}
}).listen(4173,'127.0.0.1',() => console.log('http://localhost:4173'));
