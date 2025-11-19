import ClickEvent = JQuery.ClickEvent;
import $ from "jquery";

export const extractIndex = (event: ClickEvent<HTMLElement, undefined>) => {
    const target = $(event.currentTarget);
    return Number(target.data('index'));
}