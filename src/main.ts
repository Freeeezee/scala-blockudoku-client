import {getGameState} from "./services/game.service";
import {updateGrid} from "./views/grid.view";
import {updateElement} from "./renderers/element.renderer";

export const main = async () => {
    const gameState = await getGameState();

    if (!gameState) {
        console.error('Unable to load game state');
        return;
    }

    updateGrid();

    for (let i = 0; i < 3; i++) {
        updateElement(i, gameState.elements[i]);
    }
}