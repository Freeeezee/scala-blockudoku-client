<script setup lang="ts">
import {computed} from "vue";
import {ElementModel} from "../../../models/element.model";
import {hasPoint} from "../../../utils/element.util";
import {TileStateModel} from "../../../models/tile-state.model";
import {getBlockUrl} from "../../../utils/render.util";

interface ElementProps {
  element: ElementModel;
  x: number;
  y: number;
  colorSchemeIndex: number;
}

const props = defineProps<ElementProps>();

const exists = computed(() => hasPoint(props.element, props.x, props.y));
const url = computed(() =>
    getBlockUrl(TileStateModel.BLOCKED, props.colorSchemeIndex, props.element.colors));
</script>

<template>
  <div class="col-auto tile-frames">
    <div v-if="exists" class="tile">
      <img :src="url" class="tile-background-image" loading="lazy">
    </div>
  </div>
</template>