import GridContent from "./GridContent";
import PreviewGrid from "./PreviewGrid";

export default {
    components: {PreviewGrid, GridContent},
    template: `
    <div class="flex-column gap-5 d-flex">
        <div class="content position-relative">
            <div id="grid-container" class="container">
              <GridContent />
            </div>
            <div class="position-absolute start-0 top-0 w-100 h-100">
                <div id="preview-grid-container" class="container">
                  <PreviewGrid />
                </div>
            </div>
        </div>
    </div>
    `
}