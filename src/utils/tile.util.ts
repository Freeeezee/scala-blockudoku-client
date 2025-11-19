import {GridModel} from "../models/grid.model";
import {placeElement} from "../services/game.service";
import {refresh} from "./state.util";
import AppState from "../app-state";

export const getTile = (grid: GridModel, x: number, y: number) => {
    const tileIndex = y * grid.xLength + x;

    return grid.tiles[tileIndex];
}

export const handleTileClick = async (index: number) => {
    if (AppState.isInSelectionMode()) {
        return;
    }

    await placeElement(AppState.getSelectedElementIndex()!, index);
    AppState.clearSelectedElement();

    await refresh();
}