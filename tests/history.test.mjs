import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { root } from '../scripts/build-site.mjs';

const runtime = await readFile(resolve(root, 'site-runtime.js'), 'utf8');
const enhancement = await readFile(resolve(root, 'app.js'), 'utf8');

// An event surface runs the actual delivered scripts. CUA independently covers layout,
// native focus/scroll, BFCache and interaction at real viewport sizes.
function createPage({ path = 'projects/#moran', state = null, navigation = 'navigate', persisted = false, deferFrames = false } = {}) {
  const location = new URL('http://127.0.0.1/gan-lab-site/' + path);
  const events = { document: {}, window: {} };
  const timers = new Map(), frames = [], writes = [], failures = new Set();
  let now = 0, timerId = 0;
  function checkWrite(method) {
    if (failures.delete(method) || writes.filter(write => now - write.time < 30000).length >= 100) {
      const error = new Error('History state quota exceeded');
      error.name = 'SecurityError';
      throw error;
    }
    writes.push({ method, time: now });
  }
  function advance(ms) {
    const target = now + ms;
    while (true) {
      const next = [...timers].filter(([, timer]) => timer.time <= target).sort((a, b) => a[1].time - b[1].time)[0];
      if (!next) break;
      const [id, timer] = next;
      timers.delete(id);
      now = timer.time;
      timer.callback();
    }
    now = target;
  }
  const elements = new Map();
  const links = [];
  const body = { id: '', closest: () => null };
  let document;
  const window = {
    scrollX: 0, scrollY: 0,
    addEventListener: (name, handler) => { events.window[name] = handler; },
    scrollTo: ({ left = 0, top = 0 }) => { window.scrollX = left; window.scrollY = top; },
  };
  function element(id, className = '', top = 0) {
    const item = {
      id, className, hasAttribute: () => false,
      closest: selector => selector.split(',').some(part => part.trim() === '.' + className) ? item : null,
      matches: selector => selector === '.' + className,
      focus: () => { document.activeElement = item; },
      scrollIntoView: () => { window.scrollY = top; },
    };
    elements.set(id, item);
    return item;
  }
  const moran = element('moran', 'portfolio-entry', 1694.5);
  const canal = element('canal-growth', 'portfolio-entry', 1053.5);
  moran.querySelector = () => element('moran-title');
  canal.querySelector = () => element('canal-growth-title');
  const project = element('project-card-moworld', 'project-card');
  const research = element('research-entry-disback', 'work-row');
  function link(href, container = null) {
    const item = {
      id: '', href: new URL(href, location).href, target: '', dataset: {},
      hasAttribute: () => false,
      closest: selector => container?.closest(selector) || null,
      focus: () => { document.activeElement = item; },
    };
    links.push(item);
    return item;
  }
  const projectLink = link('/gan-lab-site/projects/#moworld', project);
  const researchLink = link('/gan-lab-site/research/disback/', research);
  const aboutLink = link('/gan-lab-site/about/');
  const canalLink = link('/gan-lab-site/projects/#canal-growth');
  const creditLink = link('/gan-lab-site/people/li-zejian/');
  document = {
    activeElement: body,
    getElementById: id => elements.get(id) || links.find(link => link.id === id),
    querySelectorAll: selector => selector === 'a[href]' ? links : [],
    addEventListener: (name, handler) => { events.document[name] = handler; },
  };
  const stack = [{ url: location.href, state }];
  let index = 0;
  const history = {
    get state() { return stack[index].state; },
    replaceState(next, _, url) {
      checkWrite('replaceState');
      stack[index] = { state: next, url: url || location.href };
      if (url) location.href = url;
    },
    pushState(next, _, url) {
      checkWrite('pushState');
      stack.splice(index + 1);
      stack.push({ state: next, url });
      index++;
      location.href = url;
    },
  };
  const context = vm.createContext({
    URL, URLSearchParams, location, document, window, history,
    requestAnimationFrame: callback => deferFrames ? frames.push(callback) : callback(),
    setTimeout: (callback, delay) => { const id = ++timerId; timers.set(id, { callback, time: now + delay }); return id; },
    clearTimeout: id => timers.delete(id),
    performance: { getEntriesByType: () => [{ type: navigation }] },
    matchMedia: () => ({ matches: true }),
  });
  vm.runInContext(runtime, context);
  vm.runInContext(enhancement, context);
  events.window.pageshow({ persisted });
  return {
    location, document, window, history, events, writes,
    advance,
    failNext: method => failures.add(method),
    pendingTimers: () => [...timers.values()].map(timer => timer.callback),
    flushFrames: () => { while (frames.length) frames.shift()(); },
    projectLink, researchLink, aboutLink, canalLink, creditLink,
    scroll(y) { window.scrollY = y; events.window.scroll?.(); },
    click(link, extra = {}) {
      let prevented = false;
      events.document.click({ button: 0, target: { closest: () => link }, preventDefault: () => { prevented = true; }, ...extra });
      return prevented;
    },
    traverse(delta) {
      const oldURL = location.href;
      index += delta;
      location.href = stack[index].url;
      events.window.popstate();
      const restoredY = window.scrollY;
      if (oldURL !== location.href) events.window.hashchange({ oldURL, newURL: location.href });
      return restoredY;
    },
    enterHash(hash) {
      history.pushState(null, '', new URL(hash, location).href);
      events.window.hashchange();
    },
  };
}

