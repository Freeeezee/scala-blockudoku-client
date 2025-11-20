import AppState from "../app-state";
import {previewGridHtml} from "../renderers/preview-grid.renderer";
import {extractHoverTileIndex, extractIndex} from "../utils/event.util";
import $ from "jquery";
import {handleTileClick, handleTileMouseEnter, handleTileMouseLeave} from "../utils/tile.util";

export const updatePreviewGrid = (hoverTileIndex?: number) => {
    const preview = AppState.getGameState().universalGridPreview;
    const grid = AppState.getGameState().grid;
    const selectedElementIndex = AppState.getSelectedElementIndex();

    const html = previewGridHtml(preview, grid, selectedElementIndex, hoverTileIndex);
    $('#preview-grid-container').html(html);

    registerEventHandlers();
}

const registerEventHandlers = () => {
    const previewTiles = $('.preview-tile');

    previewTiles.on('click', (e) => {
        const index = extractIndex(e);

        void handleTileClick(index);
    });

    previewTiles.on('mouseenter', (e) => {
        const index = extractIndex(e);
        const hoverTileIndex = extractHoverTileIndex(e);

        handleTileMouseEnter(index, hoverTileIndex);
    });

    previewTiles.on('mouseleave', (e) => {
        const index = extractIndex(e);
        const hoverTileIndex = extractHoverTileIndex(e);

        handleTileMouseLeave(index, hoverTileIndex);
    });
}