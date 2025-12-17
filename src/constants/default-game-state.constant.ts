import {GameStateModel} from "../models/game-state.model";
import {defaultXLength, defaultYLength} from "./default-length.constant";
import {defaultElementTileGroup} from "./default-element-tile-group.constant";

export const defaultGameState: GameStateModel = {
    colorIndex: 0,
    score: 0,
    universalGridPreview: {
        xLength: defaultXLength,
        yLength: defaultYLength,
        elementTileGroups: {
            0: defaultElementTileGroup,
            1: defaultElementTileGroup,
            2: defaultElementTileGroup,
        }
    },
    sessionId: '',
    placementHistory: []
}