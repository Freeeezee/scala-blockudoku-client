import {inject, InjectionKey, provide, Ref, ref} from "vue";
import {GameStateModel} from "../models/game-state.model";
import {defaultGameState} from "../constants/default-game-state.constant";
import {getGameState} from "../services/game.service";
import {joinRoomSocketOnly, setupSocketsOnly} from "../utils/socket.util";

interface AppContextValue {
    gameState: Ref<GameStateModel>;
    selectedElementIndex: Ref<number | null>;
    hoverTileIndex: Ref<number | null>;
    numberOfElements: Ref<number>;
    setSelectedElementIndex: (index: number | null) => void;
    refreshState: () => Promise<void>;
    updateTheme: (index: number) => void;
    isGameOver: Ref<boolean>;
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
    const numberOfElements: Ref<number> = ref(3);
    const isGameOver: Ref<boolean> = ref(false);

    const updateState = (newState: GameStateModel) => {
        if (gameState.value.sessionId !== newState.sessionId) {
            joinRoomSocketOnly(socket, newState.sessionId);
        }

        gameState.value = newState;
    }

    const socket = setupSocketsOnly(updateState);

    const setSelectedElementIndex = (index: number | null) => {
        selectedElementIndex.value = index;
    }

    const refreshState = async () => {
        const newState = await getGameState();

        if (!newState) {
            console.error('Unable to load game state');
            return;
        }

        updateState(newState);
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
        numberOfElements,
        setSelectedElementIndex,
        refreshState,
        updateTheme,
        isGameOver,
    }

    provide(key, context);

    return context;
}