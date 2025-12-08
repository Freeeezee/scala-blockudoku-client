import {injectAppContext} from "../contexts/app.context";
import {computed, onMounted, ref, watch} from "vue";

const DURATION = 900;

export const useAnimatedScore = () => {
    const app = injectAppContext();

    const score = computed(() => app.gameState.value.score);

    const displayedScore = ref(score.value);

    const canvas = ref<HTMLCanvasElement | null>(null);
    let ctx: CanvasRenderingContext2D | null = null;

    const animateCount = (from: number, to: number) => {
        const start = performance.now();

        const step = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION);
            const eased = 1 - Math.pow(1 - t, 3);
            displayedScore.value = Math.round(from + (to - from) * eased);

            if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

    onMounted(() => {
        if (canvas.value) {
            ctx = canvas.value.getContext("2d");
        }
    });

    watch(score, (newValue, oldValue) => {
        if (newValue <= oldValue) {
            displayedScore.value = newValue;
            return;
        }
        animateCount(oldValue, newValue);
    });

    return {
        canvas,
        displayedScore,
    }
}