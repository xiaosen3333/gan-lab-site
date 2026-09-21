import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { generate, root, loadSite, sourceScripts } from '../scripts/build-site.mjs';
import { checkSite, resourceURLs, checkLocalReferences } from '../scripts/check-site.mjs';
import { createSiteServer } from '../scripts/serve.mjs';

test('complete public HTML, public facts, metadata and links pass the static contract', checkSite);

test('build is deterministic and stale HTML fails the read-only check in an isolated copy', async () => {
  const output = await generate();
  assert.deepEqual(await generate(), output);
  const temporary = await mkdtemp(resolve(tmpdir(), 'gan-seo-check-'));
  try {
    for (const file of [...sourceScripts, 'styles.css', 'site.config.json', 'templates/shell.html', 'scripts/build-site.mjs']) {
      await mkdir(dirname(resolve(temporary, file)), { recursive: true });
      await cp(resolve(root, file), resolve(temporary, file));
    }
    for (const [file, content] of output) {
      await mkdir(dirname(resolve(temporary, file)), { recursive: true });
      await writeFile(resolve(temporary, file), content);
    }
    const run = () => spawnSync(process.execPath, ['scripts/build-site.mjs', '--check'], { cwd: temporary, encoding: 'utf8' });
    assert.equal(run().status, 0);
    await writeFile(resolve(temporary, 'people/li-zejian/index.html'), 'outdated generated page');
    const stale = run();
    assert.notEqual(stale.status, 0);
    assert.match(stale.stderr, /missing or stale/);
    assert.equal(await readFile(resolve(temporary, 'people/li-zejian/index.html'), 'utf8'), 'outdated generated page');
    await writeFile(resolve(temporary, 'site.config.json'), JSON.stringify({ url: 'https://gan.example.edu/', name: 'GAN lab' }));
    const migrated = spawnSync(process.execPath, ['scripts/build-site.mjs'], { cwd: temporary, encoding: 'utf8' });
    assert.equal(migrated.status, 0, migrated.stderr);
    const migratedHome = await readFile(resolve(temporary, 'index.html'), 'utf8');
    const migratedMember = await readFile(resolve(temporary, 'people/li-zejian/index.html'), 'utf8');
    const migratedSitemap = await readFile(resolve(temporary, 'sitemap.xml'), 'utf8');
    const migratedRuntime = await readFile(resolve(temporary, 'site-runtime.js'), 'utf8');
    assert.match(migratedHome, /rel="canonical" href="https:\/\/gan\.example\.edu\/"/);
    assert.match(migratedMember, /href="\/people\/#member-li-zejian"/);
    assert.match(migratedHome, /src="\/site-runtime\.js\?v=/);
    assert.match(migratedSitemap, /https:\/\/gan\.example\.edu\/research\/disback\//);
    for (const content of [migratedHome, migratedMember, migratedSitemap, migratedRuntime]) assert.ok(!content.includes('xiaosen3333.github.io') && !content.includes('/gan-lab-site/'));
    assert.equal(run().status, 0);
    for (const url of ['https://gan.example.edu/', 'https://gan.example.edu/design/gan/']) {
      await writeFile(resolve(temporary, 'site.config.json'), JSON.stringify({ url, name: 'GAN lab' }));
      const result = spawnSync(process.execPath, ['scripts/build-site.mjs'], { cwd: temporary, encoding: 'utf8' });
      assert.equal(result.status, 0, result.stderr);
      const projectHTML = await readFile(resolve(temporary, 'projects/index.html'), 'utf8');
      const prefix = new URL(url).pathname;
      const homeHTML = await readFile(resolve(temporary, 'index.html'), 'utf8');
      const inkHTML = await readFile(resolve(temporary, 'research/ink-restorer/index.html'), 'utf8');
      for (const html of [homeHTML, inkHTML]) {
        assert.ok(html.includes(`src="${prefix}assets/research/ink-restorer-interface.webp"`));
        assert.ok(!html.includes('xiaosen3333.github.io') && !html.includes('/gan-lab-site/'));
      }
      assert.ok(projectHTML.includes(`rel="canonical" href="${url}projects/"`));
      assert.ok(projectHTML.includes(`href="${prefix}projects/#canal-growth"`));
      assert.ok(projectHTML.includes(`src="${prefix}assets/projects/moworld-teaser.jpg"`));
      for (const width of [640, 960, 1440]) assert.ok(projectHTML.includes(`${prefix}assets/projects/moworld-${width}.webp ${width}w`));
      for (const logo of ['bytedance.svg', 'geely.svg', 'alibaba.png', 'dji.svg']) assert.ok(projectHTML.includes(`src="${prefix}assets/partners/${logo}"`));
      assert.ok(projectHTML.includes(`href="${prefix}assets/projects/ai-history-atlas.jpg"`));
      assert.ok(projectHTML.includes(`href="${prefix}assets/favicon-32.png"`));
      assert.ok(!projectHTML.includes('xiaosen3333.github.io') && !projectHTML.includes('/gan-lab-site/'));
      const generatedSitemap = await readFile(resolve(temporary, 'sitemap.xml'), 'utf8');
      assert.equal((generatedSitemap.match(/<loc>/g) || []).length, 35);
      assert.ok(generatedSitemap.includes(`<loc>${url}projects/</loc>`));
      assert.equal(run().status, 0);
    }

  } finally { await rm(temporary, { recursive: true, force: true }); }
});

test('legacy routes preserve members, thin identities, intents, filters and query location', async () => {
  const { legacyDestination: resolveLegacy, site } = await loadSite();
  const base = site.basePath;
  const cases = [
    ['#/people/li-zejian', '/gan-lab-site/people/li-zejian/'],
    ['#/projects#canal-growth', '/gan-lab-site/projects/#canal-growth'],
    ['#/projects/unknown', '/gan-lab-site/not-found/'],
    ['#/research/disback', '/gan-lab-site/research/disback/'],
    ['#/outputs?member=li-zejian', '/gan-lab-site/people/li-zejian/'],
    ['#/people?member=zhang-jiahui', '/gan-lab-site/people/#member-zhang-jiahui'],
    ['#/people/zhang-jiahui', '/gan-lab-site/people/#member-zhang-jiahui'],
    ['#/people?focus=liu-qi', '/gan-lab-site/people/#member-liu-qi'],
    ['#/contact?intent=join', '/gan-lab-site/contact/'],
    ['#/contact?intent=constructor', '/gan-lab-site/contact/'],
    ['#/contact?intent=__proto__', '/gan-lab-site/contact/'],
    ['#/contact?intent=toString', '/gan-lab-site/contact/'],
    ['#/outputs?type=tools', '/gan-lab-site/outputs/?type=tools'],
    ['#/admin/review', '/gan-lab-site/'],
    ['#/preview', '/gan-lab-site/'],
    ['#/research/unknown', '/gan-lab-site/not-found/'],
  ];
  for (const [hash, expected] of cases) assert.equal(resolveLegacy({ pathname: base, hash }), expected.replace('/gan-lab-site/', base), hash);
  assert.equal(resolveLegacy({ pathname: base, search: '?member=li-zejian' }), base + 'people/li-zejian/');
  assert.equal(resolveLegacy({ pathname: base + 'outputs/', search: '?member=zhang-jiahui' }), base + 'people/#member-zhang-jiahui');
  assert.equal(resolveLegacy({ pathname: base + 'not-found/', hash: '' }), null);
  assert.equal(resolveLegacy({ pathname: base + 'contact/', search: '?intent=join', hash: '#contact-panel-join' }), null);
});

test('raw HTTP returns every static page and resource, real unknown-path 404, and directory redirects', async () => {
  const server = createSiteServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const { allRoutes, pathFor, site } = await loadSite();
    const prefix = site.basePath;
    for (const route of allRoutes()) {
      const response = await fetch(base + pathFor(route));
      assert.equal(response.status, 200);
      assert.match(await response.text(), /<main[^>]*>[\s\S]+<h1/);
    }
    for (const path of ['/gan-lab-site/not-found/', '/gan-lab-site/people/zhang-jiahui/', '/gan-lab-site/research/unknown/', '/gan-lab-site/projects/unknown/']) {
      const response = await fetch(base + path.replace('/gan-lab-site/', prefix));
      assert.equal(response.status, 404);
      const html = await response.text();
      assert.match(html, /noindex,follow/);
      assert.doesNotMatch(html, /http-equiv="refresh"/);
    }
    const redirect = await fetch(base + prefix + 'research?test=1', { redirect: 'manual' });
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.get('location'), prefix + 'research/?test=1');
    for (const file of ['assets/research/ink-restorer-interface.webp', 'assets/culture-computation-concept.webp', 'assets/contact-channel.png', 'assets/partners/bytedance.svg', 'assets/partners/geely.svg', 'assets/partners/alibaba.png', 'assets/partners/dji.svg', 'assets/projects/moworld-teaser.jpg', 'assets/projects/canal-growth.jpg', 'assets/projects/moran.jpg', 'assets/projects/ai-history-atlas.jpg', 'assets/favicon-16.png', 'assets/favicon-32.png', 'sitemap.xml', '404.html', ...sourceScripts, 'styles.css']) {
      const asset = await fetch(base + prefix + file);
      assert.equal(asset.status, 200);
      if (file.endsWith('.svg')) assert.equal(asset.headers.get('content-type'), 'image/svg+xml');
      if (file.endsWith('.jpg')) assert.equal(asset.headers.get('content-type'), 'image/jpeg');
    }
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('Back restores the clicked project or member card and the history entry scroll position', async () => {
  const { site } = await loadSite();
  const runtime = await readFile(resolve(root, 'site-runtime.js'), 'utf8');
  const enhancement = await readFile(resolve(root, 'app.js'), 'utf8');
  for (const item of [
    { className: 'project-card', id: 'project-card-canal-growth', from: '', to: 'projects/#canal-growth' },
    { className: 'person-card', id: 'member-li-zejian', from: 'people/', to: 'people/li-zejian/' },
  ]) {
    // A small event surface exercises the shipped script's click/pagehide/pageshow flow.
    // Real browser rendering, focus rings and scrolling are verified separately in the UI.
    const createPage = ({ state = null, back = false, y = 1014 } = {}) => {
      const documentEvents = {}, windowEvents = {};
      const location = new URL('http://127.0.0.1' + site.basePath + item.from);
      const body = { id: '', closest: () => null };
      let document;
      const card = {
        id: item.id,
        closest: selector => selector.split(',').map(value => value.trim()).includes('.' + item.className) ? card : null,
        hasAttribute: () => true,
        focus: () => { document.activeElement = card; },
      };
      document = {
        activeElement: body,
        getElementById: id => id === card.id ? card : null,
        querySelectorAll: () => [],
        addEventListener: (name, handler) => { documentEvents[name] = handler; },
      };
      const history = { state, replaceState: next => { history.state = next; } };
      const window = {
        scrollX: 0, scrollY: y,
        addEventListener: (name, handler) => { windowEvents[name] = handler; },
        scrollTo: ({ left = 0, top = 0 }) => { window.scrollX = left; window.scrollY = top; },
      };
      const context = vm.createContext({
        URL, URLSearchParams, location, document, history, window,
        performance: { getEntriesByType: () => [{ type: back ? 'back_forward' : 'navigate' }] },
        requestAnimationFrame: callback => callback(), matchMedia: () => ({ matches: true }),
      });
      vm.runInContext(runtime, context);
      vm.runInContext(enhancement, context);
      windowEvents.pageshow({ persisted: false });
      return { document, history, window, documentEvents, windowEvents, card };
    };
    const first = createPage();
    const link = {
      href: 'http://127.0.0.1' + site.basePath + item.to,
      dataset: {}, target: '', hasAttribute: () => false,
      closest: selector => first.card.closest(selector),
    };
    first.documentEvents.click({ button: 0, target: { closest: () => link } });
    first.windowEvents.pagehide();
    assert.equal(first.history.state.ganView.focusId, item.id);
    const restored = createPage({ state: first.history.state, back: true, y: 0 });
    assert.equal(restored.document.activeElement.id, item.id);
    assert.equal(restored.window.scrollY, 1014);
  }
});


test('all responsive candidates are checked, including missing files and wrong second-candidate base paths', async () => {
  const directory = await mkdtemp(resolve(tmpdir(), 'gan-responsive-check-'));
  const site = { origin: 'https://gan.example.edu', basePath: '/design/gan/' };
  const path = site.basePath;
  try {
    await mkdir(resolve(directory, 'assets'));
    await writeFile(resolve(directory, 'assets/first.webp'), 'fixture');
    await writeFile(resolve(directory, 'assets/second.webp'), 'fixture');
    const html = '<img src="/design/gan/assets/first.webp" srcset="/design/gan/assets/first.webp 640w, /design/gan/assets/second.webp 960w">';
    assert.equal(resourceURLs(html).length, 3);
    await checkLocalReferences(new Map([[path, html]]), { directory, site });
    await assert.rejects(checkLocalReferences(new Map([[path, html.replaceAll('second.webp', 'missing.webp')]]), { directory, site }), /ENOENT/);
    await assert.rejects(checkLocalReferences(new Map([[path, html.replace('/design/gan/assets/second.webp', '/assets/second.webp')]]), { directory, site }), /base path/);
    assert.throws(() => resourceURLs(html.replace('960w', 'invalid')), /responsive candidate/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
