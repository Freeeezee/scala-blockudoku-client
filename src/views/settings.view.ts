import $ from 'jquery';
import {downloadGameState} from "../services/settings.service";

export const settingsHtml = () => {
    $('#download-btn').on('click', (e) => {
        downloadGameState();
    })
}