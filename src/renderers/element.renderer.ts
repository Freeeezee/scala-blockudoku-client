import {ElementModel} from "../models/element.model";
import {elementHtml} from "../views/element.view";
import $ from "jquery";
import AppState from "../app-state";

export const updateElement = (index: number) => {
    const element = AppState.getGameState().elements[index];

    const html = elementHtml(element);

    $(`#element-${index}`).html(html);
}