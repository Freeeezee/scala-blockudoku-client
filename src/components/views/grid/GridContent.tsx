import GridTile from "./GridTile";
import {useAppContext} from "../../contexts/AppContext";

export default function () {
    const {
        gameState,
    } = useAppContext();

    const grid = gameState.grid;
    const themeIndex = gameState.colorIndex;

    return (
        <>
            {grid && Array.from({ length: grid.yLength }, (_, y) => (
                <div key={y} className="row g-0 justify-content-center">
                    {Array.from({ length: grid.xLength }, (_, x) => (
                        <GridTile
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            colorSchemeIndex={themeIndex}
                            grid={grid}
                        />
                    ))}
                </div>
            ))}
        </>
    )
}