const CACHE = 'portfolio-v1'
const PRECACHE = [
  '/',
  '/index.html',
  '/img/barz.jpeg',
]

// Install: pre-cache assets utama
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

// Activate: hapus cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// Fetch: cache-first untuk aset statis, network-first untuk navigasi
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)

  // Skip non-GET dan cross-origin
  if (e.request.method !== 'GET') return
  if (url.origin !== location.origin && !url.hostname.includes('fonts.googleapis') && !url.hostname.includes('fonts.gstatic')) return

  // Navigasi → network-first
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/index.html'))
    )
    return
  }

  // Aset statis (js, css, img, font) → cache-first
  if (/\.(js|css|png|jpg|jpeg|webp|svg|woff2?|ttf)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached
        return fetch(e.request).then(res => {
          const clone = res.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone))
          return res
        })
      })
    )
    return
  }
})
