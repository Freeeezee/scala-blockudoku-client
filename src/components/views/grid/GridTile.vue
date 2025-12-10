<script setup lang="ts">
import {gridTileInfo, GridTileProps} from "../../../composables/useGridTile";

const props = defineProps<GridTileProps>();

const tileInfo = gridTileInfo(props);

</script>

<template>
  <div class="col-auto">
    <div class="tile main-tile" v-bind:data-index="tileInfo.index">
      <img v-bind:src="tileInfo.url" class="tile-background-image" loading="lazy">
    </div>
  </div>
</template>