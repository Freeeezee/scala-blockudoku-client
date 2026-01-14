import {injectAppContext} from "../contexts/app.context";
import {computed, onMounted, ref} from "vue";
import {getHighscore, logoutUser} from "../services/user.service";

export const useProfileView = () => {
    const app = injectAppContext();
    const apiHighscore = ref("0");

    const username = computed(() => app.loggedInUsername.value);

    const refreshHighscore = async () => {
        const val = await getHighscore();

        apiHighscore.value = val ?? '0';
    }

    const highscore = computed(() => (
            Number.parseInt(apiHighscore.value) > app.gameState.value.score ?
                apiHighscore.value :
                app.gameState.value.score.toString()
        )
    );

    const logout = async () => {
        await logoutUser()
        app.loggedInUsername.value = null;
    }

    onMounted(refreshHighscore);

    return {
        username,
        highscore,
        logout
    }
}