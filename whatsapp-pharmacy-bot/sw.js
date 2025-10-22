// Service Worker for WhatsApp Pharmacy Bot
const CACHE_NAME = 'whatsapp-pharmacy-v1';
const urlsToCache = [
    '/whatsapp-pharmacy-bot/',
    '/whatsapp-pharmacy-bot/index.html',
    '/whatsapp-pharmacy-bot/css/whatsapp-style.css',
    '/whatsapp-pharmacy-bot/js/whatsapp-app.js',
    '/whatsapp-pharmacy-bot/js/whatsapp-chatbot.js',
    '/whatsapp-pharmacy-bot/js/whatsapp-cart.js',
    '/whatsapp-pharmacy-bot/js/whatsapp-products.js',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            }
        )
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});