import {makeClientUrl} from "./url.util";

export const makeSessionUrl = (sessionId: string) => {
    return makeClientUrl(`?sessionId=${sessionId}`);
}