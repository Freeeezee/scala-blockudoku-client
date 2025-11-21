import {io, Socket} from "socket.io-client";
import AppState from "../app-state";

const socketsUrl = process.env.SOCKETS_URL;

export const setupSockets = () => {
    const socket = io(socketsUrl);

    socket.on('connect', () => {
        console.log('Socket connected!');
        joinRoom(socket);
    });

    socket.on('update-state', state => {
        AppState.updateGameState(state);
    });

    return socket;
}

export const joinRoom = (socket: Socket) => {
    const roomId = AppState.getGameState().sessionId;

    socket.emit('leave_rooms');
    socket.emit('join_room', roomId);
}