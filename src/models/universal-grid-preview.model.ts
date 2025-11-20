import {ElementTileGroupModel} from "./element-tile-group.model";

export interface UniversalGridPreviewModel {
    elementTileGroups: {
        [key: number]: ElementTileGroupModel;
    },
    xLength: number;
    yLength: number;
}