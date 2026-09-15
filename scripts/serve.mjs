import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { root, loadSite } from './build-site.mjs';

const { site } = await loadSite();
const base = site.basePath;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json; charset=utf-8' };
export function createSiteServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
      if (url.pathname === base.slice(0, -1)) { response.writeHead(301, { location: base + url.search }); response.end(); return; }
      const path = decodeURIComponent(url.pathname);
      let file = resolve(root, path.startsWith(base) ? path.slice(base.length) : '__missing__');
      if (!file.startsWith(root + sep) && file !== root) { response.writeHead(404); response.end(); return; }
      let status = 200;
      try {
        const info = await stat(file);
        if (info.isDirectory()) {
          if (!path.endsWith('/')) { response.writeHead(301, { location: url.pathname + '/' + url.search }); response.end(); return; }
          file = resolve(file, 'index.html');
        }
        await stat(file);
      } catch {
        status = 404;
        file = resolve(root, '404.html');
      }
      const body = await readFile(file);
      response.writeHead(status, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(400); response.end('Bad request');
    }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4175);
  createSiteServer().listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}${base}`));
}
