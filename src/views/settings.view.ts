import $ from 'jquery';
import {downloadGameState, setColor} from "../services/settings.service";

export const initSettingsHtml = () => {
    initDownloadBtn();
    initColorSettings()
}

export const initDownloadBtn = () => {
    $('#download-btn').on('click', (e) => {
        downloadGameState();
    })
}

export const initColorSettings = () => {
    $('#btnRetro').on('click', (e) => {setColor(0)})
    $('#btnTropical').on('click', (e) => {setColor(2)})
    $('#btnAquatic').on('click', (e) => {setColor(1)})
    $('#btnHellfire').on('click', (e) => {setColor(3)})
}