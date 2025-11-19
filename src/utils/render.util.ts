import {TileStateModel} from "../models/tile-state.model";

export const getBlockUrl = (tileState: TileStateModel) => {
    switch (tileState) {
        case TileStateModel.BLOCKED:
            return '/images/block_blue1.png';
        default:
            return '/images/background_block_final.png';
    }
}