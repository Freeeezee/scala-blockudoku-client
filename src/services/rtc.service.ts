import {Socket} from "socket.io-client";
import {
    ElementSelection,
    elementSelectionType, MouseGridPosition,
    mouseGridPositionType,
    RtcEnvelope
} from "../models/rtc-models.model";
import {Ref} from "vue";
import {GameStateModel} from "../models/game-state.model";

export interface RtcService {
    createPeerConnection: (peerId: string) => RTCPeerConnection;
    publishDataToPeers: (msg: RtcEnvelope) => void;
    teardownPeer: (peerId: string) => void;
    handleJoinRoom: () => void;
}

export const setupRtcService = (socket: Socket,
                                gameState: Ref<GameStateModel>,
                                hoverTileIndex: Ref<number | null>,
                                selectedElementIndex: Ref<number | null>): RtcService => {
    const channels: Record<string, RTCDataChannel> = {};
    const peers: Record<string, RTCPeerConnection> = {};

    const createPeerConnection = (peerId: string): RTCPeerConnection => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {urls: 'stun:stun.l.google.com:19302'},
            ]
        });

        peer.onicecandidate = event => {
            const roomId = gameState.value.sessionId;
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
            channels[peerId] = channel;
            setupDataChannel(channel, peerId);
        };

        peers[peerId] = peer;
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
                    selectedElementIndex.value = null;
                } else {
                    selectedElementIndex.value = selection.elementIndex;
                }
                break;
            }
            case mouseGridPositionType: {
                const mouseGridPosition = data.payload as MouseGridPosition;
                hoverTileIndex.value = mouseGridPosition.hoverTileIndex;
                break;
            }
            default:
                console.warn("Unknown message type:", event.type);
        }
    }

    const publishDataToPeers = (msg: RtcEnvelope) => {
        for(const peerId in channels) {
            const channel = channels[peerId];
            if (channel.readyState === "open") {
                channel.send(JSON.stringify(msg));
            } else if(channel.readyState === "closed") {
                console.warn(`Data channel to peer ${peerId} is closed. Removing channel.`);
                delete channels[peerId];
            } else {
                console.warn(`Data channel to peer ${peerId} is not open. Current state: ${channel.readyState}`);
            }
        }
    }

    const teardownPeer = (peerId: string) => {
        if (channels[peerId]) {
            try { channels[peerId].close(); } catch {}
            delete channels[peerId];
        }

        if (peers[peerId]) {
            try { peers[peerId].close(); } catch {}
            delete peers[peerId];
        }
    }

    const handleJoinRoom = () => {
        for (const peerId in peers) {
            teardownPeer(peerId)
        }
        // just to be sure...
        for (const peerId in channels) {
            delete channels[peerId];
        }
    }

    // When a new peer joins the room (connecting to peers)
    socket.on("peer-joined", async ({ peerId }) => {
        console.log("New peer:", peerId);

        const peer = createPeerConnection(peerId);

        const channel = peer.createDataChannel("dataChannel");
        channels[peerId] = channel;
        setupDataChannel(channel, peerId);

        console.log("New peer:", peerId);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        const roomId = gameState.value.sessionId;
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

        let peer = peers[from];
        if (!peer) peer = createPeerConnection(from);

        if (type === "offer") {
            await peer.setRemoteDescription(offer);

            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            const roomId = gameState.value.sessionId;
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

        if (peers[peerId]) {
            peers[peerId].close();
            delete peers[peerId];
        }

        if (channels[peerId]) {
            channels[peerId].close();
            delete channels[peerId];
        }
    });

    return {
        createPeerConnection,
        publishDataToPeers,
        teardownPeer,
        handleJoinRoom
    };
}