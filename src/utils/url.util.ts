const CLIENT_URL = window.location.origin;

export const makeClientUrl = (url: string) => {
    return `${CLIENT_URL}${url}`;
}