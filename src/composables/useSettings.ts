import {ref} from 'vue';
import {injectAppContext} from "../contexts/app.context";
import {setColor, setNumElements} from "../services/settings.service";

const useSettings= () => {

    const app = injectAppContext();
    const dialog = ref(false);
    const activeTab = ref(0);
    const numElements = ref(app.gameState.value.elements?.length || 0 ); //TODO: How to handle
    // reset and start of game?

    const handleThemeClick = (index: number) => {
        setColor(index);
        app.gameState.value.colorIndex = index;
    };

    const handleNumElementsChange = () => {
        setNumElements(numElements.value)
    };

    return {
        dialog,
        activeTab,
        numElements,
        handleThemeClick,
        handleNumElementsChange,
    };
}

export default useSettings;