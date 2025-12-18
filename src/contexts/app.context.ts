import {computed, ComputedRef, inject, InjectionKey, provide, Ref, ref} from "vue";
import {GameStateModel} from "../models/game-state.model";
import {defaultGameState} from "../constants/default-game-state.constant";
import {getGameState} from "../services/game.service";
import {joinRoomSocketOnly, setupSocketsOnly} from "../utils/socket.util";
import {RtcService, setupRtcService} from "../services/rtc.service";
import {ElementTileGroupModel} from "../models/element-tile-group.model";
import {TileStateModel} from "../models/tile-state.model";
import {setColor} from "../services/settings.service";

interface AppContextValue {
    gameState: Ref<GameStateModel>;
    selectedElementIndex: Ref<number | null>;
    hoverTileIndex: Ref<number | null>;
    numberOfElements: Ref<number>;
    refreshState: (gameState?: GameStateModel) => Promise<void>;
    updateTheme: (index: number) => void;
    isGameOver: ComputedRef<boolean>;
    rtcService: RtcService;
    isConnected: Ref<boolean>;
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
    const isConnected = ref(false);

    const updateState = (newState: GameStateModel) => {
        if (gameState.value.sessionId !== newState.sessionId) {
            joinRoomSocketOnly(socket, newState.sessionId, rtcService.handleJoinRoom);
        }
        hoverTileIndex.value = null;
        selectedElementIndex.value = null;

        gameState.value = newState;
    }

    const socket = setupSocketsOnly(updateState);

    const rtcService = setupRtcService(socket, gameState, hoverTileIndex, selectedElementIndex);

    const refreshState = async (updatedGameState?: GameStateModel) => {
        const newState = updatedGameState ?? await getGameState();

        if (!newState) {
            console.error('Unable to load game state');
            return;
        }

        if(newState.colorIndex !== gameState.value?.colorIndex) {
           setColor(gameState.value?.colorIndex ?? 0);
        }

        updateState({...newState,
            colorIndex: gameState.value?.colorIndex ?? 0
        });
    }

    const isGameOver = computed(() => {
        const elementgroups = Object.entries(
            gameState.value.universalGridPreview.elementTileGroups
        ).slice(0, numberOfElements.value);

        const elements = gameState.value.elements
            ?.map(el => el.structure.length)
            .slice(0, numberOfElements.value);

        if(!elements) {
            return false;
        }

        return !elementgroups.some(([key, group]) => hasGroupValidPlacements(group, elements[Number(key)] ));
    });

    const hasGroupValidPlacements = (group: ElementTileGroupModel, elementLength: number) => {
        for (const tiles of Object.values(group)) {
            if (tiles.length === elementLength &&
                !tiles.some( tile => tile.state.state === TileStateModel.BLOCKED )) {
                return true;
            }
        }
        return false;
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
        refreshState,
        updateTheme,
        isGameOver,
        rtcService,
        isConnected
    }

    provide(key, context);

    return context;
}