<script setup lang="ts">
import {useProfile} from "../../../composables/useProfile";
import Authenticate from "./Authenticate.vue";
import ProfileView from "./ProfileView.vue";

const {
  menuOpen,
  isLoggedIn,
} = useProfile();
</script>

<template>
  <v-btn
      icon
      size="large"
      color="0099cc"
      class="fab"
      :class="{ 'fab--open': menuOpen }"
      @click="menuOpen = true"
  >
    <i class="bi bi-person-fill fs-2"></i>
  </v-btn>
  <v-dialog v-model="menuOpen" max-width="600">
    <v-card color="#2a2a4a" border="sm">
      <Authenticate v-if="!isLoggedIn" />
      <ProfileView v-if="isLoggedIn" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
.fab {
  border-radius: 50%;
  transition: transform 0.25s ease;
  position: absolute;
  top: 25px;
  right: 25px;
}
</style>