const CACHE_NAME = 'wellpass-v5';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './photo_profile_new.jpg',
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
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
