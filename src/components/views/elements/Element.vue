<script setup lang="ts">
import ElementTile from "./ElementTile.vue";
import {ElementProps, useElement} from "../../../composables/useElement";

const props = defineProps<ElementProps>();

const {
  element,
  dimensions,
  colorSchemeIndex,
  selectedClass,
  handleClick,
} = useElement(props);

</script>

<template>
  <div class="col-auto">
    <div
        :class="'container element ' + selectedClass"
        role="button"
        @click="handleClick"
    >
      <div
          v-for="y in dimensions.yArr"
          class="row g-0"
      >
        <ElementTile
            v-for="x in dimensions.xArr"
            :color-scheme-index="colorSchemeIndex"
            :y="y"
            :x="x"
            :element="element"
            :key="x + '-' + y"
        />
      </div>
    </div>
  </div>
</template>