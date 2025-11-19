import {getGameState} from "../services/game.service";
import AppState from "../app-state";

export const refresh = async () => {
    const gameState = await getGameState();

    if (!gameState) {
        console.error('Unable to load game state');
        return;
    }

    AppState.updateGameState(gameState);
}