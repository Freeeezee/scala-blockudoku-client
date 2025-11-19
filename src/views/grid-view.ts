export const gridHtml = () => {
    const xLength = 9;
    const yLength = 9;

    let html = '';
    for (let y = 0; y < yLength; y++) {
        html += '<div class="row g-0 justify-content-center">';
        for (let x = 0; x < xLength; x++) {
            html += `
        <div class="col-auto">
          <div class="tile">
            <img src="/images/background_block_final.png" class="tile-background-image" loading="lazy">
          </div>
        </div>
      `;
        }
        html += '</div>';
    }

    return html;
}