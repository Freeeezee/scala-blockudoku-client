import $ from "jquery";
import {gridHtml} from "../renderers/grid.renderer";
import {GridModel} from "../models/grid.model";
import {extractTileIndex} from "../utils/event.util";
import {handleTileClick} from "../utils/tile.util";

export const updateGrid = (grid: GridModel) => {
    $('#grid-container').html(gridHtml(grid));
    registerEventHandlers();
}

const registerEventHandlers = () => {
    $('.tile').on('click', (e) => {
        const index = extractTileIndex(e);
        void handleTileClick(index);
    });
}