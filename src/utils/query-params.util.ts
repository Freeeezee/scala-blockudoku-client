export const handleQueryParams = () => {
    const queryString = window.location.search;

    const params = new URLSearchParams(queryString);

    const sessionId = params.get('sessionId');

    if (sessionId) handleSessionIdQueryParam(sessionId);
}

const handleSessionIdQueryParam = (sessionId: string) => {

}