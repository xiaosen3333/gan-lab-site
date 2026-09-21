'use strict';

// Complete content and real links already exist in HTML. Only navigation is enhanced.
const $ = id => document.getElementById(id);
const legacyTarget = legacyDestination(location);
if (legacyTarget) {
  location.replace(legacyTarget);
} else {
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const returnContainers = '.person-card, .project-card, .work-row';
  let ready = false;
  let handledURL = location.href;
  let departureFocus;
  const views = new Map();
  const documentKey = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  let entrySequence = 0;
  const newEntryKey = () => documentKey + '-' + ++entrySequence;
  let currentEntry = history.state?.ganEntry || newEntryKey();
  let persistTimer = null;
  let historyWritable = true;

  // Stable within each static document, including ordinary navigation and credit links.
  document.querySelectorAll('a[href]').forEach((link, index) => {
    if (!link.id) link.id = 'return-link-' + index;
  });

  function focusIdentity(element) {
    const container = element?.closest(returnContainers);
    const target = container || element;
    return target?.id ? { focusId: target.id, focusHref: target.href || null } : { focusId: null, focusHref: null };
  }

  function cancelPersistence() {
    if (persistTimer !== null) clearTimeout(persistTimer);
    persistTimer = null;
  }

  function writeHistory(method, state, url = location.href) {
    if (!historyWritable) return false;
    try {
      history[method](state, '', url);
      return true;
    } catch {
      // A quota or browser policy must never make ordinary links unusable.
      historyWritable = false;
      cancelPersistence();
      history.scrollRestoration = 'auto';
      return false;
    }
  }

  function persistView() {
    cancelPersistence();
    const view = views.get(currentEntry);
    return view && writeHistory('replaceState', { ...history.state, ganEntry: currentEntry, ganView: view });
  }

  function rememberView(identity = focusIdentity(document.activeElement), { persist = true } = {}) {
    if (!ready) return false;
    // Keep every scroll immediately, without issuing one History API write per frame.
    views.set(currentEntry, { x: window.scrollX, y: window.scrollY, ...identity });
    if (persist) return persistView();
    if (historyWritable && persistTimer === null) {
      const entry = currentEntry;
      const timer = setTimeout(() => {
        if (persistTimer !== timer) return;
        persistTimer = null;
        if (entry === currentEntry) persistView();
      }, 750);
      persistTimer = timer;
    }
    return true;
  }

  function focusSection(id, { scroll = true, smooth = false } = {}) {
    const target = $(id);
    if (!target) return;
    // A long portfolio article should not receive a page-sized outline.
    const focusTarget = target.matches?.('.portfolio-entry') ? target.querySelector('h2') : target;
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.tabIndex = -1;
    focusTarget.focus({ preventScroll: true });
    if (scroll) target.scrollIntoView({ block: 'start', behavior: smooth && !reducedMotion() ? 'smooth' : 'instant' });
  }

  function focusLocation() {
    const focus = new URLSearchParams(location.search).get('focus');
    let hash = location.hash.slice(1);
    try { hash = decodeURIComponent(hash); } catch { /* Invalid fragments have no matching target. */ }
    if (hash && !hash.startsWith('/')) focusSection(hash);
    else if (focus && members.some(member => member.id === focus)) focusSection('member-' + focus);
  }

  function restoreView(view) {
    const target = view.focusId && $(view.focusId);
    if (target && (!view.focusHref || target.href === view.focusHref)) focusSection(view.focusId, { scroll: false });
    window.scrollTo({ left: view.x, top: view.y, behavior: 'instant' });
  }

  function visitCurrentEntry() {
    cancelPersistence();
    departureFocus = undefined;
    currentEntry = history.state?.ganEntry || newEntryKey();
    const view = views.get(currentEntry) || history.state?.ganView;
    if (view) restoreView(view);
    else focusLocation();
    handledURL = location.href;
    ready = true;
    rememberView();
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a');
    if (!link || link.target || link.hasAttribute('download')) return;
    const target = new URL(link.href);
    const identity = focusIdentity(link);
    if (target.origin === location.origin && target.pathname === location.pathname && target.hash && target.search === location.search) {
      // Prevent native navigation only after both required writes succeed.
      if (!rememberView(identity)) return;
      if (target.href !== location.href) {
        const entry = newEntryKey();
        if (!writeHistory('pushState', { ganEntry: entry }, target.href)) return;
        currentEntry = entry;
      }
      event.preventDefault();
      departureFocus = undefined;
      handledURL = location.href;
      focusSection(target.hash.slice(1), { smooth: true });
      // Further scrolling updates this new entry, including before same-document traversal.
      rememberView(undefined, { persist: false });
      return;
    }
    departureFocus = identity;
    rememberView(identity);
  });

  window.addEventListener('scroll', () => {
    if (ready) rememberView(departureFocus, { persist: false });
  }, { passive: true });

  window.addEventListener('hashchange', () => {
    const target = legacyDestination(location);
    if (target) location.replace(target);
    // popstate already restored this entry. Its following hashchange must not undo it.
    else if (handledURL !== location.href) visitCurrentEntry();
  });
  window.addEventListener('popstate', visitCurrentEntry);
  window.addEventListener('pagehide', () => {
    rememberView(departureFocus);
    cancelPersistence();
  });
  window.addEventListener('pageshow', event => {
    const navigation = performance.getEntriesByType('navigation')[0]?.type;
    const shouldRestore = event.persisted || navigation === 'back_forward' || navigation === 'reload';
    const entryURL = location.href;
    const entryState = history.state?.ganEntry;
    ready = false;
    departureFocus = undefined;
    cancelPersistence();
    requestAnimationFrame(() => {
      // Ignore a delayed initial frame if another navigation has already won.
      if (location.href !== entryURL || history.state?.ganEntry !== entryState) return;
      currentEntry = history.state?.ganEntry || newEntryKey();
      const view = views.get(currentEntry) || history.state?.ganView;
      if (shouldRestore && view) restoreView(view);
      else focusLocation();
      handledURL = location.href;
      ready = true;
      rememberView();
    });
  });
  history.scrollRestoration = 'manual';
}
