import {useAnimatedScore} from "../../composables/useAnimatedScore";

export default function (){
    const {
        canvas,
        displayedScore,
    } = useAnimatedScore();

    return (
        <div className="score-label" id="scoreLabel">
            <span className="score-label" id="scoreText">Score: {displayedScore}</span>

            <canvas ref={canvas} id="scoreConfetti" width="160" height="90"></canvas>
        </div>
    )
}