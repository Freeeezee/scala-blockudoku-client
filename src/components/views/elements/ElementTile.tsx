import {ElementModel} from "../../../models/element.model";
import {hasPoint} from "../../../utils/element.util";
import {TileStateModel} from "../../../models/tile-state.model";
import {getBlockUrl} from "../../../utils/render.util";

interface ElementTileProps {
    element: ElementModel;
    x: number;
    y: number;
    colorSchemeIndex: number;
}

export default function ({
    element,
    x,
    y,
    colorSchemeIndex,
}: ElementTileProps) {
    const exists = hasPoint(element, x, y);
    const url = getBlockUrl(TileStateModel.BLOCKED, colorSchemeIndex, element.colors);

    return (
        <div className="col-auto tile-frames">
            {exists && (
                <div v-if="exists" className="tile">
                    <img src={url} className="tile-background-image" loading="lazy"/>
                </div>
            )}
        </div>
    )
}