import Title from "./Title";
import Score from "./Score";
import Grid from "./grid/Grid";
import Settings from "./settings/Settings";
import Elements from "./elements/Elements";

export default function () {
    return (
        <div id="main">
            <Title/>
            <Score/>
            <Grid/>
            <Elements/>
            <Settings/>
        </div>
    )
}