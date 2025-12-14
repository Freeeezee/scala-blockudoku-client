<script setup lang="ts">
import Title from "./Title.vue";
import Score from "./Score.vue";
import Grid from "./grid/Grid.vue";
import Settings from "./settings/Settings.vue";
import Elements from "./elements/Elements.vue";
import NewGameBtn from "./NewGameBtn.vue";
</script>

<template>
    <div id="main">
        <Title />
        <Score />
        <Grid />
        <Elements />
        <Settings />
      <NewGameBtn />
    </div>
</template>