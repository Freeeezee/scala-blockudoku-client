import {getGameState} from "../services/game.service";
import {updateGrid} from "../views/grid.view";
import {updateElement} from "../renderers/element.renderer";

export const refresh = async () => {
    const gameState = await getGameState();

    if (!gameState) {
        console.error('Unable to load game state');
        return;
    }

    updateGrid(gameState.grid);

    for (let i = 0; i < 3; i++) {
        updateElement(i, gameState.elements[i]);
    }
}