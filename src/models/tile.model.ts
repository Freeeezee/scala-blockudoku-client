import {PointModel} from "./point.model";
import {TileStateModel} from "./tile-state.model";

export interface TileModel {
    index: number;
    position: PointModel;
    colors: number;
    state: {
        state: TileStateModel;
    }
}