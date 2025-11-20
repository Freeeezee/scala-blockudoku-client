import $ from "jquery";
import MouseEventBase = JQuery.MouseEventBase;

export const extractIndex = (event: MouseEventBase<HTMLElement, undefined>) => {
    const target = $(event.currentTarget);
    return Number(target.data('index'));
}

export const extractHoverTileIndex = (event: MouseEventBase<HTMLElement, undefined>) => {
    const target = $(event.currentTarget);

    const targetData = target.data('hover-tile-index');

    return targetData === 'none' ? -1 : Number(targetData);
}