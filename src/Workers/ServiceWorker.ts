import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// @ts-ignore
declare const self: ServiceWorker;
// @ts-ignore
const componentName = 'Service Worker';

// TODO: Implement pre-cache config with version
// const SERVICE_WORKER_VERSION = '1.0.0';

const OccupantRegex = /\/users\/current\/occupants/;
const PropertyRegex = /\/users\/current\/properties/;
// const DirectoryPropertyOccupantsRegex = /\/users\/current\/properties/;
// const DirectoryPropertyContactsRegex = /\/users\/current\/properties/;

registerRoute(
    OccupantRegex,
    new CacheFirst({
        cacheName: 'occupant-cache',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 5 * 60,
            }),
        ],
    }),
);

registerRoute(
    PropertyRegex,
    new CacheFirst({
        cacheName: 'property-cache',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 5 * 60,
            }),
        ],
    }),
);

/* TODO: Property Occupants for Directory
registerRoute(
    DirectoryPropertyOccupantsRegex,
    new CacheFirst({
        cacheName: 'dir-property-occupants-cache',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 5 * 60
            })
        ]
    })
)
*/

/* TODO: Property Contacts for Directory
registerRoute(
    DirectoryPropertyContactsRegex,
    new CacheFirst({
        cacheName: 'dir-property-contacts-cache',
        plugins: [
            new ExpirationPlugin({
                maxAgeSeconds: 5 * 60
            })
        ]
    })
)
*/
