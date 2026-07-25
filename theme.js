/* Raseekh theme: base (default) + night — client chooses. */
(function (global) {
  const KEY = 'raseekh_theme';
  const DEFAULT = 'base';

  function normalize(theme) {
    if (theme === 'night' || theme === 'dark') return 'night';
    // white / soft / light / anything else → base
    return 'base';
  }

  function get() {
    try {
      const q = new URLSearchParams(location.search).get('theme');
      if (q === 'night' || q === 'dark' || q === 'base' || q === 'light' || q === 'white') {
        return normalize(q);
      }
    } catch (_) {}
    try { return normalize(localStorage.getItem(KEY) || DEFAULT); }
    catch (_) { return DEFAULT; }
  }

  function labelFor(theme, lang) {
    // Button shows the mode you can switch TO
    const toNight = theme === 'base';
    if (lang === 'en') return toNight ? 'Night' : 'Base';
    return toNight ? 'ليلي' : 'أساسي';
  }

  function syncToggleButtons(theme) {
    const lang = (document.documentElement.lang === 'en') ? 'en' : 'ar';
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const isBase = theme === 'base';
      btn.setAttribute('aria-pressed', isBase ? 'true' : 'false');
      const ar = isBase ? 'تفعيل النظام الليلي' : 'تفعيل النظام الأساسي';
      const en = isBase ? 'Switch to night mode' : 'Switch to base mode';
      btn.setAttribute('data-ar', labelFor(theme, 'ar'));
      btn.setAttribute('data-en', labelFor(theme, 'en'));
      btn.setAttribute('data-ar-aria', ar);
      btn.setAttribute('data-en-aria', en);
      btn.setAttribute('aria-label', lang === 'en' ? en : ar);
      btn.textContent = labelFor(theme, lang);
      btn.title = lang === 'en' ? en : ar;
    });
  }

  function apply(theme) {
    const next = normalize(theme);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'base' ? '#ffffff' : '#0B1219');
    syncToggleButtons(next);
    try {
      document.dispatchEvent(new CustomEvent('raseekh:theme', { detail: { theme: next } }));
    } catch (_) {}
    return next;
  }

  function toggle() {
    return apply(get() === 'base' ? 'night' : 'base');
  }

  function bind() {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      if (btn.dataset.themeBound === '1') return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
    });
    apply(get());
  }

  global.RaseekhTheme = {
    KEY: KEY,
    get: get,
    apply: apply,
    toggle: toggle,
    bind: bind,
    themes: ['base', 'night']
  };

  try { apply(get()); } catch (_) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(typeof window !== 'undefined' ? window : this);
