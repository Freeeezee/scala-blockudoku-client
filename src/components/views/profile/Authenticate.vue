<script setup lang="ts">
import {useAuthenticate} from "../../../composables/useAuthenticate";

const {
  activeTab,
  username,
  password,
  register,
  login,
  loginWithGoogle,
  loginWithGithub,
  canSubmit,
} = useAuthenticate();
</script>

<template>
  <v-card-title class="text-h6">
    Authenticate
    <v-spacer/>
  </v-card-title>
  <v-tabs v-model="activeTab" background-color="transparent" grow>
    <v-tab>Register</v-tab>
    <v-tab>Login</v-tab>
  </v-tabs>

  <v-tabs-window v-model="activeTab">
    <v-tabs-window-item>
      <v-form class="px-6 py-6">
        <v-text-field v-model="username" label="Username" required/>
        <v-text-field type="password" v-model="password" label="Password" required/>
        <v-btn color="#0099cc" class="mb-2" @click="register" :disabled="!canSubmit">Register</v-btn>
      </v-form>
    </v-tabs-window-item>
    <v-tabs-window-item>
      <v-form class="px-6 py-6">
        <v-text-field v-model="username" label="Username" required/>
        <v-text-field type="password" v-model="password" label="Password" required/>
        <v-btn color="#0099cc" class="mb-2" @click="login" :disabled="!canSubmit">Login</v-btn>
      </v-form>
    </v-tabs-window-item>
  </v-tabs-window>

  <v-btn
      color="#0099cc"
      class="mb-2 mx-6"
      @click="loginWithGoogle"
  >
    Login with Google
  </v-btn>
  <v-btn
      color="#0099cc"
      class="mb-6 mx-6"
      @click="loginWithGithub"
  >
    Login with Github
  </v-btn>
</template>

<style scoped>

</style>