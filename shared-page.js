/* Shared AR/EN toggle for lightweight company pages. */
(function () {
  let currentLang = localStorage.getItem('raseekh_lang') || 'ar';
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'ar') currentLang = q;

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('raseekh_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.querySelectorAll('[data-ar]').forEach((el) => {
      const v = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (v !== null) el.textContent = v;
    });
    document.querySelectorAll('[data-ar-html]').forEach((el) => {
      const v = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if (v !== null) el.innerHTML = v;
    });
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'AR';
    const titleEl = document.querySelector('title');
    if (titleEl) {
      const ar = titleEl.getAttribute('data-ar');
      const en = titleEl.getAttribute('data-en');
      if (ar && en) titleEl.textContent = lang === 'ar' ? ar : en;
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const base = canonical.getAttribute('data-base') || canonical.getAttribute('href').split('?')[0];
      canonical.setAttribute('data-base', base);
      canonical.setAttribute('href', lang === 'en' ? base + (base.includes('?') ? '&' : '?') + 'lang=en' : base);
      if (lang === 'en' && !base.includes('?')) canonical.setAttribute('href', base + '?lang=en');
      if (lang === 'ar') canonical.setAttribute('href', base);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', () => applyLang(currentLang === 'ar' ? 'en' : 'ar'));
    applyLang(currentLang);
  });
})();
