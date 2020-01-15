self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('restaurant-reviews-v6').then((cache) => {
            fetch('data/restaurants.json')
            .then(data => data.json())
            .then((json) => {
                for (restaurant of json.restaurants) {
                    cache.add(`/restaurant.html?id=${restaurant.id}`);
                    cache.add(`/img/${restaurant.id}.jpg`);
                }
            }).catch((err) => { console.error(err); });

            return cache.addAll([
                '/',
                '/restaurant.html',
                '/data/restaurants.json',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
            ]);
        }).catch((err) => { console.error(err); })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((res) => {
            if (res) return res;
            return fetch(event.request);
        })
    );
});

