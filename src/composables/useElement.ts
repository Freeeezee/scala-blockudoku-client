import {computed} from "vue";
import {ElementModel} from "../models/element.model";
import {injectAppContext} from "../contexts/app.context";
import {getElementDimensions} from "../utils/element.util";
import {ElementSelection, elementSelectionType} from "../models/rtc-models.model";

export interface ElementProps {
    index: number;
    elements: ElementModel[];
}

export const useElement = (props: ElementProps) => {
    const app = injectAppContext();

    const element = computed(() => props.elements[props.index]);
    const dimensions = computed(() => {
        const dim = getElementDimensions(element.value);

        const yArr = Array.from({length: dim.yMax - dim.yMin + 1}, (_, i) => dim.yMax - i);
        const xArr = Array.from({length: dim.xMax - dim.xMin + 1}, (_, i) => dim.xMin + i);

        return {
            yArr,
            xArr,
        }
    });
    const selectedClass = computed(() =>
        app.selectedElementIndex.value === props.index ? "selected-element" : "");
    const colorSchemeIndex = computed(() => app.gameState.value.colorIndex);

    const handleClick = () => {
        app.selectedElementIndex.value = props.index;
        publishElementSelection(props.index);
    }

    const publishElementSelection = (index: number) => {
        const msg : ElementSelection = {
            elementIndex: index,
        };
        app.rtcService.publishDataToPeers({type: elementSelectionType, payload: msg});
    }

    return {
        element,
        dimensions,
        colorSchemeIndex,
        selectedClass,
        handleClick,
    }
}