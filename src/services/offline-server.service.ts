import {registerRoute} from 'workbox-routing';

// sollte funktionieren, aber aus irgend einem Grund tut es das nicht
export const registerHtmlInterceptor = () => {
    console.log('registerHtmlInterceptor');
    registerRoute(
        ({url, request}) =>
            request.method === 'GET' &&
            url.pathname === '/',
        async () => {
            try {
                console.log("Html intercepted. Serving offline page.");
                return await fetch('/api/state');
            } catch (error) {
                console.error("Failed to fetch offline page", error);
                return new Response('Offline page not available', {status: 503});
            }
        }
    );
}