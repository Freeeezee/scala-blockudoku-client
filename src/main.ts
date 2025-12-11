import {handleQueryParams} from "./utils/query-params.util";
import {initializeBootstrapTooltips} from "./utils/bootstrap.util";
import {initializeApp} from "./utils/app.util";

export const main = async () => {
    initializeApp();

    await handleQueryParams();

    initializeBootstrapTooltips();
}