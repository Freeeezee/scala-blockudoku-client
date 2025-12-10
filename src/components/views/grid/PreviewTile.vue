<script setup lang="ts">
import usePreviewTile, {PreviewTileProps} from "../../../composables/usePreviewTile";

const props = defineProps<PreviewTileProps>();

const {
  tileInfo,
  handleClick,
  handleMouseEnter,
  handleMouseLeave,
} = usePreviewTile(props);

</script>

<template>
  <div class="col-auto">
    <div
        class="tile preview-tile"
        :data-index="tileInfo.index"
        :data-hover-tile-index="props.hoverTileIndex ?? 'none'"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
      <img
          v-if="tileInfo.url"
          :src="tileInfo.url"
          class="tile-background-image"
          loading="lazy"
      >
    </div>
  </div>
</template>