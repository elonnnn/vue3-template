const CACHE_PREFIX = "hello-world";
const CACHE_VERSION = "v1.0.0";
const CACHE_NAME = CACHE_PREFIX + "-" + CACHE_VERSION;

const options = {
  timeout: 60,
  preloadQuantity: 8,
};

const route = self.__WB_MANIFEST.map((x) => x.url);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const length = Math.ceil(route.length / options.preloadQuantity);
      console.log(route.length);
      for (let i = 0; i < length; i++) {
        const routes = route.slice(
          i * options.preloadQuantity,
          (i + 1) * options.preloadQuantity
        );
        setTimeout(function () {
          console.log(3);
          cache.addAll(routes);
        }, i * 1000 * options.timeout);
      }
    })
  );
});

// 缓存更新
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response !== undefined) {
        return response;
      }
      return fetch(event.request)
        .then((response) => {
          const url = event.request.url;
          // console.log(url + 'response.request.url')
          if (!response || !route.includes(url)) {
            // console.log(url + 'request.url内部')
            return response;
          }
          let responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch((err) => {
          return err;
        });
    })
  );
});
