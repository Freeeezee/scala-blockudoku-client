
export interface RtcEnvelope<T = any> {
    type: string;
    payload: T;
}

export const elementSelectionType = "element-selection";
export interface ElementSelection {
    elementIndex: number | null;
}

export const mouseGridPositionType = "mouse-grid-position";
export interface MouseGridPosition {
    hoverTileIndex: number | null;
}