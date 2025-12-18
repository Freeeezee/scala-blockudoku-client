import {GameStateModel} from "../../models/game-state.model";
import {defaultGameState} from "../../constants/default-game-state.constant";
import {generateElement} from "../../utils/element-generation.util";
import {
    generateCompleteUniversalGridPreview
} from "../../utils/element-tile-group-generator.util";

export const calcNewGameState = async (sessionId: string): Promise<GameStateModel> => {
    const newGameState = {
        ...defaultGameState,
        sessionId: sessionId
    };

    const newElements = await Promise.all(Array.from({ length: 9 }, (_, index) =>
        generateElement(index, newGameState.grid, newGameState.sessionId)
    ));

    const universalGridPreview = generateCompleteUniversalGridPreview(
        newElements,
        newGameState.grid,
        newGameState);

    return {
        ...newGameState,
        elements: newElements,
        universalGridPreview
    };

}