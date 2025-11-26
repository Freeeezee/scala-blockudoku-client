import {refresh} from "./utils/state.util";
import {initSettingsHtml} from "./views/settings.view";
import {handleQueryParams} from "./utils/query-params.util";
import {initializeBootstrapTooltips} from "./utils/bootstrap.util";
import AppState from "./app-state";
import {intializeSockets} from "./utils/socket.util";

export const main = async () => {
    await handleQueryParams();

    AppState.socket = intializeSockets();

    initializeBootstrapTooltips();
    initSettingsHtml();

    await refresh();
}