import {getElementDimensions} from "../../../utils/element.util";
import {ElementModel} from "../../../models/element.model";
import {useAppContext} from "../../contexts/AppContext";
import {useMemo} from "react";
import ElementTile from "./ElementTile";

interface ElementProps {
    index: number;
    elements: ElementModel[];
}

export default function ({
    index,
    elements,
}: ElementProps) {
    const {
        gameState,
        selectedElementIndex,
        setSelectedElementIndex,
    } = useAppContext();

    const dimensions = useMemo(() => {
        const dim = getElementDimensions(elements[index]);

        const yArr = Array.from({length: dim.yMax - dim.yMin + 1}, (_, i) => dim.yMax - i);
        const xArr = Array.from({length: dim.xMax - dim.xMin + 1}, (_, i) => dim.xMin + i);

        return {
            yArr,
            xArr,
        }
    }, [elements, index]);

    const selectedClass = selectedElementIndex === index ? "selected-element" : ""

    const handleClick = () => {
        setSelectedElementIndex(index);
    }

    return (
        <div className="col-auto">
            <div
                className={'container element ' + selectedClass}
                role="button"
                onClick={handleClick}
            >
                {dimensions.yArr.map((y) => (
                    <div className="row g-0" key={y}>
                        {dimensions.xArr.map((x) => (
                            <ElementTile
                                key={`${x}-${y}`}
                                colorSchemeIndex={gameState.colorIndex}
                                y={y}
                                x={x}
                                element={elements[index]}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}