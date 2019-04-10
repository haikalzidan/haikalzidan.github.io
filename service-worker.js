importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([{
    url: "/",
    revision: '2'
  },
  {
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: '/team.html',
    revision: '1'
  },
  {
    url: '/css/materialize.min.css',
    revision: '1'
  },
  {
    url: '/js/materialize.min.js',
    revision: '1'
  },
  {
    url: '/js/script.js',
    revision: '1'
  },
  {
    url: '/js/nav.js',
    revision: '1'
  },
  {
    url: "/js/idb.js",
    revision: '1'
  },
  {
    url: "/js/db.js",
    revision: '2'
  },
  {
    url: '/js/api.js',
    revision: '6'
  },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-api',
  })
);

// self.addEventListener("fetch", function (event) {
//   var base_url = "https://api.football-data.org/v2/";

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, {
//         ignoreSearch: true
//       }).then(function (response) {
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});