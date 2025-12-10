import {GameStateModel} from "../../models/game-state.model";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {defaultGameState} from "../../constants/default-game-state.constant";
import {joinRoomSocketOnly, setupSocketsOnly} from "../../utils/socket.util";
import {getGameState} from "../../services/game.service";

interface AppContextValue {
    gameState: GameStateModel;
    selectedElementIndex: number | null;
    hoverTileIndex: number | null;
    setHoverTileIndex: (index: number) => void;
    setSelectedElementIndex: (index: number | null) => void;
    refreshState: () => Promise<void>;
    updateTheme: (index: number) => void;
}

const AppContext = createContext({} as AppContextValue);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    const [gameState, setGameState] = useState(defaultGameState);
    const [selectedElementIndex, setSelectedElementIndex] = useState<number | null>(null);
    const [hoverTileIndex, setHoverTileIndex] = useState<number | null>(null);

    const updateState = (newState: GameStateModel) => {
        if (gameState.sessionId !== newState.sessionId) {
            joinRoomSocketOnly(socket, newState.sessionId);
        }

        setGameState(newState);
    }

    const socket = setupSocketsOnly(updateState);

    const refreshState = async () => {
        const newState = await getGameState();

        if (!newState) {
            console.error('Unable to load game state');
            return;
        }

        updateState(newState);
    }

    const updateTheme = (index: number) => {
        setGameState(prev => ({
            ...prev,
            colorIndex: index,
        }));
    }

    const context = {
        gameState,
        selectedElementIndex,
        hoverTileIndex,
        setHoverTileIndex,
        setSelectedElementIndex,
        refreshState,
        updateTheme,
    }

    useEffect(() => {
        void refreshState();
    }, []);

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}