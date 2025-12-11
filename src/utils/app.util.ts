import {createApp} from "vue";
import App from "../components/App.vue";
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const initializeApp = () => {
    initializeServiceWorker();

    const vuetify = createVuetify();

    createApp(App).use(vuetify).mount('#app')
}

const initializeServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
}