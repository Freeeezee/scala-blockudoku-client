import Element from "./Element";
import {useAppContext} from "../../contexts/AppContext";

export default function () {
    const {
        gameState,
    } = useAppContext();

    return (
        <>
            {gameState.elements && (
                <div className="row g-0 justify-content-center">
                    <Element index={0} elements={gameState.elements} />
                    <Element index={1} elements={gameState.elements} />
                    <Element index={2} elements={gameState.elements} />
                </div>
            )}
        </>
    )
}