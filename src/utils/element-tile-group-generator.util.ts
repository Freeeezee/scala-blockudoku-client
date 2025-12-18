import {ElementModel} from "../models/element.model";
import {GridModel} from "../models/grid.model";
import {TileModel} from "../models/tile.model";
import {ElementTileGroupModel} from "../models/element-tile-group.model";
import {GameStateModel} from "../models/game-state.model";

export const generateUniversalGridPreview = (
    elementIndex: number,
    newElement: ElementModel,
    newGrid: GridModel,
    gameState: GameStateModel) => {
    const newElementTileGroup = generateElementTileGroup(newElement, newGrid);

    return {
        ...gameState.universalGridPreview,
        elementTileGroups: Object.fromEntries(
            Object.entries(gameState.universalGridPreview.elementTileGroups).map(
                ([key, group]) =>
                    Number(key) === elementIndex
                        ? [Number(key), newElementTileGroup]
                        : [Number(key), group]
            )
        ) as { [key: number]: ElementTileGroupModel }
    };
}

export const generateCompleteUniversalGridPreview = (
    newElements: ElementModel[],
    newGrid: GridModel,
    gameState: GameStateModel) => {

    const newElementTileGroups = newElements.map(element =>
        generateElementTileGroup(element, newGrid)
    );

    return {
        ...gameState.universalGridPreview,
        elementTileGroups: newElementTileGroups
    };
}

const generateElementTileGroup = (element: ElementModel, grid: GridModel) => {
    const result: ElementTileGroupModel = {};

    for (let xPos = 0; xPos < grid.xLength; xPos++) {
        for (let yPos = 0; yPos < grid.yLength; yPos++) {
            result[xPos + yPos * grid.xLength] = getElementTilesForPosition(element, grid, xPos, yPos);
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
    const baseTile = grid.tiles[xPos + yPos * grid.xLength];

    return element.structure.map((point) => {
        const x = baseTile.position.xPos + point.xPos;
        const y = baseTile.position.yPos - point.yPos;

        if (x < 0 || x >= grid.xLength || y < 0 || y >= grid.yLength) {
            return;
        }
        return grid.tiles[x + y * grid.xLength];
    }).filter((tile): tile is TileModel => !!tile);
}