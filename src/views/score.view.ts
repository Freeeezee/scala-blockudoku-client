/*
import AppState from "../app-state";
import $ from "jquery";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
    born: number;
}

export class ScoreAnimator {
    private static readonly $value: JQuery<HTMLElement> = $("#scoreValue");
    private static readonly $root: JQuery<HTMLElement> = $("#scoreLabel");
    private static readonly canvas: HTMLCanvasElement = $("#scoreConfetti").get(0) as HTMLCanvasElement;
    private static readonly ctx: CanvasRenderingContext2D = ScoreAnimator.canvas.getContext("2d")!;
    private static currentValue = 0;
    private static readonly duration = 900;


    public static increaseTo() {
        const oldValue = this.currentValue;
        const newValue = AppState.getGameState().score;
        const intensity = 1;

        if (newValue <= oldValue) {
            this.currentValue = newValue;
            this.$value.text(String(newValue));
            return;
        }

        ScoreAnimator.animateCount(oldValue, newValue);
        ScoreAnimator.triggerPop();
        //ScoreAnimator.triggerShimmer();
        //ScoreAnimator.runConfetti(intensity);

        this.currentValue = newValue;
    }

    /!** Smooth count-up animation *!/
    private static animateCount(from: number, to: number): void {
        const duration = ScoreAnimator.duration;
        const start = performance.now();

        const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            const value = Math.round(from + (to - from) * eased);
            this.$value.text(String(value));

            if (t < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }

    /!** Trigger CSS pop animation *!/
    private static triggerPop(): void {
        this.$value.addClass("pop");
        setTimeout(() => this.$value.removeClass("pop"), 900);
    }

    /!** Trigger shimmer animation *!/
    private  static triggerShimmer(): void {
        this.$value.addClass("shimmer");
        setTimeout(() => this.$value.removeClass("shimmer"), 500);
    }

    private static prepareCanvas() {
        const canvas = this.canvas;
        const ctx = this.ctx;

        // physical size
        const DPR = window.devicePixelRatio || 1;
        const cssW = canvas.clientWidth;
        const cssH = canvas.clientHeight;

        canvas.width = cssW * DPR;
        canvas.height = cssH * DPR;

        ctx.scale(DPR, DPR);
    }

    /!** Confetti burst animation *!/
    public static runConfetti(intensity: number = 1): void {
        this.prepareCanvas();
        if (!this.ctx) return;

        const ctx = this.ctx;
        const canvas = this.canvas;

        const particles: Particle[] = [];
        const count = 20 + Math.round(12 * intensity);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: 120,
                y: 20,
                vx: (Math.random() - 0.5) * 6,
                vy: -3 - Math.random() * 4,
                size: 4 + Math.random() * 5,
                color: ["#ffd166", "#4cc9f0", "#ef476f", "#06d6a0"][Math.floor(Math.random() * 4)],
                life: 600 + Math.random() * 400,
                born: performance.now(),
            });
        }

        const start = performance.now();
        const duration = 1000;

        const frame = (now: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                const age = now - p.born;
                if (age > p.life) return;

                p.vy += 0.12; // gravity
                p.x += p.vx;
                p.y += p.vy;

                const alpha = 1 - age / p.life;

                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            if (now - start < duration) {
                requestAnimationFrame(frame);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        requestAnimationFrame(frame);
    }
}*/
