import {UniversalGridPreviewModel} from "../models/universal-grid-preview.model";
import {getPreviewState, getTile} from "../utils/tile.util";
import {getPreviewUrl} from "../utils/render.util";
import {GridModel} from "../models/grid.model";

export const previewGridHtml = (
    preview: UniversalGridPreviewModel,
    grid: GridModel,
    selectedElementIndex: number | null,
    hoverTileIndex: number | undefined,
) => {
    const xLength = preview.xLength;
    const yLength = preview.yLength;

    const elementTileGroup = selectedElementIndex === null ? null : preview.elementTileGroups[selectedElementIndex];

    let html = '';
    for (let y = 0; y < yLength; y++) {
        html += '<div class="row g-0 justify-content-center">';
        for (let x = 0; x < xLength; x++) {
            const tile = getTile(grid, x, y);

            const previewState = elementTileGroup ?
                getPreviewState(elementTileGroup, tile, hoverTileIndex || null) : 'none';

            const url = getPreviewUrl(previewState);

            html += `
                <div class="col-auto">
                  <div class="tile preview-tile" data-index="${tile.index}" data-hover-tile-index="${hoverTileIndex ?? 'none'}">
                    ${url ? '<img src="' + url + '" class="tile-background-image" loading="lazy">' : ''}
                  </div>
                </div>
          `;
        }
        html += '</div>';
    }

    return html;
}