import assert from 'node:assert/strict';
import { readFile, access, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { root, loadSite } from './build-site.mjs';

const values = (html, expression) => [...html.matchAll(expression)].map(match => match[1]);
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
export async function checkSite() {
  const { site, allRoutes, members, publications, works, projects, projectPartners, hasMemberDetails, pathFor, presentation } = await loadSite();
  const routes = Array.from(allRoutes());
  assert.equal(routes.length, 35);
  assert.equal(members.length, 31);
  assert.equal(publications.length, 28);
  assert.equal(works.length, 3);
  assert.equal(members.filter(hasMemberDetails).length, 25);
  assert.ok(Object.values(presentation).every(value => value === false));
  const titles = new Set(), descriptions = new Set(), canonicals = new Set();
  const pages = new Map();
  for (const route of routes) {
    const path = route === '/' ? 'index.html' : route.slice(1) + '/index.html';
    const html = await readFile(resolve(root, path), 'utf8');
    pages.set(pathFor(route), html);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main && main.length > 300, `${path}: complete main`);
    assert.equal((main.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: exactly one H1`);
    assert.ok(!/noindex/i.test(html), `${path}: indexable`);
    const title = values(html, /<title>([^<]+)<\/title>/g);
    const description = values(html, /<meta name="description" content="([^"]+)"/g);
    const canonical = values(html, /<link rel="canonical" href="([^"]+)"/g);
    assert.equal(title.length, 1); assert.equal(description.length, 1); assert.equal(canonical.length, 1);
    assert.equal(canonical[0], site.origin + pathFor(route));
    titles.add(title[0]); descriptions.add(description[0]); canonicals.add(canonical[0]);
    const ogURL = values(html, /<meta property="og:url" content="([^"]+)"/g);
    assert.deepEqual(ogURL, canonical);
    const schemas = values(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    assert.equal(schemas.length, 1);
    const schema = JSON.parse(schemas[0]);
    assert.equal(schema['@context'], 'https://schema.org');
    assert.ok(Array.isArray(schema['@graph']));
    assert.ok(!/"(?:email|jobTitle|affiliation|author|foundingDate|address|alternateName)"\s*:/.test(schemas[0]), `${path}: no invented or hidden schema fields`);
    assert.ok(!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(html), `${path}: image email only`);
    assert.ok(!/href="#\//.test(html), `${path}: no hash page links`);
    assert.ok(!/class="paper-actions"|class="publication-people"|class="person-english"|data-output-filter=/.test(main), `${path}: presentation switches respected`);
    if (route.startsWith('/people/')) {
      const person = schema['@graph'].find(node => node['@type'] === 'Person');
      assert.equal(person.name, members.find(member => route.endsWith('/' + member.id)).name);
    }
  }
  assert.equal(titles.size, 35); assert.equal(descriptions.size, 35); assert.equal(canonicals.size, 35);
  for (const [path, html] of pages) {
    const links = values(html, /(?:href|src|srcset)="([^"]+)"/g);
    for (const raw of links) {
      const url = new URL(decode(raw), site.origin + path);
      if (url.origin !== site.origin) continue;
      assert.ok(url.pathname.startsWith(site.basePath), `${path}: base path for ${raw}`);
      const relative = url.pathname.slice(site.basePath.length);
      const file = relative.endsWith('/') || relative === '' ? relative + 'index.html' : relative;
      await access(resolve(root, file));
      if (url.hash) {
        const targetHTML = pages.get(url.pathname);
        assert.ok(targetHTML?.includes(`id="${url.hash.slice(1)}"`), `${path}: valid anchor ${raw}`);
      }
    }
  }
  const home = pages.get(site.basePath), contact = pages.get(pathFor('/contact'));
  for (const index of [0, 1, 2]) assert.ok(home.includes(`id="perspective-panel-${index}"`));
  assert.doesNotMatch(contact, /contact-layout|contact-tabs|contact-panel|data-intent|下一步如何展开|交流时可以带上/);
  assert.ok(contact.includes('assets/contact-channel.png'));
  assert.ok(!/\shidden(?:[\s=>])/.test(home + contact), 'Initial panels are visible without JavaScript');
  const projectHTML = pages.get(pathFor('/projects'));
  assert.equal(projects.length, 4);
  assert.deepEqual(Array.from(projects, project => project.id), ['moworld', 'canal-growth', 'moran', 'ai-history-atlas']);
  assert.equal(projects.filter(project => project.featured).length, 3);
  assert.equal((home.match(/class="project-card"/g) || []).length, 3);
  assert.equal((projectHTML.match(/class="portfolio-entry"/g) || []).length, 4);
  assert.deepEqual(Array.from(projectPartners, partner => partner.name), ['字节跳动', '吉利', '阿里巴巴', '大疆']);
  for (const project of projects) {
    assert.ok(projectHTML.includes(`id="${project.id}"`), 'Stable project anchor: ' + project.id);
    assert.ok(projectHTML.includes(project.title));
    assert.ok(projectHTML.includes(`src="${site.basePath}${project.media.path}"`));
    assert.ok(projectHTML.includes(`width="${project.media.width}" height="${project.media.height}"`));
    assert.ok((await stat(resolve(root, project.media.path))).size < 4 * 1024 * 1024, 'Project images stay below 4 MB');
    if (project.featured) {
      assert.ok(home.includes(`href="${pathFor('/projects')}#${project.id}"`));
      assert.ok(home.includes(`id="project-card-${project.id}" tabindex="-1"`));
    }
    for (const credit of project.credits) for (const person of credit.people) {
      if (person.memberId) assert.equal(members.find(member => member.id === person.memberId)?.name, person.name, 'Credit matches confirmed member');
      assert.ok(projectHTML.includes(person.name), 'Visible credit: ' + person.name);
    }
    for (const link of project.links) {
      assert.ok(['http:', 'https:'].includes(new URL(link.url).protocol));
      assert.ok(projectHTML.includes(`href="${link.url}"`));
    }
  }
  for (const partner of projectPartners) {
    assert.ok(projectHTML.includes(`alt="${partner.name}"`), 'Accessible partner name');
    assert.ok(projectHTML.includes(`src="${site.basePath}${partner.logo}"`), 'Local partner logo follows deployment path');
    assert.ok((await stat(resolve(root, partner.logo))).size > 0, 'Partner logo exists');
  }
  assert.ok(projectHTML.includes('class="atlas-scroll" role="region" tabindex="0"'));
  assert.ok(projectHTML.includes(`href="${site.basePath}assets/projects/ai-history-atlas.jpg"`));
  assert.doesNotMatch(projectHTML, /战略合作|独立研发|已开源部署|Coming Soon|canal-30|ai-history-1\.jpg/);
  const projectSchema = JSON.parse(values(projectHTML, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)[0]);
  assert.ok(projectSchema['@graph'].some(node => node['@type'] === 'CollectionPage'));
  assert.ok(!projectSchema['@graph'].some(node => node.creator || node.sponsor));
  assert.equal((pages.get(pathFor('/outputs')).match(/class="paper-row"/g) || []).length, 28);
  assert.equal((pages.get(pathFor('/people')).match(/class="person-card"/g) || []).length, 31);
  assert.equal((pages.get(pathFor('/people')).match(/class="person-card-link" href=/g) || []).length, 25);
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.deepEqual(new Set(values(sitemap, /<loc>([^<]+)<\/loc>/g)), canonicals);
  const notFound = await readFile(resolve(root, '404.html'), 'utf8');
  assert.ok(notFound.includes('noindex,follow'));
  assert.ok(!notFound.includes('rel="canonical"'));
  return { pages: routes.length, members: members.length, publications: publications.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkSite();
  console.log(`Static HTML verified: ${result.pages} pages, ${result.members} members, ${result.publications} publications; metadata, schema, links, anchors and image email passed.`);
}
