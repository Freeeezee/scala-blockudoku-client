import { AppProvider } from "./contexts/AppContext";
import Main from "./views/Main";

export default function () {
    return (
        <AppProvider>
            <Main />
        </AppProvider>
    )
}