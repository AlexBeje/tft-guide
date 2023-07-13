<template>
  <div class="flex justify-center w-full bg-zinc-900 select-none">
    <el-tabs v-model="activeName" class="w-full flex flex-col bg-zinc-900">
      <el-tab-pane
        label="Builds"
        name="builds"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTBuilds :data="buildsDB" />
      </el-tab-pane>
      <el-tab-pane
        label="Champions"
        name="champions"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTChampions :data="championsCategoriesDB" />
      </el-tab-pane>
      <el-tab-pane
        label="Items"
        name="items"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTItems />
      </el-tab-pane>
      <el-tab-pane
        label="Level"
        name="level"
        class="max-w-[380px] m-auto mt-12"
      >
        <TFTLevel :data="levelDB" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
/** Imports **/
import levelDB from "@/data/level.json";
import championsCategoriesDB from "@/data/champions.json";
import buildsDB from "@/data/builds.json";

/** Vatriables **/
const activeName = ref("builds");
</script>

<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  @apply flex justify-center;
}
:deep(.el-tabs__nav) {
  @apply w-[380px] px-4;
}
:deep(.el-tabs__item) {
  @apply flex-1;
}
:deep(.el-tabs__header) {
  @apply mb-0 fixed w-full z-10 bg-zinc-900;
}
</style>
