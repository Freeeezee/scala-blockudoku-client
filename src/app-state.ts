import {GameStateModel} from "./models/game-state.model";
import {updateGrid} from "./views/grid.view";
import {updateElement} from "./renderers/element.renderer";
import {defaultGameState} from "./constants/default-game-state.constant";

export default class AppState {
    private static gameState: GameStateModel = defaultGameState;
    private static selectedElementIndex: number | null = null;

    private static refreshViews() {
        updateGrid();

        for (let i = 0; i < 3; i++) {
            updateElement(i);
        }
    }

    public static update(gameState: GameStateModel) {
        this.gameState = gameState;
        this.refreshViews();
    }

    public static getGameState() {
        return this.gameState;
    }

    public static getSelectedElementIndex() {
        return this.selectedElementIndex;
    }

    public static isInSelectionMode() {
        return this.selectedElementIndex === null;
    }
}