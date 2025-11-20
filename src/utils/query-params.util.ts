import {joinSession} from "../services/session.service";

export const handleQueryParams = async () => {
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    const sessionId = params.get('sessionId');

    if (sessionId) await handleSessionIdQueryParam(sessionId);
}

const handleSessionIdQueryParam = async (sessionId: string) => {
    await joinSession(sessionId);
}