/* Raseekh theme: soft ↔ night via one icon button (no visible labels). */
(function (global) {
  const KEY = 'raseekh_theme';
  const DEFAULT = 'soft';

  const ICO = {
    // Shown while in soft → tap goes to night
    night: '<svg class="theme-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.6 3.2a8.8 8.8 0 1 0 6.2 14.7A7.2 7.2 0 0 1 14.6 3.2z"/></svg>',
    // Shown while in night → tap goes to soft
    soft: '<svg class="theme-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"/></g></svg>'
  };

  function normalize(theme) {
    if (theme === 'night' || theme === 'dark') return 'night';
    // soft / off / base / white / moon leftovers → soft
    return 'soft';
  }

  function get() {
    try {
      const q = new URLSearchParams(location.search).get('theme');
      if (q === 'night' || q === 'dark' || q === 'soft' || q === 'off' || q === 'base') return normalize(q);
    } catch (_) {}
    try { return normalize(localStorage.getItem(KEY) || DEFAULT); }
    catch (_) { return DEFAULT; }
  }

  function ariaFor(theme, lang) {
    // Describe the action (what clicking will do)
    const toNight = theme === 'soft';
    if (lang === 'en') return toNight ? 'Switch look' : 'Switch look';
    return 'تبديل المظهر';
  }

  function syncControls(theme) {
    const lang = (document.documentElement.lang === 'en') ? 'en' : 'ar';
    const nextIcon = theme === 'soft' ? 'night' : 'soft';
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', theme === 'night' ? 'true' : 'false');
      btn.dataset.theme = theme;
      btn.innerHTML = ICO[nextIcon];
      const aria = ariaFor(theme, lang);
      btn.setAttribute('aria-label', aria);
      btn.setAttribute('title', aria);
      btn.setAttribute('data-ar-aria', 'تبديل المظهر');
      btn.setAttribute('data-en-aria', 'Switch look');
    });
    // Remove any leftover dual switch UI
    document.querySelectorAll('.theme-switch').forEach((el) => el.remove());
  }

  function apply(theme) {
    const next = normalize(theme);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'soft' ? '#E8EDF2' : '#0B1219');
    syncControls(next);
    try {
      document.dispatchEvent(new CustomEvent('raseekh:theme', { detail: { theme: next } }));
    } catch (_) {}
    return next;
  }

  function toggle() {
    return apply(get() === 'soft' ? 'night' : 'soft');
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
    themes: ['soft', 'night']
  };

  try { apply(get()); } catch (_) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(typeof window !== 'undefined' ? window : this);
