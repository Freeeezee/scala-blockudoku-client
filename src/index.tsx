import './scss/styles.scss';
import './styles/main.less';
import 'bootstrap';
import {handleQueryParams} from "./utils/query-params.util";
import {initializeBootstrapTooltips} from "./utils/bootstrap.util";
import App from "./components/App";
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('app')!).render(<App />)

void handleQueryParams();

initializeBootstrapTooltips();