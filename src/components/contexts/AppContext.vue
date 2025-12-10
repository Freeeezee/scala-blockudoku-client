<script setup lang="ts">
import {provideAppContext} from "../../contexts/app.context";
import {onMounted} from "vue";

const {
  refreshState,
} = provideAppContext();

onMounted(refreshState);
</script>

<template>
  <slot/>
</template>