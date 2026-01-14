import {computed, ref} from "vue";
import {loginUser, registerUser} from "../services/user.service";

export const useAuthenticate = () => {
    const activeTab = ref(0);
    const username = ref("");
    const password = ref("");

    const register = () => {
        void registerUser(username.value, password.value)
    }

    const login = () => {
        void loginUser(username.value, password.value)
    }

    const canSubmit = computed(() => (username.value.trim() !== "" && password.value.trim() !== ""));

    return {
        activeTab,
        username,
        password,
        register,
        login,
        canSubmit,
    }
}