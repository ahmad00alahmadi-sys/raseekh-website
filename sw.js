/* Lightweight offline shell for Raseekh marketing site */
const CACHE = 'raseekh-shell-v61';
const ASSETS = [
  '/', '/index.html', '/catalog.js', '/auth.js', '/terms.js', '/activity.js', '/shared-page.css', '/shared-page.js',
  '/terms/', '/terms/index.html', '/privacy/', '/privacy/index.html',
  '/blog/', '/blog/index.html', '/blog/inventory-system.html', '/blog/custom-vs-ready.html', '/blog/ops-system-checklist.html',
  '/blog/hosting-pdpl.html', '/blog/quote-process.html', '/blog/ops-habits.html', '/blog/digital-ops-help.html', '/blog/tools-review.html',
  '/industries/', '/industries/index.html', '/industries/retail.html', '/industries/clinic.html', '/industries/restaurant.html', '/industries/contracting.html',
  '/industries/pharmacy.html', '/industries/warehouse.html', '/industries/supermarket.html', '/industries/accounting.html', '/industries/companies.html',
  '/features/', '/features/index.html', '/features/inventory.html', '/features/sales.html', '/features/reports.html', '/features/customers.html', '/features/roles.html',
  '/help/', '/help/index.html', '/security/', '/security/index.html', '/updates/', '/updates/index.html', '/404.html',
  '/dashboard/', '/dashboard/index.html', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png', '/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

function isNavigate(req) {
  return req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
}

function isShellScript(url) {
  return /\/(catalog|auth|terms|activity|shared-page)\.js$/.test(url.pathname) || /\/shared-page\.css$/.test(url.pathname);
}

function offlineShellFor(url) {
  const path = (url && url.pathname) || '/';
  if (path.indexOf('/dashboard') === 0) return '/dashboard/index.html';
  if (path.indexOf('/terms') === 0) return '/terms/index.html';
  if (path.indexOf('/privacy') === 0) return '/privacy/index.html';
  if (path.indexOf('/blog') === 0) return '/blog/index.html';
  if (path.indexOf('/industries') === 0) return '/industries/index.html';
  if (path.indexOf('/features') === 0) return '/features/index.html';
  if (path.indexOf('/help') === 0) return '/help/index.html';
  if (path.indexOf('/security') === 0) return '/security/index.html';
  if (path.indexOf('/updates') === 0) return '/updates/index.html';
  return '/index.html';
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML + core JS: network-first so deploys are not stuck on stale cache
  if (isNavigate(req) || isShellScript(url)) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        if (res.ok) caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((cached) => cached || caches.match(offlineShellFor(url)) || caches.match('/404.html')))
    );
    return;
  }

  // Other same-origin assets: stale-while-revalidate
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        const copy = res.clone();
        if (res.ok) caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
