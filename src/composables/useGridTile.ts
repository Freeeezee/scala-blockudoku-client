import {GridModel} from "../models/grid.model";
import {computed} from "vue";
import {getTile} from "../utils/tile.util";
import {getBlockUrl} from "../utils/render.util";

export interface GridTileProps {
    x: number;
    y: number;
    grid: GridModel;
    colorSchemeIndex: number;
}

export const gridTileInfo = (props: GridTileProps)=> computed(() => {
    const tile = getTile(props.grid, props.x, props.y);

    const url = getBlockUrl(tile.state.state, props.colorSchemeIndex, tile.colors);
    const index = tile.index;

    return {
        url,
        index,
    }
});