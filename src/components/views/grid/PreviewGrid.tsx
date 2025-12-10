import PreviewTile from "./PreviewTile";
import {useAppContext} from "../../contexts/AppContext";

export default function () {
    const {
        gameState,
        selectedElementIndex,
        hoverTileIndex,
    } = useAppContext();

    const grid = gameState.grid;

    const elementTileGroup = selectedElementIndex === null ? null : gameState.universalGridPreview.elementTileGroups[selectedElementIndex];
    return (
        <>
            {grid && Array.from({length: grid.yLength}, (_, y) => (
                <div
                    className="row g-0 justify-content-center"
                >
                    {Array.from({length: grid.xLength}, (_, x) => (
                        <PreviewTile
                            x={x}
                            y={y}
                            key={x + '-' + y}
                            grid={grid}
                            hoverTileIndex={hoverTileIndex}
                            elementTileGroup={elementTileGroup}
                        />))}
                </div>))}
        </>
    )
}