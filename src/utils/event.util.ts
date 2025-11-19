import ClickEvent = JQuery.ClickEvent;
import $ from "jquery";

export const extractTileIndex = (event: ClickEvent<HTMLElement, undefined>) => {
    const tile = $(event.currentTarget);
    return Number(tile.data('index'));
}