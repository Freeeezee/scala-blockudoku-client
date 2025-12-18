
export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // expires in 30 days

    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}