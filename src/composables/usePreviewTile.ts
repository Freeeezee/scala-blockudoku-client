import {injectAppContext} from "../contexts/app.context";
import {computed} from "vue";
import {getPreviewState, getTile} from "../utils/tile.util";
import {getPreviewUrl} from "../utils/render.util";
import {placeElement} from "../services/game.service";
import {GridModel} from "../models/grid.model";
import {ElementTileGroupModel} from "../models/element-tile-group.model";
import {MouseGridPosition, mouseGridPositionType} from "../models/rtc-models.model";
import {calcPlacement} from "../services/calc/placement.calc";

export interface PreviewTileProps {
    grid: GridModel;
    elementTileGroup: ElementTileGroupModel | null;
    x: number;
    y: number;
    hoverTileIndex?: number;
}

const usePreviewTile = (props: PreviewTileProps) => {
    const app = injectAppContext();

    const tileInfo = computed(() => {
        const tile = getTile(props.grid, props.x, props.y);

        const index = tile.index;

        const previewState = props.elementTileGroup ?
            getPreviewState(props.elementTileGroup, tile, props.hoverTileIndex) : 'none';

        const url = getPreviewUrl(previewState);
        return {
            url,
            index,
        }
    });

    const handleClick = async () => {
        if (app.selectedElementIndex.value === null) return;

        const elementIndex = app.selectedElementIndex.value;
        const tileIndex = tileInfo.value.index;

        const newPlacementHistory = app.gameState.value.placementHistory;
        newPlacementHistory.push({
            placementIndex: newPlacementHistory.length,
            tileIndex,
            elementIndex,
        });

        const calculatedState = await calcPlacement(
            elementIndex,
            tileIndex,
            newPlacementHistory,
            app.gameState.value
        );

        app.selectedElementIndex.value = null;

        void app.refreshState(calculatedState);

        const apiState = await placeElement(newPlacementHistory);

        if (!apiState) return;

        void app.refreshState(apiState);
    }

    const handleMouseEnter = () => {
        const index = tileInfo.value.index;
        const hoverTileIndex = app.hoverTileIndex.value ?? -1;

        if (index === hoverTileIndex) return;

        app.hoverTileIndex.value = index;
        publishMouseEnter(index);
    }

    const handleMouseLeave = () => {
        const index = tileInfo.value.index;
        const hoverTileIndex = app.hoverTileIndex.value ?? -1;

        if (index !== hoverTileIndex) return;

        app.hoverTileIndex.value = index;
        publishMouseEnter(null);
    }

    const publishMouseEnter = (index: number | null) => {
        const msg: MouseGridPosition = {
            hoverTileIndex: index
        }
        app.rtcService.publishDataToPeers({ type: mouseGridPositionType, payload: msg })
    }

    return {
        tileInfo,
        handleClick,
        handleMouseEnter,
        handleMouseLeave,
    }
}
export default usePreviewTile