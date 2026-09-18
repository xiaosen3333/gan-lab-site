'use strict';

// The HTML already contains the complete page. JavaScript only enhances local controls.
const $ = id => document.getElementById(id);
const legacyTarget = legacyDestination(location);
if (legacyTarget) {
  location.replace(legacyTarget);
} else {
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false;

  function rememberView(focusId) {
    if (!ready) return;
    const activeCard = document.activeElement?.closest('.person-card, .project-card');
    const view = { x: window.scrollX, y: window.scrollY, focusId: focusId || activeCard?.id || history.state?.ganView?.focusId || null };
    history.replaceState({ ...history.state, ganView: view }, '', location.href);
  }

  function focusSection(id, { scroll = true, smooth = false } = {}) {
    const target = $(id);
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({ preventScroll: true });
    if (scroll) target.scrollIntoView({ block: 'start', behavior: smooth && !reducedMotion() ? 'smooth' : 'instant' });
  }

  function selectTab(selector, value, panelPrefix) {
    const tabs = [...document.querySelectorAll(selector)];
    if (!tabs.length) return;
    const list = tabs[0].parentElement;
    list.setAttribute('role', 'tablist');
    list.parentElement.classList.add('tabs-enhanced');
    for (const tab of tabs) {
      const id = tab.dataset.perspective;
      const panel = $(panelPrefix + id);
      const selected = id === String(value);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('aria-controls', panel.id);
      tab.tabIndex = selected ? 0 : -1;
      panel.setAttribute('role', 'tabpanel');
      panel.hidden = !selected;
    }
  }

  function enhanceTabs() {
    const perspective = location.hash.match(/^#perspective-panel-([012])$/)?.[1] || '0';
    selectTab('[data-perspective]', perspective, 'perspective-panel-');
  }

  function focusLocation() {
    const params = new URLSearchParams(location.search);
    const focus = params.get('focus');
    const hash = location.hash.slice(1);
    if (hash && !hash.startsWith('/')) focusSection(hash);
    else if (focus && members.some(member => member.id === focus)) focusSection('member-' + focus);
  }

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a');
    if (!link || link.target || link.hasAttribute('download')) return;
    if (link.dataset.perspective !== undefined) {
      event.preventDefault();
      // Keep the selected perspective in this entry's real fragment for Back/Forward.
      history.replaceState(history.state, '', link.href);
      selectTab('[data-perspective]', link.dataset.perspective, 'perspective-panel-');
      return;
    }
    const target = new URL(link.href);
    if (target.origin === location.origin && target.pathname === location.pathname && target.hash && target.search === location.search) {
      event.preventDefault();
      rememberView();
      history.pushState({}, '', target.href);
      focusSection(target.hash.slice(1), { smooth: true });
      return;
    }
    rememberView(link.closest('.person-card, .project-card')?.id);
  });

  document.addEventListener('keydown', event => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
    let index = tabs.indexOf(tab);
    if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = tabs.length - 1;
    else index = (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault();
    tabs[index].click();
    tabs[index].focus({ preventScroll: true });
  });

  window.addEventListener('hashchange', () => {
    const target = legacyDestination(location);
    if (target) location.replace(target);
    else { enhanceTabs(); focusLocation(); }
  });
  window.addEventListener('popstate', () => {
    enhanceTabs();
    if (history.state?.ganView) {
      const view = history.state.ganView;
      if (view.focusId) focusSection(view.focusId, { scroll: false });
      window.scrollTo({ left: view.x, top: view.y, behavior: 'instant' });
    } else focusLocation();
  });
  window.addEventListener('pagehide', () => rememberView());
  window.addEventListener('pageshow', event => {
    enhanceTabs();
    const isBack = event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
    const view = history.state?.ganView;
    requestAnimationFrame(() => {
      if (isBack && view) {
        if (view.focusId) focusSection(view.focusId, { scroll: false });
        window.scrollTo({ left: view.x, top: view.y, behavior: 'instant' });
      } else focusLocation();
      ready = true;
    });
  });
  history.scrollRestoration = 'manual';
  enhanceTabs();
}
