import {TileStateModel} from "../models/tile-state.model";
import {defaultXLength, defaultYLength} from "./default-length.constant";

export const defaultGrid = {
    xLength: defaultXLength,
    yLength: defaultYLength,
    tiles: Array.from({ length: 9 * 9 }, (_, index) => ({
        index,
        position: {
            xPos: index % 9,
            yPos: Math.floor(index / 9),
        },
        colors: 0,
        state: {
            state: TileStateModel.EMPTY,
        }
    })),
}