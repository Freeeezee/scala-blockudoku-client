import {GameStateModel} from "./models/game-state.model";
import {updateGrid} from "./views/grid.view";
import {defaultGameState} from "./constants/default-game-state.constant";
import {updateElement} from "./views/element.view";

export default class AppState {
    private static gameState: GameStateModel = defaultGameState;
    private static selectedElementIndex: number | null = null;

    private static refreshViews() {
        updateGrid();

        for (let i = 0; i < 3; i++) {
            updateElement(i);
        }
    }

    public static getGameState() {
        return this.gameState;
    }

    public static updateGameState(gameState: GameStateModel) {
        this.gameState = gameState;
        this.refreshViews();
    }

    public static getSelectedElementIndex() {
        return this.selectedElementIndex;
    }

    public static setSelectedElement(index: number) {
        this.selectedElementIndex = index;
    }

    public static clearSelectedElement() {
        this.selectedElementIndex = null;
    }

    public static isInSelectionMode() {
        return this.selectedElementIndex === null;
    }
}