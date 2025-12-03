import {refresh} from "./utils/state.util";
import {initSettingsHtml} from "./views/settings.view";
import {handleQueryParams} from "./utils/query-params.util";
import {initializeBootstrapTooltips} from "./utils/bootstrap.util";
import {createApp} from 'vue';
import {initializeApp} from "./utils/app.util";

export const main = async () => {
    initializeApp();

    //await handleQueryParams();

    initializeBootstrapTooltips();
    //initSettingsHtml();

    //await refresh();
}