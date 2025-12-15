import {injectAppContext} from "../contexts/app.context";
import {ElementTileGroupModel} from "../models/element-tile-group.model";


const useGameOver = () => {
    const app = injectAppContext();
    const appstate = app.gameState.value;
    const isGameOver = () => {
        Object.entries(appstate.universalGridPreview.elementTileGroups).map(([key, group]) => {[
          Number(key),
           hasValidPlacement(group)
        ]
        })
    }

}

export default useGameOver;