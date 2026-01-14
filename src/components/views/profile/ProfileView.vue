<script setup lang="ts">
import {useProfileView} from "../../../composables/useProfileView";

const {
  username,
  highscore,
  logout
} = useProfileView();
</script>

<template>
  <v-card-title class="d-flex align-center">
    <v-avatar size="40" class="mr-3" style="background-color: transparent;">
      <i class="bi bi-person-circle" style="font-size:36px; color:white;"></i>
    </v-avatar>
    <div class="d-flex flex-column">
      <div class="text-h6 font-weight-medium">{{ username }}</div>
      <div class="caption grey--text d-flex align-center">
        Highscore
        <v-chip small color="blue lighten-4" class="ml-2" text-color="blue darken-3">
          {{ highscore }}
        </v-chip>
      </div>
    </div>
    <v-spacer />
    <v-btn color="#0099cc" class="mb-2" @click="logout">Logout</v-btn>
  </v-card-title>
</template>

<style scoped>

</style>