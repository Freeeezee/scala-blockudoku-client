<script setup lang="ts">
import Title from "./Title.vue";
import Score from "./Score.vue";
import Grid from "./grid/Grid.vue";
import Settings from "./settings/Settings.vue";
import Elements from "./elements/Elements.vue";
import NewGameBtn from "./NewGameBtn.vue";
import GameOverView from "./settings/GameOverView.vue";
import Profile from "./profile/Profile.vue";
</script>

<template>
    <div id="main">
        <Title />
        <Score />
        <Grid />
        <Elements />
        <Settings />
      <NewGameBtn />
      <Profile />
      <GameOverView />
    </div>
</template>