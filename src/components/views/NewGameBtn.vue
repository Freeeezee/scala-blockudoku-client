<script setup lang="ts">
import useNewGameBtn from "../../composables/useNewGameBtn";
import { ref } from 'vue'

const menuOpen = ref(false)

const {resetGameState, newGame} = useNewGameBtn()
</script>

<template>
  <div class="floating-menu">
    <v-menu
        v-model="menuOpen"
        location="top"
        offset="8"
        transition="scale-transition"
    >
      <!-- Activator Button -->
      <template #activator="{ props }">
        <v-btn
            v-bind="props"
            icon
            size="large"
            color="0099cc"
            class="fab"
            :class="{ 'fab--open': menuOpen }"
        >
          <i class="bi bi-plus-lg fs-2"></i>
        </v-btn>
      </template>

      <!-- Dropdown Content -->
      <v-card elevation="6" rounded="lg">
        <v-list density="compact" class="menu-list">
          <v-list-item class="menu-item">
            <v-btn
                block
                variant="text"
                color="white"
                @click="resetGameState()"
            >
              <i class="bi bi-arrow-clockwise me-2"></i>
              Reset Game
            </v-btn>
          </v-list-item>

          <v-list-item class="menu-item">
            <v-btn
                block
                variant="text"
                color="white"
                @click="newGame()"
            >
              <i class="bi bi-lightning-fill me-2"></i>
              New Game
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.floating-menu {
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 1000;
}

.fab {
  border-radius: 50%;
  transition: transform 0.25s ease;
}

.fab--open {
  transform: rotate(45deg);
}

.menu-list {
  background-color: #0099cc;
}

.menu-item:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}

</style>