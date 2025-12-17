import {get, post} from "../utils/service.util";
import {GameStateModel} from "../models/game-state.model";
import {injectAppContext} from "../contexts/app.context";

const app = injectAppContext();

export const getGameState = async () => {
     get<GameStateModel>('/');
    return app.gameState.value;
}

export const placeElement = async (elementIndex: number, tileIndex: number) => {

    return await post(`/place`, {
        elementIndex,
        positionIndex: tileIndex,
    });
}

export const resetGame = async () => {
    return await get(`/reset`);
}