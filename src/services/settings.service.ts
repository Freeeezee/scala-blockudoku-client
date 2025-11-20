import $ from 'jquery';

const API_URL = process.env.API_URL;

export const downloadGameState = () => {
    $.get(`/download`);
}


export const setColor = (colorIndex: number) => {
    navigator.sendBeacon(`${API_URL}/update/color/${colorIndex}`);
}