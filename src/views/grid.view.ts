import $ from "jquery";
import {gridHtml} from "../renderers/grid.renderer";
import AppState from "../app-state";

export const updateGrid = () => {
    const grid = AppState.getGameState().grid;
    const colorSchemeIndex = AppState.getGameState().colorIndex;

    $('#grid-container').html(gridHtml(grid!, colorSchemeIndex));
}