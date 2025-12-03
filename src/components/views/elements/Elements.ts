import Element from "./Element";
import {injectAppContext} from "../../../contexts/app.context";
import {computed} from "vue";

export default {
    components: {Element},
    setup() {
        const app = injectAppContext();

        const elements = computed(() => app.gameState.value.elements);

        return {
            elements,
        }
    },
    template: `
    <div v-if="elements" class="row g-0 justify-content-center">
      <Element :index="0" :elements="elements" />
      <Element :index="1" :elements="elements" />
      <Element :index="2" :elements="elements" />
    </div>
    `
}