<script setup lang="ts">
import {useAnimatedScore} from "../../../composables/useAnimatedScore";
import useNewGameBtn from "../../../composables/useNewGameBtn";
import useGameOver from "../../../composables/useGameOver";

const {
  canvas,
  displayedScore,
} = useAnimatedScore();

const { isGameOver } = useGameOver();
const {resetGameState, newGame} = useNewGameBtn();

</script>
<template>
  <div class="game-over-overlay"
  v-if="isGameOver">
    <v-card
        elevation="12"
        rounded="xl"
        class="game-over-card"
    >
      <v-card-text class="text-center">
        <h1 class="game-over-title">Game Over</h1>

        <div class="score">
          Score: <span class="score-value">{{ displayedScore }}</span>
        </div>

        <v-btn
            color="primary"
            size="large"
            class="new-game-btn"
            @click="newGame"
        >
          New Game
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.game-over-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.game-over-card {
  padding: 32px;
  min-width: 300px;
}

.game-over-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.score {
  font-size: 1.25rem;
  margin-bottom: 24px;
}

.score-value {
  font-weight: 600;
}

.new-game-btn {
  width: 100%;
}
</style>
