import {Socket} from "socket.io-client";
import AppState from "../app-state";
import {updatePreviewGrid} from "../views/preview-grid.view";
import {
    ElementSelection,
    elementSelectionType,
    MouseGridPosition, mouseGridPositionType,
    RtcEnvelope
} from "../models/rtc-models.model";

export const createPeerConnection = (socket: Socket, peerId: string): RTCPeerConnection => {
    const peer = new RTCPeerConnection({
        iceServers: [
            {urls: 'stun:stun.l.google.com:19302'},
        ]
    });

    peer.onicecandidate = event => {
        const roomId = AppState.getGameState().sessionId;
        if (event.candidate) {
            socket.emit("rtc-signal", {
                roomId,
                from: socket.id,
                to: peerId,
                type: "candidate",
                candidate: event.candidate
            });
        }
    }

    peer.ondatachannel = event => {
        const channel = event.channel;
        AppState.channels[peerId] = channel;
        setupDataChannel(channel, peerId);
    };

    AppState.peers[peerId] = peer;
    return peer;
}

const setupDataChannel = (dataChannel: RTCDataChannel, peerId: string) => {
    console.log("setupDataChannel");

    dataChannel.onopen = () => {
        console.log(`Data channel is open with peer: ${peerId}`);
    };

    dataChannel.onmessage = (event) => {
        handleMessage(event);
    }
}

const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data) as RtcEnvelope;
    switch (data.type) {
        case elementSelectionType: {
            const selection = data.payload as ElementSelection;
            if(selection.elementIndex === null) {
                AppState.clearSelectedElement();
            } else {
                AppState.setSelectedElement(selection.elementIndex);
            }
            break;
        }
        case mouseGridPositionType: {
            const mouseGridPosition = data.payload as MouseGridPosition;
            updatePreviewGrid(mouseGridPosition ? mouseGridPosition.hoverTileIndex! : undefined);
            break;
        }
        default:
            console.warn("Unknown message type:", event.type);
    }
}

export const setupRTCEvents = (socket: Socket) => {

    // When a new peer joins the room (connecting to peers)
    socket.on("peer-joined", async ({ peerId }) => {
        console.log("New peer:", peerId);

        const peer = createPeerConnection(socket, peerId);

        const channel = peer.createDataChannel("dataChannel");
        AppState.channels[peerId] = channel;
        setupDataChannel(channel, peerId);

        console.log("New peer:", peerId);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        const roomId = AppState.getGameState().sessionId;
        socket.emit("rtc-signal", {
            roomId,
            from: socket.id,
            to: peerId,
            type: "offer",
            offer
        });
    });

    // When this peer joined the room (handling incoming connections)
    socket.on('rtc-signal', async data => {
        const { from, type, offer, answer, candidate } = data;

        let peer = AppState.peers[from];
        if (!peer) peer = createPeerConnection(socket, from);

        if (type === "offer") {
            await peer.setRemoteDescription(offer);

            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            const roomId = AppState.getGameState().sessionId;
            socket.emit("rtc-signal", {
                roomId,
                from: socket.id,
                to: from,
                type: "answer",
                answer
            });
        }

        if (type === "answer") {
            await peer.setRemoteDescription(answer);
        }

        if (type === "candidate") {
            await peer.addIceCandidate(candidate);
        }
    });

    // When a peer leaves the room
    socket.on("peer-left", ({ peerId }) => {
        console.log("Peer left:", peerId);

        if (AppState.peers[peerId]) {
            AppState.peers[peerId].close();
            delete AppState.peers[peerId];
        }

        if (AppState.channels[peerId]) {
            AppState.channels[peerId].close();
            delete AppState.channels[peerId];
        }
    });

}

export const publishDataToPeers = (msg: RtcEnvelope) => {
    for(const peerId in AppState.channels) {
        const channel = AppState.channels[peerId];
        if (channel.readyState === "open") {
            channel.send(JSON.stringify(msg));
        } else if(channel.readyState === "closed") {
            console.warn(`Data channel to peer ${peerId} is closed. Removing channel.`);
            delete AppState.channels[peerId];
        } else {
            console.warn(`Data channel to peer ${peerId} is not open. Current state: ${channel.readyState}`);
        }
    }
}

export const teardownPeer = (peerId: string) => {
    if (AppState.channels[peerId]) {
        try { AppState.channels[peerId].close(); } catch {}
        delete AppState.channels[peerId];
    }

    if (AppState.peers[peerId]) {
        try { AppState.peers[peerId].close(); } catch {}
        delete AppState.peers[peerId];
    }
}

