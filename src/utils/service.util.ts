import axios from "axios";

// Advantages:
// - pre-define instance with base url
// - modern promise-based API
// - middleware-like global interceptors

const API_URL = process.env.API_URL;

const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
});

export const get = async <T> (url: string): Promise<T | null> => {
    const response = await instance.get<T>(url);

    if (response.status !== 200) {
        return null;
    }

    return response.data;
}

export const post = async <T> (url: string, data: any): Promise<T | null> => {
    const response = await instance.post<T>(url, data);

    if (response.status !== 200) {
        return null;
    }

    return response.data;
}