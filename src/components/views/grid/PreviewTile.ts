import {computed, defineComponent, PropType} from "vue";
import {getPreviewState, getTile} from "../../../utils/tile.util";
import {GridModel} from "../../../models/grid.model";
import {ElementTileGroupModel} from "../../../models/element-tile-group.model";
import {getPreviewUrl} from "../../../utils/render.util";
import {injectAppContext} from "../../../contexts/app.context";
import {placeElement} from "../../../services/game.service";

export default defineComponent({
    props: {
        grid: {
            type: Object as PropType<GridModel>,
            required: true,
        },
        elementTileGroup: {
            type: Object as PropType<ElementTileGroupModel | null>,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        hoverTileIndex: {
            type: Number,
            required: false,
        }
    },
    setup(props) {
        const app = injectAppContext();

        const tileInfo = computed(() => {
            const tile = getTile(props.grid, props.x, props.y);

            const index = tile.index;

            const previewState = props.elementTileGroup ?
                getPreviewState(props.elementTileGroup, tile, props.hoverTileIndex) : 'none';

            const url = getPreviewUrl(previewState);

            return {
                url,
                index,
            }
        });

        const handleClick = async () => {
            if (!app.selectedElementIndex.value) return;

            await placeElement(app.selectedElementIndex.value, tileInfo.value.index);

            app.setSelectedElementIndex(null);
            void app.refreshState();
        }

        const handleMouseEnter = () => {
            const index = tileInfo.value.index;
            const hoverTileIndex = app.hoverTileIndex.value ?? -1;

            if (index === hoverTileIndex) return;

            app.hoverTileIndex.value = index;
        }

        const handleMouseLeave = () => {
            const index = tileInfo.value.index;
            const hoverTileIndex = app.hoverTileIndex.value ?? -1;

            if (index !== hoverTileIndex) return;

            app.hoverTileIndex.value = index;
        }

        return {
            tileInfo,
            props,
            handleClick,
            handleMouseEnter,
            handleMouseLeave,
        }
    },
    template: `
    <div class="col-auto">
        <div 
            class="tile preview-tile" 
            :data-index="tileInfo.index" 
            :data-hover-tile-index="props.hoverTileIndex ?? 'none'"
            @click="handleClick"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
        >
          <img 
              v-if="tileInfo.url" 
              :src="tileInfo.url" 
              class="tile-background-image" 
              loading="lazy"
          >
        </div>
    </div>
    `
})