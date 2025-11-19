import $ from 'jquery';

const API_URL = process.env.API_URL;

export const downloadGameState = () => {
    $.get(`${API_URL}/download`);
}