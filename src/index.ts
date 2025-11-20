import $ from 'jquery';
import {gridHtml} from "./views/grid-view";
import {getGameState} from "./services/game.service";
import 'bootstrap';
import './scss/styles.scss';
import './styles/main.less';
import {initSettingsHtml} from "./views/settings.view";

$('#grid-container').html(gridHtml());

getGameState();
initSettingsHtml();