import {TileModel} from "./tile.model";

export interface GridModel {
    xLength: number;
    yLength: number;
    tiles: TileModel[];
}