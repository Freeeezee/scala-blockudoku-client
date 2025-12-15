import {ref} from 'vue';
import {injectAppContext} from "../contexts/app.context";
import {setColor} from "../services/settings.service";

const useSettings= () => {
    const app = injectAppContext();
    const dialog = ref(false);
    const activeTab = ref(0);

    const handleThemeClick = (index: number) => {
        setColor(index);
        app.gameState.value.colorIndex = index;
    };

    return {
        dialog,
        activeTab,
        numElements: app.numberOfElements,
        handleThemeClick,
    };
}

export default useSettings;