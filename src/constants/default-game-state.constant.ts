import {GameStateModel} from "../models/game-state.model";
import {defaultXLength, defaultYLength} from "./default-length.constant";
import {defaultElementTileGroup} from "./default-element-tile-group.constant";
import {defaultGrid} from "./default-grid.model";
import { v4 as uuidv4 } from 'uuid';

export const defaultGameState: GameStateModel = {
    colorIndex: 0,
    score: 0,
    grid: defaultGrid,
    universalGridPreview: {
        xLength: defaultXLength,
        yLength: defaultYLength,
        elementTileGroups: {
            0: defaultElementTileGroup,
            1: defaultElementTileGroup,
            2: defaultElementTileGroup,
        }
    },
    sessionId: uuidv4(),
    placementHistory: []
}