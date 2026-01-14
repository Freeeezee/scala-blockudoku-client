import {injectAppContext} from "../contexts/app.context";
import {computed, ref} from "vue";

export const useProfile = () => {
    const app = injectAppContext();

    const menuOpen = ref(false);

    const isLoggedIn = computed(() => !!app.loggedInUsername.value);

    return {
        menuOpen,
        isLoggedIn,
    }
}