/* Shared AR/EN toggle + legal foot for lightweight company pages. */
(function () {
  let currentLang = localStorage.getItem('raseekh_lang') || 'ar';
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'en' || q === 'ar') currentLang = q;

  function applyTextAttrs(lang) {
    document.querySelectorAll('[data-ar]').forEach((el) => {
      const v = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (v !== null) el.textContent = v;
    });
    document.querySelectorAll('[data-ar-html]').forEach((el) => {
      const v = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if (v !== null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-ar-placeholder]').forEach((el) => {
      const v = lang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
      if (v !== null) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-ar-aria]').forEach((el) => {
      const v = lang === 'ar' ? el.getAttribute('data-ar-aria') : el.getAttribute('data-en-aria');
      if (v !== null) el.setAttribute('aria-label', v);
    });
  }

  function ensureLegalFoot() {
    if (document.getElementById('raseekhLegalFoot')) return;
    const wrap = document.querySelector('.wrap');
    if (!wrap) return;
    const foot = document.createElement('nav');
    foot.id = 'raseekhLegalFoot';
    foot.className = 'page-legal-foot';
    foot.setAttribute('aria-label', 'Legal');
    foot.innerHTML = [
      '<a href="/privacy/" data-ar="الخصوصية" data-en="Privacy">الخصوصية</a>',
      '<a href="/terms/" data-ar="الشروط" data-en="Terms">الشروط</a>',
      '<a href="/security/" data-ar="الأمان" data-en="Security">الأمان</a>',
      '<a href="/help/" data-ar="المساعدة" data-en="Help">المساعدة</a>',
      '<a href="/" data-ar="الرئيسية" data-en="Home">الرئيسية</a>'
    ].join('<span aria-hidden="true">·</span>');
    wrap.appendChild(foot);
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('raseekh_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', lang === 'en');
    ensureLegalFoot();
    applyTextAttrs(lang);
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'AR';
    if (window.RaseekhTheme && RaseekhTheme.apply) RaseekhTheme.apply(RaseekhTheme.get());
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
      if (lang === 'en') canonical.setAttribute('href', base + (base.includes('?') ? '&' : '?') + 'lang=en');
      else canonical.setAttribute('href', base);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.RaseekhTheme && RaseekhTheme.bind) RaseekhTheme.bind();
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', () => applyLang(currentLang === 'ar' ? 'en' : 'ar'));
    applyLang(currentLang);
  });
})();
