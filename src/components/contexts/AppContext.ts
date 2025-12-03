import {provideAppContext} from "../../contexts/app.context";
import {onMounted} from "vue";

export default {
    setup() {
        const {
            refreshState,
        } = provideAppContext();

        onMounted(refreshState);
    },
    template: `<slot />`
}