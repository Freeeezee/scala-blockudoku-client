import {TileStateModel} from "../models/tile-state.model";
import {PreviewState} from "../models/preview-state.model";

export const getBlockUrl = (tileState: TileStateModel) => {
    switch (tileState) {
        case TileStateModel.BLOCKED:
            return '/images/block_blue1.png';
        default:
            return '/images/background_block_final.png';
    }
}

export const getPreviewUrl = (previewState: PreviewState) => {
    switch (previewState) {
        case 'preview-invalid':
            return '/images/block_red.png';
        case 'preview-valid':
            return '/images/block_green.png';
        default:
            return null;
    }
}