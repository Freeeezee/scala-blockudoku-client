import {get, post} from "../utils/service.util";
import {GameStateModel} from "../models/game-state.model";

export const getGameState = async () => {
    return get<GameStateModel>('/');
}

export const placeElement = async (placementHistory: PlacementHistoryModel[]) => {
    return await post<GameStateModel>(`/place`, placementHistory);
}

export const resetGame = async () => {

}