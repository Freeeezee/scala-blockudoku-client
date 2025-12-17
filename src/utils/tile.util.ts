import {GridModel} from "../models/grid.model";
import {TileModel} from "../models/tile.model";
import {PreviewState} from "../models/preview-state.model";
import {ElementTileGroupModel} from "../models/element-tile-group.model";
import {TileStateModel} from "../models/tile-state.model";

export const getTile = (grid: GridModel, x: number, y: number) => {
    const tileIndex = y * grid.xLength + x;

    return grid.tiles[tileIndex];
}

export const getPreviewState = (
    group: ElementTileGroupModel,
    tile: TileModel,
    hoverTileIndex: number | undefined,
): PreviewState => {
    if (!hoverTileIndex) return 'none';

    const hoverTileGroup = group[hoverTileIndex];
    if (!hoverTileGroup.some(groupTile => groupTile.index === tile.index)) return 'none';

    switch (tile.state.state) {
        case TileStateModel.BLOCKED:
            return 'preview-invalid';
        case TileStateModel.EMPTY:
            return 'preview-valid';
        default:
            return 'none'
    }
}
