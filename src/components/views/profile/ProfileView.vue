<script setup lang="ts">
import {useProfileView} from "../../../composables/useProfileView";

const {
  username,
  highscore,
} = useProfileView();
</script>

<template>
  <v-card-title class="text-h6">
    {{ username }}
    <v-spacer/>
  </v-card-title>
  <p>{{ highscore }}</p>
</template>

<style scoped>

</style>