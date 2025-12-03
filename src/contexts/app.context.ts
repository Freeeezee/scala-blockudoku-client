import {inject, InjectionKey, provide, Ref, ref} from "vue";
import {GameStateModel} from "../models/game-state.model";
import {defaultGameState} from "../constants/default-game-state.constant";
import {getGameState} from "../services/game.service";

interface AppContextValue {
    gameState: Ref<GameStateModel>;
    selectedElementIndex: Ref<number | null>;
    hoverTileIndex: Ref<number | null>;
    setSelectedElementIndex: (index: number | null) => void;
    refreshState: () => Promise<void>;
    updateTheme: (index: number) => void;
}

const key = Symbol() as InjectionKey<AppContextValue>;

export const injectAppContext = () => {
    const value = inject(key);

    if (!value) {
        throw new Error('AppContext not provided');
    }

    return value;
}

export const provideAppContext = () => {
    const gameState: Ref<GameStateModel> = ref(defaultGameState);
    const selectedElementIndex: Ref<number | null> = ref(null);
    const hoverTileIndex: Ref<number | null> = ref(null);

    const setSelectedElementIndex = (index: number | null) => {
        selectedElementIndex.value = index;
    }

    const refreshState = async () => {
        const newState = await getGameState();

        if (!newState) {
            console.error('Unable to load game state');
            return;
        }

        gameState.value = newState;
    }

    const updateTheme = (index: number) => {
        gameState.value = {
            ...gameState.value,
            colorIndex: index,
        }
    }

    const context = {
        gameState,
        selectedElementIndex,
        hoverTileIndex,
        setSelectedElementIndex,
        refreshState,
        updateTheme,
    }

    provide(key, context);

    return context;
}