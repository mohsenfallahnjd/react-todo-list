import { precacheAndRoute } from 'workbox-precaching';

declare let self: any;
self.addEventListener('message', (event: { data: { type: string; }; }) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
