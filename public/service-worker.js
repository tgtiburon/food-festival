const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;




// We are not caching images because browsers have a 
// cache limit.  We prioritize js and html so at least the
// site is functional

const FILES_TO_CACHE = [
    // "./public/index.html",
    // "./public/events.html",
    // "./public/tickets.html",
    // "./public/schedule.html",
    // "./public/assets/css/style.css",
    // "./public/assets/css/bootstrap.css",
    // "./public/assets/css/tickets.css",
    // "./public/dist/app.bundle.js",
    // "./public/dist/events.bundle.js",
    // "./public/dist/tickets.bundle.js",
    // "./public/dist/schedule.bundle.js"
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
    
  ];


 








// We use self.add...  instead of window.addEventlistener because
// the service worker is installed before the window is even loaded.
self.addEventListener('install', function(e) {

    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE);
        })
    )

});

// keys() returns an array of all cache names 
// keyList is a parameter that stores all cache names under <username>.github.io 
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            // we filter out just this app from all of the github.io
            let cacheKeeplist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);
            // Returns a promise that resolves once old versions of the 
            // cache are deleted.
            return Promise.all(
                keyList.map(function(key,i) {
                    // Not in the keeplist so delete
                    if (cacheKeeplist.indexOf(key) === -1 ) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
});


self.addEventListener('fetch', function(e) {
    console.log('fetch request : ' + e.request.url) 
    e.respondWith(
        caches.match(e.request).then(function(request) {
            if(request) {// if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url) 
                return request;
            } else {
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request) ;
            }

            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request)
        })


    )
})
