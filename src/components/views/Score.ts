import {injectAppContext} from "../../contexts/app.context";
import {computed} from "vue";
import {when} from "jquery";

export default {
    setup() {
        const app = injectAppContext();

        const score = computed(() => app.gameState.value.score);

        return {
            score,
        }
    },
    template: `
    <div class="score-label" id="scoreLabel">
        <span class="score-label" id="scoreText">Score: {{ score }}</span>
    
        <canvas id="scoreConfetti" width="160" height="90"></canvas>
    </div>
    `
}