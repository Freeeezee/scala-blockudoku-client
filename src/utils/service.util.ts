import axios from "axios";

const API_URL = process.env.API_URL;

export const instance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    withCredentials: true,
});

export const get = async <T> (url: string): Promise<T | null> => {
    try {
        const response = await instance.get<T>(url);

        if (response.status !== 200) {
            return null;
        }

        return response.data;
    } catch (error) {
        return null;
    }
}

export const post = async <T> (url: string, data: any, header?: any): Promise<T | null> => {
    const axiosConfig = {headers: {header}};
    try {
        const response = await instance.post<T>(url, data, axiosConfig);

        if (response.status !== 200) {
            return null;
        }

        return response.data;
    }
    catch (error) {
        return null;
    }
}