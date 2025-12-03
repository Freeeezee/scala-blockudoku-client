import AppContext from "./contexts/AppContext";
import Main from "./views/Main";

export default {
    components: {AppContext, Main},
    template: `
    <AppContext>
        <Main />
    </AppContext>   
    `
}