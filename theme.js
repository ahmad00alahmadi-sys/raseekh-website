/* Raseekh theme: soft (default) + off — no sun/moon labels. */
(function (global) {
  const KEY = 'raseekh_theme';
  const DEFAULT = 'soft';

  function normalize(theme) {
    if (theme === 'off' || theme === 'base' || theme === 'white' || theme === 'sun') return 'off';
    // soft / moon / anything else → soft
    return 'soft';
  }

  function get() {
    try {
      const q = new URLSearchParams(location.search).get('theme');
      if (q === 'off' || q === 'soft' || q === 'base' || q === 'white') return normalize(q);
    } catch (_) {}
    try { return normalize(localStorage.getItem(KEY) || DEFAULT); }
    catch (_) { return DEFAULT; }
  }

  function labels(lang) {
    if (lang === 'en') return { soft: 'Soft', off: 'Off' };
    return { soft: 'ناعم', off: 'إيقاف' };
  }

  function ariaFor(value, lang) {
    if (lang === 'en') {
      return value === 'soft' ? 'Soft look' : 'Off mode';
    }
    return value === 'soft' ? 'المظهر الناعم' : 'وضع الإيقاف';
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
        labelEl.textContent = L[value];
        labelEl.setAttribute('data-ar', labels('ar')[value]);
        labelEl.setAttribute('data-en', labels('en')[value]);
      } else if (!btn.querySelector('svg, .theme-ico')) {
        btn.textContent = L[value];
      }
      const ar = ariaFor(value, 'ar');
      const en = ariaFor(value, 'en');
      btn.setAttribute('data-ar-aria', ar);
      btn.setAttribute('data-en-aria', en);
      btn.setAttribute('aria-label', lang === 'en' ? en : ar);
      btn.title = lang === 'en' ? en : ar;
    });
    document.querySelectorAll('.theme-switch').forEach((el) => {
      const ar = 'ناعم أو إيقاف';
      const en = 'Soft or Off';
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
    if (meta) meta.setAttribute('content', next === 'soft' ? '#E8EDF2' : '#ffffff');
    syncControls(next);
    try {
      document.dispatchEvent(new CustomEvent('raseekh:theme', { detail: { theme: next } }));
    } catch (_) {}
    return next;
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
    apply(get());
  }

  global.RaseekhTheme = { KEY: KEY, get: get, apply: apply, bind: bind, themes: ['soft', 'off'] };

  try { apply(get()); } catch (_) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(typeof window !== 'undefined' ? window : this);
