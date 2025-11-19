import {ElementModel} from "../models/element.model";
import {elementHtml} from "../views/element.view";
import $ from "jquery";

export const updateElement = (index: number, element: ElementModel) => {
    const html = elementHtml(element);

    $(`#element-${index}`).html(html);
}