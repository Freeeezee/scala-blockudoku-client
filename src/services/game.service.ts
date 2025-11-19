import {get, post} from "../utils/service.util";
import {GameStateModel} from "../models/game-state.model";

const API_URL = process.env.API_URL;

export const getGameState = async () => {
    return await get<GameStateModel>(`${API_URL}`);
}

export const placeElement = async (elementIndex: number, tileIndex: number) => {
    return await post(`${API_URL}/place`, {
        elementIndex,
        positionIndex: tileIndex,
    });
}