import {ElementModel} from "../models/element.model";
import {GridModel} from "../models/grid.model";
import {TileModel} from "../models/tile.model";
import {ElementTileGroupModel} from "../models/element-tile-group.model";

export const generateElementTileGroup = (element: ElementModel, grid: GridModel) => {
    const result: ElementTileGroupModel = {};

    for (let xPos = 0; xPos < grid.xLength; xPos++) {
        for (let yPos = 0; yPos < grid.yLength; yPos++) {
            result[xPos * grid.yLength + yPos] = getElementTilesForPosition(element, grid, xPos, yPos);
        }
    }
    return result;
}

const getElementTilesForPosition = (
    element: ElementModel,
    grid: GridModel,
    xPos: number,
    yPos: number
) => {
    const baseTile = grid.tiles[xPos * grid.yLength + yPos];

    return element.structure.map((point) => {
        const x = baseTile.position.xPos + point.xPos;
        const y = baseTile.position.yPos - point.yPos;

        if (x < 0 || x >= grid.xLength || y < 0 || y >= grid.yLength) {
            return;
        }
        return grid.tiles[x * grid.yLength + y];
    }).filter((tile): tile is TileModel => !!tile);
}