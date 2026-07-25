/* Raseekh theme: base (default) + soft — segmented choice beside language. */
(function (global) {
  const KEY = 'raseekh_theme';
  const DEFAULT = 'base';
  const THEMES = ['base', 'soft'];

  function normalize(theme) {
    if (theme === 'soft') return 'soft';
    // night/dark/white/light → base (drop night as a client option)
    return 'base';
  }

  function get() {
    try {
      const q = new URLSearchParams(location.search).get('theme');
      if (q === 'soft' || q === 'base' || q === 'white' || q === 'light') return normalize(q);
    } catch (_) {}
    try { return normalize(localStorage.getItem(KEY) || DEFAULT); }
    catch (_) { return DEFAULT; }
  }

  function labels(lang) {
    if (lang === 'en') return { base: 'Base', soft: 'Soft' };
    return { base: 'أساسي', soft: 'ناعم' };
  }

  function syncControls(theme) {
    const lang = (document.documentElement.lang === 'en') ? 'en' : 'ar';
    const L = labels(lang);

    document.querySelectorAll('[data-theme-set]').forEach((btn) => {
      const value = normalize(btn.getAttribute('data-theme-set'));
      const on = value === theme;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
      btn.textContent = L[value] || value;
      btn.setAttribute('data-ar', labels('ar')[value]);
      btn.setAttribute('data-en', labels('en')[value]);
      const arAria = value === 'base' ? 'المظهر الأساسي' : 'المظهر الناعم';
      const enAria = value === 'base' ? 'Base look' : 'Soft look';
      btn.setAttribute('data-ar-aria', arAria);
      btn.setAttribute('data-en-aria', enAria);
      btn.setAttribute('aria-label', lang === 'en' ? enAria : arAria);
      btn.title = lang === 'en' ? enAria : arAria;
    });

    // Legacy single toggle buttons (if any remain)
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const toSoft = theme === 'base';
      btn.setAttribute('aria-pressed', theme === 'base' ? 'true' : 'false');
      btn.textContent = toSoft ? L.soft : L.base;
      btn.setAttribute('data-ar', toSoft ? labels('ar').soft : labels('ar').base);
      btn.setAttribute('data-en', toSoft ? labels('en').soft : labels('en').base);
      const ar = toSoft ? 'تفعيل المظهر الناعم' : 'تفعيل المظهر الأساسي';
      const en = toSoft ? 'Switch to soft look' : 'Switch to base look';
      btn.setAttribute('aria-label', lang === 'en' ? en : ar);
      btn.title = lang === 'en' ? en : ar;
    });
  }

  function apply(theme) {
    const next = normalize(theme);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'base' ? '#ffffff' : '#E8EDF2');
    syncControls(next);
    try {
      document.dispatchEvent(new CustomEvent('raseekh:theme', { detail: { theme: next } }));
    } catch (_) {}
    return next;
  }

  function toggle() {
    return apply(get() === 'base' ? 'soft' : 'base');
  }

  function bind() {
    document.querySelectorAll('[data-theme-set]').forEach((btn) => {
      if (btn.dataset.themeBound === '1') return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        apply(btn.getAttribute('data-theme-set'));
      });
    });
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
    themes: THEMES
  };

  try { apply(get()); } catch (_) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(typeof window !== 'undefined' ? window : this);
