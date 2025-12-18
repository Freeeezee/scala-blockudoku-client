import {GameStateModel} from "../../models/game-state.model";
import {defaultGameState} from "../../constants/default-game-state.constant";
import {generateElement} from "../../utils/element-generation.util";
import {
    generateCompleteUniversalGridPreview
} from "../../utils/element-tile-group-generator.util";
import {PCG32Random} from "../../utils/pcg32.util";
import {generateSeed} from "../../utils/seed-generation.util";

export const calcNewGameState = async (sessionId: string): Promise<GameStateModel> => {
    const newGameState = {
        ...defaultGameState,
        sessionId: sessionId
    };

    const random = PCG32Random.create(await generateSeed(newGameState.grid, sessionId));

    const newElements = await Promise.all(Array.from({ length: 9 }, (_, index) =>
        generateElement(index, newGameState.grid, newGameState.sessionId, random)
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