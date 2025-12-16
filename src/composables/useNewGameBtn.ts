import {newSession} from "../services/session.service";
import {resetGame} from "../services/game.service";
import {injectAppContext} from "../contexts/app.context";

const useNewGameBtn = () => {
    const app = injectAppContext();

    const resetGameState = async () => {
        await resetGame();
        app.selectedElementIndex.value = null;
        void app.refreshState();
    }

    const newGame= async () => {
        await newSession();
        app.selectedElementIndex.value = null;
        void app.refreshState();
    }

    return {
        resetGameState,
        newGame,
    };
}
export default useNewGameBtn