import {TileStateModel} from "../models/tile-state.model";

export const defaultGrid = {
    xLength: 9,
    yLength: 9,
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