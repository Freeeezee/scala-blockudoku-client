import $ from 'jquery';

const API_URL = process.env.API_URL;

export const downloadGameState = () => {
    $.get(`${API_URL}/download`);
}


export const setColor = (colorIndex: number) => {
    // TODO: Exchange all tiles on the grid
    navigator.sendBeacon(`${API_URL}/color/${colorIndex}`);
}