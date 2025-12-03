import {refresh} from "./utils/state.util";
import {initSettingsHtml} from "./views/settings.view";
import {handleQueryParams} from "./utils/query-params.util";
import {initializeBootstrapTooltips} from "./utils/bootstrap.util";
import {createApp} from 'vue';

export const main = async () => {
    const app = createApp({
        data() {
            return { score: -1 };
        }
    });
    app.mount('#scoreText');
    await handleQueryParams();

    initializeBootstrapTooltips();
    initSettingsHtml();

    await refresh();
}