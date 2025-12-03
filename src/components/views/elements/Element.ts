import {computed, defineComponent, PropType} from "vue";
import {getElementDimensions} from "../../../utils/element.util";
import {injectAppContext} from "../../../contexts/app.context";
import ElementTile from "./ElementTile";
import {ElementModel} from "../../../models/element.model";

export default defineComponent({
    components: {ElementTile},
    props: {
        index: {
            type: Number,
            required: true,
        },
        elements: {
            type: Array as PropType<ElementModel[]>,
            required: true,
        }
    },
    setup(props) {
        const app = injectAppContext();

        const element = computed(() => props.elements[props.index]);
        const dimensions = computed(() => {
            const dim = getElementDimensions(element.value);

            const yArr = Array.from({ length: dim.yMax - dim.yMin + 1 }, (_, i) => dim.yMax - i);
            const xArr = Array.from({ length: dim.xMax - dim.xMin + 1 }, (_, i) => dim.xMin + i);

            return {
                yArr,
                xArr,
            }
        });
        const selectedClass = computed(() =>
            app.selectedElementIndex.value === props.index ? "selected-element" : "");
        const colorSchemeIndex = app.gameState.value.colorIndex;

        const handleClick = () => {
            app.setSelectedElementIndex(props.index);
        }

        return {
            element,
            dimensions,
            selectedClass,
            colorSchemeIndex,
            handleClick,
        }
    },
    template: `
    <div class="col-auto">
      <div 
          :class="'container element ' + selectedClass" 
          role="button"
          @click="handleClick"
      >
        <div 
            v-for="y in dimensions.yArr" 
            class="row g-0"
        >
          <ElementTile
              v-for="x in dimensions.xArr"
              :color-scheme-index="colorSchemeIndex" 
              :y="y" 
              :x="x" 
              :element="element"
              :key="x + '-' + y"
          />
        </div>
      </div>
    </div>
    `
});