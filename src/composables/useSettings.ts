import {computed, ref} from 'vue';
import {injectAppContext} from "../contexts/app.context";
import {setColor} from "../services/settings.service";
import {makeSessionUrl} from "../utils/session.util";

const useSettings= () => {
    const app = injectAppContext();
    const dialog = ref(false);
    const activeTab = ref(0);

    const handleThemeClick = (index: number) => {
        setColor(index);
        app.gameState.value.colorIndex = index;
    };

    const url = computed(() => makeSessionUrl(app.gameState.value.sessionId));

    const handleCopyMultiplayerClick = async () => {
        if (globalThis.isSecureContext) {
            console.log("This page is in a secure context. Clipboard access granted.");
        } else {
            alert("This page is not in a secure context. Clipboard access denied.");
            return;
        }
        try {
            await navigator.clipboard.writeText(url.value);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return {
        dialog,
        activeTab,
        numElements: app.numberOfElements,
        handleThemeClick,
        handleCopyMultiplayerClick
    };
}

export default useSettings;