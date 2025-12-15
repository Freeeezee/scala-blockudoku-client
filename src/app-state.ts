import {GameStateModel} from "./models/game-state.model";
import {updateGrid} from "./views/grid.view";
import {defaultGameState} from "./constants/default-game-state.constant";
import {updateElement} from "./views/element.view";
import {updatePreviewGrid} from "./views/preview-grid.view";
import {updateSettingsMultiplayer} from "./views/settings-multiplayer.view";
import {Socket} from "socket.io-client";
import {joinRoom, setupSockets} from "./utils/socket.util";

export default class AppState {
    private static gameState: GameStateModel = defaultGameState;
    private static selectedElementIndex: number | null = null;
    private static readonly socket: Socket = null!;
    public static readonly peers: Record<string, RTCPeerConnection> = {};
    public static readonly channels: Record<string, RTCDataChannel> = {};

    private static refreshViews() {
        this.clearSelectedElement()
        updateGrid();
        updatePreviewGrid();
        updateSettingsMultiplayer();

        for (let i = 0; i < 3; i++) {
            updateElement(i);
        }
    }

    public static getGameState() {
        return this.gameState;
    }

    public static updateGameState(gameState: GameStateModel) {
        if(this.gameState.sessionId !== gameState.sessionId) {
            joinRoom(this.socket, gameState.sessionId);
        }
        this.gameState = gameState;
        this.refreshViews();
    }

    public static updateTheme(index: number) {
        this.gameState = {
            ...this.gameState,
            colorIndex: index,
        }
        this.refreshViews();
    }

    public static getSelectedElementIndex() {
        return this.selectedElementIndex;
    }

    public static setSelectedElement(index: number) {
        this.selectedElementIndex = index;

        for (let i = 0; i < 3; i++) {
            updateElement(i);
        }
    }

    public static clearSelectedElement() {
        this.selectedElementIndex = null;
    }

    public static isInSelectionMode() {
        return this.selectedElementIndex === null;
    }
}