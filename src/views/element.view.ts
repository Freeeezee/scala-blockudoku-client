import AppState from "../app-state";
import $ from "jquery";
import {elementHtml} from "../renderers/element.renderer";
import {extractIndex} from "../utils/event.util";
import {handleElementClick} from "../utils/element.util";

export const updateElement = (index: number) => {
    const element = AppState.getGameState().elements![index];
    const colorSchemeIndex = AppState.getGameState().colorIndex;
    const isSelected = index === AppState.getSelectedElementIndex();

    const html = elementHtml(element, colorSchemeIndex, isSelected);

    $(`#element-${index}`).html(html);

    registerEventHandlers();
}

const registerEventHandlers = () => {
    $(`.element`).on('click', (e) => {
        const index = extractIndex(e);

        handleElementClick(index);
    })
}