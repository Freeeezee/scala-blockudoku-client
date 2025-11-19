import './styles/main.less';
import $ from 'jquery';
import './scss/styles.scss';
import {gridHtml} from "./views/grid-view";
import {getGameState} from "./services/game.service";
import 'bootstrap';

$('#grid-container').html(gridHtml());

getGameState();