test('same-document Back and Forward retain each entry reading position after hashchange', () => {
  const page = createPage();
  assert.equal(page.window.scrollY, 1694.5, 'fresh hash locates its article');
  page.scroll(3690.5);
  assert.equal(page.click(page.canalLink), true);
  assert.equal(page.window.scrollY, 1053.5);
  page.scroll(2222.5);
  assert.equal(page.traverse(-1), 3690.5);
  assert.equal(page.window.scrollY, 3690.5, 'following hashchange does not override popstate');
  assert.equal(page.document.activeElement.id, page.canalLink.id);
  assert.equal(page.traverse(1), 2222.5, 'Forward restores the later manual reading position');
  assert.equal(page.window.scrollY, 2222.5);
  page.traverse(-1);
  assert.equal(page.window.scrollY, 3690.5, 'repeated traversal remains stable');
});

test('reload restores saved reading with and without a fragment while fresh fragments still locate', () => {
  for (const path of ['projects/#moran', 'projects/']) {
    const initial = createPage({ path });
    initial.scroll(3690.5);
    initial.events.window.pagehide();
    const reload = createPage({ path, state: initial.history.state, navigation: 'reload' });
    assert.equal(reload.window.scrollY, 3690.5);
  }
  const direct = createPage();
  assert.equal(direct.window.scrollY, 1694.5);
  direct.enterHash('#canal-growth');
  assert.equal(direct.window.scrollY, 1053.5, 'address-bar fragment changes still navigate');
  direct.enterHash('#moran');
  assert.equal(direct.window.scrollY, 1694.5);
});

test('ordinary navigation records its actual trigger and never inherits an old card focus', () => {
  const state = { ganView: { x: 0, y: 1014, focusId: 'project-card-moworld' } };
  for (const persisted of [false, true]) {
    const page = createPage({ path: '', state, navigation: 'back_forward', persisted });
    assert.equal(page.document.activeElement.id, 'project-card-moworld');
    page.scroll(1800);
    page.click(page.aboutLink);
    page.events.window.pagehide();
    assert.equal(page.history.state.ganView.focusId, page.aboutLink.id);
    assert.equal(page.history.state.ganView.focusHref, page.aboutLink.href);
    const back = createPage({ path: '', state: page.history.state, navigation: 'back_forward', persisted });
    assert.equal(back.document.activeElement.id, back.aboutLink.id);
    assert.equal(back.window.scrollY, 1800);
    // A trigger without a stable identity explicitly clears the previous focus.
    page.click({ href: page.aboutLink.href, hasAttribute: () => false, closest: () => null });
    assert.equal(page.history.state.ganView.focusId, null);
  }
});

