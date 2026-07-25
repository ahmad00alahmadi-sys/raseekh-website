/* Raseekh theme: base (شمس) + soft (قمر) — creative labels beside language. */
(function (global) {
  const KEY = 'raseekh_theme';
  const DEFAULT = 'base';
  const THEMES = ['base', 'soft'];

  function normalize(theme) {
    if (theme === 'soft' || theme === 'moon') return 'soft';
    // sun / white / light / night leftovers → base
    return 'base';
  }

  function get() {
    try {
      const q = new URLSearchParams(location.search).get('theme');
      if (q === 'soft' || q === 'moon' || q === 'base' || q === 'sun' || q === 'white' || q === 'light') {
        return normalize(q);
      }
    } catch (_) {}
    try { return normalize(localStorage.getItem(KEY) || DEFAULT); }
    catch (_) { return DEFAULT; }
  }

  function labels(lang) {
    if (lang === 'en') return { base: 'Sun', soft: 'Moon' };
    return { base: 'شمس', soft: 'قمر' };
  }

  function ariaFor(value, lang) {
    if (lang === 'en') {
      return value === 'base' ? 'Sun look — bright white' : 'Moon look — soft mist';
    }
    return value === 'base' ? 'مظهر الشمس — أبيض ساطع' : 'مظهر القمر — رمادي ناعم';
  }

  function syncControls(theme) {
    const lang = (document.documentElement.lang === 'en') ? 'en' : 'ar';
    const L = labels(lang);

    document.querySelectorAll('[data-theme-set]').forEach((btn) => {
      const value = normalize(btn.getAttribute('data-theme-set'));
      const on = value === theme;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
      const labelEl = btn.querySelector('[data-theme-label]');
      if (labelEl) {
        labelEl.textContent = L[value] || value;
        labelEl.setAttribute('data-ar', labels('ar')[value]);
        labelEl.setAttribute('data-en', labels('en')[value]);
      } else {
        // Keep icon nodes; only refresh if button is text-only.
        if (!btn.querySelector('svg, .theme-ico')) {
          btn.textContent = L[value] || value;
        }
      }
      const ar = ariaFor(value, 'ar');
      const en = ariaFor(value, 'en');
      btn.setAttribute('data-ar-aria', ar);
      btn.setAttribute('data-en-aria', en);
      btn.setAttribute('aria-label', lang === 'en' ? en : ar);
      btn.title = lang === 'en' ? en : ar;
    });

    document.querySelectorAll('.theme-switch').forEach((el) => {
      const ar = 'الشمس أو القمر';
      const en = 'Sun or Moon look';
      el.setAttribute('data-ar-aria', ar);
      el.setAttribute('data-en-aria', en);
      el.setAttribute('aria-label', lang === 'en' ? en : ar);
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
