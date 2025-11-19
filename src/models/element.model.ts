import {PointModel} from "./point.model";

export interface ElementModel {
    structure: PointModel[];
    slot: number;
    colors: number;
}