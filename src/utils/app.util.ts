import {createApp} from "vue";
import App from "../components/App.vue";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export const initializeApp = () => {

    const vuetify = createVuetify({
        components,
        directives,
    })

    createApp(App).use(vuetify).mount('#app')
}