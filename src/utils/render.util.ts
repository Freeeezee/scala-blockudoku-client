import {TileStateModel} from "../models/tile-state.model";
import {PreviewState} from "../models/preview-state.model";
import {ColorUrls} from "../constants/color-urls.constant";

export const getBlockUrl = (
    tileState: TileStateModel,
    schemeIndex: number,
    colorIndex: number
) => {
    switch (tileState) {
        case TileStateModel.BLOCKED:
            return ColorUrls[schemeIndex][colorIndex];
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