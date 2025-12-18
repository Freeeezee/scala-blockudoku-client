import {GameStateModel} from "../../models/game-state.model";
import {TileModel} from "../../models/tile.model";
import {TileStateModel} from "../../models/tile-state.model";
import {GridModel} from "../../models/grid.model";
import {generateElement} from "../../utils/element-generation.util";
import {generateUniversalGridPreview} from "../../utils/element-tile-group-generator.util";

export const calcPlacement = async (
    elementIndex: number,
    tileIndex: number,
    newPlacementHistory: PlacementHistoryModel[],
    gameState: GameStateModel,
): Promise<GameStateModel> => {
    if (!gameState.grid || !gameState.elements) return gameState;

    const element = gameState.elements[elementIndex];

    const affectedTiles = getAffectedTiles(elementIndex, tileIndex, gameState);

    const hasBlocked = affectedTiles.some(tile => tile.state.state === TileStateModel.BLOCKED);
    const isNotFullElement = affectedTiles.length !== element.structure.length;

    if (hasBlocked || isNotFullElement) return gameState;

    const newGrid: GridModel = {
        ...gameState.grid,
        tiles: updateTileState(affectedTiles, gameState.grid.tiles, element.colors),
    }

    const newElement = await generateElement(elementIndex, newGrid, gameState.sessionId);

    const elements = gameState.elements.map((element, index) => (
        index === elementIndex ? newElement : element
    ));

    const universalGridPreview = generateUniversalGridPreview(elementIndex,
        newElement,
        newGrid,
        gameState);

    return {
        ...gameState,
        grid: newGrid,
        placementHistory: newPlacementHistory,
        elements,
        universalGridPreview
    }
}

const getAffectedTiles = (
    elementIndex: number,
    tileIndex: number,
    gameState: GameStateModel,
): TileModel[] => {
    const group = gameState.universalGridPreview.elementTileGroups[elementIndex];
    return group[tileIndex];
}

const updateTileState = (
    affectedTiles: TileModel[],
    allTiles: TileModel[],
    colors: number,
): TileModel[] => {
    return allTiles.map(tile => {
        const affected = affectedTiles.find(af => af.index === tile.index);

        if (!affected) return tile;

        return {
            ...tile,
            state: { state: TileStateModel.BLOCKED },
            colors,
        }
    });
}