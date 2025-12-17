import {GridModel} from "../models/grid.model";
import {SeedPairModel} from "../models/seed-pair.model";
import {TileStateModel} from "../models/tile-state.model";

export const generateSeed = async (
    grid: GridModel,
    sessionId: string
): Promise<SeedPairModel> => {
    const gridString = gridToUniqueString(grid);
    const combinedString = gridString + sessionId;

    const data = new TextEncoder().encode(combinedString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hash = new DataView(hashBuffer);

    const seed1 = hash.getBigInt64(0, false);
    const seed2 = hash.getBigInt64(8, false);

    return {
        state: seed1,
        sequence: seed2,
    }
}

const gridToUniqueString = (grid: GridModel) => {
    return grid.tiles
        .map(tile => {
            switch (tile.state.state) {
                case TileStateModel.EMPTY:
                    return "E" + tile.index;
                case TileStateModel.BLOCKED:
                    return "B" + tile.index;
                case TileStateModel.PREVIEW_VALID:
                    return "V" + tile.index;
                case TileStateModel.PREVIEW_INVALID:
                    return "I" + tile.index;
                default:
                    return "X";
            }
        })
        .join("-");
}