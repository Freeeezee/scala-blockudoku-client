<script setup lang="ts">
import {useProfileView} from "../../../composables/useProfileView";

const {
  username,
  highscore,
  logout
} = useProfileView();
</script>

<template>
  <v-card-title class="text-h6">
    {{ username }}
    <v-spacer/>
  </v-card-title>
  <p>{{ highscore }}</p>
  <v-btn color="#0099cc" class="mb-2" @click="logout">Logout</v-btn>
</template>

<style scoped>

</style>