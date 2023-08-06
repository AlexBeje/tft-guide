<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import "element-plus/theme-chalk/dark/css-vars.css";

definePageMeta({
  colorMode: "dark",
});
</script>

<style lang="scss">
body {
  @apply dark:bg-zinc-900;
}
</style>
