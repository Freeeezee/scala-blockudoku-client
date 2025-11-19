import $ from "jquery";
import {gridHtml} from "../renderers/grid.renderer";
import {extractTileIndex} from "../utils/event.util";
import {handleTileClick} from "../utils/tile.util";
import AppState from "../app-state";

export const updateGrid = () => {
    const grid = AppState.getGameState().grid;

    $('#grid-container').html(gridHtml(grid));

    registerEventHandlers();
}

const registerEventHandlers = () => {
    $('.tile').on('click', (e) => {
        const index = extractTileIndex(e);
        void handleTileClick(index);
    });
}