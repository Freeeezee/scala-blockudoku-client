import $ from 'jquery';
import {downloadGameState, setColor} from "../services/settings.service";
import {handleThemeChange} from "../utils/color.util";

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
    $('#btnRetro').on('click', () => handleThemeChange(0))
    $('#btnTropical').on('click', () => handleThemeChange(2))
    $('#btnAquatic').on('click', () => handleThemeChange(1))
    $('#btnHellfire').on('click', () => handleThemeChange(3))
}