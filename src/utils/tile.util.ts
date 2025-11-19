import {GridModel} from "../models/grid.model";
import {placeElement} from "../services/game.service";
import {refresh} from "./state.util";

export const getTile = (grid: GridModel, x: number, y: number) => {
    const tileIndex = y * grid.xLength + x;

    return grid.tiles[tileIndex];
}

export const handleTileClick = async (index: number) => {
    await placeElement(0, index);

    await refresh();
}