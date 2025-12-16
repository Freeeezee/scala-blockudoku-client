import {Socket} from "socket.io-client";
import AppState from "../app-state";
import {updatePreviewGrid} from "../views/preview-grid.view";
import {
    ElementSelection,
    elementSelectionType,
    MouseGridPosition, mouseGridPositionType,
    RtcEnvelope
} from "../models/rtc-models.model";
import {Ref} from "vue";


