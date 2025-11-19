import {ElementModel} from "./element.model";
import {ElementTileGroupModel} from "./element-tile-group.model";

export interface GameStateModel {
    elements: ElementModel[];
    score: number;
    colorIndex: number;
    universalGridPreview: {
        elementTileGroups: {
            0: ElementTileGroupModel;
            1: ElementTileGroupModel;
            2: ElementTileGroupModel;
        },
        xLength: number;
        yLength: number;
    }
}