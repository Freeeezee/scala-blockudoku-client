import {get, post} from "../utils/service.util";
import {GameStateModel} from "../models/game-state.model";

export const getGameState = async () => {
    return await get<GameStateModel>('/');
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