test('research entries and project credits restore focus on fresh and cached returns', () => {
  for (const persisted of [false, true]) for (const kind of ['researchLink', 'creditLink']) {
    const path = kind === 'researchLink' ? 'research/' : 'projects/';
    const page = createPage({ path });
    page.scroll(1014);
    page.click(page[kind]);
    page.events.window.pagehide();
    const back = createPage({ path, state: page.history.state, navigation: 'back_forward', persisted });
    assert.equal(back.window.scrollY, 1014);
    assert.equal(back.document.activeElement.id, kind === 'researchLink' ? 'research-entry-disback' : back.creditLink.id);
  }
});

test('modified clicks, downloads and external target links keep native behavior', () => {
  for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) {
    const page = createPage({ path: '' });
    const unchanged = page.history.state;
    assert.equal(page.click(page.projectLink, { [modifier]: true }), false);
    assert.equal(page.history.state, unchanged);
  }
  const page = createPage({ path: '' });
  const unchanged = page.history.state;
  page.projectLink.target = '_blank';
  assert.equal(page.click(page.projectLink), false);
  assert.equal(page.history.state, unchanged);
  page.projectLink.target = '';
  page.projectLink.hasAttribute = name => name === 'download';
  assert.equal(page.click(page.projectLink), false);
  assert.equal(page.history.state, unchanged);
});


test('continuous scrolling stays below Safari history quota and departure immediately flushes the latest view', () => {
  const page = createPage();
  for (let frame = 1; frame <= 2400; frame++) {
    page.scroll(frame + 0.5);
    page.advance(1000 / 60);
  }
  assert.ok(page.writes.length < 60, '40 seconds of 60 Hz scrolling writes roughly once per 750 ms');
  assert.equal(page.history.scrollRestoration, 'manual', 'quota fallback was not needed');
  page.scroll(5000.5);
  page.click(page.aboutLink);
  assert.equal(page.history.state.ganView.y, 5000.5, 'click flushes without waiting for the throttle');
  page.scroll(5100.5);
  page.events.window.pagehide();
  assert.equal(page.history.state.ganView.y, 5100.5, 'pagehide flushes the exact final view');
});

test('pending persistence never crosses history entries and Forward uses the latest in-memory view', () => {
  const page = createPage({ deferFrames: true });
  page.flushFrames();
  page.scroll(3690.5);
  page.click(page.canalLink);
  page.scroll(2222.5);
  const staleTimers = page.pendingTimers();
  assert.equal(page.traverse(-1), 3690.5, 'Back before the 750 ms write');
  staleTimers.forEach(callback => callback());
  assert.equal(page.history.state.ganView.y, 3690.5, 'a delayed outgoing callback cannot overwrite the restored entry');
  assert.equal(page.traverse(1), 2222.5, 'unflushed Forward entry is recovered from memory');
  page.advance(1500);
  assert.equal(page.history.state.ganView.y, 2222.5);
});

test('History API failures keep the native same-page and cross-page link actions available', () => {
  for (const method of ['replaceState', 'pushState']) {
    const page = createPage();
    const before = page.location.href;
    page.failNext(method);
    assert.equal(page.click(page.canalLink), false, method + ' failure must not preventDefault');
    assert.equal(page.location.href, before, 'the browser remains free to follow the anchor natively');
    assert.equal(page.history.scrollRestoration, 'auto');
    assert.equal(page.click(page.aboutLink), false, 'ordinary navigation remains native');
    assert.doesNotThrow(() => { page.scroll(2100); page.advance(1500); page.events.window.pagehide(); });
  }
});


test('a delayed pageshow frame cannot override a newer fragment navigation', () => {
  const page = createPage({ deferFrames: true });
  page.enterHash('#canal-growth');
  page.scroll(1300.5);
  page.flushFrames();
  assert.equal(page.window.scrollY, 1300.5);
  page.events.window.pagehide();
  assert.equal(page.history.state.ganView.y, 1300.5);
});
