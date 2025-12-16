import {io, Socket} from "socket.io-client";
import {GameStateModel} from "../models/game-state.model";

const socketsUrl = process.env.SOCKETS_URL;

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

export const joinRoomSocketOnly = (socket: Socket, newRoomId: string, rtcJoinRoomHandler: () => void) => {
    rtcJoinRoomHandler();
    socket.emit('leave_rooms');
    socket.emit('join_room', newRoomId);
}