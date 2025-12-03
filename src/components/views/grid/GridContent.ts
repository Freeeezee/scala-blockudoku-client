import {injectAppContext} from "../../../contexts/app.context";
import {computed} from "vue";
import GridTile from "./GridTile";

export default {
    components: {GridTile},
    setup() {
        const app = injectAppContext();

        const grid = computed(() => app.gameState.value.grid);
        const themeIndex = computed(() => app.gameState.value.colorIndex);

        return {
            grid,
            themeIndex,
        }
    },
    template: `
    <div 
        v-if="grid"
        v-for="y in grid.yLength" 
        class="row g-0 justify-content-center"
    >
        <GridTile 
            v-for="x in grid.xLength" 
            :x="x - 1" 
            :y="y - 1" 
            :key="x + '-' + y" 
            :color-scheme-index="themeIndex"
            :grid="grid"
        />
    </div>
    `
}