import {injectAppContext} from "../contexts/app.context";
import {computed, onMounted, ref, watch} from "vue";
import {getHighscore} from "../services/user.service";

export const useProfileView = () => {
    const app = injectAppContext();
    const apiHighscore = ref("0");

    const username = computed(() => app.loggedInUsername.value);

    const refreshHighscore = async () => {
        const val = await getHighscore();

        apiHighscore.value = val ?? '0';
    }

    const highscore = computed(() => (
            parseInt(apiHighscore.value) > app.gameState.value.score ?
                apiHighscore.value :
                app.gameState.value.score.toString()
        )
    );

    onMounted(refreshHighscore);

    watch(app.loggedInUsername, () => {
        void refreshHighscore();
    });

    return {
        username,
        highscore,
    }
}