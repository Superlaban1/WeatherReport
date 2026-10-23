let CACHE_PREFIX = "weather-report-";
let STATIC_CACHE = CACHE_PREFIX + "static-v8";
let API_CACHE = CACHE_PREFIX + "api-v1";
let STATIC_FILES = [
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
    "./assets/js/components/templates/weatherApp.js",
    "./assets/img/weather-icon.svg",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function (cache) {
                return cache.addAll(STATIC_FILES);
            })
            .then(function () {
                return self.skipWaiting();
            }),
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                let deletePromises = [];
                for (let index = 0; index < cacheNames.length; index++) {
                    let cacheName = cacheNames[index];
                    let isOldAppCache = cacheName.startsWith(CACHE_PREFIX)
                        && cacheName !== STATIC_CACHE
                        && cacheName !== API_CACHE;
                    if (isOldAppCache) {
                        deletePromises.push(caches.delete(cacheName));
                    }
                }
                return Promise.all(deletePromises);
            })
            .then(function () {
                return self.clients.claim();
            }),
    );
});

self.addEventListener("fetch", function (event) {
    let request = event.request;
    if (request.method !== "GET") {
        return;
    }

    let url = new URL(request.url);
    let isWeatherApi = url.hostname === "api.open-meteo.com";
    if (isWeatherApi) {
        event.respondWith(networkFirst(request));
    } else if (url.origin === self.location.origin) {
        event.respondWith(cacheFirst(request));
    }
});

function cacheFirst(request) {
    return caches.open(STATIC_CACHE)
        .then(function (cache) {
            return cache.match(request)
                .then(function (cachedResponse) {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then(function (response) {
                            if (response.ok) {
                                return cache.put(request, response.clone())
                                    .then(function () {
                                        return response;
                                    });
                            }
                            return response;
                        });
                });
        });
}

function networkFirst(request) {
    return caches.open(API_CACHE)
        .then(function (cache) {
            return fetch(request)
                .then(function (response) {
                    if (response.ok) {
                        return cache.put(request, response.clone())
                            .then(function () {
                                return response;
                            });
                    }
                    return cache.match(request)
                        .then(function (cachedResponse) {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            return response;
                        });
                })
                .catch(function (error) {
                    return cache.match(request)
                        .then(function (cachedResponse) {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            throw error;
                        });
                });
        });
}
