import {injectAppContext} from "../../../contexts/app.context";
import {computed} from "vue";
import PreviewTile from "./PreviewTile";

export default {
    components: {PreviewTile},
    setup() {
        const app = injectAppContext();

        const grid = computed(() => app.gameState.value.grid);

        const elementTileGroup = computed(() =>
            app.selectedElementIndex.value === null ? null : app.gameState.value.universalGridPreview.elementTileGroups[app.selectedElementIndex.value]);

        const hoverTileIndex = computed(() => app.hoverTileIndex.value);

        return {
            grid,
            hoverTileIndex,
            elementTileGroup,
        }
    },
    template: `
    <div
      v-if="grid"
      v-for="y in grid.yLength"
      class="row g-0 justify-content-center"
    >
        <PreviewTile
            v-for="x in grid.xLength"
            :x="x - 1"
            :y="y - 1"
            :key="x + '-' + y"
            :grid="grid"
            :hoverTileIndex="hoverTileIndex"
            :element-tile-group="elementTileGroup"
        />
    </div>
    `
}