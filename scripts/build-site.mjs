import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const sourceScripts = ['research.js', 'team.js', 'publications.js', 'renderer.js', 'app.js'];
const hash = content => createHash('sha256').update(content).digest('hex');
export async function loadSite() {
  const configuration = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
  const url = new URL(configuration.url);
  if (url.protocol !== 'https:' || url.search || url.hash || url.username || url.password || !url.pathname.endsWith('/')) throw new Error('site.config.json url must be an absolute HTTPS directory URL ending in /, without credentials, query or fragment.');
  const context = vm.createContext({ URL, URLSearchParams });
  vm.runInContext('const site = Object.freeze(' + JSON.stringify({ origin: url.origin, basePath: url.pathname, name: configuration.name }) + ');', context);
  for (const file of sourceScripts.slice(0, -1)) {
    vm.runInContext(await readFile(resolve(root, file), 'utf8'), context, { filename: file });
  }
  return vm.runInContext('({ site, allRoutes, pageFor, structuredData, publicHTML, pathFor, escapeHTML, members, works, publications, hasMemberDetails, presentation, hrefFor, legacyDestination })', context);
}
export async function generate() {
  const shared = await loadSite();
  const { site, allRoutes, pageFor, structuredData, publicHTML, pathFor, escapeHTML: escape } = shared;
  const template = await readFile(resolve(root, 'templates/shell.html'), 'utf8');
  // Browser navigation needs only known routes and local controls, not private/hidden catalogue fields.
  const runtime = "'use strict';\n// Generated from site.config.json and the shared route rules.\n" +
    'const site = Object.freeze(' + JSON.stringify(site) + ');\n' +
    'const members = ' + JSON.stringify(shared.members.map(member => ({ id: member.id, detailed: shared.hasMemberDetails(member) }))) + ';\n' +
    'const routes = ' + JSON.stringify(allRoutes()) + ';\n' +
    'function hasMemberDetails(member) { return member.detailed; }\nfunction allRoutes() { return routes; }\n' +
    [shared.pathFor, shared.hrefFor, shared.legacyDestination].map(fn => fn.toString()).join('\n') + '\n';
  const browserScripts = ['site-runtime.js', 'app.js'];
  const versions = { 'site-runtime.js': hash(runtime).slice(0, 12) };
  for (const file of ['app.js', 'styles.css']) versions[file] = hash(await readFile(resolve(root, file))).slice(0, 12);
  const scripts = browserScripts.map(file => `<script src="${site.basePath}${file}?v=${versions[file]}" defer></script>`).join('\n');
  const image = site.origin + site.basePath + 'assets/culture-computation-concept.png';
  const imageAlt = '水墨山形与同形采样点云的黑白概念视觉';
  const output = new Map([['site-runtime.js', runtime]]);
  for (const route of [...allRoutes(), '/404']) {
    const page = pageFor(route);
    const canonical = site.origin + pathFor(route);
    let head = `<title>${escape(page.title)}</title>\n<meta name="description" content="${escape(page.description)}">\n`;
    if (page.exists) {
      head += `<link rel="canonical" href="${canonical}">\n`;
      const metadata = {
        'og:site_name': site.name, 'og:type': 'website', 'og:title': page.title,
        'og:description': page.description, 'og:url': canonical, 'og:locale': 'zh_CN',
        'og:image': image, 'og:image:alt': imageAlt, 'og:image:width': '1536', 'og:image:height': '1024',
      };
      for (const [property, value] of Object.entries(metadata)) head += `<meta property="${property}" content="${escape(value)}">\n`;
      for (const [name, value] of Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': image, 'twitter:image:alt': imageAlt })) head += `<meta name="${name}" content="${escape(value)}">\n`;
      const json = JSON.stringify(structuredData(page)).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
      head += `<script type="application/ld+json">${json}</script>\n`;
    } else head += '<meta name="robots" content="noindex,follow">\n';
    head += `<link rel="icon" type="image/png" sizes="32x32" href="${site.basePath}assets/favicon-32.png"><link rel="icon" type="image/png" sizes="16x16" href="${site.basePath}assets/favicon-16.png"><link rel="stylesheet" href="${site.basePath}styles.css?v=${versions['styles.css']}">`;
    let html = template.replace('{{HEAD}}', head).replace('{{MAIN}}', page.html).replace('{{SCRIPTS}}', scripts);
    html = publicHTML(html, route).replace(/data-nav="([^"]+)"/g, (attribute, nav) => attribute + (nav === page.nav ? ' aria-current="page"' : ''));
    const file = route === '/404' ? '404.html' : route === '/' ? 'index.html' : route.slice(1) + '/index.html';
    output.set(file, html);
  }
  output.set('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + allRoutes().map(route => `  <url><loc>${escape(site.origin + pathFor(route))}</loc></url>`).join('\n') + '\n</urlset>\n');
  const manifest = { version: 1, files: Object.fromEntries([...output].map(([file, content]) => [file, hash(content)])) };
  output.set('generated-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  return output;
}
export async function build({ check = false } = {}) {
  const output = await generate();
  let previous = { files: {} };
  try { previous = JSON.parse(await readFile(resolve(root, 'generated-manifest.json'), 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const stale = Object.keys(previous.files).filter(file => !output.has(file));
  const differences = [];
  for (const [file, content] of output) {
    let actual = null;
    try { actual = await readFile(resolve(root, file), 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (actual !== content) differences.push(file);
  }
  if (check) {
    if (differences.length || stale.length) throw new Error('Generated files are missing or stale. Run npm run build: ' + [...differences, ...stale].join(', '));
    return { pages: 34, changed: 0 };
  }
  // Remove only obsolete, unchanged artifacts owned by the previous manifest.
  for (const file of stale) {
    if (!/^(?:research\/[a-z0-9-]+|people\/[a-z0-9-]+)\/index\.html$/.test(file)) throw new Error('Unexpected stale artifact: ' + file);
    const path = resolve(root, file);
    const actual = await readFile(path);
    if (hash(actual) !== previous.files[file]) throw new Error('Refusing to remove manually edited artifact: ' + file);
    await unlink(path);
  }
  for (const file of differences) {
    await mkdir(dirname(resolve(root, file)), { recursive: true });
    await writeFile(resolve(root, file), output.get(file));
  }
  return { pages: 34, changed: differences.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await build({ check: process.argv.includes('--check') });
  console.log(`${result.pages} public pages, 404 and sitemap ${process.argv.includes('--check') ? 'verified' : 'built'} (${result.changed} changed files).`);
}
