import {newSession} from "../services/session.service";
import {resetGame} from "../services/game.service";
import {injectAppContext} from "../contexts/app.context";

const useNewGameBtn = () => {
    const app = injectAppContext();

    const resetGameState = async () => {
        await resetGame();
        app.setSelectedElementIndex(null);
        void app.refreshState();
    }

    const newGame= async () => {
        await newSession();
        app.setSelectedElementIndex(null);
        void app.refreshState();
    }

    return {
        resetGameState,
        newGame,
    };
}
export default useNewGameBtn