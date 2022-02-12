// We are not caching images because browsers have a 
// cache limit.  We prioritize js and html so at least the
// site is functional

const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./public/dist/app.bundle.js",
    "./public/dist/events.bundle.js",
    "./public/dist/tickets.bundle.js",
    "./public/dist/schedule.bundle.js"
  ];


  const APP_PREFIX = 'FoodFest-';
  const VERSION = ' version_01';
  const CACHE_NAME = APP_PREFIX + VERSION;











// We use self.add...  instead of window.addEventlistener because
// the service worker is installed before the window is even loaded.
self.addEventListener('install', function(e) {

    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )

})