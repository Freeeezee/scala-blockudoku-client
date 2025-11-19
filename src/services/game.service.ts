import $ from 'jquery';

const API_URL = process.env.API_URL;

export const getGameState = () => {
    console.log($.get(`${API_URL}/x`));
}