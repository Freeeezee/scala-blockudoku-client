import {refresh} from "./utils/state.util";
import {initSettingsHtml} from "./views/settings.view";
import {handleQueryParams} from "./utils/query-params.util";
import {initializeBootstrapTooltips} from "./utils/bootstrap.util";

export const main = async () => {
    await handleQueryParams();

    initializeBootstrapTooltips();
    initSettingsHtml();

    await refresh();
}