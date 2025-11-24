import {ElementModel} from "../models/element.model";
import '../scss/styles.scss';
import AppState from "../app-state";
import {publishDataToPeers} from "./rtc.util";
import {ElementSelection, elementSelectionType} from "../models/rtc-models.model";

export const getElementDimensions = (element: ElementModel) => {
    const xMin = Math.min(...element.structure.map(element => element.xPos));
    const yMin = Math.min(...element.structure.map(element => element.yPos));
    const xMax = Math.max(...element.structure.map(element => element.xPos));
    const yMax = Math.max(...element.structure.map(element => element.yPos));

    return {xMin, yMin, xMax, yMax};
}

export const hasPoint = (
    element: ElementModel, x: number, y: number
): boolean => {
    return element.structure.some(point => (
        point.xPos === x && point.yPos === y
    ));
}

export const handleElementClick = (index: number) => {
    AppState.setSelectedElement(index);
    publishElementSelection(index);
}

export const publishElementSelection = (index: number) => {
    const msg : ElementSelection = {
        elementIndex: index,
    };
    publishDataToPeers({type: elementSelectionType, payload: msg});
}