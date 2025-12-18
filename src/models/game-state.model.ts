import {ElementModel} from "./element.model";
import {GridModel} from "./grid.model";
import {UniversalGridPreviewModel} from "./universal-grid-preview.model";

export interface GameStateModel {
    grid: GridModel;
    elements?: ElementModel[];
    score: number;
    colorIndex: number;
    universalGridPreview: UniversalGridPreviewModel;
    sessionId: string;
    placementHistory: PlacementHistoryModel[];
}