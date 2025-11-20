import {GridModel} from "../models/grid.model";
import {getTile} from "../utils/tile.util";
import {getBlockUrl} from "../utils/render.util";

export const gridHtml = (grid: GridModel) => {
    const xLength = grid.xLength;
    const yLength = grid.yLength;

    let html = '';
    for (let y = 0; y < yLength; y++) {
        html += '<div class="row g-0 justify-content-center">';
        for (let x = 0; x < xLength; x++) {
            const tile = getTile(grid, x, y);

            html += `
                <div class="col-auto">
                  <div class="tile main-tile" data-index="${tile.index}">
                    <img src="${getBlockUrl(tile.state.state)}" class="tile-background-image" loading="lazy">
                  </div>
                </div>
          `;
        }
        html += '</div>';
    }

    return html;
}