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
  assert.equal(publications.length, 46);
  assert.equal(new Set(publications.map(p => p.id)).size, 46);
  assert.equal(new Set(publications.map(p => p.title.toLowerCase().replace(/[^a-z0-9]/g, ""))).size, 46);
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
  assert.doesNotMatch(home, /data-perspective|role="tab"/);
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
  assert.ok(home.includes(`src="${site.basePath}assets/culture-computation-1536.webp"`), "Approved homepage visual uses deployment base path");
  const selected = [...home.matchAll(/<article class="project-card selected-work(?:[^"]*)" id="([^"]+)" tabindex="-1">([\s\S]*?)<\/article>/g)];
  const expectedSelections = [
    ['project-card-moworld', projects.find(project => project.id === 'moworld'), pathFor('/projects') + '#moworld'],
    ['perspective-panel-2', works.find(work => work.id === 'ink-restorer'), pathFor('/research/ink-restorer')],
    ['project-card-canal-growth', projects.find(project => project.id === 'canal-growth'), pathFor('/projects') + '#canal-growth'],
    ['project-card-ai-history-atlas', projects.find(project => project.id === 'ai-history-atlas'), pathFor('/projects') + '#ai-history-atlas'],
    ['project-card-artist-1', projects.find(project => project.id === 'artist-1'), pathFor('/projects') + '#artist-1'],
  ];
  assert.deepEqual(selected.map(match => match[1]), expectedSelections.map(([id]) => id), 'Two research projects followed by three cultural works');
  assert.equal((home.match(/class="project-card(?:\s[^"]*)?"/g) || []).length, 5);
  for (const [index, [, work, href]] of expectedSelections.entries()) {
    const entry = selected[index][2];
    assert.ok(entry.includes(`href="${href}"`) && entry.includes(`<h3>${work.name || work.title}</h3>`), 'Selected work title and real destination');
    assert.ok(entry.includes(work.homepage.summary), 'Selected summary comes from its work source');
    assert.match(entry, /class="project-card-action">查看详情 /, 'Homepage detail actions use one shared label');
    assert.equal(entry.includes('<figure'), Boolean(work.media), 'No empty media placeholder');
    if (work.media) assert.ok(entry.includes(`src="${site.basePath}${work.id === 'moworld' ? 'assets/projects/moworld-960.webp' : work.id === 'ai-history-atlas' ? 'assets/projects/ai-history-atlas.webp' : work.media.path}"`), 'Selected media follows deployment path');
  }
  assert.match(home, /<h1 id="home-title">GAN lab<\/h1>/);
  assert.doesNotMatch(home, /更多研究：|全部研究/);
  const collections = home.match(/<nav class="collection-links"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert.equal((collections.match(/<a /g) || []).length, 2);
  assert.ok(collections.includes(`href="${pathFor('/outputs')}"`));
  assert.ok(home.includes('id="partners-title"'));
  assert.match(home, /id="selected-title">项目与研究<\/h2>/);
  assert.match(home, /id="culture-title">文化实践与展览<\/h2>/);
  assert.doesNotMatch(home, /精选成果|DisBack/);
  assert.doesNotMatch(home, /参与项目|创作团队成员|团队成员参与内容撰写/);
  assert.ok(home.includes(`href="${pathFor('/projects')}"`) && home.includes('全部项目与作品'));
  for (const page of pages.values()) assert.doesNotMatch(page, /data-nav="research"/);
  const researchHTML = pages.get(pathFor('/research'));
  assert.equal((researchHTML.match(/<h2><a /g) || []).length, 3);
  assert.doesNotMatch(researchHTML, />研究详情</);
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
      assert.ok(projectHTML.includes(`src="${site.basePath}${project.id === 'moworld' ? 'assets/projects/moworld-960.webp' : project.id === 'ai-history-atlas' ? 'assets/projects/ai-history-atlas.webp' : project.media.path}"`));
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
      if (!['参与', '项目参与', '团队成员'].includes(credit.role)) assert.ok(projectHTML.includes(person.name), 'Visible specific credit: ' + person.name);
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
    assert.ok(contact.includes(`alt="${partner.name}"`), 'Accessible partner name');
    assert.ok(contact.includes(`src="${site.basePath}${partner.logo}"`), 'Local partner logo follows deployment path');
    assert.ok((await stat(resolve(root, partner.logo))).size > 0, 'Partner logo exists');
  }
  assert.ok(projectHTML.includes('class="atlas-scroll" role="region" tabindex="0"'));
  assert.ok(projectHTML.includes(`href="${site.basePath}assets/projects/ai-history-atlas.jpg"`));
  assert.doesNotMatch(projectHTML, /战略合作|独立研发|已开源部署|Coming Soon|canal-30|ai-history-1\.jpg/);
  const projectSchema = JSON.parse(values(projectHTML, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)[0]);
  assert.ok(projectSchema['@graph'].some(node => node['@type'] === 'CollectionPage'));
  assert.ok(!projectSchema['@graph'].some(node => node.creator || node.sponsor));
  const bibliography = pages.get(pathFor('/outputs'));
  assert.equal((bibliography.match(/class="paper-row"/g) || []).length, 46);
  for (const [year, count] of [[2026, 13], [2025, 14], [2024, 7], [2023, 5], [2022, 2], [2021, 1], [2020, 1], [2019, 2], [2018, 1]]) {
    assert.ok(bibliography.includes(`<summary id="year-${year}">`));
    const section = bibliography.match(new RegExp(`<details class="publication-year"${year === 2026 ? ' open' : ''}><summary id="year-${year}">([\\s\\S]*?)<\\/details>`))?.[1];
    assert.ok(section, 'Year section: ' + year);
    assert.equal((section.match(/class="paper-row"/g) || []).length, count);
    assert.equal((section.match(/<h3>/g) || []).length, count);
  }
  for (const paper of publications) {
    assert.ok(bibliography.includes(`<a href="${paper.url}" target="_blank" rel="noopener" title="${paper.sourceLabel || '论文原文'}">${paper.title}</a>`), 'Bibliography title opens original source: ' + paper.id);
  }
  for (const member of members.filter(hasMemberDetails)) {
    const html = pages.get(pathFor('/people/' + member.id));
    assert.doesNotMatch(html, /<h3><a href="https?:/, 'Member bibliography remains plain titles');
    const contributions = projects.filter(project => project.credits.some(credit => credit.people.some(person => person.memberId === member.id)));
    assert.equal(html.includes('id="member-projects"'), contributions.length > 0, 'Derived member projects: ' + member.id);
    for (const project of contributions) assert.ok(html.includes(`href="${pathFor('/projects')}#${project.id}"`));
  }
  for (const width of [640, 960, 1440]) {
    assert.ok(home.includes(`${site.basePath}assets/projects/moworld-${width}.webp ${width}w`));
    assert.ok(projectHTML.includes(`${site.basePath}assets/projects/moworld-${width}.webp ${width}w`));
  }
  assert.ok((await stat(resolve(root, 'assets/projects/moworld-960.webp'))).size <= 350000);
  assert.equal((home.match(/fetchpriority="high"/g) || []).length, 1, 'Only the hero competes for high image priority');
  for (const width of [640, 960, 1536]) {
    assert.ok(home.includes(`${site.basePath}assets/culture-computation-${width}.webp ${width}w`));
    assert.ok((await stat(resolve(root, `assets/culture-computation-${width}.webp`))).size < 220000, 'Hero candidate transfer budget');
  }
  assert.ok(home.includes('loading="eager" fetchpriority="high" decoding="async"'));
  assert.ok((await stat(resolve(root, 'assets/projects/ai-history-atlas.webp'))).size < 1124282);
  assert.ok(contact.includes('id="capabilities-title"') && contact.includes('id="partners-title"'));
  assert.doesNotMatch(projectHTML, /id="capabilities-title"|id="partners-title"|<dt>参与<|<dt>项目参与<|<dt>团队成员<|李泽健参与研究|团队成员参与内容撰写/);
  assert.doesNotMatch(projectHTML, /class="project-index"/, 'Project content starts without the removed name index');
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
