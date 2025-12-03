import {createApp} from "vue";
import App from "../components/App";

export const initializeApp = () => {
    const app = createApp(App);
    app.mount('#app');
}