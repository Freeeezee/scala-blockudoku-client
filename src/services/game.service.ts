import {get} from "../utils/service.util";
import {GameStateModel} from "../models/game-state.model";

const API_URL = process.env.API_URL;

export const getGameState = async () => {
    return await get<GameStateModel>(`${API_URL}`);
}