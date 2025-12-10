<script setup lang="ts">

import GridContent from "./GridContent.vue";
import PreviewGrid from "./PreviewGrid.vue";

</script>

<template>
  <div class="flex-column gap-5 d-flex">
    <div class="content position-relative">
      <div id="grid-container" class="container">
        <GridContent/>
      </div>
      <div class="position-absolute start-0 top-0 w-100 h-100">
        <div id="preview-grid-container" class="container">
          <PreviewGrid/>
        </div>
      </div>
    </div>
  </div>
</template>