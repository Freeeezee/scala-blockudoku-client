import {injectAppContext} from "../contexts/app.context";
import {computed} from "vue";


const useGameOver = () => {
    const app = injectAppContext();
    const isGameOver = computed(() => app.isGameOver.value);

    return {
        isGameOver,
    }
}

export default useGameOver;