/* Raseekh theme: white (default) + soft classic. */
(function (global) {
  const KEY = 'raseekh_theme';
  const DEFAULT = 'white';

  function normalize(theme) {
    return theme === 'soft' ? 'soft' : 'white';
  }

  function get() {
    try { return normalize(localStorage.getItem(KEY) || DEFAULT); }
    catch (_) { return DEFAULT; }
  }

  function labelFor(theme, lang) {
    const isWhite = theme === 'white';
    if (lang === 'en') return isWhite ? 'Soft' : 'White';
    return isWhite ? 'ناعم' : 'أبيض';
  }

  function syncToggleButtons(theme) {
    const lang = (document.documentElement.lang === 'en') ? 'en' : 'ar';
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const isWhite = theme === 'white';
      btn.setAttribute('aria-pressed', isWhite ? 'true' : 'false');
      const ar = isWhite ? 'وضع ناعم' : 'وضع أبيض';
      const en = isWhite ? 'Soft mode' : 'White mode';
      btn.setAttribute('data-ar', ar);
      btn.setAttribute('data-en', en);
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
    if (meta) meta.setAttribute('content', next === 'white' ? '#ffffff' : '#E8EDF2');
    syncToggleButtons(next);
    try {
      document.dispatchEvent(new CustomEvent('raseekh:theme', { detail: { theme: next } }));
    } catch (_) {}
    return next;
  }

  function toggle() {
    return apply(get() === 'white' ? 'soft' : 'white');
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

  global.RaseekhTheme = { KEY: KEY, get: get, apply: apply, toggle: toggle, bind: bind };

  // Apply ASAP if DOM already has root.
  try { apply(get()); } catch (_) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(typeof window !== 'undefined' ? window : this);
