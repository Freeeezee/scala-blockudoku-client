<script setup lang="ts">
import {injectAppContext} from "../../../contexts/app.context";
import {computed} from "vue";
import PreviewTile from "./PreviewTile.vue";

const app = injectAppContext();

const grid = computed(() => app.gameState.value.grid);

const elementTileGroup = computed(() =>
    app.selectedElementIndex.value === null ? null : app.gameState.value.universalGridPreview.elementTileGroups[app.selectedElementIndex.value]);

const hoverTileIndex = computed(() => app.hoverTileIndex.value);

</script>
<template>
  <div
      v-if="grid"
      v-for="y in grid.yLength"
      class="row g-0 justify-content-center"
  >
    <PreviewTile
        v-for="x in grid.xLength"
        :x="x - 1"
        :y="y - 1"
        :key="x + '-' + y"
        :grid="grid"
        :hoverTileIndex="hoverTileIndex ?? undefined"
        :element-tile-group="elementTileGroup"
    />
  </div>
</template>