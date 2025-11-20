import {ElementModel} from "../models/element.model";
import {getElementDimensions, hasPoint} from "../utils/element.util";
import {getBlockUrl} from "../utils/render.util";
import {TileStateModel} from "../models/tile-state.model";

export const elementHtml = (elementModel: ElementModel, colorSchemeIndex: number) => {
    const { xMin, xMax, yMin, yMax } = getElementDimensions(elementModel);

    let html = "";

    html += `<div class="container element" role="button" data-index="${elementModel.slot}">`;

    for (let y = yMax; y >= yMin; y--) {
        html += `<div class="row g-0">`;

        for (let x = xMin; x <= xMax; x++) {
            html += `<div class="col-auto tile-frames">`;

            if (hasPoint(elementModel, x, y)) {
                const url = getBlockUrl(TileStateModel.BLOCKED, colorSchemeIndex, elementModel.colors);

                html += `
                  <div class="tile">
                    <img src="${url}" class="tile-background-image" loading="lazy">
                  </div>
                `;
            }

            html += `</div>`;
        }

        html += `</div>`;
    }

    html += `</div>`;

    return html;
}