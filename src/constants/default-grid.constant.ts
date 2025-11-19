import {GridModel} from "../models/grid.model";
import {defaultXLength, defaultYLength} from "./default-length.constant";

export const defaultGrid: GridModel = {
    xLength: defaultXLength,
    yLength: defaultYLength,
    tiles: Array.from({ length: defaultXLength * defaultYLength }),
}