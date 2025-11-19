import {ElementModel} from "../models/element.model";
import {getElementDimensions, hasPoint} from "../utils/element.util";

export const elementHtml = (elementModel: ElementModel) => {
    const { xMin, xMax, yMin, yMax } = getElementDimensions(elementModel);

    let html = "";

    html += `<div class="container" role="button">`;

    for (let y = yMax; y >= yMin; y--) {
        html += `<div class="row g-0">`;

        for (let x = xMin; x <= xMax; x++) {
            html += `<div class="col-auto tile-frames">`;

            if (hasPoint(elementModel, x, y)) {
                html += `
                  <div class="tile">
                    <img src="/images/block_blue1.png" class="tile-background-image" loading="lazy">
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