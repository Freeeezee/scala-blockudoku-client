<script setup>
import {useAnimatedScore} from "../../composables/useAnimatedScore";

const {
  canvas,
  displayedScore,
} = useAnimatedScore();

</script>
<template>
  <div class="score-label" id="scoreLabel">
    <span class="score-label" id="scoreText">Score: {{ displayedScore }}</span>

    <canvas :ref="canvas" id="scoreConfetti" width="160" height="90"></canvas>
  </div>
</template>