import './styles/main.less';
import $ from 'jquery';
import './scss/styles.scss';
import {gridHtml} from "./views/grid-view";

$('#grid-container').html(gridHtml());

