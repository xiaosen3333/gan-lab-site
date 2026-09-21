import assert from 'node:assert/strict';
import { readFile, access, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { root, loadSite } from './build-site.mjs';

const values = (html, expression) => [...html.matchAll(expression)].map(match => match[1]);
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
// Each srcset URL has its own deployment prefix and existence requirement.
export function resourceURLs(html) {
  const urls = values(html, /(?:href|src)="([^"]+)"/g);
  for (const candidates of values(html, /srcset="([^"]+)"/g)) {
    for (const candidate of candidates.split(',')) {
      const match = candidate.trim().match(/^(\S+)(?:\s+(?:[1-9]\d*w|(?:\d+\.)?\d+x))?$/);
      assert.ok(match, 'Valid responsive candidate: ' + candidate);
      urls.push(match[1]);
    }
  }
  return urls;
}
export async function checkLocalReferences(pages, { directory = root, site }) {
  for (const [path, html] of pages) {
    for (const raw of resourceURLs(html)) {
      const url = new URL(decode(raw), site.origin + path);
      if (url.origin !== site.origin) continue;
      assert.ok(url.pathname.startsWith(site.basePath), `${path}: base path for ${raw}`);
      const relative = url.pathname.slice(site.basePath.length);
      const file = relative.endsWith('/') || relative === '' ? relative + 'index.html' : relative;
      await access(resolve(directory, file));
      if (url.hash) {
        const targetHTML = pages.get(url.pathname);
        assert.ok(targetHTML?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path}: valid anchor ${raw}`);
      }
    }
  }
}
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
    const projectShare = ['/', '/projects'].includes(route);
    assert.deepEqual(values(html, /<meta property="og:image" content="([^"]+)"/g), [site.origin + site.basePath + (projectShare ? 'assets/projects/moworld-teaser.jpg' : 'assets/gan-mark.png')]);
    assert.deepEqual(values(html, /<meta property="og:image:width" content="([^"]+)"/g), [projectShare ? '2008' : '1254']);
    assert.deepEqual(values(html, /<meta property="og:image:height" content="([^"]+)"/g), [projectShare ? '1503' : '1254']);
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
  await checkLocalReferences(pages, { site });
  const home = pages.get(site.basePath), contact = pages.get(pathFor('/contact'));
  for (const index of [0, 1, 2]) assert.ok(home.includes(`id="perspective-panel-${index}"`));
  assert.doesNotMatch(home, /data-perspective|role="tab"|culture-computation-concept/);
  assert.match(contact, /data-nav="contact" aria-current="page"/);
  assert.doesNotMatch(contact, /contact-layout|contact-tabs|contact-panel|data-intent|下一步如何展开|交流时可以带上/);
  assert.ok(contact.includes('assets/contact-channel.png'));
  assert.ok(!/\shidden(?:[\s=>])/.test(home + contact), 'Initial panels are visible without JavaScript');
  for (const work of works) {
    const html = pages.get(pathFor('/research/' + work.id));
    for (const id of ['work-question', 'work-method', 'work-paper']) assert.ok(html.includes(`id="${id}"`), 'Legacy research anchor: ' + id);
    assert.ok(html.includes(work.method) && html.includes(work.title), 'Research method and full paper title remain visible');
  }
  const projectHTML = pages.get(pathFor('/projects'));
  assert.equal(projects.length, 13);
  assert.deepEqual(Array.from(projects, project => project.id), ['moworld', 'canal-growth', 'moran', 'ai-history-atlas', 'poempalette', '3dinkgen', 'inkrenew', 'ink-restorer', 'realtimegen', 'fusionprotor', 'magic-pen', 'charactercritique', 'artist-1']);
  const selected = [...home.matchAll(/<article class="project-card selected-work(?:[^"]*)" id="([^"]+)" tabindex="-1">([\s\S]*?)<\/article>/g)];
  const expectedSelections = [
    ['perspective-panel-0', works.find(work => work.id === 'disback'), pathFor('/research/disback')],
    ['project-card-moworld', projects.find(project => project.id === 'moworld'), pathFor('/projects') + '#moworld'],
    ['perspective-panel-2', works.find(work => work.id === 'ink-restorer'), pathFor('/research/ink-restorer')],
    ['project-card-canal-growth', projects.find(project => project.id === 'canal-growth'), pathFor('/projects') + '#canal-growth'],
  ];
  assert.deepEqual(selected.map(match => match[1]), expectedSelections.map(([id]) => id), 'Four selected works in the approved reading order');
  assert.equal((home.match(/class="project-card(?:\s[^"]*)?"/g) || []).length, 4);
  for (const [index, [, work, href]] of expectedSelections.entries()) {
    const entry = selected[index][2];
    assert.ok(entry.includes(`href="${href}"`) && entry.includes(`<h3>${work.name || work.title}</h3>`), 'Selected work title and real destination');
    assert.ok(entry.includes(work.homepage.summary), 'Selected summary comes from its work source');
    assert.equal(entry.includes('<figure'), Boolean(work.media), 'No empty media placeholder');
    if (work.media) assert.ok(entry.includes(`src="${site.basePath}${work.media.path}"`), 'Selected media follows deployment path');
  }
  assert.match(home, /<h1 id="home-title">GAN lab<\/h1>/);
  assert.match(home, /id="perspective-panel-1"[^>]*>更多研究：[\s\S]*?>PoemPalette（诗画交互）/);
  assert.ok(home.includes(`href="${pathFor('/research/poempalette')}"`));
  assert.doesNotMatch(home, /id="project-card-moran"|class="hero-project"|class="featured-projects"/);
  const ink = works.find(work => work.id === 'ink-restorer');
  for (const html of [home, pages.get(pathFor('/research/ink-restorer'))]) {
    assert.ok(html.includes(`src="${site.basePath}${ink.media.path}"`));
    assert.ok(html.includes(`width="${ink.media.width}" height="${ink.media.height}"`));
    assert.ok(html.includes(ink.media.alt) && html.includes(ink.media.caption));
  }
  assert.ok((await stat(resolve(root, ink.media.path))).size < 350 * 1024, 'Ink interface stays a small full-frame image');
  assert.equal((projectHTML.match(/class="portfolio-entry(?:\s[^"]*)?"/g) || []).length, 13);
  assert.deepEqual(Array.from(projectPartners, partner => partner.name), ['字节跳动', '吉利', '阿里巴巴', '大疆']);
  for (const project of projects) {
    assert.ok(projectHTML.includes(`id="${project.id}"`), 'Stable project anchor: ' + project.id);
    assert.ok(projectHTML.includes(project.title));
    if (project.media) {
      assert.ok(projectHTML.includes(`src="${site.basePath}${project.media.path}"`));
      assert.ok(projectHTML.includes(`width="${project.media.width}" height="${project.media.height}"`));
      assert.ok((await stat(resolve(root, project.media.path))).size < 4 * 1024 * 1024, 'Project images stay below 4 MB');
    } else {
      assert.ok(['realtimegen', 'artist-1'].includes(project.id), 'Only explicitly text-led projects omit media');
    }
    if (['moworld', 'canal-growth'].includes(project.id)) {
      assert.ok(home.includes(`href="${pathFor('/projects')}#${project.id}"`));
      assert.ok(home.includes(`id="project-card-${project.id}" tabindex="-1"`));
    }
    for (const credit of project.credits) for (const person of credit.people) {
      if (person.memberId) assert.equal(members.find(member => member.id === person.memberId)?.name, person.name, 'Credit matches confirmed member');
      assert.ok(projectHTML.includes(person.name), 'Visible credit: ' + person.name);
    }
    for (const link of project.links) {
      if (link.route) {
        assert.ok(allRoutes().includes(link.route), 'Related research route exists');
        assert.ok(projectHTML.includes(`href="${pathFor(link.route)}"`));
        continue;
      }
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
  const bibliography = pages.get(pathFor('/outputs'));
  assert.equal((bibliography.match(/class="paper-row"/g) || []).length, 28);
  for (const [year, count] of [[2026, 12], [2025, 9], [2024, 5], [2023, 1], [2022, 1]]) {
    assert.ok(bibliography.includes(`href="#year-${year}"`));
    const section = bibliography.match(new RegExp(`<section class="publication-year" aria-labelledby="year-${year}">([\\s\\S]*?)<\\/section>`))?.[1];
    assert.ok(section, 'Year section: ' + year);
    assert.equal((section.match(/class="paper-row"/g) || []).length, count);
    assert.equal((section.match(/<h3>/g) || []).length, count);
  }
  for (const member of members.filter(hasMemberDetails)) {
    const html = pages.get(pathFor('/people/' + member.id));
    const contributions = projects.filter(project => project.credits.some(credit => credit.people.some(person => person.memberId === member.id)));
    assert.equal(html.includes('id="member-projects"'), contributions.length > 0, 'Derived member projects: ' + member.id);
    for (const project of contributions) assert.ok(html.includes(`href="${pathFor('/projects')}#${project.id}"`));
  }
  for (const width of [640, 960, 1440]) {
    assert.ok(home.includes(`${site.basePath}assets/projects/moworld-${width}.webp ${width}w`));
    assert.ok(projectHTML.includes(`${site.basePath}assets/projects/moworld-${width}.webp ${width}w`));
  }
  assert.ok((await stat(resolve(root, 'assets/projects/moworld-960.webp'))).size <= 350000);
  assert.ok(home.includes('loading="eager" fetchpriority="high"'));
  assert.ok(projectHTML.includes('href="#capabilities-title"') && projectHTML.includes('href="#partners-title"'));
  assert.ok(pages.get(pathFor('/about')).includes('href="http://www.cst.zju.edu.cn/"'));
  assert.equal((pages.get(pathFor('/people')).match(/class="person-card"/g) || []).length, 31);
  assert.equal((pages.get(pathFor('/people')).match(/class="person-card-link" href=/g) || []).length, 25);
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.deepEqual(new Set(values(sitemap, /<loc>([^<]+)<\/loc>/g)), canonicals);
  const notFound = await readFile(resolve(root, '404.html'), 'utf8');
  assert.ok(notFound.includes('noindex,follow'));
  assert.ok(notFound.includes('<h1>页面未找到</h1>'));
  assert.ok(notFound.includes('返回首页'));
  const css = await readFile(resolve(root, 'styles.css'), 'utf8');
  assert.match(css, /\.partner-logo-bytedance\s*\{[^}]*filter:\s*brightness\(0\)/, 'White official mark remains visible on white background');
  assert.ok(!notFound.includes('rel="canonical"'));
  return { pages: routes.length, members: members.length, publications: publications.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkSite();
  console.log(`Static HTML verified: ${result.pages} pages, ${result.members} members, ${result.publications} publications; metadata, schema, links, anchors and image email passed.`);
}
