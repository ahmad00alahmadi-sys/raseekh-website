/* Lightweight offline shell for Raseekh marketing site */
const CACHE = 'raseekh-shell-v6';
const ASSETS = ['/', '/index.html', '/catalog.js', '/auth.js', '/terms.js', '/activity.js', '/terms/', '/terms/index.html', '/dashboard/', '/dashboard/index.html', '/manifest.webmanifest', '/icon.svg'];

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
  return /\/(catalog|auth|terms|activity)\.js$/.test(url.pathname);
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
      }).catch(() => caches.match(req).then((cached) => cached || caches.match('/index.html')))
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
