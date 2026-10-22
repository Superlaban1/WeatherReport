const CACHE_PREFIX = "weather-report-";
const STATIC_CACHE = `${CACHE_PREFIX}static-v6`;
const API_CACHE = `${CACHE_PREFIX}api-v1`;
const STATIC_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./assets/css/site.css",
    "./assets/js/site.js",
    "./assets/js/model/weatherModel.js",
    "./assets/js/view/weatherView.js",
    "./assets/js/controller/weatherController.js",
    "./assets/js/components/atoms/weatherDetails.js",
    "./assets/js/components/atoms/weatherIcon.js",
    "./assets/js/components/molecules/currentConditions.js",
    "./assets/js/components/molecules/dayCard.js",
    "./assets/js/components/molecules/hourCard.js",
    "./assets/js/components/organisms/appHeader.js",
    "./assets/js/components/organisms/currentWeatherSection.js",
    "./assets/js/components/organisms/viewTabs.js",
    "./assets/js/components/organisms/forecastSection.js",
    "./assets/js/components/organisms/hourlySection.js",
    "./assets/js/components/organisms/sourceFooter.js",
    "./assets/js/components/templates/weatherApp.js",
    "./assets/img/weather-icon.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => cache.addAll(STATIC_FILES))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys
                .filter((key) => key.startsWith(CACHE_PREFIX) && ![STATIC_CACHE, API_CACHE].includes(key))
                .map((key) => caches.delete(key))))
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.hostname === "api.open-meteo.com" || url.hostname === "geocoding-api.open-meteo.com") {
        event.respondWith(networkFirst(request));
    } else if (url.origin === self.location.origin) {
        event.respondWith(cacheFirst(request));
    }
});

async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;

    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
}

async function networkFirst(request) {
    const cache = await caches.open(API_CACHE);
    try {
        const response = await fetch(request);
        if (response.ok) {
            await cache.put(request, response.clone());
            return response;
        }
        return (await cache.match(request)) || response;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;
        throw error;
    }
}
