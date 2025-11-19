import {getGameState} from "./services/game.service";
import $ from "jquery";
import {gridHtml} from "./views/grid.view";
import {elementHtml} from "./views/element.view";

export const main = async () => {
    const gameState = await getGameState();

    if (!gameState) {
        console.error('Unable to load game state');
        return;
    }

    $('#grid-container').html(gridHtml());

    for (let i = 0; i < 3; i++) {
        $(`#element-${i}`).html(elementHtml(gameState.elements[i]));
    }
}