const CACHE_NAME = 'wellpass-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images/gymPhoto1.jpg',
  './images/gymPhoto2.jpg',
  './images/gymPhoto3.jpg',
  './images/gymPhoto4.jpg',
  './images/gymPhoto5.jpg',
  './images/cercles_forme.jpg',
  './images/club_republique.jpg',
  './images/profilePhoto.jpg',
  './images/wellpass.png',
  './images/map-preview.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
