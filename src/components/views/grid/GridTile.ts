import {getTile} from "../../../utils/tile.util";
import {getBlockUrl} from "../../../utils/render.util";
import {computed, defineComponent, PropType} from "vue";
import {GridModel} from "../../../models/grid.model";

export default defineComponent({
    props: {
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        grid: {
            type: Object as PropType<GridModel>,
            required: true,
        },
        colorSchemeIndex: {
            type: Number,
            required: true,
        }
    },
    setup(props) {
        const tileInfo = computed(() => {
            const tile = getTile(props.grid, props.x, props.y);

            const url = getBlockUrl(tile.state.state, props.colorSchemeIndex, tile.colors);
            const index = tile.index;

            return {
                url,
                index,
            }
        });

        return {
            tileInfo,
        }
    },
    template: `
      <div class="col-auto">
        <div class="tile main-tile" v-bind:data-index="tileInfo.index">
          <img v-bind:src="tileInfo.url" class="tile-background-image" loading="lazy">
        </div>
      </div>
    `
})