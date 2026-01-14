import {computed, ref} from "vue";
import {loginUser, registerUser} from "../services/user.service";
import {injectAppContext} from "../contexts/app.context";

const API_URL = process.env.API_URL;

export const useAuthenticate = () => {
    const app = injectAppContext();
    const activeTab = ref(0);
    const username = ref("");
    const password = ref("");

    const register = async () => {
        const res = await registerUser(username.value, password.value);

        console.log(res);

        if (!res) return;

        await loginUser(username.value, password.value);

        app.loggedInUsername.value = username.value;
    }

    const login = async () => {
        await loginUser(username.value, password.value);

        app.loggedInUsername.value = username.value;
    }

    const loginWithGoogle = () => {
        window.location.href = `${API_URL}/auth/google`;
    }

    const loginWithGithub = () => {
        window.location.href = `${API_URL}/auth/github`;
    }

    const canSubmit = computed(() => (username.value.trim() !== "" && password.value.trim() !== ""));

    return {
        activeTab,
        username,
        password,
        register,
        login,
        loginWithGoogle,
        loginWithGithub,
        canSubmit,
    }
}