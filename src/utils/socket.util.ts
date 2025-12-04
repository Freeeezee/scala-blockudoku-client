import {io, Socket} from "socket.io-client";
import AppState from "../app-state";
import {setupRTCEvents, teardownPeer} from "./rtc.util";
import {GameStateModel} from "../models/game-state.model";

const socketsUrl = process.env.SOCKETS_URL;

export const setupSockets = () => {
    const socket = io(socketsUrl, {
        withCredentials: true
    });

    socket.on('connect', () => {
        console.log('Socket connected!');
        //joinRoom(socket, AppState.getGameState().sessionId);
    });

    socket.on('update-state', state => {
        AppState.updateGameState(state);
    });

    setupRTCEvents(socket);

    return socket;
}

export const setupSocketsOnly = (updateState: (state: GameStateModel) => void) => {
    const socket = io(socketsUrl, {
        withCredentials: true
    });

    socket.on('connect', () => {
        console.log('Socket connected!');
    });

    socket.on('update-state', state => {
        updateState(state);
    });

    return socket;
}

export const joinRoom = (socket: Socket, newRoomId: string) => {
    for(const peerId in AppState.peers) {
        teardownPeer(peerId)
    }
    // just to be sure...
    for(const peerId in AppState.channels) {
        delete AppState.channels[peerId];
    }

    socket.emit('leave_rooms');
    socket.emit('join_room', newRoomId);
}

export const joinRoomSocketOnly = (socket: Socket, newRoomId: string) => {
    socket.emit('leave_rooms');
    socket.emit('join_room', newRoomId);
}