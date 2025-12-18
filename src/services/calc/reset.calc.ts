import {GameStateModel} from "../../models/game-state.model";
import {get} from "../../utils/service.util";
import {defaultGameState} from "../../constants/default-game-state.constant";
import {generateElement} from "../../utils/element-generation.util";
import { v4 as uuidv4 } from 'uuid';
import {
    generateCompleteUniversalGridPreview,
    generateUniversalGridPreview
} from "../../utils/element-tile-group-generator.util";

export const calcReset = async (): Promise<GameStateModel> => {
    const newGameState = {
        ...defaultGameState,
        sessionId: uuidv4()
    };

    const newElements = await Promise.all(Array.from({ length: 9 }, (_, index) =>
        generateElement(index, newGameState.grid, newGameState.sessionId)
    ));

    const universalGridPreview = generateCompleteUniversalGridPreview(
        elementIndex,
        newElement,
        newGrid,
        gameState);

    return await get(`/reset`);
}