import AppState from "../app-state";
import $ from "jquery";
import {makeSessionUrl} from "../utils/session.util";
import {Tooltip} from "bootstrap";

export const updateSettingsMultiplayer = () => {
    const sessionId = AppState.getGameState().sessionId;

    const copyLinkButton = $('#copy-session-link-btn');
    const tooltip = Tooltip.getInstance(copyLinkButton[0]);

    if (!tooltip) return;

    const url = makeSessionUrl(sessionId);

    updateTooltip(url, tooltip);

    copyLinkButton.on('click', async (e) => {
        e.preventDefault();

        await navigator.clipboard.writeText(url);

        updateTooltip('Copied!', tooltip);

        setTimeout(() => {
            updateTooltip(url, tooltip);
        }, 1000);
    });
}

const updateTooltip = (value: string, tooltip: Tooltip) => {
    tooltip.setContent({ '.tooltip-inner': value });
}