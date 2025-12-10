import {useAppContext} from "../components/contexts/AppContext";
import {useEffect, useRef, useState} from "react";

const DURATION = 900;

export const useAnimatedScore = () => {
    const {
        gameState,
    } = useAppContext();

    const [displayedScore, setDisplayedScore] = useState(gameState.score);

    const canvas = useRef<HTMLCanvasElement | null>(null);
    let ctx: CanvasRenderingContext2D | null = null;

    const animateCount = (from: number, to: number) => {
        const start = performance.now();

        const step = (now: number) => {
            const t = Math.min(1, (now - start) / DURATION);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplayedScore(Math.round(from + (to - from) * eased));

            if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }

    useEffect(() => {
        if (canvas.current) {
            ctx = canvas.current.getContext('2d');
        }
    }, [canvas]);

    useEffect(() => {
        const newValue = gameState.score;
        const oldValue = displayedScore;

        if (newValue <= oldValue) {
            setDisplayedScore(newValue);
            return;
        }

        animateCount(oldValue, newValue);
    }, [gameState.score]);

    return {
        canvas,
        displayedScore,
    }
}