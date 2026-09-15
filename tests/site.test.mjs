import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { generate, root, loadSite, sourceScripts } from '../scripts/build-site.mjs';
import { checkSite } from '../scripts/check-site.mjs';
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

  } finally { await rm(temporary, { recursive: true, force: true }); }
});

test('legacy routes preserve members, thin identities, intents, filters and query location', async () => {
  const { legacyDestination: resolveLegacy, site } = await loadSite();
  const base = site.basePath;
  const cases = [
    ['#/people/li-zejian', '/gan-lab-site/people/li-zejian/'],
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
    for (const path of ['/gan-lab-site/not-found/', '/gan-lab-site/people/zhang-jiahui/', '/gan-lab-site/research/unknown/']) {
      const response = await fetch(base + path.replace('/gan-lab-site/', prefix));
      assert.equal(response.status, 404);
      const html = await response.text();
      assert.match(html, /noindex,follow/);
      assert.doesNotMatch(html, /http-equiv="refresh"/);
    }
    const redirect = await fetch(base + prefix + 'research?test=1', { redirect: 'manual' });
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.get('location'), prefix + 'research/?test=1');
    for (const file of ['assets/culture-computation-concept.webp', 'assets/contact-channel.png', 'sitemap.xml', '404.html', ...sourceScripts, 'styles.css']) {
      assert.equal((await fetch(base + prefix + file)).status, 200);
    }
  } finally { await new Promise(resolve => server.close(resolve)); }
});
