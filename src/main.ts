import {refresh} from "./utils/state.util";
import {initSettingsHtml} from "./views/settings.view";

export const main = async () => {
    initSettingsHtml();
    await refresh();
}