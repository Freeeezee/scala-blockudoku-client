import {GameStateModel} from "../../models/game-state.model";
import {TileModel} from "../../models/tile.model";
import {TileStateModel} from "../../models/tile-state.model";
import {GridModel} from "../../models/grid.model";
import {generateElement} from "../../utils/element-generation.util";
import {
    generateUniversalGridPreview
} from "../../utils/element-tile-group-generator.util";
import {ElementTileGroupModel} from "../../models/element-tile-group.model";

export const calcPlacement = async (
    elementIndex: number,
    tileIndex: number,
    newPlacementHistory: PlacementHistoryModel[],
    gameState: GameStateModel,
): Promise<GameStateModel> => {
    if (!gameState.grid || !gameState.elements) return gameState;

    const affectedTiles = getAffectedTiles(elementIndex, tileIndex, gameState);

    if (affectedTiles.some(tile => tile.state.state === TileStateModel.BLOCKED)) return gameState;

    const newGrid: GridModel = {
        ...gameState.grid,
        tiles: updateTileState(affectedTiles, gameState.grid.tiles),
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
    allTiles: TileModel[]
): TileModel[] => {
    return allTiles.map(tile => {
        const affected = affectedTiles.find(af => af.index === tile.index);

        if (!affected) return tile;

        return {
            ...tile,
            state: { state: TileStateModel.BLOCKED },
            colors: affected.colors,
        }
    });
}