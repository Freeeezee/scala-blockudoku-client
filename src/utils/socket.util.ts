import {GameStateModel} from "../models/game-state.model";
import AppState from "../app-state";

const WEBSOCKETS_URL = process.env.WEBSOCKETS_URL || 'ws://localhost:9000/socket';

export const intializeSockets = () => {
    const socket = new WebSocket(WEBSOCKETS_URL);

    socket.onopen = () => {
        console.log('Socket opened');
    }

    socket.onmessage = (e) => {
        const state = JSON.parse(e.data) as GameStateModel;

        AppState.updateGameState(state);
    }

    return socket;
}