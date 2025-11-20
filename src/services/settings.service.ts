import {get} from "../utils/service.util";

const API_URL = process.env.API_URL;

export const downloadGameState = async () => {
    await get(`${API_URL}/download`);
}


export const setColor = (colorIndex: number) => {
    navigator.sendBeacon(`${API_URL}/update/color/${colorIndex}`);
}