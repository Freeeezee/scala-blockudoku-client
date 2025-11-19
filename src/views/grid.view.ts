import $ from "jquery";
import {gridHtml} from "../renderers/grid.renderer";

export const updateGrid = () => {
    $('#grid-container').html(gridHtml());
}