import {injectAppContext} from "../contexts/app.context";
import {calcNewGameState} from "../services/calc/new-game-state.calc";
import {v4 as uuidv4} from 'uuid';
import {setCookie} from "../utils/cookie.util";

const useNewGameBtn = () => {
    const app = injectAppContext();

    const resetGameState = async () => {
        app.selectedElementIndex.value = null;
        const newState = await calcNewGameState(app.gameState.value.sessionId);
        void app.refreshState(newState);
        void app.refreshState();
    }

    const newGame = async () => {
        app.selectedElementIndex.value = null;
        const sessionId = uuidv4();
        setCookie("game-key", sessionId);
        const newState = await calcNewGameState(sessionId);
        void app.refreshState(newState);
    }

    return {
        resetGameState,
        newGame,
    };
}
export default useNewGameBtn