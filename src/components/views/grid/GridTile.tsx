import {getTile} from "../../../utils/tile.util";
import {getBlockUrl} from "../../../utils/render.util";
import {GridModel} from "../../../models/grid.model";

interface GridTileProps {
    x: number;
    y: number;
    grid: GridModel;
    colorSchemeIndex: number;
}

export default function ({
    x,
    y,
    grid,
    colorSchemeIndex,
}: GridTileProps) {
    const tile = getTile(grid, x, y);

    const url = getBlockUrl(tile.state.state, colorSchemeIndex, tile.colors);
    const index = tile.index;

    return (
        <div className="col-auto">
            <div className="tile main-tile" data-index={index}>
                <img src={url} className="tile-background-image" loading="lazy" />
            </div>
        </div>
    )
}