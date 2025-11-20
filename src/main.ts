import {refresh} from "./utils/state.util";
import {initSettingsHtml} from "./views/settings.view";
import {handleQueryParams} from "./utils/query-params.util";

export const main = async () => {
    handleQueryParams();
    initSettingsHtml();
    await refresh();
}