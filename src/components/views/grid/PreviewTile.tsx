import {getPreviewState, getTile} from "../../../utils/tile.util";
import {GridModel} from "../../../models/grid.model";
import {ElementTileGroupModel} from "../../../models/element-tile-group.model";
import {getPreviewUrl} from "../../../utils/render.util";
import {placeElement} from "../../../services/game.service";
import {useAppContext} from "../../contexts/AppContext";

interface PreviewTileProps {
    grid: GridModel;
    elementTileGroup: ElementTileGroupModel | null;
    x: number;
    y: number;
    hoverTileIndex: number | null;
}

export default function ({
    grid,
    elementTileGroup,
    x,
    y,
    hoverTileIndex,
}: PreviewTileProps) {
    const {
        selectedElementIndex,
        setSelectedElementIndex,
        refreshState,
        hoverTileIndex: oldHoverTileIndex,
        setHoverTileIndex,
    } = useAppContext();

    const tile = getTile(grid, x, y);

    const index = tile.index;

    const previewState = elementTileGroup ?
        getPreviewState(elementTileGroup, tile, hoverTileIndex) : 'none';

    const url = getPreviewUrl(previewState);

    const handleClick = async () => {
        if (selectedElementIndex === null) return;

        await placeElement(selectedElementIndex, index);

        setSelectedElementIndex(null);
        void refreshState();
    }

    const handleMouseEnter = () => {
        if (index === (oldHoverTileIndex ?? -1)) return;

        setHoverTileIndex(index);
    }

    const handleMouseLeave = () => {
        if (index !== (oldHoverTileIndex ?? -1)) return;

        setHoverTileIndex(index);
    }

    return (
        <div className="col-auto">
            <div
                className="tile preview-tile"
                data-index={index}
                data-hover-tile-index={hoverTileIndex ?? 'none'}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {url && (
                    <img
                        src={url}
                        className="tile-background-image"
                        loading="lazy"
                    />
                )}
            </div>
        </div>
    )
}