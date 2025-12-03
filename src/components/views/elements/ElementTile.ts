import {computed, defineComponent, PropType} from "vue";
import {ElementModel} from "../../../models/element.model";
import {hasPoint} from "../../../utils/element.util";
import {TileStateModel} from "../../../models/tile-state.model";
import {getBlockUrl} from "../../../utils/render.util";

export default defineComponent({
    props: {
        element: {
            type: Object as PropType<ElementModel>,
            required: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        colorSchemeIndex: {
            type: Number,
            required: true,
        }
    },
    setup(props) {
        const exists = computed(() => hasPoint(props.element, props.x, props.y));
        const url = computed(() =>
            getBlockUrl(TileStateModel.BLOCKED, props.colorSchemeIndex, props.element.colors));

        return {
            exists,
            url,
        }
    },
    template: `
    <div class="col-auto tile-frames">
      <div v-if="exists" class="tile">
        <img :src="url" class="tile-background-image" loading="lazy">
      </div>
    </div>
    `
});